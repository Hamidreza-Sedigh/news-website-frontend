// pages/news/[id].js
import { useRouter } from 'next/router'
import Head from 'next/head'
import parse from 'html-react-parser'

export async function getServerSideProps(context) {
  const { id } = context.params

  try {
    const res = await fetch(`http://localhost:8000/api/news/${id}`)
    const data = await res.json()

    return {
      props: {
        news: data || null,
      },
    }
  } catch (error) {
    return {
      props: {
        news: null,
      },
    }
  }
}

export default function NewsDetailPage({ news }) {
  const router = useRouter()

  if (!news) {
    return <p className="text-center text-red-500 mt-10">خبر مورد نظر یافت نشد.</p>
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <Head>
        <title>{news.title}</title>
      </Head>

      <h1 className="text-2xl font-bold mb-4">{news.title}</h1>
      <p className="text-gray-600 text-sm mb-1">منبع: {news.sourceName}</p>
      <p className="text-gray-500 text-xs mb-4">
        تاریخ: {new Date(news.date).toLocaleDateString('fa-IR')}
      </p>

      <div className="flex items-center gap-2 text-sm text-gray-500 mt-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553 2.276A1 1 0 0120 13.118V14a1 1 0 01-.553.894L15 17v-7zm-6 0v7l-4.553-2.106A1 1 0 014 14v-.882a1 1 0 01.553-.842L9 10z" />
        </svg>
        <span>{news.views?.toLocaleString('fa-IR')} بازدید</span>
      </div>

      {/* <p className="text-sm text-gray-500 mt-2">
        تعداد بازدید: {news.views?.toLocaleString('fa-IR')}
      </p> */}


      <div className="prose prose-sm md:prose lg:prose-lg max-w-none text-gray-800 leading-relaxed">
        {parse(news.passage || '')}
      </div>
      {/* <p className="text-gray-800 text-base leading-relaxed whitespace-pre-line">{news.passage}</p> */}

      <div className="mt-6 text-sm text-blue-600">
        <a href={news.link} target="_blank" rel="noopener noreferrer" className="underline">
          مشاهده در منبع اصلی
        </a>
      </div>
    </div>
  )
}
