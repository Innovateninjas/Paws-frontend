/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gradient-start': 'rgba(252, 178, 231, 0.68)',
        'gradient-middle': 'rgba(255, 174, 242, 0.68)',
        'gradient-end': 'rgba(242, 117, 237, 0.68)',
      },
      boxShadow: {
        custom: '1px 1px 2px black',
      },
    },
  },
  plugins: [],
}

