module.exports = {
  theme: {
    extend: {
      letterSpacing: {},
      lineHeight: {},
      fontSize: {},
      boxShadow: {},
      typography: {},
      colors: {},
      spacing: {},
      fontFamily: {}
    }
  },
  variants: {
    extend: {}
  },
  // daisyUI config (optional)
  daisyui: {
    styled: true,
    themes: true,
    // themes: [
    //   {
    //     light: {
    //       ...require('daisyui/src/colors/themes')['[data-theme=corporate]'],
    //       accent: '#04BFBF'
    //     },
    //     dark: {
    //       ...require('daisyui/src/colors/themes')['[data-theme=business]'],
    //       accent: '#04BFBF'
    //     }
    //   }
    // ],
    base: true,
    utils: true,
    logs: true,
    rtl: false
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('daisyui')
  ]
};
