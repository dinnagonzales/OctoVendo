import { colors } from '@/constants/theme';
import { tokens } from '@/theme/tokens';

/** colors.* keys used by settings.tsx and past/[id].tsx (re-export banner included). */
const REFERENCED_BY_SETTINGS_AND_PAST = [
  'ink',
  'inkSoft',
  'white',
  'grayLight',
  'purple',
  'purpleDark',
  'redDark',
  'borderDanger',
  'borderSubtle',
  'warningSurface',
  'warningBorder',
] as const;

test('warningBorder is defined in the warning color family', () => {
  expect(colors.warningBorder).toBe(tokens.color.warningBorder);
  expect(colors.warningBorder).toMatch(/^#/);
  expect(colors.warningSurface).toBe(tokens.color.warningSurface);
});

test('every colors token referenced by settings and past event screens exists', () => {
  for (const key of REFERENCED_BY_SETTINGS_AND_PAST) {
    expect(key in colors).toBe(true);
    expect(colors[key]).toMatch(/^#/);
  }
});

test('Playful Premium brand palette is centralized', () => {
  expect(tokens.color.peach).toBe('#F8DED7');
  expect(tokens.color.cream).toBe('#FFFAF7');
  expect(tokens.color.lavender).toBe('#D8D3ED');
  expect(tokens.color.purple).toBe('#7969A5');
  expect(tokens.color.purpleDark).toBe('#62528F');
  expect(tokens.color.forest).toBe('#29483F');
  expect(tokens.color.ink).toBe('#1D1D1B');
  expect(tokens.color.border).toBe('#E8DEDF');
  expect(tokens.color.danger).toBe('#B54755');
  expect(tokens.color.success).toBe('#39785B');
});

test('semantic surfaces separate welcome peach from working ivory', () => {
  expect(colors.background).toBe(tokens.color.peach);
  expect(colors.screen).toBe(tokens.color.cream);
  expect(colors.purple).toBe(tokens.color.purple);
});

test('motion and type tokens cover splash and future onboarding language', () => {
  expect(tokens.motion.splashLogo).toBe(500);
  expect(tokens.motion.splashTagline).toBe(350);
  expect(tokens.motion.screenEnter).toBeGreaterThanOrEqual(250);
  expect(tokens.motion.screenEnter).toBeLessThanOrEqual(350);
  expect(tokens.typography.displayHeading.fontSize).toBeGreaterThanOrEqual(30);
  expect(tokens.font.display.italic).toBe('PlayfairDisplay_400Regular_Italic');
  expect(tokens.radius.input).toBe(12);
  expect(tokens.radius.md).toBe(14);
  expect(tokens.radius.xl).toBe(24);
});
