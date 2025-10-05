// pages/dashboard/history.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Sidebar from "@/components/Sidebar";
import NewsCard from "@/components/NewsCard";

export default function History() {
  const [loading, setLoading] = useState(true);
  const [readNews, setReadNews] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const res = await fetch("http://localhost:8000/api/dashboard/history", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          throw new Error("خطا در دریافت تاریخچه خبرها");
        }

        const data = await res.json();

        // داده‌ها در data.items قرار دارند و هر item.news اطلاعات خبر است
        const newsList = data.items.map(item => ({
          ...item.news,
          readAt: item.readAt, // اگر بخوای تاریخ آخرین بازدید رو هم نمایش بدی
        }));

        setReadNews(newsList);
      } catch (err) {
        console.error(err);
        setReadNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [router]);

  if (loading) return <p className="p-6">در حال بارگذاری...</p>;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* سایدبار */}
      <Sidebar />

      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          تاریخچه خبرهای خوانده شده
        </h1>

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
