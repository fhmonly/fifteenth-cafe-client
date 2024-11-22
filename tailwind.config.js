export default {
  theme: {
    extend: {
      colors: {
        main: "#a91d3a",
        grey: "#eeeeee"
      }
    },
    screens: {
      'mobile': '360px',
      'tablet': '520px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1440px',
    }
  },
  plugins: [
    require('daisyui'),
  ],
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.{js,ts}',
    './plugins/**/*.{js,ts}',
    './utils/**/*.{js,ts}',
    './App.{js,ts,vue}',
    './app.{js,ts,vue}',
    './Error.{js,ts,vue}',
    './error.{js,ts,vue}',
    './app.config.{js,ts}',
    './public/js/**/*.js',
    './public/js/*.js',
  ]
}