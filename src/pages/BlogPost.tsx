import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Footer from "../components/Footer";
import Hero from "../assets/hero.svg";

type BlogPost = {
  id: number;
  title: string;
  content: string;
  category: string;
  coverUrl: string;
  author: string;
  createdAt: string;
  slug: string;
};

async function fetchPost(slug: string): Promise<BlogPost> {
  const base = import.meta.env.VITE_STRAPI_URL as string | undefined;
  try {
    if (!base) throw new Error("no-strapi");
    const res = await fetch(`${base}/api/posts?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=cover`);
    const json = await res.json();
    const item = (json?.data?.[0]) as any;
    if (!item) throw new Error("not-found");
    return {
      id: item.id,
      title: item.attributes.title,
      content: item.attributes.content ?? "",
      category: item.attributes.category ?? "FYI",
      coverUrl: item.attributes.cover?.data?.attributes?.url ?? "",
      author: item.attributes.author ?? "Jane",
      createdAt: item.attributes.publishedAt ?? item.attributes.createdAt,
      slug: item.attributes.slug ?? String(item.id)
    };
  } catch {
    return {
      id: 1,
      title: "Dari Coding hingga Cloud: Kisah Perempuan Indonesia yang Sukses di Dunia Teknologi",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non justo nec mi efficitur faucibus...",
      category: "FYI",
      coverUrl: Hero,
      author: "Jane",
      createdAt: new Date().toISOString(),
      slug
    };
  }
}

export default function BlogPost() {
  const { slug = "" } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [related, setRelated] = useState<BlogPost[]>([]);

  useEffect(() => {
    let mounted = true;
    fetchPost(slug)
      .then((p) => {
        if (mounted) {
          setPost(p);
          setRelated([1,2,3].map((i) => ({ ...p, id: i, title: "Mengapa Literasi Digital Penting?", slug: `rel-${i}` })));
        }
      });
    return () => { mounted = false; };
  }, [slug]);

  if (!post) return null;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-6 py-8">
        <div className="grid grid-cols-4 gap-4 text-xs text-gray-500 mb-6">
          <div>
            <div>DATE</div>
            <div className="font-semibold text-gray-900">{new Date(post.createdAt).toLocaleDateString()}</div>
          </div>
          <div>
            <div>CATEGORY</div>
            <div className="font-semibold text-gray-900">{post.category}</div>
          </div>
          <div>
            <div>WRITER</div>
            <div className="font-semibold text-gray-900">{post.author}</div>
          </div>
          <div>
            <div>EDITOR</div>
            <div className="font-semibold text-gray-900">John</div>
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold mb-5">{post.title}</h1>
        <img src={post.coverUrl || Hero} className="w-full h-72 object-cover rounded-xl mb-8"/>
        <div className="prose max-w-none prose-p:my-4 text-lg">
          <p className="text-2xl font-semibold">Point 1</p>
          <p>{post.content}</p>
          <p className="text-2xl font-semibold">Point 2</p>
          <p>{post.content}</p>
          <p className="text-2xl font-semibold">Point 3</p>
          <p>{post.content}</p>
          <div className="border-t mt-6 pt-4">
            <LikeShare slug={post.slug} title={post.title} />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-6 py-6">
        <h3 className="text-gray-800 text-2xl font-semibold mb-3">Related Posts</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {related.map((p) => (
            <Link key={p.id} to={`/blog/${p.slug}`} className="bg-white rounded-2xl shadow p-3 hover:shadow-lg transition group">
              <img src={p.coverUrl || Hero} className="w-full h-36 object-cover rounded-xl mb-3"/>
              <div className="text-sm text-gray-500">Technology</div>
              <div className="text-lg font-semibold group-hover:text-[#EF0753]">{p.title}</div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

function LikeShare({ slug, title }: { slug: string; title: string }) {
  const [likes, setLikes] = useState<number>(() => {
    const current = localStorage.getItem(`like:${slug}`);
    return current ? Number(current) : 0;
  });
  const onLike = () => {
    const next = likes + 1;
    setLikes(next);
    localStorage.setItem(`like:${slug}`, String(next));
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
      <button onClick={onLike} className="flex items-center gap-2 hover:text-[#EF0753]">
        <span>❤</span>
        <span>{likes}</span>
      </button>
      <button onClick={onShare} className="flex items-center gap-2 hover:text-[#EF0753]">
        <span>🔗</span>
        <span>Share</span>
      </button>
    </div>
  );
}


