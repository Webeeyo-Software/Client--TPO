/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}", // entry file
    "./components/**/**/*.{js,jsx,ts,tsx}", // shared components
    "./app/**/*.{js,jsx,ts,tsx}", // all screens in app folder
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};
