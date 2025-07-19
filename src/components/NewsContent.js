import React, { useEffect, useState } from 'react';

export default function NewsContent({ description, passage, imageUrl }) {
  const [cleanPassage, setCleanPassage] = useState('');

  useEffect(() => {
    if (passage) {
      // بارگذاری داینامیک DOMPurify در سمت کلاینت
      import('dompurify').then(DOMPurifyModule => {
        const clean = DOMPurifyModule.default.sanitize(passage);
        setCleanPassage(clean);
      });
    }
  }, [passage]);

  return (
    <div className="px-4 py-5 sm:p-6">
      <div className="prose prose-sm sm:prose max-w-none">
        <div className="flex flex-col md:flex-row md:items-start md:space-x-6">
          {imageUrl && (
            <div className="mb-4 md:mb-0 md:w-1/3">
              <img
                src={imageUrl}
                alt="تصویر خبر"
                className="w-full h-auto rounded-lg shadow-sm"
              />
            </div>
          )}

          {description && (
            <p className="text-gray-700 text-lg md:w-2/3">
              {description}
            </p>
          )}
        </div>

        {passage && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">متن کامل خبر:</h2>
            <div
              className="bg-gray-50 p-4 rounded-lg news-content"
              dangerouslySetInnerHTML={{ __html: cleanPassage }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
