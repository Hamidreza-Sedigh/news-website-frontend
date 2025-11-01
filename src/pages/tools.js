import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

const tools = [
  {
    title: 'تبدیل تاریخ',
    description: 'تبدیل تاریخ شمسی، میلادی و قمری به یکدیگر',
    href: '/tools/date-converter',
  },
  {
    title: 'تبدیل واحد',
    description: 'تبدیل انواع واحدهای طول، وزن، حجم و ...',
    href: '/tools/unit-card',
  },
  {
    title: 'محاسبه قیمت طلا',
    description: 'برآورد قیمت طلا با توجه به وزن و اجرت',
    href: '/tools/gold-price',
  },
  {
    title: 'مبدل قیمت ارز',
    description: 'محاسبه مبلغ ارزهای مختلف ',
    href: '/tools/currency-converter',
  },
]

export default function ToolsPage() {
  return (
    <>
      <Seo
        title={'ابزار | کهربا نت'}
        description={'ابزار کاربردی ، کهربا نت تبدیل تاریخ تبدیل واحد مبدل ارز'}
        url={`http://kahrobanet.ir/tools`}
        image={news.imageUrl}
      />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8 text-center">ابزارها</h1>
        <div className="grid gap-6 md:grid-cols-2">
          {tools.map((tool) => (
            <Link key={tool.href} href={tool.href}>
              <div className="bg-white border border-gray-200 shadow hover:shadow-lg transition-shadow rounded-2xl p-5 cursor-pointer flex flex-col justify-between h-full">
                <div>
                  <h2 className="text-xl font-semibold mb-2 text-gray-800">{tool.title}</h2>
                  <p className="text-gray-600 text-sm">{tool.description}</p>
                </div>
                <div className="mt-4 text-indigo-600 flex items-center gap-2">
                  <span>مشاهده</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
