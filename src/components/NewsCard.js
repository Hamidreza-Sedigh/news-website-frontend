import Link from 'next/link'

export default function NewsCard({ news }) {
  const title = news.title || 'مشاهده خبر'

  return (
    <Link
      href={`/news/${news._id}`} // ← لینک داخلی
      className="block bg-white rounded-xl shadow p-4 hover:shadow-md transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      title={title}
      aria-label={`مشاهده خبر: ${title}`}
      style={{
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 text-sm mb-1">منبع: {news.sourceName}</p>
      <p className="text-gray-500 text-xs mb-2">
        تاریخ: {new Date(news.date).toLocaleDateString('fa-IR')}
      </p>
      <p className="text-gray-700 text-sm line-clamp-3">{news.description}</p>
    </Link>
  )
}
