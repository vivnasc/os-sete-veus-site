import type { Metadata } from "next";
import Image from "next/image";
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
  image: "/images/recurso-teste.png",
};

const downloadResources = [
  {
    title: "Diário dos Sete Véus",
    description: "Sete dias, sete perguntas. Um diário de reflexão que te convida a olhar para dentro — devagar.",
    type: "PDF",
    image: "/images/recurso-diario.png",
    href: "/recursos/03_diario_7_dias.pdf",
  },
  {
    title: "Perguntas que Ninguém te Fez",
    description: "Uma colecção de perguntas para os momentos em que precisas de companhia honesta — nem que seja a tua própria.",
    type: "PDF",
    image: "/images/recurso-perguntas.png",
    href: "/recursos/01_7_perguntas.pdf",
  },
  {
    title: "Mini-Guia Os Sete Véus",
    description: "Uma visão geral dos sete véus e como se relacionam — para quem gosta de ver o todo antes das partes.",
    type: "PDF",
    image: "/images/recurso-miniguia.png",
    href: "/recursos/MINI_GUIA_OS7VEUS.pdf",
  },
  {
    title: "Checklist do Véu da Ilusão",
    description: "Uma checklist gentil para perceberes se o Véu da Ilusão pode estar presente na tua vida.",
    type: "PDF",
    image: "/images/recurso-checklist.png",
    href: "/recursos/CHECKLIST_VEU_DA_ILUSAO.pdf",
  },
  {
    title: "Glossário dos Sete Véus",
    description: "Todos os conceitos e ideias dos sete véus, explicados de forma simples e acessível.",
    type: "PDF",
    image: "/images/recurso-glossario.png",
    href: "/recursos/04_glossario.pdf",
  },
  {
    title: "Wallpapers Inspiradores",
    description: "Imagens e frases para o teu telemóvel — um lembrete diário de que mereces mais.",
    type: "ZIP",
    image: "/images/recurso-wallpapers.png",
    href: "/recursos/wallpaper_11_roxo_escuro.zip",
  },
];

export default function RecursosPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-cream px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-serif text-4xl leading-tight text-brown-900 sm:text-5xl">
            Presentes para ti
          </h1>
          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-brown-600">
            Um teste, um diário, perguntas que ninguém te fez. Começa por onde quiseres. Sem pressa.
            Sem compromisso. Apenas para ti.
          </p>
        </div>
      </section>

      {/* Free zone — green tint like Ghost */}
      <section className="bg-[#e8f0e8] px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <p className="font-sans text-[0.7rem] font-medium uppercase tracking-[0.2em] text-sage">
            Acesso imediato — sem email
          </p>
          <div className="mt-6 overflow-hidden rounded-2xl border border-sage/20 bg-white shadow-sm">
            <div className="items-center gap-0 md:flex">
              <div className="shrink-0">
                <Image
                  src={freeResource.image}
                  alt={freeResource.title}
                  width={280}
                  height={280}
                  className="h-auto w-full object-cover md:w-[280px]"
                />
              </div>
              <div className="flex-1 p-8">
                <p className="font-sans text-[0.7rem] font-medium uppercase tracking-[0.15em] text-sage">
                  {freeResource.type}
                </p>
                <h2 className="mt-2 font-serif text-2xl text-brown-900">{freeResource.title}</h2>
                <p className="mt-3 leading-relaxed text-brown-600">{freeResource.description}</p>
                <div className="mt-6">
                  <a href="/recursos/teste" className="inline-block rounded-md bg-sage px-8 py-3.5 font-sans text-[0.8rem] font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-sage-dark">
                    Quero descobrir
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Downloadable resources */}
      <section className="bg-cream-dark px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h2 className="font-serif text-3xl text-brown-900">Recursos para descarregar</h2>
            <p className="mx-auto mt-4 max-w-md leading-relaxed text-brown-600">
              Presentes pensados para ti — descarrega os que te chamarem a atenção. Sem pressa.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {downloadResources.map((resource) => (
              <a
                key={resource.title}
                href={resource.href}
                download
                className="group overflow-hidden rounded-2xl border border-brown-100 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <Image
                  src={resource.image}
                  alt={resource.title}
                  width={400}
                  height={300}
                  className="h-48 w-full object-cover"
                />
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <p className="font-sans text-[0.65rem] font-medium uppercase tracking-[0.15em] text-brown-400">
                      {resource.type}
                    </p>
                    <span className="rounded-full bg-sage/10 px-3 py-1 font-sans text-[0.6rem] font-medium uppercase tracking-wider text-sage transition-colors group-hover:bg-sage group-hover:text-white">
                      Descarregar
                    </span>
                  </div>
                  <h3 className="mt-2 font-serif text-lg text-brown-900">{resource.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brown-600">{resource.description}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="mx-auto mt-16 max-w-2xl rounded-2xl bg-cream px-8 py-10 sm:px-10">
            <h3 className="text-center font-serif text-xl text-brown-900">
              Queres receber novidades?
            </h3>
            <p className="mt-3 text-center text-brown-600">
              Deixa o teu email. Avisamos quando houver novos recursos e livros — sem spam, sem pressão.
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
