import { useState, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronsUpDown, Check } from "lucide-react";
import { unitData } from "@/lib/units";
import { convert } from "@/lib/convert";

export default function UnitCard() {
  const categoryKeys = Object.keys(unitData);

  const [category, setCategory] = useState(categoryKeys[0]);
  const [fromUnit, setFromUnit] = useState(
    Object.keys(unitData[categoryKeys[0]].units)[0]
  );
  const [toUnit, setToUnit] = useState(
    Object.keys(unitData[categoryKeys[0]].units)[1]
  );
  const [value, setValue] = useState("");
  const [result, setResult] = useState(null);

  const handleConvert = () => {
    if (!value || isNaN(value)) return;
    const res = convert(category, Number(value), fromUnit, toUnit);
    setResult(res);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
          تبدیل واحد
        </h2>

        {/* انتخاب دسته‌بندی */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            دسته‌بندی
          </label>
          <SelectBox
            selected={category}
            setSelected={(val) => {
              setCategory(val);
              const firstUnit = Object.keys(unitData[val].units)[0];
              const secondUnit = Object.keys(unitData[val].units)[1];
              setFromUnit(firstUnit);
              setToUnit(secondUnit);
            }}
            options={categoryKeys.map((key) => ({
              value: key,
              label: unitData[key].label,
            }))}
          />
        </div>

        {/* انتخاب واحد مبدا */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            از واحد
          </label>
          <SelectBox
            selected={fromUnit}
            setSelected={setFromUnit}
            options={Object.keys(unitData[category].units).map((key) => ({
              value: key,
              label: unitData[category].units[key].label,
            }))}
          />
        </div>

        {/* انتخاب واحد مقصد */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            به واحد
          </label>
          <SelectBox
            selected={toUnit}
            setSelected={setToUnit}
            options={Object.keys(unitData[category].units).map((key) => ({
              value: key,
              label: unitData[category].units[key].label,
            }))}
          />
        </div>

        {/* مقدار ورودی */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            مقدار
          </label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="عدد مورد نظر را وارد کنید"
          />
        </div>

        {/* دکمه تبدیل */}
        <button
          onClick={handleConvert}
          className="w-full rounded-lg bg-blue-600 py-2 text-white font-medium hover:bg-blue-700 transition"
        >
          تبدیل
        </button>

        {/* نمایش نتیجه */}
        {result !== null && (
          <div className="mt-6 text-center">
            <p className="text-lg font-semibold text-gray-800">
              نتیجه:{" "}
              <span className="text-blue-600">
                {result.toLocaleString(undefined, {
                  maximumFractionDigits: 4,
                })}
              </span>{" "}
              {unitData[category].units[toUnit].label}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/* 📌 کامپوننت SelectBox */
function SelectBox({ selected, setSelected, options }) {
  const selectedOption = options.find((o) => o.value === selected);

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative">
        <Listbox.Button className="relative w-full cursor-pointer rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm">
          <span className="block truncate">{selectedOption.label}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronsUpDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {options.map((option) => (
              <Listbox.Option
                key={option.value}
                value={option.value}
                className={({ active }) =>
                  `relative cursor-pointer select-none rounded-lg px-4 py-2 ${
                    active ? "bg-blue-100 text-blue-900" : "text-gray-900"
                  }`
                }
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {option.label}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-600">
                        <Check className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
