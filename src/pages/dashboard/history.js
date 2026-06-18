// pages/dashboard/history.js

import { useEffect, useState, useCallback } from "react";
import Sidebar from "@/components/Sidebar";
import NewsCard from "@/components/NewsCard";
import Pagination from "@/components/Pagination";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { useApi } from "@/hooks/useApi";
import toast from "react-hot-toast";

export default function History() {
  const { loading: authLoading, accessDenied, isAuthenticated } = useAuthGuard();
  const api = useApi();

  console.log("Test in history:",{
    authLoading,
    accessDenied,
    isAuthenticated,
  });

  const [loading, setLoading] = useState(true);
  const [readNews, setReadNews] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [refreshKey, setRefreshKey] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    if (
      authLoading ||
      accessDenied ||
      !isAuthenticated
    ) {
      return;
    }

    const fetchHistory = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await api.get(
          `/api/proxy/dashboard/history?page=${page}&limit=12`
        );

        const serverTotalPages = data?.totalPages || 1;

        // اگر صفحه فعلی دیگر معتبر نباشد
        if (page > serverTotalPages) {
          setPage(serverTotalPages);
          return;
        }

        setReadNews(
          Array.isArray(data?.items)
            ? data.items
                .filter((item) => item.news)
                .map((item) => ({
                  ...item.news,
                  readAt: item.readAt,
                }))
            : []
        );

        setTotalPages(serverTotalPages);

      } catch (err) {
        console.error("❌ Error fetching history:", err);
        setError("خطا در دریافت تاریخچه");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [authLoading, accessDenied, isAuthenticated, page, refreshKey]);

  // ✅ حذف آیتم
  const handleRemove = async (newsId) => {
    const previousState = [...readNews];

    const updatedNews = readNews.filter(
      (item) => item._id !== newsId
    );

    setReadNews(updatedNews);

    try {
      await api.delete("/api/proxy/dashboard/history", {
        newsId,
      });

      toast.success("خبر از تاریخچه حذف شد");

      if (updatedNews.length === 0 && page > 1) {
        setRefreshKey((prev) => prev + 1);
      }

    } catch (err) {
      setReadNews(previousState);
      toast.error("حذف انجام نشد");
    }
  };

  if ( !isAuthenticated ) {
    return null;
  }
  if (authLoading || loading) {
    return <p className="p-6">در حال بارگذاری...</p>;
  }

  if (accessDenied) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        دسترسی مجاز نیست
      </div>
    );
  }
  
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
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {readNews.map((news) => (
                <div key={news._id} className="relative group">
                  <button
                    onClick={() => handleRemove(news._id)}
                    className="absolute top-2 left-2 z-10 w-7 h-7
                               bg-black/70 text-white rounded-full
                               flex items-center justify-center
                               opacity-0 group-hover:opacity-100
                               transition-all duration-200
                               hover:bg-red-600 hover:scale-110"
                  >
                    ×
                  </button>

                  <NewsCard
                    news={news}
                    highlightPopular={false}
                    showImage={true}
                  />
                </div>
              ))}
            </div>

            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </>
        )}
      </main>
    </div>
  );
}