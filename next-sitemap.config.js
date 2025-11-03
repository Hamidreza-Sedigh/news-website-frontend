/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'http://kahrobanet.ir',    // دامنه اصلی سایت
  generateRobotsTxt: true,             // robots.txt هم ساخته شود
  exclude: [
    '/admin/*',
    '/dashboard/*', // ← اضافه کن
    '/login',       // ← اگر صفحه لاگین داری
    '/register',    // ← اگر صفحه ثبت‌نام داری
  ],
  sitemapBaseFileName: 'sitemap-static', // نام فایل اصلی سایت‌مپ

  // گزینه‌های اضافه برای robots.txt
  robotsTxtOptions: {
    additionalSitemaps: [
      'http://kahrobanet.ir/sitemap-news.xml',  // sitemap دوم
    ],
  },
}
