import Link from 'next/link';
import Image from 'next/image';
import { formatDistanceToNow, isToday, isYesterday } from 'date-fns-jalali';
import { faIR } from 'date-fns/locale';

function formatRelativeDate(dateString) {
  if (!dateString) return '';

  const date = new Date(dateString);

  if (isToday(date)) {
    return formatDistanceToNow(date, { addSuffix: true, locale: faIR });
  }

  if (isYesterday(date)) {
    return 'روز گذشته';
  }

  return date.toLocaleDateString('fa-IR');
}

export default function NewsCard({
  news,
  highlightPopular = false,
  showImage = false, // 👈 کنترل نمایش عکس
  showInfo = {
    date: true,
    source: true,
    views: highlightPopular,
    category: !highlightPopular,
  },
}) {
  const title = news.title || 'مشاهده خبر';
  const views = news.views || 0;
  const category = news.category || 'بدون دسته‌بندی';
  const sourceName = news.sourceName || 'ناشناخته';
  const date = formatRelativeDate(news.date);

  return (
    <Link
      href={`/news/${news.shortId}`}
      className={`flex gap-4 rounded-xl shadow p-4 transition
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        ${highlightPopular ? 'border border-yellow-400 bg-white hover:bg-gray-50' : 'bg-white hover:bg-gray-50'}
      `}
      title={title}
      aria-label={`مشاهده خبر: ${title}`}
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      {/* عکس خبر */}
      {showImage && news.imageUrl && (
        // <div className="hidden md:block w-24 h-24 flex-shrink-0 relative">
        <div className="hidden md:block relative w-40 h-28 flex-shrink-0  rounded-md">
          <Image
            src={news.imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 200px" // 👈 واکنش‌گرا
            className="object-cover"
            priority={false} // می‌تونی برای خبر اول بذاری true
          />
        </div>
      )}

      {/* متن خبر */}
      <div className="flex-1">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-gray-700 text-sm line-clamp-3">{news.description}</p>
      </div>

      {/* ستون اطلاعات فرعی */}
      <div className="w-fit flex-shrink-0 text-sm text-gray-500 text-left space-y-1 ml-auto">
        {showInfo.date && <div>📅 {date}</div>}
        {showInfo.source && <div>📰 {sourceName}</div>}
        {showInfo.views && (
          <div className="text-sm text-gray-700">
            <span className="inline-flex items-center gap-1">
              <span className="text-red-500">🔥</span>
              <span>{views.toLocaleString()} بازدید</span>
            </span>
          </div>
        )}
        {showInfo.category && <div>🏷️ {category}</div>}
      </div>
    </Link>
  );
}
