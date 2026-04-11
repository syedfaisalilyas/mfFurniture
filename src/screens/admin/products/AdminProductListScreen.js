import React, { useState } from 'react';
import {View, Text, FlatList, TouchableOpacity, Image, StyleSheet,
  Alert, TextInput} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useProducts } from '../../../context/ProductContext';
import { resolveImageSource } from '../../../data/imageMapping';
import { colors } from '../../../constants/colors';
import { spacing } from '../../../constants/spacing';
import { typography } from '../../../constants/typography';

export default function AdminProductListScreen({ navigation }) {
  const { products, categories, deleteProduct } = useProducts();
  const [search, setSearch] = useState('');

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const getCategoryName = (id) => categories.find((c) => c.id === id)?.name || id;

  const handleDelete = (product) => {
    Alert.alert(
      'Delete Product',
      `Are you sure you want to delete "${product.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => deleteProduct(product.id) },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.title}>Products ({products.length})</Text>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => navigation.navigate('AdminProductForm', {})}
        >
          <Ionicons name="add" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchRow}>
        <Ionicons name="search-outline" size={18} color={colors.textSecondary} style={{ marginRight: spacing.sm }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          placeholderTextColor={colors.placeholder}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(p) => p.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Image
              source={item.images?.[0]
                ? resolveImageSource(item.images[0])
                : { uri: 'https://via.placeholder.com/60' }}
              style={styles.image}
            />
            <View style={styles.info}>
              <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
              <Text style={styles.category}>{getCategoryName(item.categoryId)}</Text>
              <View style={styles.meta}>
                <Text style={styles.price}>${item.price}</Text>
                <Text style={[styles.stock, item.stock < 5 && styles.stockLow]}>
                  Stock: {item.stock}
                </Text>
              </View>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.editBtn}
                onPress={() => navigation.navigate('AdminProductForm', { productId: item.id })}
              >
                <Ionicons name="create-outline" size={18} color={colors.info} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => handleDelete(item)}
              >
                <Ionicons name="trash-outline" size={18} color={colors.error} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
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
  addBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    margin: spacing.md,
    borderRadius: 10,
    paddingHorizontal: spacing.md,
    height: 44,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchInput: { flex: 1, fontSize: typography.sizes.sm, color: colors.textPrimary },
  list: { paddingHorizontal: spacing.md, paddingBottom: spacing.xl },
  row: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.sm,
    marginBottom: spacing.sm,
    alignItems: 'center',
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 2,
  },
  image: { width: 60, height: 60, borderRadius: 8, backgroundColor: colors.background },
  info: { flex: 1, marginLeft: spacing.sm },
  name: { fontSize: typography.sizes.sm, fontWeight: typography.weights.semiBold, color: colors.textPrimary },
  category: { fontSize: typography.sizes.xs, color: colors.textSecondary, marginTop: 2 },
  meta: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  price: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, color: colors.accent, marginRight: spacing.md },
  stock: { fontSize: typography.sizes.xs, color: colors.success },
  stockLow: { color: colors.warning },
  actions: { alignItems: 'center' },
  editBtn: { padding: 8 },
  deleteBtn: { padding: 8 },
});
