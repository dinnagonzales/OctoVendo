import { Image, StyleSheet, type ImageStyle, type StyleProp } from 'react-native';

const logos = {
  long: require('@/assets/images/logo-long.png'),
  app: require('@/assets/images/logo-app.png'),
} as const;

export type OctoVendoLogoVariant = keyof typeof logos;

type OctoVendoLogoProps = {
  variant: OctoVendoLogoVariant;
  style?: StyleProp<ImageStyle>;
  accessibilityLabel?: string;
};

export function OctoVendoLogo({
  variant,
  style,
  accessibilityLabel = 'OctoVendo',
}: OctoVendoLogoProps) {
  return (
    <Image
      source={logos[variant]}
      style={[styles[variant], style]}
      resizeMode="contain"
      accessibilityLabel={accessibilityLabel}
    />
  );
}

const styles = StyleSheet.create({
  long: {
    height: 32,
    aspectRatio: 1162 / 385,
  },
  app: {
    width: 72,
    aspectRatio: 1,
  },
});
