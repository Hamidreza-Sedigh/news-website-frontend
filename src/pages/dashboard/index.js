import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import StatCard from '../../components/StatCard';
import ChartCard from '../../components/ChartCard';
import NewsCardMini from '../../components/NewsCardMini';
import Sidebar from '../../components/Sidebar';


export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // داده‌های کامپ
  const [stats, setStats] = useState({
    membershipDuration: '2 سال و 3 ماه',
    readNews: 124,
    savedNews: 37,
  });
  const [latestNews, setLatestNews] = useState([
    { title: 'خبر اول', description: 'خلاصه کوتاه خبر اول برای نمایش در داشبورد', date: 'امروز' },
    { title: 'خبر دوم', description: 'خلاصه کوتاه خبر دوم برای نمایش در داشبورد', date: 'دیروز' },
    { title: 'خبر سوم', description: 'خلاصه کوتاه خبر سوم برای نمایش در داشبورد', date: 'سه‌شنبه' },
  ]);

  const [chartData, setChartData] = useState([
    { day: 'شنبه', read: 5 },
    { day: 'یکشنبه', read: 12 },
    { day: 'دوشنبه', read: 8 },
    { day: 'سه‌شنبه', read: 15 },
    { day: 'چهارشنبه', read: 7 },
    { day: 'پنج‌شنبه', read: 10 },
    { day: 'جمعه', read: 6 },
  ]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) return <p>در حال بارگذاری...</p>;

  return (
    // <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 relative">
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 dark:bg-gray-900">

      <Sidebar />

{/* lg:mr-64 برای فاصله از سایدبار */}
      {/* <div className="p-6 lg:mr-64">  */}
      <div className="flex-1 p-6">

        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">داشبورد خبری</h1>
        {/* کارت‌های وضعیت */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <StatCard title="مدت عضویت" value={stats.membershipDuration} icon="🗓️" />
          <StatCard title="تعداد خبرهای خوانده شده" value={stats.readNews} icon="📰" />
          <StatCard title="تعداد خبرهای سیو شده" value={stats.savedNews} icon="💾" />
        </div>

        {/* نمودار */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ChartCard title="تعداد خبرهای خوانده شده طی هفته" data={chartData} dataKey="read" color="#10b981" />
        </div>

        {/* آخرین اخبار */}
        <div className="mb-6">
          <h3 className="text-gray-700 dark:text-gray-200 font-semibold mb-4">آخرین اخبار</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {latestNews.map((news, idx) => (
              <NewsCardMini
                key={idx}
                title={news.title}
                description={news.description}
                date={news.date}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
