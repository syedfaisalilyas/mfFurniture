import React, { useState } from 'react';
import {View, Text, ScrollView, TouchableOpacity, StyleSheet,
  Switch, Alert, KeyboardAvoidingView, Platform, Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useProducts } from '../../../context/ProductContext';
import { uploadProductImage } from '../../../lib/storage';
import AppButton from '../../../components/common/AppButton';
import AppTextInput from '../../../components/common/AppTextInput';
import { colors } from '../../../constants/colors';
import { spacing } from '../../../constants/spacing';
import { typography } from '../../../constants/typography';

export default function AdminProductFormScreen({ navigation, route }) {
  const { productId } = route.params || {};
  const { getProductById, categories, addProduct, updateProduct } = useProducts();

  const existing = productId ? getProductById(productId) : null;
  const isEdit = !!existing;

  const [name, setName] = useState(existing?.name || '');
  const [description, setDescription] = useState(existing?.description || '');
  const [price, setPrice] = useState(existing?.price?.toString() || '');
  const [discountedPrice, setDiscountedPrice] = useState(existing?.discountedPrice?.toString() || '');
  const [vendorPrice, setVendorPrice] = useState(existing?.vendorPrice?.toString() || '');
  const [categoryId, setCategoryId] = useState(existing?.categoryId || categories[0]?.id || '');
  const [stock, setStock] = useState(existing?.stock?.toString() || '');
  const [imageUrl, setImageUrl] = useState(existing?.images?.[0] || '');
  const [isFeatured, setIsFeatured] = useState(existing?.isFeatured || false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Allow access to your photo library to pick product images.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });
    if (!result.canceled && result.assets?.[0]) {
      setImageUrl(result.assets[0].uri);
    }
  };

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = 'Name is required';
    if (!price || isNaN(Number(price)) || Number(price) <= 0) e.price = 'Valid price required';
    if (!stock || isNaN(Number(stock)) || Number(stock) < 0) e.stock = 'Valid stock required';
    if (!categoryId) e.category = 'Select a category';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      let finalImageUrl = imageUrl.trim();
      if (finalImageUrl && !finalImageUrl.startsWith('http')) {
        finalImageUrl = await uploadProductImage(finalImageUrl);
      }
      const data = {
        name: name.trim(),
        description: description.trim(),
        price: parseFloat(price),
        discountedPrice: discountedPrice ? parseFloat(discountedPrice) : null,
        vendorPrice: vendorPrice ? parseFloat(vendorPrice) : null,
        categoryId,
        stock: parseInt(stock),
        images: finalImageUrl ? [finalImageUrl] : [],
        isFeatured,
      };
      if (isEdit) {
        await updateProduct(productId, data);
        Alert.alert('Success', 'Product updated.');
      } else {
        await addProduct(data);
        Alert.alert('Success', 'Product added.');
      }
      navigation.goBack();
    } catch {
      Alert.alert('Error', 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.title}>{isEdit ? 'Edit Product' : 'Add Product'}</Text>
        <View style={{ width: 34 }} />
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

          {/* Image Picker */}
          <Text style={styles.label}>Product Image</Text>
          <View style={styles.imageRow}>
            <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
              {imageUrl ? (
                <Image source={{ uri: imageUrl }} style={styles.previewImage} />
              ) : (
                <View style={styles.imagePlaceholder}>
                  <Ionicons name="camera-outline" size={32} color={colors.textSecondary} />
                  <Text style={styles.imagePickerText}>Pick from Gallery</Text>
                </View>
              )}
            </TouchableOpacity>
            {imageUrl ? (
              <TouchableOpacity style={styles.clearImage} onPress={() => setImageUrl('')}>
                <Ionicons name="close-circle" size={22} color={colors.error} />
              </TouchableOpacity>
            ) : null}
          </View>
          <AppTextInput
            label="Or paste Image URL"
            value={imageUrl}
            onChangeText={setImageUrl}
            placeholder="https://..."
            autoCapitalize="none"
          />

          <AppTextInput label="Product Name" value={name} onChangeText={setName} placeholder="e.g. Nordic Sofa" error={errors.name} />
          <AppTextInput label="Description" value={description} onChangeText={setDescription} placeholder="Product description..." multiline style={{ height: 80 }} />

          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: spacing.sm }}>
              <AppTextInput label="Retail Price ($)" value={price} onChangeText={setPrice} keyboardType="decimal-pad" placeholder="0.00" error={errors.price} />
            </View>
            <View style={{ flex: 1 }}>
              <AppTextInput label="Sale Price ($)" value={discountedPrice} onChangeText={setDiscountedPrice} keyboardType="decimal-pad" placeholder="Optional" />
            </View>
          </View>

          {/* Vendor Price — Admin Only */}
          <View style={styles.vendorPriceBox}>
            <View style={styles.vendorPriceHeader}>
              <Ionicons name="lock-closed-outline" size={14} color={colors.warning} />
              <Text style={styles.vendorPriceLabel}> Vendor / Cost Price ($) — Admin Only</Text>
            </View>
            <AppTextInput
              value={vendorPrice}
              onChangeText={setVendorPrice}
              keyboardType="decimal-pad"
              placeholder="0.00 (your cost price)"
            />
            {vendorPrice && price ? (
              <Text style={styles.profitText}>
                Profit margin: ${(parseFloat(price) - parseFloat(vendorPrice || 0)).toFixed(2)} per unit
              </Text>
            ) : null}
          </View>

          <AppTextInput label="Stock Quantity" value={stock} onChangeText={setStock} keyboardType="number-pad" placeholder="0" error={errors.stock} />

          {/* Category */}
          <Text style={styles.label}>Category</Text>
          {errors.category && <Text style={styles.errorText}>{errors.category}</Text>}
          <View style={styles.categoryGrid}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={[styles.catChip, categoryId === cat.id && styles.catChipActive]}
                onPress={() => setCategoryId(cat.id)}
              >
                <Text style={[styles.catLabel, categoryId === cat.id && styles.catLabelActive]}>{cat.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Featured Toggle */}
          <View style={styles.toggleRow}>
            <Text style={styles.toggleLabel}>Featured Product</Text>
            <Switch value={isFeatured} onValueChange={setIsFeatured} trackColor={{ false: colors.border, true: colors.accent }} thumbColor={colors.white} />
          </View>

          <AppButton title={isEdit ? 'Update Product' : 'Add Product'} onPress={handleSave} loading={loading} style={styles.saveBtn} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.primary, paddingHorizontal: spacing.md, paddingVertical: spacing.md },
  backBtn: { padding: 6 },
  title: { color: colors.white, fontSize: typography.sizes.base, fontWeight: typography.weights.bold },
  scroll: { padding: spacing.lg, paddingBottom: spacing.xxl },
  label: { fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.textPrimary, marginBottom: spacing.sm },
  imageRow: { position: 'relative', marginBottom: spacing.md },
  imagePicker: { width: '100%', height: 160, backgroundColor: colors.surface, borderRadius: 12, borderWidth: 1, borderColor: colors.border, overflow: 'hidden' },
  previewImage: { width: '100%', height: '100%' },
  imagePlaceholder: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  imagePickerText: { color: colors.textSecondary, fontSize: typography.sizes.sm, marginTop: spacing.sm },
  clearImage: { position: 'absolute', top: 8, right: 8 },
  row: { flexDirection: 'row' },
  errorText: { fontSize: typography.sizes.xs, color: colors.error, marginBottom: spacing.sm },
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: spacing.md },
  catChip: { paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: 20, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, marginRight: spacing.sm, marginBottom: spacing.sm },
  catChipActive: { borderColor: colors.accent, backgroundColor: colors.accent + '15' },
  catLabel: { fontSize: typography.sizes.sm, color: colors.textSecondary },
  catLabelActive: { color: colors.accent, fontWeight: typography.weights.semiBold },
  toggleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.surface, borderRadius: 10, padding: spacing.md, marginBottom: spacing.md },
  toggleLabel: { fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.textPrimary },
  saveBtn: { marginTop: spacing.sm },
  vendorPriceBox: { backgroundColor: '#FFF8E1', borderRadius: 10, borderWidth: 1, borderColor: colors.warning + '60', padding: spacing.md, marginBottom: spacing.md },
  vendorPriceHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
  vendorPriceLabel: { fontSize: typography.sizes.xs, fontWeight: typography.weights.semiBold, color: colors.warning },
  profitText: { fontSize: typography.sizes.xs, color: colors.success || '#2E7D32', marginTop: 4, fontWeight: typography.weights.medium },
});
