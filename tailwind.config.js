module.exports = {
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        xmas: '#2A583D',
      },
    },
  },
  variants: {},
  plugins: [
    function extendTreeClasses({ addUtilities }) {
      const newUtilities = {
        '.tree-1': {
          position: 'absolute',
          bottom: 200,
          right: 5,
          transform: 'scale(0.5)',
          transformOrigin: 'center right',
        },
        '.tree-2': {
          position: 'absolute',
          bottom: 75,
          right: 0,
          transform: 'scale(0.5)',
          transformOrigin: 'bottom right',
        },
        '.tree-3': {
          position: 'absolute',
          bottom: 0,
          left: -70,
          transform: 'scale(0.6)',
          transformOrigin: 'bottom left',
        },
        '.min-982': {
          minWidth: 982,
        },
      };

      addUtilities(newUtilities);
    },
  ],
};
