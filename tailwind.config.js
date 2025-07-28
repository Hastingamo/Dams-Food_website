/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
  content: [
        "./src/**/*.{js,ts,jsx,tsx}",

  ],
  theme: {
    extend: {
      screens: {
        'xs': '420px',
        'Tt': {min: '1100px', max: '1300px'},
        'Ts': {min: '1500px', max: '2000px'},  
        'lls' :'1300px',
      },

    },
  },
  //   variants: {
  //   extend: {
  //     display: ['landscape'],
  //   },
  // },
  plugins: [],
}

