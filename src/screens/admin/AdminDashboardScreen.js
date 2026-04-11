import React from 'react';
import {View, Text, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrderContext';
import { useProducts } from '../../context/ProductContext';
import StatCard from '../../components/admin/StatCard';
import OrderStatusBadge from '../../components/orders/OrderStatusBadge';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';

const MANAGE_ITEMS = [
  { label: 'Products', icon: '📦', screen: 'AdminProductList', color: colors.primary },
  { label: 'Orders', icon: '🧾', screen: 'AdminOrderList', color: colors.accent },
  { label: 'Categories', icon: '🗂️', screen: 'AdminCategoryList', color: colors.info },
  { label: 'Banners', icon: '🖼️', screen: 'AdminBannerList', color: '#8E44AD' },
  { label: 'Users', icon: '👥', screen: 'AdminUserList', color: '#16A085' },
  { label: 'Analytics', icon: '📊', screen: 'AdminAnalytics', color: '#C0392B' },
];

export default function AdminDashboardScreen({ navigation }) {
  const { user, logout } = useAuth();
  const { orders } = useOrders();
  const { products } = useProducts();

  const totalRevenue = orders
    .filter((o) => o.status !== 'cancelled')
    .reduce((s, o) => s + o.totalAmount, 0);

  const pendingCount = orders.filter((o) => o.status === 'pending').length;

  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Admin Panel</Text>
          <Text style={styles.sub}>Welcome, {user?.name}</Text>
        </View>
        <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Stats */}
        <View style={styles.statsRow}>
          <StatCard icon="receipt-outline" label="Total Orders" value={orders.length} color={colors.info} />
          <StatCard icon="cash-outline" label="Revenue" value={`$${(totalRevenue / 1000).toFixed(1)}k`} color={colors.success} />
          <StatCard icon="cube-outline" label="Products" value={products.length} color={colors.accent} />
        </View>

        {pendingCount > 0 && (
          <TouchableOpacity
            style={styles.alertBanner}
            onPress={() => navigation.navigate('AdminOrderList')}
          >
            <Ionicons name="alert-circle" size={18} color={colors.warning} />
            <Text style={styles.alertText}>{pendingCount} pending order{pendingCount > 1 ? 's' : ''} need attention</Text>
            <Ionicons name="chevron-forward" size={16} color={colors.warning} />
          </TouchableOpacity>
        )}

        {/* Manage Grid */}
        <Text style={styles.sectionTitle}>Manage</Text>
        <View style={styles.manageGrid}>
          {MANAGE_ITEMS.map((item) => (
            <TouchableOpacity
              key={item.screen}
              style={[styles.manageCard, { backgroundColor: item.color }]}
              onPress={() => navigation.navigate(item.screen)}
              activeOpacity={0.85}
            >
              <Text style={styles.manageIcon}>{item.icon}</Text>
              <Text style={styles.manageLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Orders */}
        <Text style={styles.sectionTitle}>Recent Orders</Text>
        {recentOrders.length === 0 ? (
          <Text style={styles.empty}>No orders yet.</Text>
        ) : (
          recentOrders.map((order) => (
            <TouchableOpacity
              key={order.id}
              style={styles.orderCard}
              onPress={() => navigation.navigate('AdminOrderDetail', { orderId: order.id })}
              activeOpacity={0.8}
            >
              <View style={styles.orderTop}>
                <Text style={styles.orderId}>{order.id}</Text>
                <OrderStatusBadge status={order.status} />
              </View>
              <View style={styles.orderBottom}>
                <Text style={styles.orderUser}>{order.userName}</Text>
                <Text style={styles.orderAmount}>${order.totalAmount.toFixed(2)}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}

        {orders.length > 5 && (
          <TouchableOpacity onPress={() => navigation.navigate('AdminOrderList')}>
            <Text style={styles.viewAll}>View all orders →</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.primary, paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  greeting: { color: colors.white, fontSize: typography.sizes.lg, fontWeight: typography.weights.bold },
  sub: { color: colors.white + 'AA', fontSize: typography.sizes.sm, marginTop: 2 },
  logoutBtn: { paddingHorizontal: spacing.sm, paddingVertical: 6, borderRadius: 8, borderWidth: 1, borderColor: colors.accent },
  logoutText: { color: colors.accent, fontSize: typography.sizes.sm, fontWeight: typography.weights.medium },
  scroll: { padding: spacing.lg, paddingBottom: spacing.xxl },
  statsRow: { flexDirection: 'row', marginBottom: spacing.md },
  alertBanner: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.warning + '20', borderRadius: 10, padding: spacing.md, marginBottom: spacing.md },
  alertText: { flex: 1, marginLeft: spacing.sm, color: colors.warning, fontSize: typography.sizes.sm, fontWeight: typography.weights.medium },
  sectionTitle: { fontSize: typography.sizes.base, fontWeight: typography.weights.bold, color: colors.textPrimary, marginBottom: spacing.sm, marginTop: spacing.sm },
  manageGrid: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -4, marginBottom: spacing.md },
  manageCard: { width: '30%', margin: '1.65%', borderRadius: 14, padding: spacing.md, alignItems: 'center', minHeight: 90, justifyContent: 'center' },
  manageIcon: { fontSize: 28, marginBottom: spacing.sm },
  manageLabel: { color: colors.white, fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, textAlign: 'center' },
  orderCard: { backgroundColor: colors.surface, borderRadius: 12, padding: spacing.md, marginBottom: spacing.sm, shadowColor: colors.cardShadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 4, elevation: 2 },
  orderTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  orderId: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, color: colors.textPrimary },
  orderBottom: { flexDirection: 'row', justifyContent: 'space-between' },
  orderUser: { fontSize: typography.sizes.sm, color: colors.textSecondary },
  orderAmount: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, color: colors.accent },
  empty: { color: colors.textSecondary, textAlign: 'center', marginTop: spacing.lg },
  viewAll: { color: colors.accent, textAlign: 'center', marginTop: spacing.sm, fontSize: typography.sizes.sm, fontWeight: typography.weights.medium },
});
