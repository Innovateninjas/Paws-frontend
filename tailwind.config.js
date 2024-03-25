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
        'dashboard-gradient-top': 'rgba(160, 255, 181, 0.94)',
        'dashboard-gradient-bottom': 'rgba(6, 240, 255, 1)',
        'dashboard-card-gradient-bottom': 'rgba(117, 117, 117, 0.46)',
        'dashboard-card-report-gradient':'rgba(203, 199, 199, 0.77)',
      },
      fontFamily: {
        bayon: ['Bayon', 'sans-serif'], 
        breeSerif: ['BreeSerif', 'sans-serif'], 
        ChauPhilomeneOne: ['Chau Philomene One', 'sans-serif'],
      },
      boxShadow: {
        custom: '1px 1px 2px black',
        dashBoardCardShadow: '0px 28.052980422973633px 0px #1E85E426, 0px 28.052980422973633px 0px #1E85E426',
        dashBoardCardImageShadow: '3.847223997116089px 4.946430683135986px 14.289689064025879px 0px #00000040',
      },
    },
  },
  plugins: [
  ],
  corePlugins: {
    scrollbarHide: true,
  },
}

