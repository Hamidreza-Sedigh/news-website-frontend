import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'

const categories = [
  { name: 'سیاسی', href: '/categories/سیاسی' },
  { name: 'اقتصادی', href: '/categories/اقتصادی' },
  { name: 'ورزشی', href: '/categories/ورزشی' },
  { name: 'فرهنگی', href: '/categories/فرهنگی' },
  { name: 'فناوری', href: '/categories/فناوری' },

]

const socialLinks = [
  { name: 'توییتر', href: '#', icon: '/icons/twitter.svg' },
  { name: 'فیسبوک', href: '#', icon: '/icons/facebook.svg' },
  { name: 'اینستاگرام', href: '#', icon: '/icons/instagram.svg' },
  { name: 'تلگرام', href: '#', icon: '/icons/telegram.svg' },
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* بخش بالایی فوتر */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12">
          {/* دسته‌بندی‌ها */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
              دسته‌بندی‌ها
            </h3>
            <div className="mt-4 grid grid-cols-2 gap-4">
              {categories.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-base hover:text-blue-400 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* لینک‌های مفید */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
              لینک‌های مفید
            </h3>
            <div className="mt-4 space-y-4">
              <Link href="/about" className="block hover:text-blue-400 transition-colors">
                درباره ما
              </Link>
              <Link href="/contact" className="block hover:text-blue-400 transition-colors">
                تماس با ما
              </Link>
              <Link href="/advertise" className="block hover:text-blue-400 transition-colors">
                تبلیغات
              </Link>
              <Link href="/archive" className="block hover:text-blue-400 transition-colors">
                آرشیو خبرها
              </Link>
            </div>
          </div>

          {/* اشتراک در خبرنامه */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
              اشتراک در خبرنامه
            </h3>
            <p className="mt-4 text-sm text-gray-300">
              با اشتراک در خبرنامه، آخرین اخبار را در ایمیل خود دریافت کنید.
            </p>
            <form className="mt-4 flex">
              <input
                type="email"
                placeholder="آدرس ایمیل"
                className="flex-1 rounded-r-md border-0 px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="rounded-l-md bg-blue-600 px-4 py-2 text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                ارسال
              </button>
            </form>
          </div>

          {/* شبکه‌های اجتماعی */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
              ما را دنبال کنید
            </h3>
            <div className="mt-4 flex space-x-6">
              socialLinks
              {/* {socialLinks.map((item) => (
                <Link key={item.name} href={item.href} className="hover:text-blue-400 transition-colors">
                  <span className="sr-only">{item.name}</span>
                  <img src={item.icon} alt={item.name} className="h-6 w-6" />
                </Link>
              ))} */}
            </div>
          </div>
        </div>

        {/* بخش پایینی فوتر */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} سایت خبری. تمام حقوق محفوظ است.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <Link href="/privacy" className="text-sm hover:text-blue-400 transition-colors">
                حریم خصوصی
              </Link>
              <Link href="/terms" className="text-sm hover:text-blue-400 transition-colors">
                شرایط استفاده
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}