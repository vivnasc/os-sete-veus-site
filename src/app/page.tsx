import Link from "next/link";
import Image from "next/image";
import NewsletterForm from "@/components/NewsletterForm";
import ScrollReveal from "@/components/ScrollReveal";


const espelhosPeek = [
  { title: "Espelho da Ilusão", tagline: "Quando a vida que tens não foi a que escolheste", image: "/images/espelho-ilusao.png" },
  { title: "Espelho do Medo", tagline: "Quando o medo decide por ti", image: "/images/espelho-medo.png" },
  { title: "Espelho da Culpa", tagline: "Quando te castigas por querer mais", image: "/images/espelho-culpa.png" },
];

export default function Home() {
  return (
    <>
      {/* Hero — animated dark gradient */}
      <section className="hero-gradient-animated bg-gradient-to-br from-brown-800 via-[#3d3630] to-brown-900 px-6 py-32 sm:py-40">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal variant="scale" duration={0.9}>
            <Image
              src="/images/logo-espiral.png.jpeg"
              alt="Os Sete Véus"
              width={80}
              height={80}
              className="mx-auto rounded-full animate-float"
            />
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <h1 className="mt-8 font-serif text-4xl leading-tight tracking-tight text-cream sm:text-5xl md:text-[3.5rem]">
              Para quem sente que merece mais da própria vida.
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.4}>
            <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-brown-200">
              Sete histórias que te devolvem a ti mesma.
              <br />
              Sem pressa. Sem fórmulas. Apenas verdade.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.6}>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/recursos/teste"
                className="animate-pulse-glow inline-block rounded-md border-2 border-cream bg-cream px-8 py-3.5 font-sans text-[0.8rem] font-medium uppercase tracking-[0.15em] text-brown-900 transition-all hover:bg-transparent hover:text-cream"
              >
                Teste gratuito
              </Link>
              <Link
                href="/comprar/espelhos"
                className="inline-block rounded-md border-2 border-brown-300 bg-transparent px-8 py-3.5 font-sans text-[0.8rem] font-medium uppercase tracking-[0.15em] text-brown-200 transition-all hover:border-cream hover:bg-cream hover:text-brown-900"
              >
                Ver Espelhos
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Choose your path — cream section with 2 clear options */}
      <section className="bg-cream px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <h2 className="text-center font-serif text-3xl text-brown-900 sm:text-4xl">Escolhe o teu caminho</h2>
            <p className="mx-auto mt-4 max-w-xl text-center leading-relaxed text-brown-600">
              Duas formas de começar a tua jornada de autoconhecimento
            </p>
          </ScrollReveal>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {/* ESPELHOS */}
            <ScrollReveal delay={0.15} variant="scale">
              <div className="group relative overflow-hidden rounded-2xl border-2 border-sage/20 bg-white p-8 shadow-sm transition-all duration-300 hover:border-sage hover:shadow-lg">
                <h3 className="font-serif text-2xl text-brown-900">Colecção Espelhos</h3>
                <p className="mt-2 font-serif text-sm italic text-sage">7 ficções de transformação</p>
                <p className="mt-4 leading-relaxed text-brown-700">
                  Sete histórias de ficção literária onde te reconheces. Cada uma com pausas de reflexão,
                  diário pessoal e práticas guiadas. Uma experiência imersiva de transformação.
                </p>
                <div className="mt-6 space-y-2">
                  <div className="flex items-start gap-2 text-sm text-brown-600">
                    <span className="mt-0.5 text-sage">✓</span>
                    <span>7 capítulos de ficção por experiência</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-brown-600">
                    <span className="mt-0.5 text-sage">✓</span>
                    <span>Práticas de respiração guiada</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-brown-600">
                    <span className="mt-0.5 text-sage">✓</span>
                    <span>Diário de reflexão pessoal</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-brown-600">
                    <span className="mt-0.5 text-sage">✓</span>
                    <span>Acesso vitalício no site</span>
                  </div>
                </div>
                <div className="mt-6 rounded-lg bg-sage/5 p-4">
                  <p className="text-sm text-brown-600">A partir de:</p>
                  <p className="font-serif text-2xl font-bold text-brown-900">1.885 MZN <span className="text-sm font-normal text-brown-500">/ $29 USD</span></p>
                </div>
                <Link
                  href="/comprar/espelhos"
                  className="mt-6 block w-full rounded-lg bg-sage px-6 py-3 text-center font-sans text-sm font-medium uppercase tracking-wider text-white transition-colors hover:bg-sage-dark"
                >
                  Ver Espelhos
                </Link>
              </div>
            </ScrollReveal>

            {/* Physical Book */}
            <ScrollReveal delay={0.3} variant="scale">
              <div className="group relative overflow-hidden rounded-2xl border-2 border-brown-300 bg-white p-8 shadow-sm transition-all duration-300 hover:border-brown-400 hover:shadow-lg">
                <h3 className="font-serif text-2xl text-brown-900">Livro Filosófico</h3>
                <p className="mt-2 font-serif text-sm italic text-brown-700">"Os 7 Véus do Despertar" — obra filosófica</p>
                <p className="mt-4 leading-relaxed text-brown-800">
                  Livro impresso sobre despertar de consciência — uma cartografia interior para dissolver
                  o que já não serve. Inclui também a <strong>versão digital do livro</strong> para ler no site.
                </p>
                <div className="mt-6 space-y-2">
                  <div className="flex items-start gap-2 text-sm text-brown-700">
                    <span className="mt-0.5 text-brown-500">~</span>
                    <span className="font-medium">Edição física de alta qualidade</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-brown-700">
                    <span className="mt-0.5 text-brown-500">~</span>
                    <span className="font-medium">Versão digital incluída (mesmo livro)</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-brown-700">
                    <span className="mt-0.5 text-brown-500">~</span>
                    <span className="font-medium">Entrega em todo Moçambique</span>
                  </div>
                </div>
                <div className="mt-6 rounded-lg border-2 border-brown-300 bg-brown-50 p-4">
                  <p className="text-sm font-semibold text-brown-800">Preço:</p>
                  <p className="font-serif text-2xl font-bold text-brown-900">1.500 MZN <span className="text-sm font-normal text-brown-700">≈ $23 USD</span></p>
                </div>
                <a
                  href="https://t.me/viviannedossantos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex w-full items-center justify-center gap-3 rounded-lg border-2 border-[#0088cc] bg-[#0088cc] px-6 py-3 font-sans text-sm font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-[#006daa]"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                  Encomendar via Telegram
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* Already bought physical book? */}
          <ScrollReveal delay={0.45}>
            <div className="mx-auto mt-10 max-w-2xl rounded-xl border border-brown-100 bg-white/50 p-6 text-center">
              <p className="font-sans text-sm font-medium text-brown-700">
                Já compraste o livro físico?
              </p>
              <p className="mt-2 text-sm text-brown-600">
                Regista o teu código ou pede um se ainda não o recebeste
              </p>
              <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="/registar-livro"
                  className="inline-block rounded-lg border-2 border-sage bg-transparent px-6 py-2.5 font-sans text-sm font-medium uppercase tracking-wider text-sage transition-all hover:bg-sage hover:text-white"
                >
                  Tenho código
                </Link>
                <Link
                  href="/pedir-codigo"
                  className="inline-block rounded-lg border-2 border-brown-300 bg-transparent px-6 py-2.5 font-sans text-sm font-medium uppercase tracking-wider text-brown-500 transition-all hover:border-brown-500 hover:text-brown-700"
                >
                  Pedir código
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* A visão — 3 dimensões */}
      <section className="bg-cream-dark px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <p className="text-center font-sans text-[0.65rem] uppercase tracking-[0.25em] text-sage">
              A visão
            </p>
            <h2 className="mt-3 text-center font-serif text-3xl text-brown-900 sm:text-4xl">
              Cada véu tem três dimensões
            </h2>
          </ScrollReveal>

          <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-3">
            <ScrollReveal delay={0.1} variant="scale">
              <div className="rounded-2xl border border-[#c9b896]/30 bg-white px-6 py-8 text-center shadow-sm">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#c9b896]/10">
                  <span className="font-serif text-2xl text-[#c9b896]">&#9826;</span>
                </div>
                <h3 className="mt-4 font-serif text-lg text-brown-800">Espelhos</h3>
                <p className="mt-1 font-sans text-[0.65rem] uppercase tracking-wider text-brown-400">Ficção interior</p>
                <p className="mt-3 font-serif text-sm leading-relaxed text-brown-600">
                  7 histórias onde te reconheces. Cada espelho revela um véu que usas sem saber.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2} variant="scale">
              <div className="rounded-2xl border border-[#c9a87c]/30 bg-white px-6 py-8 text-center shadow-sm">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#c9a87c]/10">
                  <span className="font-serif text-2xl text-[#c9a87c]">&#8734;</span>
                </div>
                <h3 className="mt-4 font-serif text-lg text-brown-800">Nós</h3>
                <p className="mt-1 font-sans text-[0.65rem] uppercase tracking-wider text-brown-400">Ficção relacional</p>
                <p className="mt-3 font-serif text-sm leading-relaxed text-brown-600">
                  7 histórias entre duas pessoas. Cada nó revela o que o véu fez na relação.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3} variant="scale">
              <div className="rounded-2xl border border-sage/30 bg-white px-6 py-8 text-center shadow-sm">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sage/10">
                  <span className="font-serif text-2xl text-sage">~</span>
                </div>
                <h3 className="mt-4 font-serif text-lg text-brown-800">Ecos</h3>
                <p className="mt-1 font-sans text-[0.65rem] uppercase tracking-wider text-brown-400">Comunidade</p>
                <p className="mt-3 font-serif text-sm leading-relaxed text-brown-600">
                  Onde as vozes se encontram. Reflexões anónimas entre quem lê e sente.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.4}>
            <p className="mx-auto mt-10 max-w-lg text-center font-serif text-sm italic leading-relaxed text-brown-500">
              Os Espelhos mostram-te o véu que usas.
              Os Nós mostram-te o que esse véu fez entre ti e outra pessoa.
              Os Ecos são onde te reconheces em quem caminha contigo.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Colecção Espelhos */}
      <section className="bg-gradient-to-b from-brown-800 to-brown-900 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <p className="text-center font-sans text-[0.65rem] uppercase tracking-[0.3em] text-brown-400">
              Colecção Espelhos
            </p>
            <h2 className="mt-3 text-center font-serif text-3xl text-cream sm:text-4xl">
              Ficções de transformação
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center leading-relaxed text-brown-200">
              Sete histórias onde te reconheces. Cada uma com pausas de reflexão,
              diário pessoal e práticas guiadas.
            </p>
          </ScrollReveal>
          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {espelhosPeek.map((espelho, i) => (
              <ScrollReveal key={espelho.title} delay={0.15 * i} variant="scale">
                <div className="text-center">
                  <Image
                    src={espelho.image}
                    alt={espelho.title}
                    width={220}
                    height={330}
                    className="mx-auto rounded-lg shadow-2xl transition-transform duration-500 hover:scale-105"
                  />
                  <h3 className="mt-5 font-serif text-lg text-cream">{espelho.title}</h3>
                  <p className="mt-1 text-sm italic text-brown-300">{espelho.tagline}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={0.3}>
            <div className="mt-12 text-center">
              <Link
                href="/comprar/espelhos"
                className="inline-block rounded-md border-2 border-cream bg-cream px-8 py-3.5 font-sans text-[0.8rem] font-medium uppercase tracking-[0.15em] text-brown-900 transition-all hover:bg-transparent hover:text-cream"
              >
                Ver Colecção Espelhos
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Colecção Nós */}
      <section className="bg-gradient-to-b from-[#1a1510] to-[#0a0a0a] px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <p className="text-center font-sans text-[0.65rem] uppercase tracking-[0.3em] text-[#c9a87c]/60">
              Colecção Nós
            </p>
            <h2 className="mt-3 text-center font-serif text-3xl text-cream sm:text-4xl">
              Ficção relacional
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center font-serif text-base leading-relaxed text-brown-300">
              Os Espelhos mostram-te o véu que usas.
              Os Nós mostram-te o que esse véu fez entre ti e outra pessoa.
            </p>
          </ScrollReveal>

          {/* Cover grid — same size as Espelhos (3 columns) */}
          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {[
              { num: "I", title: "Nó da Herança", sub: "O silêncio herdado entre mãe e filha", color: "#c9956a", image: "/images/capa-no-heran\u00e7a2.png", available: true },
              { num: "II", title: "Nó do Silêncio", sub: "O que o medo calou entre eles", color: "#6a9dbe", image: "/images/capa-no-silencio2.png", available: false },
              { num: "III", title: "Nó do Sacrifício", sub: "A culpa disfarçada de entrega", color: "#d06a6a", image: "/images/capa-no-sacrifico2.png", available: false },
            ].map((no, i) => (
              <ScrollReveal key={no.num} delay={0.15 * i} variant="scale">
                <div className="text-center">
                  <Image
                    src={no.image}
                    alt={no.title}
                    width={220}
                    height={330}
                    className="mx-auto rounded-lg shadow-2xl transition-transform duration-500 hover:scale-105"
                  />
                  <h3 className="mt-5 font-serif text-lg text-cream">{no.title}</h3>
                  <p className="mt-1 text-sm italic" style={{ color: `${no.color}bb` }}>
                    {no.sub}
                  </p>
                  {no.available ? (
                    <p className="mt-2 text-xs" style={{ color: no.color }}>Disponível</p>
                  ) : (
                    <p className="mt-2 text-xs text-brown-600">Em breve</p>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3}>
            <p className="mx-auto mt-8 max-w-md text-center text-sm text-brown-500">
              Cada Nó desbloqueia ao completar o Espelho correspondente.
            </p>
            <div className="mt-6 text-center">
              <Link
                href="/comprar/espelhos"
                className="inline-block rounded-md border-2 border-[#c9a87c]/40 px-8 py-3.5 font-sans text-[0.8rem] font-medium uppercase tracking-[0.15em] text-[#c9b99a] transition-all hover:border-cream hover:text-cream"
              >
                Ver Colecção Espelhos
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Author teaser — cream section with photo */}
      <section className="bg-cream px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <div className="items-center gap-12 md:flex">
            <ScrollReveal variant="fadeLeft" className="shrink-0 text-center md:text-left">
              <Image
                src="/images/vivianne.jpg.jpeg"
                alt="Vivianne dos Santos"
                width={200}
                height={260}
                className="mx-auto rounded-2xl object-cover shadow-lg md:mx-0"
              />
            </ScrollReveal>
            <ScrollReveal variant="fadeRight" delay={0.2} className="mt-8 md:mt-0">
              <p className="font-sans text-[0.7rem] uppercase tracking-[0.2em] text-brown-400">
                Quem escreve
              </p>
              <blockquote className="mt-4 font-serif text-2xl italic leading-relaxed text-brown-800 sm:text-3xl">
                &ldquo;Passei anos a construir uma vida que fazia sentido para toda a gente — menos
                para mim.&rdquo;
              </blockquote>
              <p className="mt-4 text-sm text-brown-500">— Vivianne dos Santos</p>
              <p className="mt-4 leading-relaxed text-brown-600">
                Economista, escritora, moçambicana. Escreve para quem quer viver, não apenas funcionar.
              </p>
              <Link
                href="/sobre"
                className="mt-6 inline-block font-sans text-sm font-medium text-sage transition-colors hover:text-sage-dark"
              >
                Conhece a Vivianne &rarr;
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Comunidade — diferencial único */}
      <section className="bg-gradient-to-b from-[#1a1510] to-[#2d2620] px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <p className="text-center font-sans text-[0.7rem] uppercase tracking-[0.25em] text-sage-light">
              Exclusivo d&#39;Os Sete Véus do Despertar
            </p>
            <h2 className="mt-4 text-center font-serif text-3xl text-cream sm:text-4xl">
              Mais do que ler. Partilhar sem máscara.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-center leading-relaxed text-brown-200">
              Quem adquire qualquer experiência ganha acesso a um espaço único:
              uma comunidade anónima onde a conexão acontece por reconhecimento — não por interação.
            </p>
          </ScrollReveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: "~",
                title: "Ecos",
                desc: "Reflexões anónimas. Libertas o que sentes e encontras quem sente o mesmo.",
              },
              {
                icon: "~",
                title: "Maré",
                desc: "Consciência colectiva. Sente o pulso emocional de quem caminha contigo.",
              },
              {
                icon: "~",
                title: "Círculo",
                desc: "Espelho partilhado. Um espaço seguro de reconhecimento mútuo.",
              },
              {
                icon: "~",
                title: "Fogueira",
                desc: "Contemplação. Pára. Respira. Estás acompanhada no silêncio.",
              },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={0.1 * i} variant="fadeUp">
                <div className="rounded-xl border border-brown-600/30 bg-brown-800/50 p-6 text-center transition-all duration-300 hover:border-sage/40 hover:bg-brown-800/70">
                  <div className="text-3xl">{item.icon}</div>
                  <h3 className="mt-3 font-serif text-lg text-cream">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brown-300">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.4}>
            <div className="mt-12 text-center">
              <p className="font-serif text-sm italic text-brown-400">
                &ldquo;Tudo é anónimo. Tudo é impermanente. Como os véus.&rdquo;
              </p>
              <p className="mt-4 text-xs text-brown-500">
                Acesso incluído com qualquer livro ou Espelho
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Social proof */}
      <section className="bg-cream px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <h2 className="text-center font-serif text-3xl text-brown-900">
              Palavras de quem já começou
            </h2>
          </ScrollReveal>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {[
              {
                texto: "Este livro mudou completamente a forma como vejo minha vida. Não é autoajuda, é filosofia viva que te desafia a olhar para dentro. As práticas guiadas me conectaram com partes de mim que há anos ignorava.",
                nome: "Maria S.",
                local: "Maputo, Moçambique",
                rating: "~ ~ ~ ~ ~",
              },
              {
                texto: "A experiência digital é incrível. As pausas contemplativas, as práticas de respiração... Sinto que não estou só a ler, estou a viver o livro. O diário de reflexão fez-me escrever coisas que nunca tinha admitido.",
                nome: "Ana P.",
                local: "Lisboa, Portugal",
                rating: "~ ~ ~ ~ ~",
              },
              {
                texto: "Comprei o Espelho da Ilusão e me vi completamente na protagonista. É ficção, mas parecia minha vida. Chorei, refleti e mudei. Estou ansiosa pelo próximo.",
                nome: "Beatriz M.",
                local: "São Paulo, Brasil",
                rating: "~ ~ ~ ~ ~",
              },
            ].map((dep, i) => (
              <ScrollReveal key={dep.nome} delay={0.15 * i} variant="fadeUp">
                <div className="flex h-full flex-col rounded-xl border border-brown-100 bg-white p-6 shadow-sm">
                  <div className="text-xl mb-3">{dep.rating}</div>
                  <p className="flex-1 font-serif text-[15px] italic leading-relaxed text-brown-700">
                    &ldquo;{dep.texto}&rdquo;
                  </p>
                  <div className="mt-4 border-t border-brown-100 pt-3">
                    <p className="font-sans text-sm font-medium text-brown-900">{dep.nome}</p>
                    <p className="font-sans text-xs text-brown-400">{dep.local}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter — beige section */}
      <section className="bg-cream-dark px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <ScrollReveal>
            <h2 className="font-serif text-3xl text-brown-900">Queres levar mais contigo?</h2>
            <p className="mx-auto mt-4 max-w-md leading-relaxed text-brown-600">
              Deixa o teu email e enviamos recursos gratuitos. Só coisas úteis. Sem spam. Prometido.
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
              &ldquo;Não precisas de saber para onde vais. Precisas apenas de dar o primeiro passo.&rdquo;
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
                href="/experiencias"
                className="inline-block rounded-md border-2 border-brown-300 bg-transparent px-8 py-3.5 font-sans text-[0.8rem] font-medium uppercase tracking-[0.15em] text-brown-200 transition-all hover:border-cream hover:bg-cream hover:text-brown-900"
              >
                Ver experiências digitais
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
