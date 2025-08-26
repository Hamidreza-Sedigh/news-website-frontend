import { useState } from "react";
import { Copy } from "lucide-react";

export default function ShareButtonsInline({ title, url }) {
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(null);

  const shareLinks = [
    {
      name: "تلگرام",
      url: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      color: "bg-blue-500",
      icon: "/icons/telegram.svg",
    },
    {
      name: "اینستاگرام",
      url: `https://www.instagram.com/?url=${encodeURIComponent(url)}`, // اینستاگرام share مستقیم نداره
      color: "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600",
      icon: "/icons/instagram.svg",
    },
    {
      name: "ایکس",
      url: `https://x.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      color: "bg-sky-500",
      icon: "/icons/x.svg",
    },
    {
      name: "واتساپ",
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(title + " " + url)}`,
      color: "bg-green-500",
      icon: "/icons/whatsapp.svg",
    },
  ];

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        // حالت مدرن (HTTPS یا localhost)
        await navigator.clipboard.writeText(url);
      } else {
        // fallback برای HTTP یا مرورگرهای قدیمی
        const textarea = document.createElement("textarea");
        textarea.value = url;
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("خطا در کپی لینک:", err);
    }
  };

  return (
    <div className="flex flex-wrap justify-center items-center gap-3 mt-4">
      {shareLinks.map(({ name, url, color, icon }) => (
        <div
          key={name}
          className="relative"
          onMouseEnter={() => setHovered(name)}
          onMouseLeave={() => setHovered(null)}
        >
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center w-10 h-10 rounded-full text-white ${color} hover:opacity-90`}
          >
            <img src={icon} alt={name} className="w-5 h-5" />
          </a>

          {/* Tooltip */}
          {hovered === name && (
            <span className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black text-white text-xs px-2 py-1 rounded-md shadow-md">
              {name}
            </span>
          )}
        </div>
      ))}

      {/* دکمه کپی لینک */}
      <div
        className="relative"
        onMouseEnter={() => setHovered("copy")}
        onMouseLeave={() => setHovered(null)}
      >
        <button
          onClick={handleCopy}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300"
        >
          <Copy size={18} />
        </button>

        {(hovered === "copy" || copied) && (
          <span className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black text-white text-xs px-2 py-1 rounded-md shadow-md">
            {copied ? "کپی شد!" : "کپی کردن لینک"}
          </span>
        )}
      </div>
    </div>
  );
}
