import Link from "next/link";
import Image from "next/image";
import NewsletterForm from "@/components/NewsletterForm";
import ScrollReveal from "@/components/ScrollReveal";

const veusPeek = [
  { title: "O Véu da Ilusão", tagline: "Quando a vida que tens não foi a que escolheste", image: "/images/veu-1-ilusao.png.png" },
  { title: "O Véu do Medo", tagline: "Quando o medo decide por ti", image: "/images/veu-2-medo.png.png" },
  { title: "O Véu do Desejo", tagline: "Quando desejas tudo menos o que precisas", image: "/images/veu-3-desejo.png.png" },
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
                href="/comecar"
                className="animate-pulse-glow inline-block rounded-md border-2 border-cream bg-cream px-8 py-3.5 font-sans text-[0.8rem] font-medium uppercase tracking-[0.15em] text-brown-900 transition-all hover:bg-transparent hover:text-cream"
              >
                Começa por aqui
              </Link>
              <Link
                href="/os-sete-veus"
                className="inline-block rounded-md border-2 border-brown-300 bg-transparent px-8 py-3.5 font-sans text-[0.8rem] font-medium uppercase tracking-[0.15em] text-brown-200 transition-all hover:border-cream hover:bg-cream hover:text-brown-900"
              >
                Conhece a colecção
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* What is this — cream section */}
      <section className="bg-cream px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal>
            <h2 className="font-serif text-3xl text-brown-900 sm:text-4xl">O que são Os Sete Véus?</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="mx-auto mt-6 max-w-xl leading-relaxed text-brown-700">
              Não são manuais. Não são fórmulas de transformação. São histórias onde talvez te
              reconheças. E nesse reconhecimento, algo muda — devagar, ao teu ritmo.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3} variant="fadeIn">
            <div className="mx-auto mt-8 max-w-lg rounded-r-xl border-l-[3px] border-sage bg-cream-dark px-6 py-5 text-left">
              <p className="font-serif italic leading-relaxed text-brown-700">
                &ldquo;Sete caminhos de volta a ti mesma — para quem está pronta para se escolher.&rdquo;
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Collection peek — dark section */}
      <section className="bg-gradient-to-b from-brown-800 to-brown-900 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <h2 className="text-center font-serif text-3xl text-cream sm:text-4xl">Os Sete Véus</h2>
            <p className="mx-auto mt-4 max-w-xl text-center leading-relaxed text-brown-200">
              Sete livros. Sete véus. Sete formas de nos escondermos de nós mesmas.
            </p>
          </ScrollReveal>
          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {veusPeek.map((veu, i) => (
              <ScrollReveal key={veu.title} delay={0.15 * i} variant="scale">
                <div className="text-center">
                  <Image
                    src={veu.image}
                    alt={veu.title}
                    width={220}
                    height={330}
                    className="mx-auto rounded-lg shadow-2xl transition-transform duration-500 hover:scale-105"
                  />
                  <h3 className="mt-5 font-serif text-lg text-cream">{veu.title}</h3>
                  <p className="mt-1 text-sm italic text-brown-300">{veu.tagline}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={0.3}>
            <div className="mt-12 text-center">
              <Link
                href="/os-sete-veus"
                className="inline-block rounded-md border-2 border-cream bg-cream px-8 py-3.5 font-sans text-[0.8rem] font-medium uppercase tracking-[0.15em] text-brown-900 transition-all hover:bg-transparent hover:text-cream"
              >
                Ver toda a colecção
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Integrated experience — cream section */}
      <section className="bg-cream px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal>
            <p className="font-sans text-[0.7rem] uppercase tracking-[0.2em] text-sage">
              Uma experiência, não apenas um livro
            </p>
            <h2 className="mt-4 font-serif text-3xl text-brown-900 sm:text-4xl">
              Lê, reflecte, transforma
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="mx-auto mt-6 max-w-xl leading-relaxed text-brown-700">
              O Véu da Ilusão não é um PDF para baixar e esquecer. É uma experiência de leitura
              integrada — com pausas de reflexão, diário pessoal e checklists interactivos. Tudo
              dentro do site. Ao teu ritmo.
            </p>
          </ScrollReveal>
          <div className="mx-auto mt-10 grid max-w-lg gap-5 sm:grid-cols-3">
            {[
              { number: "7", label: "Capítulos", color: "#c9b896" },
              { number: "7", label: "Reflexões guiadas", color: "#7a8c6e" },
              { number: "1", label: "Espelho final", color: "#b07a7a" },
            ].map((stat, i) => (
              <ScrollReveal key={stat.label} delay={0.1 * i} variant="scale">
                <div className="rounded-xl bg-white px-4 py-5 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md">
                  <p className="font-serif text-3xl" style={{ color: stat.color }}>{stat.number}</p>
                  <p className="mt-1 font-sans text-[0.65rem] uppercase tracking-wider text-brown-400">
                    {stat.label}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={0.3}>
            <div className="mt-8">
              <Link
                href="/experiencias"
                className="inline-block rounded-md border-2 border-sage bg-sage px-8 py-3.5 font-sans text-[0.8rem] font-medium uppercase tracking-[0.15em] text-white transition-all hover:bg-transparent hover:text-sage"
              >
                Conhece a experiência
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Author teaser — cream-dark section with photo */}
      <section className="bg-cream-dark px-6 py-24">
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

      {/* Ecossistema teaser — sage/green accent */}
      <section className="bg-cream-dark px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <p className="text-center font-sans text-[0.7rem] uppercase tracking-[0.2em] text-sage">
              Plataforma reconstruída
            </p>
            <h2 className="mt-3 text-center font-serif text-3xl text-brown-900 sm:text-4xl">
              Mais do que livros — um ecossistema
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="mx-auto mt-6 max-w-xl text-center leading-relaxed text-brown-700">
              Leitura integrada, diário de reflexão, práticas guiadas e recursos gratuitos
              — tudo construído para que a transformação saia das páginas e entre na tua vida.
            </p>
          </ScrollReveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              { icon: "📖", title: "Leitura integrada", desc: "Reader no site com progresso visual e modo nocturno" },
              { icon: "🪞", title: "Diário de reflexão", desc: "Escreve, guarda e revisita as tuas palavras" },
              { icon: "🎧", title: "Práticas guiadas", desc: "Meditações e respiração para integrar cada véu" },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={0.1 * i} variant="scale">
                <div className="rounded-xl bg-white px-5 py-6 text-center shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md">
                  <span className="text-2xl">{item.icon}</span>
                  <h3 className="mt-3 font-serif text-lg text-brown-900">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-brown-500">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={0.3}>
            <div className="mt-10 text-center">
              <Link
                href="/ecossistema"
                className="inline-block rounded-md border-2 border-sage bg-sage px-8 py-3.5 font-sans text-[0.8rem] font-medium uppercase tracking-[0.15em] text-white transition-all hover:bg-transparent hover:text-sage"
              >
                Explora o ecossistema completo
              </Link>
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
                texto: "Não é um livro que se lê — é um livro que se vive. As pausas entre capítulos são tão importantes quanto as palavras.",
                nome: "Carla S.",
                local: "Lisboa, Portugal",
              },
              {
                texto: "Comecei pelo teste gratuito, achei que seria superficial. Acabei por comprar o livro nesse mesmo dia.",
                nome: "Beatriz L.",
                local: "São Paulo, Brasil",
              },
              {
                texto: "O diário de reflexão mudou a forma como leio. Nunca pensei que um livro me fizesse parar e escrever sobre mim mesma.",
                nome: "Ana M.",
                local: "Maputo, Moçambique",
              },
            ].map((dep, i) => (
              <ScrollReveal key={dep.nome} delay={0.15 * i} variant="fadeUp">
                <div className="flex h-full flex-col rounded-xl border border-brown-100 bg-white p-6 shadow-sm">
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
                href="/ecossistema"
                className="inline-block rounded-md border-2 border-brown-300 bg-transparent px-8 py-3.5 font-sans text-[0.8rem] font-medium uppercase tracking-[0.15em] text-brown-200 transition-all hover:border-cream hover:bg-cream hover:text-brown-900"
              >
                Explora o ecossistema
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
