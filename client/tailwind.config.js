/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  plugins: [
    require("tw-elements/dist/plugin.cjs"),
    require('tailwind-typewriter')({
        wordsets: {
          fruit: {
            words: ['Welcome to Hart Game'],
            repeat: -1,
            delay: 0.1,
            writeSpeed: 0.3,
          },
          test: {
            words: ['Choose Your Characters'],
            repeat: -1,
            delay: 0,
            writeSpeed: 0.2,
          },
          test1: {
            words: ['Choose Your Options'],
            repeat: -1,
            delay: 0,
            writeSpeed: 0.2,
          }
        }
    })
  ],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        'new-font': ['Open Sans', 'sans-serif'],
        'newFont': ['Catamaran', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        'Catamaran': ['Catamaran', 'sans-serif'],
        'Lora': ['Lora', 'serif'],
        'new-2-font': ['Satisfy' , 'cursive'],
        'lato': ['Lato', 'sans-serif'],
        'Roboto': ['Roboto Serif' , 'serif'],
        'Freehand': ['Freehand' , 'cursive'],
        'Poppins': ['Poppins' , 'sans-serif'],
        'Abril': ['Abril Fatface' , 'cursive'],
        'Rouge': ['Rouge Script','cursive'],
        'Han-Sans': ['Black Han Sans', 'sans-serif'],
        'Monterast' :['Montserrat',' sans-serif'],
        'Gruppo': ['Gruppo', 'sans-serif'],
        'PlayFair': ['Playfair Display', 'serif'],
        'Dancing': ['Dancing Script', 'cursive'],
        'Marcok': ['Marcellus', 'serif'],
        'Play': ['Play', 'sans-serif'],
      },
      colors:{
      },
      backgroundImage:{
        'bg1': "url('/src/img/bg1.png')",
        'bg2': "url('/src/img/grassbackground.png')",
      },
    },
  },
}