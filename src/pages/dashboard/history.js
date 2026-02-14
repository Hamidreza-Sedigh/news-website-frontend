// pages/dashboard/history.js
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import NewsCard from "@/components/NewsCard";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { useApi } from "@/hooks/useApi";

export default function History() {
  const { loading: authLoading, accessDenied } = useAuthGuard();
  const api = useApi();

  const [loading, setLoading] = useState(true);
  const [readNews, setReadNews] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (authLoading || accessDenied) return;

    const fetchHistory = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await api.get("/api/proxy/dashboard/history");

        setReadNews(
          Array.isArray(data?.items)
            ? data.items.map((item) => ({
                ...item.news,
                readAt: item.readAt,
              }))
            : []
        );
      } catch (err) {
        console.error("❌ Error fetching history:", err);
        setError("خطا در دریافت تاریخچه");
        setReadNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
    // ⚠️ api در dependency نیست، فقط authLoading و accessDenied بررسی می‌شوند
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
          تاریخچه خبرهای خوانده شده
        </h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {readNews.length === 0 ? (
          <p className="text-gray-700 dark:text-gray-200">
            خبر خوانده شده‌ای وجود ندارد.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {readNews.map((news, idx) => (
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
