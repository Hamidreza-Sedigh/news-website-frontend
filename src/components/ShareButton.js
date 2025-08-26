import { useState } from "react";
import { FaTelegramPlane as FaTelegram } from "react-icons/fa";
import { FaXTwitter, FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { Copy } from "lucide-react";

export default function ShareButtonsInline({ title, url }) {
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(null);

  const shareLinks = [
    {
      name: "تلگرام",
      url: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      bgColor: "bg-[#229ed9]",
      icon: <FaTelegram className="w-6 h-6 text-white" />,
    },
    {
      name: "اینستاگرام",
      url: `https://www.instagram.com/?url=${encodeURIComponent(url)}`,
      bgColor: "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600",
      icon: <FaInstagram className="w-6 h-6 text-white" />,
    },
    {
      name: "ایکس",
      url: `https://x.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      bgColor: "bg-black",          //bgColor: "bg-[#1DA1F2]",
      icon: <FaXTwitter className="w-6 h-6 text-white" />,
    },
    {
      name: "واتساپ",
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(title + " " + url)}`,
      bgColor: "bg-[#25D366]",
      icon: <FaWhatsapp className="w-6 h-6 text-white" />,
    },
  ];

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(url);
      } else {
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
      {shareLinks.map(({ name, url, bgColor, icon }) => (
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
            className={`flex items-center justify-center w-10 h-10 rounded-full ${bgColor}
                        hover:opacity-90 transform transition duration-200 hover:-translate-y-1`}
          >
            {icon}
          </a>

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
          className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-700
                     hover:bg-gray-300 transform transition duration-200 hover:-translate-y-1"
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
