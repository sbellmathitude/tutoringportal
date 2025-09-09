/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#7030A0',
        'neutral-dark': '#4a4649',
        'neutral-medium': '#8b8589',
        'white': '#FFFFFF',
        'background': '#F9F9F9',
      },
      fontFamily: {
        sans: ['"Nunito Sans"', 'sans-serif'],
        display: ['"Original Surfer"', 'cursive'],
      }
    },
  },
  plugins: [],
}