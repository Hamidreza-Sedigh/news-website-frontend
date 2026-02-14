import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import StatCard from '../../components/StatCard';
import ChartCard from '../../components/ChartCard';
import NewsCardMini from '../../components/NewsCardMini';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import { useApi } from '@/hooks/useApi';

export default function Dashboard() {
  // ✅ بررسی لاگین با hook
  const { loading: authLoading, accessDenied } = useAuthGuard(); // بدون allowedRoles => همه کاربران لاگین شده

  const api = useApi();

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    membershipDuration: '2 سال و 3 ماه',
    readNews: 124,
    savedNews: 37,
  });
  const [chartData, setChartData] = useState([]);
  const [latestNews, setLatestNews] = useState([
    { title: 'خبر اول', description: 'خلاصه کوتاه خبر اول برای نمایش در داشبورد', date: 'امروز' },
    { title: 'خبر دوم', description: 'خلاصه کوتاه خبر دوم برای نمایش در داشبورد', date: 'دیروز' },
    { title: 'خبر سوم', description: 'خلاصه کوتاه خبر سوم برای نمایش در داشبورد', date: 'سه‌شنبه' },
  ]);

  useEffect(() => {
    if (authLoading || accessDenied) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const statsData = await api.get("/api/proxy/dashboard/stats");
        setStats(statsData || {});

        const weeklyData = await api.get("/api/proxy/dashboard/weekly-reads");
        setChartData(Array.isArray(weeklyData) ? weeklyData : []);
      } catch (err) {
        console.error("خطا در دریافت داده‌ها:", err);
        setStats({});
        setChartData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [authLoading, accessDenied ]);

  if (authLoading || loading) return <p className="p-6">در حال بررسی...</p>;
  if (accessDenied) return <p className="p-6 text-red-600">دسترسی غیرمجاز</p>;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />

      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">داشبورد خبری</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <StatCard title="مدت عضویت" value={stats.membershipDuration} icon="🗓️" />
          <StatCard title="تعداد خبرهای خوانده شده" value={stats.readNews} icon="📰" />
          <StatCard title="تعداد خبرهای سیو شده" value={stats.savedNews} icon="💾" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ChartCard title="تعداد خبرهای خوانده شده طی هفته" data={chartData} dataKey="read" color="#10b981" />
        </div>

        <div className="mb-6">
          <h3 className="text-gray-700 dark:text-gray-200 font-semibold mb-4">آخرین اخبار</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {latestNews.map((news, idx) => (
              <NewsCardMini key={idx} title={news.title} description={news.description} date={news.date} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
