import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/typography';
import { spacing } from '../../constants/spacing';

const STATUS_MAP = {
  pending: { label: 'Pending', color: colors.statusPending },
  confirmed: { label: 'Confirmed', color: colors.statusConfirmed },
  processing: { label: 'Processing', color: colors.statusProcessing },
  shipped: { label: 'Shipped', color: colors.statusShipped },
  delivered: { label: 'Delivered', color: colors.statusDelivered },
  cancelled: { label: 'Cancelled', color: colors.statusCancelled },
};

export default function OrderStatusBadge({ status }) {
  const { label, color } = STATUS_MAP[status] || STATUS_MAP.pending;
  return (
    <View style={[styles.badge, { backgroundColor: color + '20' }]}>
      <Text style={[styles.label, { color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  label: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.semiBold,
  },
});
