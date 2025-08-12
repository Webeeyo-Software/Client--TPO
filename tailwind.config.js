/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}", // entry file
    "./components/**/*.{js,jsx,ts,tsx}", // shared components
    "./app/**/*.{js,jsx,ts,tsx}", // all screens in app folder
    "./Screens/**/*.{js,jsx,ts,tsx}", // if you have a Screens folder
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};
