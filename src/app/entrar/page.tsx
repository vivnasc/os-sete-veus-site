"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import Link from "next/link";

export default function EntrarPage() {
  const { signIn, user } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect
  if (user) {
    router.push("/membro");
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: err } = await signIn(email, password);
    if (err) {
      setError("Email ou password incorrectos. Tenta novamente.");
      setLoading(false);
    } else {
      router.push("/membro");
    }
  }

  return (
    <section className="bg-cream px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-md">
        <h1 className="text-center font-serif text-3xl text-brown-900">
          Entrar na tua área
        </h1>
        <p className="mt-3 text-center text-brown-600">
          Acede à tua experiência — audiobook, práticas, módulos.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-5">
          <div>
            <label htmlFor="login-email" className="font-sans text-sm font-medium text-brown-700">
              Email
            </label>
            <input
              id="login-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="mt-1 w-full rounded-lg border border-brown-100 bg-white px-4 py-3 font-sans text-sm text-brown-900 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/30"
            />
          </div>
          <div>
            <label htmlFor="login-password" className="font-sans text-sm font-medium text-brown-700">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="mt-1 w-full rounded-lg border border-brown-100 bg-white px-4 py-3 font-sans text-sm text-brown-900 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/30"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-lg bg-sage px-8 py-3.5 font-sans text-[0.8rem] font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-sage-dark ${loading ? "opacity-60" : ""}`}
          >
            {loading ? "A entrar..." : "Entrar"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-brown-500">
          Ainda não tens acesso?{" "}
          <Link href="/livro-fisico" className="text-sage underline hover:text-sage-dark">
            Adquire a experiência aqui
          </Link>
        </p>
      </div>
    </section>
  );
}
