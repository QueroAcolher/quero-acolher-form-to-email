import { type FormSubmissionData } from "./FormSubmissionData.ts";

export function prepareEmailPayload(data: FormSubmissionData) {
  //
  const toEmail = data.email;
  const subject = `New message from ${data.name}`;

  const value = Object.entries(data).map(([key, value]) => `${key}: ${value}`)
    .join("\n");
  const content = [
    {
      type: "text/plain",
      value,
    },
  ];

  return {
    personalizations: [{ to: [{ email: toEmail }] }],
    from: { email: "mastodon@leomeloxp.dev" },
    subject,
    content,
  };
}
