// components/NewsCardMini.js
export default function NewsCardMini({ title, description, date }) {
    return (
      <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition dark:bg-gray-800">
        <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">{title}</h4>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-2 line-clamp-2">{description}</p>
        <p className="text-gray-400 dark:text-gray-500 text-xs">{date}</p>
      </div>
    );
  }
  