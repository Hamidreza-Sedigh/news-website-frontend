// components/StatCard.js
export default function StatCard({ title, value, icon }) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4 dark:bg-gray-800">
        {icon && <div className="text-3xl">{icon}</div>}
        <div>
          <p className="text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">{value}</p>
        </div>
      </div>
    );
  }
  