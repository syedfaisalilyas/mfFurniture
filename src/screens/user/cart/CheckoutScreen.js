import React, { useState } from 'react';
import {View, Text, ScrollView, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, Modal} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../../../context/CartContext';
import { useOrders } from '../../../context/OrderContext';
import { useAuth } from '../../../context/AuthContext';
import { usePromo } from '../../../context/PromoContext';
import { useAddress } from '../../../context/AddressContext';
import { supabase } from '../../../lib/supabase';
import AppButton from '../../../components/common/AppButton';
import AppTextInput from '../../../components/common/AppTextInput';
import { colors } from '../../../constants/colors';
import { spacing } from '../../../constants/spacing';
import { typography } from '../../../constants/typography';

const PAYMENT_METHODS = [
  { id: 'cod',       label: 'Cash on Delivery',    icon: 'cash-outline',      color: '#27ae60' },
  { id: 'jazzcash',  label: 'JazzCash Wallet',      icon: 'phone-portrait-outline', color: '#CC0000' },
  { id: 'easypaisa', label: 'EasyPaisa Wallet',     icon: 'wallet-outline',    color: '#4CAF50' },
  { id: 'bank',      label: 'Bank Transfer',        icon: 'business-outline',  color: '#2980b9' },
];

// ── Payment Config ─────────────────────────────────────────────────────────
const JAZZCASH_MERCHANT_NUMBER  = '03098999180';
const EASYPAISA_MERCHANT_NUMBER = '03098999180';
// TODO: Replace with your real bank account details
const BANK_DETAILS = 'Bank: ___________\nAccount Title: MF Furniture\nAccount No: ___________\nIBAN: ___________';
// ───────────────────────────────────────────────────────────────────────────

const DELIVERY_FEE = 49;

export default function CheckoutScreen({ navigation }) {
  const { items, totalPrice, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const { user } = useAuth();
  const { applyPromo } = usePromo();
  const { addresses, getDefault } = useAddress();

  const defaultAddr = getDefault();
  const [address, setAddress]           = useState(defaultAddr?.address || user?.address || '');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [mobileNumber, setMobileNumber] = useState('');
  const [promoCode, setPromoCode]       = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError]     = useState('');
  const [errors, setErrors]             = useState({});
  const [loading, setLoading]           = useState(false);
  const [success, setSuccess]           = useState(false);
  const [placedOrder, setPlacedOrder]   = useState(null);
  const [jcStatus, setJcStatus]         = useState(''); // jazzcash response message

  const discount   = appliedPromo ? Math.round(totalPrice * appliedPromo.discount) : 0;
  const grandTotal = totalPrice + DELIVERY_FEE - discount;

  const handleApplyPromo = () => {
    setPromoError('');
    try {
      const promo = applyPromo(promoCode);
      setAppliedPromo(promo);
    } catch (e) {
      setPromoError(e.message);
      setAppliedPromo(null);
    }
  };

  const validate = () => {
    const e = {};
    if (!address.trim()) e.address = 'Shipping address is required';
    if ((paymentMethod === 'jazzcash' || paymentMethod === 'easypaisa') && !mobileNumber.trim()) {
      e.mobile = 'Enter your registered mobile number';
    }
    if ((paymentMethod === 'jazzcash' || paymentMethod === 'easypaisa') &&
        mobileNumber && !/^03\d{9}$/.test(mobileNumber.replace(/\s/g, ''))) {
      e.mobile = 'Enter a valid Pakistani number (03XXXXXXXXX)';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const initiateJazzCash = async (orderId) => {
    setJcStatus('Sending request to JazzCash…');
    const { data, error } = await supabase.functions.invoke('initiate-jazzcash-payment', {
      body: {
        amount: grandTotal,
        mobileNumber: mobileNumber.replace(/\s/g, ''),
        orderId,
      },
    });
    if (error || data?.error) throw new Error(data?.error || 'JazzCash request failed');
    if (!data.success) throw new Error(data.responseMessage || 'Payment declined by JazzCash');
    // responseCode 121 = pending approval on phone — that's fine, order proceeds
    setJcStatus('');
    return data.txnRefNo;
  };

  const handlePlaceOrder = async () => {
    if (!validate()) return;
    setLoading(true);
    setErrors({});
    try {
      const cart           = { items, totalPrice: grandTotal };
      const methodLabel    = PAYMENT_METHODS.find((m) => m.id === paymentMethod)?.label;
      const order          = await placeOrder(cart, user, address.trim(), methodLabel);

      if (paymentMethod === 'jazzcash') {
        await initiateJazzCash(order.id);
      }

      await clearCart();
      setPlacedOrder(order);
      setSuccess(true);
    } catch (err) {
      setErrors({ general: err.message });
    } finally {
      setLoading(false);
      setJcStatus('');
    }
  };

  const selectedMethod = PAYMENT_METHODS.find((m) => m.id === paymentMethod);

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.title}>Checkout</Text>
          <View style={{ width: 34 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

          {/* Shipping */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Shipping Address</Text>
            {addresses.length > 0 && (
              <View style={styles.savedAddressRow}>
                {addresses.map((a) => (
                  <TouchableOpacity
                    key={a.id}
                    style={[styles.addrChip, address === a.address && styles.addrChipActive]}
                    onPress={() => setAddress(a.address)}
                  >
                    <Ionicons name="location-outline" size={14}
                      color={address === a.address ? colors.white : colors.textSecondary} />
                    <Text style={[styles.addrChipText, address === a.address && styles.addrChipTextActive]}>
                      {a.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            <AppTextInput
              value={address}
              onChangeText={setAddress}
              placeholder="Enter your full address"
              leftIcon="location-outline"
              error={errors.address}
              multiline
            />
          </View>

          {/* Payment Method */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Payment Method</Text>
            {PAYMENT_METHODS.map((m) => (
              <TouchableOpacity
                key={m.id}
                style={[styles.paymentOption, paymentMethod === m.id && styles.paymentSelected]}
                onPress={() => { setPaymentMethod(m.id); setErrors({}); setMobileNumber(''); }}
              >
                <View style={[styles.methodIcon, { backgroundColor: m.color + '18' }]}>
                  <Ionicons name={m.icon} size={20} color={m.color} />
                </View>
                <Text style={[styles.paymentLabel, paymentMethod === m.id && styles.paymentLabelActive]}>
                  {m.label}
                </Text>
                {paymentMethod === m.id && <Ionicons name="checkmark-circle" size={20} color={colors.accent} />}
              </TouchableOpacity>
            ))}
          </View>

          {/* JazzCash details panel */}
          {paymentMethod === 'jazzcash' && (
            <View style={[styles.section, styles.jcPanel]}>
              <View style={styles.jcHeader}>
                <View style={[styles.jcBadge, { backgroundColor: '#CC0000' }]}>
                  <Text style={styles.jcBadgeText}>JazzCash</Text>
                </View>
                <Text style={styles.jcSubtitle}>Direct wallet debit</Text>
              </View>
              <Text style={styles.jcInfo}>
                Enter your JazzCash-registered mobile number. A debit request of{' '}
                <Text style={styles.bold}>PKR {grandTotal.toFixed(0)}</Text> will be sent to your JazzCash app for approval.
              </Text>
              <AppTextInput
                label="JazzCash Mobile Number"
                value={mobileNumber}
                onChangeText={setMobileNumber}
                placeholder="03XXXXXXXXX"
                keyboardType="phone-pad"
                leftIcon="phone-portrait-outline"
                error={errors.mobile}
              />
              {jcStatus ? (
                <View style={styles.statusRow}>
                  <Ionicons name="sync-outline" size={14} color={colors.accent} />
                  <Text style={styles.statusText}>{jcStatus}</Text>
                </View>
              ) : null}
            </View>
          )}

          {/* EasyPaisa details panel */}
          {paymentMethod === 'easypaisa' && (
            <View style={[styles.section, styles.epPanel]}>
              <View style={styles.jcHeader}>
                <View style={[styles.jcBadge, { backgroundColor: '#4CAF50' }]}>
                  <Text style={styles.jcBadgeText}>EasyPaisa</Text>
                </View>
                <Text style={styles.jcSubtitle}>Mobile wallet transfer</Text>
              </View>
              <Text style={styles.jcInfo}>
                Send <Text style={styles.bold}>PKR {grandTotal.toFixed(0)}</Text> to the EasyPaisa account below, then place your order. We'll confirm within 1 hour.
              </Text>
              <View style={styles.accountBox}>
                <Ionicons name="wallet-outline" size={18} color="#4CAF50" />
                <Text style={styles.accountNumber}>{EASYPAISA_MERCHANT_NUMBER}</Text>
                <Text style={styles.accountLabel}>mfFurniture</Text>
              </View>
              <AppTextInput
                label="Your EasyPaisa Number (for reference)"
                value={mobileNumber}
                onChangeText={setMobileNumber}
                placeholder="03XXXXXXXXX"
                keyboardType="phone-pad"
                leftIcon="phone-portrait-outline"
                error={errors.mobile}
              />
            </View>
          )}

          {/* Bank Transfer details panel */}
          {paymentMethod === 'bank' && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Bank Account Details</Text>
              <View style={styles.accountBox}>
                <Ionicons name="business-outline" size={18} color="#2980b9" />
                <Text style={[styles.accountNumber, { color: '#2980b9' }]}>{BANK_DETAILS}</Text>
              </View>
              <Text style={styles.jcInfo}>
                Transfer <Text style={styles.bold}>PKR {grandTotal.toFixed(0)}</Text> to the account above. Include your name as the reference. We'll confirm within 24 hours.
              </Text>
            </View>
          )}

          {/* Promo Code */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Promo Code</Text>
            {appliedPromo ? (
              <View style={styles.appliedPromo}>
                <Ionicons name="pricetag" size={18} color={colors.success} />
                <Text style={styles.appliedText}>{promoCode.toUpperCase()} — {appliedPromo.label} applied!</Text>
                <TouchableOpacity onPress={() => { setAppliedPromo(null); setPromoCode(''); }}>
                  <Ionicons name="close-circle" size={18} color={colors.error} />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.promoRow}>
                <AppTextInput
                  value={promoCode}
                  onChangeText={(t) => { setPromoCode(t); setPromoError(''); }}
                  placeholder="Enter promo code"
                  autoCapitalize="characters"
                  error={promoError}
                  style={{ flex: 1, marginBottom: 0 }}
                />
                <TouchableOpacity style={styles.applyBtn} onPress={handleApplyPromo}>
                  <Text style={styles.applyText}>Apply</Text>
                </TouchableOpacity>
              </View>
            )}
            <Text style={styles.promoHint}>Try: WELCOME10 · SAVE20 · FURNITURE15 · MF50</Text>
          </View>

          {/* Order Summary */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Order Summary</Text>
            {items.map((i) => (
              <View key={i.product.id} style={styles.summaryRow}>
                <Text style={styles.summaryName} numberOfLines={1}>{i.product.name}</Text>
                <Text style={styles.summaryQty}>x{i.quantity}</Text>
                <Text style={styles.summaryPrice}>PKR {(i.product.price * i.quantity).toFixed(0)}</Text>
              </View>
            ))}
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <Text style={styles.summaryName}>Delivery</Text>
              <Text style={styles.summaryPrice}>PKR {DELIVERY_FEE}</Text>
            </View>
            {appliedPromo && (
              <View style={styles.summaryRow}>
                <Text style={[styles.summaryName, { color: colors.success }]}>Discount ({appliedPromo.label})</Text>
                <Text style={[styles.summaryPrice, { color: colors.success }]}>-PKR {discount.toFixed(0)}</Text>
              </View>
            )}
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>PKR {grandTotal.toFixed(0)}</Text>
            </View>
          </View>

          {errors.general ? (
            <View style={styles.errorBanner}>
              <Ionicons name="alert-circle-outline" size={16} color={colors.error} />
              <Text style={styles.errorText}>{errors.general}</Text>
            </View>
          ) : null}
        </ScrollView>

        <View style={styles.footer}>
          <AppButton
            title={`${paymentMethod === 'jazzcash' ? 'Pay via JazzCash' : paymentMethod === 'easypaisa' ? 'Confirm EasyPaisa Order' : 'Place Order'}  •  PKR ${grandTotal.toFixed(0)}`}
            onPress={handlePlaceOrder}
            loading={loading}
          />
        </View>
      </KeyboardAvoidingView>

      {/* Success Modal */}
      <Modal visible={success} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Ionicons name="checkmark-circle" size={64} color={colors.success} />
            <Text style={styles.successTitle}>Order Placed!</Text>
            <Text style={styles.successSub}>
              {paymentMethod === 'jazzcash'
                ? `JazzCash debit request sent to ${mobileNumber}.\nApprove it in your JazzCash app.`
                : paymentMethod === 'easypaisa'
                ? `Send PKR ${grandTotal.toFixed(0)} to ${EASYPAISA_MERCHANT_NUMBER}.\nOrder #${placedOrder?.id} will be confirmed within 1 hour.`
                : paymentMethod === 'bank'
                ? `Transfer PKR ${grandTotal.toFixed(0)} to our HBL account.\nOrder #${placedOrder?.id} will be confirmed within 24 hours.`
                : `Your order #${placedOrder?.id} has been placed successfully.`}
            </Text>
            <AppButton title="View My Orders" onPress={() => { setSuccess(false); navigation.navigate('OrdersTab'); }} style={styles.successBtn} />
            <AppButton title="Continue Shopping" variant="ghost" onPress={() => { setSuccess(false); navigation.navigate('HomeTab'); }} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  backBtn: { padding: 6 },
  title: { fontSize: typography.sizes.lg, fontWeight: typography.weights.bold, color: colors.textPrimary },
  scroll: { padding: spacing.lg, paddingBottom: spacing.xxl },
  section: { backgroundColor: colors.surface, borderRadius: 14, padding: spacing.md, marginBottom: spacing.md },
  sectionTitle: { fontSize: typography.sizes.base, fontWeight: typography.weights.bold, color: colors.textPrimary, marginBottom: spacing.md },
  paymentOption: { flexDirection: 'row', alignItems: 'center', padding: spacing.md, borderRadius: 10, borderWidth: 1, borderColor: colors.border, marginBottom: spacing.sm, backgroundColor: colors.background },
  paymentSelected: { borderColor: colors.accent, backgroundColor: colors.accent + '10' },
  methodIcon: { width: 36, height: 36, borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginRight: spacing.sm },
  paymentLabel: { flex: 1, fontSize: typography.sizes.sm, color: colors.textSecondary },
  paymentLabelActive: { color: colors.textPrimary, fontWeight: typography.weights.medium },
  jcPanel: { borderLeftWidth: 3, borderLeftColor: '#CC0000' },
  epPanel: { borderLeftWidth: 3, borderLeftColor: '#4CAF50' },
  jcHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
  jcBadge: { borderRadius: 6, paddingHorizontal: spacing.sm, paddingVertical: 3, marginRight: spacing.sm },
  jcBadgeText: { color: '#fff', fontSize: typography.sizes.xs, fontWeight: typography.weights.bold },
  jcSubtitle: { fontSize: typography.sizes.xs, color: colors.textSecondary },
  jcInfo: { fontSize: typography.sizes.sm, color: colors.textSecondary, lineHeight: 20, marginBottom: spacing.md },
  bold: { fontWeight: typography.weights.bold, color: colors.textPrimary },
  accountBox: { flexDirection: 'row', alignItems: 'flex-start', backgroundColor: colors.background, borderRadius: 10, padding: spacing.md, marginBottom: spacing.md },
  accountNumber: { flex: 1, marginLeft: spacing.sm, fontSize: typography.sizes.sm, fontWeight: typography.weights.semiBold, color: colors.textPrimary, lineHeight: 22 },
  accountLabel: { fontSize: typography.sizes.xs, color: colors.textSecondary, marginLeft: spacing.sm, marginTop: 2 },
  statusRow: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.xs },
  statusText: { fontSize: typography.sizes.xs, color: colors.accent, marginLeft: spacing.xs },
  promoRow: { flexDirection: 'row', alignItems: 'flex-start' },
  applyBtn: { backgroundColor: colors.primary, borderRadius: 10, paddingHorizontal: spacing.md, height: 50, alignItems: 'center', justifyContent: 'center', marginLeft: spacing.sm },
  applyText: { color: colors.white, fontWeight: typography.weights.semiBold },
  appliedPromo: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.success + '15', borderRadius: 10, padding: spacing.md },
  appliedText: { flex: 1, marginLeft: spacing.sm, color: colors.success, fontWeight: typography.weights.medium, fontSize: typography.sizes.sm },
  promoHint: { fontSize: typography.sizes.xs, color: colors.textSecondary, marginTop: spacing.sm },
  summaryRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
  summaryName: { flex: 1, fontSize: typography.sizes.sm, color: colors.textSecondary },
  summaryQty: { fontSize: typography.sizes.sm, color: colors.textSecondary, marginRight: spacing.sm },
  summaryPrice: { fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.textPrimary },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: spacing.sm },
  totalLabel: { flex: 1, fontSize: typography.sizes.base, fontWeight: typography.weights.bold, color: colors.textPrimary },
  totalValue: { fontSize: typography.sizes.lg, fontWeight: typography.weights.bold, color: colors.accent },
  savedAddressRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: spacing.sm },
  addrChip: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.sm, paddingVertical: 6, borderRadius: 16, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.background, marginRight: spacing.sm, marginBottom: spacing.sm },
  addrChipActive: { borderColor: colors.accent, backgroundColor: colors.accent },
  addrChipText: { fontSize: typography.sizes.xs, color: colors.textSecondary, marginLeft: 4 },
  addrChipTextActive: { color: colors.white, fontWeight: typography.weights.medium },
  footer: { padding: spacing.lg, backgroundColor: colors.surface, borderTopWidth: 1, borderTopColor: colors.border },
  errorBanner: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.error + '15', borderRadius: 10, padding: spacing.md, marginBottom: spacing.md },
  errorText: { flex: 1, marginLeft: spacing.sm, fontSize: typography.sizes.sm, color: colors.error },
  modalOverlay: { flex: 1, backgroundColor: colors.overlay, alignItems: 'center', justifyContent: 'center', padding: spacing.xl },
  modalCard: { backgroundColor: colors.surface, borderRadius: 20, padding: spacing.xl, width: '100%', alignItems: 'center' },
  successTitle: { fontSize: typography.sizes.xxl, fontWeight: typography.weights.bold, color: colors.textPrimary, marginTop: spacing.md, marginBottom: spacing.sm },
  successSub: { fontSize: typography.sizes.sm, color: colors.textSecondary, textAlign: 'center', marginBottom: spacing.lg, lineHeight: 22 },
  successBtn: { width: '100%', marginBottom: spacing.sm },
});
