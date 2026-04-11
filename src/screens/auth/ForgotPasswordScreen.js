import React, { useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../lib/supabase';
import AppButton from '../../components/common/AppButton';
import AppTextInput from '../../components/common/AppTextInput';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSend = async () => {
    if (!email.trim()) { setError('Please enter your email'); return; }
    setLoading(true);
    setError('');
    const { error: err } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: 'mffurniture://reset-password',
    });
    setLoading(false);
    if (err) { setError(err.message); return; }
    setSent(true);
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <SafeAreaView style={styles.flex}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={22} color={colors.white} />
          </TouchableOpacity>

          <View style={styles.header}>
            <View style={styles.iconBox}>
              <Ionicons name="lock-open-outline" size={40} color={colors.white} />
            </View>
            <Text style={styles.title}>Forgot Password?</Text>
            <Text style={styles.subtitle}>
              Enter your email and we'll send you a reset link
            </Text>
          </View>

          {sent ? (
            <View style={styles.card}>
              <Ionicons name="mail-open-outline" size={56} color={colors.success} style={styles.sentIcon} />
              <Text style={styles.sentTitle}>Email Sent!</Text>
              <Text style={styles.sentText}>
                Check your inbox at {email} for the password reset link.
              </Text>
              <AppButton
                title="Back to Login"
                onPress={() => navigation.navigate('Login')}
                style={styles.btn}
              />
            </View>
          ) : (
            <View style={styles.card}>
              {error ? <Text style={styles.errorText}>{error}</Text> : null}
              <AppTextInput
                label="Email Address"
                value={email}
                onChangeText={setEmail}
                placeholder="you@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                leftIcon="mail-outline"
              />
              <AppButton
                title="Send Reset Link"
                onPress={handleSend}
                loading={loading}
                style={styles.btn}
              />
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.cancelBtn}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.primary },
  container: { flexGrow: 1, padding: spacing.lg, paddingTop: 50 },
  backBtn: { padding: 6, marginBottom: spacing.lg },
  header: { alignItems: 'center', marginBottom: spacing.xl },
  iconBox: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center', marginBottom: spacing.md,
  },
  title: { color: colors.white, fontSize: typography.sizes.xxl, fontWeight: typography.weights.bold },
  subtitle: { color: colors.white + 'AA', fontSize: typography.sizes.sm, textAlign: 'center', marginTop: spacing.sm, lineHeight: 20 },
  card: { backgroundColor: colors.surface, borderRadius: 20, padding: spacing.lg },
  errorText: { backgroundColor: colors.error + '15', color: colors.error, padding: spacing.sm, borderRadius: 8, marginBottom: spacing.md, fontSize: typography.sizes.sm },
  btn: { marginTop: spacing.sm },
  cancelBtn: { alignItems: 'center', marginTop: spacing.md, padding: spacing.sm },
  cancelText: { color: colors.textSecondary, fontSize: typography.sizes.sm },
  sentIcon: { alignSelf: 'center', marginBottom: spacing.md },
  sentTitle: { fontSize: typography.sizes.xl, fontWeight: typography.weights.bold, color: colors.textPrimary, textAlign: 'center', marginBottom: spacing.sm },
  sentText: { fontSize: typography.sizes.sm, color: colors.textSecondary, textAlign: 'center', lineHeight: 20, marginBottom: spacing.lg },
});
