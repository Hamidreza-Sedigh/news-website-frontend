import Link from 'next/link';

export default function NewsCard({ news, highlightPopular = false }) {
  const title = news.title || 'مشاهده خبر';
  const views = news.views || 0;

  return (
    <Link
      href={`/news/${news._id}`}
      className={`flex rounded-xl shadow p-4 gap-4 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        ${highlightPopular ? 'border border-yellow-400 bg-white hover:bg-gray-50' : 'bg-white hover:bg-gray-50'}
      `}
      title={title}
      aria-label={`مشاهده خبر: ${title}`}
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      {/* ستونی که می‌خوای در سمت راست (در ظاهر) باشه */}
      <div className="flex-1">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-gray-700 text-sm line-clamp-3">{news.description}</p>
      </div>

      {/* ستونی که باید به چپ بچسبه (در ظاهر) */}
      <div className="w-40 flex-shrink-0 text-sm text-gray-500 text-left space-y-1 ml-auto">
        <div>📅 {new Date(news.date).toLocaleDateString('fa-IR')}</div>
        <div>📰 {news.sourceName}</div>

        {highlightPopular ? (
          <div className="text-sm text-gray-700">
            <span className="inline-flex items-center gap-1">
              <span className="text-red-500">🔥</span>
              <span>{views.toLocaleString()} بازدید</span>
            </span>
          </div>
        ) : (
          <div>🏷️ {news.category || 'بدون دسته‌بندی'}</div>
        )}
      </div>
    </Link>


  );
}
