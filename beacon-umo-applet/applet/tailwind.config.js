/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  mode: 'jit',
  content: ['./src/**/*.{html,tsx,ts,jsx,js}'],
  theme: {
    extend: {},
  },
  plugins: [],
  presets: [
    require('tailwindcss-rem2px-preset').createPreset({
      fontSize: 32,
      unit: 'rpx'
    })
  ],
};
