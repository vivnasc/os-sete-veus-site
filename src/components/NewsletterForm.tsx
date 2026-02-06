"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: integrate with Supabase
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl bg-warm-100 px-8 py-10 text-center">
        <p className="font-serif text-xl text-warm-800">Obrigada.</p>
        <p className="mt-3 text-sm text-warm-600">
          Os recursos estão a caminho do teu email. Sem spam. Prometido.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row sm:items-end">
      <div className="flex-1">
        <label htmlFor="email" className="sr-only">
          O teu email
        </label>
        <input
          id="email"
          type="email"
          required
          placeholder="O teu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-warm-300 bg-white px-5 py-3.5 text-sm text-warm-800 placeholder:text-warm-400 focus:border-terracotta focus:outline-none focus:ring-1 focus:ring-terracotta"
        />
      </div>
      <button
        type="submit"
        className="rounded-xl bg-terracotta px-8 py-3.5 text-sm font-medium text-white transition-colors hover:bg-terracotta-dark"
      >
        Receber grátis
      </button>
    </form>
  );
}
