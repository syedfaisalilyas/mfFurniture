import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const OrderContext = createContext(null);

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadOrders();

    // Listen for auth changes to reload orders
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      loadOrders();
    });
    return () => subscription.unsubscribe();
  }, []);

  const loadOrders = async () => {
    setIsLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setOrders([]); setIsLoading(false); return; }

    const { data: profile } = await supabase
      .from('profiles').select('role').eq('id', user.id).single();

    let query = supabase
      .from('orders')
      .select(`*, order_items(*)`)
      .order('created_at', { ascending: false });

    // Admins see all orders; users see only their own
    if (profile?.role !== 'admin') {
      query = query.eq('user_id', user.id);
    }

    const { data } = await query;
    if (data) setOrders(data.map(mapOrder));
    setIsLoading(false);
  };

  const mapOrder = (o) => ({
    id: o.id,
    userId: o.user_id,
    userName: o.user_name,
    userEmail: o.user_email,
    items: (o.order_items || []).map((i) => ({
      productId: i.product_id,
      productName: i.product_name,
      productImage: i.product_image,
      quantity: i.quantity,
      unitPrice: parseFloat(i.unit_price),
    })),
    totalAmount: parseFloat(o.total_amount),
    status: o.status,
    shippingAddress: o.shipping_address,
    paymentMethod: o.payment_method,
    createdAt: o.created_at,
    updatedAt: o.updated_at,
  });

  const placeOrder = async (cart, user, shippingAddress, paymentMethod) => {
    const orderId = `ORD-${Date.now()}`;

    // Insert order
    const { error: orderError } = await supabase.from('orders').insert({
      id: orderId,
      user_id: user.id,
      user_name: user.name,
      user_email: user.email,
      total_amount: cart.totalPrice,
      status: 'pending',
      shipping_address: shippingAddress,
      payment_method: paymentMethod,
    });
    if (orderError) throw new Error(orderError.message);

    // Insert order items
    const items = cart.items.map((i) => ({
      order_id: orderId,
      product_id: i.product.id,
      product_name: i.product.name,
      product_image: (typeof i.product.images?.[0] === 'string' ? i.product.images[0] : '') || '',
      quantity: i.quantity,
      unit_price: i.product.price,
    }));
    const { error: itemsError } = await supabase.from('order_items').insert(items);
    if (itemsError) throw new Error(itemsError.message);

    await loadOrders();
    return { id: orderId };
  };

  const updateOrderStatus = async (orderId, status) => {
    const { error } = await supabase
      .from('orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', orderId);
    if (error) throw new Error(error.message);
    setOrders((prev) =>
      prev.map((o) => o.id === orderId ? { ...o, status, updatedAt: new Date().toISOString() } : o)
    );
  };

  const getUserOrders = (userId) => orders.filter((o) => o.userId === userId);

  return (
    <OrderContext.Provider value={{
      orders, isLoading,
      placeOrder, updateOrderStatus, getUserOrders,
      refresh: loadOrders,
    }}>
      {children}
    </OrderContext.Provider>
  );
}

export const useOrders = () => useContext(OrderContext);
