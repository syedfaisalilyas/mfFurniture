import { useState, useEffect } from "react";
import * as api from "../api";

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  category?: string;
  image?: string;
  rating?: number;
  inStock?: boolean;
}

export function useProducts(category?: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    setError(null);
    setLoading(true);
    try {
      const data = await api.fetchProducts({ category });
      setProducts(
        data || [
          // Fallback mock data if API fails
          { id: "1", name: "Modern Sofa", price: 45000, category: "living" },
          { id: "2", name: "Dining Table", price: 35000, category: "dining" },
          { id: "3", name: "Bed Frame", price: 55000, category: "bedroom" },
          { id: "4", name: "Office Chair", price: 25000, category: "office" },
        ]
      );
    } catch (err: any) {
      console.error("Error fetching products:", err);
      // Keep mock data on error
      setProducts([
        { id: "1", name: "Modern Sofa", price: 45000, category: "living" },
        { id: "2", name: "Dining Table", price: 35000, category: "dining" },
        { id: "3", name: "Bed Frame", price: 55000, category: "bedroom" },
        { id: "4", name: "Office Chair", price: 25000, category: "office" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return { products, loading, error, refetch: fetchProducts };
}

export function useProductById(id: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    setError(null);
    setLoading(true);
    try {
      const data = await api.fetchProductById(id);
      setProduct(data);
    } catch (err: any) {
      console.error("Error fetching product:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { product, loading, error };
}
