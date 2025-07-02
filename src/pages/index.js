import { useState } from 'react'
import Head from 'next/head'
import NewsCard from '../components/NewsCard'
import Seo from '@/components/Seo'
import PopularNews from '../components/PopularNews';
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'

export async function getServerSideProps() {
  try {
    const [latestRes, popularRes] = await Promise.all([
      fetch('http://localhost:8000/api/news/latest'),
      fetch('http://localhost:3000/api/proxy/news/popular'),
    ]);

    const props = {
      mainNews: null,
      popularNews: [],
      error: null,
    };

    if (!latestRes.ok) {
      props.error = `خطا در دریافت اخبار: ${latestRes.status}`;
    } else {
      props.mainNews = await latestRes.json();
    }

    if (popularRes.ok) {
      props.popularNews = await popularRes.json();
    }

    return { props };
  } catch (error) {
    return {
      props: {
        mainNews: null,
        popularNews: [],
        error: error.message || 'خطای نامشخص در دریافت اطلاعات',
      },
    };
  }
}

export default function HomePage({ mainNews, popularNews, error }) {

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
        <h1 className="text-2xl md:text-3xl font-bold mb-4">آخرین اخبار</h1>

        <div className="flex flex-col-reverse md:flex-row-reverse gap-6">
          <aside className="w-full md:w-1/4 bg-gray-50 p-4 rounded">
            <Disclosure defaultOpen={true}>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex justify-between w-full px-2 py-2 text-sm font-medium text-right text-gray-800 bg-gray-100 rounded md:hidden">
                    <span>اخبار مهم</span>
                    <ChevronUpIcon
                      className={`w-5 h-5 transform transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                    />
                  </Disclosure.Button>

                  <Disclosure.Panel className="mt-4 md:mt-0 md:block">
                    <h2 className="hidden md:block text-xl md:text-2xl font-semibold mb-4">اخبار مهم</h2>
                    <PopularNews popularNews={popularNews} />
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </aside>

          <main className="w-full md:flex-1">
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
