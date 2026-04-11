import React, { useState } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../lib/supabase';
import AppButton from '../../components/common/AppButton';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';

export default function EmailConfirmationScreen({ route, navigation }) {
  const { email } = route.params || {};
  const [resending, setResending] = useState(false);
  const [resent, setResent] = useState(false);

  const handleResend = async () => {
    setResending(true);
    await supabase.auth.resend({ type: 'signup', email });
    setResending(false);
    setResent(true);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.iconBox}>
          <Ionicons name="mail-outline" size={72} color={colors.accent} />
        </View>
        <Text style={styles.title}>Verify Your Email</Text>
        <Text style={styles.subtitle}>
          We sent a confirmation link to{'\n'}
          <Text style={styles.email}>{email}</Text>
          {'\n\n'}Open the link in your email to activate your account.
        </Text>

        {resent && (
          <View style={styles.resentBadge}>
            <Ionicons name="checkmark-circle" size={16} color={colors.success} />
            <Text style={styles.resentText}>Email resent successfully</Text>
          </View>
        )}

        <AppButton
          title={resent ? 'Resend Again' : 'Resend Email'}
          variant="secondary"
          onPress={handleResend}
          loading={resending}
          style={styles.btn}
        />
        <AppButton
          title="Back to Login"
          variant="ghost"
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl },
  iconBox: {
    width: 120, height: 120, borderRadius: 60,
    backgroundColor: colors.accent + '15',
    alignItems: 'center', justifyContent: 'center', marginBottom: spacing.lg,
  },
  title: { fontSize: typography.sizes.xxl, fontWeight: typography.weights.bold, color: colors.textPrimary, marginBottom: spacing.md },
  subtitle: { fontSize: typography.sizes.base, color: colors.textSecondary, textAlign: 'center', lineHeight: 24, marginBottom: spacing.lg },
  email: { color: colors.accent, fontWeight: typography.weights.semiBold },
  resentBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.success + '15', borderRadius: 10, padding: spacing.sm, marginBottom: spacing.md },
  resentText: { color: colors.success, fontSize: typography.sizes.sm, marginLeft: spacing.sm },
  btn: { width: '100%', marginBottom: spacing.sm },
});
