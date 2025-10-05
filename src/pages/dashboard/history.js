// pages/dashboard/history.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { logout } from "@/lib/session";
import Sidebar from "@/components/Sidebar";
import NewsCard from "@/components/NewsCard";

export default function History() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // داده‌های کام (خبرهای خوانده شده)
  const [readNews, setReadNews] = useState([
    {
      title: "خبر اول خوانده شده",
      description: "خلاصه کوتاه خبر اول برای نمایش در تاریخچه",
      imageUrl: "/news1.jpg",
      date: "۱۴ مهر ۱۴۰۴",
      sourceName: "کهربانت",
      views: 120,
      category: "علم و تکنولوژی",
    },
    {
      title: "خبر دوم خوانده شده",
      description: "خلاصه کوتاه خبر دوم برای نمایش در تاریخچه",
      imageUrl: "/news2.jpg",
      date: "۱۳ مهر ۱۴۰۴",
      sourceName: "کهربانت",
      views: 95,
      category: "اقتصاد",
    },
    {
      title: "خبر سوم خوانده شده",
      description: "خلاصه کوتاه خبر سوم برای نمایش در تاریخچه",
      imageUrl: "/news3.jpg",
      date: "۱۲ مهر ۱۴۰۴",
      sourceName: "کهربانت",
      views: 76,
      category: "ورزش",
    },
  ]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      setLoading(false);
    }
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
