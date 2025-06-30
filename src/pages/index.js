import { useState } from 'react'
import Head from 'next/head'
import NewsCard from '../components/NewsCard'

export async function getServerSideProps() {
  try {
    const res = await fetch('http://localhost:8000/api/news/latest')

    if (!res.ok) {
      // اگر پاسخ سرور خطا بود
      return {
        props: {
          mainNews: null,
          error: `خطا در دریافت اخبار: ${res.status}`,
        },
      }
    }

    const mainNews = await res.json()

    return {
      props: {
        mainNews,
        error: null,
      },
    }
  } catch (error) {
    // خطاهای شبکه یا غیرمنتظره
    return {
      props: {
        mainNews: null,
        error: error.message || 'خطای نامشخص در دریافت اخبار',
      },
    }
  }
}

export default function HomePage({ mainNews, error }) {
  // فرض کنیم اخبار مهم ماک هست
  const importantNewsMock = [
    {
      _id: 'imp1',
      title: 'خبر مهم ۱: افزایش قیمت ارز',
      description: 'افزایش ناگهانی قیمت ارز در بازار امروز...',
      sourceName: 'خبرگزاری الف',
      date: new Date('2025-06-01'),
      link: '/news/imp1',
    },
    {
      _id: 'imp2',
      title: 'خبر مهم ۲: انتخابات پیش رو',
      description: 'جزئیات بیشتر درباره انتخابات آتی...',
      sourceName: 'خبرگزاری ب',
      date: new Date('2025-06-02'),
      link: '/news/imp2',
    },
  ]

  if (error) {
    return (
      <div className="max-w-full px-4 py-6 text-right" dir="rtl">
        <h1 className="text-2xl font-bold mb-4">آخرین اخبار</h1>
        <p className="text-red-600 font-semibold">خطا: {error}</p>
      </div>
    )
  }

  if (!mainNews || mainNews.length === 0) {
    return (
      <div className="max-w-full px-4 py-6 text-right" dir="rtl">
        <h1 className="text-2xl font-bold mb-4">آخرین اخبار</h1>
        <p>هیچ خبری یافت نشد.</p>
      </div>
    )
  }

  return (
    <>
      <Seo
        title="صفحه اصلی"
        description="جدیدترین اخبار ایران و جهان در دسته‌بندی‌های مختلف"
        url="/"
        image="/og-home.jpg"
        type="website"
      />

      <div className="max-w-full px-4 py-6 text-right" dir="rtl">
        <h1 className="text-2xl font-bold mb-4">آخرین اخبار</h1>

        <div className="flex gap-6 flex-row-reverse">
          <aside className="w-1/4 bg-gray-50 p-4 rounded">
            <h2 className="text-xl font-semibold mb-4">اخبار مهم</h2>
            {importantNewsMock.map((news) => (
              <NewsCard key={news._id} news={news} />
            ))}
          </aside>

          <main className="flex-1">
            <div className="grid grid-cols-1 gap-6">
              {mainNews.map((news) => (
                <NewsCard key={news._id} news={news} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
