import { config } from 'https://deno.land/x/dotenv/mod.ts';

const env = config();

export async function sendEmail(payload) {
  const headers = new Headers({
    Authorization: `Bearer ${env.SENDGRID_API_KEY}`,
    'Content-Type': 'application/json',
  });

  return fetch(env.SENDGRID_API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });
}
