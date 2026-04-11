import React, { useState } from 'react';
import {View, Text, ScrollView, TouchableOpacity, StyleSheet,
  Alert} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../../context/AuthContext';
import { useOrders } from '../../../context/OrderContext';
import AppButton from '../../../components/common/AppButton';
import AppTextInput from '../../../components/common/AppTextInput';
import { colors } from '../../../constants/colors';
import { spacing } from '../../../constants/spacing';
import { typography } from '../../../constants/typography';

export default function ProfileScreen({ navigation }) {
  const { user, logout, updateProfile } = useAuth();
  const { getUserOrders } = useOrders();

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState(user?.address || '');
  const [saving, setSaving] = useState(false);

  const orders = getUserOrders(user?.id);
  const initials = user?.name?.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2) || 'U';

  const handleSave = async () => {
    setSaving(true);
    await updateProfile({ name, phone, address });
    setSaving(false);
    setEditing(false);
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: logout },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity onPress={() => setEditing(!editing)}>
          <Ionicons name={editing ? 'close' : 'create-outline'} size={22} color={colors.accent} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Avatar */}
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <Text style={styles.userName}>{user?.name}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{orders.length}</Text>
            <Text style={styles.statLabel}>Orders</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statValue}>
              {orders.filter((o) => o.status === 'delivered').length}
            </Text>
            <Text style={styles.statLabel}>Delivered</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statValue}>
              {orders.filter((o) => o.status === 'pending' || o.status === 'processing' || o.status === 'shipped').length}
            </Text>
            <Text style={styles.statLabel}>Active</Text>
          </View>
        </View>

        {/* Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Info</Text>
          {editing ? (
            <>
              <AppTextInput
                label="Full Name"
                value={name}
                onChangeText={setName}
                leftIcon="person-outline"
              />
              <AppTextInput
                label="Phone"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                leftIcon="call-outline"
                placeholder="+1 555-0000"
              />
              <AppTextInput
                label="Address"
                value={address}
                onChangeText={setAddress}
                leftIcon="location-outline"
                placeholder="Your shipping address"
                multiline
              />
              <AppButton title="Save Changes" onPress={handleSave} loading={saving} />
            </>
          ) : (
            <>
              <InfoRow icon="person-outline" label="Name" value={user?.name} />
              <InfoRow icon="mail-outline" label="Email" value={user?.email} />
              <InfoRow icon="call-outline" label="Phone" value={user?.phone || 'Not set'} />
              <InfoRow icon="location-outline" label="Address" value={user?.address || 'Not set'} />
            </>
          )}
        </View>

        {/* Quick Links */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('OrdersTab')}
          >
            <Ionicons name="receipt-outline" size={20} color={colors.accent} />
            <Text style={styles.menuLabel}>My Orders</Text>
            <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
          </TouchableOpacity>
          <View style={styles.menuDivider} />
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('AddressBook')}
          >
            <Ionicons name="location-outline" size={20} color={colors.accent} />
            <Text style={styles.menuLabel}>Saved Addresses</Text>
            <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        <AppButton
          title="Logout"
          variant="secondary"
          onPress={handleLogout}
          style={styles.logoutBtn}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <View style={infoStyles.row}>
      <Ionicons name={icon} size={18} color={colors.accent} style={infoStyles.icon} />
      <View>
        <Text style={infoStyles.label}>{label}</Text>
        <Text style={infoStyles.value}>{value}</Text>
      </View>
    </View>
  );
}

const infoStyles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: spacing.md },
  icon: { marginRight: spacing.md, marginTop: 2 },
  label: { fontSize: typography.sizes.xs, color: colors.textSecondary },
  value: { fontSize: typography.sizes.sm, color: colors.textPrimary, fontWeight: typography.weights.medium, marginTop: 2 },
});

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
  scroll: { paddingBottom: spacing.xl },
  avatarSection: { alignItems: 'center', paddingVertical: spacing.lg },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  avatarText: { color: colors.white, fontSize: typography.sizes.xxl, fontWeight: typography.weights.bold },
  userName: { fontSize: typography.sizes.xl, fontWeight: typography.weights.bold, color: colors.textPrimary },
  userEmail: { fontSize: typography.sizes.sm, color: colors.textSecondary, marginTop: 2 },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    marginHorizontal: spacing.lg,
    borderRadius: 14,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  statBox: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: typography.sizes.xxl, fontWeight: typography.weights.bold, color: colors.textPrimary },
  statLabel: { fontSize: typography.sizes.xs, color: colors.textSecondary, marginTop: 2 },
  statDivider: { width: 1, backgroundColor: colors.border, marginVertical: 4 },
  section: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: spacing.md,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 4 },
  menuLabel: { flex: 1, marginLeft: spacing.md, fontSize: typography.sizes.sm, color: colors.textPrimary, fontWeight: typography.weights.medium },
  menuDivider: { height: 1, backgroundColor: colors.border, marginVertical: spacing.sm },
  logoutBtn: { marginHorizontal: spacing.lg, borderColor: colors.error },
});
