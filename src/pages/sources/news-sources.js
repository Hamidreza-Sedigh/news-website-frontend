// pages/news-sources.js
import { useEffect, useState } from "react";

export default function NewsSources() {
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/proxy/sources/sources")
      .then((res) => res.json())
      .then((data) => {
        setSources(data.sources); // فقط لیست نام‌ها
        setLoading(false);
      })
      .catch((err) => {
        console.error("خطا در گرفتن منابع خبری:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-10 text-center text-gray-800">منابع خبری</h1>

      {loading ? (
        <p className="text-center text-gray-500">در حال بارگذاری...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sources.map((sourceName) => (
            <div
              key={sourceName}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-100 flex flex-col justify-between"
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-900">{sourceName}</h2>
              <a
                href={`/news-sources/${encodeURIComponent(sourceName)}`}
                className="inline-block mt-auto text-sm font-medium text-blue-600 hover:underline"
              >
                مشاهده خبرهای وب‌سایت
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
