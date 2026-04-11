import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { signInWithGoogle } from '../../lib/oauth';
import AppButton from '../../components/common/AppButton';
import AppTextInput from '../../components/common/AppTextInput';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setApiError('');
    try {
      await signInWithGoogle();
    } catch (err) {
      if (err.message !== 'cancelled') {
        setApiError(err.message);
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  const validate = () => {
    const e = {};
    if (!email.trim()) e.email = 'Email is required';
    if (!password) e.password = 'Password is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    setLoading(true);
    setApiError('');
    try {
      await login(email.trim(), password);
    } catch (err) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <View style={styles.logoBox}>
            <Text style={styles.logoText}>MF</Text>
          </View>
          <Text style={styles.brand}>mfFurniture</Text>
          <Text style={styles.tagline}>Furnish Your Dreams</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>

          {apiError ? <Text style={styles.apiError}>{apiError}</Text> : null}

          <AppTextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            leftIcon="mail-outline"
            error={errors.email}
          />
          <AppTextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Your password"
            secureTextEntry
            leftIcon="lock-closed-outline"
            error={errors.password}
          />

          <AppButton title="Sign In" onPress={handleLogin} loading={loading} style={styles.btn} />

          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} style={styles.forgotBtn}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          <View style={styles.row}>
            <Text style={styles.rowText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.link}>Register</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.divider}>
            <View style={styles.line} />
            <Text style={styles.or}>OR</Text>
            <View style={styles.line} />
          </View>

          <TouchableOpacity
            style={styles.googleBtn}
            onPress={handleGoogleLogin}
            disabled={googleLoading}
          >
            <Ionicons name="logo-google" size={20} color="#EA4335" />
            <Text style={styles.googleText}>
              {googleLoading ? 'Signing in...' : 'Continue with Google'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.adminLink}
            onPress={() => navigation.navigate('AdminLogin')}
          >
            <Text style={styles.adminText}>Admin Portal</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.demo}>
          <Text style={styles.demoTitle}>Demo Credentials</Text>
          <Text style={styles.demoText}>User: user@mf.com / user123</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.primary },
  container: { flexGrow: 1, paddingHorizontal: spacing.lg, paddingTop: 60, paddingBottom: spacing.xl },
  header: { alignItems: 'center', marginBottom: spacing.xl },
  logoBox: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  logoText: { color: colors.white, fontSize: 28, fontWeight: typography.weights.bold },
  brand: { color: colors.white, fontSize: typography.sizes.xxl, fontWeight: typography.weights.bold },
  tagline: { color: colors.white + 'AA', fontSize: typography.sizes.sm, marginTop: 4 },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  title: { fontSize: typography.sizes.xxl, fontWeight: typography.weights.bold, color: colors.textPrimary },
  subtitle: { fontSize: typography.sizes.md, color: colors.textSecondary, marginBottom: spacing.lg, marginTop: 4 },
  apiError: {
    backgroundColor: colors.error + '15',
    color: colors.error,
    padding: spacing.sm,
    borderRadius: 8,
    marginBottom: spacing.md,
    fontSize: typography.sizes.sm,
  },
  btn: { marginTop: spacing.sm },
  row: { flexDirection: 'row', justifyContent: 'center', marginTop: spacing.md },
  rowText: { color: colors.textSecondary, fontSize: typography.sizes.sm },
  link: { color: colors.accent, fontSize: typography.sizes.sm, fontWeight: typography.weights.semiBold },
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: spacing.md },
  line: { flex: 1, height: 1, backgroundColor: colors.border },
  or: { marginHorizontal: spacing.sm, color: colors.textSecondary, fontSize: typography.sizes.xs },
  forgotBtn: { alignItems: 'center', marginTop: spacing.sm, padding: spacing.sm },
  forgotText: { color: colors.accent, fontSize: typography.sizes.sm },
  googleBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.border, borderRadius: 10, padding: spacing.md, marginBottom: spacing.sm, backgroundColor: colors.background },
  googleText: { marginLeft: spacing.sm, fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.textPrimary },
  adminLink: { alignItems: 'center', padding: spacing.sm },
  adminText: { color: colors.primary, fontSize: typography.sizes.sm, fontWeight: typography.weights.medium },
  demo: { marginTop: spacing.lg, alignItems: 'center' },
  demoTitle: { color: colors.white + 'AA', fontSize: typography.sizes.xs, fontWeight: typography.weights.bold },
  demoText: { color: colors.white + '88', fontSize: typography.sizes.xs, marginTop: 4 },
});
