/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'green-light': '#4caf50',
        'green-dark': '#2e7d32',
        'green-medium': '#81c784',
        'green-highlight': '#388e3c',
      },
      animation: {
        'gradient': 'gradientAnimation 15s ease infinite',
      },
      keyframes: {
        gradientAnimation: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
    },
  },
  plugins: [],
}