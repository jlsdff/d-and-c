/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        'primary': {
          '50': '#fffbeb',
          '100': '#fff5c6',
          '200': '#ffe46e',
          '300': '#ffd74a',
          '400': '#ffc420',
          '500': '#f9a207',
          '600': '#dd7a02',
          '700': '#b75506',
          '800': '#94410c',
          '900': '#7a360d',
          '950': '#461b02',
        },
        'neutral': {
          '50': '#f4f6f7',
          '100': '#e3e7ea',
          '200': '#cbd3d6',
          '300': '#a6b4ba',
          '400': '#7a8c96',
          '500': '#5f717b',
          '600': '#515f69',
          '700': '#465058',
          '800': '#3e454c',
          '900': '#373d42',
          '950': '#212529',
        }
      }
    },
  },
  plugins: [],
}

