import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  TextInput, Alert, Linking, KeyboardAvoidingView, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../constants/colors';
import { spacing } from '../../../constants/spacing';
import { typography } from '../../../constants/typography';

const OFFICE_PACKAGES = [
  { id: 'small', label: 'Small Office', desc: 'Up to 5 workstations, reception & meeting room', icon: 'business-outline' },
  { id: 'medium', label: 'Medium Office', desc: '5–20 workstations, conference room & lounge', icon: 'people-outline' },
  { id: 'large', label: 'Large Office', desc: '20+ workstations, multiple conference rooms', icon: 'globe-outline' },
  { id: 'custom', label: 'Custom Requirements', desc: 'Tell us exactly what you need', icon: 'construct-outline' },
];

const HOME_PACKAGES = [
  { id: 'single_room', label: 'Single Room', desc: 'Furnish one specific room only', icon: 'bed-outline' },
  { id: 'apartment', label: 'Full Apartment', desc: 'Living room, bedroom, dining & kitchen', icon: 'home-outline' },
  { id: 'villa', label: 'Full Villa / House', desc: 'Complete house — every room furnished', icon: 'business-outline' },
  { id: 'custom', label: 'Custom Requirements', desc: 'Mix and match what you need', icon: 'construct-outline' },
];

export default function FurnitureSolutionScreen({ navigation, route }) {
  const { type } = route.params || {}; // 'office' | 'home'
  const isOffice = type === 'office';

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [requirements, setRequirements] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const packages = isOffice ? OFFICE_PACKAGES : HOME_PACKAGES;

  const handleSubmit = () => {
    if (!name.trim()) { Alert.alert('Required', 'Please enter your name.'); return; }
    if (!phone.trim()) { Alert.alert('Required', 'Please enter your phone number.'); return; }
    if (!selectedPackage) { Alert.alert('Required', 'Please select a package.'); return; }

    // In production, this would POST to your backend / Supabase table
    setSubmitted(true);
  };

  const handleWhatsApp = () => {
    const pkg = packages.find((p) => p.id === selectedPackage);
    const msg = encodeURIComponent(
      `Hi MF Furniture! I'm interested in a *${isOffice ? 'Complete Office' : 'Complete Home'} Furniture Solution*.\n\n` +
      `Package: ${pkg?.label || selectedPackage}\n` +
      `Name: ${name}\n` +
      `Requirements: ${requirements || 'Not specified'}`
    );
    Linking.openURL(`https://wa.me/923098999180?text=${msg}`);
  };

  if (submitted) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={22} color={colors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{isOffice ? 'Office Solutions' : 'Home Solutions'}</Text>
          <View style={{ width: 34 }} />
        </View>
        <View style={styles.successContainer}>
          <View style={styles.successIcon}>
            <Ionicons name="checkmark-circle" size={72} color={isOffice ? '#2196F3' : '#4CAF50'} />
          </View>
          <Text style={styles.successTitle}>Request Submitted!</Text>
          <Text style={styles.successDesc}>
            Thank you, {name}! Our team will contact you within 24 hours to discuss your{' '}
            {isOffice ? 'office' : 'home'} furniture requirements and provide the best design solutions.
          </Text>
          <TouchableOpacity style={[styles.whatsappBtn, isOffice && { backgroundColor: '#2196F3' }]} onPress={handleWhatsApp}>
            <Ionicons name="logo-whatsapp" size={20} color={colors.white} />
            <Text style={styles.whatsappBtnText}>Chat on WhatsApp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.backToHomeBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.backToHomeBtnText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={[styles.header, isOffice && { backgroundColor: '#1565C0' }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{isOffice ? 'Office Furniture Solutions' : 'Home Furniture Solutions'}</Text>
        <View style={{ width: 34 }} />
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

          {/* Hero Banner */}
          <View style={[styles.heroBanner, isOffice && { backgroundColor: '#E3F2FD' }]}>
            <Ionicons
              name={isOffice ? 'business' : 'home'}
              size={40}
              color={isOffice ? '#1565C0' : '#2E7D32'}
            />
            <Text style={[styles.heroTitle, isOffice && { color: '#1565C0' }]}>
              {isOffice ? 'Complete Office Setup' : 'Your Dream Home'}
            </Text>
            <Text style={styles.heroDesc}>
              {isOffice
                ? 'We design and furnish your entire office — from workstations to conference rooms — with premium quality furniture at the best prices.'
                : 'Whether it\'s a single room or your entire home, we provide the best furniture designs tailored to your taste and budget.'}
            </Text>

            {/* Features */}
            {(isOffice ? [
              'Custom design consultation',
              'All office furniture categories',
              'Bulk pricing & discounts',
              'Professional installation',
              'After-sale warranty support',
            ] : [
              'Full home or single room',
              'Sofas, beds, wardrobes & more',
              'Design consultation included',
              'Budget-friendly packages',
              'Delivery & installation',
            ]).map((f) => (
              <View key={f} style={styles.featureRow}>
                <Ionicons name="checkmark-circle" size={16} color={isOffice ? '#1565C0' : '#2E7D32'} />
                <Text style={styles.featureText}>{f}</Text>
              </View>
            ))}
          </View>

          {/* Package Selection */}
          <Text style={styles.sectionLabel}>Select Your Package</Text>
          {packages.map((pkg) => (
            <TouchableOpacity
              key={pkg.id}
              style={[
                styles.packageCard,
                selectedPackage === pkg.id && styles.packageCardActive,
                isOffice && selectedPackage === pkg.id && { borderColor: '#1565C0', backgroundColor: '#E3F2FD' },
              ]}
              onPress={() => setSelectedPackage(pkg.id)}
            >
              <View style={[styles.packageIcon, isOffice && selectedPackage === pkg.id && { backgroundColor: '#1565C0' + '20' }]}>
                <Ionicons
                  name={pkg.icon}
                  size={24}
                  color={selectedPackage === pkg.id ? (isOffice ? '#1565C0' : colors.accent) : colors.textSecondary}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.packageLabel, selectedPackage === pkg.id && { color: isOffice ? '#1565C0' : colors.accent }]}>
                  {pkg.label}
                </Text>
                <Text style={styles.packageDesc}>{pkg.desc}</Text>
              </View>
              {selectedPackage === pkg.id && (
                <Ionicons name="checkmark-circle" size={22} color={isOffice ? '#1565C0' : colors.accent} />
              )}
            </TouchableOpacity>
          ))}

          {/* Contact Form */}
          <Text style={styles.sectionLabel}>Your Details</Text>

          <Text style={styles.inputLabel}>Your Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            placeholderTextColor={colors.placeholder}
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.inputLabel}>Phone Number *</Text>
          <TextInput
            style={styles.input}
            placeholder="+92 300 0000000"
            placeholderTextColor={colors.placeholder}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />

          <Text style={styles.inputLabel}>Additional Requirements (optional)</Text>
          <TextInput
            style={[styles.input, styles.textarea]}
            placeholder={isOffice
              ? 'e.g. 10 workstations, 1 boardroom table for 12, reception area...'
              : 'e.g. 3 bedrooms, living room, need modern minimalist style...'}
            placeholderTextColor={colors.placeholder}
            value={requirements}
            onChangeText={setRequirements}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />

          <TouchableOpacity
            style={[styles.submitBtn, isOffice && { backgroundColor: '#1565C0' }]}
            onPress={handleSubmit}
          >
            <Ionicons name="send-outline" size={18} color={colors.white} />
            <Text style={styles.submitBtnText}>Request Free Consultation</Text>
          </TouchableOpacity>

          <View style={styles.orRow}>
            <View style={styles.orLine} />
            <Text style={styles.orText}>OR</Text>
            <View style={styles.orLine} />
          </View>

          <TouchableOpacity style={styles.whatsappBtn} onPress={() => {
            const msg = encodeURIComponent(`Hi MF Furniture! I'm interested in a ${isOffice ? 'Complete Office' : 'Complete Home'} Furniture Solution.`);
            Linking.openURL(`https://wa.me/923098999180?text=${msg}`);
          }}>
            <Ionicons name="logo-whatsapp" size={20} color={colors.white} />
            <Text style={styles.whatsappBtnText}>Chat Directly on WhatsApp</Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: colors.primary, paddingHorizontal: spacing.md, paddingVertical: spacing.md,
  },
  backBtn: { padding: 6 },
  headerTitle: { color: colors.white, fontSize: typography.sizes.base, fontWeight: typography.weights.bold, flex: 1, textAlign: 'center' },
  scroll: { padding: spacing.lg, paddingBottom: 40 },
  heroBanner: {
    backgroundColor: '#E8F5E9', borderRadius: 16, padding: spacing.lg,
    alignItems: 'center', marginBottom: spacing.lg,
  },
  heroTitle: {
    fontSize: typography.sizes.xl, fontWeight: typography.weights.bold,
    color: '#2E7D32', marginTop: spacing.sm, marginBottom: spacing.sm, textAlign: 'center',
  },
  heroDesc: {
    fontSize: typography.sizes.sm, color: colors.textSecondary,
    textAlign: 'center', lineHeight: 20, marginBottom: spacing.md,
  },
  featureRow: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', marginBottom: 4 },
  featureText: { fontSize: typography.sizes.sm, color: colors.textPrimary, marginLeft: spacing.sm },
  sectionLabel: {
    fontSize: typography.sizes.base, fontWeight: typography.weights.bold,
    color: colors.textPrimary, marginBottom: spacing.sm, marginTop: spacing.md,
  },
  packageCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface,
    borderRadius: 12, padding: spacing.md, marginBottom: spacing.sm,
    borderWidth: 2, borderColor: colors.border,
    shadowColor: colors.cardShadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.5, shadowRadius: 4, elevation: 2,
  },
  packageCardActive: { borderColor: colors.accent, backgroundColor: colors.accent + '0D' },
  packageIcon: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center', marginRight: spacing.md,
  },
  packageLabel: { fontSize: typography.sizes.base, fontWeight: typography.weights.semiBold, color: colors.textPrimary },
  packageDesc: { fontSize: typography.sizes.xs, color: colors.textSecondary, marginTop: 2 },
  inputLabel: { fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.textPrimary, marginBottom: 6 },
  input: {
    backgroundColor: colors.surface, borderRadius: 10, borderWidth: 1,
    borderColor: colors.border, padding: spacing.md, fontSize: typography.sizes.base,
    color: colors.textPrimary, marginBottom: spacing.md,
  },
  textarea: { height: 100 },
  submitBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: colors.primary, borderRadius: 12, padding: spacing.md,
    marginTop: spacing.sm, gap: 8,
  },
  submitBtnText: { color: colors.white, fontSize: typography.sizes.base, fontWeight: typography.weights.bold },
  orRow: { flexDirection: 'row', alignItems: 'center', marginVertical: spacing.md },
  orLine: { flex: 1, height: 1, backgroundColor: colors.border },
  orText: { fontSize: typography.sizes.sm, color: colors.textSecondary, marginHorizontal: spacing.md },
  whatsappBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#25D366', borderRadius: 12, padding: spacing.md, gap: 8,
  },
  whatsappBtnText: { color: colors.white, fontSize: typography.sizes.base, fontWeight: typography.weights.bold },
  // Success Screen
  successContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl },
  successIcon: { marginBottom: spacing.lg },
  successTitle: { fontSize: typography.sizes.xxl || 24, fontWeight: typography.weights.bold, color: colors.textPrimary, marginBottom: spacing.md },
  successDesc: { fontSize: typography.sizes.base, color: colors.textSecondary, textAlign: 'center', lineHeight: 22, marginBottom: spacing.xl },
  backToHomeBtn: { marginTop: spacing.md, padding: spacing.md },
  backToHomeBtnText: { fontSize: typography.sizes.base, color: colors.accent, fontWeight: typography.weights.semiBold },
});
