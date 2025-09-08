/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#4F46E5',
        'brand-secondary': '#F97316',
        'neutral-light': '#F8FAFC',
        'neutral-medium': '#E2E8F0',
        'neutral-dark': '#1E293B',
      },
    },
  },
  plugins: [],
}
