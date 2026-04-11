import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const STATUS_MESSAGES: Record<string, { title: string; body: string }> = {
  confirmed:   { title: 'Order Confirmed!',    body: 'Your order has been confirmed and is being prepared.' },
  processing:  { title: 'Order Processing',    body: 'Your order is currently being processed.' },
  shipped:     { title: 'Order Shipped!',       body: 'Your order is on the way. Track it in the app.' },
  delivered:   { title: 'Order Delivered!',     body: 'Your order has been delivered. Enjoy your furniture!' },
  cancelled:   { title: 'Order Cancelled',      body: 'Your order has been cancelled.' },
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // This function is triggered by a DB webhook on orders table UPDATE
    // Payload: { type: "UPDATE", table: "orders", record: {...}, old_record: {...} }
    const payload = await req.json();
    const record = payload.record;
    const oldRecord = payload.old_record;

    // Only act when status actually changed
    if (!record || record.status === oldRecord?.status) {
      return new Response(JSON.stringify({ skipped: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const message = STATUS_MESSAGES[record.status];
    if (!message) {
      return new Response(JSON.stringify({ skipped: true, reason: 'no message for status' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Look up the user's push token
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('push_token')
      .eq('id', record.user_id)
      .single();

    if (error || !profile?.push_token) {
      return new Response(JSON.stringify({ skipped: true, reason: 'no push token' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Send via Expo Push API
    const expoPushRes = await fetch('https://exp.host/--/exponent-push-notification/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        to: profile.push_token,
        title: message.title,
        body: `${message.body}\nOrder #${record.id}`,
        data: { orderId: record.id, screen: 'OrderDetail' },
        sound: 'default',
        priority: 'high',
      }),
    });

    const result = await expoPushRes.json();

    return new Response(JSON.stringify({ sent: true, result }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
