/**
 * OctoVendo brand tokens — single source of truth for StyleSheet, SVG, QR, and Tailwind.
 * Playful Premium: warm peach welcome surfaces, ivory working canvas, lavender accents,
 * purple primary actions.
 */
export const tokens = {
  color: {
    /** Brand peach — splash, welcome, celebration */
    peach: '#F8DED7',
    /** Warm ivory — form and primary app backgrounds */
    cream: '#FFFAF7',
    /** Soft lavender — mascot surfaces, subtle highlights */
    lavender: '#D8D3ED',
    /** Octo purple — primary buttons, progress, active states */
    purple: '#7969A5',
    /** Deep purple — pressed states, emphasis */
    purpleDark: '#62528F',
    /** Forest ink — select accents and mascot details (secondary, not default CTA) */
    forest: '#29483F',
    /** Near black — primary text */
    ink: '#1D1D1B',
    /** Supporting text (darkened from #706B70 for WCAG AA on peach) */
    muted: '#686368',
    /** Input borders, dividers */
    border: '#E8DEDF',
    white: '#FFFFFF',

    /** Legacy / POS accent names — mapped onto the Playful Premium system */
    pink: '#C97B9A',
    blue: '#5B8FA8',
    blueDark: '#3F6F86',
    yellow: '#E6C35C',
    yellowDark: '#C4A03A',
    gray: '#A39BA0',
    grayLight: '#E8DEDF',

    pink50: '#F8DED7',
    pink100: '#F0D4CC',
    pink200: '#D8D3ED',
    pink300: '#A896C4',
    pink400: '#7969A5',
    pink500: '#6B5B96',
    pink600: '#62528F',

    /** Soft lavender canvas (legacy peach50 name kept for callers) */
    peach50: '#EFEAF6',
    peach100: '#F8DED7',
    peach200: '#F0D4CC',
    peach300: '#D8D3ED',
    peach400: '#A896C4',

    gray50: '#F3EEEE',
    gray100: '#E8DEDF',
    gray200: '#A39BA0',
    gray300: '#8A848A',
    gray400: '#686368',
    gray500: '#4A454A',

    ink100: '#F3EEEE',
    ink200: '#C4BDBF',
    ink300: '#8A848A',
    ink400: '#4A454A',
    ink500: '#1D1D1B',

    success: '#39785B',
    successDark: '#2D6049',
    successSurface: '#E8F2ED',
    successBorder: '#A8CDBA',

    warning: '#E6C35C',
    warningDark: '#C4A03A',
    warningSurface: '#FFF8E8',
    warningBorder: '#F0DFA0',

    danger: '#B54755',
    dangerDark: '#933845',
    dangerSurface: '#F8E8EA',
    dangerBorder: '#E8B8BE',
  },

  radius: {
    /** Compact chips / step controls */
    sm: 8,
    /** Inputs */
    input: 12,
    /** Buttons */
    md: 14,
    /** Cards */
    lg: 20,
    /** Decorative surfaces */
    xl: 24,
    full: 999,
  },

  spacing: {
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    8: 32,
    10: 40,
    12: 48,
  },

  typography: {
    displayHeading: { fontSize: 32, lineHeight: 40 },
    screenHeading: { fontSize: 28, lineHeight: 34 },
    body: { fontSize: 16, lineHeight: 24 },
    label: { fontSize: 13, lineHeight: 18 },
    button: { fontSize: 16, lineHeight: 22 },
    caption: { fontSize: 13, lineHeight: 18 },
  },

  font: {
    /** Elegant serif for major onboarding / celebratory headings */
    display: {
      regular: 'PlayfairDisplay_400Regular',
      medium: 'PlayfairDisplay_500Medium',
      semiBold: 'PlayfairDisplay_600SemiBold',
      italic: 'PlayfairDisplay_400Regular_Italic',
    },
    /** Existing rounded headings for in-app POS chrome */
    heading: {
      medium: 'Fredoka_500Medium',
      semiBold: 'Fredoka_600SemiBold',
      bold: 'Fredoka_700Bold',
    },
    /** Interface sans for labels, body, buttons, navigation */
    body: {
      regular: 'Nunito_400Regular',
      semiBold: 'Nunito_600SemiBold',
      bold: 'Nunito_700Bold',
      extraBold: 'Nunito_800ExtraBold',
    },
  },

  motion: {
    /** Screen entrance */
    screenEnter: 300,
    /** Splash logo entrance */
    splashLogo: 500,
    /** Splash tagline (staggered after logo) */
    splashTagline: 350,
    /** Splash tagline delay after logo starts */
    splashTaglineDelay: 120,
    /** Subtle exit / crossfade */
    screenExit: 280,
    /** Input focus */
    inputFocus: 160,
    /** Button press */
    buttonPress: 120,
    /** Decorative mascot entrance */
    mascotEnter: 400,
    /** Passcode digit feedback */
    digitFeedback: 150,
    /** Success celebration */
    celebration: 750,
    easing: {
      /** Smooth ease-out for entrances */
      out: 'cubic-out',
      /** Standard in-out for focus/press */
      inOut: 'cubic-in-out',
    },
  },

  control: {
    button: {
      radius: 14,
      minHeight: 52,
      pressedOpacity: 0.92,
    },
    input: {
      radius: 12,
      borderWidth: 2,
      minHeight: 52,
    },
  },

  touchTarget: {
    min: 44,
  },

  shadow: {
    color: '#1D1D1B',
    soft: 'rgba(29, 29, 27, 0.06)',
    medium: 'rgba(29, 29, 27, 0.12)',
    overlay: 'rgba(29, 29, 27, 0.42)',
    scrim: 'rgba(29, 29, 27, 0.35)',
  },
} as const;

export type BrandColor = (typeof tokens.color)[keyof typeof tokens.color];

/** Pick ink or white label color for a filled background (accessibility rule). */
export function textOnBackground(bg: string): typeof tokens.color.ink | typeof tokens.color.white {
  const inkOnFill = new Set<string>([
    tokens.color.peach,
    tokens.color.peach200,
    tokens.color.peach100,
    tokens.color.peach50,
    tokens.color.cream,
    tokens.color.lavender,
    tokens.color.pink50,
    tokens.color.pink100,
    tokens.color.pink200,
    tokens.color.gray,
    tokens.color.gray200,
    tokens.color.gray100,
    tokens.color.gray50,
    tokens.color.grayLight,
    tokens.color.white,
    tokens.color.yellow,
    tokens.color.warning,
    tokens.color.warningSurface,
    tokens.color.successSurface,
    tokens.color.dangerSurface,
    tokens.color.blue,
    tokens.color.border,
  ]);
  return inkOnFill.has(bg) ? tokens.color.ink : tokens.color.white;
}
