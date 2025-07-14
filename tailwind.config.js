/** @type {import('tailwindcss').Config} */
export default {
  content: [
        "./src/**/*.{js,ts,jsx,tsx}",

  ],
  theme: {
    extend: {
      screens: {
        'xs': '420px',
        'Tt': {min: '720px', max: '1300px'},
      },
    },
  },
  plugins: [],
}

