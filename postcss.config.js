module.exports = {
  plugins: [
    require('postcss-import'), // eslint-disable-line
    require('tailwindcss'), // eslint-disable-line
    require('autoprefixer'), // eslint-disable-line
    require('cssnano')({ // eslint-disable-line
      preset: 'default',
    }),
  ],
};
