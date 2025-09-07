import { useState, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronsUpDown, Check } from "lucide-react";

const categories = ["طول", "جرم", "حجم", "دمای", "سرعت"];
const units = {
  طول: ["متر", "کیلومتر", "سانتی‌متر"],
  جرم: ["گرم", "کیلوگرم", "پوند"],
  حجم: ["لیتر", "میلی‌لیتر"],
  دمای: ["سانتی‌گراد", "فارنهایت"],
  سرعت: ["متر/ثانیه", "کیلومتر/ساعت"],
};

export default function UnitCard() {
  const [category, setCategory] = useState(categories[0]);
  const [fromUnit, setFromUnit] = useState(units[categories[0]][0]);
  const [toUnit, setToUnit] = useState(units[categories[0]][1] ?? units[categories[0]][0]);
  const [value, setValue] = useState("");

  function onCategoryChange(cat) {
    setCategory(cat);
    const list = units[cat] || [];
    setFromUnit(list[0] ?? "");
    setToUnit(list[1] ?? list[0] ?? "");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-6">
          <h1 className="text-white text-lg font-semibold">🔁 تبدیل واحد</h1>
        </div>

        <div className="bg-white p-6 space-y-5">
          <p className="text-sm text-gray-500">یک دسته را انتخاب کن، واحدها را تعیین کن و مقدار را وارد کن.</p>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">نوع یکا</label>
            <Listbox value={category} onChange={onCategoryChange}>
              <div className="relative">
                <Listbox.Button className="w-full bg-white border rounded-xl px-4 py-2 text-left flex justify-between items-center shadow-sm">
                  <span>{category}</span>
                  <ChevronsUpDown className="w-5 h-5 text-gray-400" />
                </Listbox.Button>
                <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                  <Listbox.Options className="absolute z-20 mt-1 w-full bg-white rounded-xl shadow-lg max-h-52 overflow-auto">
                    {categories.map((c, i) => (
                      <Listbox.Option key={i} value={c} className={({ active }) => `cursor-pointer px-4 py-2 ${active ? "bg-violet-50 text-violet-700" : "text-gray-700"}`}>
                        {({ selected }) => (
                          <div className="flex items-center">
                            {selected && <Check className="w-4 h-4 ml-2 text-violet-600" />}
                            <span>{c}</span>
                          </div>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">از واحد</label>
              <Listbox value={fromUnit} onChange={setFromUnit}>
                <div className="relative">
                  <Listbox.Button className="w-full bg-white border rounded-xl px-4 py-2 text-left flex justify-between items-center shadow-sm">
                    <span>{fromUnit}</span>
                    <ChevronsUpDown className="w-5 h-5 text-gray-400" />
                  </Listbox.Button>
                  <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <Listbox.Options className="absolute z-20 mt-1 w-full bg-white rounded-xl shadow-lg max-h-48 overflow-auto">
                      {(units[category] || []).map((u, idx) => (
                        <Listbox.Option key={idx} value={u} className={({ active }) => `cursor-pointer px-4 py-2 ${active ? "bg-violet-50 text-violet-700" : "text-gray-700"}`}>
                          {({ selected }) => (
                            <div className="flex items-center">
                              {selected && <Check className="w-4 h-4 ml-2 text-violet-600" />}
                              <span>{u}</span>
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
                    <span>{toUnit}</span>
                    <ChevronsUpDown className="w-5 h-5 text-gray-400" />
                  </Listbox.Button>
                  <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <Listbox.Options className="absolute z-20 mt-1 w-full bg-white rounded-xl shadow-lg max-h-48 overflow-auto">
                      {(units[category] || []).map((u, idx) => (
                        <Listbox.Option key={idx} value={u} className={({ active }) => `cursor-pointer px-4 py-2 ${active ? "bg-violet-50 text-violet-700" : "text-gray-700"}`}>
                          {({ selected }) => (
                            <div className="flex items-center">
                              {selected && <Check className="w-4 h-4 ml-2 text-violet-600" />}
                              <span>{u}</span>
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

          <div className="mt-2 rounded-xl bg-violet-50 border border-violet-100 p-4 text-center">
            <div className="text-sm text-violet-700">نتیجه</div>
            <div className="mt-2 text-2xl font-semibold text-violet-800">0</div>
            <div className="mt-1 text-xs text-gray-400">{value || "مقدار وارد نشده"}</div>
          </div>

          <div className="flex gap-3">
            <button className="flex-1 py-2 rounded-xl bg-violet-600 text-white font-medium shadow hover:opacity-95">تبدیل</button>
            <button className="flex-1 py-2 rounded-xl border border-gray-200 text-gray-700">پاک کردن</button>
          </div>
        </div>
      </div>
    </div>
  );
}
