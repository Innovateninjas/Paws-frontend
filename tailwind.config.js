/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'custom-gradient': 'linear-gradient(to bottom right, #cedffb, #54d5fc, #2683f2, #1d81f3)'
      }),
      textShadow: {
        'lg': '2px 4px 6px rgba(0, 0, 0, 0.5)',
      },
      colors: {
        'gradient-start': 'rgba(252, 178, 231, 0.68)',
        'gradient-middle': 'rgba(255, 174, 242, 0.68)',
        'gradient-end': 'rgba(242, 117, 237, 0.68)',
        'dashboard-gradient-top': 'rgba(160, 255, 181, 0.94)',
        'dashboard-gradient-bottom': 'rgba(6, 240, 255, 1)',
        'dashboard-card-gradient-bottom': 'rgba(117, 117, 117, 0.46)',
        'dashboard-card-report-gradient':'rgba(203, 199, 199, 0.77)',
        'campaign-input-top': 'rgba(252, 178, 231, 0.68)',
        'campaign-input-middle': 'rgba(252, 174, 242, 0.68)',
        'campaign-input-bottom': 'rgba(242, 117, 237,0.68)',
        'campaign-card-bg-top': '#1e85e47d',
        'campaign-card-bg-middle': '#ffffff80',
        'campaign-card-bg-bottom': '#ffffffcc',
        'stone': '#53605B',
        'success-top':'rgba(167, 254, 181, 0.60)',
        'success-bottom': 'rgba(240, 7, 231, 0.60)'


      },
      fontFamily: {
        bayon: ['Bayon', 'sans-serif'], 
        breeSerif: ['BreeSerif', 'sans-serif'], 
        ChauPhilomeneOne: ['Chau Philomene One', 'sans-serif'],
        baijam: ['Bai Jamjuree', 'sans-serif'],
        baloo:['Baloo', 'sans-serif'],
        Calistoga : ['Calistoga', 'sans-serif'],
        BigShotOne : ['BigShotOne', 'sans-serif'],
        VarelaRound : ['VarelaRound', 'sans-serif'],
      },
      boxShadow: {
        custom: '14px 18px 30px 0px #1E85E47D',
        buttonShadow: ' rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
        dashBoardCardShadow: '0px 28.052980422973633px 0px #1E85E426, 0px 28.052980422973633px 0px #1E85E426',
        dashBoardCardImageShadow: '3.847223997116089px 4.946430683135986px 14.289689064025879px 0px #00000040',
        glow: '0 0 10px 0 #45bbf9',
      },
      opacity: {
        '57': '0.57',
      },
      transitionDelay: {
          '0': '0ms',
          '2000': '2000ms',
        },
      keyframes: {
          'fade-in': {
            '0%': { opacity: 0 },
            '100%': { opacity: 1 },
          },
          'zoom-in': {
            '0%': { transform: 'scale(0.9)', opacity: '0' },
            '100%': { transform: 'scale(1)', opacity: '1' },
          },
          'zoom-out': {
            '0%': { transform: 'scale(1)', opacity: '1' },
            '100%': { transform: 'scale(0.9)', opacity: '0' },
          }
        },
        screens: {
          'h-md': {'raw': '(max-height: 768px)'},
        sm: { max: "600px" },
        lg: { max: "1800px" },
        lgm: { max: "1140px" },
        md: { max: "990px" },
        xs: { max: "400px" },
        minmd: "1700px",
        minlg: "2100px",
        },
        animation: {
          'fade-in': 'fade-in 0.5s ease-out',
          'fade-in-campaign': 'fade-in 2s infinite alternate',
          'zoom-in': 'zoom-in 0.3s',
          'zoom-out': 'zoom-out 0.3s',
          'fade-in-donation': 'fade-in 2s infinite alternate',
        },
    },
  },
    variants: {
      extend: {
        transitionDelay: ['hover', 'focus'],
      },
},
  plugins: [
  ],
  corePlugins: {
    scrollbarHide: true,
  },
}

