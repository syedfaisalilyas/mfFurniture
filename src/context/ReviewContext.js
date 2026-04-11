import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const ReviewContext = createContext(null);

export function ReviewProvider({ children }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    const { data } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setReviews(data.map(mapReview));
  };

  const mapReview = (r) => ({
    id: r.id,
    productId: r.product_id,
    userId: r.user_id,
    userName: r.user_name,
    rating: r.rating,
    comment: r.comment,
    createdAt: r.created_at,
  });

  const addReview = async (productId, user, rating, comment) => {
    const payload = {
      id: `r_${Date.now()}`,
      product_id: productId,
      user_id: user.id,
      user_name: user.name,
      rating,
      comment,
    };
    const { data, error } = await supabase.from('reviews').insert(payload).select().single();
    if (error) throw new Error(error.message);
    const mapped = mapReview(data);
    setReviews((prev) => [mapped, ...prev]);
    return mapped;
  };

  const getProductReviews = (productId) => reviews.filter((r) => r.productId === productId);

  const hasUserReviewed = (productId, userId) =>
    reviews.some((r) => r.productId === productId && r.userId === userId);

  return (
    <ReviewContext.Provider value={{ reviews, addReview, getProductReviews, hasUserReviewed }}>
      {children}
    </ReviewContext.Provider>
  );
}

export const useReviews = () => useContext(ReviewContext);
