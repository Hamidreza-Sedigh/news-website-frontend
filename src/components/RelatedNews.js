import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import NewsCard from './NewsCard';

export default function RelatedNews({ shortId }) {
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();


  useEffect(() => {
    if (!shortId) return;

    async function fetchRelated() {
      console.log("Fetching related news...");
      try {
        const res = await fetch(`/api/proxy/news/${shortId}/related`);
        const data = await res.json();
        console.log("RELATED RESPONSE:", data);
        if (Array.isArray(data.related)) {
          setRelated(data.related);
        } else {
          setRelated([]);
        }
      } catch (e) {
        console.error("Error loading related news:", e);
      } finally {
        setLoading(false);
      }
    }

    fetchRelated();
  }, [shortId]);

  if (loading) {
    return (
      <div className="mt-8">
        <div className="font-semibold text-lg mb-3">اخبار مرتبط</div>
        <div className="space-y-3">
          <div className="h-16 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-16 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-16 bg-gray-200 animate-pulse rounded"></div>
        </div>
      </div>
    );
  }

  if (!related.length) return null;

  return (
    <div className="mt-10 border-t border-gray-200 pt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 px-2">
        خبرهایی از همین دسته
      </h3>

      <div className="grid grid-cols-1  gap-4">
        {related.map((news) => (
          <div
            key={news.shortId}
            onClick={() => router.push(`/news/${news.shortId}`)}
            className="cursor-pointer transition-transform hover:scale-[1.02]"
          >
            <NewsCard
              news={news}
              highlightPopular={false}
              mobileLayout="image-inline"
              showImage={false}
              showInfo={{
                date: true,
                source: true,
                views: false,
                category: true,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );

}
