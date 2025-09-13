// components/Pagination.js
import React from "react";

export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const generatePages = () => {
    const pages = [];
    const maxButtons = 7; // حداکثر دکمه‌ها برای نمایش
    let start = Math.max(1, page - 3);
    let end = Math.min(totalPages, page + 3);

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push("start-ellipsis");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push("end-ellipsis");
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = generatePages();

  return (
    <div className="flex justify-center items-center gap-2 text-sm text-gray-700 mt-6 flex-wrap">
      {/* قبلی */}
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="px-4 py-2 bg-gray-200 rounded 
                   disabled:opacity-50 disabled:cursor-not-allowed 
                   cursor-pointer hover:bg-gray-300 transition"
      >
        قبلی
      </button>

      {/* شماره صفحات */}
      <div className="flex items-center gap-2 flex-wrap justify-center">
        {pages.map((p, idx) =>
          p === "start-ellipsis" || p === "end-ellipsis" ? (
            <span key={idx} className="px-2">
              …
            </span>
          ) : (
            <button
              key={idx}
              onClick={() => onPageChange(p)}
              className={`px-3 py-1 rounded cursor-pointer transition
                ${
                  p === page
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
            >
              {p}
            </button>
          )
        )}
      </div>

      {/* بعدی */}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="px-4 py-2 bg-gray-200 rounded 
                   disabled:opacity-50 disabled:cursor-not-allowed 
                   cursor-pointer hover:bg-gray-300 transition"
      >
        بعدی
      </button>
    </div>
  );
}
