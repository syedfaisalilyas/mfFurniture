import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { LOCAL_PRODUCT_IMAGES } from '../data/imageMapping';

const ProductContext = createContext(null);

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [banners, setBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    setIsLoading(true);
    const [productsRes, categoriesRes, bannersRes] = await Promise.all([
      supabase.from('products').select('*').order('created_at', { ascending: false }),
      supabase.from('categories').select('*').order('name'),
      supabase.from('banners').select('*'),
    ]);
    if (productsRes.data) setProducts(productsRes.data.map(mapProduct));
    if (categoriesRes.data) setCategories(categoriesRes.data.map(mapCategory));
    if (bannersRes.data) setBanners(bannersRes.data.map(mapBanner));
    setIsLoading(false);
  };

  // Map snake_case DB columns to camelCase
  const mapProduct = (p) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    price: parseFloat(p.price),
    discountedPrice: p.discounted_price ? parseFloat(p.discounted_price) : null,
    vendorPrice: p.vendor_price ? parseFloat(p.vendor_price) : null,
    categoryId: p.category_id,
    images: LOCAL_PRODUCT_IMAGES[p.id] || p.images || [],
    stock: p.stock,
    isFeatured: p.is_featured,
    rating: parseFloat(p.rating),
    reviewCount: p.review_count,
    createdAt: p.created_at,
  });

  const mapCategory = (c) => ({
    id: c.id,
    name: c.name,
    icon: c.icon,
    section: c.section || 'home',
  });

  const mapBanner = (b) => ({
    id: b.id,
    title: b.title,
    imageUrl: b.image_url,
    targetCategoryId: b.target_category_id,
  });

  const getFeaturedProducts = () => products.filter((p) => p.isFeatured);
  const getProductsByCategory = (categoryId) => products.filter((p) => p.categoryId === categoryId);
  const getProductById = (id) => products.find((p) => p.id === id);

  const getFilteredProducts = () => {
    let result = products;
    if (selectedCategoryId) result = result.filter((p) => p.categoryId === selectedCategoryId);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((p) =>
        p.name.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q)
      );
    }
    return result;
  };

  const addProduct = async (data) => {
    const payload = {
      id: `p_${Date.now()}`,
      name: data.name,
      description: data.description,
      price: data.price,
      discounted_price: data.discountedPrice || null,
      vendor_price: data.vendorPrice || null,
      category_id: data.categoryId,
      images: data.images,
      stock: data.stock,
      is_featured: data.isFeatured,
      rating: 0,
      review_count: 0,
    };
    const { data: inserted, error } = await supabase.from('products').insert(payload).select().single();
    if (error) throw new Error(error.message);
    const mapped = mapProduct(inserted);
    setProducts((prev) => [mapped, ...prev]);
    return mapped;
  };

  const updateProduct = async (id, data) => {
    const payload = {
      name: data.name,
      description: data.description,
      price: data.price,
      discounted_price: data.discountedPrice || null,
      vendor_price: data.vendorPrice || null,
      category_id: data.categoryId,
      images: data.images,
      stock: data.stock,
      is_featured: data.isFeatured,
    };
    const { error } = await supabase.from('products').update(payload).eq('id', id);
    if (error) throw new Error(error.message);
    setProducts((prev) => prev.map((p) => p.id === id ? { ...p, ...data } : p));
  };

  const deleteProduct = async (id) => {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) throw new Error(error.message);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // Category CRUD
  const addCategory = async (name, icon, section = 'home') => {
    const payload = { id: `cat_${Date.now()}`, name, icon, section };
    const { data, error } = await supabase.from('categories').insert(payload).select().single();
    if (error) throw new Error(error.message);
    setCategories((prev) => [...prev, mapCategory(data)]);
  };

  const updateCategory = async (id, name, icon, section) => {
    const { error } = await supabase.from('categories').update({ name, icon, section }).eq('id', id);
    if (error) throw new Error(error.message);
    setCategories((prev) => prev.map((c) => c.id === id ? { ...c, name, icon, section } : c));
  };

  const deleteCategory = async (id) => {
    const { error } = await supabase.from('categories').delete().eq('id', id);
    if (error) throw new Error(error.message);
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  // Banner CRUD
  const addBanner = async (data) => {
    const payload = {
      id: `ban_${Date.now()}`,
      title: data.title,
      image_url: data.imageUrl,
      target_category_id: data.targetCategoryId || null,
    };
    const { data: inserted, error } = await supabase.from('banners').insert(payload).select().single();
    if (error) throw new Error(error.message);
    setBanners((prev) => [...prev, mapBanner(inserted)]);
  };

  const updateBanner = async (id, data) => {
    const payload = {
      title: data.title,
      image_url: data.imageUrl,
      target_category_id: data.targetCategoryId || null,
    };
    const { error } = await supabase.from('banners').update(payload).eq('id', id);
    if (error) throw new Error(error.message);
    setBanners((prev) => prev.map((b) => b.id === id ? { ...b, ...data } : b));
  };

  const deleteBanner = async (id) => {
    const { error } = await supabase.from('banners').delete().eq('id', id);
    if (error) throw new Error(error.message);
    setBanners((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <ProductContext.Provider value={{
      products, categories, banners, isLoading,
      searchQuery, setSearchQuery,
      selectedCategoryId, setSelectedCategoryId,
      getFeaturedProducts, getProductsByCategory,
      getFilteredProducts, getProductById,
      addProduct, updateProduct, deleteProduct,
      addCategory, updateCategory, deleteCategory,
      addBanner, updateBanner, deleteBanner,
      refresh: loadAll,
    }}>
      {children}
    </ProductContext.Provider>
  );
}

export const useProducts = () => useContext(ProductContext);
