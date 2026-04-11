import React from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '../../../context/CartContext';
import CartItemRow from '../../../components/cart/CartItemRow';
import AppButton from '../../../components/common/AppButton';
import AppEmptyState from '../../../components/common/AppEmptyState';
import { colors } from '../../../constants/colors';
import { spacing } from '../../../constants/spacing';
import { typography } from '../../../constants/typography';

const DELIVERY_FEE = 49;

export default function CartScreen({ navigation }) {
  const { items, totalItems, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.header}>
          <Text style={styles.title}>My Cart</Text>
        </View>
        <AppEmptyState
          icon="cart-outline"
          title="Your cart is empty"
          subtitle="Browse products and add items to your cart"
          actionLabel="Shop Now"
          onAction={() => navigation.navigate('HomeTab')}
        />
      </SafeAreaView>
    );
  }

  const grandTotal = totalPrice + DELIVERY_FEE;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>My Cart</Text>
        <TouchableOpacity onPress={clearCart}>
          <Text style={styles.clearText}>Clear All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={items}
        keyExtractor={(i) => i.product.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <CartItemRow item={item} />}
        ListFooterComponent={
          <View style={styles.summary}>
            <Text style={styles.summaryTitle}>Order Summary</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal ({totalItems} items)</Text>
              <Text style={styles.summaryValue}>${totalPrice.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery Fee</Text>
              <Text style={styles.summaryValue}>${DELIVERY_FEE.toFixed(2)}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${grandTotal.toFixed(2)}</Text>
            </View>
          </View>
        }
      />

      <View style={styles.footer}>
        <AppButton
          title={`Checkout  •  $${grandTotal.toFixed(2)}`}
          onPress={() => navigation.navigate('Checkout', { deliveryFee: DELIVERY_FEE })}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  title: { fontSize: typography.sizes.xl, fontWeight: typography.weights.bold, color: colors.textPrimary },
  clearText: { color: colors.error, fontSize: typography.sizes.sm },
  list: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl },
  summary: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: spacing.md,
    marginTop: spacing.sm,
  },
  summaryTitle: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  summaryLabel: { fontSize: typography.sizes.sm, color: colors.textSecondary },
  summaryValue: { fontSize: typography.sizes.sm, color: colors.textPrimary, fontWeight: typography.weights.medium },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: spacing.sm },
  totalLabel: { fontSize: typography.sizes.base, fontWeight: typography.weights.bold, color: colors.textPrimary },
  totalValue: { fontSize: typography.sizes.lg, fontWeight: typography.weights.bold, color: colors.accent },
  footer: { padding: spacing.lg, backgroundColor: colors.surface, borderTopWidth: 1, borderTopColor: colors.border },
});
