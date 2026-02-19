/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: '#0A0A0A',
        primary: '#6B46C1',
        secondary: '#3182CE',
        accent: '#9F7AEA',
      },
    },
  },
  plugins: [],
};
