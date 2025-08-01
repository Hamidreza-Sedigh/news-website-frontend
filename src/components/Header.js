// components/NewsHeader.js
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';


const navigation = [
  { name: 'خانه', href: '/' },
  { name: 'منابع خبری', href: '/sources/news-sources' },
  { name: 'سیاسی', href: '/categories/سیاسی' },
  { name: 'اقتصادی', href: '/categories/اقتصادی' },
  { name: 'ورزشی', href: '/categories/ورزشی' },
  { name: 'فناوری', href: '/categories/فناوری' },
  { name: 'سلامت', href: '/categories/سلامت' },
  // { name: 'سایر دسته بندی ها', href: '/categories/سلامت' },
  { name: 'درباره ما', href: '/about' },
  { name: 'تماس با ما', href: '/contact' },
]

export default function NewsHeader() {
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchClick = () => {
    setShowSearch(true);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setShowSearch(false);
      setSearchTerm("");
    }
  };

  const handleBlur = () => {
    setShowSearch(false);
    setSearchTerm("");
  };
  
  return (
    <Popover as="header" className="relative bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
          {/* لوگو و عنوان سایت */}
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/" legacyBehavior>
              <a className="flex items-center">
                <span className="sr-only">سایت خبری</span>
                {/* <svg
                  className="h-8 w-auto text-blue-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                > */}
                <Image
                  src="/logo.png"
                  alt="کهربانت"
                  width={40}
                  height={40}
                />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                {/* </svg> */}
                <span className="mr-2 text-xl font-bold text-gray-900">کهربانت</span>
              </a>
            </Link>
          </div>

          {/* منوی موبایل */}
          <div className="-mr-2 -my-2 md:hidden">
            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none">
              <span className="sr-only">باز کردن منو</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>

          {/* منوی اصلی دسکتاپ */}
          <nav className="hidden md:flex space-x-10">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href} legacyBehavior>
                <a className="text-base font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200">
                  {item.name}
                </a>
              </Link>
            ))}
          </nav>

          {/* دکمه جستجو (اختیاری) */}
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            { showSearch  ? (
                <input
                type="text"
                autoFocus
                placeholder="جست‌وجو..."
                className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring focus:ring-blue-300"
                value={searchTerm}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
              />
            ):(
              <button 
                className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                aria-label="Search"
                onClick={handleSearchClick}
              >
                جستجو
              </button>
            )
            }
          </div>
        </div>
      </div>

      {/* منوی موبایل (پاپ آور) */}
      <Transition
        as={Fragment}
        enter="duration-150 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden z-50"
        >
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <svg
                    className="h-8 w-auto text-blue-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                    />
                  </svg>
                  <span className="mr-2 text-xl font-bold text-gray-900">کهربانت</span>
                </div>
                <div className="-mr-2">
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none">
                    <span className="sr-only">بستن منو</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8">
                  {navigation.map((item) => (
                    <Link key={item.name} href={item.href} legacyBehavior>
                      <a className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50">
                        <span className="mr-3 text-base font-medium text-gray-900">{item.name}</span>
                      </a>
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
            <div className="py-6 px-5 space-y-6">
              <div>
              { showSearch  ? (
                <input
                  type="text"
                  autoFocus
                  placeholder="جست‌وجو..."
                  className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring focus:ring-blue-300"
                  value={searchTerm}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  onBlur={handleBlur}
                />
              ):( 
                  <button 
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                    onClick={handleSearchClick}
                    aria-label="Search"
                  >
                    جستجو
                  </button>
              )}
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}