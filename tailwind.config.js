/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vyapar: {
          navy: '#17324D',
          slate: '#244B68',
          ivory: '#F8F6F0',
          white: '#FFFFFF',
          saffron: '#E8892E',
          green: '#287A4B',
          teal: '#267C78',
          text: {
            primary: '#17212B',
            secondary: '#596773',
          },
          border: '#D9DEE3',
          warning: '#B7791F',
          danger: '#B23B3B'
        }
      },
      fontFamily: {
        serif: ['"Noto Serif"', 'serif'],
        sans: ['"Noto Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
