/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html","./src/**/*.jsx"],
  theme: {
  extend: {
    colors: {
      'gradient': 'linear-gradient(90deg, rgba(2,189,136,1) 0%, rgba(244,0,255,1) 100%);',
    },
  },
  },
  plugins: [],
  }