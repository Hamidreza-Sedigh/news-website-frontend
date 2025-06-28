import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

export default function AboutPage() {
  const faqs = [
    {
      question: "منبع اخبار شما از کجا تامین می‌شود؟",
      answer: "ما از الگوریتم‌های پیشرفته برای جمع‌آوری اخبار از منابع معتبر داخلی و بین‌المللی استفاده می‌کنیم و اخبار را پس از بررسی و اعتبارسنجی منتشر می‌کنیم."
    },
    {
      question: "چگونه اخبار را شخصی‌سازی می‌کنید؟",
      answer: "سیستم ما با یادگیری سلیقه و علایق شما، اخبار مرتبط را در اولویت نمایش قرار می‌دهد و می‌توانید موضوعات مورد علاقه خود را نیز انتخاب نمایید."
    },
    {
      question: "آیا می‌توانم به عنوان نویسنده با شما همکاری کنم؟",
      answer: "بله، ما همیشه از همکاری با روزنامه‌نگاران و نویسندگان مستعد استقبال می‌کنیم. می‌توانید از طریق بخش تماس با ما درخواست خود را ارسال نمایید."
    }
  ]

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* هدر */}
      <header className="bg-blue-800 text-white">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-4">درباره ما</h1>
          <p className="text-xl max-w-3xl">
            ما یک پلتفرم پیشرفته جمع‌آوری و تحلیل اخبار هستیم که با استفاده از فناوری‌های روز، آخرین اخبار را به شکلی هوشمندانه به شما ارائه می‌دهیم.
          </p>
        </div>
      </header>

      {/* بخش ماموریت */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">ماموریت ما</h2>
            <p className="text-gray-600 mb-4 text-lg leading-relaxed">
              در دنیای پرسرعت امروز، دسترسی به اخبار معتبر و به‌روز ضروری است. ماموریت ما ارائه دقیق‌ترین و مرتبط‌ترین اخبار با استفاده از فناوری‌های پیشرفته هوش مصنوعی است.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              ما با جمع‌آوری اخبار از صدها منبع معتبر و تحلیل آن‌ها، اطلاعاتی که نیاز دارید را در کمترین زمان ممکن به شما می‌رسانیم.
            </p>
          </div>
          <div className="bg-blue-100 rounded-xl p-8">
            <img 
              src="/images/news-analysis.svg" 
              alt="تحلیل اخبار" 
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* بخش تیم */}
      {/* <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">تیم ما</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "سارا محمدی", role: "مدیر فنی", bio: "متخصص هوش مصنوعی و پردازش زبان طبیعی با ۱۰ سال سابقه در صنعت خبر." },
              { name: "علی رضایی", role: "سردبیر", bio: "روزنامه‌نگار با سابقه و تحلیلگر ارشد خبر با تخصص در مسائل بین‌المللی." },
              { name: "نازنین حسینی", role: "توسعه‌دهنده", bio: "متخصص توسعه وب و رابط کاربری با تمرکز بر تجربه کاربری مناسب." }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-blue-600 h-32"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                  <p className="text-blue-600 mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* سوالات متداول */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">سوالات متداول</h2>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <Disclosure key={index} as="div" className="mb-4">
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex justify-between items-center w-full px-6 py-4 text-lg font-medium text-right text-gray-700 bg-white rounded-lg shadow-md hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                    <span>{faq.question}</span>
                    <ChevronDownIcon
                      className={`${
                        open ? 'transform rotate-180' : ''
                      } w-5 h-5 text-blue-500`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-6 pt-4 pb-2 text-gray-600 bg-gray-50 rounded-b-lg">
                    {faq.answer}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">به جمع کاربران ما بپیوندید</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            همین حالا ثبت‌نام کنید و از آخرین اخبار با شخصی‌سازی پیشرفته بهره‌مند شوید.
          </p>
          <button className="bg-white text-blue-700 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition duration-200">
            شروع کنید
          </button>
        </div>
      </section>
    </div>
  )
}