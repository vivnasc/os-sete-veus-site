import { NextResponse } from "next/server";

const MAILERLITE_API_TOKEN =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiMWMwYjkwMDA2NWRiZWVkMWQ3NTlhNjViZDhiZTY1ODllZjE0ZjI2ZTIyOWU4ZWM4Y2M0ODcwMzQ2YzNmNjZjMDIzNjdmZmZiOThmMWY5ZGQiLCJpYXQiOjE3NzAzODY2NjcuMjQwNzA1LCJuYmYiOjE3NzAzODY2NjcuMjQwNzA4LCJleHAiOjQ5MjYwNjAyNjcuMjM3MzY5LCJzdWIiOiIyMTEyNzYwIiwic2NvcGVzIjpbXX0.UnF2B_H9QMolD_C88MlDIRWfsrYQRGheGFod9KB8yfrQy6Zafa1mDs7oW1PjZ9iRHGJsTXl5RXsojv0wGuEUj4f6skyUUSp2JNxZj6o8VxfP9MbYcLHbb0UaFndAKJIeDiE2JPqCZB518eiT3gv5EEhU1iMd198ASlZaeTTNCck0KhHeCOVMPLWZQcnnWMr37hWagdTwXyGN_oNOrLefWWM0rBbKekBwBe3ShFTNUAxBDu1giPSuTDTUz_klVTq5y0B0TN1Tzhw04HyKN6CXMq_cGeHj3Ls320cMJioXz9YBOiKIYSGkK2H1cv3DH4I-ZTJkFFbql7to8vlwTFILRN3aoigAfFgkaVtAoF_VdP7v6U4wGmt9nssgYLVt4NUUCRQTo3Aa5VJJ-AX9_4GgBgR9lI3WUZKkyLjDg087lW_1EiVLOIGwK2irLuxTNi54dxevj5i3mVNAMDp6dJX46wnssF1OxbAZhK3hV-OrFDjaow2pMkSBVAHidxphoky0lJ7l4APMj1Vlc4po2zwq0o0gnptyGl3Ie_5gvoPGLtlB1afaS7fQbHsFMp0MmywCeBFfCPIHWm00uJcGG2GFOv8CGHEu8w6OOY7jl1I7c6mbgxFYAf-03yVxBmZn85w4VxmhQL70q3ZrSjy6IfswYC1xVCyNhyFkyeJXC9mZWAs";

/**
 * Email sequence templates for lead nurturing.
 * These are triggered based on subscriber actions:
 * - Day 0: Welcome + free resource
 * - Day 2: Story of recognition
 * - Day 5: Social proof + test invitation
 * - Day 8: Deep content (article)
 * - Day 12: Soft invitation to purchase
 * - Day 18: Final nudge with urgency
 */
const emailSequences = [
  {
    id: "welcome",
    day: 0,
    subject: "Bem-vinda ao ecossistema Sete Ecos 🌀",
    preview: "O teu primeiro recurso gratuito está aqui dentro.",
    body: `Olá,

Obrigada por te juntares ao ecossistema Sete Ecos.

Sei que muitas promessas são feitas online. Esta não é uma delas. Não vou prometer que vais mudar a tua vida em 7 dias. Mas posso dizer-te isto: se chegaste até aqui, algo em ti já está a mover-se.

Aqui está o teu primeiro recurso:
→ Diário de Reflexão de 7 Dias (PDF gratuito)
[LINK: seteveus.space/recursos]

Sem pressa. Sem fórmulas. Ao teu ritmo.

Com verdade,
Vivianne`,
  },
  {
    id: "recognition",
    day: 2,
    subject: "Construí a vida perfeita — e sentia-me vazia",
    preview: "Talvez te reconheças nesta história.",
    body: `Passei anos a construir uma vida que fazia sentido para toda a gente — menos para mim.

Carreira, rotina, tudo no lugar. Mas à noite, quando tudo parava, havia um vazio que eu não conseguia nomear. Não era ingratidão. Era intuição.

Foi esse momento que me levou a escrever Os Sete Véus.

Se te reconheces nestas palavras, talvez queiras experimentar o teste gratuito:
→ Descobre qual espelho te esconde (3 minutos)
[LINK: seteveus.space/recursos/teste]

Sem compromisso. É teu.

Vivianne`,
  },
  {
    id: "social-proof",
    day: 5,
    subject: "\"Não é um livro que se lê — é um livro que se vive\"",
    preview: "Palavras de quem já começou.",
    body: `Queria partilhar contigo o que algumas leitoras me disseram:

"Comecei pelo teste gratuito. Achei que seria superficial. Acabei por comprar o livro nesse dia." — Beatriz, São Paulo

"O diário de reflexão mudou a forma como leio. Nunca pensei que um livro me fizesse parar e escrever sobre mim mesma." — Ana, Maputo

"As pausas entre capítulos são tão importantes quanto as palavras." — Carla, Lisboa

Isto não é um livro normal. É uma experiência integrada — com reader no site, diário de reflexão, checklists e um espelho final que te devolve as tuas próprias palavras.

Se ainda não fizeste o teste gratuito:
→ Qual espelho te esconde?
[LINK: seteveus.space/recursos/teste]

Vivianne`,
  },
  {
    id: "deep-content",
    day: 8,
    subject: "A vida que funciona — e o que vem depois",
    preview: "Um artigo sobre o momento em que percebes que funcionar não é viver.",
    body: `Escrevi um artigo sobre o momento em que tudo funciona — mas nada te preenche.

Não é sobre estar em crise. É sobre aquele momento subtil em que percebes que "estar bem" não é o mesmo que "viver bem".

→ Lê o artigo completo
[LINK: seteveus.space/artigos]

Se te ressoa, há mais artigos sobre autenticidade, escolha e liberdade interior.

Vivianne`,
  },
  {
    id: "soft-invite",
    day: 12,
    subject: "Se estiveres pronta, o primeiro espelho espera por ti",
    preview: "O Espelho da Ilusão — a experiência completa.",
    body: `Não sei em que ponto estás da tua jornada. Talvez já tenhas feito o teste. Talvez tenhas lido os artigos. Talvez estejas só a observar — e está tudo bem.

Mas se sentires que estás pronta para ir mais fundo, O Espelho da Ilusão é o primeiro passo.

Não é um PDF. É uma experiência de leitura integrada:
• 7 capítulos com pausas de reflexão
• Diário pessoal auto-guardado
• Checklists interactivos
• O Teu Espelho — as tuas palavras reunidas

→ Conhece a experiência completa ($19 USD)
[LINK: seteveus.space/livro-fisico]

Sem pressa. O livro espera por ti.

Vivianne`,
  },
  {
    id: "final-nudge",
    day: 18,
    subject: "Uma última coisa antes de ficar em silêncio",
    preview: "Não volto a enviar sobre isto. Mas queria que soubesses.",
    body: `Este é o último email que envio sobre O Espelho da Ilusão.

Não acredito em pressão. Acredito em reconhecimento. Se estas palavras são para ti, tu sabes. Se não são, está tudo bem — os recursos gratuitos continuam teus.

Para quem quer começar:
→ O Espelho da Ilusão — experiência digital ($19 USD)
[LINK: seteveus.space/livro-fisico]

→ Livro físico — 1.500 MT (Moçambique)
[LINK: WhatsApp]

A partir de agora, envio apenas artigos novos e recursos gratuitos. Sem mais convites de compra.

Com verdade,
Vivianne

P.S. Se já compraste e eu não me apercebi — perdoa-me. E obrigada.`,
  },
];

/**
 * GET — returns the email sequence templates
 * POST — triggers sending an email from the sequence via MailerLite
 */
export async function GET() {
  return NextResponse.json({
    sequences: emailSequences,
    totalEmails: emailSequences.length,
    spanDays: 18,
    description: "Sequência de lead nurturing em 6 emails ao longo de 18 dias",
  });
}

export async function POST(request: Request) {
  try {
    const { email, sequenceId } = await request.json();

    if (!email || !sequenceId) {
      return NextResponse.json(
        { error: "Email e sequenceId são obrigatórios" },
        { status: 400 }
      );
    }

    const template = emailSequences.find((s) => s.id === sequenceId);
    if (!template) {
      return NextResponse.json(
        { error: "Sequência não encontrada" },
        { status: 404 }
      );
    }

    // Add subscriber to MailerLite with custom field for sequence tracking
    const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${MAILERLITE_API_TOKEN}`,
      },
      body: JSON.stringify({
        email,
        fields: {
          last_sequence: sequenceId,
          sequence_day: template.day,
        },
      }),
    });

    if (!res.ok && res.status !== 409) {
      return NextResponse.json({ error: "Erro ao enviar" }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      sent: sequenceId,
      nextSequence: emailSequences.find((s) => s.day > template.day)?.id ?? null,
    });
  } catch {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
