import React from 'react';
import {View, Text, ScrollView, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProducts } from '../../../context/ProductContext';
import { useAuth } from '../../../context/AuthContext';
import BannerCarousel from '../../../components/home/BannerCarousel';
import CategoryRow from '../../../components/home/CategoryRow';
import ProductCard from '../../../components/products/ProductCard';
import AppLoader from '../../../components/common/AppLoader';
import { colors } from '../../../constants/colors';
import { spacing } from '../../../constants/spacing';
import { typography } from '../../../constants/typography';

export default function HomeScreen({ navigation }) {
  const { user } = useAuth();
  const {
    banners, categories, isLoading,
    getFeaturedProducts, setSelectedCategoryId,
  } = useProducts();

  if (isLoading) return <AppLoader />;

  const featured = getFeaturedProducts();
  const homeCategories = categories.filter((c) => c.section === 'home' || c.section === 'other');
  const officeCategories = categories.filter((c) => c.section === 'office');

  const handleCategoryPress = (categoryId) => {
    setSelectedCategoryId(categoryId);
    navigation.navigate('ProductList');
  };

  const handleBannerPress = (banner) => {
    if (banner.targetCategoryId) {
      setSelectedCategoryId(banner.targetCategoryId);
      navigation.navigate('ProductList');
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, {user?.name?.split(' ')[0]}</Text>
            <Text style={styles.subtitle}>Home & Office Furniture Experts</Text>
          </View>
          <TouchableOpacity
            style={styles.searchBtn}
            onPress={() => navigation.navigate('ProductList')}
          >
            <Text style={styles.searchIcon}>🔍</Text>
          </TouchableOpacity>
        </View>

        {/* Banners */}
        <BannerCarousel banners={banners} onPress={handleBannerPress} />

        {/* ── SOLUTION CARDS ── */}
        <Text style={styles.sectionTitle}>Furniture Solutions</Text>
        <View style={styles.solutionRow}>
          {/* Office Solution Card */}
          <TouchableOpacity
            style={[styles.solutionCard, styles.officeCard]}
            onPress={() => navigation.navigate('FurnitureSolution', { type: 'office' })}
            activeOpacity={0.85}
          >
            <View style={styles.solutionIconWrap}>
              <Text style={styles.solutionEmoji}>🏢</Text>
            </View>
            <Text style={styles.solutionCardTitle}>Office Setup</Text>
            <Text style={styles.solutionCardDesc}>Furnish your entire office with premium designs</Text>
            <View style={styles.solutionBtn}>
              <Text style={styles.solutionBtnText}>Get Quote →</Text>
            </View>
          </TouchableOpacity>

          {/* Home Solution Card */}
          <TouchableOpacity
            style={[styles.solutionCard, styles.homeCard]}
            onPress={() => navigation.navigate('FurnitureSolution', { type: 'home' })}
            activeOpacity={0.85}
          >
            <View style={styles.solutionIconWrap}>
              <Text style={styles.solutionEmoji}>🏡</Text>
            </View>
            <Text style={styles.solutionCardTitle}>Home Furniture</Text>
            <Text style={styles.solutionCardDesc}>Full home or single room, we cover it all</Text>
            <View style={[styles.solutionBtn, { backgroundColor: '#2E7D32' }]}>
              <Text style={styles.solutionBtnText}>Get Quote →</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* ── HOME FURNITURE CATEGORIES ── */}
        <Text style={styles.sectionTitle}>Home Furniture</Text>
        <CategoryRow
          categories={homeCategories}
          selectedId={null}
          onSelect={handleCategoryPress}
        />

        {/* ── OFFICE FURNITURE CATEGORIES ── */}
        {officeCategories.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Office Furniture</Text>
            <CategoryRow
              categories={officeCategories}
              selectedId={null}
              onSelect={handleCategoryPress}
            />
          </>
        )}

        {/* Featured */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Products</Text>
          <TouchableOpacity onPress={() => {
            setSelectedCategoryId(null);
            navigation.navigate('ProductList');
          }}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={featured}
          keyExtractor={(p) => p.id}
          numColumns={2}
          scrollEnabled={false}
          contentContainerStyle={styles.grid}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
            />
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  greeting: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginTop: 2,
  },
  searchBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: { fontSize: 20 },
  sectionTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    paddingHorizontal: spacing.lg,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: spacing.lg,
  },
  seeAll: {
    color: colors.accent,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
  },
  grid: { paddingHorizontal: spacing.sm },
  // Solution Cards
  solutionRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
    gap: spacing.sm,
  },
  solutionCard: {
    flex: 1,
    borderRadius: 16,
    padding: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  officeCard: { backgroundColor: '#1565C0' },
  homeCard: { backgroundColor: '#1B5E20' },
  solutionIconWrap: { marginBottom: spacing.sm },
  solutionEmoji: { fontSize: 28 },
  solutionCardTitle: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold,
    color: '#fff',
    marginBottom: 4,
  },
  solutionCardDesc: {
    fontSize: typography.sizes.xs,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 16,
    marginBottom: spacing.md,
  },
  solutionBtn: {
    backgroundColor: '#0D47A1',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: spacing.sm,
    alignSelf: 'flex-start',
  },
  solutionBtnText: {
    color: '#fff',
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
  },
});
