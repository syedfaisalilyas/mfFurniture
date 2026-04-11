import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [items, setItems] = useState([]);
  const [wishlistIds, setWishlistIds] = useState(new Set());

  useEffect(() => {
    loadWishlist();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => loadWishlist());
    return () => subscription.unsubscribe();
  }, []);

  const loadWishlist = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setItems([]); setWishlistIds(new Set()); return; }

    const { data } = await supabase
      .from('wishlist')
      .select('product_id, products(*)')
      .eq('user_id', user.id);

    if (data) {
      const products = data.map((w) => ({
        id: w.products.id,
        name: w.products.name,
        price: parseFloat(w.products.price),
        discountedPrice: w.products.discounted_price ? parseFloat(w.products.discounted_price) : null,
        images: w.products.images || [],
        categoryId: w.products.category_id,
        stock: w.products.stock,
        isFeatured: w.products.is_featured,
        rating: parseFloat(w.products.rating),
        reviewCount: w.products.review_count,
      }));
      setItems(products);
      setWishlistIds(new Set(products.map((p) => p.id)));
    }
  };

  const toggleWishlist = async (product) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    if (wishlistIds.has(product.id)) {
      await supabase.from('wishlist').delete()
        .eq('user_id', user.id).eq('product_id', product.id);
      setItems((prev) => prev.filter((p) => p.id !== product.id));
      setWishlistIds((prev) => { const s = new Set(prev); s.delete(product.id); return s; });
    } else {
      await supabase.from('wishlist').insert({ user_id: user.id, product_id: product.id });
      setItems((prev) => [...prev, product]);
      setWishlistIds((prev) => new Set([...prev, product.id]));
    }
  };

  const isWishlisted = (productId) => wishlistIds.has(productId);

  return (
    <WishlistContext.Provider value={{ items, toggleWishlist, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
