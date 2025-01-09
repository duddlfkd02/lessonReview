/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/**/*.html", "./src/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["Pretendard-Regular", "sans-serif"],
      },
    },
  },
  plugins: [],
};
