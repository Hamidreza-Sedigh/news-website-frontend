import { useEffect, useState } from 'react';
import parse from 'html-react-parser';

export default function NewsContent({ description, passage }) {
  const [cleanHtml, setCleanHtml] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined' && passage) {
      const DOMPurify = require('dompurify');
      setCleanHtml(DOMPurify.sanitize(passage));
    }
  }, [passage]);

  return (
    <div className="px-4 py-5 sm:p-6">
      <div className="prose prose-sm sm:prose max-w-none">
        {description && (
          <p className="text-gray-700 text-lg">{description}</p>
        )}
        
        {cleanHtml && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">متن کامل خبر:</h2>
            <div className="bg-gray-50 p-4 rounded-lg news-content">
              {parse(cleanHtml)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}