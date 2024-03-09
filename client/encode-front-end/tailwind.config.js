/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBlue: '#000000', // Corrected custom dark blue color
        trueBlack: '#ffff',
      },
      gradientColorStops: theme => ({
        ...theme('colors'),
        darkBlue: '#010138',
        trueBlack: '#000000',
      }),
    },
  },
  plugins: [],
}

