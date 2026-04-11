import React, { useRef, useEffect, useState } from 'react';
import { View, FlatList, Image, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';

const { width } = Dimensions.get('window');
const BANNER_WIDTH = width - spacing.lg * 2;

export default function BannerCarousel({ banners, onPress }) {
  const ref = useRef(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!banners || banners.length < 2) return;
    const timer = setInterval(() => {
      setCurrent((prev) => {
        const next = (prev + 1) % banners.length;
        ref.current?.scrollToIndex({ index: next, animated: true });
        return next;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, [banners]);

  if (!banners || banners.length === 0) return null;

  return (
    <View style={styles.container}>
      <FlatList
        ref={ref}
        data={banners}
        keyExtractor={(b) => b.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled
        onMomentumScrollEnd={(e) => {
          const idx = Math.round(e.nativeEvent.contentOffset.x / BANNER_WIDTH);
          setCurrent(idx);
        }}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onPress && onPress(item)} activeOpacity={0.9}>
            <Image source={{ uri: item.imageUrl }} style={styles.banner} />
            <View style={styles.overlay}>
              <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
        getItemLayout={(_, idx) => ({ length: BANNER_WIDTH, offset: BANNER_WIDTH * idx, index: idx })}
      />
      <View style={styles.dots}>
        {banners.map((_, i) => (
          <View key={i} style={[styles.dot, i === current && styles.dotActive]} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginHorizontal: spacing.lg, marginBottom: spacing.md },
  banner: {
    width: BANNER_WIDTH,
    height: 180,
    borderRadius: 14,
    backgroundColor: colors.background,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    padding: spacing.sm,
  },
  title: {
    color: colors.white,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semiBold,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.sm,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.border,
    marginHorizontal: 3,
  },
  dotActive: { backgroundColor: colors.accent, width: 16 },
});
