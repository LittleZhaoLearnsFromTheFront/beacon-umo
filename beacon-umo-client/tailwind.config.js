/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  mode: 'jit',
  content: [
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      zIndex: {
        1050: '1050',
      },
      spacing: {
        '4px': '4px',
        '10px': '10px',
        '16px': '16px',
        '24px': '24px',
        '32px': '32px',
        '64px': '64px',
        '128px': '128px',
      },
      colors: {
        gray: {
          333: '#333333',
          666: '#666666',
          999: '#999999',
          1: '#F0F0F0',
          2: '#FAFAFA',
        },
        red: {
          1: '#E45F59',
          2: '#FFF3F0',
        },
      },
    },
  },
};

