export const unitData = {
  length: {
    base: "meter",
    label: "طول",
    units: {
      meter: { factor: 1, label: "متر" },
      kilometer: { factor: 1000, label: "کیلومتر" },
      centimeter: { factor: 0.01, label: "سانتی‌متر" },
      milimeter:  { factor: 0.001, label: "میلی متر" },
      micrometer: { factor: 0.000001, label: 'میکرون'},
      nanometer: { factor: 0.000000001, label: 'نانومتر'},
      mile: { factor: 1609.34, label: "مایل" },
      foot: { factor: 0.3048, label: "فوت" },
      inch: { factor: 0.0254, label: "اینچ" },
      rd: { factor: 5.0292, label: "راد" },
      fathom: { factor: 1.8288, label: "فاتوم" },
      yard: { factor: 0.9144 , label: "یارد" },
    },
  },
  mass: {
    base: "gram",
    label: "جرم",
    units: {
      gram: { factor: 1, label: "گرم" },
      kilogram: { factor: 1000, label: "کیلوگرم" },
      pound: { factor: 453.592, label: "پوند" },
      ounce: { factor: 28.3495, label: "اونس" },
    },
  },
  volume: {
    base: "liter",
    label: "حجم",
    units: {
      liter: { factor: 1, label: "لیتر" },
      milliliter: { factor: 0.001, label: "میلی‌لیتر" },
      gallon: { factor: 3.78541, label: "گالن" },
      cubic_meter: { factor: 1000, label: "متر مکعب" },      // 1 m³ = 1000 L
      cubic_centimeter: { factor: 0.001, label: "سی‌سی" }, // 1 cm³ = 0.001 L
      milliliter_cubed: { factor: 1e-6, label: "میلی‌لیتر مکعب" }, // 1 mm³ = 1e-6 L
    },
  },
  temperature: {
    base: "celsius",
    label: "دما",
    units: {
      celsius: { label: "سانتی‌گراد" },
      fahrenheit: { label: "فارنهایت" },
      kelvin: { label: "کلوین" },
    },
  },
  area: {
    base: "square_meter",
    label: "مساحت",
    units: {
      square_meter: { factor: 1, label: "متر مربع" },
      square_kilometer: { factor: 1e6, label: "کیلومتر مربع" },
      hectare: { factor: 10000, label: "هکتار" },
      acre: { factor: 4046.86, label: "ایکر" },
    },
  },
  speed: {
    base: "meter_per_second",
    label: "سرعت",
    units: {
      meter_per_second: { factor: 1, label: "متر بر ثانیه" },
      kilometer_per_hour: { factor: 1000 / 3600, label: "کیلومتر بر ساعت" },
      mile_per_hour: { factor: 1609.34 / 3600, label: "مایل بر ساعت" },
      foot_per_second: { factor: 0.3048, label: "فوت بر ثانیه" },
    },
  },
  energy: {
    base: "joule",
    label: "انرژی",
    units: {
      joule: { factor: 1, label: "ژول" },
      kilojoule: { factor: 1000, label: "کیلوژول" },
      calorie: { factor: 4.184, label: "کالری" },
      kilocalorie: { factor: 4184, label: "کیلوکالری" },
    },
  },
  force: {
    base: "newton",
    label: "نیرو",
    units: {
      newton: { factor: 1, label: "نیوتن" },
      kilogram_force: { factor: 9.80665, label: "کیلوگرم نیرو" },
      pound_force: { factor: 4.44822, label: "پوند نیرو" },
    },
  },
  torque: {
    base: "newton_meter",
    label: "گشتاور",
    units: {
      newton_meter: { factor: 1, label: "نیوتن‌متر" },
      kilogram_meter: { factor: 9.80665, label: "کیلوگرم‌متر" },
      pound_foot: { factor: 1.35582, label: "پوند فوت" },
    },
  },
  pressure: {
    base: "pascal",
    label: "فشار",
    units: {
      pascal: { factor: 1, label: "پاسکال" },
      bar: { factor: 100000, label: "بار" },
      atmosphere: { factor: 101325, label: "اتمسفر" },
      psi: { factor: 6894.76, label: "پوند بر اینچ مربع" },
    },
  },
  power: {
    base: "watt",
    label: "توان",
    units: {
      watt: { factor: 1, label: "وات" },
      kilowatt: { factor: 1000, label: "کیلووات" },
      horsepower: { factor: 745.7, label: "اسب بخار" },
    },
  },
  time: {
    base: "second",
    label: "زمان",
    units: {
      second: { factor: 1, label: "ثانیه" },
      minute: { factor: 60, label: "دقیقه" },
      hour: { factor: 3600, label: "ساعت" },
      day: { factor: 86400, label: "روز" },
    },
  },
  density: {
    base: "kg_per_m3",
    label: "چگالی",
    units: {
      kg_per_m3: { factor: 1, label: "کیلوگرم بر متر مکعب" },
      g_per_cm3: { factor: 1000, label: "گرم بر سانتی‌متر مکعب" },
    },
  },
  frequency: {
    base: "hertz",
    label: "فرکانس",
    units: {
      hertz: { factor: 1, label: "هرتز" },
      kilohertz: { factor: 1000, label: "کیلوهرتز" },
      megahertz: { factor: 1e6, label: "مگاهرتز" },
    },
  },
  angle: {
    base: "radian",
    label: "زاویه",
    units: {
      radian: { factor: 1, label: "رادیان" },
      degree: { factor: Math.PI / 180, label: "درجه" },
    },
  },
  acceleration: {
    base: "meter_per_second2",
    label: "شتاب",
    units: {
      meter_per_second2: { factor: 1, label: "متر بر مجذور ثانیه" },
      g: { factor: 9.80665, label: "شتاب جاذبه" },
      kilometer_per_hour2: { factor: (1000 / 3600) ** 2, label: "کیلومتر بر ساعت مربع" },
    },
  },
};
