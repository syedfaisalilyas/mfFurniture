import React, { useState } from 'react';
import {View, Text, FlatList, TouchableOpacity, Image, StyleSheet,
  Alert, Modal, TextInput, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useProducts } from '../../../context/ProductContext';
import AppButton from '../../../components/common/AppButton';
import { colors } from '../../../constants/colors';
import { spacing } from '../../../constants/spacing';
import { typography } from '../../../constants/typography';

export default function AdminBannerListScreen({ navigation }) {
  const { banners, categories, addBanner, updateBanner, deleteBanner } = useProducts();
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [targetCategory, setTargetCategory] = useState('');
  const [saving, setSaving] = useState(false);

  const openAdd = () => { setEditing(null); setTitle(''); setImageUrl(''); setTargetCategory(''); setModal(true); };
  const openEdit = (b) => { setEditing(b); setTitle(b.title); setImageUrl(b.imageUrl); setTargetCategory(b.targetCategoryId || ''); setModal(true); };

  const handleSave = async () => {
    if (!title.trim() || !imageUrl.trim()) {
      Alert.alert('Missing', 'Title and Image URL are required.');
      return;
    }
    setSaving(true);
    try {
      const data = { title: title.trim(), imageUrl: imageUrl.trim(), targetCategoryId: targetCategory || null };
      if (editing) {
        await updateBanner(editing.id, data);
      } else {
        await addBanner(data);
      }
      setModal(false);
    } catch (e) {
      Alert.alert('Error', e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (banner) => {
    Alert.alert('Delete Banner', `Delete "${banner.title}"?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteBanner(banner.id) },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.title}>Banners ({banners.length})</Text>
        <TouchableOpacity style={styles.addBtn} onPress={openAdd}>
          <Ionicons name="add" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={banners}
        keyExtractor={(b) => b.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.imageUrl }} style={styles.bannerImage} />
            <View style={styles.overlay}>
              <Text style={styles.bannerTitle} numberOfLines={1}>{item.title}</Text>
            </View>
            <View style={styles.actions}>
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

      <Modal visible={modal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <ScrollView>
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>{editing ? 'Edit Banner' : 'Add Banner'}</Text>
              <Text style={styles.inputLabel}>Title</Text>
              <TextInput style={styles.input} placeholder="Banner title" placeholderTextColor={colors.placeholder} value={title} onChangeText={setTitle} />
              <Text style={styles.inputLabel}>Image URL</Text>
              <TextInput style={styles.input} placeholder="https://..." placeholderTextColor={colors.placeholder} value={imageUrl} onChangeText={setImageUrl} autoCapitalize="none" />
              <Text style={styles.inputLabel}>Target Category (optional)</Text>
              <View style={styles.catGrid}>
                <TouchableOpacity style={[styles.catChip, !targetCategory && styles.catChipActive]} onPress={() => setTargetCategory('')}>
                  <Text style={[styles.catLabel, !targetCategory && styles.catLabelActive]}>None</Text>
                </TouchableOpacity>
                {categories.map((c) => (
                  <TouchableOpacity key={c.id} style={[styles.catChip, targetCategory === c.id && styles.catChipActive]} onPress={() => setTargetCategory(c.id)}>
                    <Text style={[styles.catLabel, targetCategory === c.id && styles.catLabelActive]}>{c.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.modalBtns}>
                <AppButton title="Cancel" variant="secondary" onPress={() => setModal(false)} style={{ flex: 1, marginRight: spacing.sm }} />
                <AppButton title="Save" onPress={handleSave} loading={saving} style={{ flex: 1 }} />
              </View>
            </View>
          </ScrollView>
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
  addBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center' },
  list: { padding: spacing.md },
  card: { backgroundColor: colors.surface, borderRadius: 12, overflow: 'hidden', marginBottom: spacing.sm, shadowColor: colors.cardShadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 4, elevation: 2 },
  bannerImage: { width: '100%', height: 140, backgroundColor: colors.background },
  overlay: { position: 'absolute', bottom: 44, left: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.4)', padding: spacing.sm },
  bannerTitle: { color: colors.white, fontSize: typography.sizes.sm, fontWeight: typography.weights.semiBold },
  actions: { flexDirection: 'row', justifyContent: 'flex-end', padding: spacing.sm },
  actionBtn: { padding: 8 },
  modalOverlay: { flex: 1, backgroundColor: colors.overlay, justifyContent: 'flex-end' },
  modalCard: { backgroundColor: colors.surface, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: spacing.xl },
  modalTitle: { fontSize: typography.sizes.xl, fontWeight: typography.weights.bold, color: colors.textPrimary, marginBottom: spacing.lg },
  inputLabel: { fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.textPrimary, marginBottom: spacing.sm },
  input: { backgroundColor: colors.background, borderRadius: 10, borderWidth: 1, borderColor: colors.border, padding: spacing.md, fontSize: typography.sizes.sm, color: colors.textPrimary, marginBottom: spacing.md },
  catGrid: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: spacing.lg },
  catChip: { paddingHorizontal: spacing.md, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.background, marginRight: spacing.sm, marginBottom: spacing.sm },
  catChipActive: { borderColor: colors.accent, backgroundColor: colors.accent + '15' },
  catLabel: { fontSize: typography.sizes.sm, color: colors.textSecondary },
  catLabelActive: { color: colors.accent, fontWeight: typography.weights.semiBold },
  modalBtns: { flexDirection: 'row' },
});
