/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'lightblue':{
          'ocean':'#007FFF',
          'sky':'#00B7EB',
          'diamond':'#4168E1',
        }
      },
      transitionProperty:{
        'height':'heigth'
      },
      fontFamily:{
        'Neucha': 'Neucha, cursive',
        'Tilt': 'Tilt Warp, cursive'
      }
    },
  },
  plugins: [],
}
