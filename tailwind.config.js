module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'home-title': 'rgb(136, 136, 136)',
        'note-title': 'rgb(0, 153, 255)',
        'note-label': 'rgb(39, 175, 182)',
      },
      fontSize: {
        small: '12px',
        medium: '14px',
        'medium-x': '16px',
        large: '18px',
      },
      borderRadius: {
        small: '2px',
        medium: '4px',
        large: '8px'
      },
      lineHeight: {
        12: '12px',
        18: '18px',
        20: '20px',
        22: '22px',
        24: '24px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
