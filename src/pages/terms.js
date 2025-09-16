// File: pages/terms-of-use.js
import Head from 'next/head'

export default function TermsOfUse() {
  return (
    <>
      <Head>
        <title>شرایط استفاده | کهربا نت</title>
        <meta name="description" content="قوانین و شرایط استفاده از سایت — حقوق، مسئولیت‌ها و چارچوب قانونی" />
      </Head>

      <main className="min-h-screen bg-gray-50 p-6 md:p-12">
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 md:p-10">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">شرایط استفاده</h1>

          <p className="mb-3">با استفاده از این سایت، شما شرایط و قوانین زیر را می‌پذیرید. لطفاً قبل از استفاده کامل از خدمات، این صفحه را با دقت مطالعه کنید.</p>

          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2">۱. پذیرش شرایط</h2>
            <p>استفاده شما از سایت مشروط به پذیرش این شرایط است. در صورت عدم پذیرش، از استفاده از سرویس خودداری کنید.</p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2">۲. استفاده مجاز</h2>
            <p>کاربران موافقت می‌کنند که سایت را برای مقاصد قانونی و مطابق با قوانین کشور استفاده کنند. انتشار محتواهای توهین‌آمیز، کپی‌رایت‌شکن، یا محتوای غیرقانونی مجاز نیست.</p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2">۳. مسئولیت‌ها</h2>
            <p>سایت تمام تلاش خود را برای ارائه محتوای صحیح به‌کار می‌برد؛ با این حال مسئولیتی نسبت به اشتباهات، تأخیر در انتشار یا خسارات ناشی از استفاده از محتوا ندارد، مگر در مواردی که قانون به‌صورت صریح مسئولیت را تعریف کرده باشد.</p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2">۴. لینک‌ها و محتوای ثالث</h2>
            <p>سایت ممکن است به وب‌سایت‌های دیگر لینک دهد. ما مسئول محتوای این سایت‌ها نیستیم و وجود لینک به‌معنی تأیید آن سایت‌ها نیست.</p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2">۵. تغییر شرایط</h2>
            <p>ما ممکن است این شرایط را هر زمان تغییر دهیم. نسخه به‌روزشده در همین صفحه منتشر می‌شود و تاریخ آخرین ویرایش در بالای صفحه درج خواهد شد.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">۶. قوانین حاکم</h2>
            <p>هرگونه اختلاف یا ادعا درباره استفاده از این سایت مطابق قوانین جمهوری اسلامی ایران (یا کشور/منطقه فعالیت شما) بررسی خواهد شد.</p>
          </section>

        </div>
      </main>
    </>
  )
}
