"use client";

import { useState } from "react";
import Link from "next/link";

export default function AcessoDigitalPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    whatsapp: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");
    setErrorMsg("");

    try {
      const res = await fetch("/api/interesse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          whatsapp: formData.whatsapp || null,
          source: "acesso-digital",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erro ao enviar.");
      }

      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Erro ao enviar. Tenta novamente."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Success state ──────────────────────────────────────────────────────

  if (status === "success") {
    return (
      <div className="min-h-screen bg-cream px-6 py-24">
        <div className="mx-auto max-w-lg text-center">
          <div className="rounded-2xl border border-sage/30 bg-white p-10 shadow-lg">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sage/10">
              <svg
                className="h-7 w-7 text-sage"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="mt-6 font-serif text-2xl text-brown-900">
              Recebemos o teu interesse, {formData.fullName.split(" ")[0]}.
            </h1>
            <p className="mx-auto mt-4 max-w-sm font-body text-sm leading-relaxed text-brown-600">
              A Vivianne vai receber uma notifica\u00e7\u00e3o e entrar em contacto contigo
              em breve com o teu c\u00f3digo de acesso digital.
            </p>

            <div className="mt-8 space-y-3 text-left">
              <div className="rounded-lg bg-cream p-4">
                <p className="font-sans text-xs font-medium text-brown-900">
                  Enquanto esperas, explora:
                </p>
                <ul className="mt-2 space-y-1.5">
                  <li>
                    <Link
                      href="/recursos/teste"
                      className="font-sans text-xs text-sage hover:underline"
                    >
                      Teste de autoconhecimento (gratuito, 3 min) &rarr;
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/recursos"
                      className="font-sans text-xs text-sage hover:underline"
                    >
                      Todos os recursos gratuitos &rarr;
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/ecossistema"
                      className="font-sans text-xs text-sage hover:underline"
                    >
                      Conhecer o ecossistema Sete Ecos &rarr;
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <p className="mt-8 font-sans text-[0.65rem] text-brown-400">
              D\u00favidas? Contacta directamente pelo{" "}
              <a
                href="https://t.me/viviannedossantos"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0088cc] hover:underline"
              >
                Telegram
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── Form state ─────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-xl text-center">
          <p className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-gold-dark">
            Para quem j\u00e1 tem o livro f\u00edsico
          </p>
          <h1 className="mt-4 font-serif text-3xl leading-tight text-brown-900 sm:text-4xl">
            O teu livro abre portas
            <br />
            que ainda n\u00e3o conheces.
          </h1>
          <p className="mx-auto mt-6 max-w-md font-body text-base leading-relaxed text-brown-600">
            Se tens o livro <em>Os 7 V\u00e9us do Despertar</em>, tens direito a uma
            experi\u00eancia digital completa: leitura integrada, di\u00e1rio de reflex\u00e3o,
            comunidade e muito mais.
          </p>
          <p className="mx-auto mt-4 max-w-sm font-body text-sm text-brown-500">
            Deixa os teus dados e a Vivianne entra em contacto contigo com o
            teu c\u00f3digo de acesso.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-md">
          <div className="rounded-2xl border border-brown-100 bg-white p-8 shadow-lg">
            {status === "error" && (
              <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
                <p className="font-sans text-sm text-red-700">{errorMsg}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block font-sans text-xs font-medium text-brown-900"
                >
                  O teu nome
                </label>
                <input
                  type="text"
                  id="fullName"
                  required
                  placeholder="Nome completo"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="mt-2 w-full rounded-lg border border-brown-200 bg-cream/50 px-4 py-3 font-sans text-sm text-brown-900 placeholder:text-brown-300 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/20"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block font-sans text-xs font-medium text-brown-900"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="O teu email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="mt-2 w-full rounded-lg border border-brown-200 bg-cream/50 px-4 py-3 font-sans text-sm text-brown-900 placeholder:text-brown-300 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/20"
                />
              </div>

              {/* WhatsApp */}
              <div>
                <label
                  htmlFor="whatsapp"
                  className="block font-sans text-xs font-medium text-brown-900"
                >
                  WhatsApp{" "}
                  <span className="font-normal text-brown-400">(opcional)</span>
                </label>
                <input
                  type="tel"
                  id="whatsapp"
                  placeholder="+258..."
                  value={formData.whatsapp}
                  onChange={(e) =>
                    setFormData({ ...formData, whatsapp: e.target.value })
                  }
                  className="mt-2 w-full rounded-lg border border-brown-200 bg-cream/50 px-4 py-3 font-sans text-sm text-brown-900 placeholder:text-brown-300 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/20"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-sage px-6 py-3.5 font-sans text-sm font-medium uppercase tracking-wider text-white transition-all hover:bg-sage-dark disabled:opacity-50"
              >
                {isSubmitting ? "A enviar..." : "Quero o meu acesso digital"}
              </button>
            </form>

            <p className="mt-4 text-center font-sans text-[0.6rem] text-brown-400">
              Sem compromisso. Sem spam. S\u00f3 o teu c\u00f3digo.
            </p>
          </div>
        </div>
      </section>

      {/* What you'll get */}
      <section className="border-t border-brown-100 bg-white px-6 py-16">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-center font-serif text-xl text-brown-900">
            O que vais receber
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl bg-cream p-5">
              <p className="font-serif text-base text-brown-900">
                C\u00f3digo de acesso
              </p>
              <p className="mt-2 font-sans text-xs leading-relaxed text-brown-500">
                Para criar a tua conta e aceder \u00e0 plataforma completa. Uma vez
                activado, o acesso \u00e9 vital\u00edcio.
              </p>
            </div>
            <div className="rounded-xl bg-cream p-5">
              <p className="font-serif text-base text-brown-900">
                Leitura integrada
              </p>
              <p className="mt-2 font-sans text-xs leading-relaxed text-brown-500">
                Os 7 V\u00e9us do Despertar com modo contemplativo, pr\u00e1ticas guiadas,
                di\u00e1rio de reflex\u00e3o e mandala interactiva. Uma experi\u00eancia diferente de ler um livro.
              </p>
            </div>
            <div className="rounded-xl bg-cream p-5">
              <p className="font-serif text-base text-brown-900">Comunidade</p>
              <p className="mt-2 font-sans text-xs leading-relaxed text-brown-500">
                Acesso \u00e0 comunidade Ecos: reflex\u00f5es an\u00f3nimas, partilhas e
                contempla\u00e7\u00e3o silenciosa. Tudo impermanente.
              </p>
            </div>
            <div className="rounded-xl bg-cream p-5">
              <p className="font-serif text-base text-brown-900">
                Novos Espelhos
              </p>
              <p className="mt-2 font-sans text-xs leading-relaxed text-brown-500">
                \u00c0 medida que novos Espelhos forem publicados (Mar\u00e7o\u2013Agosto 2026),
                poder\u00e1s adquiri-los com desconto como leitor do livro.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Telegram alternative */}
      <section className="bg-cream px-6 py-12">
        <div className="mx-auto max-w-md text-center">
          <p className="font-sans text-xs text-brown-500">
            Preferes falar directamente?
          </p>
          <a
            href="https://t.me/viviannedossantos"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#0088cc]/10 px-5 py-2.5 font-sans text-sm font-medium text-[#0088cc] transition-colors hover:bg-[#0088cc]/20"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
            Falar pelo Telegram
          </a>
        </div>
      </section>
    </div>
  );
}
