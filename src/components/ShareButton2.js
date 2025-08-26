import { useState } from "react";
import { Copy, Share2, Check } from "lucide-react";

export default function ShareButtonsInline({ title, url }) {
  const [copied, setCopied] = useState(false);
  const [showTooltip, setShowTooltip] = useState(null);

  const shareLinks = [
    {
      name: "Telegram",
      url: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      color: "bg-[#0088cc]",
      hoverColor: "hover:bg-[#0077b3]",
      icon: "/icons/telegram.svg",
    },
    {
      name: "Instagram",
      url: `https://www.instagram.com/?url=${encodeURIComponent(url)}`,
      color: "bg-gradient-to-tr from-[#fdf497] via-[#fd5949] to-[#d6249f]",
      hoverColor: "hover:opacity-90",
      icon: "/icons/instagram.svg",
    },
    {
      name: "Twitter",
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      color: "bg-[#1DA1F2]",
      hoverColor: "hover:bg-[#1a8cd8]",
      icon: "/icons/x.svg",
    },
    {
      name: "WhatsApp",
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(title + " " + url)}`,
      color: "bg-[#25D366]",
      hoverColor: "hover:bg-[#20bd5a]",
      icon: "/icons/whatsapp.svg",
    },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="my-8 p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border border-gray-200 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center justify-center">
        <Share2 size={20} className="ml-2" />
        اشتراک‌گذاری این خبر
      </h3>
      
      <div className="flex flex-wrap justify-center items-center gap-6">
        {shareLinks.map(({ name, url, color, hoverColor, icon }) => (
          <a
            key={name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`relative flex items-center justify-center w-14 h-14 rounded-full text-white transition-all duration-300 ${color} ${hoverColor} transform hover:scale-110 shadow-md hover:shadow-lg`}
            onMouseEnter={() => setShowTooltip(name)}
            onMouseLeave={() => setShowTooltip(null)}
            aria-label={`اشتراک در ${name}`}
          >
            <img src={icon} alt={name} className="w-6 h-6" />
            
            {showTooltip === name && (
              <div className="absolute -top-9 px-3 py-1.5 bg-gray-800 text-white text-xs rounded-md whitespace-nowrap">
                {name}
                <div className="absolute w-2 h-2 bg-gray-800 rotate-45 bottom-[-4px] left-1/2 transform -translate-x-1/2"></div>
              </div>
            )}
          </a>
        ))}

        <button
          onClick={handleCopy}
          className={`relative flex items-center justify-center w-14 h-14 rounded-full transition-all duration-300 transform hover:scale-110 shadow-md hover:shadow-lg ${
            copied ? "bg-green-500" : "bg-gray-200 hover:bg-gray-300"
          }`}
          aria-label="کپی لینک"
        >
          {copied ? (
            <Check size={22} className="text-white" />
          ) : (
            <Copy size={22} className="text-gray-700" />
          )}
          
          {copied && (
            <div className="absolute -top-9 px-3 py-1.5 bg-gray-800 text-white text-xs rounded-md">
              کپی شد!
              <div className="absolute w-2 h-2 bg-gray-800 rotate-45 bottom-[-4px] left-1/2 transform -translate-x-1/2"></div>
            </div>
          )}
        </button>
      </div>
      
    </div>
  );
}