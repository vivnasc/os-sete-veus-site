"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";

export default function EdicaoFisicaPage() {
  const { user } = useAuth();

  const features = [
    {
      icon: "📖",
      title: "Edição de Colecionador",
      description: "Capa dura premium com acabamento especial e numeração limitada",
    },
    {
      icon: "🌐",
      title: "Acesso GRÁTIS à Experiência Digital Completa",
      description: "Toda a plataforma online 'Os 7 Véus do Despertar' incluída (mesmo valor que a experiência digital)",
    },
    {
      icon: "📱",
      title: "Leitura Online Integrada",
      description: "Leitor integrado na plataforma - sem downloads, sempre disponível",
    },
    {
      icon: "🎨",
      title: "Ilustrações Originais",
      description: "Arte feita à mão pela autora em cada capítulo",
    },
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-sage/20 bg-gradient-to-b from-white to-cream">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Image */}
            <div className="order-2 lg:order-1">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-white shadow-2xl">
                <div className="relative h-full w-full bg-sage/10 flex items-center justify-center p-8">
                  <div className="text-center">
                    <p className="text-sage text-lg mb-2">Livro Físico</p>
                    <p className="font-display text-2xl text-forest">Os Sete Véus</p>
                    <p className="text-sage text-sm mt-4">(Imagem em breve)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <div className="inline-block rounded-full bg-sage/10 px-4 py-1 text-sm text-sage">
                ✨ Edição Limitada + Experiência Digital Incluída
              </div>

              <h1 className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl text-forest">
                Os Sete Véus
              </h1>

              <p className="mt-2 font-display text-xl text-sage">
                Edição Física de Colecionador
              </p>

              <div className="mt-8 flex items-baseline gap-2">
                <span className="font-display text-5xl text-forest">€24,90</span>
              </div>

              <div className="mt-6 rounded-lg bg-green-50 border border-green-200 p-4">
                <p className="text-forest font-medium">
                  🎁 <strong>BÓNUS:</strong> Ao comprar o livro físico, ganhas acesso GRÁTIS à experiência digital completa (mesmo valor da experiência da coleção)!
                </p>
              </div>

              <p className="mt-6 text-lg leading-relaxed text-sage">
                Uma viagem transformadora através dos sete véus da consciência.
                Esta edição física especial inclui conteúdo exclusivo,
                ilustrações originais, acabamento premium, E acesso à experiência
                digital interativa completa — tudo num só lugar.
              </p>

              <div className="mt-8 space-y-3">
                <button className="w-full rounded-lg bg-forest px-8 py-4 text-center font-display text-lg text-cream transition-colors hover:bg-sage">
                  Comprar Agora - €24,90
                </button>

                {!user && (
                  <Link
                    href="/registar"
                    className="block w-full rounded-lg border-2 border-sage px-8 py-4 text-center font-display text-lg text-sage transition-colors hover:bg-sage/10"
                  >
                    Criar Conta para Comprar
                  </Link>
                )}
              </div>

              <div className="mt-8 space-y-2 text-sm text-sage">
                <div className="flex items-center gap-2">
                  <span>🚚</span>
                  <span>Envio grátis para Portugal Continental</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>📦</span>
                  <span>Entrega em 3-5 dias úteis</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🔒</span>
                  <span>Pagamento seguro</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-sage/20 px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center font-display text-3xl sm:text-4xl text-forest">
            O Que Está Incluído
          </h2>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-sage/20 bg-white/50 p-6 text-center hover:shadow-md transition-shadow"
              >
                <div className="mb-4 text-4xl">{feature.icon}</div>
                <h3 className="font-display text-lg text-forest">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-sage">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About the Book */}
      <section className="border-b border-sage/20 px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center font-display text-3xl sm:text-4xl text-forest">
            Sobre o Livro
          </h2>

          <div className="mt-8 space-y-4 text-lg leading-relaxed text-sage">
            <p>
              "Os Sete Véus" é uma jornada profunda de autoconhecimento,
              explorando as camadas que cobrem a nossa verdadeira essência.
            </p>
            <p>
              Através de histórias, reflexões e práticas, este livro convida-te
              a descobrir quem realmente és por baixo dos véus do medo, da dúvida
              e das expectativas alheias.
            </p>
            <p>
              Esta edição física premium foi cuidadosamente desenhada para ser
              não apenas um livro, mas uma experiência sensorial completa.
            </p>
          </div>

          <div className="mt-12 rounded-lg border border-sage/20 bg-white/50 p-8">
            <h3 className="font-display text-xl text-forest">
              Especificações Técnicas
            </h3>
            <dl className="mt-4 grid gap-3 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-sage">Formato</dt>
                <dd className="text-forest">15 x 21 cm</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-sage">Páginas</dt>
                <dd className="text-forest">280 páginas</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-sage">Encadernação</dt>
                <dd className="text-forest">Capa dura</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-sage">Papel</dt>
                <dd className="text-forest">Pólen 90g</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Digital Experience */}
      <section className="border-b border-sage/20 px-6 py-16 sm:py-24 bg-gradient-to-b from-sage/5 to-transparent">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-display text-3xl sm:text-4xl text-forest">
            + Experiência Digital Incluída
          </h2>
          <p className="mt-4 text-lg text-sage">
            Ao comprar o livro físico, ganhas acesso imediato à plataforma online
            com leitura integrada, meditações guiadas, reflexões e comunidade privada.
          </p>
          <p className="mt-2 text-sm text-sage/70">
            (Mesmo valor que a experiência digital - GRÁTIS para quem comprar o livro físico)
          </p>

          <div className="mt-8">
            <Link
              href="/experiencia"
              className="inline-block rounded-lg border-2 border-sage px-6 py-3 text-sage hover:bg-sage/10 transition-colors"
            >
              Saber mais sobre a experiência digital →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl sm:text-4xl text-forest">
            Pronta para Começar a Tua Jornada?
          </h2>
          <p className="mt-4 text-lg text-sage">
            Edição limitada. Cada exemplar é único e numerado.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <button className="rounded-lg bg-forest px-8 py-4 font-display text-lg text-cream transition-colors hover:bg-sage">
              Comprar Livro Físico - €24,90
            </button>
            <Link
              href="/experiencia"
              className="rounded-lg border-2 border-sage px-8 py-4 font-display text-lg text-sage transition-colors hover:bg-sage/10"
            >
              Ver Só Experiência Digital
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
