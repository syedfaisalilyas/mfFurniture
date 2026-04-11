import React, { useMemo } from 'react';
import {View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useOrders } from '../../context/OrderContext';
import { useProducts } from '../../context/ProductContext';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';

const { width } = Dimensions.get('window');
const BAR_MAX_HEIGHT = 100;

export default function AdminAnalyticsScreen({ navigation }) {
  const { orders } = useOrders();
  const { products, categories } = useProducts();

  const completedOrders = orders.filter((o) => o.status !== 'cancelled');
  const totalRevenue = completedOrders.reduce((s, o) => s + o.totalAmount, 0);
  const avgOrderValue = completedOrders.length ? totalRevenue / completedOrders.length : 0;

  // Orders by status
  const statusCounts = ['pending','confirmed','processing','shipped','delivered','cancelled'].map((s) => ({
    label: s.charAt(0).toUpperCase() + s.slice(1),
    count: orders.filter((o) => o.status === s).length,
  }));

  // Revenue by category
  const catRevenue = useMemo(() => {
    return categories.map((cat) => {
      const rev = completedOrders.reduce((sum, order) => {
        return sum + order.items
          .filter((item) => {
            const product = products.find((p) => p.id === item.productId);
            return product?.categoryId === cat.id;
          })
          .reduce((s, item) => s + item.unitPrice * item.quantity, 0);
      }, 0);
      return { label: cat.name, revenue: rev };
    }).sort((a, b) => b.revenue - a.revenue);
  }, [orders, categories, products]);

  const maxRev = Math.max(...catRevenue.map((c) => c.revenue), 1);

  // Top products
  const topProducts = useMemo(() => {
    const counts = {};
    completedOrders.forEach((o) => {
      o.items.forEach((item) => {
        counts[item.productId] = (counts[item.productId] || 0) + item.quantity;
      });
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([id, qty]) => {
        const product = products.find((p) => p.id === id);
        return { name: product?.name || id, qty };
      });
  }, [orders, products]);

  const maxQty = Math.max(...topProducts.map((p) => p.qty), 1);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.title}>Analytics</Text>
        <View style={{ width: 34 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* KPI Row */}
        <View style={styles.kpiRow}>
          <KPICard icon="cash-outline" label="Total Revenue" value={`$${totalRevenue.toFixed(0)}`} color={colors.success} />
          <KPICard icon="receipt-outline" label="Total Orders" value={orders.length} color={colors.info} />
          <KPICard icon="trending-up-outline" label="Avg Order" value={`$${avgOrderValue.toFixed(0)}`} color={colors.accent} />
        </View>

        {/* Orders by Status */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Orders by Status</Text>
          {statusCounts.map((s) => (
            <View key={s.label} style={styles.barRow}>
              <Text style={styles.barLabel}>{s.label}</Text>
              <View style={styles.barTrack}>
                <View
                  style={[styles.barFill, {
                    width: orders.length ? `${(s.count / orders.length) * 100}%` : '0%',
                    backgroundColor: getStatusColor(s.label.toLowerCase()),
                  }]}
                />
              </View>
              <Text style={styles.barValue}>{s.count}</Text>
            </View>
          ))}
        </View>

        {/* Revenue by Category */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Revenue by Category</Text>
          <View style={styles.chartRow}>
            {catRevenue.map((c) => (
              <View key={c.label} style={styles.chartCol}>
                <Text style={styles.chartValue}>${(c.revenue / 1000).toFixed(1)}k</Text>
                <View style={styles.chartBarTrack}>
                  <View style={[styles.chartBar, { height: (c.revenue / maxRev) * BAR_MAX_HEIGHT, backgroundColor: colors.accent }]} />
                </View>
                <Text style={styles.chartLabel} numberOfLines={2}>{c.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Top Products */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Selling Products</Text>
          {topProducts.length === 0 ? (
            <Text style={styles.empty}>No sales data yet.</Text>
          ) : (
            topProducts.map((p, i) => (
              <View key={p.name} style={styles.topRow}>
                <View style={styles.rank}><Text style={styles.rankText}>{i + 1}</Text></View>
                <Text style={styles.productName} numberOfLines={1}>{p.name}</Text>
                <View style={styles.topBarTrack}>
                  <View style={[styles.topBar, { width: `${(p.qty / maxQty) * 100}%` }]} />
                </View>
                <Text style={styles.topQty}>{p.qty} sold</Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function KPICard({ icon, label, value, color }) {
  return (
    <View style={kpiStyles.card}>
      <View style={[kpiStyles.icon, { backgroundColor: color + '20' }]}>
        <Ionicons name={icon} size={20} color={color} />
      </View>
      <Text style={kpiStyles.value}>{value}</Text>
      <Text style={kpiStyles.label}>{label}</Text>
    </View>
  );
}

const kpiStyles = StyleSheet.create({
  card: { flex: 1, backgroundColor: colors.surface, borderRadius: 12, padding: spacing.sm, alignItems: 'center', marginHorizontal: 4, shadowColor: colors.cardShadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 4, elevation: 2 },
  icon: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.sm },
  value: { fontSize: typography.sizes.lg, fontWeight: typography.weights.bold, color: colors.textPrimary },
  label: { fontSize: 9, color: colors.textSecondary, textAlign: 'center', marginTop: 2 },
});

function getStatusColor(status) {
  const map = { pending: colors.statusPending, confirmed: colors.statusConfirmed, processing: colors.statusProcessing, shipped: colors.statusShipped, delivered: colors.statusDelivered, cancelled: colors.statusCancelled };
  return map[status] || colors.accent;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.primary, paddingHorizontal: spacing.md, paddingVertical: spacing.md },
  backBtn: { padding: 6 },
  title: { color: colors.white, fontSize: typography.sizes.base, fontWeight: typography.weights.bold },
  scroll: { padding: spacing.lg, paddingBottom: spacing.xxl },
  kpiRow: { flexDirection: 'row', marginBottom: spacing.md },
  section: { backgroundColor: colors.surface, borderRadius: 14, padding: spacing.md, marginBottom: spacing.md },
  sectionTitle: { fontSize: typography.sizes.base, fontWeight: typography.weights.bold, color: colors.textPrimary, marginBottom: spacing.md },
  barRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
  barLabel: { width: 90, fontSize: typography.sizes.xs, color: colors.textSecondary },
  barTrack: { flex: 1, height: 10, backgroundColor: colors.background, borderRadius: 5, overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: 5 },
  barValue: { width: 28, textAlign: 'right', fontSize: typography.sizes.xs, fontWeight: typography.weights.bold, color: colors.textPrimary },
  chartRow: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-around', height: BAR_MAX_HEIGHT + 60 },
  chartCol: { alignItems: 'center', flex: 1 },
  chartValue: { fontSize: 9, color: colors.textSecondary, marginBottom: 4 },
  chartBarTrack: { width: 28, height: BAR_MAX_HEIGHT, justifyContent: 'flex-end' },
  chartBar: { width: '100%', borderRadius: 4, minHeight: 4 },
  chartLabel: { fontSize: 9, color: colors.textSecondary, textAlign: 'center', marginTop: 4, maxWidth: 56 },
  topRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
  rank: { width: 24, height: 24, borderRadius: 12, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', marginRight: spacing.sm },
  rankText: { color: colors.white, fontSize: typography.sizes.xs, fontWeight: typography.weights.bold },
  productName: { flex: 1, fontSize: typography.sizes.sm, color: colors.textPrimary, marginRight: spacing.sm },
  topBarTrack: { width: 80, height: 8, backgroundColor: colors.background, borderRadius: 4, overflow: 'hidden' },
  topBar: { height: '100%', backgroundColor: colors.accent, borderRadius: 4 },
  topQty: { width: 50, fontSize: typography.sizes.xs, color: colors.textSecondary, textAlign: 'right' },
  empty: { color: colors.textSecondary, textAlign: 'center' },
});
