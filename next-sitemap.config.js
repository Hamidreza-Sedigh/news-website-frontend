/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'http://kahrobanet.ir',
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
      'http://kahrobanet.ir/sitemap-news.xml',
    ],
  },
};
