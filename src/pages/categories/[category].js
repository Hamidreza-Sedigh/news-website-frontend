// pages/[category].js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import NewsCard from "@/components/NewsCard";
import Pagination from "@/components/Pagination";

export default function CategoryPage() {
  const router = useRouter();
  const { category } = router.query;

  const [newsList, setNewsList] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 10;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // وقتی دسته عوض می‌شود، برگرد به صفحه اول
    setPage(1);
  }, [category]);
  
  useEffect(() => {
    if (category) {
      setLoading(true);
      fetch(
        `/api/proxy/news/byCategory?category=${encodeURIComponent(
          category
        )}&page=${page}&pageSize=${pageSize}`
      )
        .then((res) => res.json())
        .then((data) => {
          setNewsList(data.news || []);
          setTotal(data.total || 0);
          setLoading(false);
        })
        .catch((err) => {
          console.error("خطا در گرفتن خبرهای دسته:", err);
          setLoading(false);
        });
    }
  }, [category, page]);

  const totalPages = Math.ceil(total / pageSize);

  return (
    <>
      <Head>
        <title>کهربا نت | اخبار {category}</title>
      </Head>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 text-right">
          اخبار دسته: <span className="text-blue-600">{category}</span>
        </h1>

        {loading ? (
          <p className="text-gray-500">در حال بارگذاری خبرها...</p>
        ) : newsList.length === 0 ? (
          <p className="text-gray-500 text-right">هیچ خبری در این دسته وجود ندارد.</p>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {newsList.map((news) => (
                <NewsCard
                  key={news._id}
                  news={news}
                  showInfo={{
                    date: true,
                    source: true,
                    views: true,
                    category: false,
                  }}
                />
              ))}
            </div>

            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={(newPage) => {
                setPage(newPage);
                window.scrollTo({ top: 0, behavior: "smooth" }); // پیمایش نرم به بالا
              }}
            />
          </>
        )}
      </div>
    </>
  );
}
