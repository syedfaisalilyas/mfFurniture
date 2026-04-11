import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../../context/CartContext';
import { resolveImageSource } from '../../data/imageMapping';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';

export default function CartItemRow({ item }) {
  const { incrementQty, decrementQty, removeFromCart } = useCart();

  return (
    <View style={styles.row}>
      <Image
        source={item.product.images?.[0]
          ? resolveImageSource(item.product.images[0])
          : { uri: 'https://via.placeholder.com/80' }}
        style={styles.image}
      />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>{item.product.name}</Text>
        <Text style={styles.price}>${item.product.price.toFixed(2)}</Text>
        <View style={styles.qtyRow}>
          <TouchableOpacity style={styles.qtyBtn} onPress={() => decrementQty(item.product.id)}>
            <Ionicons name="remove" size={16} color={colors.accent} />
          </TouchableOpacity>
          <Text style={styles.qty}>{item.quantity}</Text>
          <TouchableOpacity style={styles.qtyBtn} onPress={() => incrementQty(item.product.id)}>
            <Ionicons name="add" size={16} color={colors.accent} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.right}>
        <TouchableOpacity onPress={() => removeFromCart(item.product.id)} style={styles.removeBtn}>
          <Ionicons name="trash-outline" size={20} color={colors.error} />
        </TouchableOpacity>
        <Text style={styles.total}>${(item.product.price * item.quantity).toFixed(2)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.sm,
    marginBottom: spacing.sm,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: colors.background,
  },
  info: { flex: 1, marginLeft: spacing.sm, justifyContent: 'space-between' },
  name: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
    color: colors.textPrimary,
  },
  price: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
  },
  qtyRow: { flexDirection: 'row', alignItems: 'center' },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qty: {
    marginHorizontal: spacing.sm,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    minWidth: 24,
    textAlign: 'center',
  },
  right: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingLeft: spacing.sm,
  },
  removeBtn: { padding: 4 },
  total: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold,
    color: colors.accent,
  },
});
