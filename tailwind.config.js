/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.tsx", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        SomarBold: ["SomarBold"],
        SomarRegular: ["SomarRegular"],
        SomarMedium: ["SomarMedium"],
        SomarLight: ["SomarLight"],
        SomarThin: ["SomarThin"],
        SomarBlack: ["SomarBlack"],
      },
      colors: {
        primary: "#65382C",
        secondary: "#CE9664",
      },
    },
  },
  plugins: [],
};
