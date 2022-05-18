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
      'violet-black': '#10060F',
      'violet-light': '#EEDCEC',
      gray: '#C9C9C9',
      'gray-light': '#EFEFEF',
      green: '#399500',
      red: '#BA0000',
      zink: '#363636',
      orange: '#FF6700'
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
      colors: {
        gray: {
          DEFAULT: '#C9C9C9',
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('tailwindcss/colors')],
}
