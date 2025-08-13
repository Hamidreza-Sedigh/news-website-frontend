import Head from 'next/head'

export default function Seo({
  title,
  description,
  url = '',
  image = '/default.jpg',
  type = 'article',
}) {
  const fullTitle = title ? `${title} | سایت خبری کهربا` : 'کهربا'
  // const siteUrl = url.startsWith('http') ? url : `https://example.com${url}`
  const siteUrl = url.startsWith('http') ? url : `http://kahrobanet.ir${url}`

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description?.slice(0, 160)} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:type" content={type} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* آیکون‌ها */}
      {/* <link rel="icon" href="/favicon-32x32.png" sizes="32x32" />
      <link rel="icon" href="/favicon-16x16.png" sizes="16x16" />
      <link rel="apple-touch-icon" href="/apple-touch-icon-180x180.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <meta property="og:image" content="/og-image-1200x630.png" />
      <meta name="theme-color" content="#1E3A8A" /> */}
    </Head>
  )
}
