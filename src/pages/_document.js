import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="fa">
      <Head>
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" />
        <link rel="apple-touch-icon" href="/apple-touch-icon-180x180.png" />
        {/* <link rel="manifest" href="/site.webmanifest" /> */}
        {/* <meta property="og:image" content="/og-image-1200x630.png" /> */}
        <meta name="theme-color" content="#1E3A8A" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
