// ----------------------------------------------------------------------

function pxToRem(value) {
  return `${value / 16}rem`;
}

function responsiveFontSizes({ xs, sm, md, lg }) {
  return {
    '@media (min-width:0px)': {
      fontSize: pxToRem(xs),
    },
    '@media (min-width:600px)': {
      fontSize: pxToRem(sm),
    },
    '@media (min-width:900px)': {
      fontSize: pxToRem(md),
    },
    '@media (min-width:1200px)': {
      fontSize: pxToRem(lg),
    },
  };
}

const FONT_PRIMARY = 'Sora, sans-serif';

const FONT_SORA = 'Sora, sans-serif';

const typography = {
  fontFamily: FONT_PRIMARY,
  fontWeightRegular: 400,
  fontWeightMedium: 600,
  fontWeightBold: 700,
  h1: {
    fontWeight: 700,
    lineHeight: 80 / 64,
    fontSize: pxToRem(40),
    ...responsiveFontSizes({ xs: 35, sm: 52, md: 58, lg: 64 }),
  },
  h2: {
    fontWeight: 700,
    lineHeight: 64 / 48,
    fontSize: pxToRem(32),
    ...responsiveFontSizes({ xs: 28, sm: 40, md: 44, lg: 48 }),
  },
  h3: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(24),
    ...responsiveFontSizes({ xs: 22, sm: 26, md: 30, lg: 32 }),
  },
  h4: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(20),
    ...responsiveFontSizes({ x: 19, sm: 20, md: 24, lg: 24 }),
  },
  h5: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(18),
    ...responsiveFontSizes({ xs: 17, sm: 19, md: 20, lg: 20 }),
  },
  h6: {
    fontWeight: 700,
    lineHeight: 28 / 18,
    fontSize: pxToRem(17),
    ...responsiveFontSizes({ xs: 15, sm: 18, md: 18, lg: 18 }),
  },
  subtitle1: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(16),
    ...responsiveFontSizes({ xs: 13, sm: 16, md: 16, lg: 16 }),
  },
  subtitle2: {
    fontWeight: 600,
    lineHeight: 22 / 14,
    fontSize: pxToRem(14),
    ...responsiveFontSizes({ xs: 12, sm: 14, md: 14, lg: 14 }),
  },
  body1: {
    lineHeight: 1.5,
    fontSize: pxToRem(16),
    ...responsiveFontSizes({ xs: 13, sm: 16, md: 16, lg: 16 }),
  },
  body2: {
    lineHeight: 22 / 14,
    fontSize: pxToRem(14),
    ...responsiveFontSizes({ xs: 12, sm: 14, md: 14, lg: 14 }),
  },
  caption: {
    lineHeight: 1.5,
    fontSize: pxToRem(12),
    ...responsiveFontSizes({ xs: 10, sm: 12, md: 12, lg: 12 }),
  },
  overline: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(12),
    letterSpacing: 1.1,
    textTransform: 'uppercase',
  },
  button: {
    fontWeight: 700,
    lineHeight: 24 / 14,
    fontSize: pxToRem(14),
    ...responsiveFontSizes({ xs: 11, sm: 14, md: 14, lg: 14 }),
    // textTransform: 'capitalize',
  },
  headMain: {
    fontFamily: FONT_SORA,
    fontWeight: 600,
    fontSize: pxToRem(20),
    lineHeight: 1.5,
    ...responsiveFontSizes({ xs: 16, sm: 18, md: 18, lg: 20, xl: 22 }),
  },
  headBreadCrumps: {
    fontFamily: FONT_SORA,
    fontWeight: 600,
    fontSize: pxToRem(16),
    lineHeight: 1.5,
    ...responsiveFontSizes({ xs: 14, sm: 16, md: 16, lg: 16, xl: 18 }),
  },
};

export default typography;
