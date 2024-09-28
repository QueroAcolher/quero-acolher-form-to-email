export function sendEmail(payload: unknown) {
  const sendgridApiKey = Deno.env.get("SENDGRID_API_KEY") || "";
  const sendgridApiUrl = Deno.env.get("SENDGRID_API_URL") || "";

  const headers = new Headers({
    Authorization: `Bearer ${sendgridApiKey}`,
    "Content-Type": "application/json",
  });

  return fetch(sendgridApiUrl, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });
}
