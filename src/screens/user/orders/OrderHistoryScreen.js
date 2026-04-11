import React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useOrders } from '../../../context/OrderContext';
import { useAuth } from '../../../context/AuthContext';
import OrderStatusBadge from '../../../components/orders/OrderStatusBadge';
import AppLoader from '../../../components/common/AppLoader';
import AppEmptyState from '../../../components/common/AppEmptyState';
import { colors } from '../../../constants/colors';
import { spacing } from '../../../constants/spacing';
import { typography } from '../../../constants/typography';

export default function OrderHistoryScreen({ navigation }) {
  const { user } = useAuth();
  const { getUserOrders, isLoading } = useOrders();

  if (isLoading) return <AppLoader />;

  const orders = getUserOrders(user.id);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>My Orders</Text>
      </View>

      {orders.length === 0 ? (
        <AppEmptyState
          icon="receipt-outline"
          title="No orders yet"
          subtitle="Place your first order and track it here"
          actionLabel="Shop Now"
          onAction={() => navigation.navigate('HomeTab')}
        />
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(o) => o.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('OrderDetail', { orderId: item.id })}
              activeOpacity={0.8}
            >
              <View style={styles.cardTop}>
                <Text style={styles.orderId}>{item.id}</Text>
                <OrderStatusBadge status={item.status} />
              </View>
              <Text style={styles.date}>
                {new Date(item.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric', month: 'short', day: 'numeric',
                })}
              </Text>
              <View style={styles.cardBottom}>
                <Text style={styles.itemCount}>
                  {item.items.reduce((s, i) => s + i.quantity, 0)} item(s)
                </Text>
                <Text style={styles.total}>${item.totalAmount.toFixed(2)}</Text>
              </View>
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
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  title: { fontSize: typography.sizes.xl, fontWeight: typography.weights.bold, color: colors.textPrimary },
  list: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: spacing.md,
    marginBottom: spacing.sm,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  orderId: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, color: colors.textPrimary },
  date: { fontSize: typography.sizes.xs, color: colors.textSecondary, marginBottom: spacing.sm },
  cardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  itemCount: { fontSize: typography.sizes.sm, color: colors.textSecondary },
  total: { fontSize: typography.sizes.base, fontWeight: typography.weights.bold, color: colors.accent },
});
