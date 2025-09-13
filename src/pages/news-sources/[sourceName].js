import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NewsCard from "@/components/NewsCard"; // مسیر درست بده به کامپوننت
import Pagination from "@/components/Pagination";

export default function OneSourceNewsPage() {
  const router = useRouter();
  const { sourceName } = router.query;

  const [newsList, setNewsList] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 10;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sourceName) {
      setLoading(true);
      fetch(
        `/api/proxy/news/oneSourceNews?sourceName=${encodeURIComponent(sourceName)}&page=${page}&pageSize=${pageSize}`
      )
        .then((res) => res.json())
        .then((data) => {
          setNewsList(data.news || []);
          setTotal(data.total || 0);
          setLoading(false);
        })
        .catch((err) => {
          console.error("خطا در گرفتن خبرهای منبع:", err);
          setLoading(false);
        });
    }
  }, [sourceName, page]);

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        خبرهای منبع: {sourceName}
      </h1>

      {loading ? (
        <p className="text-gray-500">در حال بارگذاری خبرها...</p>
      ) : newsList.length === 0 ? (
        <p className="text-gray-500">خبری برای این منبع موجود نیست.</p>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {newsList.map((news) => (
              <NewsCard
                key={news._id}
                news={news}
                showInfo={{
                  date: true,
                  source: false,
                  views: true,
                  category: true,
                }}
              />
            ))}
          </div>

          {/* Pagination */}
          {/* <div className="flex justify-between items-center text-sm text-gray-700">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              قبلی
            </button>

            <span>
              صفحه {page} از {totalPages}
            </span>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              بعدی
            </button>
          </div> */}
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </>
      )}
    </div>
  );
}
