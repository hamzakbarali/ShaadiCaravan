/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary"      : "#F3EAD5",
        "secondary"    : "#F43F64",
        "accent"       : "#d4b76d",
        "btnTextColor" : "#fff",
        "chocolate"    : "#7B3F00",
        "white"        : "#fff" 
      },
      fontFamily: {
        "primary"   : ['Poppins', "sans-serif"],
        "secondary" : ['Alegreya', "serif"],
      },
      flex: {
        '2': '2 2 0%',
        '3': '3 3 0%',
        '8': '8 8 0%'
      }
    },
    
  },
  plugins: [],
}
