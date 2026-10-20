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
/**
 * logo-app.png is square with ~10% peach padding below the wordmark (~22px at
 * 220pt). marginTop 0 yields ~16–24px visual gap from wordmark to tagline.
 */
const TAGLINE_MARGIN_TOP = 0;
/** Slight upward optical centering for the brand cluster. */
const BRAND_OPTICAL_LIFT = -12;

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
  const loadingOpacity = useSharedValue(reduceMotion ? 1 : 0);

  useEffect(() => {
    if (reduceMotion) {
      logoOpacity.value = 1;
      logoTranslateY.value = 0;
      taglineOpacity.value = 1;
      taglineTranslateY.value = 0;
      loadingOpacity.value = 1;
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

    loadingOpacity.value = withDelay(
      SETUP_SPLASH_TAGLINE_DELAY_MS + 40,
      withTiming(1, { duration: motion.screenEnter, easing: easeOut }),
    );
  }, [
    loadingOpacity,
    logoOpacity,
    logoTranslateY,
    reduceMotion,
    taglineOpacity,
    taglineTranslateY,
  ]);

  useEffect(() => {
    if (!ready || !onReady) return;
    // Advance after entrance completes — no artificial startup padding.
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

  const loadingStyle = useAnimatedStyle(() => ({
    opacity: loadingOpacity.value,
  }));

  return (
    <SafeAreaView style={styles.page} edges={['top', 'bottom', 'left', 'right']}>
      <View style={styles.stage}>
        {/*
          Brand cluster is centered in the full stage. Loading is docked to the
          bottom independently so it cannot push the tagline away from the logo.
        */}
        <View style={styles.brandStage} pointerEvents="box-none">
          <View style={styles.brandGroup}>
            <Animated.View style={logoStyle}>
              <OctoVendoLogo variant="app" style={styles.logo} accessibilityLabel="OctoVendo" />
            </Animated.View>
            <Animated.Text style={[styles.tagline, taglineStyle]}>{TAGLINE}</Animated.Text>
          </View>
        </View>

        <Animated.View
          style={[styles.loadingDock, loadingStyle]}
          accessibilityRole="progressbar"
          accessibilityLabel={LOADING_CAPTION}
          accessibilityState={{ busy: !ready }}>
          <ActivityIndicator
            size="small"
            // Soft lavender reads weakly on peach; Octo Purple stays on-brand and visible.
            color={colors.purple}
            accessibilityElementsHidden
            importantForAccessibility="no"
          />
          <Text style={styles.caption}>{LOADING_CAPTION}</Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.peach,
  },
  stage: {
    flex: 1,
  },
  brandStage: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: tokens.spacing[8],
  },
  brandGroup: {
    alignItems: 'center',
    // Shrink-wrap logo + tagline as one unit (not a flex:1 column).
    transform: [{ translateY: BRAND_OPTICAL_LIFT }],
  },
  logo: {
    width: 220,
    maxWidth: '70%',
    aspectRatio: 1,
  },
  tagline: {
    marginTop: TAGLINE_MARGIN_TOP,
    fontFamily: fonts.display.italic,
    fontSize: typeScale.body.fontSize,
    lineHeight: typeScale.body.lineHeight,
    color: colors.ink,
    textAlign: 'center',
    maxWidth: 280,
    paddingHorizontal: tokens.spacing[4],
  },
  loadingDock: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: tokens.spacing[12], // 48px above safe-area bottom; scales with token
    alignItems: 'center',
    justifyContent: 'center',
    gap: tokens.spacing[3],
    paddingHorizontal: tokens.spacing[6],
  },
  caption: {
    fontFamily: fonts.body.semiBold,
    fontSize: typeScale.caption.fontSize,
    lineHeight: typeScale.caption.lineHeight,
    color: colors.inkSoft,
    textAlign: 'center',
  },
});
