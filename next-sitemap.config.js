/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://kahrobanet.ir',
  generateRobotsTxt: true,
  exclude: [
    '/admin/*',
    '/dashboard/*',
    '/login',
    '/register',
  ],
  sitemapBaseFileName: 'sitemap-static',
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/dashboard/', '/login', '/register'],
      },
    ],
    additionalSitemaps: [
      'https://kahrobanet.ir/sitemap-news.xml',
    ],
  },
};
