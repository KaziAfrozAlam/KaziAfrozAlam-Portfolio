/**
 * Shared structured logger for Supabase Edge Functions.
 *
 * - Always writes a JSON line to stdout (captured by the platform).
 * - Best-effort writes to the `edge_logs` table using the service-role key,
 *   so logs survive even if the function crashes before returning.
 */

export type LogLevel = 'info' | 'warn' | 'error' | 'debug';

export interface LogMeta {
  // deno-lint-ignore no-explicit-any
  [key: string]: any;
}

export async function log(
  functionName: string,
  level: LogLevel,
  message: string,
  metadata?: LogMeta,
): Promise<void> {
  const entry = {
    function_name: functionName,
    level,
    message,
    metadata: metadata ?? null,
    created_at: new Date().toISOString(),
  };

  // 1) Always emit to stdout for platform log capture.
  console.log(JSON.stringify(entry));

  // 2) Best-effort persistence into the edge_logs table.
  try {
    const url = Deno.env.get('SUPABASE_URL');
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!url || !serviceKey) return;

    const res = await fetch(`${url}/rest/v1/edge_logs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        function_name: functionName,
        level,
        message,
        metadata: metadata ?? null,
      }),
    });

    if (!res.ok) {
      console.error('edge_logs insert failed', res.status, await res.text());
    }
  } catch (err) {
    console.error('edge_logs insert error', err);
  }
}
