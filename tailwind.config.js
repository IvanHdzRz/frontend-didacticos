module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes:{
        showUp:{
          '0%':{transform: 'translateY(3rem)'},
          '100%':{transform: 'translateY(0)'}
        }
      },
      animation:{
        showUp:'showUp 1s ease-in-out forwards'
      }
    },
  },
  variants: {
    extend: {
      ringColor: ['group-focus'],
      ringWidth:['group-focus'],
      ringOpacity:['group-focus']
    },
  },
  plugins: [],
}
