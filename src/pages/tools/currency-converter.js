import { useState, useEffect } from "react";

export default function CurrencyConverter() {
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("IRR");
  const [rate, setRate] = useState(null);
  const [manualRate, setManualRate] = useState(false);
  const [result, setResult] = useState("");

  // --- گرفتن نرخ از API ---
  useEffect(() => {
    if (manualRate) return; // اگر کاربر نرخ را دستی تغییر داده، از API نگیریم

    const fetchRate = async () => {
      try {
        const res = await fetch(`/api/proxy/rate?base=${from}&target=${to}`);
        const data = await res.json();
        setRate(data.rate);
      } catch (err) {
        console.error("Error fetching rate:", err);
      }
    };

    fetchRate();
  }, [from, to, manualRate]);

  // --- محاسبه لحظه‌ای ---
  useEffect(() => {
    if (!amount || !rate) {
      setResult("");
      return;
    }
    const converted = amount * rate;
    const formatted = converted
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setResult(`${formatted} ${to}`);
  }, [amount, rate, to]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-200">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[95%] max-w-md transition-all duration-300">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">
          💱 تبدیل ارز
        </h1>

        <div className="space-y-4">
          {/* انتخاب ارزها */}
          <div className="flex justify-between gap-3">
            <div className="flex-1">
              <label className="block text-gray-600 mb-1">از ارز</label>
              <select
                value={from}
                onChange={(e) => {
                  setFrom(e.target.value);
                  setManualRate(false);
                }}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="USD">دلار (USD)</option>
                <option value="EUR">یورو (EUR)</option>
                <option value="TRY">لیر (TRY)</option>
                <option value="IRR">ریال (IRR)</option>
              </select>
            </div>

            <div className="flex items-end justify-center pb-1">
              <span className="text-blue-500 font-bold text-xl">⇄</span>
            </div>

            <div className="flex-1">
              <label className="block text-gray-600 mb-1">به ارز</label>
              <select
                value={to}
                onChange={(e) => {
                  setTo(e.target.value);
                  setManualRate(false);
                }}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="USD">دلار (USD)</option>
                <option value="EUR">یورو (EUR)</option>
                <option value="TRY">لیر (TRY)</option>
                <option value="IRR">ریال (IRR)</option>
              </select>
            </div>
          </div>

          {/* فاصله زیر انتخاب ارزها */}
          <div className="h-4"></div>

          {/* مبلغ */}
          <div>
            <label className="block text-gray-600 mb-1">مبلغ</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="مثلاً 100"
              className="w-full border border-gray-300 rounded-lg p-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* نرخ فعلی + قابل ویرایش */}
          <div>
            <label className="block text-gray-600 mb-1">
              نرخ فعلی (1 {from} = ? {to})
            </label>
            <input
              type="number"
              value={rate || ""}
              onChange={(e) => {
                setRate(e.target.value);
                setManualRate(true);
              }}
              placeholder="در حال دریافت..."
              className="w-full border border-gray-300 rounded-lg p-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {!manualRate && rate && (
              <p className="text-xs text-gray-500 mt-1 text-center">
                نرخ از API گرفته شده است ✅
              </p>
            )}
            {manualRate && (
              <p className="text-xs text-orange-500 mt-1 text-center">
                نرخ به‌صورت دستی تنظیم شده است ✏️
              </p>
            )}
          </div>

          {/* خروجی */}
          <div
            className={`text-center mt-4 p-3 rounded-lg font-bold text-lg transition-all duration-300 ${
              result ? "bg-blue-50 text-blue-700" : "bg-gray-100 text-gray-400"
            }`}
          >
            {result ? `نتیجه: ${result}` : "نتیجه نمایش داده می‌شود..."}
          </div>
        </div>
      </div>
    </div>
  );
}
