import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';

const purgecss = require('@fullhuman/postcss-purgecss')({
  // Specify the paths to all of the template files in your project
  content: ['./public/**/*.html', './public/**/*.js'],

  // Include any special characters you're using in this regular expression
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
});

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/main.js',
  output: {
    file: 'public/bundle.js',
    format: 'iife', // immediately-invoked function expression — suitable for <script> tags
    sourcemap: !production,
  },
  plugins: [
    resolve(), // tells Rollup how to find date-fns in node_modules
    commonjs(), // converts date-fns to ES modules
    postcss({
      extract: true,
      plugins: [
        require('postcss-import'), // eslint-disable-line
    require('tailwindcss'), // eslint-disable-line
    require('autoprefixer'), // eslint-disable-line
    require('cssnano')({ // eslint-disable-line
          preset: 'default',
        }),
        ...(production ? [purgecss] : []),
      ],
    }),
    production && terser(), // minify, but only in production
  ],
};
