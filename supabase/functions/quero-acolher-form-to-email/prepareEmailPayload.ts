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
    personalizations: [{ to: [{ email: toEmail }] }],
    from: { email: 'test@em1257.leomeloxp.dev' },
    subject,
    content,
  };
}
