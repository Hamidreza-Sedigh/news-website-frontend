import { unitData } from "./units";

function convertTemperature(value, from, to) {
  let celsius;
  if (from === "celsius") celsius = value;
  if (from === "fahrenheit") celsius = (value - 32) * (5 / 9);
  if (from === "kelvin") celsius = value - 273.15;

  if (to === "celsius") return celsius;
  if (to === "fahrenheit") return celsius * (9 / 5) + 32;
  if (to === "kelvin") return celsius + 273.15;
  return value;
}

export function convert(categoryKey, value, fromUnit, toUnit) {
  if (!unitData[categoryKey]) return null;

  if (categoryKey === "temperature") {
    return convertTemperature(value, fromUnit, toUnit);
  }

  const { base, units } = unitData[categoryKey];
  const inBase = value * units[fromUnit].factor;
  return inBase / units[toUnit].factor;
}
