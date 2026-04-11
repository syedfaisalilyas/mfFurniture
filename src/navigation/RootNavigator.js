import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AuthNavigator from './AuthNavigator';
import UserNavigator from './UserNavigator';
import AdminNavigator from './AdminNavigator';
import AppLoader from '../components/common/AppLoader';
import SplashScreen from '../screens/SplashScreen';
import ResetPasswordScreen from '../screens/auth/ResetPasswordScreen';

export default function RootNavigator() {
  const { user, isLoading, isAdmin, isRecovering, setIsRecovering } = useAuth();
  const [splashDone, setSplashDone] = useState(false);

  if (!splashDone) return <SplashScreen onFinish={() => setSplashDone(true)} />;
  if (isLoading) return <AppLoader />;

  // User clicked "Reset Password" link in their email
  if (isRecovering) {
    return <ResetPasswordScreen onDone={() => setIsRecovering(false)} />;
  }

  if (!user) return <AuthNavigator />;
  if (isAdmin) return <AdminNavigator />;
  return <UserNavigator />;
}
