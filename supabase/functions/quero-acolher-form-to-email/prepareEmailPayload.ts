import { type FormSubmissionData } from "./FormSubmissionData.ts";

export function prepareEmailPayload(data: FormSubmissionData) {
  const toEmail = Deno.env.get("TO_EMAIL");
  const subject = `New message from ${data.Nome}`;

  const value = Object.entries(data).filter(([key]) => {
    return !["redirect_to", "page", "Aceitou Politica de Privacidade"].includes(
      key,
    );
  }).map(([key, value]) => {
    const label = key;
    let parsedValue: string;
    switch (key) {
      case "Antecedentes Criminais":
        parsedValue = value === "on" ? "Não" : "Sim";
        break;
      default:
        parsedValue = value.replace(/\n/g, "<br>");
    }
    return `<p><strong>${label}</strong>: ${parsedValue}</p>`;
  })
    .join("\n");

  return {
    to: toEmail,
    from: "noreply@acolhimentofamiliar.pt",
    subject,
    html: value,
  };
}
