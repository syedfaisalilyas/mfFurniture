import AsyncStorage from '@react-native-async-storage/async-storage';

export const KEYS = {
  USER: '@mf_user',
  PRODUCTS: '@mf_products',
  CATEGORIES: '@mf_categories',
  BANNERS: '@mf_banners',
  CART: '@mf_cart',
  ORDERS: '@mf_orders',
};

export const StorageService = {
  async get(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch {
      return null;
    }
  },

  async set(key, value) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn('StorageService.set error:', e);
    }
  },

  async remove(key) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.warn('StorageService.remove error:', e);
    }
  },
};
