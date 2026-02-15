"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const VALORES_SUGERIDOS = [
  { label: "65 MZN", valor: 65, moeda: "MZN" },
  { label: "200 MZN", valor: 200, moeda: "MZN" },
  { label: "500 MZN", valor: 500, moeda: "MZN" },
  { label: "$5", valor: 5, moeda: "USD" },
  { label: "$10", valor: 10, moeda: "USD" },
  { label: "$25", valor: 25, moeda: "USD" },
];

export default function SementePage() {
  const [valorSelecionado, setValorSelecionado] = useState<number | null>(null);
  const [moedaSelecionada, setMoedaSelecionada] = useState<"MZN" | "USD">("MZN");
  const [metodo, setMetodo] = useState<"paypal" | "mpesa" | null>(null);
  const [mostrarObrigada, setMostrarObrigada] = useState(false);

  const paypalLink = `https://www.paypal.com/paypalme/vivsaraiva/${valorSelecionado || ""}`;
  const mpesaNumero = "+258 851 006 473";

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-white">
      {/* Hero */}
      <section className="px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-sage/10">
            <span className="text-3xl">&#127793;</span>
          </div>

          <p className="font-sans text-[0.6rem] uppercase tracking-[0.3em] text-sage">
            Plantar uma semente
          </p>

          <h1 className="mx-auto mt-4 max-w-xl font-serif text-4xl leading-tight text-brown-900">
            Este trabalho existe porque alguém acreditou que merecia existir.
          </h1>

          <p className="mx-auto mt-6 max-w-lg font-serif text-base leading-relaxed text-brown-600">
            Os Sete Véus é um projecto de impacto social e evolutivo. Não vende promessas
            — oferece espelhos. Se esta experiência te tocou, podes plantar uma semente:
            um gesto livre, sem obrigação, que permite que este trabalho continue a crescer
            e a chegar a quem precisa.
          </p>
        </motion.div>
      </section>

      {/* Valores */}
      <section className="mx-auto max-w-xl px-6 pb-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {/* Moeda toggle */}
          <div className="mb-6 flex justify-center gap-2">
            <button
              onClick={() => setMoedaSelecionada("MZN")}
              className={`rounded-full px-4 py-1.5 font-sans text-xs transition-all ${
                moedaSelecionada === "MZN"
                  ? "bg-brown-900 text-white"
                  : "border border-brown-200 text-brown-500 hover:bg-brown-50"
              }`}
            >
              Meticais (MZN)
            </button>
            <button
              onClick={() => setMoedaSelecionada("USD")}
              className={`rounded-full px-4 py-1.5 font-sans text-xs transition-all ${
                moedaSelecionada === "USD"
                  ? "bg-brown-900 text-white"
                  : "border border-brown-200 text-brown-500 hover:bg-brown-50"
              }`}
            >
              Dólares (USD)
            </button>
          </div>

          {/* Valor buttons */}
          <div className="grid grid-cols-3 gap-3">
            {VALORES_SUGERIDOS
              .filter((v) => v.moeda === moedaSelecionada)
              .map((v) => (
                <button
                  key={v.label}
                  onClick={() => setValorSelecionado(v.valor)}
                  className={`rounded-xl border-2 px-4 py-4 font-serif text-xl transition-all ${
                    valorSelecionado === v.valor
                      ? "border-sage bg-sage/10 text-sage"
                      : "border-brown-100 text-brown-700 hover:border-sage/50"
                  }`}
                >
                  {v.label}
                </button>
              ))}
          </div>

          <p className="mt-4 text-center font-sans text-xs text-brown-400">
            Ou o valor que quiseres — cada semente conta.
          </p>

          {/* Método de pagamento */}
          {valorSelecionado && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-8 space-y-3 overflow-hidden"
            >
              <p className="text-center font-sans text-xs uppercase tracking-wider text-brown-500">
                Como preferes enviar?
              </p>

              {/* PayPal */}
              <button
                onClick={() => setMetodo("paypal")}
                className={`w-full rounded-xl border-2 p-4 text-left transition-all ${
                  metodo === "paypal"
                    ? "border-sage bg-sage/5"
                    : "border-brown-100 hover:border-sage/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">&#128179;</span>
                  <div>
                    <p className="font-sans text-sm font-medium text-brown-800">PayPal</p>
                    <p className="font-sans text-xs text-brown-400">
                      Pagamento internacional seguro
                    </p>
                  </div>
                </div>
              </button>

              {/* M-Pesa */}
              <button
                onClick={() => setMetodo("mpesa")}
                className={`w-full rounded-xl border-2 p-4 text-left transition-all ${
                  metodo === "mpesa"
                    ? "border-sage bg-sage/5"
                    : "border-brown-100 hover:border-sage/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">&#128241;</span>
                  <div>
                    <p className="font-sans text-sm font-medium text-brown-800">M-Pesa</p>
                    <p className="font-sans text-xs text-brown-400">
                      Pagamento mobile Moçambique
                    </p>
                  </div>
                </div>
              </button>
            </motion.div>
          )}

          {/* Instruções de pagamento */}
          {metodo && valorSelecionado && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6"
            >
              {metodo === "paypal" ? (
                <div className="rounded-xl bg-white p-6 shadow-sm text-center">
                  <p className="font-serif text-sm text-brown-600 mb-4">
                    Serás redirigida para o PayPal.
                  </p>
                  <a
                    href={paypalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setTimeout(() => setMostrarObrigada(true), 2000)}
                    className="inline-block rounded-full bg-sage px-8 py-3 font-sans text-sm font-medium text-white transition-colors hover:bg-sage-dark"
                  >
                    Enviar {valorSelecionado} {moedaSelecionada} via PayPal
                  </a>
                </div>
              ) : (
                <div className="rounded-xl bg-white p-6 shadow-sm">
                  <p className="text-center font-serif text-sm text-brown-600 mb-3">
                    Envia para o número M-Pesa:
                  </p>
                  <p className="text-center font-serif text-2xl font-medium text-brown-900">
                    {mpesaNumero}
                  </p>
                  <p className="mt-2 text-center font-sans text-xs text-brown-400">
                    Valor: {valorSelecionado} MZN &middot; Nome: Vivianne dos Santos
                  </p>
                  <button
                    onClick={() => setMostrarObrigada(true)}
                    className="mt-4 w-full rounded-full bg-sage px-6 py-3 font-sans text-sm font-medium text-white transition-colors hover:bg-sage-dark"
                  >
                    Já enviei
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* Obrigada */}
          {mostrarObrigada && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-10 rounded-2xl border-l-[3px] border-sage bg-sage/5 p-6 text-center"
            >
              <p className="font-serif text-lg text-brown-800">
                Obrigada.
              </p>
              <p className="mt-2 font-serif text-sm italic text-brown-600">
                Cada semente que plantas permite que alguém, algures, encontre este espelho
                quando mais precisar. O teu gesto não é pequeno — é raiz.
              </p>
              <p className="mt-4 font-serif text-sm text-brown-500">
                — Vivianne
              </p>
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* Transparência */}
      <section className="border-t border-brown-100 bg-white px-6 py-16">
        <div className="mx-auto max-w-xl text-center">
          <p className="font-sans text-[0.6rem] uppercase tracking-[0.3em] text-brown-400">
            Para onde vai cada semente
          </p>
          <div className="mt-8 grid gap-6 text-left sm:grid-cols-3">
            <div>
              <p className="font-serif text-base text-brown-800">Criação</p>
              <p className="mt-1 font-sans text-xs text-brown-500">
                Novos Espelhos, práticas guiadas e conteúdo que nasce da escuta.
              </p>
            </div>
            <div>
              <p className="font-serif text-base text-brown-800">Acesso</p>
              <p className="mt-1 font-sans text-xs text-brown-500">
                Manter recursos gratuitos e experiências acessíveis para quem precisa.
              </p>
            </div>
            <div>
              <p className="font-serif text-base text-brown-800">Presença</p>
              <p className="mt-1 font-sans text-xs text-brown-500">
                A plataforma, a comunidade, o espaço onde tudo se encontra.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Voltar */}
      <div className="px-6 py-8 text-center">
        <Link
          href="/"
          className="font-sans text-xs text-brown-400 hover:text-brown-600"
        >
          &larr; Voltar ao início
        </Link>
      </div>
    </div>
  );
}
