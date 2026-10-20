import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { OctoVendoLogo } from '@/components/OctoVendoLogo';
import {
  SETUP_CROSSFADE_MS,
  SETUP_SPLASH_LOGO_MS,
  SETUP_SPLASH_TAGLINE_DELAY_MS,
  SETUP_SPLASH_TAGLINE_MS,
} from '@/components/onboarding/setup-motion';
import { colors } from '@/constants/theme';
import { fonts, motion, typeScale } from '@/constants/visual';
import { tokens } from '@/theme/tokens';

const TAGLINE = 'Simple tools for bigger days.';
const LOADING_CAPTION = 'Getting things ready…';
const LOGO_OFFSET_Y = 12;

type SetupSplashProps = {
  /**
   * Real initialization progress from the parent.
   * Values below 1 keep an indeterminate indicator; 1 means ready to advance.
   * Do not fabricate intermediate percentages.
   */
  progress: number;
  reduceMotion?: boolean;
  onReady?: () => void;
};

export function SetupSplash({ progress, reduceMotion = false, onReady }: SetupSplashProps) {
  const ready = progress >= 1;
  const logoOpacity = useSharedValue(reduceMotion ? 1 : 0);
  const logoTranslateY = useSharedValue(reduceMotion ? 0 : LOGO_OFFSET_Y);
  const taglineOpacity = useSharedValue(reduceMotion ? 1 : 0);
  const taglineTranslateY = useSharedValue(reduceMotion ? 0 : LOGO_OFFSET_Y);
  const footerOpacity = useSharedValue(reduceMotion ? 1 : 0);

  useEffect(() => {
    if (reduceMotion) {
      logoOpacity.value = 1;
      logoTranslateY.value = 0;
      taglineOpacity.value = 1;
      taglineTranslateY.value = 0;
      footerOpacity.value = 1;
      return;
    }

    const easeOut = Easing.out(Easing.cubic);

    logoOpacity.value = withTiming(1, {
      duration: SETUP_SPLASH_LOGO_MS,
      easing: easeOut,
    });
    logoTranslateY.value = withTiming(0, {
      duration: SETUP_SPLASH_LOGO_MS,
      easing: easeOut,
    });

    taglineOpacity.value = withDelay(
      SETUP_SPLASH_TAGLINE_DELAY_MS,
      withTiming(1, { duration: SETUP_SPLASH_TAGLINE_MS, easing: easeOut }),
    );
    taglineTranslateY.value = withDelay(
      SETUP_SPLASH_TAGLINE_DELAY_MS,
      withTiming(0, { duration: SETUP_SPLASH_TAGLINE_MS, easing: easeOut }),
    );

    footerOpacity.value = withDelay(
      SETUP_SPLASH_TAGLINE_DELAY_MS + 40,
      withTiming(1, { duration: motion.screenEnter, easing: easeOut }),
    );
  }, [
    footerOpacity,
    logoOpacity,
    logoTranslateY,
    reduceMotion,
    taglineOpacity,
    taglineTranslateY,
  ]);

  useEffect(() => {
    if (!ready || !onReady) return;
    // Wait for the logo entrance to finish before exiting. Fast init used to
    // advance in ~180ms and skip straight to Profile (still the old layout).
    const holdMs = reduceMotion
      ? 0
      : SETUP_SPLASH_TAGLINE_DELAY_MS + SETUP_SPLASH_TAGLINE_MS + Math.min(120, SETUP_CROSSFADE_MS);
    const timer = setTimeout(onReady, holdMs);
    return () => clearTimeout(timer);
  }, [ready, onReady, reduceMotion]);

  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ translateY: logoTranslateY.value }],
  }));

  const taglineStyle = useAnimatedStyle(() => ({
    opacity: taglineOpacity.value,
    transform: [{ translateY: taglineTranslateY.value }],
  }));

  const footerStyle = useAnimatedStyle(() => ({
    opacity: footerOpacity.value,
  }));

  return (
    <SafeAreaView style={styles.page} edges={['top', 'bottom', 'left', 'right']}>
      <View style={styles.center}>
        <Animated.View style={[styles.logoBlock, logoStyle]}>
          <OctoVendoLogo variant="app" style={styles.logo} accessibilityLabel="OctoVendo" />
        </Animated.View>

        <Animated.Text style={[styles.tagline, taglineStyle]}>{TAGLINE}</Animated.Text>
      </View>

      <Animated.View
        style={[styles.footer, footerStyle]}
        accessibilityRole="progressbar"
        accessibilityLabel={LOADING_CAPTION}
        accessibilityState={{ busy: !ready }}>
        <ActivityIndicator
          size="small"
          color={colors.purple}
          accessibilityElementsHidden
          importantForAccessibility="no"
        />
        <Text style={styles.caption}>{LOADING_CAPTION}</Text>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.peach,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: tokens.spacing[8],
    gap: tokens.spacing[6],
  },
  logoBlock: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    maxWidth: '72%',
    aspectRatio: 1,
  },
  tagline: {
    fontFamily: fonts.display.italic,
    fontSize: typeScale.body.fontSize,
    lineHeight: typeScale.body.lineHeight,
    color: colors.ink,
    textAlign: 'center',
    maxWidth: 280,
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: tokens.spacing[3],
    paddingHorizontal: tokens.spacing[6],
    paddingBottom: tokens.spacing[4],
    minHeight: tokens.touchTarget.min + tokens.spacing[6],
  },
  caption: {
    fontFamily: fonts.body.semiBold,
    fontSize: typeScale.caption.fontSize,
    lineHeight: typeScale.caption.lineHeight,
    color: colors.inkSoft,
    textAlign: 'center',
  },
});
