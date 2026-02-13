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
                href="/recursos/teste"
                className="animate-pulse-glow inline-block rounded-md border-2 border-cream bg-cream px-8 py-3.5 font-sans text-[0.8rem] font-medium uppercase tracking-[0.15em] text-brown-900 transition-all hover:bg-transparent hover:text-cream"
              >
                Teste gratuito
              </Link>
              <Link
                href="/experiencias"
                className="inline-block rounded-md border-2 border-brown-300 bg-transparent px-8 py-3.5 font-sans text-[0.8rem] font-medium uppercase tracking-[0.15em] text-brown-200 transition-all hover:border-cream hover:bg-cream hover:text-brown-900"
              >
                Ver experiências
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
            {/* Digital Experiences */}
            <ScrollReveal delay={0.15} variant="scale">
              <div className="group relative overflow-hidden rounded-2xl border-2 border-sage/20 bg-white p-8 shadow-sm transition-all duration-300 hover:border-sage hover:shadow-lg">
                <div className="absolute right-4 top-4 text-4xl opacity-20 transition-opacity group-hover:opacity-30">🔮</div>
                <h3 className="font-serif text-2xl text-brown-900">Experiências Digitais</h3>
                <p className="mt-2 font-serif text-sm italic text-sage">7 ficções interativas + práticas guiadas</p>
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
                  href="/experiencias"
                  className="mt-6 block w-full rounded-lg bg-sage px-6 py-3 text-center font-sans text-sm font-medium uppercase tracking-wider text-white transition-colors hover:bg-sage-dark"
                >
                  Ver experiências
                </Link>
              </div>
            </ScrollReveal>

            {/* Physical Book + Digital Bonus */}
            <ScrollReveal delay={0.3} variant="scale">
              <div className="group relative overflow-hidden rounded-2xl border-2 border-brown-200/40 bg-gradient-to-br from-brown-50 to-cream p-8 shadow-sm transition-all duration-300 hover:border-brown-300 hover:shadow-lg">
                <div className="absolute right-4 top-4">
                  <span className="rounded-full bg-sage px-3 py-1 font-sans text-xs font-bold uppercase tracking-wider text-white">Bónus Grátis</span>
                </div>
                <h3 className="mt-4 font-serif text-2xl text-brown-900">Livro Físico + Digital</h3>
                <p className="mt-2 font-serif text-sm italic text-brown-600">Os 7 Véus do Despertar (livro filosófico)</p>
                <p className="mt-4 leading-relaxed text-brown-700">
                  Livro impresso sobre despertar de consciência — uma cartografia interior para dissolver
                  o que já não serve. <strong className="text-sage">Inclui acesso GRÁTIS às 7 experiências digitais!</strong>
                </p>
                <div className="mt-6 space-y-2">
                  <div className="flex items-start gap-2 text-sm text-brown-600">
                    <span className="mt-0.5 text-brown-400">📖</span>
                    <span>Edição física de alta qualidade</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-brown-600">
                    <span className="mt-0.5 text-brown-400">🚚</span>
                    <span>Entrega em todo Moçambique</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm font-medium text-sage">
                    <span className="mt-0.5">🎁</span>
                    <span>Bónus: Acesso grátis às 7 experiências digitais (valor 9.685 MZN)</span>
                  </div>
                </div>
                <div className="mt-6 rounded-lg border border-brown-200 bg-white p-4">
                  <p className="text-sm text-brown-600">Preço do livro físico:</p>
                  <p className="font-serif text-2xl font-bold text-brown-900">1.500 MZN <span className="text-sm font-normal text-brown-500">≈ $23 USD</span></p>
                </div>
                <a
                  href="https://wa.me/258845243875?text=Olá! Quero encomendar o livro físico Os 7 Véus do Despertar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex w-full items-center justify-center gap-3 rounded-lg border-2 border-[#25D366] bg-[#25D366] px-6 py-3 font-sans text-sm font-medium uppercase tracking-wider text-white transition-all hover:bg-transparent hover:text-[#25D366]"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Encomendar via WhatsApp
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
                Regista o teu código e ganha acesso gratuito às experiências digitais
              </p>
              <Link
                href="/registar-livro"
                className="mt-4 inline-block rounded-lg border-2 border-sage bg-transparent px-6 py-2.5 font-sans text-sm font-medium uppercase tracking-wider text-sage transition-all hover:bg-sage hover:text-white"
              >
                Registar código grátis
              </Link>
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
