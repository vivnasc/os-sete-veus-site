import Link from "next/link";
import Image from "next/image";
import NewsletterForm from "@/components/NewsletterForm";
import ScrollReveal from "@/components/ScrollReveal";


const espelhosPeek = [
  { title: "Espelho da Ilusão", tagline: "Quando a vida que tens não foi a que escolheste", image: "/images/espelho-ilusao.png", status: "Disponível" },
  { title: "Espelho do Medo", tagline: "Quando o medo decide por ti", image: "/images/espelho-medo.png", status: "Março 2026" },
  { title: "Espelho da Culpa", tagline: "Quando te castigas por querer mais", image: "/images/espelho-culpa.png", status: "Abril 2026" },
];

const nosPeek = [
  { num: "I", title: "Nó da Herança", sub: "Sara viu o véu. Helena sempre soube.", color: "#c9956a", image: "/images/capa-no-heran\u00e7a2.png", available: true },
  { num: "II", title: "Nó do Silêncio", sub: "O que o medo calou entre eles", color: "#6a9dbe", image: "/images/capa-no-silencio2.png", available: false },
  { num: "III", title: "Nó do Sacrifício", sub: "A culpa disfarçada de entrega", color: "#d06a6a", image: "/images/capa-no-sacrifico2.png", available: false },
];

export default function Home() {
  return (
    <>
      {/* Hero — quote-driven, intimate */}
      <section className="hero-gradient-animated bg-gradient-to-br from-brown-800 via-[#3d3630] to-brown-900 px-6 py-28 sm:py-36">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal variant="scale" duration={0.9}>
            <Image
              src="/images/logo-espiral.png.jpeg"
              alt="Os Sete Véus"
              width={90}
              height={90}
              className="mx-auto rounded-full animate-float"
            />
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="mx-auto mt-8 max-w-xl font-serif text-xl italic leading-relaxed text-brown-200 sm:text-2xl">
              &ldquo;Quando foi que escolhi tomar café em vez de chá?&rdquo;
            </p>
            <p className="mt-3 text-sm text-brown-400">
              — Sara, personagem d&#39;O Espelho da Ilusão
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.4}>
            <h1 className="mt-10 font-serif text-4xl leading-tight tracking-tight text-cream sm:text-5xl md:text-[3.5rem]">
              Uma mulher parou para perguntar.
              <br />
              <span className="text-[#c9b896]">E tudo mudou.</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.55}>
            <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-brown-200">
              Histórias de ficção que te devolvem a ti mesma.
              Respiração guiada. Diário pessoal. Comunidade anónima.
              <br className="hidden sm:block" />
              Tudo ao teu ritmo.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.7}>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/recursos/teste"
                className="animate-pulse-glow inline-block rounded-md border-2 border-cream bg-cream px-8 py-3.5 font-sans text-[0.8rem] font-medium uppercase tracking-[0.15em] text-brown-900 transition-all hover:bg-transparent hover:text-cream"
              >
                Descobre o teu véu
              </Link>
              <Link
                href="/comprar/espelhos"
                className="inline-block rounded-md border-2 border-brown-300 bg-transparent px-8 py-3.5 font-sans text-[0.8rem] font-medium uppercase tracking-[0.15em] text-brown-200 transition-all hover:border-cream hover:bg-cream hover:text-brown-900"
              >
                Começa a ler
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* O que é isto — explicação clara dos dois caminhos */}
      <section className="bg-cream px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <h2 className="text-center font-serif text-3xl text-brown-900 sm:text-4xl">Dois caminhos. A mesma jornada.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-center leading-relaxed text-brown-600">
              Podes começar pela reflexão filosófica ou pela ficção que te espelha.
              Não há ordem certa -- há apenas o teu ritmo.
            </p>
          </ScrollReveal>

          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {/* ESPELHOS — produto principal */}
            <ScrollReveal delay={0.15} variant="scale">
              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border-2 border-sage/20 bg-white shadow-sm transition-all duration-300 hover:border-sage hover:shadow-lg">
                <div className="flex items-center justify-center bg-gradient-to-br from-[#c9b896]/10 to-[#c9b896]/25 px-6 py-8">
                  <Image
                    src="/images/espelho-ilusao.png"
                    alt="Espelho da Ilusão — capa"
                    width={180}
                    height={270}
                    className="rounded-lg shadow-xl transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-8">
                  <p className="font-sans text-[0.6rem] uppercase tracking-[0.25em] text-sage">Ficção de transformação</p>
                  <h3 className="mt-2 font-serif text-2xl text-brown-900">Colecção Espelhos</h3>
                  <p className="mt-1 font-serif text-sm italic text-brown-500">
                    7 histórias onde te reconheces
                  </p>
                  <p className="mt-4 flex-1 leading-relaxed text-brown-600">
                    Sete ficções literárias sobre mulheres que vivem o que tu vives.
                    Cada história inclui pausas de respiração, diário de reflexão e práticas guiadas.
                    Não é autoajuda. É ficção que transforma.
                  </p>
                  <div className="mt-6 space-y-2">
                    <div className="flex items-start gap-2 text-sm text-brown-600">
                      <span className="mt-0.5 text-sage">~</span>
                      <span>7 capítulos de ficção por experiência</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-brown-600">
                      <span className="mt-0.5 text-sage">~</span>
                      <span>Respiração guiada entre capítulos</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-brown-600">
                      <span className="mt-0.5 text-sage">~</span>
                      <span>Diário pessoal e espelho final</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-brown-600">
                      <span className="mt-0.5 text-sage">~</span>
                      <span>Comunidade anónima incluída</span>
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
              </div>
            </ScrollReveal>

            {/* LIVRO FILOSÓFICO */}
            <ScrollReveal delay={0.3} variant="scale">
              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border-2 border-brown-300 bg-white shadow-sm transition-all duration-300 hover:border-brown-400 hover:shadow-lg">
                <div className="flex items-center justify-center bg-gradient-to-br from-brown-100/60 to-brown-200/40 px-6 py-8">
                  <Image
                    src="/images/mandala-7veus.png"
                    alt="Os 7 Véus do Despertar — mandala"
                    width={160}
                    height={160}
                    className="rounded-full shadow-lg transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-8">
                  <p className="font-sans text-[0.6rem] uppercase tracking-[0.25em] text-brown-400">Ensaio filosófico</p>
                  <h3 className="mt-2 font-serif text-2xl text-brown-900">Os 7 Véus do Despertar</h3>
                  <p className="mt-1 font-serif text-sm italic text-brown-500">
                    Cartografia interior para quem quer acordar
                  </p>
                  <p className="mt-4 flex-1 leading-relaxed text-brown-700">
                    232 páginas sobre despertar de consciência. Não é ficção -- é uma
                    cartografia dos sete véus que nos escondem de nós mesmas:
                    Permanência, Memória, Turbilhão, Esforço, Desolação, Horizonte e Dualidade.
                  </p>
                  <div className="mt-6 space-y-2">
                    <div className="flex items-start gap-2 text-sm text-brown-700">
                      <span className="mt-0.5 text-brown-500">~</span>
                      <span>Livro físico + versão digital incluída</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-brown-700">
                      <span className="mt-0.5 text-brown-500">~</span>
                      <span>Leitura contemplativa com pausas de respiração</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-brown-700">
                      <span className="mt-0.5 text-brown-500">~</span>
                      <span>Práticas guiadas por véu</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-brown-700">
                      <span className="mt-0.5 text-brown-500">~</span>
                      <span>Comunidade anónima incluída</span>
                    </div>
                  </div>
                  <div className="mt-6 rounded-lg border-2 border-brown-300 bg-brown-50 p-4">
                    <p className="text-sm font-semibold text-brown-800">Preço:</p>
                    <p className="font-serif text-2xl font-bold text-brown-900">1.500 MZN <span className="text-sm font-normal text-brown-700">&asymp; $23 USD</span></p>
                  </div>
                  <Link
                    href="/comprar/livro"
                    className="mt-6 block w-full rounded-lg bg-brown-700 px-6 py-3 text-center font-sans text-sm font-medium uppercase tracking-wider text-white transition-colors hover:bg-brown-800"
                  >
                    Ver opções do Livro
                  </Link>
                </div>
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
              A arquitectura
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
                  Histórias de mulheres que vivem o que tu vives.
                  Cada espelho revela um véu que usas sem saber.
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
                  O que acontece entre duas pessoas quando um véu cai.
                  Desbloqueia ao completar o Espelho.
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
                  Reflexões anónimas entre quem lê e sente.
                  Impermanentes. Como os véus.
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

      {/* Colecção Espelhos — com capas grandes */}
      <section className="bg-gradient-to-b from-brown-800 to-brown-900 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <p className="text-center font-sans text-[0.65rem] uppercase tracking-[0.3em] text-brown-400">
              Colecção Espelhos
            </p>
            <h2 className="mt-3 text-center font-serif text-3xl text-cream sm:text-4xl">
              Ficções que te devolvem a ti mesma
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center leading-relaxed text-brown-200">
              Cada Espelho é uma história de uma mulher que acorda.
              Lês, páras, respiras, reflectes, escreves. E reconheces-te.
            </p>
          </ScrollReveal>
          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {espelhosPeek.map((espelho, i) => (
              <ScrollReveal key={espelho.title} delay={0.15 * i} variant="scale">
                <div className="text-center">
                  <Image
                    src={espelho.image}
                    alt={espelho.title}
                    width={320}
                    height={480}
                    className="mx-auto rounded-lg shadow-2xl transition-transform duration-500 hover:scale-105"
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                  <h3 className="mt-5 font-serif text-lg text-cream">{espelho.title}</h3>
                  <p className="mt-1 text-sm italic text-brown-300">{espelho.tagline}</p>
                  <p className={`mt-2 text-xs ${i === 0 ? 'text-sage' : 'text-brown-500'}`}>
                    {espelho.status}
                  </p>
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

      {/* Colecção Nós — com capas grandes */}
      <section className="bg-gradient-to-b from-[#1a1510] to-[#0a0a0a] px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <p className="text-center font-sans text-[0.65rem] uppercase tracking-[0.3em] text-[#c9a87c]/60">
              Colecção Nós
            </p>
            <h2 className="mt-3 text-center font-serif text-3xl text-cream sm:text-4xl">
              O que o véu fez entre ti e outra pessoa
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center font-serif text-base leading-relaxed text-brown-300">
              Só lês o Nó se viveste o Espelho.
              Porque antes de compreender o que se passa entre duas pessoas,
              é preciso compreender o que se passa dentro de ti.
            </p>
          </ScrollReveal>

          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {nosPeek.map((no, i) => (
              <ScrollReveal key={no.num} delay={0.15 * i} variant="scale">
                <div className="text-center">
                  <Image
                    src={no.image}
                    alt={no.title}
                    width={320}
                    height={480}
                    className="mx-auto rounded-lg shadow-2xl transition-transform duration-500 hover:scale-105"
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                  <h3 className="mt-5 font-serif text-lg text-cream">{no.title}</h3>
                  <p className="mt-1 text-sm italic" style={{ color: `${no.color}bb` }}>
                    {no.sub}
                  </p>
                  {no.available ? (
                    <p className="mt-2 text-xs" style={{ color: no.color }}>Disponível ao completar o Espelho</p>
                  ) : (
                    <p className="mt-2 text-xs text-brown-600">Em breve</p>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3}>
            <div className="mx-auto mt-10 max-w-md rounded-xl border border-[#c9a87c]/20 bg-[#c9a87c]/[0.04] p-5 text-center">
              <p className="text-sm text-brown-400">
                Nó individual: <strong className="text-brown-300">780 MZN / $12 USD</strong>
              </p>
              <p className="mt-1 text-xs text-brown-500">
                Incluído nos packs de 3 Espelhos e na Jornada Completa
              </p>
            </div>
            <div className="mt-6 text-center">
              <Link
                href="/comprar/espelhos"
                className="inline-block rounded-md border-2 border-[#c9a87c]/40 px-8 py-3.5 font-sans text-[0.8rem] font-medium uppercase tracking-[0.15em] text-[#c9b99a] transition-all hover:border-cream hover:text-cream"
              >
                Começa pelo Espelho
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Quem escreve — autora */}
      <section className="bg-cream px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <div className="items-center gap-12 md:flex">
            <ScrollReveal variant="fadeLeft" className="shrink-0 text-center md:text-left">
              <Image
                src="/images/vivianne.jpg.jpeg"
                alt="Vivianne dos Santos"
                width={240}
                height={320}
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
                Economista de formação, escritora por necessidade. Moçambicana.
                Quando finalmente parou para perguntar o que queria, percebeu que
                tinha de escrever o que teria precisado de ler aos 25 anos.
                Nasceram assim Os Sete Véus.
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

      {/* Comunidade Ecos */}
      <section className="bg-gradient-to-b from-[#1a1510] to-[#2d2620] px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <p className="text-center font-sans text-[0.7rem] uppercase tracking-[0.25em] text-sage-light">
              Incluído com qualquer experiência
            </p>
            <h2 className="mt-4 text-center font-serif text-3xl text-cream sm:text-4xl">
              Não caminhas sozinha.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-center leading-relaxed text-brown-200">
              Quem adquire qualquer experiência entra numa comunidade anónima.
              Sem nomes. Sem julgamento. Apenas reconhecimento.
            </p>
          </ScrollReveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: "~",
                title: "Ecos",
                desc: "Reflexões anónimas que desaparecem em 30 dias. Libertas o que sentes.",
              },
              {
                icon: "~",
                title: "Maré",
                desc: "O pulso emocional colectivo. Vê o que o grupo sente neste momento.",
              },
              {
                icon: "~",
                title: "Círculo",
                desc: "Grupos de 7 pessoas, 14 dias. Espelho partilhado, anónimo e seguro.",
              },
              {
                icon: "~",
                title: "Fogueira",
                desc: "Sessões de contemplação colectiva. Pára. Respira. Estás acompanhada.",
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
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* O que dizem */}
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
                texto: "Comprei o Espelho da Ilusão a pensar que era mais um livro de autoajuda. Não é. É ficção, mas é a minha vida. Chorei no terceiro capítulo porque a Sara sou eu. Nunca ninguém me tinha mostrado isso com tanta gentileza.",
                nome: "Maria S.",
                local: "Maputo",
              },
              {
                texto: "As pausas de respiração entre os capítulos mudaram a forma como leio. Demoro mais. Sinto mais. O diário obrigou-me a escrever coisas que nunca tinha admitido. Este não é um livro que se lê -- é um livro que se vive.",
                nome: "Ana P.",
                local: "Lisboa",
              },
              {
                texto: "Quando li 'quando foi que escolhi tomar café em vez de chá?' gelei. Fiz a mesma pergunta ao meu dia seguinte. E ao seguinte. Ainda não parei de perguntar. Acho que era isso que precisava.",
                nome: "Beatriz M.",
                local: "São Paulo",
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

      {/* Newsletter */}
      <section className="bg-cream-dark px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <ScrollReveal>
            <h2 className="font-serif text-3xl text-brown-900">Queres levar mais contigo?</h2>
            <p className="mx-auto mt-4 max-w-md leading-relaxed text-brown-600">
              Deixa o teu email e recebe reflexões, excertos e avisos de novos Espelhos.
              Sem spam. Prometido.
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
              &ldquo;Há mais para ti do que aquilo que tens vivido.&rdquo;
            </p>
            <p className="mt-3 text-sm text-brown-400">
              — O Espelho da Ilusão, Epílogo
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/recursos/teste"
                className="animate-pulse-glow inline-block rounded-md border-2 border-cream bg-cream px-8 py-3.5 font-sans text-[0.8rem] font-medium uppercase tracking-[0.15em] text-brown-900 transition-all hover:bg-transparent hover:text-cream"
              >
                Descobre o teu véu
              </Link>
              <Link
                href="/comprar/espelhos"
                className="inline-block rounded-md border-2 border-brown-300 bg-transparent px-8 py-3.5 font-sans text-[0.8rem] font-medium uppercase tracking-[0.15em] text-brown-200 transition-all hover:border-cream hover:bg-cream hover:text-brown-900"
              >
                Começa a ler
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
