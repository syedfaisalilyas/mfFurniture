import React, { useState } from 'react';
import {
  View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../lib/supabase';
import AppButton from '../../components/common/AppButton';
import AppTextInput from '../../components/common/AppTextInput';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';

export default function ResetPasswordScreen({ onDone }) {
  const [password, setPassword]   = useState('');
  const [confirm, setConfirm]     = useState('');
  const [loading, setLoading]     = useState(false);
  const [success, setSuccess]     = useState(false);
  const [errors, setErrors]       = useState({});
  const [apiError, setApiError]   = useState('');

  const validate = () => {
    const e = {};
    if (!password) e.password = 'Password is required';
    else if (password.length < 6) e.password = 'At least 6 characters';
    if (password !== confirm) e.confirm = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleReset = async () => {
    if (!validate()) return;
    setLoading(true);
    setApiError('');
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) { setApiError(error.message); return; }
    setSuccess(true);
    // Sign out so user logs in fresh with new password
    setTimeout(async () => {
      await supabase.auth.signOut();
      onDone?.();
    }, 2000);
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <SafeAreaView style={styles.flex}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <View style={styles.iconBox}>
              <Ionicons name="lock-closed-outline" size={40} color={colors.white} />
            </View>
            <Text style={styles.title}>Set New Password</Text>
            <Text style={styles.subtitle}>Choose a strong password for your account</Text>
          </View>

          <View style={styles.card}>
            {success ? (
              <View style={styles.successBox}>
                <Ionicons name="checkmark-circle" size={56} color={colors.success} />
                <Text style={styles.successTitle}>Password Updated!</Text>
                <Text style={styles.successText}>Redirecting you to login…</Text>
              </View>
            ) : (
              <>
                {apiError ? <Text style={styles.errorText}>{apiError}</Text> : null}
                <AppTextInput
                  label="New Password"
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
                  placeholder="Repeat new password"
                  secureTextEntry
                  leftIcon="lock-closed-outline"
                  error={errors.confirm}
                />
                <AppButton
                  title="Update Password"
                  onPress={handleReset}
                  loading={loading}
                  style={styles.btn}
                />
              </>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.primary },
  container: { flexGrow: 1, padding: spacing.lg, paddingTop: 60 },
  header: { alignItems: 'center', marginBottom: spacing.xl },
  iconBox: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center', marginBottom: spacing.md,
  },
  title: { color: colors.white, fontSize: typography.sizes.xxl, fontWeight: typography.weights.bold },
  subtitle: { color: colors.white + 'AA', fontSize: typography.sizes.sm, marginTop: spacing.sm, textAlign: 'center' },
  card: { backgroundColor: colors.surface, borderRadius: 20, padding: spacing.lg },
  errorText: { backgroundColor: colors.error + '15', color: colors.error, padding: spacing.sm, borderRadius: 8, marginBottom: spacing.md, fontSize: typography.sizes.sm },
  btn: { marginTop: spacing.sm },
  successBox: { alignItems: 'center', paddingVertical: spacing.lg },
  successTitle: { fontSize: typography.sizes.xl, fontWeight: typography.weights.bold, color: colors.textPrimary, marginTop: spacing.md },
  successText: { fontSize: typography.sizes.sm, color: colors.textSecondary, marginTop: spacing.sm },
});
