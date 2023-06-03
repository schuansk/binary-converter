/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      width: {
        '50vw': '50vw',
      },
      height: {
        '60vh': '60vh',
      },
      borderColor: {
        'blue-500': '#2CCADF',
      },
      backgroundColor: {
        'blue-500': '#2CCADF',
        'blue-600': '#22B9CD',
      },
      borderWidth: {
        10: '10px',
      },
      textColor: {
        'blue-500': '#2CCADF',
      },
    },
  },
  plugins: [],
};
