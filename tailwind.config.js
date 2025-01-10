/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/**/*.html", "./dist/**/*.js"],
  safelist: [
    "p-6",
    "mb-6",
    "bg-gray-50",
    "rounded-lg",
    "border",
    "text-left",
    "text-sm",
    "font-bold",
    "text-gray-700",
    "text-gray-600",
    "mt-1",
    "flex",
    "items-center",
    "justify-between",
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["Pretendard-Regular", "sans-serif"],
      },
    },
  },
  plugins: [],
};
