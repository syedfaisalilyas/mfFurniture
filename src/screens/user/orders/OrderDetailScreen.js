import React, { useState } from 'react';
import {View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useOrders } from '../../../context/OrderContext';
import OrderStatusBadge from '../../../components/orders/OrderStatusBadge';
import AppButton from '../../../components/common/AppButton';
import { downloadReceipt } from '../../../lib/receipt';
import { colors } from '../../../constants/colors';
import { spacing } from '../../../constants/spacing';
import { typography } from '../../../constants/typography';

const STATUS_STEPS = ['pending', 'confirmed', 'processing', 'shipped', 'delivered'];
const CANCELLABLE = ['pending', 'confirmed'];

export default function OrderDetailScreen({ navigation, route }) {
  const { orderId } = route.params;
  const { orders, updateOrderStatus } = useOrders();
  const order = orders.find((o) => o.id === orderId);

  const [downloading, setDownloading] = useState(false);

  if (!order) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={{ textAlign: 'center', marginTop: 40 }}>Order not found.</Text>
      </SafeAreaView>
    );
  }
  const currentStep = STATUS_STEPS.indexOf(order.status);
  const canCancel = CANCELLABLE.includes(order.status);

  const handleDownloadReceipt = async () => {
    setDownloading(true);
    try {
      await downloadReceipt(order);
    } catch (e) {
      Alert.alert('Error', 'Could not generate receipt. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  const handleCancel = () => {
    Alert.alert(
      'Cancel Order',
      'Are you sure you want to cancel this order? This cannot be undone.',
      [
        { text: 'Keep Order', style: 'cancel' },
        {
          text: 'Cancel Order',
          style: 'destructive',
          onPress: () => updateOrderStatus(orderId, 'cancelled'),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.title}>Order Details</Text>
        <View style={{ width: 34 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Order ID & Status */}
        <View style={styles.section}>
          <View style={styles.row}>
            <View>
              <Text style={styles.label}>Order ID</Text>
              <Text style={styles.value}>{order.id}</Text>
            </View>
            <OrderStatusBadge status={order.status} />
          </View>
          <Text style={styles.dateText}>
            Placed on {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </Text>
        </View>

        {/* Tracking */}
        {order.status !== 'cancelled' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tracking</Text>
            <View style={styles.tracker}>
              {STATUS_STEPS.map((step, i) => {
                const done = i <= currentStep;
                const active = i === currentStep;
                return (
                  <View key={step} style={styles.stepRow}>
                    <View style={styles.stepLeft}>
                      <View style={[styles.stepDot, done && styles.stepDotDone, active && styles.stepDotActive]}>
                        {done && <Ionicons name="checkmark" size={12} color={colors.white} />}
                      </View>
                      {i < STATUS_STEPS.length - 1 && <View style={[styles.stepLine, done && styles.stepLineDone]} />}
                    </View>
                    <Text style={[styles.stepLabel, done && styles.stepLabelDone]}>
                      {step.charAt(0).toUpperCase() + step.slice(1)}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        )}

        {/* Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Items ({order.items.length})</Text>
          {order.items.map((item, i) => (
            <View key={i} style={styles.itemRow}>
              <Image source={{ uri: item.productImage || 'https://via.placeholder.com/60' }} style={styles.itemImage} />
              <View style={styles.itemInfo}>
                <Text style={styles.itemName} numberOfLines={2}>{item.productName}</Text>
                <Text style={styles.itemQty}>Qty: {item.quantity}</Text>
              </View>
              <Text style={styles.itemPrice}>${(item.unitPrice * item.quantity).toFixed(2)}</Text>
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

        {/* Payment */}
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

        {/* Receipt */}
        <AppButton
          title="Download Receipt (PDF)"
          variant="secondary"
          onPress={handleDownloadReceipt}
          loading={downloading}
          style={styles.receiptBtn}
        />

        {/* Cancel */}
        {canCancel && (
          <AppButton
            title="Cancel Order"
            variant="secondary"
            onPress={handleCancel}
            style={styles.cancelBtn}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  backBtn: { padding: 6 },
  title: { fontSize: typography.sizes.lg, fontWeight: typography.weights.bold, color: colors.textPrimary },
  scroll: { padding: spacing.lg, paddingBottom: spacing.xl },
  section: { backgroundColor: colors.surface, borderRadius: 14, padding: spacing.md, marginBottom: spacing.md },
  sectionTitle: { fontSize: typography.sizes.base, fontWeight: typography.weights.bold, color: colors.textPrimary, marginBottom: spacing.md },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  label: { fontSize: typography.sizes.xs, color: colors.textSecondary, marginBottom: 2 },
  value: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, color: colors.textPrimary },
  dateText: { fontSize: typography.sizes.xs, color: colors.textSecondary, marginTop: spacing.sm },
  tracker: { paddingLeft: spacing.sm },
  stepRow: { flexDirection: 'row', alignItems: 'flex-start' },
  stepLeft: { alignItems: 'center', marginRight: spacing.md, width: 20 },
  stepDot: { width: 20, height: 20, borderRadius: 10, backgroundColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  stepDotDone: { backgroundColor: colors.success },
  stepDotActive: { backgroundColor: colors.accent },
  stepLine: { width: 2, height: 28, backgroundColor: colors.border, marginTop: 2 },
  stepLineDone: { backgroundColor: colors.success },
  stepLabel: { fontSize: typography.sizes.sm, color: colors.textSecondary, paddingTop: 2, paddingBottom: spacing.md },
  stepLabelDone: { color: colors.textPrimary, fontWeight: typography.weights.medium },
  itemRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
  itemImage: { width: 56, height: 56, borderRadius: 8, backgroundColor: colors.background },
  itemInfo: { flex: 1, marginLeft: spacing.sm },
  itemName: { fontSize: typography.sizes.sm, color: colors.textPrimary, fontWeight: typography.weights.medium },
  itemQty: { fontSize: typography.sizes.xs, color: colors.textSecondary, marginTop: 2 },
  itemPrice: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, color: colors.accent },
  infoRow: { flexDirection: 'row', alignItems: 'flex-start' },
  infoText: { flex: 1, marginLeft: spacing.sm, fontSize: typography.sizes.sm, color: colors.textSecondary, lineHeight: 20 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.sm, paddingTop: spacing.sm, borderTopWidth: 1, borderTopColor: colors.border },
  totalLabel: { fontSize: typography.sizes.base, fontWeight: typography.weights.bold, color: colors.textPrimary },
  totalValue: { fontSize: typography.sizes.xl, fontWeight: typography.weights.bold, color: colors.accent },
  receiptBtn: { marginBottom: spacing.sm },
  cancelBtn: { borderColor: colors.error, marginBottom: spacing.lg },
});
