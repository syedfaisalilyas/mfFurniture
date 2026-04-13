import { supabase } from "./supabase";

/**
 * Fetch products from database
 */
export const fetchProducts = async (options: { category?: string; limit?: number } = {}) => {
  let query = supabase.from("products").select("*");

  if (options.category) {
    query = query.eq("category", options.category);
  }

  if (options.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
};

/**
 * Fetch product by ID
 */
export const fetchProductById = async (id: string) => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
};

/**
 * Fetch user orders
 */
export const fetchUserOrders = async (userId: string) => {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
};

/**
 * Create order
 */
export const createOrder = async (orderData: any) => {
  const { data, error } = await supabase
    .from("orders")
    .insert([orderData])
    .select();
  if (error) throw error;
  return data[0];
};

/**
 * Fetch user profile
 */
export const fetchUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  if (error) throw error;
  return data;
};

/**
 * Update user profile
 */
export const updateUserProfile = async (userId: string, updates: any) => {
  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", userId)
    .select()
    .single();
  if (error) throw error;
  return data;
};
