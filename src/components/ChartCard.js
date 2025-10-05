// components/ChartCard.js
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function ChartCard({ title, data, dataKey, color = '#3b82f6' }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 dark:bg-gray-800">
      <h3 className="text-gray-700 dark:text-gray-200 font-semibold mb-4">{title}</h3>
      <div style={{ width: '100%', height: 200 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="day" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip />
            <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
