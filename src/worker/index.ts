import { Hono } from "hono";
import { Resend } from "resend";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().min(1),
  project: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(1),
});

const app = new Hono<{ Bindings: Env }>();

app.post("/api/contact", async (c) => {
  try {
    const body = await c.req.json();
    const data = ContactSchema.parse(body);

    const resend = new Resend(c.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "Drop Studio <contato@dropstudioproductions.com>",
      to: ["pedro.drop.contato@gmail.com"],
      subject: `Novo contato: ${data.name}`,
      html: `
        <h2>Novo contato pelo site</h2>
        <p><strong>Nome:</strong> ${data.name}</p>
        <p><strong>Tipo de projeto:</strong> ${data.project ?? "Não informado"}</p>
        <p><strong>Orçamento:</strong> ${data.budget ?? "Não informado"}</p>
        <p><strong>Mensagem:</strong><br/>${data.message}</p>
      `,
    });

    return c.json({ success: true });
  } catch (_err) {
    return c.json({ error: "Erro ao processar contato" }, 500);
  }
});

export default app;
