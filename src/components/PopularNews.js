// components/PopularNews.js
import NewsCard from './NewsCard';

export default function PopularNews({ popularNews = [] }) {
  return (
    // <div className="p-4 bg-white rounded shadow">
    <div>
      {/* <h2 className="text-xl font-semibold mb-4">اخبار پربازدید</h2> */}
      {popularNews.length === 0 ? (
        <p className="text-gray-500">خبری یافت نشد.</p>
      ) : (
        // <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="grid grid-cols-1                  gap-4">
          {popularNews.map((news) => (
            <NewsCard 
              key={news.shordId} 
              news={news} 
              highlightPopular={true}
              showInfo={{
                date: true,
                source: true,
                views: true,
                category: false,
            }}/>
          ))}
        </div>
      )}
    </div>
  );
}
