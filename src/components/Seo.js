import Head from 'next/head'

export default function Seo({
  title,
  description,
  url = '',
  image = '/default.jpg',
  type = 'article',
}) {
  const fullTitle = title ? `${title} | سایت خبری کهربا` : 'کهربا'
  const siteUrl = url.startsWith('http') ? url : `https://example.com${url}`

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
    </Head>
  )
}
