import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../../context/CartContext';
import { resolveImageSource } from '../../data/imageMapping';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';

export default function ProductCard({ product, onPress }) {
  const { addToCart } = useCart();
  const imgSrc = product.images?.[0]
    ? resolveImageSource(product.images[0])
    : { uri: 'https://via.placeholder.com/200' };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <Image
        source={imgSrc}
        style={styles.image}
      />
      {product.discountedPrice && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {Math.round(((product.price - product.discountedPrice) / product.price) * 100)}% OFF
          </Text>
        </View>
      )}
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
        <View style={styles.ratingRow}>
          <Ionicons name="star" size={12} color={colors.warning} />
          <Text style={styles.rating}>{product.rating.toFixed(1)}</Text>
        </View>
        <View style={styles.priceRow}>
          <View>
            <Text style={styles.price}>
              ${(product.discountedPrice || product.price).toFixed(2)}
            </Text>
            {product.discountedPrice && (
              <Text style={styles.originalPrice}>${product.price.toFixed(2)}</Text>
            )}
          </View>
          <TouchableOpacity
            style={styles.cartBtn}
            onPress={() => addToCart(product)}
          >
            <Ionicons name="cart-outline" size={18} color={colors.white} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    flex: 1,
    margin: spacing.xs,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 150,
    backgroundColor: colors.background,
  },
  badge: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    backgroundColor: colors.error,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: {
    color: colors.white,
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
  },
  info: { padding: spacing.sm },
  name: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  rating: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    marginLeft: 2,
  },
  priceRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  price: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold,
    color: colors.accent,
  },
  originalPrice: {
    fontSize: typography.sizes.xs,
    color: colors.textLight,
    textDecorationLine: 'line-through',
  },
  cartBtn: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 8,
  },
});
