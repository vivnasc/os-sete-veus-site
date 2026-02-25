/**
 * Sistema de notificacoes para a autora (Vivianne)
 *
 * Envia notificacoes via:
 * 1. Supabase table `admin_notifications` para dashboard
 * 2. Email via Brevo (se BREVO_API_KEY estiver configurada)
 * 3. Webhook configuravel (Make.com, Zapier, n8n, etc.) → WhatsApp
 *
 * Configuracao (env vars):
 *   BREVO_API_KEY — API key do Brevo (brevo.com, 300 emails/dia gratis)
 *   ADMIN_NOTIFY_WEBHOOK_URL — URL do webhook (POST JSON)
 *   ADMIN_WHATSAPP_NUMBER — +258845243875
 */

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const ADMIN_EMAIL = "viv.saraiva@gmail.com";

export type NotificationType =
  | "payment_proof"      // Comprovativo de pagamento recebido
  | "payment_created"    // Novo pedido de pagamento criado
  | "code_request"       // Novo pedido de codigo do livro fisico
  | "code_redeemed"      // Codigo LIVRO-XXXXX resgatado
  | "special_link_used"  // Link especial usado
  | "new_member"         // Novo membro registado
  | "general";           // Notificacao generica

type NotificationData = {
  type: NotificationType;
  title: string;
  message: string;
  details?: Record<string, string | number | null>;
};

/**
 * Envia notificacao para a autora.
 * Nao falha silenciosamente — loga erros mas nao interrompe o fluxo principal.
 */
export async function notifyAdmin(data: NotificationData): Promise<void> {
  const { type, title, message, details } = data;

  // 1. Guardar em Supabase (sempre)
  try {
    if (supabaseServiceKey) {
      const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
        auth: { autoRefreshToken: false, persistSession: false },
      });

      await supabaseAdmin.from("admin_notifications").insert({
        type,
        title,
        message,
        details: details || {},
        read: false,
        created_at: new Date().toISOString(),
      });
    }
  } catch (err) {
    console.error("[notify-admin] Erro ao guardar notificacao:", err);
  }

  // 2. Enviar email via Brevo (se configurado)
  const brevoKey = process.env.BREVO_API_KEY;
  if (brevoKey) {
    try {
      await sendEmailViaBrevo(brevoKey, data);
    } catch (err) {
      console.error("[notify-admin] Erro ao enviar email:", err);
    }
  }

  // 3. Enviar via webhook (se configurado)
  const webhookUrl = process.env.ADMIN_NOTIFY_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      const whatsappMessage = formatWhatsAppMessage(data);

      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          title,
          message: whatsappMessage,
          phone: process.env.ADMIN_WHATSAPP_NUMBER || "+258845243875",
          details,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.error("[notify-admin] Erro ao enviar webhook:", err);
    }
  }

  // 4. Log (sempre)
  console.log(
    `[NOTIFICACAO ADMIN] ${type}: ${title} — ${message}`,
    details || ""
  );
}

/**
 * Envia email de notificacao via Brevo API (fetch directo, sem SDK)
 * Gratuito ate 300 emails/dia em brevo.com
 */
async function sendEmailViaBrevo(apiKey: string, data: NotificationData) {
  const { title, message, details } = data;

  let detailsHtml = "";
  if (details) {
    const rows = Object.entries(details)
      .filter(([, v]) => v !== null && v !== undefined)
      .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#666;">${k}</td><td style="padding:4px 0;font-weight:600;">${v}</td></tr>`)
      .join("");
    detailsHtml = `<table style="margin:16px 0;border-collapse:collapse;">${rows}</table>`;
  }

  const hora = new Date().toLocaleString("pt-PT", { timeZone: "Africa/Maputo" });

  const htmlContent = `
    <div style="font-family:Georgia,serif;max-width:500px;margin:0 auto;padding:24px;">
      <h2 style="color:#1a1a1a;margin-bottom:8px;">${title}</h2>
      <p style="color:#444;font-size:16px;line-height:1.6;">${message}</p>
      ${detailsHtml}
      <hr style="border:none;border-top:1px solid #e5e5e5;margin:20px 0;" />
      <p style="color:#999;font-size:12px;">${hora} (Maputo)</p>
    </div>
  `;

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      sender: { name: "Os Sete Veus", email: ADMIN_EMAIL },
      to: [{ email: ADMIN_EMAIL, name: "Vivianne" }],
      subject: `[7 Veus] ${title}`,
      htmlContent,
    }),
  });

  if (!res.ok) {
    const errBody = await res.text();
    console.error("[notify-admin] Brevo erro:", res.status, errBody);
  }
}

/**
 * Formata mensagem para WhatsApp (texto simples com emojis)
 */
function formatWhatsAppMessage(data: NotificationData): string {
  const icon = {
    payment_proof: "💳",
    payment_created: "🛒",
    code_request: "📬",
    code_redeemed: "✅",
    special_link_used: "🔗",
    new_member: "👋",
    general: "📢",
  }[data.type];

  let msg = `${icon} *${data.title}*\n\n${data.message}`;

  if (data.details) {
    msg += "\n\n";
    for (const [key, value] of Object.entries(data.details)) {
      if (value !== null && value !== undefined) {
        msg += `• ${key}: ${value}\n`;
      }
    }
  }

  msg += `\n🕐 ${new Date().toLocaleString("pt-PT", { timeZone: "Africa/Maputo" })}`;
  return msg;
}

// ─── Helpers especificos ────────────────────────────────────────────────────

export async function notifyPaymentProof(payment: {
  user_email: string;
  amount: number;
  currency: string;
  payment_method: string;
  access_type_code: string;
  transaction_id?: string | null;
  mpesa_reference?: string | null;
}) {
  await notifyAdmin({
    type: "payment_proof",
    title: "Comprovativo de pagamento recebido",
    message: `${payment.user_email} enviou comprovativo de ${payment.amount} ${payment.currency} via ${payment.payment_method}.`,
    details: {
      Email: payment.user_email,
      Valor: `${payment.amount} ${payment.currency}`,
      Metodo: payment.payment_method,
      Produto: payment.access_type_code,
      Transacao: payment.transaction_id || payment.mpesa_reference || "—",
    },
  });
}

export async function notifyPaymentCreated(payment: {
  user_email: string;
  amount: number;
  currency: string;
  payment_method: string;
  access_type_code: string;
}) {
  await notifyAdmin({
    type: "payment_created",
    title: "Novo pedido de pagamento",
    message: `${payment.user_email} quer comprar ${payment.access_type_code} (${payment.amount} ${payment.currency}).`,
    details: {
      Email: payment.user_email,
      Valor: `${payment.amount} ${payment.currency}`,
      Metodo: payment.payment_method,
      Produto: payment.access_type_code,
    },
  });
}

export async function notifyCodeRequest(request: {
  full_name: string;
  email: string;
  whatsapp?: string;
  purchase_location?: string;
}) {
  await notifyAdmin({
    type: "code_request",
    title: "Novo pedido de codigo",
    message: `${request.full_name} (${request.email}) pede codigo do livro fisico.`,
    details: {
      Nome: request.full_name,
      Email: request.email,
      WhatsApp: request.whatsapp || "—",
      "Comprou em": request.purchase_location || "—",
    },
  });
}

export async function notifyCodeRedeemed(data: {
  email: string;
  code: string;
}) {
  await notifyAdmin({
    type: "code_redeemed",
    title: "Codigo resgatado",
    message: `${data.email} resgatou o codigo ${data.code} e ganhou acesso.`,
    details: {
      Email: data.email,
      Codigo: data.code,
    },
  });
}

export async function notifySpecialLinkUsed(data: {
  email: string;
  access_type: string;
}) {
  await notifyAdmin({
    type: "special_link_used",
    title: "Link especial usado",
    message: `${data.email} usou link especial para ${data.access_type}.`,
    details: {
      Email: data.email,
      Acesso: data.access_type,
    },
  });
}
