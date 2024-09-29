import { type FormSubmissionData } from "./FormSubmissionData.ts";

export function prepareEmailPayload(data: FormSubmissionData) {
  //
  const toEmail = data.email;
  const subject = `New message from ${data.name}`;

  const value = Object.entries(data).map(([key, value]) => `${key}: ${value}`)
    .join("\n");

  return {
    to: toEmail,
    from: "noreply@acolhimentofamiliar.pt",
    subject,
    html: value,
  };
}
