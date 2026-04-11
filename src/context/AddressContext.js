import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AddressContext = createContext(null);

export function AddressProvider({ children }) {
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    loadAddresses();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => loadAddresses());
    return () => subscription.unsubscribe();
  }, []);

  const loadAddresses = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setAddresses([]); return; }

    const { data } = await supabase
      .from('addresses')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at');
    if (data) setAddresses(data.map(mapAddress));
  };

  const mapAddress = (a) => ({
    id: a.id,
    label: a.label,
    address: a.address,
    isDefault: a.is_default,
  });

  const addAddress = async (label, address) => {
    const { data: { user } } = await supabase.auth.getUser();
    const isFirstAddress = addresses.length === 0;
    const payload = {
      id: `addr_${Date.now()}`,
      user_id: user.id,
      label,
      address,
      is_default: isFirstAddress,
    };
    const { data, error } = await supabase.from('addresses').insert(payload).select().single();
    if (error) throw new Error(error.message);
    setAddresses((prev) => [...prev, mapAddress(data)]);
  };

  const updateAddress = async (id, label, address) => {
    const { error } = await supabase.from('addresses').update({ label, address }).eq('id', id);
    if (error) throw new Error(error.message);
    setAddresses((prev) => prev.map((a) => a.id === id ? { ...a, label, address } : a));
  };

  const deleteAddress = async (id) => {
    const { error } = await supabase.from('addresses').delete().eq('id', id);
    if (error) throw new Error(error.message);
    const remaining = addresses.filter((a) => a.id !== id);
    // If deleted was default, make first remaining the default
    if (remaining.length > 0 && !remaining.find((a) => a.isDefault)) {
      await setDefault(remaining[0].id);
    } else {
      setAddresses(remaining);
    }
  };

  const setDefault = async (id) => {
    const { data: { user } } = await supabase.auth.getUser();
    // Clear all defaults then set new one
    await supabase.from('addresses').update({ is_default: false }).eq('user_id', user.id);
    await supabase.from('addresses').update({ is_default: true }).eq('id', id);
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));
  };

  const getDefault = () => addresses.find((a) => a.isDefault) || addresses[0] || null;

  return (
    <AddressContext.Provider value={{ addresses, addAddress, updateAddress, deleteAddress, setDefault, getDefault }}>
      {children}
    </AddressContext.Provider>
  );
}

export const useAddress = () => useContext(AddressContext);
