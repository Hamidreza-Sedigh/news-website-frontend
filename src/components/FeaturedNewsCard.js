import Link from "next/link";
import Image from "next/image";

export default function FeaturedNewsCard({ news }) {
  return (
    <Link
      href={`/news/${news.shortId}`}
      className="w-full md:w-1/2 p-2"
      title={news.title}
      aria-label={`مشاهده خبر: ${news.title}`}
    >
      <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition">
        <div className="relative w-full h-60">
          <Image
            src={news.imageUrl}
            alt={news.title}
            fill
            className="object-cover"
            priority={index === 0} // کارت اول → لود سریع
            loading={index === 0 ? "eager" : "lazy"} // کارت‌های بعدی → lazy
            sizes="(max-width: 768px) 100vw, 50vw" // واکنش‌گرا
          />
        </div>
        <div className="p-3">
          <h2 className="text-lg font-bold">{news.title}</h2>
        </div>
      </div>
    </Link>
  );
}
    