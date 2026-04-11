import 'react-native-gesture-handler';
import React, { useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './src/context/AuthContext';
import { ProductProvider } from './src/context/ProductContext';
import { CartProvider } from './src/context/CartContext';
import { OrderProvider } from './src/context/OrderContext';
import { WishlistProvider } from './src/context/WishlistContext';
import { ReviewProvider } from './src/context/ReviewContext';
import { PromoProvider } from './src/context/PromoContext';
import { AddressProvider } from './src/context/AddressContext';
import RootNavigator from './src/navigation/RootNavigator';
import { addNotificationListener, addResponseListener } from './src/lib/notifications';
import WebContainer from './src/components/common/WebContainer';

export default function App() {
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    notificationListener.current = addNotificationListener((notification) => {
      console.log('Notification received:', notification);
    });

    responseListener.current = addResponseListener((response) => {
      console.log('Notification tapped:', response);
    });

    return () => {
      notificationListener.current?.remove();
      responseListener.current?.remove();
    };
  }, []);

  return (
    <WebContainer>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <OrderProvider>
              <WishlistProvider>
                <ReviewProvider>
                  <PromoProvider>
                    <AddressProvider>
                      <NavigationContainer>
                        <StatusBar style="light" />
                        <RootNavigator />
                      </NavigationContainer>
                    </AddressProvider>
                  </PromoProvider>
                </ReviewProvider>
              </WishlistProvider>
            </OrderProvider>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </WebContainer>
  );
}
