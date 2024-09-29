export function sendEmail(payload: unknown) {
  const headers = new Headers( {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
  });

  return await fetch(Deno.env.get('RESEND_API_URL'), {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });
}
