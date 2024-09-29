import { type FormSubmissionData } from './FormSubmissionData.ts';

export function prepareEmailPayload(data: FormSubmissionData) {
  //
  const toEmail = data.email;
  const subject = `New message from ${data.name}`;
  const content = [
    {
      type: 'text/plain',
      value: [
        `Nome: ${data.name}`,
        `Email: ${data.email}`,
        `Data de nascimento: ${data.dob}`,
        `Telefone: ${data.phone}`,
        `Mensagem: ${data.message}`,
      ].join('\n'),
    },
  ];

  return {
    from: 'noreply@acolhimentofamiliar.pt',
    to: toEmail,
    subject,
    html: content,
  };
}
