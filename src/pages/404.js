import { useRouter } from 'next/router';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function Custom404() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-200 via-pink-200 to-yellow-200 px-6">
      <div className="w-full max-w-4xl rounded-2xl bg-white/50 p-8 shadow-2xl backdrop-blur-md">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-12">
          {/* سمت چپ: آیکن */}
          <div className="flex-shrink-0">
            <ExclamationTriangleIcon className="h-40 w-40 text-red-500 drop-shadow-md" />
          </div>

          {/* سمت راست: متن و دکمه‌ها */}
          <div className="text-center md:text-left">
            <h1 className="text-7xl font-extrabold text-gray-800">404</h1>
            <p className="mt-4 text-2xl font-semibold text-gray-700">
              صفحه مورد نظر یافت نشد
            </p>
            <p className="mt-2 text-gray-600">
              آدرس وارد شده وجود ندارد یا حذف شده است. لطفاً آدرس را بررسی کنید یا به صفحه اصلی بازگردید.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-4 md:justify-start">
              <button
                onClick={() => router.back()}
                className="rounded-xl bg-gray-200 px-6 py-2 text-gray-800 shadow transition hover:-translate-y-1 hover:bg-gray-300"
              >
                بازگشت
              </button>
              <button
                onClick={() => router.push('/')}
                className="rounded-xl bg-blue-600 px-6 py-2 text-white shadow transition hover:-translate-y-1 hover:bg-blue-700"
              >
                صفحه اصلی
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
