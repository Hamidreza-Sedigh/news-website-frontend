//FeaturedNewsCard.js
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
  
  return (
    <Link
      href={`/news/${news.shortId}`}
      className="w-full md:w-1/2 p-2"
      title={news.title}
      aria-label={`مشاهده خبر: ${news.title}`}
    >
      <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition flex flex-col">
        
        {/* تصویر */}
        <div className="relative w-full h-60 bg-white-100 flex items-center justify-center">
          <Image
            src={news.imageUrl}
            alt={news.title}
            fill
            className="object-contain object-center"
            priority={index === 0}
            loading={index === 0 ? "eager" : "lazy"}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* عنوان */}
        <div className="p-3 text-center">
          <h2 className="text-lg font-bold line-clamp-2">{news.title}</h2>
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
