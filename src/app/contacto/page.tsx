"use client";

import { useState } from "react";
import Link from "next/link";

const FAQ_RAPIDA = [
  {
    q: "Quanto tempo demora a resposta?",
    a: "Respondemos em 24 horas nos dias uteis. Se for urgente, usa o Telegram.",
  },
  {
    q: "Comprei o livro fisico. Como acedo ao digital?",
    a: "Pede o teu codigo de acesso na pagina dedicada.",
    link: { label: "Pedir codigo", href: "/pedir-codigo" },
  },
  {
    q: "Como funciona o pagamento?",
    a: "Aceitamos PayPal, transferencia bancaria (Millennium BIM) e M-Pesa. Apos envio do comprovativo, confirmamos em 24h.",
    link: { label: "Ver metodos", href: "/comprar" },
  },
];

export default function ContactoPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Erro ao enviar.");
        setStatus("error");
        return;
      }

      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setErrorMsg("Erro de ligacao. Tenta novamente.");
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-xl text-center">
          <p className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-sage">
            Contacto
          </p>
          <h1 className="mt-4 font-serif text-3xl leading-tight text-brown-900 sm:text-4xl">
            Fala connosco.
          </h1>
          <p className="mx-auto mt-4 max-w-md font-body text-base leading-relaxed text-brown-600">
            Tens uma duvida, sugestao ou precisas de ajuda? Estamos aqui.
            Respondemos em 24 horas uteis.
          </p>
        </div>
      </section>

      {/* Contact channels + Form */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-3xl">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Left: Direct channels */}
            <div>
              <h2 className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-brown-400">
                Contacto directo
              </h2>

              <div className="mt-6 space-y-4">
                {/* Email */}
                <a
                  href="mailto:feedback@setecos.com"
                  className="flex items-center gap-4 rounded-xl border border-brown-100 bg-white p-5 transition-shadow hover:shadow-sm"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brown-50 text-brown-600">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-sans text-sm font-medium text-brown-800">Email</p>
                    <p className="text-sm text-brown-500">feedback@setecos.com</p>
                  </div>
                </a>

                {/* Telegram */}
                <a
                  href="https://t.me/viviannedossantos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-xl border border-brown-100 bg-white p-5 transition-shadow hover:shadow-sm"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0088cc]/10 text-[#0088cc]">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                    </svg>
                  </span>
                  <div>
                    <p className="font-sans text-sm font-medium text-brown-800">Telegram</p>
                    <p className="text-sm text-brown-500">@viviannedossantos</p>
                  </div>
                </a>
              </div>

              {/* FAQ rapida */}
              <h2 className="mt-10 font-sans text-[0.65rem] uppercase tracking-[0.2em] text-brown-400">
                Perguntas frequentes
              </h2>
              <div className="mt-4 space-y-3">
                {FAQ_RAPIDA.map((faq) => (
                  <div key={faq.q} className="rounded-xl border border-brown-100 bg-white p-4">
                    <p className="font-sans text-sm font-medium text-brown-800">{faq.q}</p>
                    <p className="mt-1 text-sm text-brown-500">{faq.a}</p>
                    {faq.link && (
                      <Link
                        href={faq.link.href}
                        className="mt-2 inline-block font-sans text-xs text-sage hover:underline"
                      >
                        {faq.link.label} &rarr;
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Contact form */}
            <div>
              <h2 className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-brown-400">
                Enviar mensagem
              </h2>

              {status === "sent" ? (
                <div className="mt-6 rounded-xl border border-sage/30 bg-sage/5 p-8 text-center">
                  <p className="font-serif text-lg text-brown-800">
                    Mensagem enviada.
                  </p>
                  <p className="mt-2 text-sm text-brown-500">
                    Respondemos em 24 horas uteis. Obrigada pela tua mensagem.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-4 font-sans text-sm text-sage hover:underline"
                  >
                    Enviar outra mensagem
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="name" className="block font-sans text-xs font-medium text-brown-700">
                      Nome
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-brown-200 bg-white px-4 py-2.5 text-sm text-brown-900 outline-none transition-colors focus:border-sage focus:ring-1 focus:ring-sage"
                      placeholder="O teu nome"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block font-sans text-xs font-medium text-brown-700">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-brown-200 bg-white px-4 py-2.5 text-sm text-brown-900 outline-none transition-colors focus:border-sage focus:ring-1 focus:ring-sage"
                      placeholder="o.teu@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block font-sans text-xs font-medium text-brown-700">
                      Assunto <span className="text-brown-300">(opcional)</span>
                    </label>
                    <select
                      id="subject"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-brown-200 bg-white px-4 py-2.5 text-sm text-brown-900 outline-none transition-colors focus:border-sage focus:ring-1 focus:ring-sage"
                    >
                      <option value="">Selecciona um assunto</option>
                      <option value="Pagamento">Pagamento</option>
                      <option value="Codigo de acesso">Codigo de acesso</option>
                      <option value="Problema tecnico">Problema tecnico</option>
                      <option value="Duvida sobre conteudo">Duvida sobre conteudo</option>
                      <option value="Sugestao">Sugestao</option>
                      <option value="Outro">Outro</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block font-sans text-xs font-medium text-brown-700">
                      Mensagem
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      maxLength={2000}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="mt-1 w-full resize-none rounded-lg border border-brown-200 bg-white px-4 py-2.5 text-sm text-brown-900 outline-none transition-colors focus:border-sage focus:ring-1 focus:ring-sage"
                      placeholder="Escreve a tua mensagem..."
                    />
                    <p className="mt-1 text-right text-xs text-brown-300">
                      {form.message.length}/2000
                    </p>
                  </div>

                  {status === "error" && (
                    <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">
                      {errorMsg}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full rounded-lg bg-brown-800 px-6 py-3 font-sans text-sm font-medium uppercase tracking-wider text-cream transition-colors hover:bg-brown-900 disabled:opacity-50"
                  >
                    {status === "sending" ? "A enviar..." : "Enviar mensagem"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
