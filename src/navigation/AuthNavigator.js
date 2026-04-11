import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnboardingScreen from '../screens/auth/OnboardingScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import AdminLoginScreen from '../screens/admin/AdminLoginScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import EmailConfirmationScreen from '../screens/auth/EmailConfirmationScreen';
import AppLoader from '../components/common/AppLoader';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  const [onboarded, setOnboarded] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('@mf_onboarded').then((v) => setOnboarded(!!v));
  }, []);

  if (onboarded === null) return <AppLoader />;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!onboarded && <Stack.Screen name="Onboarding" component={OnboardingScreen} />}
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="AdminLogin" component={AdminLoginScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="EmailConfirmation" component={EmailConfirmationScreen} />
    </Stack.Navigator>
  );
}
