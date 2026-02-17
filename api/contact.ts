import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY as string);

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, project, budget, message } = req.body;

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'pedro.drop.contato@gmail.com',
      subject: `Novo orçamento - ${name}`,
      html: `
        <h2>Novo pedido de orçamento</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Projeto:</strong> ${project}</p>
        <p><strong>Orçamento:</strong> ${budget}</p>
        <p><strong>Mensagem:</strong> ${message}</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao enviar email' });
  }
}