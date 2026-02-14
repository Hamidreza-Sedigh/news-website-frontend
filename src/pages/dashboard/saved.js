// pages/dashboard/saved.js
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import NewsCard from "@/components/NewsCard";
import { useAuthGuard } from "@/hooks/useAuthGuard";

export default function Saved() {
  // ✅ فقط کاربران لاگین شده
  const { loading: authLoading, accessDenied } = useAuthGuard();
  const [loading, setLoading] = useState(true);
  const [savedNews, setSavedNews] = useState([]);

  // داده‌های mock
  useEffect(() => {
    if (authLoading || accessDenied) return;

    // Mock داده‌ها
    setSavedNews([
      {
        title: "خبر ذخیره شده اول",
        description: "خلاصه کوتاه خبر اول برای ذخیره",
        imageUrl: "/news1.jpg",
        date: "۱۴ مهر ۱۴۰۴",
        sourceName: "کهربانت",
        views: 120,
        category: "علم و تکنولوژی",
      },
      {
        title: "خبر ذخیره شده دوم",
        description: "خلاصه کوتاه خبر دوم برای ذخیره",
        imageUrl: "/news2.jpg",
        date: "۱۳ مهر ۱۴۰۴",
        sourceName: "کهربانت",
        views: 95,
        category: "اقتصاد",
      },
    ]);

    setLoading(false);
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
          خبرهای ذخیره‌شده
        </h1>

        {savedNews.length === 0 ? (
          <p className="text-gray-700 dark:text-gray-200">
            خبری ذخیره نشده است.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedNews.map((news, idx) => (
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
