import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Hero from "../assets/hero.svg";

type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  coverUrl: string;
  author: string;
  createdAt: string;
  publishedDate?: string;
  slug: string;
};

async function fetchPosts(): Promise<BlogPost[]> {
  const rawBase = import.meta.env.VITE_STRAPI_URL as string | undefined;
  const token = import.meta.env.VITE_STRAPI_TOKEN as string | undefined;
  // Normalize base URL: remove trailing slash and whitespace to prevent concatenation issues
  const base = rawBase ? rawBase.trim().replace(/\/+$/, "") : undefined;
  
  // Runtime check: Warn if env var is missing (this helps debug Vercel issues)
  if (!base) {
    console.error("❌ VITE_STRAPI_URL is not set! This will cause image loading to fail.");
    console.error("   In Vercel: Set VITE_STRAPI_URL in Project Settings → Environment Variables");
    console.error("   Then redeploy to rebuild with the correct value.");
  }
  
  try {
    if (!base) throw new Error("no-strapi");
    const url = `${base}/api/posts?populate=Cover`;
    console.log("Fetching from:", url);
    const headers: Record<string, string> = {};
    if (token) headers["Authorization"] = `Bearer ${token}`;
    const res = await fetch(url, { headers });
    if (!res.ok) {
      console.error("API error:", res.status, res.statusText);
      const text = await res.text();
      console.error("Response:", text);
      
      if (res.status === 404) {
        throw new Error("Post content type not found. Is it deployed in Strapi Cloud?");
      } else if (res.status === 403) {
        throw new Error("Permission denied. Enable 'find' for Public role in Strapi Settings");
      }
      throw new Error(`API returned ${res.status}`);
    }
    const json = await res.json();
    const items = (json?.data || []) as any[];
    // Debug: Log first item's Cover structure to understand what Strapi returns
    if (items.length > 0 && items[0].Cover) {
      console.log("DEBUG: Strapi Cover structure:", JSON.stringify(items[0].Cover, null, 2));
    }
    const resolveMediaUrl = (u?: string) => {
      if (!u) return "";
      // Fix malformed protocol first (https// -> https://, http// -> http://)
      if (u.startsWith("https//")) return u.replace("https//", "https://");
      if (u.startsWith("http//")) return u.replace("http//", "http://");
      // Already absolute URL with protocol (check for http:// or https://)
      if (u.startsWith("http://") || u.startsWith("https://")) return u;
      // Protocol-relative URL (//example.com/image.jpg)
      if (u.startsWith("//")) return `https:${u}`;
      // IMPORTANT: Check if URL already contains a domain BEFORE checking paths
      // This prevents concatenating base URL to already-full URLs
      // Check for common domain patterns (strapiapp.com, media., etc.)
      if (u.includes("://") || u.includes(".strapiapp.com") || u.includes(".media.") || u.match(/^[a-zA-Z0-9-]+\./)) {
        // If it contains a domain or looks like an absolute URL, return as-is
        console.warn("URL appears to be absolute, returning as-is:", u);
        return u;
      }
      // Absolute path (/uploads/...)
      if (u.startsWith("/") && base) return base + u;
      // Relative path (uploads/...)
      if (base) return base + "/" + u;
      // Fallback: return as-is if no base
      console.warn("Could not resolve media URL:", u, "base:", base);
      return u;
    };
    return items.map((item) => {
      // Try multiple paths to get the Cover URL (Strapi v5 can have different structures)
      const rawCoverUrl = 
        item.Cover?.url || 
        item.Cover?.data?.attributes?.url || 
        item.Cover?.data?.url ||
        item.attributes?.Cover?.data?.attributes?.url ||
        item.attributes?.Cover?.url;
      
      // Debug logging for Vercel
      console.log("DEBUG: Raw cover URL from Strapi:", rawCoverUrl);
      console.log("DEBUG: Full Cover object:", item.Cover);
      console.log("DEBUG: Base URL (normalized):", base, "| Original:", rawBase);
      
      // SAFETY: If raw URL is already absolute, use it directly (prevents double-concatenation)
      // This is critical for Vercel deployments where base URL might be concatenated incorrectly
      let coverUrl: string;
      if (!rawCoverUrl) {
        coverUrl = "";
        console.warn("No cover URL found for item:", item.id);
      } else {
        // Normalize the raw URL first (trim whitespace, decode if needed)
        const normalizedRaw = String(rawCoverUrl).trim();
        
        // Check if it's already absolute - use multiple checks to be safe
        const isAbsolute = 
          normalizedRaw.startsWith("http://") || 
          normalizedRaw.startsWith("https://") || 
          normalizedRaw.startsWith("//") ||
          normalizedRaw.includes("://") ||
          (normalizedRaw.includes(".strapiapp.com") && !normalizedRaw.startsWith("/"));
        
        if (isAbsolute) {
          // Already absolute URL - use as-is to prevent any concatenation issues
          coverUrl = normalizedRaw.startsWith("//") ? `https:${normalizedRaw}` : normalizedRaw;
          console.log("✓ Using absolute URL directly:", coverUrl, "| Raw was:", rawCoverUrl);
        } else {
          // Relative URL - resolve it
          console.log("Resolving relative URL:", normalizedRaw, "| Base:", base);
          coverUrl = resolveMediaUrl(normalizedRaw);
          console.log("Resolved to:", coverUrl);
          if (coverUrl && !coverUrl.startsWith("http")) {
            console.warn("⚠ Resolved URL may be invalid:", coverUrl, "raw:", rawCoverUrl);
          }
        }
      }
      
      // Final safety check: if the resolved URL contains the base URL, something went wrong
      if (base && coverUrl && coverUrl.includes(base) && coverUrl !== base) {
        console.error("❌ ERROR: Base URL detected in coverUrl! This should not happen. URL:", coverUrl);
        // If we have a raw URL that looks absolute, use that instead
        if (rawCoverUrl && (rawCoverUrl.includes("://") || rawCoverUrl.includes(".strapiapp.com") || rawCoverUrl.includes(".media."))) {
          console.log("Attempting to fix by using raw URL:", rawCoverUrl);
          coverUrl = rawCoverUrl;
        } else {
          // Last resort: try to extract just the media URL part
          const mediaUrlMatch = coverUrl.match(/https?:\/\/[^/]+\/(.+)$/);
          if (mediaUrlMatch && rawCoverUrl) {
            console.log("Attempting to extract media URL from concatenated string");
            coverUrl = rawCoverUrl.startsWith("http") ? rawCoverUrl : `https://${mediaUrlMatch[1]}`;
          }
        }
      }
      
      // Additional safety: if coverUrl contains ".strapiapp.com" twice, it's definitely double-concatenated
      const strapiappMatches = (coverUrl.match(/strapiapp\.com/g) || []).length;
      if (strapiappMatches > 1) {
        console.error("❌ ERROR: Multiple strapiapp.com domains detected! URL:", coverUrl);
        // Try to extract just the last part (the actual media URL)
        const lastStrapiappIndex = coverUrl.lastIndexOf("strapiapp.com");
        if (lastStrapiappIndex > 0) {
          const mediaPart = coverUrl.substring(lastStrapiappIndex - 4); // Include "https" before
          if (mediaPart.startsWith("http")) {
            console.log("Extracted media URL:", mediaPart);
            coverUrl = mediaPart;
          } else if (rawCoverUrl && rawCoverUrl.startsWith("http")) {
            console.log("Using raw URL as fallback:", rawCoverUrl);
            coverUrl = rawCoverUrl;
          }
        }
      }
      return {
      id: item.id,
        title: item.Title,
        excerpt: item.Excerpt ?? "",
        category: item.Category ?? "Technology",
        coverUrl,
        author: item.Author ?? "Jane Doe",
        createdAt: item.publishedAt ?? item.createdAt,
        publishedDate: item.PublishedDate ?? item.publishedAt ?? item.createdAt,
        slug: item.Slug ?? String(item.id),
      };
    });
  } catch (error) {
    console.error("Failed to fetch posts from Strapi:", error);
    console.log("Strapi URL:", base);
    // placeholder content when Strapi is not available yet
    return Array.from({ length: 9 }).map((_, i) => ({
      id: i + 1,
      title: "Mengapa Literasi Digital Penting?",
      excerpt: "Ringkasan singkat artikel placeholder untuk desain dan layout.",
      category: i % 3 === 0 ? "FYI" : "Technology",
      coverUrl: Hero,
      author: "Jane Doe",
      createdAt: new Date().toISOString(),
      slug: `placeholder-${i + 1}`,
    }));
  }
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    fetchPosts()
      .then((p) => {
        if (mounted) setPosts(p);
      })
      .catch((err) => {
        console.error("Error loading posts:", err);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const categories = ["All", "Technology", "Self Development", "FYI"];
  const featuredItems = posts.slice(0, Math.min(5, posts.length || 5));
  const latest = posts.slice(featuredItems.length, featuredItems.length + 3);
  const articles = activeCategory === "All" ? posts : posts.filter(p => p.category === activeCategory);

  // Auto-advance carousel every 5s
  useEffect(() => {
    if (featuredItems.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredItems.length]);

  return (
    <div className="min-h-screen bg-white manrope">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-6 py-6">
        {/* Featured carousel */}
        {loading ? (
          <div className="rounded-2xl overflow-hidden shadow mb-8 relative">
            <div className="w-full h-96 sm:h-[34rem] bg-gray-100 animate-pulse" />
          </div>
        ) : featuredItems.length > 0 && (
          <div className="rounded-2xl overflow-hidden shadow mb-8 relative">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {featuredItems.map((item) => (
                <Link key={item.id} to={`/blog/${item.slug}`} className="min-w-full block">
              <div className="relative">
                    <img src={item.coverUrl || Hero} className="w-full h-96 sm:h-[34rem] object-contain bg-gray-100"/>
                <div className="absolute left-4 bottom-4 right-4 bg-black/60 text-white p-5 rounded">
                      <div className="text-xs sm:text-sm font-semibold mb-2 opacity-95">{item.category || "FYI"}</div>
                      <h2 className="text-xl leading-snug sm:text-3xl sm:leading-tight md:text-4xl md:leading-tight title-font">{item.title}</h2>
                </div>
              </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Latest Posts */}
        <h3 className="text-gray-800 text-xl font-semibold mb-3">Latest Posts</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow p-3">
                  <div className="w-full h-36 bg-gray-100 rounded-xl mb-3 animate-pulse" />
                  <div className="h-4 w-20 bg-gray-200 rounded mb-2 animate-pulse" />
                  <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse" />
                </div>
              ))
            : latest.map((p) => (
            <Link key={p.id} to={`/blog/${p.slug}`} className="bg-white rounded-2xl shadow p-3 hover:shadow-lg transition group">
                  <img src={p.coverUrl || Hero} className="w-full h-36 object-contain bg-gray-100 rounded-xl mb-3"/>
                  <div className="text-sm text-gray-700 font-semibold">{p.category}</div>
                  <div className="text-base leading-snug sm:text-lg sm:leading-snug font-semibold group-hover:text-[#5B0C19] title-font">{p.title}</div>
            </Link>
          ))}
        </div>

        {/* Articles title and counter */}
        <div className="flex items-center gap-3 mb-3 mt-6">
          <h4 className="text-xl font-semibold">Articles</h4>
          <span className="text-sm bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{articles.length}</span>
        </div>
        {/* Filter chips */}
        <div className="flex items-center gap-3 mb-6 overflow-x-auto flex-nowrap -mx-4 px-4">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`px-3 py-1.5 rounded-full text-xs sm:text-sm border transition shadow-sm whitespace-nowrap shrink-0 title-font ${activeCategory===c?"bg-[#ffe7ea] text-[#5B0C19] border-[#5B0C19]":"bg-gray-100 text-gray-700 border-gray-200 hover:border-[#5B0C19]"}`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Articles grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {loading
            ? Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow p-3">
                  <div className="w-full h-36 bg-gray-100 rounded-xl mb-3 animate-pulse" />
                  <div className="h-4 w-24 bg-gray-200 rounded mb-2 animate-pulse" />
                  <div className="h-5 w-4/5 bg-gray-200 rounded animate-pulse" />
                </div>
              ))
            : articles.map((p) => (
            <Link key={p.id} to={`/blog/${p.slug}`} className="bg-white rounded-2xl shadow p-3 hover:shadow-lg transition group">
                  <img src={p.coverUrl || Hero} className="w-full h-36 object-contain bg-gray-100 rounded-xl mb-3"/>
                  <div className="text-sm text-gray-700 font-semibold">{p.category}</div>
                  <div className="text-base leading-snug sm:text-lg sm:leading-snug font-semibold group-hover:text-[#5B0C19] title-font">{p.title}</div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
