import React, { useState } from 'react';
import {View, Text, ScrollView, Image, TouchableOpacity,
  StyleSheet, Alert} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useOrders } from '../../../context/OrderContext';
import OrderStatusBadge from '../../../components/orders/OrderStatusBadge';
import AppButton from '../../../components/common/AppButton';
import { colors } from '../../../constants/colors';
import { spacing } from '../../../constants/spacing';
import { typography } from '../../../constants/typography';

const STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'processing', label: 'Processing' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'cancelled', label: 'Cancelled' },
];

export default function AdminOrderDetailScreen({ navigation, route }) {
  const { orderId } = route.params;
  const { orders, updateOrderStatus } = useOrders();
  const order = orders.find((o) => o.id === orderId);

  const [selectedStatus, setSelectedStatus] = useState(order?.status || 'pending');
  const [saving, setSaving] = useState(false);

  if (!order) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={{ textAlign: 'center', marginTop: 40 }}>Order not found.</Text>
      </SafeAreaView>
    );
  }

  const handleUpdateStatus = async () => {
    if (selectedStatus === order.status) {
      Alert.alert('No Change', 'Status is already set to this value.');
      return;
    }
    setSaving(true);
    await updateOrderStatus(orderId, selectedStatus);
    setSaving(false);
    Alert.alert('Updated', `Order status changed to "${selectedStatus}".`);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.title}>Order Detail</Text>
        <View style={{ width: 34 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Order Info */}
        <View style={styles.section}>
          <View style={styles.row}>
            <View>
              <Text style={styles.label}>Order ID</Text>
              <Text style={styles.value}>{order.id}</Text>
            </View>
            <OrderStatusBadge status={order.status} />
          </View>
          <Text style={styles.meta}>
            Placed: {new Date(order.createdAt).toLocaleString()}
          </Text>
          <Text style={styles.meta}>
            Updated: {new Date(order.updatedAt).toLocaleString()}
          </Text>
        </View>

        {/* Customer Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer</Text>
          <View style={styles.infoRow}>
            <Ionicons name="person-outline" size={18} color={colors.accent} />
            <Text style={styles.infoText}>{order.userName}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="mail-outline" size={18} color={colors.accent} />
            <Text style={styles.infoText}>{order.userEmail}</Text>
          </View>
        </View>

        {/* Update Status */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Update Status</Text>
          <View style={styles.statusGrid}>
            {STATUS_OPTIONS.map((s) => (
              <TouchableOpacity
                key={s.value}
                style={[styles.statusChip, selectedStatus === s.value && styles.statusChipActive]}
                onPress={() => setSelectedStatus(s.value)}
              >
                <Text style={[styles.statusLabel, selectedStatus === s.value && styles.statusLabelActive]}>
                  {s.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <AppButton
            title="Save Status"
            onPress={handleUpdateStatus}
            loading={saving}
            style={styles.saveBtn}
          />
        </View>

        {/* Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Items ({order.items.length})</Text>
          {order.items.map((item, i) => (
            <View key={i} style={styles.itemRow}>
              <Image
                source={{ uri: item.productImage || 'https://via.placeholder.com/56' }}
                style={styles.itemImage}
              />
              <View style={styles.itemInfo}>
                <Text style={styles.itemName} numberOfLines={2}>{item.productName}</Text>
                <Text style={styles.itemQty}>Qty: {item.quantity}  •  ${item.unitPrice}/ea</Text>
              </View>
              <Text style={styles.itemTotal}>${(item.unitPrice * item.quantity).toFixed(2)}</Text>
            </View>
          ))}
        </View>

        {/* Shipping */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shipping Address</Text>
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={18} color={colors.accent} />
            <Text style={styles.infoText}>{order.shippingAddress}</Text>
          </View>
        </View>

        {/* Payment & Total */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment</Text>
          <View style={styles.infoRow}>
            <Ionicons name="card-outline" size={18} color={colors.accent} />
            <Text style={styles.infoText}>{order.paymentMethod}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Order Total</Text>
            <Text style={styles.totalValue}>${order.totalAmount.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  backBtn: { padding: 6 },
  title: { color: colors.white, fontSize: typography.sizes.base, fontWeight: typography.weights.bold },
  scroll: { padding: spacing.lg, paddingBottom: spacing.xl },
  section: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: spacing.sm },
  label: { fontSize: typography.sizes.xs, color: colors.textSecondary, marginBottom: 2 },
  value: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, color: colors.textPrimary },
  meta: { fontSize: typography.sizes.xs, color: colors.textSecondary, marginTop: 2 },
  infoRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: spacing.sm },
  infoText: { flex: 1, marginLeft: spacing.sm, fontSize: typography.sizes.sm, color: colors.textSecondary, lineHeight: 20 },
  statusGrid: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: spacing.md },
  statusChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  statusChipActive: { borderColor: colors.primary, backgroundColor: colors.primary },
  statusLabel: { fontSize: typography.sizes.sm, color: colors.textSecondary },
  statusLabelActive: { color: colors.white, fontWeight: typography.weights.medium },
  saveBtn: { backgroundColor: colors.primary },
  itemRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
  itemImage: { width: 56, height: 56, borderRadius: 8, backgroundColor: colors.background },
  itemInfo: { flex: 1, marginLeft: spacing.sm },
  itemName: { fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.textPrimary },
  itemQty: { fontSize: typography.sizes.xs, color: colors.textSecondary, marginTop: 2 },
  itemTotal: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, color: colors.accent },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.sm, paddingTop: spacing.sm, borderTopWidth: 1, borderTopColor: colors.border },
  totalLabel: { fontSize: typography.sizes.base, fontWeight: typography.weights.bold, color: colors.textPrimary },
  totalValue: { fontSize: typography.sizes.xl, fontWeight: typography.weights.bold, color: colors.accent },
});
