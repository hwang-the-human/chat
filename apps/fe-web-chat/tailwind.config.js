const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const withMT = require('@material-tailwind/react/utils/withMT');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    'node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}',
    'node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}',
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        primary: '#111b21',
        secondary: '#202c34',
        tertiary: '#2b3943',

        // #111b21 rgba(17,27,33,255) main
        // #202c34 rgba(32,44,52,255) sub
        // #2b3943 rgba(43,57,67,255) select
      },
    },
  },
  plugins: [],
};
