"use client";

import { useState } from "react";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export default function NewsletterForm({ dark = false }: { dark?: boolean }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (SUPABASE_URL && SUPABASE_ANON_KEY) {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/newsletter`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            Prefer: "return=minimal",
          },
          body: JSON.stringify({ email }),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => null);
          if (data?.code === "23505") {
            // Duplicate email — treat as success
            setSubmitted(true);
            return;
          }
          throw new Error("Erro ao guardar. Tenta novamente.");
        }
      }
      setSubmitted(true);
    } catch {
      setError("Ocorreu um erro. Por favor, tenta novamente.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className={`rounded-xl px-8 py-10 text-center ${dark ? "bg-white/5" : "bg-cream-dark"}`}>
        <p className={`font-serif text-xl ${dark ? "text-cream" : "text-brown-900"}`}>Obrigada.</p>
        <p className={`mt-3 text-sm ${dark ? "text-brown-300" : "text-brown-600"}`}>
          O teu email ficou guardado. Sem spam. Prometido.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row sm:items-end">
      <div className="flex-1">
        <label htmlFor="newsletter-email" className="sr-only">O teu email</label>
        <input
          id="newsletter-email"
          type="email"
          required
          placeholder="O teu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          className={`w-full rounded-lg border px-5 py-3.5 font-sans text-sm transition-colors focus:outline-none focus:ring-2 ${
            dark
              ? "border-brown-600 bg-white/5 text-cream placeholder:text-brown-400 focus:border-sage focus:ring-sage/30"
              : "border-brown-100 bg-white text-brown-900 placeholder:text-brown-400 focus:border-sage focus:ring-sage/30"
          } ${loading ? "opacity-60" : ""}`}
        />
        {error && (
          <p className="mt-2 text-sm text-red-500">{error}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={loading}
        className={`rounded-lg bg-sage px-8 py-3.5 font-sans text-[0.8rem] font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-sage-dark ${loading ? "opacity-60" : ""}`}
      >
        {loading ? "A enviar..." : "Inscrever-me"}
      </button>
    </form>
  );
}
