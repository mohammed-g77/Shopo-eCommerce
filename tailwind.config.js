/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFD333', // Example yellow from Shopo
        secondary: '#3D464D',
      }
    },
  },
  plugins: [],
}
