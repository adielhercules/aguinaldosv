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
          right: 30,
          transform: 'scale(0.5)',
          transformOrigin: 'center right',
        },
        '.tree-2': {
          position: 'absolute',
          bottom: 40,
          right: -80,
          transform: 'scale(0.7)',
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
