// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { corsHeaders } from "./cors";
import { FormSubmissionData } from "./FormSubmissionData";
import { prepareEmailPayload } from "./prepareEmailPayload";
import { sendEmail } from "./sendEmail";

console.log("Hello from Functions!");

Deno.serve(async (req) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response("Method Not Allowed", {
      status: 405,
      headers: corsHeaders,
    });
  }

  try {
    const formData = await req.formData();
    const data = Object.fromEntries(formData.entries()) as FormSubmissionData;

    const payload = prepareEmailPayload(data);
    await sendEmail(payload);

    // Respond with a redirect back to the original page
    return new Response("Success", {
      headers: {
        ...corsHeaders,
        Location: req.headers.get("referer"),
      },
      status: 302, // 302 Found for temporary redirect
    });
  } catch (error) {
    return new Response(error.message, {
      headers: { ...corsHeaders, Location: req.headers.get("referer") },
      status: 400,
    });
  }
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/quero-acolher-form-to-email' \
    --header 'Authorization: Bearer ' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
