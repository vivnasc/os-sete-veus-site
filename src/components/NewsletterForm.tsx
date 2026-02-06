"use client";

import { useState } from "react";

export default function NewsletterForm({ dark = false }: { dark?: boolean }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: integrate with Supabase
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className={`rounded-xl px-8 py-10 text-center ${dark ? "bg-white/5" : "bg-cream-dark"}`}>
        <p className={`font-serif text-xl ${dark ? "text-cream" : "text-brown-900"}`}>Obrigada.</p>
        <p className={`mt-3 text-sm ${dark ? "text-brown-300" : "text-brown-600"}`}>
          Os recursos estão a caminho do teu email. Sem spam. Prometido.
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
          className={`w-full rounded-lg border px-5 py-3.5 font-sans text-sm transition-colors focus:outline-none focus:ring-2 ${
            dark
              ? "border-brown-600 bg-white/5 text-cream placeholder:text-brown-400 focus:border-sage focus:ring-sage/30"
              : "border-brown-100 bg-white text-brown-900 placeholder:text-brown-400 focus:border-sage focus:ring-sage/30"
          }`}
        />
      </div>
      <button
        type="submit"
        className="rounded-lg bg-sage px-8 py-3.5 font-sans text-[0.8rem] font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-sage-dark"
      >
        Receber grátis
      </button>
    </form>
  );
}
