import React, { useState } from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet,
  Alert, Modal, TextInput, RefreshControl} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useProducts } from '../../../context/ProductContext';
import AppButton from '../../../components/common/AppButton';
import { colors } from '../../../constants/colors';
import { spacing } from '../../../constants/spacing';
import { typography } from '../../../constants/typography';

const ICONS = ['home-outline','bed-outline','restaurant-outline','laptop-outline','leaf-outline','cube-outline','happy-outline','walk-outline','accessibility-outline','desktop-outline','people-outline','archive-outline','business-outline','car-outline','gift-outline','heart-outline','star-outline'];
const SECTIONS = [
  { value: 'home', label: 'Home Furniture', color: '#4CAF50' },
  { value: 'office', label: 'Office Furniture', color: '#2196F3' },
  { value: 'other', label: 'Other', color: '#9E9E9E' },
];

export default function AdminCategoryListScreen({ navigation }) {
  const { categories, products, addCategory, updateCategory, deleteCategory, refresh } = useProducts();
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [name, setName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState(ICONS[0]);
  const [selectedSection, setSelectedSection] = useState('home');
  const [saving, setSaving] = useState(false);
  const [filterSection, setFilterSection] = useState('all');
  const [refreshing, setRefreshing] = useState(false);

  const openAdd = () => { setEditing(null); setName(''); setSelectedIcon(ICONS[0]); setSelectedSection('home'); setModal(true); };
  const openEdit = (cat) => { setEditing(cat); setName(cat.name); setSelectedIcon(cat.icon || ICONS[0]); setSelectedSection(cat.section || 'home'); setModal(true); };

  const handleSave = async () => {
    if (!name.trim()) return;
    setSaving(true);
    try {
      if (editing) {
        await updateCategory(editing.id, name.trim(), selectedIcon, selectedSection);
      } else {
        await addCategory(name.trim(), selectedIcon, selectedSection);
      }
      setModal(false);
    } catch (e) {
      Alert.alert('Error', e.message);
    } finally {
      setSaving(false);
    }
  };

  const filteredCategories = filterSection === 'all'
    ? categories
    : categories.filter((c) => c.section === filterSection);

  const handleDelete = (cat) => {
    const count = products.filter((p) => p.categoryId === cat.id).length;
    Alert.alert(
      'Delete Category',
      count > 0
        ? `"${cat.name}" has ${count} product(s). Are you sure?`
        : `Delete "${cat.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => deleteCategory(cat.id) },
      ]
    );
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await refresh();
    } catch (error) {
      Alert.alert('Error', 'Failed to refresh data');
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.title}>Categories ({categories.length})</Text>
        <TouchableOpacity
          style={styles.headerBtn}
          onPress={handleRefresh}
          disabled={refreshing}
        >
          <Ionicons name="refresh" size={20} color={colors.white} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.addBtn} onPress={openAdd}>
          <Ionicons name="add" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>

      {/* Section Filter */}
      <View style={styles.filterRow}>
        {[{value:'all',label:'All'}, ...SECTIONS].map((s) => (
          <TouchableOpacity
            key={s.value}
            style={[styles.filterChip, filterSection === s.value && styles.filterChipActive]}
            onPress={() => setFilterSection(s.value)}
          >
            <Text style={[styles.filterChipText, filterSection === s.value && styles.filterChipTextActive]}>
              {s.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredCategories}
        keyExtractor={(c) => c.id}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
        renderItem={({ item }) => {
          const count = products.filter((p) => p.categoryId === item.id).length;
          const sectionInfo = SECTIONS.find((s) => s.value === item.section) || SECTIONS[0];
          return (
            <TouchableOpacity 
              style={styles.row}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('AdminProductList', { categoryId: item.id })}
            >
              <View style={styles.iconBox}>
                <Ionicons name={item.icon || 'cube-outline'} size={24} color={colors.accent} />
              </View>
              <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                  <View style={[styles.sectionBadge, { backgroundColor: sectionInfo.color + '20' }]}>
                    <Text style={[styles.sectionBadgeText, { color: sectionInfo.color }]}>{sectionInfo.label}</Text>
                  </View>
                  <Text style={styles.count}> · {count} product(s)</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => openEdit(item)} style={styles.actionBtn}>
                <Ionicons name="create-outline" size={20} color={colors.info} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item)} style={styles.actionBtn}>
                <Ionicons name="trash-outline" size={20} color={colors.error} />
              </TouchableOpacity>
            </TouchableOpacity>
          );
        }}
      />

      <Modal visible={modal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>{editing ? 'Edit Category' : 'Add Category'}</Text>
            <TextInput
              style={styles.input}
              placeholder="Category name"
              placeholderTextColor={colors.placeholder}
              value={name}
              onChangeText={setName}
            />
            <Text style={styles.iconLabel}>Section</Text>
            <View style={styles.sectionRow}>
              {SECTIONS.map((s) => (
                <TouchableOpacity
                  key={s.value}
                  style={[styles.sectionOption, selectedSection === s.value && { backgroundColor: s.color, borderColor: s.color }]}
                  onPress={() => setSelectedSection(s.value)}
                >
                  <Text style={[styles.sectionOptionText, selectedSection === s.value && { color: colors.white }]}>{s.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.iconLabel}>Icon</Text>
            <View style={styles.iconGrid}>
              {ICONS.map((icon) => (
                <TouchableOpacity
                  key={icon}
                  style={[styles.iconOption, selectedIcon === icon && styles.iconOptionActive]}
                  onPress={() => setSelectedIcon(icon)}
                >
                  <Ionicons name={icon} size={22} color={selectedIcon === icon ? colors.white : colors.textSecondary} />
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.modalBtns}>
              <AppButton title="Cancel" variant="secondary" onPress={() => setModal(false)} style={{ flex: 1, marginRight: spacing.sm }} />
              <AppButton title="Save" onPress={handleSave} loading={saving} style={{ flex: 1 }} />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.primary, paddingHorizontal: spacing.md, paddingVertical: spacing.md },
  backBtn: { padding: 6 },
  title: { color: colors.white, fontSize: typography.sizes.base, fontWeight: typography.weights.bold },
  headerBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center', marginRight: spacing.sm },
  addBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center' },
  list: { padding: spacing.md },
  row: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: 12, padding: spacing.md, marginBottom: spacing.sm, shadowColor: colors.cardShadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 4, elevation: 2 },
  iconBox: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.accent + '20', alignItems: 'center', justifyContent: 'center', marginRight: spacing.md },
  info: { flex: 1 },
  name: { fontSize: typography.sizes.base, fontWeight: typography.weights.semiBold, color: colors.textPrimary },
  count: { fontSize: typography.sizes.xs, color: colors.textSecondary, marginTop: 2 },
  actionBtn: { padding: 8 },
  modalOverlay: { flex: 1, backgroundColor: colors.overlay, justifyContent: 'flex-end' },
  modalCard: { backgroundColor: colors.surface, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: spacing.xl },
  modalTitle: { fontSize: typography.sizes.xl, fontWeight: typography.weights.bold, color: colors.textPrimary, marginBottom: spacing.lg },
  input: { backgroundColor: colors.background, borderRadius: 10, borderWidth: 1, borderColor: colors.border, padding: spacing.md, fontSize: typography.sizes.base, color: colors.textPrimary, marginBottom: spacing.md },
  iconLabel: { fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.textPrimary, marginBottom: spacing.sm },
  iconGrid: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: spacing.lg },
  iconOption: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.background, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center', margin: 4 },
  iconOptionActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  modalBtns: { flexDirection: 'row' },
  filterRow: { flexDirection: 'row', paddingHorizontal: spacing.md, paddingVertical: spacing.sm, gap: 8 },
  filterChip: { paddingHorizontal: spacing.md, paddingVertical: 6, borderRadius: 16, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface },
  filterChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  filterChipText: { fontSize: typography.sizes.xs, color: colors.textSecondary, fontWeight: typography.weights.medium },
  filterChipTextActive: { color: colors.white },
  sectionBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 },
  sectionBadgeText: { fontSize: typography.sizes.xs, fontWeight: typography.weights.semiBold },
  sectionRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: spacing.md, gap: 8 },
  sectionOption: { paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: 20, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface },
  sectionOptionText: { fontSize: typography.sizes.sm, color: colors.textSecondary, fontWeight: typography.weights.medium },
});
