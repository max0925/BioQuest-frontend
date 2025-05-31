/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/**/*.{js,ts,jsx,tsx}',
      './pages/**/*.{js,ts,jsx,tsx}',
      './app/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
        extend: {
            keyframes: {
              'slide-up-fade': {
                '0%': { transform: 'translateY(40px)', opacity: '0' },
                '100%': { transform: 'translateY(0)', opacity: '1' },
              },
            },
            animation: {
              'slide-up-fade': 'slide-up-fade 1s ease-out forwards',
            },
          }
          
      },
    },
    plugins: [],
  };
  