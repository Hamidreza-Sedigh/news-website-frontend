import Head from 'next/head'

export default function NewsLayout({ children, meta }) {
  const {
    title,
    description,
    url,
    image = '/default.jpg', // اگر تصویری نداشتی
  } = meta || {}

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description?.slice(0, 160)} />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />

      </Head>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
