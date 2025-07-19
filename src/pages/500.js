import { useRouter } from 'next/router';
import { ServerStackIcon } from '@heroicons/react/24/outline';

export default function Custom500() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-red-200 via-red-300 to-red-400 px-4 text-center">
      <ServerStackIcon className="h-24 w-24 text-red-700 drop-shadow-lg" />
      <h1 className="mt-6 text-6xl font-extrabold text-red-900">500</h1>
      <p className="mt-2 text-lg text-red-800">
        متأسفیم، خطایی در سرور رخ داده است.
      </p>

      <div className="mt-6 flex gap-4">
        <button
          onClick={() => router.reload()}
          className="rounded-xl bg-red-600 px-5 py-2 text-white shadow transition hover:bg-red-700"
        >
          تلاش مجدد
        </button>
        <button
          onClick={() => router.push('/')}
          className="rounded-xl bg-white px-5 py-2 text-red-700 shadow transition hover:bg-red-100"
        >
          بازگشت به صفحه اصلی
        </button>
      </div>
    </div>
  );
}
