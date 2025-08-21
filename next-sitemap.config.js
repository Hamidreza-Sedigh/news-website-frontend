/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'http  ://kahrobanet.ir', // دامنه اصلی
    generateRobotsTxt: true,          // robots.txt هم می‌سازه
    exclude: ['/admin/*'],            // مسیرهایی که نباید ایندکس بشن
    sitemapBaseFileName: 'sitemap-static', // اسم فایل میشه sitemap-static.xml

  }
  