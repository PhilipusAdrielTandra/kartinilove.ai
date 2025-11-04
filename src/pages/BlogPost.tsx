import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Footer from "../components/Footer";
import Hero from "../assets/hero.svg";
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
  const base = import.meta.env.VITE_STRAPI_URL as string | undefined;
  const token = import.meta.env.VITE_STRAPI_TOKEN as string | undefined;
  const resolveMediaUrl = (url?: string) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    if (!base) return url;
    return base.replace(/\/$/, "") + url;
  };
  try {
    if (!base) throw new Error("no-strapi");
    const headers: Record<string, string> = {};
    if (token) headers["Authorization"] = `Bearer ${token}`;
    const res = await fetch(`${base.replace(/\/$/, "")}/api/posts?filters[Slug][$eq]=${encodeURIComponent(slug)}&populate=Cover`, { headers });
    const json = await res.json();
    const item = (json?.data?.[0]) as any;
    if (!item) throw new Error("not-found");
    // Handle Cover image - Strapi v5 returns Cover directly with url property
    const coverUrl = item.Cover?.url 
      ? base.replace(/\/$/, "") + item.Cover.url 
      : "";
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
      coverUrl: Hero,
      author: "Jane",
      createdAt: new Date().toISOString(),
      slug,
      likes: 0
    };
  }
}

async function updatePostLikes(postId: number, newLikes: number): Promise<void> {
  const base = import.meta.env.VITE_STRAPI_URL as string | undefined;
  const token = import.meta.env.VITE_STRAPI_TOKEN as string | undefined;
  if (!base) return;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  try {
    await fetch(`${base.replace(/\/$/, "")}/api/posts/${postId}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ data: { Likes: newLikes } })
    });
  } catch (error) {
    console.error('Failed to update likes in database:', error);
  }
}

async function fetchRelatedPosts(currentSlug: string): Promise<BlogPost[]> {
  const base = import.meta.env.VITE_STRAPI_URL as string | undefined;
  const token = import.meta.env.VITE_STRAPI_TOKEN as string | undefined;
  const resolveMediaUrl = (url?: string) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    if (!base) return url;
    return base.replace(/\/$/, "") + url;
  };
  try {
    if (!base) throw new Error("no-strapi");
    const headers: Record<string, string> = {};
    if (token) headers["Authorization"] = `Bearer ${token}`;
    const res = await fetch(`${base.replace(/\/$/, "")}/api/posts?populate=Cover`, { headers });
    const json = await res.json();
    const items = (json?.data || []) as any[];
    return items
      .filter((item) => (item.Slug ?? String(item.id)) !== currentSlug)
      .slice(0, 3)
      .map((item) => {
        // Handle Cover image - Strapi v5 uses Cover.data.attributes.url
        const coverUrl = item.Cover?.data?.attributes?.url 
          ? base.replace(/\/$/, "") + item.Cover.data.attributes.url 
          : (item.Cover?.url ? base.replace(/\/$/, "") + item.Cover.url : "");
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

  useEffect(() => {
    let mounted = true;
    Promise.all([fetchPost(slug), fetchRelatedPosts(slug)])
      .then(([p, r]) => {
        if (mounted) {
          setPost(p);
          setRelated(r);
        }
      });
    return () => { mounted = false; };
  }, [slug]);

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
        <img src={post.coverUrl || Hero} className="w-full h-72 object-contain bg-gray-100 rounded-xl mb-8"/>
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
              <img src={p.coverUrl || Hero} className="w-full h-36 object-contain bg-gray-100 rounded-xl mb-3"/>
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


