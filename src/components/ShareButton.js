import { useState } from "react";
import { Copy } from "lucide-react";

export default function ShareButtonsInline({ title, url }) {
  const [copied, setCopied] = useState(false);

  const shareLinks = [
    {
      name: "Telegram",
      url: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      color: "bg-blue-500",
      icon: "/icons/telegram.svg",
    },
    {
      name: "Instagram",
      url: `https://www.instagram.com/?url=${encodeURIComponent(url)}`, // اینستاگرام لینک مستقیم ندارد
      color: "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600",
      icon: "/icons/instagram.svg",
    },
    {
      name: "Twitter",
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      color: "bg-sky-500",
      icon: "/icons/x.svg",
    },
    {
      name: "WhatsApp",
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(title + " " + url)}`,
      color: "bg-green-500",
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
    <div className="flex flex-wrap items-center gap-3 mt-4">
      {shareLinks.map(({ name, url, color, icon }) => (
        <a
          key={name}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-2 px-3 py-2 rounded-full text-white text-sm font-medium ${color} hover:opacity-90`}
        >
          <img src={icon} alt={name} className="w-5 h-5" />
          {}
        </a>
      ))}

      <button
        onClick={handleCopy}
        className="flex items-center gap-2 px-3 py-2 rounded-full bg-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-300"
      >
        <Copy size={18} />
        {copied ? "لینک کپی شد!" : ""}
      </button>
    </div>
  );
}
