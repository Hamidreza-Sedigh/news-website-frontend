import Link from 'next/link';
import { formatDistanceToNow, isToday, isYesterday } from 'date-fns-jalali';
import { faIR } from 'date-fns/locale';

function formatRelativeDate(dateString) {
  if (!dateString) return '';

  const date = new Date(dateString);

  if (isToday(date)) {
    return formatDistanceToNow(date, { addSuffix: true, locale: faIR });
    // مثلا: "۲ ساعت پیش" یا "لحظاتی پیش"
  }

  if (isYesterday(date)) {
    return 'روز گذشته';
  }

  return date.toLocaleDateString('fa-IR'); // برای تاریخ‌های قدیمی‌تر
}

export default function NewsCard({
  news,
  highlightPopular = false,
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
//  const date = news.date ? new Date(news.date).toLocaleDateString('fa-IR') : '';
  const date = formatRelativeDate(news.date);


  return (
    <Link
      // href={`/news/${news._id}`}
      href={`/news/${news.shortId}`}
      className={`flex gap-4 rounded-xl shadow p-4 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        ${highlightPopular ? 'border border-yellow-400 bg-white hover:bg-gray-50' : 'bg-white hover:bg-gray-50'}
      `}
      title={title}
      aria-label={`مشاهده خبر: ${title}`}
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      {/* بخش اصلی - عنوان و توضیح */}
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
