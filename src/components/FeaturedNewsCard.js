// FeaturedNewsCard.js
import Link from "next/link";
import Image from "next/image";
import { formatDistanceToNow, isToday, isYesterday } from 'date-fns-jalali';
import { faIR } from 'date-fns/locale';

function formatRelativeDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isToday(date)) return formatDistanceToNow(date, { addSuffix: true, locale: faIR });
  if (isYesterday(date)) return 'روز گذشته';
  return date.toLocaleDateString('fa-IR');
}

export default function FeaturedNewsCard({ news, index, showInfo = { date: true, source: true, category: true } }) {
  const date = formatRelativeDate(news.date);
  const hasImage = !!news.imageUrl;

  return (
    <Link
      href={`/news/${news.shortId}`}
      className="w-full md:w-1/2 p-2"
      title={news.title}
      aria-label={`مشاهده خبر: ${news.title}`}
    >
      <div className={`bg-white rounded-lg overflow-hidden cursor-pointer hover:bg-gray-50 transition flex flex-col gap-3`}>
        
        {/* تصویر */}
        {hasImage && (
          <div className="relative w-full h-48 md:h-60 flex-shrink-0 rounded-md overflow-hidden">
            <img
              src={news.imageUrl}
              alt={news.title}
              // fill
              className="w-full h-full object-cover"
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
              // sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        )}

        {/* عنوان */}
        <div className="px-3 text-center">
          <h2 className="text-lg font-semibold line-clamp-2">{news.title}</h2>
        </div>

        {/* اطلاعات فرعی */}
        <div className="px-3 pb-3 text-center text-sm text-gray-500 flex justify-center gap-4 flex-wrap">
          {showInfo.date && date && <div>📅 {date}</div>}
          {showInfo.source && news.sourceName && <div>📰 {news.sourceName}</div>}
          {showInfo.category && news.category && <div>🏷️ {news.category}</div>}
        </div>

      </div>
    </Link>
  );
}
