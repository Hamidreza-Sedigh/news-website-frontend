import { useState, useRef, useEffect } from "react";
import { Calculator, RotateCcw } from 'lucide-react';

export default function GoldPriceTool() {
  const [goldPrice, setGoldPrice] = useState(0);
  const [weight, setWeight] = useState(0);
  const [makingFee, setMakingFee] = useState(0);
  const [makingFeeType, setMakingFeeType] = useState('fixed'); // fixed | percent
  const [taxPercent, setTaxPercent] = useState(9);
  const [profitPercent, setProfitPercent] = useState(7);
  const [includeTax, setIncludeTax] = useState(true);
  const [includeProfit, setIncludeProfit] = useState(true);
  const [finalPrice, setFinalPrice] = useState(0);

  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [weight, goldPrice, makingFee, makingFeeType, includeTax, taxPercent, includeProfit, profitPercent]);

  const handleCalculate = (e) => {
    e.preventDefault();

    // محاسبه اجرت بر اساس نوع
    let actualMakingFee = makingFee;
    if (makingFeeType === 'percent') {
      actualMakingFee = (makingFee / 100) * goldPrice; // درصد از قیمت روز
    }

    // قیمت پایه = وزن * (قیمت روز + اجرت)
    let basePrice = weight * (goldPrice + actualMakingFee);

    // اضافه کردن مالیات اگر فعال باشد
    if (includeTax) {
      basePrice += (taxPercent / 100) * basePrice;
    }

    // اضافه کردن سود طلافروش اگر فعال باشد
    if (includeProfit) {
      basePrice += (profitPercent / 100) * basePrice;
    }

    setFinalPrice(basePrice);
  };

  const resetFields = () => {
    setGoldPrice(0);
    setWeight(0);
    setMakingFee(0);
    setTaxPercent(9);
    setProfitPercent(7);
    setIncludeTax(true);
    setIncludeProfit(true);
    setMakingFeeType('fixed');
    setFinalPrice(0);
  };

  const ToggleSwitch = ({ enabled, setEnabled }) => (
    <label className="relative inline-flex items-center cursor-pointer select-none">
      <input
        type="checkbox"
        className="sr-only"
        checked={enabled}
        onChange={() => setEnabled(!enabled)}
      />
      <div className={`w-12 h-6 rounded-full transition-colors duration-300 ${enabled ? 'bg-yellow-400' : 'bg-gray-300'}`}>
        <div className={`absolute top-[2px] left-[2px] bg-white rounded-full h-5 w-5 transition-transform duration-300 ${enabled ? 'translate-x-6' : 'translate-x-0'}`}></div>
      </div>
    </label>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-2xl font-semibold mb-2">ابزار محاسبه قیمت طلا</h1>
        <p className="text-sm text-gray-500 mb-6">فرمول: ۹٪ مالیات + ۷٪ سود طلافروش + (وزن × (قیمت روز + اجرت))</p>

        <form onSubmit={handleCalculate} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">قیمت روز طلا (تومان / گرم)</span>
              <input
                type="text"
                value={goldPrice.toLocaleString('fa-IR')}
                onChange={(e) => {
                  // فقط اعداد فارسی و انگلیسی نگه داشته شوند
                  const numericString = e.target.value
                    .replace(/[^\d۰-۹]/g, '')        // حذف همه چیز جز اعداد فارسی و انگلیسی
                    .replace(/[۰-۹]/g, d => d.charCodeAt(0) - 1776); // تبدیل اعداد فارسی به انگلیسی
                  setGoldPrice(Number(numericString) || 0);
                }}
                className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:ring-2 focus:ring-yellow-300 p-2"
              />

            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-700">وزن طلا (گرم)</span>
              <input
                type="number"
                step="any"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:ring-2 focus:ring-yellow-300 p-2"
                placeholder="مثال: ۲.۵"
              />
            </label>

            {/* اجرت ساخت */}
            <div className="sm:col-span-2 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">اجرت ساخت</span>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => setMakingFeeType('fixed')} className={`${makingFeeType === 'fixed' ? 'bg-yellow-400 text-white' : 'bg-gray-200 text-gray-700'} px-3 py-1 rounded-full text-xs transition`}>💰 مبلغ ثابت</button>
                  <button type="button" onClick={() => setMakingFeeType('percent')} className={`${makingFeeType === 'percent' ? 'bg-yellow-400 text-white' : 'bg-gray-200 text-gray-700'} px-3 py-1 rounded-full text-xs transition`}>٪ درصدی</button>
                </div>
              </div>
              <input
                type="number"
                step="any"
                value={makingFee}
                onChange={(e) => setMakingFee(Number(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:ring-2 focus:ring-yellow-300 p-2"
                placeholder={makingFeeType === 'fixed' ? 'مثال: ۵۰۰۰۰ تومان به ازای هر گرم' : 'مثال: ۵ درصد از قیمت طلا'}
              />
            </div>

            <label className="block">
              <span className="text-sm font-medium text-gray-700">مالیات (%)</span>
              <div className="mt-1 flex items-center gap-2">
                <ToggleSwitch enabled={includeTax} setEnabled={setIncludeTax} />
                <span className="text-sm text-gray-700">محاسبه مالیات</span>
              </div>
              <input
                type="number"
                step="any"
                value={taxPercent}
                onChange={(e) => setTaxPercent(Number(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:ring-2 focus:ring-yellow-300 p-2"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-700">سود طلافروش (%)</span>
              <div className="mt-1 flex items-center gap-2">
                <ToggleSwitch enabled={includeProfit} setEnabled={setIncludeProfit} />
                <span className="text-sm text-gray-700">محاسبه سود طلافروش</span>
              </div>
              <input
                type="number"
                step="any"
                value={profitPercent}
                onChange={(e) => setProfitPercent(Number(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:ring-2 focus:ring-yellow-300 p-2"
              />
            </label>
          </div>

          <div className="pt-4 border-t">
            <h2 className="text-lg font-medium mb-2">قیمت نهایی (تومان)</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <input disabled value={finalPrice.toLocaleString()} className="mt-1 block w-full rounded-md border-gray-200 bg-gray-50 p-2 text-center text-gray-700" />
              </div>
              <div>
                <textarea
                  ref={textareaRef}
                  disabled
                  value={`وزن: ${weight}g — قیمت روز: ${goldPrice} — اجرت: ${makingFee} (${makingFeeType === 'percent' ? 'درصدی' : 'مبلغ ثابت'})\nمالیات: ${includeTax ? taxPercent + '%' : 'غیرفعال'}\nسود: ${includeProfit ? profitPercent + '%' : 'غیرفعال'}`}
                  className="mt-1 block w-full rounded-md border-gray-200 bg-gray-50 p-2 text-gray-700 resize-none overflow-hidden"
                />

              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-4 py-2 text-white text-sm font-medium hover:bg-yellow-500 transition">
                <Calculator className="w-4 h-4" /> محاسبه
              </button>

              <button type="button" onClick={resetFields} className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition">
                <RotateCcw className="w-4 h-4" /> بازنشانی
              </button>
            </div>
          </div>
        </form>
      </div>


    </div>
  );
}
