import { useState } from 'react'
import Head from 'next/head'
import NewsCard from '../components/NewsCard'
import Seo from '@/components/Seo'
import PopularNews from '../components/PopularNews';
import MostViewed from '../components/MostViewed';
import { Disclosure, Transition } from '@headlessui/react'
import { ChevronDownIcon  } from '@heroicons/react/20/solid'
import FeaturedNewsCard from "@/components/FeaturedNewsCard";


export async function getServerSideProps() {
  try {
    const [latestRes, topNewsRes, popularRes] = await Promise.all([
      fetch('http://localhost:3000/api/proxy/news/latest'),
      fetch('http://localhost:3000/api/proxy/news/latest'),
      fetch('http://localhost:3000/api/proxy/news/popular'),
    ]);

    const props = {
      mainNews: [],
      topNews: [],      // 👈 اضافه شد
      popularNews: [],
      error: null,
    };

    if (!latestRes.ok) {
      props.error = `خطا در دریافت اخبار: ${latestRes.status}`;
    } 

    if (latestRes.ok) {
      props.mainNews = await latestRes.json();
    }

    if (topNewsRes.ok) {
      props.topNews = await topNewsRes.json();
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

export default function HomePage({ mainNews, topNews, popularNews, error }) {

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
        <div className="flex flex-col-reverse md:flex-row-reverse gap-6">
        {/* <aside className="w-full md:w-1/4 bg-gray-50 p-4 rounded"> */}
        {/* <aside className="w-full md:w-1/4 bg-white p-4 md:border-r md:border-gray-300"> */}
        <aside className="w-full md:w-1/4 bg-white p-4 md:border-r md:border-gray-300 hover:md:border-gray-400 transition-colors duration-200">
          <Disclosure defaultOpen as="div">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex justify-between items-center w-full px-2 py-2 text-sm font-medium text-right text-gray-800 bg-gray-100 rounded md:hidden">
                  <span>اخبار پربازدید</span>
                  <ChevronDownIcon
                    className={`w-5 h-5 transform transition-transform duration-200 ${
                      open ? 'rotate-180' : ''
                    }`}
                  />
                </Disclosure.Button>

                <h2 className="hidden md:block text-xl md:text-2xl font-semibold mb-4">اخبار پربازدید </h2>

                <Transition
                  enter="transition duration-500 ease-out"
                  enterFrom="opacity-0 -translate-y-4"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition duration-400 ease-in"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 -translate-y-4"
                >
                  <Disclosure.Panel as="div" static> 
                    {/* <PopularNews popularNews={popularNews} />  */}
                    <MostViewed  /> 
                  </Disclosure.Panel>
                </Transition>

              </>
            )}
          </Disclosure>

        </aside>


          <main className="w-full md:flex-1">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">آخرین اخبار</h1>
            {/* <div className="flex flex-col md:flex-row gap-4 mb-6">
              {topNews.slice(0, 2).map((news) => (
                <FeaturedNewsCard
                  key={news._id}
                  title={news.title}
                  imageUrl={news.imageUrl}
                />
              ))}
            </div> */}
            {/* 2 خبر اول با عکس بزرگ */}
            
            
            
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              {mainNews.slice(0, 3).map((news) => (
                <FeaturedNewsCard
                  key={news.shortId}
                  news={news}
                />
              ))}
            </div>

            <hr className="my-4 border-t border-gray-200 opacity-50" />


            <div className="grid grid-cols-1 gap-6">
              {Array.isArray(mainNews) && mainNews.length > 0 ? (
                // mainNews.map((news) =>
                // mainNews.map((news, index) =>
                mainNews.slice(3).map((news) =>
                  news.shortId ? (
                    <NewsCard
                      key={news.shortId}
                      news={news}
                      mobileLayout="image-inline"
                      showImage
                      showInfo={{
                        date: true,
                        source: true,
                        views: true,
                        category: true,
                      }}
                    />
                  ) : null
                )
              ) : (
                <p>هیچ خبری یافت نشد.</p>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
