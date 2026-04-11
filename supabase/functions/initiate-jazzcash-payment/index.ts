import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// JazzCash MWALLET direct debit flow:
// 1. App sends amount + customer mobile
// 2. This function builds the signed request and calls JazzCash API
// 3. JazzCash sends a debit notification to the customer's JazzCash app
// 4. Returns success/failure

async function hmacSHA256(key: string, data: string): Promise<string> {
  const enc = new TextEncoder();
  const cryptoKey = await crypto.subtle.importKey(
    'raw', enc.encode(key),
    { name: 'HMAC', hash: 'SHA-256' },
    false, ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', cryptoKey, enc.encode(data));
  return Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function formatDateTime(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { amount, mobileNumber, orderId } = await req.json();

    if (!amount || !mobileNumber || !orderId) {
      throw new Error('amount, mobileNumber, and orderId are required');
    }

    const merchantId    = Deno.env.get('JAZZCASH_MERCHANT_ID');
    const password      = Deno.env.get('JAZZCASH_PASSWORD');
    const integritySalt = Deno.env.get('JAZZCASH_INTEGRITY_SALT');
    const isSandbox     = Deno.env.get('JAZZCASH_SANDBOX') !== 'false';

    if (!merchantId || !password || !integritySalt) {
      throw new Error('JazzCash credentials not configured. Set JAZZCASH_MERCHANT_ID, JAZZCASH_PASSWORD, JAZZCASH_INTEGRITY_SALT in Supabase secrets.');
    }

    const now    = new Date();
    const expiry = new Date(now.getTime() + 60 * 60 * 1000); // +1 hour
    const txnRef = `T${formatDateTime(now)}`;
    // JazzCash expects amount in paisa (1 PKR = 100 paisa)
    const amountPaisa = String(Math.round(amount * 100));

    const params: Record<string, string> = {
      pp_Amount:              amountPaisa,
      pp_BankID:              'TBANK',
      pp_BillReference:       `ORDER-${orderId}`,
      pp_Description:         'mfFurniture Order Payment',
      pp_Language:            'EN',
      pp_MerchantID:          merchantId,
      pp_MobileNumber:        mobileNumber,
      pp_Password:            password,
      pp_ProductID:           'RETL',
      pp_SubMerchantID:       '',
      pp_TxnCurrency:         'PKR',
      pp_TxnDateTime:         formatDateTime(now),
      pp_TxnExpiryDateTime:   formatDateTime(expiry),
      pp_TxnRefNo:            txnRef,
      pp_TxnType:             'MWALLET',
      pp_Version:             '2.0',
    };

    // Build hash: sort pp_ keys, join values with &, prepend salt&
    const hashData = integritySalt + '&' +
      Object.keys(params)
        .sort()
        .filter(k => k.startsWith('pp_') && params[k] !== '')
        .map(k => params[k])
        .join('&');

    params.pp_SecureHash = await hmacSHA256(integritySalt, hashData);

    const apiUrl = isSandbox
      ? 'https://sandbox.jazzcash.com.pk/ApplicationAPI/API/2.0/Purchase/DoMWalletTransaction'
      : 'https://payments.jazzcash.com.pk/ApplicationAPI/API/2.0/Purchase/DoMWalletTransaction';

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    const result = await response.json();

    // pp_ResponseCode '000' = success, '121' = pending (user must approve on phone)
    const success = result.pp_ResponseCode === '000' || result.pp_ResponseCode === '121';

    return new Response(
      JSON.stringify({
        success,
        responseCode: result.pp_ResponseCode,
        responseMessage: result.pp_ResponseMessage,
        txnRefNo: txnRef,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }
});
