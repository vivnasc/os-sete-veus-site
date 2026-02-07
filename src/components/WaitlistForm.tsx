"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");

    const { error } = await supabase
      .from("waitlist")
      .upsert({ email: email.toLowerCase().trim(), source: "experiencias" }, { onConflict: "email" });

    if (error) {
      // Fallback: try newsletter table
      await supabase
        .from("newsletter")
        .upsert(
          { email: email.toLowerCase().trim(), source: "waitlist-experiencias" },
          { onConflict: "email" }
        );
    }

    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="rounded-xl bg-sage/10 px-6 py-4 text-center">
        <p className="font-serif text-base text-cream">
          Estás na lista! Avisamos-te em primeira mão.
        </p>
        <p className="mt-1 font-sans text-xs text-brown-400">
          Com 20% de desconto no lançamento.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="O teu email"
        required
        className="flex-1 rounded-lg border border-brown-600/30 bg-brown-800/30 px-4 py-3 font-sans text-sm text-cream placeholder:text-brown-500 focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="shrink-0 rounded-lg bg-sage px-6 py-3 font-sans text-[0.75rem] font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-sage-dark disabled:opacity-50"
      >
        {status === "loading" ? "A juntar..." : "Juntar-me à waitlist"}
      </button>
    </form>
  );
}
