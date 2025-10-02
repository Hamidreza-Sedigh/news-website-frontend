import Link from 'next/link';
import Image from 'next/image';
import { formatDistanceToNow, isToday, isYesterday } from 'date-fns-jalali';
import { faIR } from 'date-fns/locale';
import { Calendar, FileText, Eye, Tag } from 'lucide-react';

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
  mobileLayout = "image-inline", // image-top | image-inline
  showInfo = {
    date: true,
    source: true,
    views: highlightPopular,
    category: !highlightPopular,
  },
  showImage = true, // ← prop جدید
}) {
  const title = news.title || 'مشاهده خبر';
  const views = news.views || 0;
  const category = news.category || 'بدون دسته‌بندی';
  const sourceName = news.sourceName || 'ناشناخته';
  const date = formatRelativeDate(news.date);
  const hasImage = showImage && !!news.imageUrl;

  return (
    <Link
      href={`/news/${news.shortId}`}
      className={`
        flex
        ${mobileLayout === 'image-inline' ? 'flex-row' : 'flex-col'}   // موبایل
        md:flex-row-reverse  // دسکتاپ: تصویر سمت راست
        items-start gap-4 p-4 border-b border-gray-200 hover:bg-gray-50
        ${highlightPopular ? 'bg-white border-yellow-400' : 'bg-white'}
      `}
      title={title}
      aria-label={`مشاهده خبر: ${title}`}
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      {/* متن خبر */}
      <div className={`flex-1 flex flex-col justify-between order-2 md:order-1`}>
        <div>
          <h2 className="text-lg font-semibold mb-1 line-clamp-2">{title}</h2>
          <p className="text-gray-700 text-sm line-clamp-3">{news.description}</p>
        </div>

        {/* اطلاعات فرعی */}
        <div className="mt-2 flex flex-wrap gap-x-4 text-sm text-gray-500 items-center">
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
      </div>

      {/* تصویر */}
      {hasImage && (
        <div className={`relative flex-shrink-0 rounded-md overflow-hidden order-1 md:order-2
          ${mobileLayout === 'image-top' ? 'w-full h-40 md:w-40 md:h-28' : 'w-24 h-24 md:w-40 md:h-28'}
        `}>
          <Image
            src={news.imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 200px"
          />
        </div>
      )}
    </Link>
  );
}
