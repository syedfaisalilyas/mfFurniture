import React from 'react';
import {View, Text, FlatList, TouchableOpacity, Image, StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useWishlist } from '../../../context/WishlistContext';
import { useCart } from '../../../context/CartContext';
import AppEmptyState from '../../../components/common/AppEmptyState';
import { colors } from '../../../constants/colors';
import { spacing } from '../../../constants/spacing';
import { typography } from '../../../constants/typography';

export default function WishlistScreen({ navigation }) {
  const { items, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>Wishlist</Text>
        {items.length > 0 && (
          <Text style={styles.count}>{items.length} items</Text>
        )}
      </View>

      {items.length === 0 ? (
        <AppEmptyState
          icon="heart-outline"
          title="Your wishlist is empty"
          subtitle="Save products you love by tapping the heart icon"
          actionLabel="Browse Products"
          onAction={() => navigation.navigate('HomeTab')}
        />
      ) : (
        <FlatList
          data={items}
          keyExtractor={(p) => p.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('HomeTab', {
                screen: 'ProductDetail',
                params: { productId: item.id },
              })}
              activeOpacity={0.9}
            >
              <Image
                source={{ uri: item.images[0] || 'https://via.placeholder.com/100' }}
                style={styles.image}
              />
              <View style={styles.info}>
                <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
                <Text style={styles.price}>
                  ${(item.discountedPrice || item.price).toFixed(2)}
                </Text>
                {item.discountedPrice && (
                  <Text style={styles.original}>${item.price.toFixed(2)}</Text>
                )}
                <TouchableOpacity
                  style={styles.cartBtn}
                  onPress={() => addToCart(item)}
                >
                  <Ionicons name="cart-outline" size={14} color={colors.white} />
                  <Text style={styles.cartText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.heartBtn}
                onPress={() => toggleWishlist(item)}
              >
                <Ionicons name="heart" size={22} color={colors.error} />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  title: { fontSize: typography.sizes.xl, fontWeight: typography.weights.bold, color: colors.textPrimary },
  count: { fontSize: typography.sizes.sm, color: colors.textSecondary },
  list: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl },
  card: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 14,
    marginBottom: spacing.sm,
    overflow: 'hidden',
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 2,
  },
  image: { width: 110, height: 110, backgroundColor: colors.background },
  info: { flex: 1, padding: spacing.sm, justifyContent: 'space-between' },
  name: { fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.textPrimary },
  price: { fontSize: typography.sizes.base, fontWeight: typography.weights.bold, color: colors.accent },
  original: { fontSize: typography.sizes.xs, color: colors.textLight, textDecorationLine: 'line-through' },
  cartBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  cartText: { color: colors.white, fontSize: typography.sizes.xs, marginLeft: 4, fontWeight: typography.weights.medium },
  heartBtn: { padding: spacing.sm, justifyContent: 'flex-start' },
});
