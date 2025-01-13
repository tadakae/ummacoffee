/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      'raleway': ['Raleway', 'serif'],
      'exo2': ['Exo2', 'serif'],
    }
  },
  plugins: [],
}

