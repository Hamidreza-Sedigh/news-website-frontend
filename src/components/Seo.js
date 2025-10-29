import Head from 'next/head'

export default function Seo({
  title,
  description,
  url = '',
  image = '/default.jpg',
  type = 'article',
}) {
  const fullTitle = title ? `${title} | سایت خبری کهربا` : 'کهربا نت'
  const siteUrl = url.startsWith('http') ? url : `https://kahrobanet.ir${url}`
  const shortDesc = description ? description.slice(0, 160) : 'آخرین اخبار روز ایران و جهان در سایت خبری کهربا نت.'

  return (
    <Head>
      {/* --- Title & Description --- */}
      <title>{fullTitle}</title>
      <meta name="description" content={shortDesc} />
      <link rel="canonical" href={siteUrl} />

      {/* --- Open Graph (Facebook, Telegram, etc.) --- */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={shortDesc} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="کهربا نت" />
      <meta property="og:locale" content="fa_IR" />

      {/* --- Twitter Card --- */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={shortDesc} />
      <meta name="twitter:image" content={image} />

      {/* --- Structured Data (Schema.org) --- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": type === 'article' ? 'NewsArticle' : 'WebPage',
            headline: fullTitle,
            description: shortDesc,
            image: image,
            url: siteUrl,
            publisher: {
              "@type": "Organization",
              name: "کهربا نت",
              logo: {
                "@type": "ImageObject",
                url: "https://kahrobanet.ir/favicon-32x32.png",
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": siteUrl,
            },
          }),
        }}
      />
    </Head>
  )
}
