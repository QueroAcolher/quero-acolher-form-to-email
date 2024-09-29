export function sendEmail(payload: unknown) {
  const headers = new Headers({
    "Content-Type": "application/json",
    Authorization: `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
  });

  const result = await fetch(Deno.env.get('RESEND_API_URL'), {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });

  if (result.statusCode) {
    return new Response(JSON.stringify(result), {
      status: 503,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
    });
  }

  return result;
}
