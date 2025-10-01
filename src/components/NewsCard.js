// NewsCard.js
import Link from 'next/link';
import Image from 'next/image';
import { formatDistanceToNow, isToday, isYesterday } from 'date-fns-jalali';
import { faIR } from 'date-fns/locale';

function formatRelativeDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isToday(date)) return formatDistanceToNow(date, { addSuffix: true, locale: faIR });
  if (isYesterday(date)) return 'روز گذشته';
  return date.toLocaleDateString('fa-IR');
}

export default function NewsCard({
  news,
  highlightPopular = false,
  layout = "default",          // default | aside
  mobileLayout = "image-top",  // image-top | image-inline
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

  const showImage = layout !== "aside" && news.imageUrl;

  return (
    <Link
      href={`/news/${news.shortId}`}
      className={`flex flex-col md:flex-row gap-4 rounded-xl shadow p-4 transition
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        ${highlightPopular ? 'border border-yellow-400 bg-white hover:bg-gray-50' : 'bg-white hover:bg-gray-50'}
      `}
      title={title}
      aria-label={`مشاهده خبر: ${title}`}
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      {/* عکس خبر */}
      {showImage && (
        <>
          {mobileLayout === "image-top" ? (
            <div className="block md:hidden relative w-full h-40 rounded-md overflow-hidden">
              <Image
                src={news.imageUrl}
                alt={title}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
          ) : (
            <div className="block md:hidden relative w-24 h-24 flex-shrink-0 rounded-md overflow-hidden">
              <Image
                src={news.imageUrl}
                alt={title}
                fill
                className="object-cover"
                sizes="96px"
              />
            </div>
          )}
          <div className="hidden md:block relative w-40 h-28 flex-shrink-0 rounded-md overflow-hidden">
            <Image
              src={news.imageUrl}
              alt={title}
              fill
              className="object-cover"
              sizes="200px"
            />
          </div>
        </>
      )}

      {/* متن خبر */}
      <div className="flex-1">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-gray-700 text-sm line-clamp-3">{news.description}</p>

        {/* اطلاعات فرعی برای موبایل یا aside */}
        {(layout === "aside" || mobileLayout === "image-top") && (
          <div className="mt-2 flex flex-wrap gap-x-4 text-sm text-gray-500">
            {showInfo.date && <div>📅 {date}</div>}
            {showInfo.source && <div>📰 {sourceName}</div>}
            {showInfo.views && (
              <div>
                <span className="inline-flex items-center gap-1">
                  <span className="text-red-500">🔥</span>
                  <span>{views.toLocaleString()} بازدید</span>
                </span>
              </div>
            )}
            {showInfo.category && <div>🏷️ {category}</div>}
          </div>
        )}
      </div>

      {/* اطلاعات فرعی دسکتاپ کنار کارت، فقط برای layout default */}
      {layout === "default" && (
        <div className="hidden md:flex flex-col ml-auto text-sm text-gray-500 space-y-1">
          {showInfo.date && <div>📅 {date}</div>}
          {showInfo.source && <div>📰 {sourceName}</div>}
          {showInfo.views && (
            <div>
              <span className="inline-flex items-center gap-1">
                <span className="text-red-500">🔥</span>
                <span>{views.toLocaleString()} بازدید</span>
              </span>
            </div>
          )}
          {showInfo.category && <div>🏷️ {category}</div>}
        </div>
      )}
    </Link>
  );
}
