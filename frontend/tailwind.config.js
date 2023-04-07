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
      },
      fontFamily: {
        "primary"   : ['Poppins', "sans-serif"],
        "secondary" : ['Alegreya', "serif"],
      }
    },
    
  },
  plugins: [],
}
