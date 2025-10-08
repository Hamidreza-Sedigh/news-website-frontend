import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon, GlobeAltIcon, ShieldCheckIcon, UserCircleIcon } from "@heroicons/react/24/solid";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center py-16 px-6">
      <div className="max-w-4xl w-full bg-white/80 backdrop-blur-md shadow-xl rounded-3xl p-10 border border-gray-100">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-indigo-700 mb-3">
            درباره ما
          </h1>
          <p className="text-gray-600 text-lg">
            بی‌طرف، شفاف و متعهد به انتقال مستقیم اخبار
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-indigo-100/60 rounded-2xl p-5 text-center shadow hover:shadow-md transition">
            <GlobeAltIcon className="w-10 h-10 text-indigo-600 mx-auto mb-3" />
            <h3 className="font-semibold text-indigo-700">منابع معتبر</h3>
            <p className="text-gray-600 text-sm mt-1">
              تمامی اخبار از منابع شناخته‌شده و قابل اعتماد جمع‌آوری می‌شوند.
            </p>
          </div>

          <div className="bg-purple-100/60 rounded-2xl p-5 text-center shadow hover:shadow-md transition">
            <ShieldCheckIcon className="w-10 h-10 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold text-purple-700">بی‌طرفی کامل</h3>
            <p className="text-gray-600 text-sm mt-1">
              هیچ وابستگی سیاسی، مذهبی یا سازمانی نداریم. فقط واقعیت‌ها را منتقل می‌کنیم.
            </p>
          </div>

          <div className="bg-pink-100/60 rounded-2xl p-5 text-center shadow hover:shadow-md transition">
            <UserCircleIcon className="w-10 h-10 text-pink-600 mx-auto mb-3" />
            <h3 className="font-semibold text-pink-700">تجربه شخصی‌سازی‌شده</h3>
            <p className="text-gray-600 text-sm mt-1">
              با ورود به حساب خود، اخبار مرتبط با علایق شما نمایش داده می‌شود.
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-4 text-gray-700 leading-relaxed text-justify mb-10">
          <p>
            وب‌سایت خبری ما هیچ‌گونه خبر یا محتوایی را تولید نمی‌کند. تمامی اخبار
            به‌صورت خودکار از منابع معتبر و رسمی دریافت شده و بدون هیچ‌گونه
            ویرایش، بازنویسی یا حذف در اختیار شما قرار می‌گیرند. ما تنها یک
            پلتفرم جمع‌آوری و نمایش هستیم.
          </p>
          <p>
            موتور جمع‌آوری هوشمند ما (News Crawler) اخبار را از چندین منبع به‌روز
            جمع‌آوری کرده و دقیقاً همان محتوای اصلی را برای شما ارسال می‌کند.
            این فرایند بدون دخالت انسانی انجام می‌شود تا بی‌طرفی و اصالت خبر
            حفظ شود.
          </p>
          <p>
            ما باور داریم که کاربران حق دارند اطلاعات را از منابع مختلف ببینند
            و با مقایسه، قضاوت خود را شکل دهند.
          </p>
        </div>

        {/* Privacy Section (Headless UI Accordion) */}
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between items-center rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-4 text-left text-lg font-semibold text-white shadow-md hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300">
                <span>سیاست‌های حریم خصوصی و ذخیره اطلاعات کاربر</span>
                <ChevronUpIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } w-6 h-6 text-white`}
                />
              </Disclosure.Button>
              <Transition
                enter="transition duration-200 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-150 ease-in"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel className="px-6 pt-4 pb-2 mt-2 bg-indigo-50 rounded-xl text-gray-700 leading-relaxed text-justify">
                  در صورت ورود (لاگین) به سایت، ما تاریخچه‌ی بازدید و علاقه‌مندی‌های شما
                  را ذخیره می‌کنیم تا بتوانیم محتوای خبری مرتبط با سلیقه‌تان را
                  نمایش دهیم. اطلاعات شخصی شما هرگز به هیچ شخص یا سازمان دیگری
                  فروخته یا منتقل نمی‌شود و صرفاً برای بهبود تجربه کاربری استفاده
                  خواهد شد.
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>

        {/* Footer */}
        <div className="text-center mt-10 border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} کلیه حقوق این وب‌سایت محفوظ است.  
            طراحی شده با ❤️ برای شفافیت در اخبار.
          </p>
        </div>
      </div>
    </div>
  );
}
