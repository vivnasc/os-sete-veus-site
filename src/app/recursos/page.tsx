import type { Metadata } from "next";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Recursos Gratuitos",
  description:
    "Presentes para quem quer começar. Um teste, um diário, perguntas que ninguém te fez. Sem pressa. Sem compromisso.",
};

const freeResource = {
  title: "Qual véu te esconde?",
  description:
    "Um teste breve e gentil para descobrires qual dos sete véus pode estar a esconder-te de ti mesma. Sem julgamento. Apenas curiosidade.",
  type: "Teste interactivo",
  access: "Acesso imediato",
};

const emailResources = [
  {
    title: "Diário dos Sete Véus",
    description:
      "Sete dias, sete perguntas. Um diário de reflexão que te convida a olhar para dentro — devagar.",
    type: "PDF",
  },
  {
    title: "Perguntas que Ninguém te Fez",
    description:
      "Uma colecção de perguntas para os momentos em que precisas de companhia honesta — nem que seja a tua própria.",
    type: "PDF",
  },
  {
    title: "Carta da Vivianne",
    description:
      "Uma carta pessoal sobre o que me levou a escrever Os Sete Véus. Para leres quando quiseres.",
    type: "Carta",
  },
  {
    title: "Guia de Leitura Acompanhada",
    description:
      "Sugestões de como ler Os Sete Véus ao teu ritmo — sozinha ou em grupo.",
    type: "PDF",
  },
  {
    title: "Playlist dos Sete Véus",
    description: "Músicas que acompanham cada véu. Para ouvires enquanto lês, ou quando precisares de parar.",
    type: "Playlist",
  },
  {
    title: "Mapa dos Véus",
    description:
      "Uma visão geral dos sete véus e como se relacionam — para quem gosta de ver o todo antes das partes.",
    type: "Infográfico",
  },
];

export default function RecursosPage() {
  return (
    <>
      {/* Hero */}
      <section className="px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-serif text-4xl leading-tight text-warm-900 sm:text-5xl">
            Presentes para ti
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-warm-600">
            Um teste, um diário, perguntas que ninguém te fez. Começa por onde quiseres. Sem pressa.
          </p>
        </div>
      </section>

      {/* Instant access resource */}
      <section className="bg-warm-100 px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-widest text-warm-400">
            Acesso imediato — sem email
          </p>
          <div className="mt-6 rounded-2xl border border-warm-300 bg-white p-8 sm:p-10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl text-warm-800">{freeResource.title}</h2>
                <p className="mt-1 text-xs font-medium text-terracotta">{freeResource.type}</p>
              </div>
            </div>
            <p className="mt-4 text-base leading-relaxed text-warm-600">
              {freeResource.description}
            </p>
            <div className="mt-6">
              <button className="rounded-xl bg-terracotta px-8 py-4 text-sm font-medium text-white transition-colors hover:bg-terracotta-dark">
                Quero descobrir
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Email resources */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <h2 className="font-serif text-3xl text-warm-800">Queres levar mais contigo?</h2>
            <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-warm-600">
              Deixa o teu email e enviamos estes recursos para o teu cantinho — também grátis.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {emailResources.map((resource) => (
              <div
                key={resource.title}
                className="rounded-2xl border border-warm-200 p-6 transition-colors hover:border-warm-300"
              >
                <p className="text-xs font-medium text-warm-400">{resource.type}</p>
                <h3 className="mt-2 font-serif text-lg text-warm-800">{resource.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-warm-500">
                  {resource.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl bg-warm-100 p-8 sm:p-10">
            <p className="text-center text-sm text-warm-600">
              Deixa o teu email. Enviamos os recursos só para ti — sem spam, sem pressão.
            </p>
            <div className="mt-6">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
