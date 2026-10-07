/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        white: "#FFFFFF",
        cream: "#FFF9FA",
        blush: "#F8DDE4",
        pink: "#E9A5B7",
        black: "#151515",
        gray: "#777777",
        border: "#D8D0D2"
      },
      maxWidth: {
        site: "1400px"
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' }
        }
      },
      animation: {
        marquee: 'marquee 40s linear infinite'
      }
    }
  },

  plugins: []
};