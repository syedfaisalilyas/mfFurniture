import React, { useEffect, useRef } from 'react';
import {
  View, Text, Animated, StyleSheet, Dimensions, Easing,
} from 'react-native';
import { colors } from '../constants/colors';
import { typography } from '../constants/typography';

const { width, height } = Dimensions.get('window');

export default function SplashScreen({ onFinish }) {
  const logoScale = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const bgScale = useRef(new Animated.Value(1)).current;
  const circleScale = useRef(new Animated.Value(0)).current;
  const fadeOut = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      // 1. Circle ripple expands
      Animated.timing(circleScale, {
        toValue: 1,
        duration: 400,
        easing: Easing.out(Easing.back(1.2)),
        useNativeDriver: true,
      }),
      // 2. Logo pops in
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1,
          friction: 5,
          tension: 100,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
      // 3. Brand name fades in
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      // 4. Tagline fades in
      Animated.timing(taglineOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      // 5. Hold
      Animated.delay(700),
      // 6. Whole screen fades out
      Animated.timing(fadeOut, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (onFinish) onFinish();
    });
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeOut }]}>
      {/* Background ripple circle */}
      <Animated.View
        style={[
          styles.ripple,
          {
            transform: [{ scale: circleScale }],
            opacity: circleScale.interpolate({ inputRange: [0, 1], outputRange: [0, 0.15] }),
          },
        ]}
      />

      {/* Logo */}
      <Animated.View
        style={[
          styles.logoBox,
          {
            opacity: logoOpacity,
            transform: [{ scale: logoScale }],
          },
        ]}
      >
        <Text style={styles.logoText}>MF</Text>
      </Animated.View>

      {/* Brand name */}
      <Animated.Text style={[styles.brand, { opacity: textOpacity }]}>
        mfFurniture
      </Animated.Text>

      {/* Tagline */}
      <Animated.Text style={[styles.tagline, { opacity: taglineOpacity }]}>
        Furnish Your Dreams
      </Animated.Text>

      {/* Bottom dots loader */}
      <Animated.View style={[styles.dotsRow, { opacity: taglineOpacity }]}>
        <Dot delay={0} />
        <Dot delay={200} />
        <Dot delay={400} />
      </Animated.View>
    </Animated.View>
  );
}

function Dot({ delay }) {
  const anim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(anim, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.timing(anim, { toValue: 0.3, duration: 400, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View style={[styles.dot, { opacity: anim }]} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ripple: {
    position: 'absolute',
    width: width * 1.5,
    height: width * 1.5,
    borderRadius: width,
    backgroundColor: colors.white,
  },
  logoBox: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 12,
  },
  logoText: {
    color: colors.white,
    fontSize: 34,
    fontWeight: typography.weights.bold,
    letterSpacing: 1,
  },
  brand: {
    color: colors.white,
    fontSize: typography.sizes.xxxl,
    fontWeight: typography.weights.bold,
    letterSpacing: 1,
    marginBottom: 8,
  },
  tagline: {
    color: colors.white + 'AA',
    fontSize: typography.sizes.base,
    letterSpacing: 2,
    marginBottom: 48,
  },
  dotsRow: {
    position: 'absolute',
    bottom: 60,
    flexDirection: 'row',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.white,
    marginHorizontal: 4,
  },
});
