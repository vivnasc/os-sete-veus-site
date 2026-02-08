"use client";

import { useState } from "react";
import Link from "next/link";
import { PRICING } from "@/data/experiences";

type Currency = "usd" | "mt" | "brl" | "eur";

const currencyLabels: Record<Currency, { symbol: string; label: string }> = {
  usd: { symbol: "$", label: "USD — Mundial" },
  mt: { symbol: "", label: "MT — Moçambique" },
  brl: { symbol: "R$", label: "BRL — Brasil" },
  eur: { symbol: "€", label: "EUR — Europa" },
};

export default function PricingTiers() {
  const [currency, setCurrency] = useState<Currency>("usd");
  const cur = currencyLabels[currency];

  const formatPrice = (prices: { usd: number; mt: number; brl: number; eur: number }) => {
    const value = prices[currency];
    if (currency === "mt") return `${value.toLocaleString("pt-MZ")} MT`;
    return `${cur.symbol}${value}`;
  };

  return (
    <div>
      {/* Currency selector */}
      <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
        {(Object.keys(currencyLabels) as Currency[]).map((key) => (
          <button
            key={key}
            onClick={() => setCurrency(key)}
            className={`rounded-full px-4 py-1.5 font-sans text-[0.65rem] uppercase tracking-[0.1em] transition-all ${
              currency === key
                ? "bg-brown-900 text-cream"
                : "border border-brown-200 text-brown-500 hover:border-brown-400"
            }`}
          >
            {currencyLabels[key].label}
          </button>
        ))}
      </div>

      {/* Tiers */}
      <div className="grid gap-6 sm:grid-cols-3">
        {/* Individual */}
        <div className="rounded-2xl border border-brown-100 bg-white p-7 shadow-sm">
          <p className="font-sans text-[0.7rem] font-medium uppercase tracking-[0.2em] text-brown-400">
            Uma experiência
          </p>
          <p className="mt-3 font-sans text-3xl font-bold text-brown-900">
            {formatPrice(PRICING.individual)}
          </p>
          <p className="mt-1 text-sm text-brown-400">por véu</p>
          <ul className="mt-6 space-y-2.5">
            {[
              "7 capítulos de ficção imersiva",
              "Respiração guiada entre capítulos",
              "Diário de reflexão com auto-save",
              "Checklist interactivo",
              "Cerimónia de conclusão",
              "O Teu Espelho pessoal",
              "4 práticas de áudio",
              "Acesso permanente",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm text-brown-600"
              >
                <span className="mt-0.5 text-sage">&#10003;</span>
                {item}
              </li>
            ))}
          </ul>
          <Link
            href="/entrar"
            className="mt-6 block rounded-md border-2 border-sage bg-sage px-6 py-3 text-center font-sans text-[0.75rem] font-medium uppercase tracking-[0.12em] text-white transition-all hover:bg-transparent hover:text-sage"
          >
            Começar agora
          </Link>
        </div>

        {/* Pack of 3 — highlighted */}
        <div className="relative rounded-2xl border-2 border-sage bg-white p-7 shadow-md">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-sage px-4 py-1 font-sans text-[0.6rem] font-medium uppercase tracking-[0.15em] text-white">
            Mais popular
          </div>
          <p className="font-sans text-[0.7rem] font-medium uppercase tracking-[0.2em] text-sage">
            Pack de 3 véus
          </p>
          <p className="mt-3 font-sans text-3xl font-bold text-brown-900">
            {formatPrice(PRICING.pack3)}
          </p>
          <p className="mt-1 text-sm text-brown-400">
            poupa {PRICING.pack3Savings}%
          </p>
          <ul className="mt-6 space-y-2.5">
            {[
              "Escolhe 3 experiências",
              "Tudo da experiência individual",
              "Espelho unificado (21 reflexões)",
              "Acesso permanente a todas as 3",
              "Upgrade para jornada a qualquer momento",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm text-brown-600"
              >
                <span className="mt-0.5 text-sage">&#10003;</span>
                {item}
              </li>
            ))}
          </ul>
          <Link
            href="/entrar"
            className="mt-6 block rounded-md bg-sage px-6 py-3 text-center font-sans text-[0.75rem] font-medium uppercase tracking-[0.12em] text-white transition-all hover:bg-sage-dark"
          >
            Comprar pack
          </Link>
        </div>

        {/* Complete journey */}
        <div className="rounded-2xl border border-brown-100 bg-white p-7 shadow-sm">
          <p className="font-sans text-[0.7rem] font-medium uppercase tracking-[0.2em] text-brown-400">
            Jornada completa
          </p>
          <p className="mt-3 font-sans text-3xl font-bold text-brown-900">
            {formatPrice(PRICING.journey)}
          </p>
          <p className="mt-1 text-sm text-brown-400">
            poupa {PRICING.journeySavings}%
          </p>
          <ul className="mt-6 space-y-2.5">
            {[
              "Todas as 7 experiências",
              "Acesso antecipado a novos véus",
              "Espelho completo (49 reflexões)",
              "Cerimónia final exclusiva",
              "28 práticas de áudio",
              "Acesso vitalício",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm text-brown-600"
              >
                <span className="mt-0.5 text-sage">&#10003;</span>
                {item}
              </li>
            ))}
          </ul>
          <Link
            href="/entrar"
            className="mt-6 block rounded-md border-2 border-brown-900 bg-brown-900 px-6 py-3 text-center font-sans text-[0.75rem] font-medium uppercase tracking-[0.12em] text-cream transition-all hover:bg-transparent hover:text-brown-900"
          >
            Comprar jornada
          </Link>
        </div>
      </div>

      {/* Upgrade guarantee */}
      <p className="mt-6 text-center font-sans text-xs text-brown-400">
        Compraste uma experiência e queres todas? O valor já pago é descontado
        no upgrade. Nunca perdes o que investiste.
      </p>
    </div>
  );
}
