import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Sidebar from "@/components/Sidebar";
import NewsCard from "@/components/NewsCard";
import { Heart } from "lucide-react";

export default function Favorites() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [favoriteNews, setFavoriteNews] = useState([
    {
      title: "خبر علاقه‌مندی اول",
      description: "خلاصه کوتاه خبر اول علاقه‌مندی",
      imageUrl: "/news1.jpg",
      date: "۱۴ مهر ۱۴۰۴",
      sourceName: "کهربانت",
      views: 120,
      category: "علم و تکنولوژی",
    },
    {
      title: "خبر علاقه‌مندی دوم",
      description: "خلاصه کوتاه خبر دوم علاقه‌مندی",
      imageUrl: "/news2.jpg",
      date: "۱۳ مهر ۱۴۰۴",
      sourceName: "کهربانت",
      views: 95,
      category: "اقتصاد",
    },
  ]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
    else setLoading(false);
  }, [router]);

  if (loading) return <p className="p-6">در حال بارگذاری...</p>;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          علاقه‌مندی‌ها
        </h1>
        {favoriteNews.length === 0 ? (
          <p className="text-gray-700 dark:text-gray-200">
            هیچ خبری به علاقه‌مندی‌ها اضافه نشده است.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteNews.map((news, idx) => (
              <NewsCard key={idx} news={news} highlightPopular={false} showImage={true} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
