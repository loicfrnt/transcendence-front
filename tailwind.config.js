module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './src/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    colors: {
      black: '#000000',
      white: '#FFFFFF',
      violet: '#A8529F',
      'violet-light': '#EEDCEC',
      gray: '#C9C9C9',
      'gray-light': '#EFEFEF',
      green: '#399500',
      red: '#BA0000',
    },
    fontFamily: {},
    extend: {
      fontFamily: {
        body: ['"IBM Plex Sans"'],
        title: ['Protomo'],
      },
      screens: {
        sm: '966px',
        md: '1413px',
        lg: '1839px',
      },
    },
  },
  plugins: [],
}
