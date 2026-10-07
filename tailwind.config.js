/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0B2A43',
          deep: '#071B2C',
          mid: '#123753',
        },
        gold: {
          DEFAULT: '#B89255',
          light: '#D4B683',
        },
        ivory: {
          DEFAULT: '#F5F1E8',
          soft: '#FAF8F3',
          sec: '#B9B2A5',
        },
        stone: {
          DEFAULT: '#D9D2C5',
        },
        charcoal: {
          DEFAULT: '#202326',
        },
        taupe: {
          DEFAULT: '#8A8375',
        },
        garden: {
          green: '#0B4A3C',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Manrope', 'Arial', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
