import React, { useState } from 'react';
import {View, Text, ScrollView, Image, TouchableOpacity,
  StyleSheet, FlatList, Dimensions, Alert, Modal, TextInput} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useProducts } from '../../../context/ProductContext';
import { resolveImageSource } from '../../../data/imageMapping';
import { useCart } from '../../../context/CartContext';
import { useWishlist } from '../../../context/WishlistContext';
import { useReviews } from '../../../context/ReviewContext';
import { useAuth } from '../../../context/AuthContext';
import ProductCard from '../../../components/products/ProductCard';
import AppButton from '../../../components/common/AppButton';
import { colors } from '../../../constants/colors';
import { spacing } from '../../../constants/spacing';
import { typography } from '../../../constants/typography';

const { width } = Dimensions.get('window');

export default function ProductDetailScreen({ navigation, route }) {
  const { productId } = route.params;
  const { getProductById, getProductsByCategory, categories } = useProducts();
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { getProductReviews, addReview, hasUserReviewed } = useReviews();
  const { user } = useAuth();

  const product = getProductById(productId);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [reviewModal, setReviewModal] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!product) {
    return <SafeAreaView style={styles.safe}><Text style={{ textAlign: 'center', marginTop: 40 }}>Product not found.</Text></SafeAreaView>;
  }

  const category = categories.find((c) => c.id === product.categoryId);
  const displayPrice = product.discountedPrice || product.price;
  const wishlisted = isWishlisted(product.id);
  const reviews = getProductReviews(product.id);
  const alreadyReviewed = hasUserReviewed(product.id, user?.id);
  const related = getProductsByCategory(product.categoryId).filter((p) => p.id !== product.id).slice(0, 6);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    Alert.alert('Added to Cart', `${product.name} (x${quantity}) added.`, [
      { text: 'Continue Shopping' },
      { text: 'View Cart', onPress: () => navigation.navigate('CartTab') },
    ]);
  };

  const handleSubmitReview = async () => {
    if (!reviewComment.trim()) {
      Alert.alert('Missing', 'Please write a comment.');
      return;
    }
    setSubmitting(true);
    await addReview(product.id, user, reviewRating, reviewComment.trim());
    setSubmitting(false);
    setReviewModal(false);
    setReviewComment('');
    setReviewRating(5);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.topRight}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => toggleWishlist(product)}>
            <Ionicons name={wishlisted ? 'heart' : 'heart-outline'} size={22} color={wishlisted ? colors.error : colors.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('CartTab')}>
            <Ionicons name="cart-outline" size={22} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Images */}
        <FlatList
          data={product.images.length > 0 ? product.images : ['https://via.placeholder.com/400']}
          keyExtractor={(_, i) => String(i)}
          horizontal pagingEnabled showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(e) => setActiveImage(Math.round(e.nativeEvent.contentOffset.x / width))}
          renderItem={({ item }) => <Image source={resolveImageSource(item)} style={styles.image} />}
        />
        {product.images.length > 1 && (
          <View style={styles.dots}>
            {product.images.map((_, i) => (
              <View key={i} style={[styles.dot, i === activeImage && styles.dotActive]} />
            ))}
          </View>
        )}

        <View style={styles.info}>
          {category && <Text style={styles.category}>{category.name}</Text>}
          <Text style={styles.name}>{product.name}</Text>

          <View style={styles.ratingRow}>
            {[1,2,3,4,5].map((s) => (
              <Ionicons key={s} name={s <= Math.round(product.rating) ? 'star' : 'star-outline'} size={16} color={colors.warning} />
            ))}
            <Text style={styles.ratingText}>{product.rating.toFixed(1)} ({product.reviewCount + reviews.length} reviews)</Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.price}>${displayPrice.toFixed(2)}</Text>
            {product.discountedPrice && <Text style={styles.originalPrice}>${product.price.toFixed(2)}</Text>}
            {product.discountedPrice && (
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>{Math.round(((product.price - product.discountedPrice) / product.price) * 100)}% OFF</Text>
              </View>
            )}
          </View>

          <Text style={[styles.stock, product.stock < 5 && styles.stockLow]}>
            {product.stock === 0 ? 'Out of Stock' : product.stock < 5 ? `Only ${product.stock} left!` : `In Stock (${product.stock})`}
          </Text>

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.desc}>{product.description}</Text>

          <Text style={styles.sectionTitle}>Quantity</Text>
          <View style={styles.qtyRow}>
            <TouchableOpacity style={styles.qtyBtn} onPress={() => setQuantity((q) => Math.max(1, q - 1))}>
              <Ionicons name="remove" size={20} color={colors.accent} />
            </TouchableOpacity>
            <Text style={styles.qty}>{quantity}</Text>
            <TouchableOpacity style={styles.qtyBtn} onPress={() => setQuantity((q) => Math.min(product.stock, q + 1))}>
              <Ionicons name="add" size={20} color={colors.accent} />
            </TouchableOpacity>
          </View>

          {/* Reviews */}
          <View style={styles.reviewsHeader}>
            <Text style={styles.sectionTitle}>Reviews ({reviews.length})</Text>
            {!alreadyReviewed && (
              <TouchableOpacity onPress={() => setReviewModal(true)}>
                <Text style={styles.addReviewLink}>+ Write a review</Text>
              </TouchableOpacity>
            )}
          </View>

          {reviews.length === 0 ? (
            <Text style={styles.noReviews}>No reviews yet. Be the first!</Text>
          ) : (
            reviews.slice(0, 3).map((r) => (
              <View key={r.id} style={styles.reviewCard}>
                <View style={styles.reviewTop}>
                  <View style={styles.reviewAvatar}>
                    <Text style={styles.reviewAvatarText}>{r.userName[0].toUpperCase()}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.reviewName}>{r.userName}</Text>
                    <View style={styles.reviewStars}>
                      {[1,2,3,4,5].map((s) => (
                        <Ionicons key={s} name={s <= r.rating ? 'star' : 'star-outline'} size={12} color={colors.warning} />
                      ))}
                    </View>
                  </View>
                  <Text style={styles.reviewDate}>
                    {new Date(r.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </Text>
                </View>
                <Text style={styles.reviewComment}>{r.comment}</Text>
              </View>
            ))
          )}

          {/* Related Products */}
          {related.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Related Products</Text>
              <FlatList
                data={related}
                keyExtractor={(p) => p.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingRight: spacing.sm }}
                renderItem={({ item }) => (
                  <View style={{ width: 160, marginRight: spacing.sm }}>
                    <ProductCard
                      product={item}
                      onPress={() => navigation.push('ProductDetail', { productId: item.id })}
                    />
                  </View>
                )}
              />
            </>
          )}
        </View>
      </ScrollView>

      {/* CTA Footer */}
      <View style={styles.footer}>
        <View style={styles.totalBox}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalPrice}>${(displayPrice * quantity).toFixed(2)}</Text>
        </View>
        <AppButton title="Add to Cart" onPress={handleAddToCart} disabled={product.stock === 0} style={styles.addBtn} />
      </View>

      {/* Review Modal */}
      <Modal visible={reviewModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Write a Review</Text>
            <View style={styles.starRow}>
              {[1,2,3,4,5].map((s) => (
                <TouchableOpacity key={s} onPress={() => setReviewRating(s)}>
                  <Ionicons name={s <= reviewRating ? 'star' : 'star-outline'} size={32} color={colors.warning} style={{ marginHorizontal: 4 }} />
                </TouchableOpacity>
              ))}
            </View>
            <TextInput
              style={styles.reviewInput}
              placeholder="Share your experience..."
              placeholderTextColor={colors.placeholder}
              value={reviewComment}
              onChangeText={setReviewComment}
              multiline
              numberOfLines={4}
            />
            <View style={styles.modalBtns}>
              <AppButton title="Cancel" variant="secondary" onPress={() => setReviewModal(false)} style={{ flex: 1, marginRight: spacing.sm }} />
              <AppButton title="Submit" onPress={handleSubmitReview} loading={submitting} style={{ flex: 1 }} />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  topRight: { flexDirection: 'row' },
  iconBtn: { padding: 6 },
  image: { width, height: 300, backgroundColor: colors.border },
  dots: { flexDirection: 'row', justifyContent: 'center', marginTop: spacing.sm },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.border, marginHorizontal: 3 },
  dotActive: { backgroundColor: colors.accent, width: 16 },
  info: { padding: spacing.lg },
  category: { fontSize: typography.sizes.xs, color: colors.accent, fontWeight: typography.weights.semiBold, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 },
  name: { fontSize: typography.sizes.xxl, fontWeight: typography.weights.bold, color: colors.textPrimary, marginBottom: spacing.sm },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md },
  ratingText: { fontSize: typography.sizes.sm, color: colors.textSecondary, marginLeft: spacing.sm },
  priceRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
  price: { fontSize: typography.sizes.xxxl, fontWeight: typography.weights.bold, color: colors.accent },
  originalPrice: { fontSize: typography.sizes.base, color: colors.textLight, textDecorationLine: 'line-through', marginLeft: spacing.sm },
  discountBadge: { backgroundColor: colors.error + '20', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 2, marginLeft: spacing.sm },
  discountText: { color: colors.error, fontSize: typography.sizes.xs, fontWeight: typography.weights.bold },
  stock: { fontSize: typography.sizes.sm, color: colors.success, marginBottom: spacing.md },
  stockLow: { color: colors.warning },
  sectionTitle: { fontSize: typography.sizes.base, fontWeight: typography.weights.bold, color: colors.textPrimary, marginBottom: spacing.sm, marginTop: spacing.md },
  desc: { fontSize: typography.sizes.md, color: colors.textSecondary, lineHeight: 22 },
  qtyRow: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.sm },
  qtyBtn: { width: 40, height: 40, borderRadius: 20, borderWidth: 1.5, borderColor: colors.accent, alignItems: 'center', justifyContent: 'center' },
  qty: { fontSize: typography.sizes.xl, fontWeight: typography.weights.bold, color: colors.textPrimary, marginHorizontal: spacing.lg, minWidth: 32, textAlign: 'center' },
  reviewsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.md },
  addReviewLink: { color: colors.accent, fontSize: typography.sizes.sm, fontWeight: typography.weights.medium },
  noReviews: { color: colors.textSecondary, fontSize: typography.sizes.sm, marginBottom: spacing.md },
  reviewCard: { backgroundColor: colors.surface, borderRadius: 12, padding: spacing.md, marginBottom: spacing.sm },
  reviewTop: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
  reviewAvatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', marginRight: spacing.sm },
  reviewAvatarText: { color: colors.white, fontWeight: typography.weights.bold },
  reviewName: { fontSize: typography.sizes.sm, fontWeight: typography.weights.semiBold, color: colors.textPrimary },
  reviewStars: { flexDirection: 'row', marginTop: 2 },
  reviewDate: { fontSize: typography.sizes.xs, color: colors.textSecondary },
  reviewComment: { fontSize: typography.sizes.sm, color: colors.textSecondary, lineHeight: 20 },
  footer: { flexDirection: 'row', alignItems: 'center', padding: spacing.lg, backgroundColor: colors.surface, borderTopWidth: 1, borderTopColor: colors.border },
  totalBox: { marginRight: spacing.lg },
  totalLabel: { fontSize: typography.sizes.xs, color: colors.textSecondary },
  totalPrice: { fontSize: typography.sizes.xl, fontWeight: typography.weights.bold, color: colors.textPrimary },
  addBtn: { flex: 1 },
  modalOverlay: { flex: 1, backgroundColor: colors.overlay, justifyContent: 'flex-end' },
  modalCard: { backgroundColor: colors.surface, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: spacing.xl },
  modalTitle: { fontSize: typography.sizes.xl, fontWeight: typography.weights.bold, color: colors.textPrimary, marginBottom: spacing.lg, textAlign: 'center' },
  starRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: spacing.lg },
  reviewInput: { backgroundColor: colors.background, borderRadius: 12, padding: spacing.md, fontSize: typography.sizes.sm, color: colors.textPrimary, borderWidth: 1, borderColor: colors.border, minHeight: 100, textAlignVertical: 'top', marginBottom: spacing.lg },
  modalBtns: { flexDirection: 'row' },
});
