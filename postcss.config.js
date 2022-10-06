let tailwindcss = require('tailwindcss');

module.exports = {
  plugins: [
    require('postcss-import'),
    tailwindcss('./tailwind.config.js'), // your tailwind.js configuration file path
    require('autoprefixer'),

  ]
}