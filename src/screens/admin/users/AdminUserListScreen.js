import React, { useState, useEffect } from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useOrders } from '../../../context/OrderContext';
import { SEED_USERS } from '../../../data/seedData';
import { StorageService } from '../../../storage/AsyncStorageService';
import { colors } from '../../../constants/colors';
import { spacing } from '../../../constants/spacing';
import { typography } from '../../../constants/typography';

export default function AdminUserListScreen({ navigation }) {
  const { orders } = useOrders();
  const [search, setSearch] = useState('');

  // Collect unique users from orders + seed users
  const usersFromOrders = orders.reduce((acc, o) => {
    if (!acc.find((u) => u.id === o.userId)) {
      acc.push({ id: o.userId, name: o.userName, email: o.userEmail, role: 'user' });
    }
    return acc;
  }, []);

  const allUsers = [
    ...SEED_USERS.map(({ password: _, ...u }) => u),
    ...usersFromOrders.filter((u) => !SEED_USERS.find((s) => s.id === u.id)),
  ];

  const filtered = allUsers.filter((u) =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  const getOrderCount = (userId) => orders.filter((o) => o.userId === userId).length;
  const getTotalSpent = (userId) =>
    orders
      .filter((o) => o.userId === userId && o.status !== 'cancelled')
      .reduce((s, o) => s + o.totalAmount, 0);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.title}>Users ({allUsers.length})</Text>
        <View style={{ width: 34 }} />
      </View>

      <View style={styles.searchRow}>
        <Ionicons name="search-outline" size={18} color={colors.textSecondary} style={{ marginRight: spacing.sm }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name or email..."
          placeholderTextColor={colors.placeholder}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(u) => u.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {item.name?.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)}
              </Text>
            </View>
            <View style={styles.info}>
              <View style={styles.nameRow}>
                <Text style={styles.name}>{item.name}</Text>
                {item.role === 'admin' && (
                  <View style={styles.adminBadge}><Text style={styles.adminBadgeText}>Admin</Text></View>
                )}
              </View>
              <Text style={styles.email}>{item.email}</Text>
              {item.role !== 'admin' && (
                <Text style={styles.stats}>
                  {getOrderCount(item.id)} orders  •  ${getTotalSpent(item.id).toFixed(0)} spent
                </Text>
              )}
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.primary, paddingHorizontal: spacing.md, paddingVertical: spacing.md },
  backBtn: { padding: 6 },
  title: { color: colors.white, fontSize: typography.sizes.base, fontWeight: typography.weights.bold },
  searchRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, margin: spacing.md, borderRadius: 10, paddingHorizontal: spacing.md, height: 44, borderWidth: 1, borderColor: colors.border },
  searchInput: { flex: 1, fontSize: typography.sizes.sm, color: colors.textPrimary },
  list: { paddingHorizontal: spacing.md, paddingBottom: spacing.xl },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: 12, padding: spacing.md, marginBottom: spacing.sm, shadowColor: colors.cardShadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 4, elevation: 2 },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', marginRight: spacing.md },
  avatarText: { color: colors.white, fontWeight: typography.weights.bold, fontSize: typography.sizes.base },
  info: { flex: 1 },
  nameRow: { flexDirection: 'row', alignItems: 'center' },
  name: { fontSize: typography.sizes.sm, fontWeight: typography.weights.semiBold, color: colors.textPrimary, marginRight: spacing.sm },
  adminBadge: { backgroundColor: colors.accent + '20', borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2 },
  adminBadgeText: { color: colors.accent, fontSize: typography.sizes.xs, fontWeight: typography.weights.bold },
  email: { fontSize: typography.sizes.xs, color: colors.textSecondary, marginTop: 2 },
  stats: { fontSize: typography.sizes.xs, color: colors.info, marginTop: 4 },
});
