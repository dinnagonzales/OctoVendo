import {
  Easing,
  FadeIn,
  FadeOut,
  ReduceMotion,
  SlideInLeft,
  SlideInRight,
  SlideOutLeft,
  SlideOutRight,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { tokens } from '@/theme/tokens';

export const SETUP_FORWARD_MS = tokens.motion.screenEnter;
export const SETUP_CROSSFADE_MS = tokens.motion.screenExit;
export const SETUP_SHAKE_MS = 300;
export const SETUP_PRESS_MS = tokens.motion.buttonPress;
export const SETUP_CHECK_MS = tokens.motion.mascotEnter;
export const SETUP_SPLASH_LOGO_MS = tokens.motion.splashLogo;
export const SETUP_SPLASH_TAGLINE_MS = tokens.motion.splashTagline;
export const SETUP_SPLASH_TAGLINE_DELAY_MS = tokens.motion.splashTaglineDelay;
export const SETUP_DIGIT_MS = tokens.motion.digitFeedback;
export const SETUP_CELEBRATION_MS = tokens.motion.celebration;
export const SETUP_INPUT_FOCUS_MS = tokens.motion.inputFocus;

export const setupEaseOut = Easing.out(Easing.cubic);
export const setupEaseInOut = Easing.inOut(Easing.cubic);

export function setupForwardEntering(reduceMotion: boolean) {
  if (reduceMotion) {
    return FadeIn.duration(SETUP_CROSSFADE_MS).reduceMotion(ReduceMotion.Never);
  }
  return SlideInRight.duration(SETUP_FORWARD_MS).easing(setupEaseOut);
}

export function setupForwardExiting(reduceMotion: boolean) {
  if (reduceMotion) {
    return FadeOut.duration(SETUP_CROSSFADE_MS).reduceMotion(ReduceMotion.Never);
  }
  return SlideOutLeft.duration(SETUP_FORWARD_MS).easing(setupEaseOut);
}

export function setupBackEntering(reduceMotion: boolean) {
  if (reduceMotion) {
    return FadeIn.duration(SETUP_CROSSFADE_MS).reduceMotion(ReduceMotion.Never);
  }
  return SlideInLeft.duration(SETUP_FORWARD_MS).easing(setupEaseOut);
}

export function setupBackExiting(reduceMotion: boolean) {
  if (reduceMotion) {
    return FadeOut.duration(SETUP_CROSSFADE_MS).reduceMotion(ReduceMotion.Never);
  }
  return SlideOutRight.duration(SETUP_FORWARD_MS).easing(setupEaseOut);
}

export function setupCrossFadeEntering(reduceMotion: boolean) {
  return FadeIn.duration(SETUP_CROSSFADE_MS).reduceMotion(
    reduceMotion ? ReduceMotion.Never : ReduceMotion.System,
  );
}

export function setupCrossFadeExiting(reduceMotion: boolean) {
  return FadeOut.duration(SETUP_CROSSFADE_MS).reduceMotion(
    reduceMotion ? ReduceMotion.Never : ReduceMotion.System,
  );
}

/** Horizontal shake: ~4px, 2 cycles, 300ms total. */
export function shakeTranslateX(reduceMotion: boolean) {
  'worklet';
  if (reduceMotion) {
    return withTiming(0, { duration: 0 });
  }
  const step = SETUP_SHAKE_MS / 8;
  return withSequence(
    withTiming(4, { duration: step, easing: setupEaseOut }),
    withTiming(-4, { duration: step, easing: setupEaseOut }),
    withTiming(4, { duration: step, easing: setupEaseOut }),
    withTiming(-4, { duration: step, easing: setupEaseOut }),
    withTiming(4, { duration: step, easing: setupEaseOut }),
    withTiming(-4, { duration: step, easing: setupEaseOut }),
    withTiming(4, { duration: step, easing: setupEaseOut }),
    withTiming(0, { duration: step, easing: setupEaseOut }),
  );
}

export function digitPopScale(reduceMotion: boolean) {
  'worklet';
  if (reduceMotion) {
    return withTiming(1, { duration: 0 });
  }
  return withSequence(
    withTiming(1.1, { duration: SETUP_DIGIT_MS / 2, easing: setupEaseOut }),
    withSpring(1, { damping: 12, stiffness: 220 }),
  );
}

export function checkmarkScale(reduceMotion: boolean) {
  'worklet';
  if (reduceMotion) {
    return withTiming(1, { duration: SETUP_CROSSFADE_MS });
  }
  return withSpring(1, { damping: 10, stiffness: 180, mass: 0.7, overshootClamping: false });
}
