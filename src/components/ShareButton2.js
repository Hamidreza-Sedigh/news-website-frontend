import { useState } from "react";

export default function ShareButtons({ url }) {
  const [copied, setCopied] = useState(false);

  const shareLinks = [
    {
      name: "تلگرام",
      url: `https://t.me/share/url?url=${encodeURIComponent(url)}`,
      color: "bg-sky-500",
      icon: "/icons/telegram.svg",
    },
    {
      name: "واتساپ",
      url: `https://wa.me/?text=${encodeURIComponent(url)}`,
      color: "bg-green-500",
      icon: "/icons/whatsapp.svg",
    },
    {
      name: "توییتر",
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
      color: "bg-blue-400",
      icon: "/icons/twitter.svg",
    },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("خطا در کپی لینک:", err);
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
      {shareLinks.map(({ name, url, color, icon }) => (
        <a
          key={name}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`relative flex items-center justify-center w-10 h-10 rounded-full ${color} hover:opacity-90`}
        >
          <img src={icon} alt={name} className="w-5 h-5" />
          {/* Tooltip */}
          <span className="absolute bottom-12 opacity-0 group-hover:opacity-100 transition bg-black text-white text-xs px-2 py-1 rounded">
            {name}
          </span>
        </a>
      ))}

      {/* دکمه کپی لینک */}
      <button
        onClick={handleCopy}
        className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300"
      >
        <img src="/icons/copy.svg" alt="کپی" className="w-5 h-5" />
        {/* Tooltip */}
        <span className="absolute bottom-12 opacity-0 group-hover:opacity-100 transition bg-black text-white text-xs px-2 py-1 rounded">
          {copied ? "لینک کپی شد!" : "کپی لینک"}
        </span>
      </button>
    </div>
  );
}
