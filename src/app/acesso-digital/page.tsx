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
                href="https://wa.me/258845243875"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#25D366] hover:underline"
              >
                WhatsApp
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

      {/* WhatsApp alternative */}
      <section className="bg-cream px-6 py-12">
        <div className="mx-auto max-w-md text-center">
          <p className="font-sans text-xs text-brown-500">
            Preferes falar directamente?
          </p>
          <a
            href="https://wa.me/258845243875?text=Ol%C3%A1!%20Tenho%20o%20livro%20f%C3%ADsico%20Os%207%20V%C3%A9us%20e%20quero%20o%20acesso%20digital"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#25D366]/10 px-5 py-2.5 font-sans text-sm font-medium text-[#25D366] transition-colors hover:bg-[#25D366]/20"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.61.609l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.386 0-4.592-.826-6.326-2.206l-.44-.352-3.2 1.073 1.073-3.2-.352-.44A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
            </svg>
            Falar pelo WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
