/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'http://kahrobanet.ir',    // دامنه اصلی سایت
  generateRobotsTxt: true,             // robots.txt هم ساخته شود
  exclude: ['/admin/*'],               // مسیرهایی که نباید ایندکس شوند
  sitemapBaseFileName: 'sitemap-static', // نام فایل اصلی سایت‌مپ

  // گزینه‌های اضافه برای robots.txt
  robotsTxtOptions: {
    additionalSitemaps: [
      'http://kahrobanet.ir/sitemap-news.xml',  // sitemap دوم
    ],
  },
}
