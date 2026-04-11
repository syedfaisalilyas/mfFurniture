import React, { useState } from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet,
  Modal, Alert, TextInput, KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAddress } from '../../../context/AddressContext';
import AppButton from '../../../components/common/AppButton';
import { colors } from '../../../constants/colors';
import { spacing } from '../../../constants/spacing';
import { typography } from '../../../constants/typography';

export default function AddressBookScreen({ navigation }) {
  const { addresses, addAddress, updateAddress, deleteAddress, setDefault } = useAddress();
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [label, setLabel] = useState('');
  const [address, setAddress] = useState('');
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  const openAdd = () => {
    setEditing(null);
    setLabel('');
    setAddress('');
    setErrors({});
    setModal(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setLabel(item.label);
    setAddress(item.address);
    setErrors({});
    setModal(true);
  };

  const validate = () => {
    const e = {};
    if (!label.trim()) e.label = 'Label is required (e.g. Home, Work)';
    if (!address.trim()) e.address = 'Address is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);
    if (editing) {
      await updateAddress(editing.id, label.trim(), address.trim());
    } else {
      await addAddress(label.trim(), address.trim());
    }
    setSaving(false);
    setModal(false);
  };

  const handleDelete = (item) => {
    Alert.alert('Delete Address', `Delete "${item.label}"?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteAddress(item.id) },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.title}>Saved Addresses</Text>
        <TouchableOpacity onPress={openAdd} style={styles.addBtn}>
          <Ionicons name="add" size={24} color={colors.accent} />
        </TouchableOpacity>
      </View>

      {addresses.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="location-outline" size={64} color={colors.textLight} />
          <Text style={styles.emptyTitle}>No saved addresses</Text>
          <Text style={styles.emptySubtitle}>Add addresses for faster checkout</Text>
          <AppButton title="Add Address" onPress={openAdd} style={styles.emptyBtn} />
        </View>
      ) : (
        <FlatList
          data={addresses}
          keyExtractor={(a) => a.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={[styles.card, item.isDefault && styles.cardDefault]}>
              <View style={styles.cardLeft}>
                <View style={[styles.iconBox, item.isDefault && styles.iconBoxDefault]}>
                  <Ionicons
                    name={item.label.toLowerCase().includes('work') ? 'briefcase-outline' : 'home-outline'}
                    size={20}
                    color={item.isDefault ? colors.white : colors.accent}
                  />
                </View>
                <View style={styles.cardInfo}>
                  <View style={styles.labelRow}>
                    <Text style={styles.label}>{item.label}</Text>
                    {item.isDefault && (
                      <View style={styles.defaultBadge}>
                        <Text style={styles.defaultText}>Default</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.addressText} numberOfLines={2}>{item.address}</Text>
                </View>
              </View>
              <View style={styles.cardActions}>
                {!item.isDefault && (
                  <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() => setDefault(item.id)}
                  >
                    <Ionicons name="star-outline" size={18} color={colors.warning} />
                  </TouchableOpacity>
                )}
                <TouchableOpacity style={styles.actionBtn} onPress={() => openEdit(item)}>
                  <Ionicons name="create-outline" size={18} color={colors.info} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn} onPress={() => handleDelete(item)}>
                  <Ionicons name="trash-outline" size={18} color={colors.error} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}

      <Modal visible={modal} transparent animationType="slide">
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>{editing ? 'Edit Address' : 'Add Address'}</Text>

              <Text style={styles.inputLabel}>Label</Text>
              <TextInput
                style={[styles.input, errors.label && styles.inputError]}
                placeholder="e.g. Home, Work, Parents"
                placeholderTextColor={colors.placeholder}
                value={label}
                onChangeText={setLabel}
              />
              {errors.label && <Text style={styles.errorText}>{errors.label}</Text>}

              {/* Quick label suggestions */}
              <View style={styles.suggestions}>
                {['Home', 'Work', 'Parents', 'Other'].map((s) => (
                  <TouchableOpacity
                    key={s}
                    style={[styles.suggestionChip, label === s && styles.suggestionActive]}
                    onPress={() => setLabel(s)}
                  >
                    <Text style={[styles.suggestionText, label === s && styles.suggestionTextActive]}>{s}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.inputLabel}>Full Address</Text>
              <TextInput
                style={[styles.input, styles.addressInput, errors.address && styles.inputError]}
                placeholder="Street, City, State, ZIP"
                placeholderTextColor={colors.placeholder}
                value={address}
                onChangeText={setAddress}
                multiline
                numberOfLines={3}
              />
              {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}

              <View style={styles.modalBtns}>
                <AppButton
                  title="Cancel"
                  variant="secondary"
                  onPress={() => setModal(false)}
                  style={{ flex: 1, marginRight: spacing.sm }}
                />
                <AppButton
                  title={editing ? 'Update' : 'Save'}
                  onPress={handleSave}
                  loading={saving}
                  style={{ flex: 1 }}
                />
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  backBtn: { padding: 6 },
  title: { fontSize: typography.sizes.lg, fontWeight: typography.weights.bold, color: colors.textPrimary },
  addBtn: { padding: 6 },
  list: { padding: spacing.lg, paddingBottom: spacing.xl },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: spacing.md,
    marginBottom: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'transparent',
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 2,
  },
  cardDefault: { borderColor: colors.accent },
  cardLeft: { flex: 1, flexDirection: 'row', alignItems: 'flex-start' },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.accent + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
    flexShrink: 0,
  },
  iconBoxDefault: { backgroundColor: colors.accent },
  cardInfo: { flex: 1 },
  labelRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  label: { fontSize: typography.sizes.base, fontWeight: typography.weights.semiBold, color: colors.textPrimary, marginRight: spacing.sm },
  defaultBadge: { backgroundColor: colors.accent + '20', borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2 },
  defaultText: { fontSize: typography.sizes.xs, color: colors.accent, fontWeight: typography.weights.bold },
  addressText: { fontSize: typography.sizes.sm, color: colors.textSecondary, lineHeight: 18 },
  cardActions: { flexDirection: 'row', alignItems: 'center' },
  actionBtn: { padding: 6 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl },
  emptyTitle: { fontSize: typography.sizes.lg, fontWeight: typography.weights.semiBold, color: colors.textPrimary, marginTop: spacing.md },
  emptySubtitle: { fontSize: typography.sizes.sm, color: colors.textSecondary, marginTop: spacing.sm, textAlign: 'center' },
  emptyBtn: { marginTop: spacing.lg, width: 180 },
  modalOverlay: { flex: 1, backgroundColor: colors.overlay, justifyContent: 'flex-end' },
  modalCard: { backgroundColor: colors.surface, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: spacing.xl, paddingBottom: spacing.xxl },
  modalTitle: { fontSize: typography.sizes.xl, fontWeight: typography.weights.bold, color: colors.textPrimary, marginBottom: spacing.lg },
  inputLabel: { fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.textPrimary, marginBottom: spacing.sm },
  input: { backgroundColor: colors.background, borderRadius: 10, borderWidth: 1, borderColor: colors.border, padding: spacing.md, fontSize: typography.sizes.sm, color: colors.textPrimary, marginBottom: spacing.sm },
  addressInput: { height: 80, textAlignVertical: 'top' },
  inputError: { borderColor: colors.error },
  errorText: { fontSize: typography.sizes.xs, color: colors.error, marginBottom: spacing.sm },
  suggestions: { flexDirection: 'row', marginBottom: spacing.md },
  suggestionChip: { paddingHorizontal: spacing.md, paddingVertical: 6, borderRadius: 16, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.background, marginRight: spacing.sm },
  suggestionActive: { borderColor: colors.accent, backgroundColor: colors.accent + '15' },
  suggestionText: { fontSize: typography.sizes.sm, color: colors.textSecondary },
  suggestionTextActive: { color: colors.accent, fontWeight: typography.weights.semiBold },
  modalBtns: { flexDirection: 'row', marginTop: spacing.md },
});
