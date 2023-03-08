/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        backGroundPrimary: '#13192F',
        titleDark: '#08091E',
        titleLight: '#AF2951',
        titleLightHover: '#912243'
      },
      fontFamily: {
        logoFont: ['Tomorrow', 'sans-serif'],
        sans: ['Signika', 'sans-serif'],
        serif: ['Fraunces', 'serif']
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
};
