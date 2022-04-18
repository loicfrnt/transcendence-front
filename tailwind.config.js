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
    },
    fontFamily: {},
    extend: {
      fontFamily: {
        body: ['"IBM Plex Sans"'],
        title: ['Protomo'],
      },
      screens: {
        prof_sm: '966px',
        prof_md: '1412px',
        prof_lg: '1838px',
      },
    },
  },
  plugins: [],
}
