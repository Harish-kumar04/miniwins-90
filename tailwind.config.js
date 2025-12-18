/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3F51B5',
        success: '#2ECC71',
        warning: '#F39C12',
        danger: '#E74C3C',
        accent: '#9B59B6',
      },
    },
  },
  plugins: [],
}
