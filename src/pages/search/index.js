// pages/search/index.js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NewsCard from "../../components/NewsCard";
import Pagination from "@/components/Pagination";

export default function SearchPage() {
  const router = useRouter();
  const { q, page } = router.query;

  const [isReady, setIsReady] = useState(false);
  const [results, setResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 10;

  // آماده شدن router و صفحه جاری
  useEffect(() => {
    if (!router.isReady) return;

    if (page) {
      const p = parseInt(page, 10);
      if (!isNaN(p) && p > 0) setCurrentPage(p);
      else setCurrentPage(1);
    } else {
      setCurrentPage(1);
    }

    setIsReady(true);
  }, [router.isReady, page]);

  // گرفتن نتایج جست‌وجو از API
  useEffect(() => {
    if (!isReady || !q) return;

    async function fetchResults() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `/api/proxy/news/search?q=${encodeURIComponent(q)}&page=${currentPage}&pageSize=${pageSize}`
        );
        if (!res.ok) throw new Error("خطا در دریافت نتایج");
        const data = await res.json();

        setResults(data.results || []);
        setTotalResults(data.total || 0);
      } catch (err) {
        setError(err.message || "خطا در دریافت نتایج");
      } finally {
        setLoading(false);
      }
    }

    fetchResults();
  }, [isReady, q, currentPage]);

  // تغییر صفحه
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > Math.ceil(totalResults / pageSize)) return;
    setCurrentPage(newPage);
    router.push(
      `/search?q=${encodeURIComponent(q)}&page=${newPage}`,
      undefined,
      { shallow: true }
    );
  };

  const totalPages = Math.ceil(totalResults / pageSize);

  return (
    <div className="max-w-4xl mx-auto p-4 mt-20">
      <h1 className="text-2xl font-bold mb-4">
        نتایج جست‌وجو برای: <span className="text-blue-600">{q}</span>
      </h1>

      {loading && <p>در حال بارگذاری...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && results.length === 0 && (
        <p>هیچ نتیجه‌ای یافت نشد.</p>
      )}

      <ul className="space-y-4">
        {results.map((news) => (
          <li key={news._id}>
            <NewsCard news={news} highlightPopular={false} />
          </li>
        ))}
      </ul>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          page={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
