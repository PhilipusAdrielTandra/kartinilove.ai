import { Link } from "react-router-dom";
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
  slug: string;
};

async function fetchPosts(): Promise<BlogPost[]> {
  const base = import.meta.env.VITE_STRAPI_URL as string | undefined;
  try {
    if (!base) throw new Error("no-strapi");
    const res = await fetch(`${base}/api/posts?populate=cover`);
    const json = await res.json();
    const items = (json?.data || []) as any[];
    return items.map((item) => ({
      id: item.id,
      title: item.attributes.title,
      excerpt: item.attributes.excerpt ?? "",
      category: item.attributes.category ?? "Technology",
      coverUrl: item.attributes.cover?.data?.attributes?.url ?? "",
      author: item.attributes.author ?? "Jane Doe",
      createdAt: item.attributes.publishedAt ?? item.attributes.createdAt,
      slug: item.attributes.slug ?? String(item.id),
    }));
  } catch {
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  useEffect(() => {
    let mounted = true;
    fetchPosts()
      .then((p) => {
        if (mounted) setPosts(p);
      })
      .catch(() => setError("Failed to load posts"))
      .finally(() => setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  const categories = ["All", "Technology", "Self Development", "FYI"];
  const featured = posts[0];
  const latest = posts.slice(1, 4);
  const allArticles = posts.slice(4);
  const articles = activeCategory === "All" ? allArticles : allArticles.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-6 py-6">
        {/* Featured hero */}
        {featured && (
          <Link to={`/blog/${featured.slug}`} className="block">
            <div className="rounded-2xl overflow-hidden shadow mb-8">
              <div className="relative">
                <img src={featured.coverUrl || Hero} className="w-full h-64 sm:h-96 object-cover"/>
                <span className="absolute left-4 top-4 bg-white/90 text-[#EF0753] text-sm px-3 py-1 rounded-full">{featured.category || "FYI"}</span>
                <div className="absolute left-4 bottom-4 right-4 bg-black/60 text-white p-5 rounded">
                  <h2 className="text-3xl sm:text-4xl">{featured.title}</h2>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Latest Posts */}
        <h3 className="text-gray-800 text-xl font-semibold mb-3">Latest Posts</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {latest.map((p) => (
            <Link key={p.id} to={`/blog/${p.slug}`} className="bg-white rounded-2xl shadow p-3 hover:shadow-lg transition group">
              <img src={p.coverUrl || Hero} className="w-full h-36 object-cover rounded-xl mb-3"/>
              <div className="text-sm text-gray-500">{p.category}</div>
              <div className="text-lg font-semibold group-hover:text-[#EF0753]">{p.title}</div>
            </Link>
          ))}
        </div>

        {/* Articles title and counter */}
        <div className="flex items-center gap-3 mb-3 mt-6">
          <h4 className="text-xl font-semibold">Articles</h4>
          <span className="text-sm bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{articles.length}</span>
        </div>
        {/* Filter chips */}
        <div className="flex items-center gap-3 mb-6">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`px-4 py-2 rounded-full text-sm border transition shadow-sm ${activeCategory===c?"bg-[#ffe7ea] text-[#EF0753] border-[#EF0753]":"bg-gray-100 text-gray-700 border-gray-200 hover:border-[#EF0753]"}`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Articles grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {articles.map((p) => (
            <Link key={p.id} to={`/blog/${p.slug}`} className="bg-white rounded-2xl shadow p-3 hover:shadow-lg transition group">
              <img src={p.coverUrl || Hero} className="w-full h-36 object-cover rounded-xl mb-3"/>
              <div className="text-sm text-gray-500">{p.category}</div>
              <div className="text-lg font-semibold group-hover:text-[#EF0753]">{p.title}</div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

import { useEffect, useState } from "react";

