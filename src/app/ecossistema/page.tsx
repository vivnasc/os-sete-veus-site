import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Ecossistema Sete Ecos — Plataforma de Autoconhecimento",
  description:
    "Descobre o ecossistema completo: livros, práticas guiadas, diário de reflexão, comunidade e recursos gratuitos. Tudo num só lugar, ao teu ritmo.",
  openGraph: {
    title: "Ecossistema Sete Ecos — Plataforma de Autoconhecimento",
    description:
      "Livros, práticas guiadas, diário de reflexão, comunidade e recursos — tudo ao teu ritmo.",
  },
};

const pilares = [
  {
    icon: "📖",
    title: "Colecção Espelhos",
    description:
      "7 ficções de transformação interior. Histórias onde te reconheces. Cada Espelho tem 7 capítulos, práticas de respiração, diário de reflexão e espelho pessoal.",
    color: "#c9b896",
    link: "/experiencias",
    linkText: "Ver Colecção Espelhos",
  },
  {
    icon: "&#8734;",
    title: "Colecção Nós",
    description:
      "7 ficções relacionais. O que se passa entre duas pessoas quando um véu cai. Cada Nó desbloqueia ao completar o Espelho correspondente.",
    color: "#c9a87c",
    link: "/os-sete-veus",
    linkText: "Ver Colecção Nós",
  },
  {
    icon: "🪞",
    title: "Diário de Reflexão",
    description:
      "Em cada capítulo, escreves o que sentes. As tuas palavras ficam guardadas. No final, O Teu Espelho devolve-te tudo o que escreveste.",
    color: "#7a8c6e",
    link: "/comecar",
    linkText: "Como funciona",
  },
  {
    icon: "🎧",
    title: "Práticas Guiadas",
    description:
      "Meditações e exercícios de respiração para integrar cada véu. Áudio original, feito para acompanhar a tua leitura.",
    color: "#c08aaa",
    link: "/comecar",
    linkText: "Experimenta",
  },
  {
    icon: "📝",
    title: "Recursos Gratuitos",
    description:
      "Teste de autoconhecimento, diário de 7 dias, guias e wallpapers. Sem compromisso — são teus.",
    color: "#8aaaca",
    link: "/recursos",
    linkText: "Acede grátis",
  },
  {
    icon: "🌊",
    title: "Comunidade Anónima",
    description:
      "Ecos, Maré, Círculo e Fogueira — um espaço onde a conexão acontece por reconhecimento, não por interação. Tudo anónimo. Tudo impermanente.",
    color: "#6a8a7a",
    link: "/comunidade",
    linkText: "Descobre a comunidade",
  },
];

const numeros = [
  { valor: "2", label: "Colecções de ficção", cor: "#c9b896" },
  { valor: "7", label: "Livros por colecção", cor: "#c9a87c" },
  { valor: "7", label: "Capítulos por livro", cor: "#7a8c6e" },
  { valor: "4", label: "Espaços comunitários", cor: "#6a8a7a" },
  { valor: "8+", label: "Recursos gratuitos", cor: "#8aaaca" },
];

const jornada = [
  {
    step: 1,
    title: "Descobre",
    text: "Faz o teste gratuito, lê um artigo, explora os recursos. Sem pressa, sem compromisso.",
  },
  {
    step: 2,
    title: "Experimenta",
    text: "Descarrega o diário de 7 dias, ouve uma meditação, sente se isto ressoa contigo.",
  },
  {
    step: 3,
    title: "Mergulha",
    text: "Adquire o teu primeiro livro. Lê no site, reflecte, escreve. Ao teu ritmo.",
  },
  {
    step: 4,
    title: "Integra",
    text: "As práticas guiadas e o diário de reflexão ajudam-te a transformar leitura em vivência.",
  },
  {
    step: 5,
    title: "Partilha",
    text: "Na comunidade, libertas reflexões anónimas e encontras reconhecimento. Sem máscara, sem julgamento.",
  },
  {
    step: 6,
    title: "Expande",
    text: "Cada novo véu é uma nova camada. A colecção cresce contigo, à medida que avanças.",
  },
];

const depoimentos = [
  {
    texto:
      "Nunca pensei que um livro me fizesse parar e escrever sobre mim mesma. O diário de reflexão mudou a forma como leio.",
    nome: "Ana M.",
    detalhe: "Maputo, Moçambique",
  },
  {
    texto:
      "Não é um livro que se lê — é um livro que se vive. As pausas entre capítulos são tão importantes quanto as palavras.",
    nome: "Carla S.",
    detalhe: "Lisboa, Portugal",
  },
  {
    texto:
      "Comecei pelo teste gratuito, achei que seria superficial. Acabei por comprar o livro nesse mesmo dia.",
    nome: "Beatriz L.",
    detalhe: "São Paulo, Brasil",
  },
];

export default function EcossistemaPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-gradient-animated bg-gradient-to-br from-brown-800 via-[#3d3630] to-brown-900 px-6 py-28 sm:py-36">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal variant="scale" duration={0.9}>
            <Image
              src="/images/logo-espiral.png.jpeg"
              alt="Sete Ecos"
              width={72}
              height={72}
              className="mx-auto rounded-full animate-float"
            />
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="mt-6 font-sans text-[0.7rem] uppercase tracking-[0.25em] text-sage-light">
              Ecossistema Sete Ecos
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.25}>
            <h1 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-cream sm:text-5xl md:text-[3.5rem]">
              Mais do que livros.
              <br />
              Uma plataforma de regresso a ti.
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.4}>
            <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-brown-200">
              Duas colecções de ficção (Espelhos e Nós), um livro filosófico,
              diário de reflexão, práticas guiadas, comunidade anónima e recursos gratuitos
              — tudo construído para quem quer viver com mais verdade.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.55}>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/recursos/teste"
                className="animate-pulse-glow inline-block rounded-md border-2 border-cream bg-cream px-8 py-3.5 font-sans text-[0.8rem] font-medium uppercase tracking-[0.15em] text-brown-900 transition-all hover:bg-transparent hover:text-cream"
              >
                Começa grátis — faz o teste
              </Link>
              <Link
                href="#pilares"
                className="inline-block rounded-md border-2 border-brown-300 bg-transparent px-8 py-3.5 font-sans text-[0.8rem] font-medium uppercase tracking-[0.15em] text-brown-200 transition-all hover:border-cream hover:bg-cream hover:text-brown-900"
              >
                Explora o ecossistema
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Números de impacto */}
      <section className="bg-cream px-6 py-16">
        <div className="mx-auto grid max-w-3xl gap-5 sm:grid-cols-4">
          {numeros.map((n, i) => (
            <ScrollReveal key={n.label} delay={0.1 * i} variant="scale">
              <div className="rounded-xl bg-white px-4 py-5 text-center shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md">
                <p className="font-serif text-3xl" style={{ color: n.cor }}>
                  {n.valor}
                </p>
                <p className="mt-1 font-sans text-[0.65rem] uppercase tracking-wider text-brown-400">
                  {n.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* O que é o ecossistema */}
      <section className="bg-cream-dark px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal>
            <h2 className="font-serif text-3xl text-brown-900 sm:text-4xl">
              O que é o ecossistema Sete Ecos?
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="mx-auto mt-6 max-w-xl leading-relaxed text-brown-700">
              Duas colecções de 7 livros cada — os <strong>Espelhos</strong> (ficção interior)
              e os <strong>Nós</strong> (ficção relacional) — mais um livro filosófico,
              uma comunidade anónima e recursos gratuitos. Tudo num espaço digital construído
              para que a leitura não fique só nas páginas, mas entre na tua vida.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3} variant="fadeIn">
            <div className="mx-auto mt-8 max-w-lg rounded-r-xl border-l-[3px] border-sage bg-cream px-6 py-5 text-left">
              <p className="font-serif italic leading-relaxed text-brown-700">
                &ldquo;Um ecossistema que cresce contigo — porque a transformação não tem
                prazo, nem fórmula.&rdquo;
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 6 Pilares */}
      <section id="pilares" className="bg-cream px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <p className="text-center font-sans text-[0.7rem] uppercase tracking-[0.2em] text-sage">
              Os pilares da plataforma
            </p>
            <h2 className="mt-3 text-center font-serif text-3xl text-brown-900 sm:text-4xl">
              Tudo o que precisas, num só lugar
            </h2>
          </ScrollReveal>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {pilares.map((pilar, i) => (
              <ScrollReveal key={pilar.title} delay={0.1 * i} variant="fadeUp">
                <div className="group flex h-full flex-col rounded-2xl border border-brown-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-full text-2xl"
                    style={{ backgroundColor: `${pilar.color}20` }}
                  >
                    {pilar.icon}
                  </div>
                  <h3 className="mt-4 font-serif text-xl text-brown-900">
                    {pilar.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-brown-600">
                    {pilar.description}
                  </p>
                  <Link
                    href={pilar.link}
                    className="mt-4 inline-block font-sans text-sm font-medium text-sage transition-colors hover:text-sage-dark"
                  >
                    {pilar.linkText} &rarr;
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Jornada do utilizador */}
      <section className="bg-gradient-to-b from-brown-800 to-brown-900 px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
            <p className="text-center font-sans text-[0.7rem] uppercase tracking-[0.25em] text-brown-400">
              A tua jornada
            </p>
            <h2 className="mt-3 text-center font-serif text-3xl text-cream sm:text-4xl">
              Do primeiro passo à transformação
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-center leading-relaxed text-brown-300">
              Não há caminho certo. Há o teu. Mas se quiseres uma sugestão, aqui está
              como muitas começaram:
            </p>
          </ScrollReveal>
          <div className="mt-14 space-y-8">
            {jornada.map((etapa, i) => (
              <ScrollReveal key={etapa.step} delay={0.1 * i} variant="fadeLeft">
                <div className="flex items-start gap-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-sage font-sans text-base font-bold text-sage">
                    {etapa.step}
                  </span>
                  <div>
                    <h3 className="font-serif text-lg text-cream">{etapa.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-brown-300">
                      {etapa.text}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="bg-cream px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <p className="text-center font-sans text-[0.7rem] uppercase tracking-[0.2em] text-sage">
              Quem já começou
            </p>
            <h2 className="mt-3 text-center font-serif text-3xl text-brown-900 sm:text-4xl">
              Palavras de quem se reconheceu
            </h2>
          </ScrollReveal>
          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {depoimentos.map((dep, i) => (
              <ScrollReveal key={dep.nome} delay={0.15 * i} variant="scale">
                <div className="flex h-full flex-col rounded-2xl border border-brown-100 bg-white p-7 shadow-sm">
                  <p className="flex-1 font-serif text-base italic leading-relaxed text-brown-700">
                    &ldquo;{dep.texto}&rdquo;
                  </p>
                  <div className="mt-5 border-t border-brown-100 pt-4">
                    <p className="font-sans text-sm font-medium text-brown-900">
                      {dep.nome}
                    </p>
                    <p className="font-sans text-xs text-brown-400">{dep.detalhe}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Comparação: Antes vs Agora */}
      <section className="bg-cream-dark px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <h2 className="text-center font-serif text-3xl text-brown-900 sm:text-4xl">
              O que mudou com a reconstrução
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-center leading-relaxed text-brown-600">
              A plataforma foi reconstruída de raiz. Eis o que ganhas agora:
            </p>
          </ScrollReveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            <ScrollReveal delay={0.1} variant="fadeLeft">
              <div className="rounded-2xl border border-brown-200 bg-cream p-7">
                <p className="font-sans text-[0.7rem] font-medium uppercase tracking-[0.2em] text-brown-400">
                  Antes
                </p>
                <ul className="mt-4 space-y-3">
                  {[
                    "PDF para download",
                    "Leitura isolada, sem interacção",
                    "Sem registo de reflexões",
                    "Recursos dispersos",
                    "Sem acessibilidade",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-brown-500">
                      <span className="mt-0.5 text-brown-300">&#10005;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2} variant="fadeRight">
              <div className="rounded-2xl border border-sage/30 bg-white p-7 shadow-sm">
                <p className="font-sans text-[0.7rem] font-medium uppercase tracking-[0.2em] text-sage">
                  Agora — Ecossistema Sete Ecos
                </p>
                <ul className="mt-4 space-y-3">
                  {[
                    "Reader integrado com progresso visual",
                    "Diário de reflexão auto-guardado por capítulo",
                    "Checklists interactivos e O Teu Espelho",
                    "Práticas guiadas com áudio original",
                    "Painel de acessibilidade completo",
                    "Recursos gratuitos organizados",
                    "Modo nocturno para leitura confortável",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-brown-700">
                      <span className="mt-0.5 text-sage">&#10003;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Preços */}
      <section className="bg-cream px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <p className="text-center font-sans text-[0.7rem] uppercase tracking-[0.2em] text-sage">
              Simples e transparente
            </p>
            <h2 className="mt-3 text-center font-serif text-3xl text-brown-900 sm:text-4xl">
              Escolhe como queres começar
            </h2>
          </ScrollReveal>
          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {/* Grátis */}
            <ScrollReveal delay={0.1} variant="scale">
              <div className="flex h-full flex-col rounded-2xl border border-brown-100 bg-white p-7 shadow-sm">
                <p className="font-sans text-[0.7rem] font-medium uppercase tracking-[0.2em] text-brown-400">
                  Explorar
                </p>
                <p className="mt-3 font-sans text-3xl font-bold text-brown-900">
                  Grátis
                </p>
                <p className="mt-1 text-sm text-brown-500">Para sempre</p>
                <ul className="mt-6 flex-1 space-y-2">
                  {[
                    "Teste \"Qual véu te esconde?\"",
                    "Diário de reflexão de 7 dias",
                    "Guias e checklists em PDF",
                    "Artigos sobre autoconhecimento",
                    "Wallpapers inspiracionais",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-brown-600">
                      <span className="mt-0.5 text-sage">&#10003;</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/recursos"
                  className="mt-6 block rounded-md border-2 border-sage bg-transparent px-6 py-3 text-center font-sans text-[0.75rem] font-medium uppercase tracking-[0.12em] text-sage transition-all hover:bg-sage hover:text-white"
                >
                  Acede grátis
                </Link>
              </div>
            </ScrollReveal>

            {/* Espelhos */}
            <ScrollReveal delay={0.2} variant="scale">
              <div className="flex h-full flex-col rounded-2xl border border-brown-100 bg-white p-7 shadow-sm">
                <p className="font-sans text-[0.7rem] font-medium uppercase tracking-[0.2em] text-sage">
                  Colecção Espelhos
                </p>
                <p className="mt-3 font-sans text-3xl font-bold text-brown-900">
                  1.885 <span className="text-base font-normal text-brown-400">MZN</span>
                </p>
                <p className="mt-1 text-sm text-brown-500">$29 USD por Espelho</p>
                <ul className="mt-6 flex-1 space-y-2">
                  {[
                    "7 capítulos de ficção imersiva",
                    "Práticas de respiração guiada",
                    "Diário de reflexão auto-guardado",
                    "Checklists interactivos",
                    "O Teu Espelho pessoal",
                    "Nó correspondente incluído",
                    "Comunidade Ecos incluída",
                    "Acesso vitalício",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-brown-600">
                      <span className="mt-0.5 text-sage">&#10003;</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/comprar/espelhos"
                  className="mt-6 block rounded-md border-2 border-sage bg-sage px-6 py-3 text-center font-sans text-[0.75rem] font-medium uppercase tracking-[0.12em] text-white transition-all hover:bg-transparent hover:text-sage"
                >
                  Ver Colecção Espelhos
                </Link>
              </div>
            </ScrollReveal>

            {/* Livro Físico */}
            <ScrollReveal delay={0.3} variant="scale">
              <div className="flex h-full flex-col rounded-2xl border border-brown-100 bg-white p-7 shadow-sm">
                <p className="font-sans text-[0.7rem] font-medium uppercase tracking-[0.2em] text-brown-400">
                  Livro Filosófico
                </p>
                <p className="mt-3 font-sans text-3xl font-bold text-brown-900">
                  1.500 <span className="text-base font-normal text-brown-400">MZN</span>
                </p>
                <p className="mt-1 text-sm text-brown-500">$23 USD — Físico + digital</p>
                <ul className="mt-6 flex-1 space-y-2">
                  {[
                    "\"Os 7 Véus do Despertar\"",
                    "Edição física de alta qualidade",
                    "Versão digital incluída",
                    "Leitura contemplativa no site",
                    "Práticas guiadas por véu",
                    "Comunidade Ecos incluída",
                    "Entrega em Moçambique",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-brown-600">
                      <span className="mt-0.5 text-sage">&#10003;</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/comprar/livro"
                  className="mt-6 block rounded-md border-2 border-brown-900 bg-brown-900 px-6 py-3 text-center font-sans text-[0.75rem] font-medium uppercase tracking-[0.12em] text-cream transition-all hover:bg-transparent hover:text-brown-900"
                >
                  Ver opções do Livro
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-cream-dark px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
            <h2 className="text-center font-serif text-3xl text-brown-900">
              Perguntas frequentes
            </h2>
          </ScrollReveal>
          <div className="mt-12 space-y-8">
            {[
              {
                q: "O que são os Espelhos?",
                a: "São uma colecção de 7 ficções de transformação interior — histórias onde te reconheces. Cada Espelho corresponde a um véu (Ilusão, Medo, Culpa, Identidade, Controlo, Desejo, Separação) e inclui 7 capítulos, práticas de respiração, diário de reflexão e espelho pessoal. Actualmente está disponível o Espelho da Ilusão. Os restantes serão publicados ao longo de 2026.",
              },
              {
                q: "O que são os Nós?",
                a: "São uma colecção de 7 ficções relacionais — histórias sobre o que se passa entre duas pessoas quando um véu cai. Cada Nó é o par relacional de um Espelho. O Nó da Herança (par do Espelho da Ilusão) é a história de Sara e Helena, mãe e filha, e o silêncio herdado entre elas. Cada Nó desbloqueia ao completar o Espelho correspondente.",
              },
              {
                q: "Qual a diferença entre Espelhos e Nós?",
                a: "Os Espelhos mostram-te o véu que usas — olham para dentro. Os Nós mostram-te o que esse véu fez entre ti e outra pessoa — olham para a relação. São dois lados do mesmo fio. Primeiro lês o Espelho (a tua história), depois o Nó desbloqueia (a história entre duas pessoas).",
              },
              {
                q: "E o livro 'Os 7 Véus do Despertar'?",
                a: "É o ensaio filosófico que deu origem a tudo — 232 páginas sobre despertar de consciência. É independente das colecções de ficção. Podes começar pelo livro, pelos Espelhos, ou por ambos. Não há ordem certa.",
              },
              {
                q: "Preciso de pagar para explorar a plataforma?",
                a: "Não. O teste de autoconhecimento, artigos, diário de 7 dias e outros recursos são gratuitos. Só pagas se quiseres aceder às experiências de leitura integrada (Espelhos, Nós ou Livro).",
              },
              {
                q: "Como funciona a leitura no site?",
                a: "Lês capítulo a capítulo, directamente no site. Cada capítulo tem pausas de reflexão, diário pessoal e checklists. O teu progresso é guardado automaticamente. Funciona em qualquer browser — telemóvel, tablet ou computador.",
              },
              {
                q: "O que é a comunidade?",
                a: "Chama-se Ecos. Tem quatro espaços: Ecos (reflexões anónimas), Maré (consciência colectiva), Círculo (espelho partilhado) e Fogueira (contemplação silenciosa). Tudo anónimo. Tudo impermanente. Incluída com qualquer experiência.",
              },
              {
                q: "Quantos livros existem no total?",
                a: "São 15 livros no total: 7 Espelhos (ficção interior), 7 Nós (ficção relacional) e 1 livro filosófico. As duas colecções de ficção vão sendo publicadas ao longo de 2026.",
              },
            ].map((faq, i) => (
              <ScrollReveal key={i} delay={0.1 * i}>
                <div>
                  <h3 className="font-serif text-lg text-brown-900">{faq.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brown-600">{faq.a}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-cream px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <ScrollReveal>
            <h2 className="font-serif text-3xl text-brown-900">
              Entra no ecossistema
            </h2>
            <p className="mx-auto mt-4 max-w-md leading-relaxed text-brown-600">
              Deixa o teu email e recebe recursos gratuitos, novos artigos e actualizações
              sobre a colecção. Sem spam. Prometido.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="mt-8">
              <NewsletterForm />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="hero-gradient-animated bg-gradient-to-br from-brown-800 via-[#3d3630] to-brown-900 px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal>
            <p className="font-serif text-2xl italic leading-relaxed text-cream">
              &ldquo;Não precisas de mudar tudo. Precisas apenas de começar a escolher-te.&rdquo;
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/recursos/teste"
                className="animate-pulse-glow inline-block rounded-md border-2 border-cream bg-cream px-8 py-3.5 font-sans text-[0.8rem] font-medium uppercase tracking-[0.15em] text-brown-900 transition-all hover:bg-transparent hover:text-cream"
              >
                Começa pelo teste gratuito
              </Link>
              <Link
                href="/livro-fisico"
                className="inline-block rounded-md border-2 border-brown-300 bg-transparent px-8 py-3.5 font-sans text-[0.8rem] font-medium uppercase tracking-[0.15em] text-brown-200 transition-all hover:border-cream hover:bg-cream hover:text-brown-900"
              >
                Adquire o teu livro
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
