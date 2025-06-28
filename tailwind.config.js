/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'], // ← اگر پوشه‌هات داخل src هست
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}
