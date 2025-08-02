// components/NewsHeader.js
import { Fragment, useState } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Link from 'next/link';
import Image from 'next/image';

const categories = [
  { name: 'سلامت', href: '/categories/سلامت' },
  { name: 'جامعه', href: '/categories/جامعه' },
  { name: 'علمی', href: '/categories/علمی' },
  { name: 'فناوری', href: '/categories/فناوری' },
];

const navigation = [
  { name: 'خانه', href: '/' },
  { name: 'منابع خبری', href: '/sources/news-sources' },
  { name: 'سیاسی', href: '/categories/سیاسی' },
  { name: 'اقتصادی', href: '/categories/اقتصادی' },
  { name: 'ورزشی', href: '/categories/ورزشی' },
  { name: 'سایر دسته بندی‌ها', subItems: categories },
  { name: 'درباره ما', href: '/about' },
  { name: 'تماس با ما', href: '/contact' },
];

export default function NewsHeader() {
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [openSubmenu, setOpenSubmenu] = useState(false);


  const handleSearchClick = () => setShowSearch(true);
  const handleInputChange = (e) => setSearchTerm(e.target.value);
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchTerm.trim() !== '') {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setShowSearch(false);
      setSearchTerm('');
    }
  };
  const handleBlur = () => {
    setShowSearch(false);
    setSearchTerm('');
  };

  return (
    <Popover as="header" className="relative bg-white shadow-sm">
      <div className="w-full px-0 mx-0">
        <div className="hidden md:flex items-center justify-between py-6">

          {/* سمت راست: لوگو + دسته‌بندی‌ها */}
          <div className="flex items-center space-x-6">
            {/* لوگو */}
            <Link href="/" legacyBehavior>
              <a className="flex items-center space-x-2">
                <Image src="/logo.png" alt="کهربانت" width={48} height={48} />
                <span className="text-xl font-bold text-gray-900">کهربانت</span>
              </a>
            </Link>

            {/* دسته‌بندی‌های اصلی */}
            {navigation.map((item) =>
              item.subItems ? (
                <Popover className="relative" key={item.name}>
                  {({ open }) => (
                    <>
                      <Popover.Button className="flex items-center text-base font-medium text-gray-700 hover:text-blue-600">
                        {item.name}
                        <ChevronDownIcon
                          className={`ml-1 h-4 w-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                        />
                      </Popover.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="absolute right-0 z-10 mt-2 w-48 bg-white rounded-md shadow-lg py-2">
                          {item.subItems.map((sub) => (
                            <Link key={sub.name} href={sub.href} legacyBehavior>
                              <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                {sub.name}
                              </a>
                            </Link>
                          ))}
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
              ) : (
                <Link key={item.name} href={item.href} legacyBehavior>
                  <a className="text-base font-medium text-gray-700 hover:text-blue-600">
                    {item.name}
                  </a>
                </Link>
              )
            )}
          </div>

          {/* سمت چپ: جستجو + درباره ما + تماس با ما */}
          <div className="flex items-center space-x-6">
            <Link href="/about" legacyBehavior>
              <a className="text-base font-medium text-gray-700 hover:text-blue-600">درباره ما</a>
            </Link>
            <Link href="/contact" legacyBehavior>
              <a className="text-base font-medium text-gray-700 hover:text-blue-600">تماس با ما</a>
            </Link>
            {showSearch ? (
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
            ) : (
              <button
                onClick={handleSearchClick}
                className="px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                جستجو
              </button>
            )}
          </div>
        </div>
      </div>

      {/* منوی موبایل - بدون تغییر */}
      {/* ... (همون Popover.Panel موبایل قبل) */}
    </Popover>
  );

}
