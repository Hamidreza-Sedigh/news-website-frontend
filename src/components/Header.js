// components/Header.js
import { Fragment, useState } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

const categories = [
  { name: 'سلامت', href: '/categories/سلامت' },
  { name: 'اجتماعی', href: '/categories/اجتماعی' },
  { name: 'علمی', href: '/categories/علمی' },
];

const navigation = [
  { name: 'خانه', href: '/' },
  { name: 'منابع خبری', href: '/sources/news-sources' },
  { name: 'سیاسی', href: '/categories/سیاسی' },
  { name: 'اقتصادی', href: '/categories/اقتصادی' },
  { name: 'ورزشی', href: '/categories/ورزشی' },
  { name: 'فناوری', href: '/categories/فناوری' },
  { name: 'سایر دسته بندی‌ها', subItems: categories },
];

export default function Header() {
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [openSubmenu, setOpenSubmenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // کنترل input جستجو
  const handleSearch = (closeMenu = false) => {
    if (searchTerm.trim() !== '') {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setShowSearch(false);
      setSearchTerm('');
      if (closeMenu) setMobileMenuOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setShowSearch(true);
    }
  };

  const handleInputChange = (e) => setSearchTerm(e.target.value);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(true);
    }
  };

  const handleBlur = () => setShowSearch(false);

  const handleLinkClick = () => {
    setOpenSubmenu(false);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="relative bg-white shadow-sm">
      {/* دسکتاپ */}
      <div className="hidden lg:flex w-full justify-between items-center py-6 px-6">
        <div className="flex items-center space-x-6">
          <Link href="/" legacyBehavior>
            <a className="flex items-center space-x-2">
              <Image src="/logo.png" alt="کهربانت" width={148} height={148} />
              <span className="text-xl font-bold text-gray-900">کهربانت</span>
            </a>
          </Link>

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
                        {({ close }) => (
                          <>
                            {item.subItems.map((sub) => (
                              <Link key={sub.name} href={sub.href} legacyBehavior>
                                <a
                                  onClick={() => {
                                    close();
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                  }}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  {sub.name}
                                </a>
                              </Link>
                            ))}
                          </>
                        )}
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
            ) : (
              <Link key={item.name} href={item.href} legacyBehavior>
                <a className="text-base font-medium text-gray-700 hover:text-blue-600">{item.name}</a>
              </Link>
            )
          )}
        </div>

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
              onClick={() => setShowSearch(true)}
              className="px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              جستجو
            </button>
          )}
        </div>
      </div>

      {/* موبایل */}
      <div className="flex lg:hidden justify-between items-center px-4 py-4">
        <Link href="/" legacyBehavior>
          <a className="flex items-center space-x-2">
            <Image src="/logo.png" alt="کهربانت" width={100} height={100} />
            <span className="text-xl font-bold text-gray-900">کهربانت</span>
          </a>
        </Link>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-md"
        >
          {mobileMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="absolute top-0 inset-x-0 p-2 lg:hidden z-50">
          <div className="rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <Image src="/logo.png" alt="کهربانت" width={120} height={120} />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-md"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="mt-6">
                <nav className="grid gap-y-4">
                  {navigation.map((item) =>
                    item.subItems ? (
                      <div key={item.name}>
                        <button
                          onClick={() => setOpenSubmenu(!openSubmenu)}
                          className="w-full flex justify-between items-center text-base font-medium text-gray-900"
                        >
                          {item.name}
                          <ChevronDownIcon
                            className={`h-4 w-4 transform transition-transform duration-200 ${
                              openSubmenu ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        {openSubmenu && (
                          <div className="ml-4 mt-2 space-y-1">
                            {item.subItems.map((sub) => (
                              <Link key={sub.name} href={sub.href} legacyBehavior>
                                <a
                                  onClick={handleLinkClick}
                                  className="block text-sm text-gray-700 hover:bg-gray-50 px-2 py-1 rounded"
                                >
                                  {sub.name}
                                </a>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link key={item.name} href={item.href} legacyBehavior>
                        <a
                          onClick={handleLinkClick}
                          className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                        >
                          <span className="mr-3 text-base font-medium text-gray-900">{item.name}</span>
                        </a>
                      </Link>
                    )
                  )}
                </nav>

                <div className="mt-4 border-t border-gray-200 pt-4">
                  <Link href="/about" legacyBehavior>
                    <a onClick={handleLinkClick} className="block text-base text-gray-700 hover:text-blue-600 py-2">
                      درباره ما
                    </a>
                  </Link>
                  <Link href="/contact" legacyBehavior>
                    <a onClick={handleLinkClick} className="block text-base text-gray-700 hover:text-blue-600 py-2">
                      تماس با ما
                    </a>
                  </Link>
                </div>
              </div>
            </div>

            <div className="py-6 px-5">
              {showSearch ? (
                <input
                  type="text"
                  autoFocus
                  placeholder="جست‌وجو..."
                  className="w-full border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring focus:ring-blue-300"
                  value={searchTerm}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  onBlur={handleBlur}
                />
              ) : (
                <button
                  onClick={() => handleSearch(true)}
                  className="w-full px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  جستجو
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
