"use client";

import { useState } from "react";
import Link from "next/link";

type AuthMode = "login" | "register";

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: Connect to Supabase auth
    // For now, redirect to feed
    window.location.href = "/feed";
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-8">
        {/* Logo/Brand */}
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-veu-600 text-2xl text-white shadow-lg shadow-veu-600/30">
            7
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Sete Ecos</h1>
          <p className="mt-1 text-sm text-gray-500">
            Comunidade d&apos;Os 7 Véus
          </p>
        </div>

        {/* Auth Form */}
        <div className="card !p-6">
          {/* Tabs */}
          <div className="mb-6 flex rounded-xl bg-gray-100 p-1">
            <button
              onClick={() => setMode("login")}
              className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all ${
                mode === "login"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500"
              }`}
            >
              Entrar
            </button>
            <button
              onClick={() => setMode("register")}
              className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all ${
                mode === "register"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500"
              }`}
            >
              Criar conta
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Nome
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="O teu nome"
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Nome de utilizador
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="@username"
                    className="input-field"
                    required
                  />
                </div>
              </>
            )}

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="o.teu@email.com"
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Palavra-passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input-field"
                required
              />
            </div>

            <button type="submit" className="btn-primary w-full !py-3">
              {mode === "login" ? "Entrar" : "Criar conta"}
            </button>
          </form>

          {mode === "login" && (
            <p className="mt-4 text-center text-xs text-gray-500">
              Esqueceste a palavra-passe?{" "}
              <button className="font-medium text-veu-600 hover:underline">
                Recuperar
              </button>
            </p>
          )}
        </div>

        {/* Demo Access */}
        <div className="text-center">
          <Link
            href="/feed"
            className="text-sm text-gray-500 hover:text-veu-600"
          >
            Explorar sem conta &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
