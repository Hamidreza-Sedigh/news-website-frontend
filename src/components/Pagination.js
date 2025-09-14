// components/Pagination.js
import React from "react";

export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const delta = 2;

    let start = Math.max(2, page - delta);
    let end = Math.min(totalPages - 1, page + delta);

    pages.push(1);

    if (start > 2) {
      pages.push("...");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) {
      pages.push("...");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
      {/* دکمه قبلی */}
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="px-3 py-1 bg-gray-200 rounded 
                   disabled:opacity-50 disabled:cursor-not-allowed 
                   hover:bg-gray-300 transition cursor-pointer"
      >
        قبلی
      </button>

      {/* شماره صفحات - دسکتاپ */}
      <div className="hidden sm:flex gap-1 flex-wrap">
        {getPageNumbers().map((num, idx) =>
          num === "..." ? (
            <span key={idx} className="px-3 py-1">
              ...
            </span>
          ) : (
            <button
              key={num}
              onClick={() => onPageChange(num)}
              className={`px-3 py-1 rounded ${
                num === page
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300 cursor-pointer"
              }`}
            >
              {num}
            </button>
          )
        )}
      </div>

      {/* شماره صفحات - موبایل */}
      <div className="flex sm:hidden gap-1 items-center">
        {page > 2 && <span className="px-2">...</span>}

        {page > 1 && (
          <button
            onClick={() => onPageChange(page - 1)}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
          >
            {page - 1}
          </button>
        )}

        <span className="px-3 py-1 bg-blue-500 text-white rounded cursor-pointer">
          {page}
        </span>

        {page < totalPages && (
          <button
            onClick={() => onPageChange(page + 1)}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
          >
            {page + 1}
          </button>
        )}

        {page < totalPages - 1 && <span className="px-2">...</span>}
      </div>

      {/* دکمه بعدی */}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="px-3 py-1 bg-gray-200 rounded 
                   disabled:opacity-50 disabled:cursor-not-allowed 
                   hover:bg-gray-300 transition cursor-pointer"
      >
        بعدی
      </button>
    </div>
  );
}
