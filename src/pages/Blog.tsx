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
  const base = import.meta.env.VITE_STRAPI_URL as string | undefined;
  const token = import.meta.env.VITE_STRAPI_TOKEN as string | undefined;
  try {
    if (!base) throw new Error("no-strapi");
    const url = `${base.replace(/\/$/, "")}/api/posts?populate=Cover`;
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
    return items.map((item) => {
      // Handle Cover image - Strapi v5 returns Cover directly with url property
      const coverUrl = item.Cover?.url 
        ? base.replace(/\/$/, "") + item.Cover.url 
        : "";
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

  useEffect(() => {
    let mounted = true;
    fetchPosts()
      .then((p) => {
        if (mounted) setPosts(p);
      })
      .catch((err) => {
        console.error("Error loading posts:", err);
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
        {featuredItems.length > 0 && (
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
          {latest.map((p) => (
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
          {articles.map((p) => (
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
