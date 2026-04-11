import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminDashboardScreen from '../screens/admin/AdminDashboardScreen';
import AdminProductListScreen from '../screens/admin/products/AdminProductListScreen';
import AdminProductFormScreen from '../screens/admin/products/AdminProductFormScreen';
import AdminOrderListScreen from '../screens/admin/orders/AdminOrderListScreen';
import AdminOrderDetailScreen from '../screens/admin/orders/AdminOrderDetailScreen';
import AdminCategoryListScreen from '../screens/admin/categories/AdminCategoryListScreen';
import AdminBannerListScreen from '../screens/admin/banners/AdminBannerListScreen';
import AdminUserListScreen from '../screens/admin/users/AdminUserListScreen';
import AdminAnalyticsScreen from '../screens/admin/AdminAnalyticsScreen';

const Stack = createNativeStackNavigator();

export default function AdminNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
      <Stack.Screen name="AdminProductList" component={AdminProductListScreen} />
      <Stack.Screen name="AdminProductForm" component={AdminProductFormScreen} />
      <Stack.Screen name="AdminOrderList" component={AdminOrderListScreen} />
      <Stack.Screen name="AdminOrderDetail" component={AdminOrderDetailScreen} />
      <Stack.Screen name="AdminCategoryList" component={AdminCategoryListScreen} />
      <Stack.Screen name="AdminBannerList" component={AdminBannerListScreen} />
      <Stack.Screen name="AdminUserList" component={AdminUserListScreen} />
      <Stack.Screen name="AdminAnalytics" component={AdminAnalyticsScreen} />
    </Stack.Navigator>
  );
}
