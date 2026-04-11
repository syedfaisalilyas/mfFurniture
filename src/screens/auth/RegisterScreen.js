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

export default function RegisterScreen({ navigation }) {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = 'Name is required';
    if (!email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Invalid email format';
    if (!password) e.password = 'Password is required';
    else if (password.length < 6) e.password = 'At least 6 characters';
    if (password !== confirm) e.confirm = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;
    setLoading(true);
    setApiError('');
    try {
      await register(name.trim(), email.trim(), password);
      navigation.navigate('EmailConfirmation', { email: email.trim() });
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
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.header}>
          <View style={styles.logoBox}>
            <Text style={styles.logoText}>MF</Text>
          </View>
          <Text style={styles.brand}>Create Account</Text>
        </View>

        <View style={styles.card}>
          {apiError ? <Text style={styles.apiError}>{apiError}</Text> : null}

          <AppTextInput
            label="Full Name"
            value={name}
            onChangeText={setName}
            placeholder="John Doe"
            leftIcon="person-outline"
            error={errors.name}
          />
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
            placeholder="Min. 6 characters"
            secureTextEntry
            leftIcon="lock-closed-outline"
            error={errors.password}
          />
          <AppTextInput
            label="Confirm Password"
            value={confirm}
            onChangeText={setConfirm}
            placeholder="Repeat password"
            secureTextEntry
            leftIcon="lock-closed-outline"
            error={errors.confirm}
          />

          <AppButton title="Create Account" onPress={handleRegister} loading={loading} style={styles.btn} />

          <View style={styles.row}>
            <Text style={styles.rowText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.link}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.primary },
  container: { flexGrow: 1, paddingHorizontal: spacing.lg, paddingTop: 50, paddingBottom: spacing.xl },
  topBar: { marginBottom: spacing.sm },
  backBtn: { paddingVertical: spacing.sm },
  backText: { color: colors.white, fontSize: typography.sizes.sm },
  header: { alignItems: 'center', marginBottom: spacing.lg },
  logoBox: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  logoText: { color: colors.white, fontSize: 22, fontWeight: typography.weights.bold },
  brand: { color: colors.white, fontSize: typography.sizes.xxl, fontWeight: typography.weights.bold },
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
});
