// pages/news-sources.js
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
            <div
              key={sourceName}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-100 flex flex-col justify-between"
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-900">
                {sourceName}
              </h2>
              <a
                href={`/news-sources/${encodeURIComponent(sourceName)}`}
                className="inline-block mt-auto text-sm font-medium text-blue-600 hover:underline"
              >
                مشاهده خبرهای وب‌سایت
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const { req } = context;
    const baseUrl = `http://${req.headers.host}`; // برای SSR در محیط dev و prod

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
