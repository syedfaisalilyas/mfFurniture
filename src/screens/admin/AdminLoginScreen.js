import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import AppButton from '../../components/common/AppButton';
import AppTextInput from '../../components/common/AppTextInput';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';

export default function AdminLoginScreen({ navigation }) {
  const { adminLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

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
      await adminLogin(email.trim(), password);
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
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Back to User Login</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <View style={styles.iconBox}>
            <Text style={styles.iconText}>⚙️</Text>
          </View>
          <Text style={styles.title}>Admin Portal</Text>
          <Text style={styles.subtitle}>Restricted access — authorized personnel only</Text>
        </View>

        <View style={styles.card}>
          {apiError ? <Text style={styles.apiError}>{apiError}</Text> : null}

          <AppTextInput
            label="Admin Email"
            value={email}
            onChangeText={setEmail}
            placeholder="admin@mf.com"
            keyboardType="email-address"
            autoCapitalize="none"
            leftIcon="shield-outline"
            error={errors.email}
          />
          <AppTextInput
            label="Admin Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Admin password"
            secureTextEntry
            leftIcon="lock-closed-outline"
            error={errors.password}
          />

          <AppButton title="Access Admin Panel" onPress={handleLogin} loading={loading} style={styles.btn} />
        </View>

        <View style={styles.demo}>
          <Text style={styles.demoTitle}>Demo Admin Credentials</Text>
          <Text style={styles.demoText}>admin@mf.com / admin123</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.primary },
  container: { flexGrow: 1, paddingHorizontal: spacing.lg, paddingTop: 50, paddingBottom: spacing.xl },
  backBtn: { marginBottom: spacing.lg },
  backText: { color: colors.white + 'AA', fontSize: typography.sizes.sm },
  header: { alignItems: 'center', marginBottom: spacing.xl },
  iconBox: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.white + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  iconText: { fontSize: 32 },
  title: {
    color: colors.white,
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
  },
  subtitle: {
    color: colors.white + '88',
    fontSize: typography.sizes.sm,
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 20,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  apiError: {
    backgroundColor: colors.error + '15',
    color: colors.error,
    padding: spacing.sm,
    borderRadius: 8,
    marginBottom: spacing.md,
    fontSize: typography.sizes.sm,
  },
  btn: { marginTop: spacing.sm, backgroundColor: colors.primary },
  demo: { marginTop: spacing.lg, alignItems: 'center' },
  demoTitle: { color: colors.white + 'AA', fontSize: typography.sizes.xs, fontWeight: typography.weights.bold },
  demoText: { color: colors.white + '88', fontSize: typography.sizes.xs, marginTop: 4 },
});
