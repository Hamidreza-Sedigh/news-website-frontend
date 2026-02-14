// pages/dashboard/favorites.js
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import NewsCard from "@/components/NewsCard";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { useApi } from "@/hooks/useApi";

export default function Favorites() {
  const { loading: authLoading, accessDenied } = useAuthGuard();
  const api = useApi();

  const [loading, setLoading] = useState(true);
  const [favoriteNews, setFavoriteNews] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (authLoading || accessDenied) return;

    const fetchFavorites = async () => {
      setLoading(true);
      setError("");

      try {
        // 🔹 مسیر API فعلا placeholder است
        // const data = await api.get("/api/proxy/dashboard/news/favorites");
        const data = {news: []} ;

        // فرض: data.news آرایه‌ای از خبرهای علاقه‌مندی است
        setFavoriteNews(data.news || []);
      } catch (err) {
        console.error("خطا در دریافت علاقه‌مندی‌ها:", err);
        setError("خطا در دریافت علاقه‌مندی‌ها");

        // fallback mock برای تست اولیه
        setFavoriteNews([
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
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [authLoading, accessDenied]);

  if (authLoading || loading)
    return <p className="p-6">در حال بارگذاری...</p>;

  if (accessDenied)
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        دسترسی مجاز نیست
      </div>
    );

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          علاقه‌مندی‌ها
        </h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {favoriteNews.length === 0 ? (
          <p className="text-gray-700 dark:text-gray-200">
            هیچ خبری به علاقه‌مندی‌ها اضافه نشده است.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteNews.map((news, idx) => (
              <NewsCard
                key={idx}
                news={news}
                highlightPopular={false}
                showImage={true}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
