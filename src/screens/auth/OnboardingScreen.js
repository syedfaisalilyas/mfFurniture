import React, { useState, useRef } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet,
  Dimensions, Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';

const { width, height } = Dimensions.get('window');

const SLIDES = [
  {
    id: '1',
    icon: 'home',
    title: 'Furnish Your Dream Home',
    subtitle: 'Discover thousands of premium furniture pieces for every room in your home.',
    bg: colors.primary,
  },
  {
    id: '2',
    icon: 'cart',
    title: 'Easy Shopping Experience',
    subtitle: 'Browse by category, search, filter and add to cart with just a tap.',
    bg: '#1a252f',
  },
  {
    id: '3',
    icon: 'shield-checkmark',
    title: 'Track Every Order',
    subtitle: 'Real-time order tracking from confirmation to delivery at your doorstep.',
    bg: colors.accent,
  },
];

export default function OnboardingScreen({ navigation }) {
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);

  const finish = async () => {
    await AsyncStorage.setItem('@mf_onboarded', 'true');
    navigation.replace('Login');
  };

  const next = () => {
    if (current < SLIDES.length - 1) {
      ref.current?.scrollToIndex({ index: current + 1, animated: true });
      setCurrent(current + 1);
    } else {
      finish();
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={ref}
        data={SLIDES}
        keyExtractor={(s) => s.id}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={[styles.slide, { backgroundColor: item.bg }]}>
            <View style={styles.iconCircle}>
              <Ionicons name={item.icon} size={80} color={colors.white} />
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
          </View>
        )}
      />

      {/* Dots */}
      <View style={styles.dotsRow}>
        {SLIDES.map((_, i) => (
          <View key={i} style={[styles.dot, i === current && styles.dotActive]} />
        ))}
      </View>

      {/* Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={finish}>
          <Text style={styles.skip}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextBtn} onPress={next}>
          <Text style={styles.nextText}>
            {current === SLIDES.length - 1 ? "Get Started" : "Next"}
          </Text>
          <Ionicons name="arrow-forward" size={18} color={colors.white} style={{ marginLeft: 6 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.primary },
  slide: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  iconCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    color: colors.white,
    fontSize: typography.sizes.xxxl,
    fontWeight: typography.weights.bold,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  subtitle: {
    color: colors.white + 'CC',
    fontSize: typography.sizes.base,
    textAlign: 'center',
    lineHeight: 26,
  },
  dotsRow: {
    position: 'absolute',
    bottom: 120,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.white + '44',
    marginHorizontal: 4,
  },
  dotActive: { backgroundColor: colors.white, width: 24 },
  footer: {
    position: 'absolute',
    bottom: 50,
    left: spacing.xl,
    right: spacing.xl,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skip: { color: colors.white + '99', fontSize: typography.sizes.base },
  nextBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: spacing.lg,
    paddingVertical: 12,
    borderRadius: 30,
  },
  nextText: { color: colors.white, fontSize: typography.sizes.base, fontWeight: typography.weights.semiBold },
});
