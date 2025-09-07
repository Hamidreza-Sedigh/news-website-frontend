import { useState, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronsUpDown, Replace } from "lucide-react";

const categories = ["طول", "جرم", "حجم", "دمای"];
const units = {
  طول: ["متر", "کیلومتر", "سانتی‌متر"],
  جرم: ["گرم", "کیلوگرم", "پوند"],
  حجم: ["لیتر", "میلی‌لیتر"],
  دمای: ["سانتی‌گراد", "فارنهایت"],
};

export default function UnitBold() {
  const [category, setCategory] = useState(categories[0]);
  const [fromUnit, setFromUnit] = useState(units[categories[0]][0]);
  const [toUnit, setToUnit] = useState(units[categories[0]][1] ?? units[categories[0]][0]);
  const [value, setValue] = useState("");

  function swapUnits() {
    const prevFrom = fromUnit;
    setFromUnit(toUnit);
    setToUnit(prevFrom);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">تبدیلگر — سریع و برجسته</h2>
          <div className="text-sm text-gray-500">UI نسخه بزرگ — مناسب دسکتاپ</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <div className="md:col-span-2 space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">دسته</label>
              <Listbox value={category} onChange={(c) => {
                setCategory(c);
                const list = units[c] || [];
                setFromUnit(list[0] ?? "");
                setToUnit(list[1] ?? list[0] ?? "");
              }}>
                <div className="relative">
                  <Listbox.Button className="w-full border rounded-xl px-4 py-3 text-left flex justify-between items-center">
                    <span>{category}</span>
                    <ChevronsUpDown className="w-5 h-5 text-gray-400" />
                  </Listbox.Button>
                  <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <Listbox.Options className="absolute z-30 mt-1 w-full bg-white rounded-xl shadow-lg max-h-48 overflow-auto">
                      {categories.map((c, i) => (
                        <Listbox.Option key={i} value={c} className={({ active }) => `px-4 py-2 cursor-pointer ${active ? "bg-gray-50 text-gray-900" : "text-gray-700"}`}>
                          {c}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-600 mb-2">از</label>
                <Listbox value={fromUnit} onChange={setFromUnit}>
                  <div className="relative">
                    <Listbox.Button className="w-full border rounded-xl px-4 py-3 text-left flex justify-between items-center">
                      <span>{fromUnit}</span>
                      <ChevronsUpDown className="w-5 h-5 text-gray-400" />
                    </Listbox.Button>
                    <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                      <Listbox.Options className="absolute z-30 mt-1 w-full bg-white rounded-xl shadow-lg max-h-48 overflow-auto">
                        {(units[category] || []).map((u, idx) => (
                          <Listbox.Option key={idx} value={u} className={({ active }) => `px-4 py-2 cursor-pointer ${active ? "bg-gray-50 text-gray-900" : "text-gray-700"}`}>
                            {u}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">به</label>
                <Listbox value={toUnit} onChange={setToUnit}>
                  <div className="relative">
                    <Listbox.Button className="w-full border rounded-xl px-4 py-3 text-left flex justify-between items-center">
                      <span>{toUnit}</span>
                      <ChevronsUpDown className="w-5 h-5 text-gray-400" />
                    </Listbox.Button>
                    <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                      <Listbox.Options className="absolute z-30 mt-1 w-full bg-white rounded-xl shadow-lg max-h-48 overflow-auto">
                        {(units[category] || []).map((u, idx) => (
                          <Listbox.Option key={idx} value={u} className={({ active }) => `px-4 py-2 cursor-pointer ${active ? "bg-gray-50 text-gray-900" : "text-gray-700"}`}>
                            {u}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">مقدار</label>
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="مثلاً 100"
                className="w-full rounded-xl border px-5 py-4 text-xl focus:outline-none focus:ring-2 focus:ring-green-200"
              />
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 flex flex-col items-center justify-center border border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="text-sm text-gray-500">خروجی</div>
              <button onClick={swapUnits} className="p-2 rounded-lg bg-white border shadow-sm">
                <Replace className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="text-6xl font-extrabold text-green-600 leading-tight">0</div>
            <div className="mt-2 text-sm text-gray-400 text-center">{value ? `${value} ${fromUnit} → ${toUnit}` : "مقداری وارد نشده"}</div>

            <button className="mt-6 w-full py-3 rounded-xl bg-green-600 text-white font-medium shadow-lg">تبدیل کن</button>
          </div>
        </div>
      </div>
    </div>
  );
}
