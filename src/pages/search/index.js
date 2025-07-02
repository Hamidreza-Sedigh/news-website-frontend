


import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import NewsCard from '../../components/NewsCard';

export default function SearchPage() {
  const router = useRouter();
  const { q, page } = router.query;
  const [isReady, setIsReady] = useState(false);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const [currentPage, setCurrentPage] = useState(Number(page) || 1);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 10;

  useEffect(() => {
    if (!router.isReady) return; // صبر کن تا router آماده باشد

    if (page) {
      const p = parseInt(page, 10);
      if (!isNaN(p) && p > 0) {
        setCurrentPage(p);
      } else {
        setCurrentPage(1);
      }
    } else {
      setCurrentPage(1);
    }

    setIsReady(true);
  }, [router.isReady, page]);


  useEffect(() => {
    if (!isReady || !q) return;

    async function fetchResults() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `../api/proxy/news/search?q=${encodeURIComponent(q)}&page=${currentPage}&pageSize=${pageSize}`
        );
        if (!res.ok) throw new Error('1خطا در دریافت نتایج');
        const data = await res.json();
        setResults(data.results || []);
      } catch (err) {
        setError(err.message || '2خطا در دریافت نتایج');
      } finally {
        setLoading(false);
      }
    }

    fetchResults();
  }, [isReady, q, currentPage]);

  // تابع برای تغییر صفحه
  const handlePageChange = (newPage) => {
    if (newPage < 1) return;
    setCurrentPage(newPage);
    // به روز رسانی URL (optional)
    router.push(`/search?q=${encodeURIComponent(q)}&page=${newPage}`, undefined, { shallow: true });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 mt-20">
      <h1 className="text-2xl font-bold mb-4">
        نتایج جست‌وجو برای: <span className="text-blue-600">{q}</span>
      </h1>

      {loading && <p>در حال بارگذاری...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && results.length === 0 && <p>هیچ نتیجه‌ای یافت نشد.</p>}

      <ul className="space-y-4">
        {results.map((news) => (
          <li key={news._id}>
            <NewsCard news={news} highlightPopular={false} />
          </li>
        ))}
      </ul>


      {/* کنترل صفحه بندی ساده */}
      {results.length === pageSize && (
        <div className="flex justify-between mt-4">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            قبلی
          </button>

          <span>صفحه {currentPage} در جستجو</span>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            بعدی
          </button>
        </div>
      )}
    </div>
  );
}
