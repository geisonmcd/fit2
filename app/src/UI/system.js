function addAlpha(color, opacity) {
  const alpha = Math.floor(opacity * 255).toString(16);
  return `${color}${alpha}`.toUpperCase();
  // s = Math.floor(opacity * 255).toString(16); // str, e.g. s = "4c"
  // finally, if y < 16 this will only be one digit, so you may need to pad an extra 0
  // ret = y < 16 ? '0' + s : s;
}

// Fonts sizes are in points.
// * Use SF Pro Text for sizes below 20pt.
// * Use SF Pro Display for sizes 20pt or greater.
// * lg is the default size.
const typography = {
  largeTitle: {
    xs: { fontSize: 31, fontWeight: 'regular', fontFamily: 'System' },
    sm: { fontSize: 32, fontWeight: 'regular', fontFamily: 'System' },
    md: { fontSize: 33, fontWeight: 'regular', fontFamily: 'System' },
    lg: { fontSize: 34, fontWeight: 'regular', fontFamily: 'System' },
    xl: { fontSize: 36, fontWeight: 'regular', fontFamily: 'System' },
    xxl: { fontSize: 38, fontWeight: 'regular', fontFamily: 'System' },
    xxxl: { fontSize: 40, fontWeight: 'regular', fontFamily: 'System' }
  },
  title1: {
    xs: { fontSize: 25, fontWeight: 'regular', fontFamily: 'System' },
    sm: { fontSize: 26, fontWeight: 'regular', fontFamily: 'System' },
    md: { fontSize: 27, fontWeight: 'regular', fontFamily: 'System' },
    lg: { fontSize: 28, fontWeight: 'regular', fontFamily: 'System' },
    xl: { fontSize: 30, fontWeight: 'regular', fontFamily: 'System' },
    xxl: { fontSize: 32, fontWeight: 'regular', fontFamily: 'System' },
    xxxl: { fontSize: 34, fontWeight: 'regular', fontFamily: 'System' }
  },
  title2: {
    xs: { fontSize: 19, fontWeight: 'regular', fontFamily: 'System' },
    sm: { fontSize: 20, fontWeight: 'regular', fontFamily: 'System' },
    md: { fontSize: 21, fontWeight: 'regular', fontFamily: 'System' },
    lg: { fontSize: 22, fontWeight: 'regular', fontFamily: 'System' },
    xl: { fontSize: 24, fontWeight: 'regular', fontFamily: 'System' },
    xxl: { fontSize: 26, fontWeight: 'regular', fontFamily: 'System' },
    xxxl: { fontSize: 28, fontWeight: 'regular', fontFamily: 'System' }
  },
  title3: {
    xs: { fontSize: 17, fontWeight: 'regular', fontFamily: 'System' },
    sm: { fontSize: 18, fontWeight: 'regular', fontFamily: 'System' },
    md: { fontSize: 19, fontWeight: 'regular', fontFamily: 'System' },
    lg: { fontSize: 20, fontWeight: 'regular', fontFamily: 'System' },
    xl: { fontSize: 22, fontWeight: 'regular', fontFamily: 'System' },
    xxl: { fontSize: 24, fontWeight: 'regular', fontFamily: 'System' },
    xxxl: { fontSize: 26, fontWeight: 'regular', fontFamily: 'System' }
  },
  headline: {
    xs: { fontSize: 14, fontWeight: 'semi-bold', fontFamily: 'System' },
    sm: { fontSize: 15, fontWeight: 'semi-bold', fontFamily: 'System' },
    md: { fontSize: 16, fontWeight: 'semi-bold', fontFamily: 'System' },
    lg: { fontSize: 17, fontWeight: 'semi-bold', fontFamily: 'System' },
    xl: { fontSize: 19, fontWeight: 'semi-bold', fontFamily: 'System' },
    xxl: { fontSize: 21, fontWeight: 'semi-bold', fontFamily: 'System' },
    xxxl: { fontSize: 23, fontWeight: 'semi-bold', fontFamily: 'System' }
  },
  body: {
    xs: { fontSize: 14, fontWeight: 'regular', fontFamily: 'System' },
    sm: { fontSize: 15, fontWeight: 'regular', fontFamily: 'System' },
    md: { fontSize: 16, fontWeight: 'regular', fontFamily: 'System' },
    lg: { fontSize: 17, fontWeight: 'regular', fontFamily: 'System' },
    xl: { fontSize: 19, fontWeight: 'regular', fontFamily: 'System' },
    xxl: { fontSize: 21, fontWeight: 'regular', fontFamily: 'System' },
    xxxl: { fontSize: 23, fontWeight: 'regular', fontFamily: 'System' }
  },
  callout: {
    xs: { fontSize: 13, fontWeight: 'regular', fontFamily: 'System' },
    sm: { fontSize: 14, fontWeight: 'regular', fontFamily: 'System' },
    md: { fontSize: 15, fontWeight: 'regular', fontFamily: 'System' },
    lg: { fontSize: 16, fontWeight: 'regular', fontFamily: 'System' },
    xl: { fontSize: 18, fontWeight: 'regular', fontFamily: 'System' },
    xxl: { fontSize: 20, fontWeight: 'regular', fontFamily: 'System' },
    xxxl: { fontSize: 22, fontWeight: 'regular', fontFamily: 'System' }
  },
  subhead: {
    xs: { fontSize: 12, fontWeight: 'regular', fontFamily: 'System' },
    sm: { fontSize: 13, fontWeight: 'regular', fontFamily: 'System' },
    md: { fontSize: 14, fontWeight: 'regular', fontFamily: 'System' },
    lg: { fontSize: 15, fontWeight: 'regular', fontFamily: 'System' },
    xl: { fontSize: 17, fontWeight: 'regular', fontFamily: 'System' },
    xxl: { fontSize: 19, fontWeight: 'regular', fontFamily: 'System' },
    xxxl: { fontSize: 21, fontWeight: 'regular', fontFamily: 'System' }
  },
  footnote: {
    xs: { fontSize: 12, fontWeight: 'regular', fontFamily: 'System' },
    sm: { fontSize: 12, fontWeight: 'regular', fontFamily: 'System' },
    md: { fontSize: 12, fontWeight: 'regular', fontFamily: 'System' },
    lg: { fontSize: 13, fontWeight: 'regular', fontFamily: 'System' },
    xl: { fontSize: 15, fontWeight: 'regular', fontFamily: 'System' },
    xxl: { fontSize: 17, fontWeight: 'regular', fontFamily: 'System' },
    xxxl: { fontSize: 19, fontWeight: 'regular', fontFamily: 'System' }
  },
  caption1: {
    xs: { fontSize: 11, fontWeight: 'regular', fontFamily: 'System' },
    sm: { fontSize: 11, fontWeight: 'regular', fontFamily: 'System' },
    md: { fontSize: 11, fontWeight: 'regular', fontFamily: 'System' },
    lg: { fontSize: 12, fontWeight: 'regular', fontFamily: 'System' },
    xl: { fontSize: 14, fontWeight: 'regular', fontFamily: 'System' },
    xxl: { fontSize: 16, fontWeight: 'regular', fontFamily: 'System' },
    xxxl: { fontSize: 18, fontWeight: 'regular', fontFamily: 'System' }
  },
  caption2: {
    xs: { fontSize: 11, fontWeight: 'regular', fontFamily: 'System' },
    sm: { fontSize: 11, fontWeight: 'regular', fontFamily: 'System' },
    md: { fontSize: 11, fontWeight: 'regular', fontFamily: 'System' },
    lg: { fontSize: 11, fontWeight: 'regular', fontFamily: 'System' },
    xl: { fontSize: 13, fontWeight: 'regular', fontFamily: 'System' },
    xxl: { fontSize: 15, fontWeight: 'regular', fontFamily: 'System' },
    xxxl: { fontSize: 17, fontWeight: 'regular', fontFamily: 'System' }
  }
};

// Background
const elevatedBackground = {
  primary: '#1C1C1E',
  secondary: '#2C2C2E',
  tertiary: '#3A3A3C'
};

// Grouped Background
const elevatedGroupedBackground = {
  primary: '#1C1C1E',
  secondary: '#2C2C2E',
  tertiary: '#3A3A3C'
};

export const light = {
  colors: {
    red: '#FF3B30',
    orange: '#FF9500',
    yellow: '#FFCC00',
    green: '#34C759',
    teal: '#5AC8FA',
    blue: '#007AFF',
    indigo: '#5856D6',
    purple: '#AF52DE',
    pink: '#FF2D55',
    grey1: '#8E8E93',
    grey2: '#AEAEB2',
    grey3: '#C7C7CC',
    grey4: '#D1D1D6',
    grey5: '#E5E5EA',
    grey6: '#F2F2F7'
  },
  background: {
    primary: '#FFFFFF',
    secondary: '#EFEFF4',
    tertiary: '#FFFFFF'
  },
  groupedBackground: {
    primary: '#EFEFF4',
    secondary: '#FFFFFF',
    tertiary: '#EFEFF4'
  },
  label: {
    primary: '#000000',
    secondary: addAlpha('#3C3C43', 0.60),
    tertiary: addAlpha('#3C3C43', 0.30),
    quarternary: addAlpha('#3C3C43', 0.18)
  },
  separator: {
    opaque: '#C6C6C8',
    nonOpaque: addAlpha('#3C3C43', 0.29)
  },
  fillColors: {
    primary: addAlpha('#787880', 0.20),
    secondary: addAlpha('#787880', 0.16),
    tertiary: addAlpha('#767680', 0.12),
    quarternary: addAlpha('#747480', 0.8)
  },
  elevatedBackground,
  elevatedGroupedBackground,
  typography
};

export const dark = {
  colors: {
    red: '#FF453A',
    orange: '#FF9F0A',
    yellow: '#FFD60A',
    green: '#32D74B',
    teal: '#64D2FF',
    blue: '#0A84FF',
    indigo: '#5E5CE6',
    purple: '#BF5AF2',
    pink: '#FF375F',
    grey1: '#8E8E93',
    grey2: '#636366',
    grey3: '#48484A',
    grey4: '#3A3A3C',
    grey5: '#2C2C2E',
    grey6: '#1C1C1E'
  },
  background: {
    primary: '#000000', //#0D0D0D
    secondary: '#1C1C1E',
    tertiary: '#2C2C2E'
  },
  groupedBackground: {
    primary: '#000000',
    secondary: '#1C1C1E',
    tertiary: '#2C2C2E'
  },
  label: {
    primary: '#FFFFFF',
    secondary: addAlpha('#EBEBF5', 0.60),
    tertiary: addAlpha('#EBEBF5', 0.30),
    quarternary: addAlpha('#EBEBF5', 0.18)
  },
  separator: {
    opaque: '#38383A',
    nonOpaque: addAlpha('#545458', 0.65)
  },
  fillColors: {
    primary: addAlpha('#787880', 0.36),
    secondary: addAlpha('#787880', 0.32),
    tertiary: addAlpha('#767680', 0.24),
    quarternary: addAlpha('#747480', 0.18)
  },
  elevatedBackground,
  elevatedGroupedBackground,
  typography
};
