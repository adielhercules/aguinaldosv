const purgecss = require('@fullhuman/postcss-purgecss')({
  // Specify the paths to all of the template files in your project
  content: ['./public/**/*.html', './public/**/*.js'],

  // Include any special characters you're using in this regular expression
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
});

module.exports = {
  plugins: [
    require('postcss-import'), // eslint-disable-line
    require('tailwindcss'), // eslint-disable-line
    require('autoprefixer'), // eslint-disable-line
    require('cssnano')({ // eslint-disable-line
      preset: 'default',
    }),
    ...(process.env.NODE_ENV === 'production' ? [purgecss] : []),
  ],
};
