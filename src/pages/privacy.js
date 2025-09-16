// File: pages/privacy-policy.js
import Head from 'next/head'

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>حریم خصوصی | کهربا نت</title>
        <meta name="description" content="سیاست‌های حریم خصوصی سایت — نحوه جمع‌آوری و نگهداری اطلاعات کاربران" />
      </Head>

      <main className="min-h-screen bg-gray-50 p-6 md:p-12">
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 md:p-10">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">سیاست حریم خصوصی</h1>

          <p className="mb-3">ما به حفظ حریم خصوصی بازدیدکنندگان سایت اهمیت می‌دهیم. در این صفحه توضیح داده شده که چه اطلاعاتی جمع‌آوری می‌شود، چرا جمع‌آوری می‌شود و چگونه از آن محافظت می‌کنیم.</p>

          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2">۱. اطلاعات جمع‌آوری‌شده</h2>
            <ul className="list-disc list-inside">
              <li>اطلاعات واردشده توسط کاربر (مانند نام، ایمیل، نظرات).</li>
              <li>اطلاعات فنی که به‌صورت خودکار جمع‌آوری می‌شوند (مثل آدرس IP، نوع مرورگر، صفحات بازدیدشده، زمان بازدید).</li>
              <li>کوکی‌ها و داده‌های مربوط به تعامل با سایت.</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2">۲. اهداف استفاده</h2>
            <p className="mb-2">ما از اطلاعات برای موارد زیر استفاده می‌کنیم:</p>
            <ul className="list-disc list-inside">
              <li>بهبود تجربه کاربری و عملکرد سایت.</li>
              <li>تحلیل آماری (مثلاً با سرویس‌هایی مانند Google Analytics).</li>
              <li>ارسال خبرنامه یا اطلاعیه‌ها (در صورت رضایت کاربر).</li>
              <li>نمایش تبلیغات در صورت استفاده از شبکه‌های تبلیغاتی.</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2">۳. کوکی‌ها</h2>
            <p>ما ممکن است از کوکی‌ها برای ذخیره ترجیحات کاربر، تحلیل ترافیک و ارائه ویژگی‌های سایت استفاده کنیم. کاربر می‌تواند از طریق تنظیمات مرورگر کوکی‌ها را غیرفعال کند، اما ممکن است برخی از قابلیت‌های سایت به‌درستی کار نکنند.</p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2">۴. اشتراک‌گذاری با اشخاص ثالث</h2>
            <p>ما اطلاعات شخصی کاربران را بدون رضایت آن‌ها به اشخاص ثالث نمی‌فروشیم. در صورتی که از سرویس‌های تحلیلی یا تبلیغاتی استفاده شود، ممکن است داده‌های غیرشخصی (Aggregate / Anonymized) با این سرویس‌ها به اشتراک گذاشته شود.</p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2">۵. امنیت داده‌ها</h2>
            <p>ما اقدامات معقول فنی و سازمانی را برای محافظت از اطلاعات اجرا می‌کنیم؛ با این حال هیچ انتقال اینترنتی یا ذخیره‌سازی الکترونیکی کاملاً بی‌خطر نیست و مسئولیت کامل امنیت از نظر قانونی محدود است.</p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2">۶. حقوق کاربران</h2>
            <p>کاربران می‌توانند درخواست کنند اطلاعاتشان اصلاح، دریافت یا حذف شود. برای چنین درخواست‌هایی می‌توانند با ایمیل پشتیبانی تماس بگیرند (نشانی ایمیل خود را اینجا قرار دهید).</p>

          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">۷. تغییرات در سیاست</h2>
            <p>ما ممکن است این سیاست را به‌روزرسانی کنیم؛ نسخه اصلاح‌شده با تاریخ جدید در این صفحه منتشر خواهد شد.</p>
          </section>
        </div>
      </main>
    </>
  )
}
    