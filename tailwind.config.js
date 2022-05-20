module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        dracula: {
          ...require('daisyui/src/colors/themes')['[data-theme=dracula]'],
          primary: '#BB000E',
          'primary-focus': '#E31C25',
          'base-100': '#212121',
        },
      },
    ],
  },
};
