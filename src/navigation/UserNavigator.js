import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/user/home/HomeScreen';
import FurnitureSolutionScreen from '../screens/user/home/FurnitureSolutionScreen';
import ProductListScreen from '../screens/user/products/ProductListScreen';
import ProductDetailScreen from '../screens/user/products/ProductDetailScreen';
import CartScreen from '../screens/user/cart/CartScreen';
import CheckoutScreen from '../screens/user/cart/CheckoutScreen';
import OrderHistoryScreen from '../screens/user/orders/OrderHistoryScreen';
import OrderDetailScreen from '../screens/user/orders/OrderDetailScreen';
import ProfileScreen from '../screens/user/profile/ProfileScreen';
import WishlistScreen from '../screens/user/wishlist/WishlistScreen';
import AddressBookScreen from '../screens/user/profile/AddressBookScreen';

import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { colors } from '../constants/colors';
import { typography } from '../constants/typography';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const CartStack = createNativeStackNavigator();
const OrdersStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const WishlistStack = createNativeStackNavigator();

function HomeStackNav() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="ProductList" component={ProductListScreen} />
      <HomeStack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <HomeStack.Screen name="FurnitureSolution" component={FurnitureSolutionScreen} />
    </HomeStack.Navigator>
  );
}

function CartStackNav() {
  return (
    <CartStack.Navigator screenOptions={{ headerShown: false }}>
      <CartStack.Screen name="Cart" component={CartScreen} />
      <CartStack.Screen name="Checkout" component={CheckoutScreen} />
    </CartStack.Navigator>
  );
}

function OrdersStackNav() {
  return (
    <OrdersStack.Navigator screenOptions={{ headerShown: false }}>
      <OrdersStack.Screen name="OrderHistory" component={OrderHistoryScreen} />
      <OrdersStack.Screen name="OrderDetail" component={OrderDetailScreen} />
    </OrdersStack.Navigator>
  );
}

function WishlistStackNav() {
  return (
    <WishlistStack.Navigator screenOptions={{ headerShown: false }}>
      <WishlistStack.Screen name="Wishlist" component={WishlistScreen} />
      <WishlistStack.Screen name="ProductDetail" component={ProductDetailScreen} />
    </WishlistStack.Navigator>
  );
}

function ProfileStackNav() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
      <ProfileStack.Screen name="AddressBook" component={AddressBookScreen} />
    </ProfileStack.Navigator>
  );
}

function CartTabIcon({ color, size }) {
  const { totalItems } = useCart();
  return (
    <View>
      <Ionicons name="cart-outline" size={size} color={color} />
      {totalItems > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{totalItems > 9 ? '9+' : totalItems}</Text>
        </View>
      )}
    </View>
  );
}

function WishlistTabIcon({ color, size }) {
  const { items } = useWishlist();
  return (
    <View>
      <Ionicons name="heart-outline" size={size} color={color} />
      {items.length > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{items.length > 9 ? '9+' : items.length}</Text>
        </View>
      )}
    </View>
  );
}

export default function UserNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          borderTopColor: colors.border,
          paddingBottom: 6,
          paddingTop: 6,
          height: 62,
        },
        tabBarLabelStyle: {
          fontSize: typography.sizes.xs,
          fontWeight: typography.weights.medium,
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNav}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="WishlistTab"
        component={WishlistStackNav}
        options={{ tabBarLabel: 'Wishlist', tabBarIcon: WishlistTabIcon }}
      />
      <Tab.Screen
        name="CartTab"
        component={CartStackNav}
        options={{ tabBarLabel: 'Cart', tabBarIcon: CartTabIcon }}
      />
      <Tab.Screen
        name="OrdersTab"
        component={OrdersStackNav}
        options={{
          tabBarLabel: 'Orders',
          tabBarIcon: ({ color, size }) => <Ionicons name="receipt-outline" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStackNav}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -4,
    right: -6,
    backgroundColor: colors.error,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  badgeText: {
    color: colors.white,
    fontSize: 9,
    fontWeight: typography.weights.bold,
  },
});
