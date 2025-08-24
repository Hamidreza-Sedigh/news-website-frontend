'use client';
import { useState } from 'react';
import { Copy as CopyIcon } from 'lucide-react';

function Tooltip({ label, children, side = 'top' }) {
  const [open, setOpen] = useState(false);
  const pos =
    side === 'top'
      ? 'bottom-full mb-2 left-1/2 -translate-x-1/2'
      : 'top-full mt-2 left-1/2 -translate-x-1/2';

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      onTouchStart={() => {
        setOpen(true);
        setTimeout(() => setOpen(false), 1200);
      }}
    >
      {children}
      <div
        role="tooltip"
        className={`pointer-events-none absolute ${pos} whitespace-nowrap rounded-md px-2 py-1 text-xs text-white bg-black/80 shadow-md transition-all duration-150
        ${open ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'}`}
      >
        {label}
      </div>
    </div>
  );
}

export default function ShareButtonsInline({ title, url }) {
  const [copied, setCopied] = useState(false);

  const shareLinks = [
    {
      name: 'Telegram',
      url: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      color: 'bg-blue-500',
      icon: '/icons/telegram.svg',
    },
    {
      name: 'Instagram',
      url: `https://www.instagram.com/?url=${encodeURIComponent(url)}`, // اینستاگرام API رسمی share ندارد
      color: 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600',
      icon: '/icons/instagram.svg',
    },
    {
      name: 'Twitter',
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      color: 'bg-sky-500',
      icon: '/icons/twitter.svg',
    },
    {
      name: 'WhatsApp',
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + url)}`,
      color: 'bg-green-500',
      icon: '/icons/whatsapp.svg',
    },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="flex justify-center items-center flex-wrap gap-3 mt-4 overflow-visible">
      {shareLinks.map(({ name, url, color, icon }) => (
        <Tooltip key={name} label={name}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`relative flex items-center justify-center w-10 h-10 rounded-full text-white ${color}
                        hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300`}
          >
            <img src={icon} alt={name} className="w-5 h-5" />
          </a>
        </Tooltip>
      ))}

      <Tooltip label={copied ? 'لینک کپی شد!' : 'کپی لینک'}>
        <button
          onClick={handleCopy}
          aria-live="polite"
          className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-700
                     hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
        >
          <CopyIcon className="w-5 h-5" />
        </button>
      </Tooltip>
    </div>
  );
}
