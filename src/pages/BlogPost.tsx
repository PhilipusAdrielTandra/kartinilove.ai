import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Footer from "../components/Footer";
import Hero from "../assets/hero.svg";
import BlogPlaceholder from "../assets/blog_placeholder.png";
import ReactMarkdown from "react-markdown";

type BlogPost = {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  coverUrl: string;
  author: string;
  createdAt: string;
  publishedDate?: string;
  slug: string;
  editor?: string;
  likes?: number;
};

async function fetchPost(slug: string): Promise<BlogPost> {
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
  const resolveMediaUrl = (url?: string) => {
    if (!url) return "";
    // Fix malformed protocol first (https// -> https://, http// -> http://)
    if (url.startsWith("https//")) return url.replace("https//", "https://");
    if (url.startsWith("http//")) return url.replace("http//", "http://");
    // Already absolute URL with protocol (check for http:// or https://)
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    // Protocol-relative URL (//example.com/image.jpg)
    if (url.startsWith("//")) return `https:${url}`;
    // IMPORTANT: Check if URL already contains a domain BEFORE checking paths
    // This prevents concatenating base URL to already-full URLs
    // Check for common domain patterns (strapiapp.com, media., etc.)
    if (url.includes("://") || url.includes(".strapiapp.com") || url.includes(".media.") || url.match(/^[a-zA-Z0-9-]+\./)) {
      // If it contains a domain or looks like an absolute URL, return as-is
      console.warn("URL appears to be absolute, returning as-is:", url);
      return url;
    }
    // Absolute path (/uploads/...)
    if (url.startsWith("/") && base) return base + url;
    // Relative path (uploads/...)
    if (base) return base + "/" + url;
    // Fallback: return as-is if no base
    return url;
  };
  try {
    if (!base) throw new Error("no-strapi");
    const headers: Record<string, string> = {};
    if (token) headers["Authorization"] = `Bearer ${token}`;
    const res = await fetch(`${base}/api/posts?filters[Slug][$eq]=${encodeURIComponent(slug)}&populate=Cover`, { headers });
    const json = await res.json();
    const item = (json?.data?.[0]) as any;
    if (!item) throw new Error("not-found");
    
    // Debug logging
    console.log("DEBUG BlogPost: Full Cover object:", item.Cover);
    
    // Try multiple paths to get the Cover URL (Strapi v5 can have different structures)
    const rawCoverUrl = 
      item.Cover?.url || 
      item.Cover?.data?.attributes?.url || 
      item.Cover?.data?.url ||
      item.attributes?.Cover?.data?.attributes?.url ||
      item.attributes?.Cover?.url;
    
    console.log("DEBUG BlogPost: Raw cover URL:", rawCoverUrl);
    console.log("DEBUG BlogPost: Base URL (normalized):", base, "| Original:", rawBase);
    
    // SAFETY: If raw URL is already absolute, use it directly (prevents double-concatenation)
    let coverUrl: string;
    if (!rawCoverUrl) {
      coverUrl = BlogPlaceholder;
      console.warn("No cover URL found for post, using placeholder");
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
        console.log("✓ BlogPost: Using absolute URL directly:", coverUrl, "| Raw was:", rawCoverUrl);
      } else {
        // Relative URL - resolve it
        console.log("BlogPost: Resolving relative URL:", normalizedRaw, "| Base:", base);
        coverUrl = resolveMediaUrl(normalizedRaw);
        console.log("BlogPost: Resolved to:", coverUrl);
        if (coverUrl && !coverUrl.startsWith("http")) {
          console.warn("⚠ BlogPost: Resolved URL may be invalid:", coverUrl, "using placeholder");
          coverUrl = BlogPlaceholder;
        }
      }
    }
    
    // Final fallback: if coverUrl is still empty or invalid, use placeholder
    if (!coverUrl || coverUrl === "") {
      coverUrl = BlogPlaceholder;
    }
    
    // Final safety check
    if (base && coverUrl && coverUrl.includes(base) && coverUrl !== base) {
      console.error("❌ ERROR BlogPost: Base URL detected in coverUrl! URL:", coverUrl);
      if (rawCoverUrl && (rawCoverUrl.includes("://") || rawCoverUrl.includes(".strapiapp.com") || rawCoverUrl.includes(".media."))) {
        console.log("Attempting to fix by using raw URL:", rawCoverUrl);
        coverUrl = rawCoverUrl;
      }
    }
    
    // Additional safety: if coverUrl contains ".strapiapp.com" twice, it's definitely double-concatenated
    const strapiappMatches = (coverUrl.match(/strapiapp\.com/g) || []).length;
    if (strapiappMatches > 1) {
      console.error("❌ ERROR BlogPost: Multiple strapiapp.com domains detected! URL:", coverUrl);
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
      content: item.Content ?? "",
      excerpt: item.Excerpt ?? "",
      category: item.Category ?? "FYI",
      coverUrl,
      author: item.Author ?? "Jane",
      createdAt: item.publishedAt ?? item.createdAt,
      publishedDate: item.PublishedDate ?? item.publishedAt ?? item.createdAt,
      slug: item.Slug ?? String(item.id),
      editor: item.Editor,
      likes: item.Likes ?? 0
    };
  } catch {
    return {
      id: 1,
      title: "Dari Coding hingga Cloud: Kisah Perempuan Indonesia yang Sukses di Dunia Teknologi",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non justo nec mi efficitur faucibus...",
      excerpt: "",
      category: "FYI",
      coverUrl: BlogPlaceholder,
      author: "Jane",
      createdAt: new Date().toISOString(),
      slug,
      likes: 0
    };
  }
}

async function updatePostLikes(postId: number, newLikes: number): Promise<void> {
  const rawBase = import.meta.env.VITE_STRAPI_URL as string | undefined;
  const token = import.meta.env.VITE_STRAPI_TOKEN as string | undefined;
  const base = rawBase ? rawBase.trim().replace(/\/+$/, "") : undefined;
  if (!base) return;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  try {
    await fetch(`${base}/api/posts/${postId}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ data: { Likes: newLikes } })
    });
  } catch (error) {
    console.error('Failed to update likes in database:', error);
  }
}

async function fetchRelatedPosts(currentSlug: string): Promise<BlogPost[]> {
  const rawBase = import.meta.env.VITE_STRAPI_URL as string | undefined;
  const token = import.meta.env.VITE_STRAPI_TOKEN as string | undefined;
  // Normalize base URL: remove trailing slash and whitespace to prevent concatenation issues
  const base = rawBase ? rawBase.trim().replace(/\/+$/, "") : undefined;
  const resolveMediaUrl = (url?: string) => {
    if (!url) return "";
    // Fix malformed protocol first (https// -> https://, http// -> http://)
    if (url.startsWith("https//")) return url.replace("https//", "https://");
    if (url.startsWith("http//")) return url.replace("http//", "http://");
    // Already absolute URL with protocol (check for http:// or https://)
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    // Protocol-relative URL (//example.com/image.jpg)
    if (url.startsWith("//")) return `https:${url}`;
    // IMPORTANT: Check if URL already contains a domain BEFORE checking paths
    // This prevents concatenating base URL to already-full URLs
    // Check for common domain patterns (strapiapp.com, media., etc.)
    if (url.includes("://") || url.includes(".strapiapp.com") || url.includes(".media.") || url.match(/^[a-zA-Z0-9-]+\./)) {
      // If it contains a domain or looks like an absolute URL, return as-is
      console.warn("URL appears to be absolute, returning as-is:", url);
      return url;
    }
    // Absolute path (/uploads/...)
    if (url.startsWith("/") && base) return base + url;
    // Relative path (uploads/...)
    if (base) return base + "/" + url;
    // Fallback: return as-is if no base
    return url;
  };
  try {
    if (!base) throw new Error("no-strapi");
    const headers: Record<string, string> = {};
    if (token) headers["Authorization"] = `Bearer ${token}`;
    const res = await fetch(`${base}/api/posts?populate=Cover`, { headers });
    const json = await res.json();
    const items = (json?.data || []) as any[];
    return items
      .filter((item) => (item.Slug ?? String(item.id)) !== currentSlug)
      .slice(0, 3)
      .map((item) => {
        const rawCoverUrl = item.Cover?.url || item.Cover?.data?.attributes?.url;
        // SAFETY: If raw URL is already absolute, use it directly (prevents double-concatenation)
        let coverUrl: string;
        if (!rawCoverUrl) {
          coverUrl = BlogPlaceholder;
        } else {
          const normalizedRaw = String(rawCoverUrl).trim();
          const isAbsolute = 
            normalizedRaw.startsWith("http://") || 
            normalizedRaw.startsWith("https://") || 
            normalizedRaw.startsWith("//") ||
            normalizedRaw.includes("://") ||
            (normalizedRaw.includes(".strapiapp.com") && !normalizedRaw.startsWith("/"));
          
          if (isAbsolute) {
            coverUrl = normalizedRaw.startsWith("//") ? `https:${normalizedRaw}` : normalizedRaw;
          } else {
            coverUrl = resolveMediaUrl(normalizedRaw);
            if (coverUrl && !coverUrl.startsWith("http")) {
              coverUrl = BlogPlaceholder;
            }
          }
        }
        
        // Final fallback
        if (!coverUrl || coverUrl === "") {
          coverUrl = BlogPlaceholder;
        }
        return {
          id: item.id,
          title: item.Title,
          excerpt: item.Excerpt ?? "",
          content: item.Content ?? "",
          category: item.Category ?? "FYI",
          coverUrl,
          author: item.Author ?? "Jane",
          createdAt: item.publishedAt ?? item.createdAt,
          publishedDate: item.PublishedDate ?? item.publishedAt ?? item.createdAt,
          slug: item.Slug ?? String(item.id),
          editor: item.Editor,
          likes: item.Likes ?? 0
        };
      });
  } catch {
    return [];
  }
}

export default function BlogPost() {
  const { slug = "" } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [related, setRelated] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    Promise.all([fetchPost(slug), fetchRelatedPosts(slug)])
      .then(([p, r]) => {
        if (mounted) {
          setPost(p);
          setRelated(r);
        }
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => { mounted = false; };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white title-font">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-6 py-8">
          <div className="grid grid-cols-4 gap-4 text-xs text-gray-500 mt-6 sm:mt-8 mb-8 sm:mb-10">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i}>
                <div className="h-3 w-20 bg-gray-200 rounded mb-2 animate-pulse" />
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
          <div className="h-8 w-3/4 bg-gray-200 rounded mb-5 animate-pulse" />
          <div className="w-full h-72 bg-gray-100 rounded-xl mb-8 animate-pulse" />
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="min-h-screen bg-white title-font">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-6 py-8">
        <div className="grid grid-cols-4 gap-4 text-xs text-gray-500 mt-6 sm:mt-8 mb-8 sm:mb-10">
          <div>
            <div>DATE</div>
            <div className="font-semibold text-gray-900 mt-1.5">{new Date(post.publishedDate || post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
          </div>
          <div>
            <div>CATEGORY</div>
            <div className="font-semibold text-gray-900 mt-1.5">{post.category}</div>
          </div>
          <div>
            <div>WRITER</div>
            <div className="font-semibold text-gray-900 mt-1.5">{post.author}</div>
          </div>
          <div>
            <div>EDITOR</div>
            <div className="font-semibold text-gray-900 mt-1.5">{post.editor || "-"}</div>
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl font-medium mb-5">{post.title}</h1>
        <img 
          src={post.coverUrl || BlogPlaceholder} 
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (target.src !== BlogPlaceholder) {
              target.src = BlogPlaceholder;
            }
          }}
          className="w-full h-72 object-contain bg-gray-100 rounded-xl mb-8"
          alt={post.title}
        />
        <div className="manrope prose prose-lg max-w-none prose-headings:font-semibold prose-p:my-4 prose-strong:font-semibold prose-ul:my-4 prose-ol:my-4">
          <ReactMarkdown>{post.content}</ReactMarkdown>
          <div className="border-t mt-6 pt-4">
            <LikeShare slug={post.slug} title={post.title} initialLikes={post.likes || 0} postId={post.id} />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-6 py-6">
        <h3 className="text-gray-800 text-2xl font-semibold mb-3">Related Posts</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {related.map((p) => (
            <Link key={p.id} to={`/blog/${p.slug}`} className="bg-white rounded-2xl shadow p-3 hover:shadow-lg transition group">
              <img 
                src={p.coverUrl || BlogPlaceholder} 
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src !== BlogPlaceholder) {
                    target.src = BlogPlaceholder;
                  }
                }}
                className="w-full h-36 object-contain bg-gray-100 rounded-xl mb-3"
                alt={p.title}
              />
              <div className="text-sm text-gray-500 font-semibold title-font mb-2">{p.category || "-"}</div>
              <div className="text-lg font-semibold group-hover:text-[#5B0C19] title-font">{p.title}</div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

function LikeShare({ slug, title, initialLikes = 0, postId }: { slug: string; title: string; initialLikes?: number; postId?: number }) {
  const [likes, setLikes] = useState<number>(() => {
    const current = localStorage.getItem(`like:${slug}`);
    const localLikes = current ? Number(current) : 0;
    return initialLikes + localLikes;
  });
  const [postLikes, setPostLikes] = useState<number>(initialLikes);
  
  const onLike = () => {
    const next = likes + 1;
    const newPostLikes = next;
    setLikes(next);
    setPostLikes(next);
    localStorage.setItem(`like:${slug}`, String(next - initialLikes));
    // Update database if postId is available
    if (postId) {
      updatePostLikes(postId, newPostLikes);
    }
  };
  const onShare = async () => {
    const url = window.location.origin + `/blog/${slug}`;
    if (navigator.share) {
      try { await navigator.share({ title, url }); } catch {}
    } else {
      await navigator.clipboard.writeText(url);
      alert("Link copied");
    }
  };
  return (
    <div className="flex items-center gap-6 text-base">
      <button onClick={onLike} className="flex items-center gap-2 hover:text-[#5B0C19]">
        <span>❤</span>
        <span>{likes}</span>
      </button>
      <button onClick={onShare} className="flex items-center gap-2 hover:text-[#5B0C19]">
        <span>🔗</span>
        <span>Share</span>
      </button>
    </div>
  );
}


