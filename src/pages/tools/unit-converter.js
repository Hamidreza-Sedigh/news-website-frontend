import { useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "lucide-react";
import { Check,     ChevronsUpDown } from "lucide-react";


const categories = ["طول", "جرم", "حجم"];
const units = ["متر", "کیلومتر", "سانتی‌متر", "کیلوگرم", "پوند", "لیتر", "میلی‌لیتر"];

export default function Converter() {
  const [category, setCategory] = useState(categories[0]);
  const [fromUnit, setFromUnit] = useState(units[0]);
  const [toUnit, setToUnit] = useState(units[1]);
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg space-y-6">
        <h1 className="text-2xl font-bold text-center text-blue-700">🔄 تبدیل واحد</h1>

        {/* انتخاب دسته */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">نوع یکا</label>
          <Listbox value={category} onChange={setCategory}>
            <div className="relative">
              <Listbox.Button className="w-full rounded-xl border px-4 py-2 text-left shadow-sm flex items-center justify-between">
                {category}
                <ChevronsUpDown className="w-5 h-5 text-gray-500" />
              </Listbox.Button>
              <Transition
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 w-full bg-white shadow-lg rounded-xl max-h-60 overflow-auto z-10">
                  {categories.map((cat, idx) => (
                    <Listbox.Option
                      key={idx}
                      value={cat}
                      className={({ active }) =>
                        `cursor-pointer select-none px-4 py-2 ${
                          active ? "bg-blue-100 text-blue-900" : "text-gray-700"
                        }`
                      }
                    >
                      {({ selected }) => (
                        <span className="flex items-center">
                          {selected && <Check className="w-4 h-4 mr-2 text-blue-600" />}
                          {cat}
                        </span>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>

        {/* انتخاب واحد مبدا */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">از واحد</label>
          <Listbox value={fromUnit} onChange={setFromUnit}>
            <div className="relative">
              <Listbox.Button className="w-full rounded-xl border px-4 py-2 text-left shadow-sm flex items-center justify-between">
                {fromUnit}
                <ChevronsUpDown className="w-5 h-5 text-gray-500" />
              </Listbox.Button>
              <Transition
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 w-full bg-white shadow-lg rounded-xl max-h-60 overflow-auto z-10">
                  {units.map((u, idx) => (
                    <Listbox.Option
                      key={idx}
                      value={u}
                      className={({ active }) =>
                        `cursor-pointer select-none px-4 py-2 ${
                          active ? "bg-blue-100 text-blue-900" : "text-gray-700"
                        }`
                      }
                    >
                      {({ selected }) => (
                        <span className="flex items-center">
                          {selected && <Check className="w-4 h-4 mr-2 text-blue-600" />}
                          {u}
                        </span>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>

        {/* انتخاب واحد مقصد */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">به واحد</label>
          <Listbox value={toUnit} onChange={setToUnit}>
            <div className="relative">
              <Listbox.Button className="w-full rounded-xl border px-4 py-2 text-left shadow-sm flex items-center justify-between">
                {toUnit}
                <ChevronsUpDown className="w-5 h-5 text-gray-500" />
              </Listbox.Button>
              <Transition
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 w-full bg-white shadow-lg rounded-xl max-h-60 overflow-auto z-10">
                  {units.map((u, idx) => (
                    <Listbox.Option
                      key={idx}
                      value={u}
                      className={({ active }) =>
                        `cursor-pointer select-none px-4 py-2 ${
                          active ? "bg-blue-100 text-blue-900" : "text-gray-700"
                        }`
                      }
                    >
                      {({ selected }) => (
                        <span className="flex items-center">
                          {selected && <Check className="w-4 h-4 mr-2 text-blue-600" />}
                          {u}
                        </span>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>

        {/* مقدار ورودی */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">مقدار</label>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="مثلاً 10"
            className="w-full rounded-xl border px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* خروجی */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
          <span className="text-gray-600">نتیجه: </span>
          <span className="text-xl font-bold text-blue-700">0</span>
        </div>
      </div>
    </div>
  );
}
