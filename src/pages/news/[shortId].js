import Head from 'next/head';
import NewsLayout from '../../components/NewsLayout';
import NewsHeader from '../../components/NewsHeader';
import NewsContent from '../../components/NewsContent';
import NewsFooter from '../../components/NewsFooter';
import LoadingSpinner from '../../components/LoadingSpinner';
import Seo from '@/components/Seo';

export default function NewsDetail({ news, error }) {
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  if (!news) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Seo
        title={news.title}
        description={news.description}
        url={`http://localhost:8000/news/${news.shortId}`}
        image={news.imageUrl}
      />

      <NewsLayout
        meta={{
          title: news.title,
          description: news.description,
          url: `http://localhost:8000/news/${news.shortId}`,
          image: news.image || '/default.jpg',
        }}
      >
        <NewsHeader 
          title={news.title} 
          sourceName={news.sourceName} 
          date={news.date} 
          category={news.category} 
          subCategory={news.subCategory}
          views={news.views}
          imageUrl={news.imageUrl}
        />
        
        <NewsContent 
          description={news.description} 
          passage={news.passage}
          imageUrl={news.imageUrl}
        />
        
        <NewsFooter 
          siteAddress={news.siteAddress} 
          sourceLink={news.link}
          ourLink={`http://kahrobanet.ir/news/${news.shortId}`}
          newsId={news.shortId}
          title={news.title}
        />
      </NewsLayout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { shortId } = context.params;

  try {
    const res = await fetch(`http://localhost:8000/api/news/${shortId}`);
    if (!res.ok) {
      throw new Error('خبر یافت نشد');
    }
    const news = await res.json();

    return { props: { news } };
  } catch (err) {
    return {
      props: { error: err.message || 'خطا در دریافت خبر' },
    };
  }
}
