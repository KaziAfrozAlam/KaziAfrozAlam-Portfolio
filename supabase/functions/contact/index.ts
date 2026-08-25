// Edge function: persist contact-form submissions.
// Deploy:  supabase functions deploy contact
import { log } from '../_shared/logger.ts';

interface ContactPayload {
  name: string;
  email: string;
  message: string;
  source?: string;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    await log('contact', 'info', 'contact request received');

    const body = (await req.json()) as ContactPayload;
    if (!body.name || !body.email || !body.message) {
      return new Response(
        JSON.stringify({ error: 'name, email and message are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const url = Deno.env.get('SUPABASE_URL');
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!url || !serviceKey) {
      await log('contact', 'error', 'server not configured');
      return new Response(
        JSON.stringify({ error: 'server not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const res = await fetch(`${url}/rest/v1/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        name: body.name,
        email: body.email,
        message: body.message,
        source: body.source ?? 'website',
      }),
    });

    if (!res.ok) {
      await log('contact', 'error', 'insert failed', { status: res.status });
      return new Response(
        JSON.stringify({ error: 'failed to save contact' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    await log('contact', 'info', 'contact saved');
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    await log('contact', 'error', 'unhandled error', { error: String(err) });
    return new Response(
      JSON.stringify({ error: 'internal error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }
});
