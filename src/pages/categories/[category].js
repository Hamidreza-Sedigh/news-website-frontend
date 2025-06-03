import React from 'react'
import Head from 'next/head'
import NewsCard from '@/components/NewsCard' // مسیرت رو بر اساس پروژه خودت تنظیم کن

export async function getServerSideProps(context) {
  const { category } = context.params

  try {
    const res = await fetch(`http://localhost:8000/api/news?category=${encodeURIComponent(category)}&limit=20`)
    const data = await res.json()

    return {
      props: {
        category,
        newsList: data || [],
      },
    }
  } catch (error) {
    console.error('Error fetching category news:', error)
    return {
      props: {
        category,
        newsList: [],
      },
    }
  }
}

export default function CategoryPage({ category, newsList }) {
  return (
    <>
      <Head>
        <title>دسته‌بندی: {category}</title>
      </Head>

      <div className="max-w-full px-4 py-6 rtl">
        <h1 className="text-2xl font-bold mb-6 text-right">
          اخبار دسته: <span className="text-blue-600">{category}</span>
        </h1>

        <div className="grid grid-cols-1 gap-4">
          {newsList.length === 0 && (
            <p className="text-gray-500 text-right">هیچ خبری در این دسته وجود ندارد.</p>
          )}
          {newsList.map((news) => (
            <NewsCard key={news._id} news={news} />
          ))}
        </div>
      </div>
    </>
  )
}
