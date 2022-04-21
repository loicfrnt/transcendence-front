module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './src/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    colors: {
      white: '#FFFFFF',
      violet: '#A8529F',
      gray: '#C9C9C9',
      'gray-light': '#EFEFEF',
      green: '#399500',
      red: '#BA0000',
      zink: '#363636'
    },
    fontFamily: {},
    extend: {
      fontFamily: {
        body: ['"IBM Plex Sans"'],
        title: ['Protomo'],
      },
      screens: {
        prof_sm: '967px',
        prof_md: '1413px',
        prof_lg: '1839px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss/colors')
  ],
}
