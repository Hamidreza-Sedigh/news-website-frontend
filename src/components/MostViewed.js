import { useState, useEffect } from "react";
import NewsCard from "./NewsCard";

const MostViewed = () => {
  const [activeTab, setActiveTab] = useState("day");
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(false);

  const tabs = [
    { id: "day", label: "روز" },
    { id: "week", label: "هفته" },
    { id: "month", label: "ماه" },
  ];

  const fetchPopularNews = async (period) => {
    setLoading(true);
    try {
      // فرض می‌کنیم backend از query ?period=day/week/month پشتیبانی می‌کند
      const res = await fetch(`/api/proxy/news/popular?period=${period}&limit=5`);
      if (!res.ok) throw new Error("خطا در دریافت اخبار");
      const data = await res.json();
      setNewsData(data);
    } catch (err) {
      console.error(err);
      setNewsData([]);
    } finally {
      setLoading(false);
    }
  };

  // لود اولیه برای تب روز
  useEffect(() => {
    fetchPopularNews(activeTab);
  }, [activeTab]);

  return (
    <div className="text-right">
      {/* تب‌ها وسط چین */}
      <div className="flex justify-center space-x-2 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-2 rounded ${
              activeTab === tab.id
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* نمایش اخبار */}
      {loading ? (
        <p className="text-gray-500">در حال بارگذاری...</p>
      ) : newsData.length === 0 ? (
        <p className="text-gray-500">خبری یافت نشد.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {newsData.map((news) => (
            <NewsCard
              key={news.shortId}
              news={news}
              highlightPopular={true}
              layout="aside"                 // <- اضافه شد
              showImage={false}              // تصویر مخفی باشه در aside      
              showInfo={{
                date: true,
                source: true,
                views: true,
                category: false,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MostViewed;
