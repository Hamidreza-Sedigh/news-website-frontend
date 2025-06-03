// components/NewsCard.js
import Link from 'next/link'

export default function NewsCard({ news }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 hover:shadow-md transition">
      {/* اگر تصویر نداری می‌تونی یک placeholder اینجا بذاری */}
      {/* <img src="/placeholder.png" alt={news.title} className="w-full h-40 object-cover rounded-md mb-4" /> */}

      <h2 className="text-lg font-semibold mb-2">{news.title}</h2>
      <p className="text-gray-600 text-sm mb-1">منبع: {news.sourceName}</p>
      <p className="text-gray-500 text-xs mb-2">
        تاریخ: {new Date(news.date).toLocaleDateString('fa-IR')}
      </p>
      <p className="text-gray-700 text-sm line-clamp-3">{news.description}</p>

      <Link
        href={news.link}
        className="inline-block mt-3 text-blue-600 hover:underline"
      >
        ادامه مطلب
      </Link>
    </div>
  )
}
