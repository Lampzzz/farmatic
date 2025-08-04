/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#16A34A",
        secondary: "#45B56E",
        // background: "#F0FDF4",
        background: "#F9FAFB",
        gray: "#6B7280",
      },
    },
  },
  plugins: [],
};
