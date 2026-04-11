import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { registerForPushNotificationsAsync } from '../lib/notifications';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRecovering, setIsRecovering] = useState(false);

  useEffect(() => {
    // Check active session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchProfile(session.user);
      } else {
        setIsLoading(false);
      }
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        // User clicked the reset link in their email — show reset screen
        setIsRecovering(true);
        setIsLoading(false);
        return;
      }
      if (session?.user) {
        setIsRecovering(false);
        fetchProfile(session.user);
      } else {
        setUser(null);
        setIsRecovering(false);
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (authUser) => {
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .single();

      if (profile) {
        setUser({
          id: authUser.id,
          email: authUser.email,
          name: profile.name,
          phone: profile.phone,
          address: profile.address,
          role: profile.role,
          createdAt: profile.created_at,
        });
        // Register push notifications — silently ignore failures (Expo Go limitation)
        registerForPushNotificationsAsync()
          .then((token) => {
            if (token && token !== profile.push_token) {
              supabase.from('profiles').update({ push_token: token }).eq('id', authUser.id);
            }
          })
          .catch(() => {}); // Expo Go doesn't support push tokens — that's OK
      }
    } catch (_) {
      // Network or Supabase error — still unblock the loading screen
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single();

    if (profile?.role === 'admin') {
      await supabase.auth.signOut();
      throw new Error('Use Admin Portal to sign in as admin');
    }
  };

  const adminLogin = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single();

    if (profile?.role !== 'admin') {
      await supabase.auth.signOut();
      throw new Error('Access denied. Not an admin account.');
    }
  };

  const register = async (name, email, password) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name, role: 'user' } },
    });
    if (error) throw new Error(error.message);
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  const updateProfile = async (updates) => {
    const { error } = await supabase
      .from('profiles')
      .update({
        name: updates.name,
        phone: updates.phone,
        address: updates.address,
      })
      .eq('id', user.id);

    if (!error) {
      setUser((prev) => ({ ...prev, ...updates }));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAdmin: user?.role === 'admin',
        isRecovering,
        setIsRecovering,
        login,
        adminLogin,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
