import { useEffect, useState } from 'react';

export default function PopularNews() {
  const [popularNews, setPopularNews] = useState([]);

  useEffect(() => {
    fetch('/api/proxy/news/popular') // یا مستقیماً `http://localhost:9999/api/news/popular`
      .then(res => res.json())
      .then(data => setPopularNews(data))
      .catch(err => console.error('Error:', err));
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">اخبار پربازدید</h2>
      <ul className="space-y-2">
        {popularNews.map((news) => (
          <li key={news._id} className="border-b pb-2">
            <a href={news.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              {news.title}
            </a>
            <div className="text-sm text-gray-500">بازدید: {news.views}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
