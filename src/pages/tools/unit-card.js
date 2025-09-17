import { useState, useEffect, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronsUpDown, Check } from "lucide-react";
import { unitData } from "../../lib/units";
import { convert } from "../../lib/convert";

export default function UnitCard() {
  const categories = Object.keys(unitData);
  const [category, setCategory] = useState(categories[0]);
  const [fromUnit, setFromUnit] = useState(Object.keys(unitData[categories[0]].units)[0]);
  const [toUnit, setToUnit] = useState(Object.keys(unitData[categories[0]].units)[1]);
  const [value, setValue] = useState("");
  const [result, setResult] = useState(null);

  // 👉 محاسبه‌ی خودکار
  useEffect(() => {
    if (!value) {
      setResult(null);
      return;
    }
    const num = parseFloat(value);
    if (isNaN(num)) {
      setResult(null);
      return;
    }
    const res = convert(category, num, fromUnit, toUnit);
    setResult(res);
  }, [value, fromUnit, toUnit, category]);


  function onCategoryChange(cat) {
    setCategory(cat);
    const unitKeys = Object.keys(unitData[cat].units);
    setFromUnit(unitKeys[0] ?? "");
    setToUnit(unitKeys[1] ?? unitKeys[0] ?? "");
  }

  function handleConvert() {
    if (!value) return;
    const num = parseFloat(value);
    if (isNaN(num)) return;
    const res = convert(category, num, fromUnit, toUnit);
    setResult(res);
  }

  function handleReset() {
    setValue("");
    setResult(null);
  }

  // گرفتن لیبل فارسی
  function getLabel(unitKey) {
    return unitData[category].units[unitKey].label;
  }

  const formatNumber = (num) => {
    if (num === null || num === undefined) return "-";
    return new Intl.NumberFormat("fa-IR", { 
      maximumFractionDigits: 4 
    }).format(num);
  };
  

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-6">
          <h1 className="text-white text-lg font-semibold">🔁 تبدیل واحد</h1>
        </div>

        <div className="bg-white p-6 space-y-5">
          {/* دسته */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">نوع یکا</label>
            <Listbox value={category} onChange={onCategoryChange}>
              <div className="relative">
                <Listbox.Button className="w-full bg-white border rounded-xl px-4 py-2 text-left flex justify-between items-center shadow-sm">
                  <span>{unitData[category].label}</span>
                  <ChevronsUpDown className="w-5 h-5 text-gray-400" />
                </Listbox.Button>
                <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                  <Listbox.Options className="absolute z-20 mt-1 w-full bg-white rounded-xl shadow-lg max-h-52 overflow-auto">
                    {categories.map((c, i) => (
                      <Listbox.Option
                        key={i}
                        value={c}
                        className={({ active }) => `cursor-pointer px-4 py-2 ${active ? "bg-violet-50 text-violet-700" : "text-gray-700"}`}
                      >
                        {({ selected }) => (
                          <div className="flex items-center">
                            {selected && <Check className="w-4 h-4 ml-2 text-violet-600" />}
                            <span>{unitData[c].label}</span>
                          </div>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>

          {/* از واحد - به واحد */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">از واحد</label>
              <Listbox value={fromUnit} onChange={setFromUnit}>
                <div className="relative">
                  <Listbox.Button className="w-full bg-white border rounded-xl px-4 py-2 text-left flex justify-between items-center shadow-sm">
                    <span>{getLabel(fromUnit)}</span>
                    <ChevronsUpDown className="w-5 h-5 text-gray-400" />
                  </Listbox.Button>
                  <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <Listbox.Options className="absolute z-20 mt-1 w-full bg-white rounded-xl shadow-lg max-h-48 overflow-auto">
                      {Object.keys(unitData[category].units).map((u, idx) => (
                        <Listbox.Option
                          key={idx}
                          value={u}
                          className={({ active }) => `cursor-pointer px-4 py-2 ${active ? "bg-violet-50 text-violet-700" : "text-gray-700"}`}
                        >
                          {({ selected }) => (
                            <div className="flex items-center">
                              {selected && <Check className="w-4 h-4 ml-2 text-violet-600" />}
                              <span>{unitData[category].units[u].label}</span>
                            </div>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">به واحد</label>
              <Listbox value={toUnit} onChange={setToUnit}>
                <div className="relative">
                  <Listbox.Button className="w-full bg-white border rounded-xl px-4 py-2 text-left flex justify-between items-center shadow-sm">
                    <span>{getLabel(toUnit)}</span>
                    <ChevronsUpDown className="w-5 h-5 text-gray-400" />
                  </Listbox.Button>
                  <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <Listbox.Options className="absolute z-20 mt-1 w-full bg-white rounded-xl shadow-lg max-h-48 overflow-auto">
                      {Object.keys(unitData[category].units).map((u, idx) => (
                        <Listbox.Option
                          key={idx}
                          value={u}
                          className={({ active }) => `cursor-pointer px-4 py-2 ${active ? "bg-violet-50 text-violet-700" : "text-gray-700"}`}
                        >
                          {({ selected }) => (
                            <div className="flex items-center">
                              {selected && <Check className="w-4 h-4 ml-2 text-violet-600" />}
                              <span>{unitData[category].units[u].label}</span>
                            </div>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
          </div>

          {/* مقدار */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">مقدار</label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="مثلاً 12.5"
              className="w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-300 shadow-sm"
            />
          </div>

          {/* خروجی */}
          <div className="mt-2 rounded-xl bg-violet-50 border border-violet-100 p-4 text-center">
            <div className="text-sm text-violet-700">نتیجه</div>
            <div className="mt-2 text-2xl font-semibold text-violet-800">
            {result !== null
              ? new Intl.NumberFormat("fa-IR", { maximumFractionDigits: 4 }).format(result)
              : "—"}
            </div>
            {value && (
              <div className="mt-1 text-xs text-gray-400">
                {`${value} ${getLabel(fromUnit)} → ${getLabel(toUnit)}`}
              </div>
            )}
          </div>

          {/* دکمه‌ها */}
          <div className="flex gap-3">
            
            <button
              onClick={handleReset}
              className="flex-1 py-2 rounded-xl border border-gray-200 text-gray-700"
            >
              پاک کردن
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
