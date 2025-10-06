"use client";

import { useState } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import jalaali from "jalaali-js";
import DateObject from "react-date-object";
import { ClipboardIcon } from "@heroicons/react/24/outline";

export default function DateConverterPage() {
  const [jalaliDate, setJalaliDate] = useState(null);
  const [gregorianDate, setGregorianDate] = useState(null);
  const [copiedType, setCopiedType] = useState(null);

  const handleJalaliChange = (date) => {
    setJalaliDate(date);
    if (date) {
      const { gy, gm, gd } = jalaali.toGregorian(
        date.year,
        date.month.number,
        date.day
      );
      const gregObj = new DateObject({
        calendar: gregorian,
        locale: gregorian_en,
        year: gy,
        month: gm,
        day: gd,
      });
      setGregorianDate(gregObj);
    } else {
      setGregorianDate(null);
    }
  };

  const handleGregorianChange = (date) => {
    setGregorianDate(date);
    if (date) {
      const { jy, jm, jd } = jalaali.toJalaali(
        date.year,
        date.month.number,
        date.day
      );
      const jalaliObj = new DateObject({
        calendar: persian,
        locale: persian_fa,
        year: jy,
        month: jm,
        day: jd,
      });
      setJalaliDate(jalaliObj);
    } else {
      setJalaliDate(null);
    }
  };

  const copyText = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 1500);
    } catch (err) {
      alert("کپی کردن انجام نشد!");
    }
  };

  const copySingleDate = (type) => {
    if (type === "jalali" && jalaliDate) {
      const str = `${jalaliDate.weekDay.name} ${jalaliDate.day} ${jalaliDate.month.name} ${jalaliDate.year}`;
      copyText(str, "jalali");
    }
    if (type === "gregorian" && gregorianDate) {
      const str = `${gregorianDate.weekDay.name} ${gregorianDate.day} ${gregorianDate.month.name} ${gregorianDate.year}`;
      copyText(str, "gregorian");
    }
  };

  const copyBothDates = () => {
    if (jalaliDate && gregorianDate) {
      const jalaliStr = `${jalaliDate.weekDay.name} ${jalaliDate.day} ${jalaliDate.month.name} ${jalaliDate.year}`;
      const gregStr = `${gregorianDate.weekDay.name} ${gregorianDate.day} ${gregorianDate.month.name} ${gregorianDate.year}`;
      copyText(`تاریخ انتخابی: ${jalaliStr} | ${gregStr}`, "both");
    }
  };

  const clearDates = () => {
    setJalaliDate(null);
    setGregorianDate(null);
  };

  const TooltipButton = ({ type, onClick }) => (
    <div className="relative group">
      <button
        type="button"
        onClick={onClick}
        className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 cursor-pointer"
      >
        <ClipboardIcon className="h-5 w-5" />
      </button>

      {/* Tooltip */}
      <span
        className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
      >
        {copiedType === type ? "کپی شد!" : "کپی تاریخ"}
      </span>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto mt-16 bg-white rounded-2xl shadow-lg p-8 space-y-8">
      <h1 className="text-2xl font-bold text-center text-gray-800">
        مبدل تاریخ شمسی ⇆ میلادی
      </h1>

      <div className="space-y-6">
        {/* تاریخ شمسی */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">تاریخ شمسی</label>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <DatePicker
              value={jalaliDate}
              onChange={handleJalaliChange}
              calendar={persian}
              locale={persian_fa}
              className="border rounded-lg p-2 flex-1"
            />
            {jalaliDate && (
              <TooltipButton
                type="jalali"
                onClick={() => copySingleDate("jalali")}
              />
            )}
          </div>
        </div>

        {/* تاریخ میلادی */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">تاریخ میلادی</label>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <DatePicker
              value={gregorianDate}
              onChange={handleGregorianChange}
              calendar={gregorian}
              locale={gregorian_en}
              className="border rounded-lg p-2 flex-1"
            />
            {gregorianDate && (
              <TooltipButton
                type="gregorian"
                onClick={() => copySingleDate("gregorian")}
              />
            )}
          </div>
        </div>
      </div>

      {jalaliDate && gregorianDate && (
        <p className="mt-4 text-center text-gray-700 font-medium">
          تاریخ انتخابی برابر است با{" "}
          {`${jalaliDate.weekDay.name} ${jalaliDate.day} ${jalaliDate.month.name} ${jalaliDate.year}`}{" "}
          ({`${gregorianDate.weekDay.name} ${gregorianDate.day} ${gregorianDate.month.name} ${gregorianDate.year}`})
        </p>
      )}

      <div className="flex justify-between mt-8 relative">
        <button
          onClick={copyBothDates}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition cursor-pointer"
        >
          کپی هر دو تاریخ
        </button>
        <button
          onClick={clearDates}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition cursor-pointer"
        >
          پاک کردن
        </button>
        {copiedType === "both" && (
          <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1">
            هر دو تاریخ کپی شد!
          </span>
        )}
      </div>
    </div>
  );
}
