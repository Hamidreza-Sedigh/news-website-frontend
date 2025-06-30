import { ClockIcon, EyeIcon, LinkIcon } from '@heroicons/react/24/outline';
// import { format } from 'date-fns';
// import { faIR } from 'date-fns/locale';
import { format } from 'date-fns-jalali';
import { faIR } from 'date-fns-jalali/locale';


export default function NewsHeader({ title, sourceName, date, category, subCategory, views }) {
  return (
    <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {category}
          </span>
          {subCategory && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {subCategory}
            </span>
          )}
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <LinkIcon className="h-4 w-4" />
            <span>{sourceName}</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <ClockIcon className="h-4 w-4" />
              <span>
                {format(new Date(date), 'dd MMMM yyyy, HH:mm', { locale: faIR })}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <EyeIcon className="h-4 w-4" />
              <span>{views.toLocaleString()} بازدید</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}