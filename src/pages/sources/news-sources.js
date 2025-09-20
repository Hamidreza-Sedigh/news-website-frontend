// pages/news-sources.js
import Link from "next/link";

export default function NewsSources({ sources }) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-10 text-center text-gray-800">
        منابع خبری
      </h1>

      {sources.length === 0 ? (
        <p className="text-center text-gray-500">هیچ منبع خبری یافت نشد.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sources.map((sourceName) => (
            <Link
              key={sourceName}
              href={`/news-sources/${encodeURIComponent(sourceName)}`}
              className="flex items-center justify-center text-center 
                         bg-white rounded-2xl shadow-lg p-10 
                         hover:shadow-2xl hover:bg-blue-50 hover:scale-105 
                         transition-transform transition-colors duration-300 
                         border border-gray-100 cursor-pointer"
            >
              <h2 className="text-xl font-semibold text-gray-900">
                {sourceName}
              </h2>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps({ req }) {
  try {
    // پروتکل و هاست فعلی را به دست می‌آوریم
    // Nginx باید X-Forwarded-Proto را ست کرده باشد
    const protocol = req.headers["x-forwarded-proto"] || "http";
    const host = req.headers.host;
    const baseUrl = `${protocol}://${host}`; // http://localhost:3000 یا http://kahrobanet.ir

    console.log("==== SSR Debug ====");
    console.log("protocol:", protocol);
    console.log("host:", host);
    console.log("baseUrl:", baseUrl);
    console.log("==================");

    const res = await fetch(`${baseUrl}/api/proxy/sources/sources`);
    const data = await res.json();

    return {
      props: {
        sources: data.sources || [],
      },
    };
  } catch (err) {
    console.error("خطا در گرفتن منابع خبری:", err);
    return {
      props: {
        sources: [],
      },
    };
  }
}
