import type { Metadata } from "next";
import Link from "next/link";
import { courses, COURSE_PRICING } from "@/data/courses";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Cursos — Ensino e Mentoria por Vivianne dos Santos",
  description:
    "Temas transversais que cruzam veus, espelhos e nos. Nao para explicar — para te ensinar a viver de outra forma. Licoes em audio, exercicios praticos, reflexoes guiadas.",
};

export default function CursosPage() {
  const available = courses.filter((c) => c.status === "available");
  const upcoming = courses.filter((c) => c.status !== "available");

  return (
    <>
      {/* Hero — dark */}
      <section className="bg-gradient-to-b from-brown-800 to-brown-900 px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-sans text-[0.7rem] uppercase tracking-[0.25em] text-brown-400">
            Ensino e mentoria
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-tight text-cream sm:text-5xl">
            Cursos
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-brown-200">
            Temas que cruzam todos os veus sem se prenderem a nenhum.
            Nao para explicar o que a literatura ja conta —
            para te ensinar a viver de outra forma.
          </p>
          <p className="mx-auto mt-4 max-w-md font-serif text-sm italic text-brown-300/80">
            Pela Vivianne dos Santos
          </p>
        </div>
      </section>

      {/* Intro — cream */}
      <section className="bg-cream px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal>
            <p className="leading-relaxed text-brown-700">
              Os Espelhos contam historias. Os Nos mostram o que acontece entre duas pessoas.
              Os cursos sao outra coisa — sao a Vivianne sentada contigo, a partilhar o que viveu,
              o que aprendeu, e o que descobriu que funciona. Nao e teoria. Nao e terapia.
              E sabedoria pratica, ao teu ritmo.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="mx-auto mt-8 max-w-lg rounded-r-xl border-l-[3px] border-sage bg-cream-dark px-6 py-5 text-left">
              <p className="font-serif italic leading-relaxed text-brown-700">
                &ldquo;Ha coisas que os livros nao conseguem ensinar.
                Precisam de ser ditas em voz alta, devagar,
                por alguem que ja passou por elas.&rdquo;
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* O que inclui — features */}
      <section className="bg-cream-dark px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <h2 className="text-center font-serif text-2xl text-brown-900 sm:text-3xl">
              O que cada curso inclui
            </h2>
          </ScrollReveal>
          <div className="mx-auto mt-10 grid max-w-3xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: "~",
                label: "Licoes em audio",
                desc: "A voz da Vivianne a guiar-te por cada tema. Ouve quando quiseres, quantas vezes quiseres.",
              },
              {
                icon: "\u25CB",
                label: "Exercicios praticos",
                desc: "Praticas simples para o teu dia a dia. Nao precisas de mais de cinco minutos.",
              },
              {
                icon: "\u25C7",
                label: "Diario reflexivo",
                desc: "Perguntas que te convidam a escrever. O papel nao julga — apenas recebe.",
              },
              {
                icon: "\u2736",
                label: "Acesso vitalicio",
                desc: "Sem prazos. Sem pressao. Voltas quando precisares.",
              },
            ].map((item, i) => (
              <ScrollReveal key={item.label} delay={i * 0.1}>
                <div className="text-center">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-sage/10 font-serif text-lg text-sage">
                    {item.icon}
                  </span>
                  <p className="mt-3 font-sans text-[0.6rem] uppercase tracking-[0.2em] text-sage">
                    {item.label}
                  </p>
                  <p className="mt-2 font-serif text-sm leading-relaxed text-brown-500">
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Diferenca — o que nao sao */}
      <section className="bg-cream px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
            <div className="grid gap-8 sm:grid-cols-2">
              <div className="rounded-2xl border border-brown-100 bg-white p-6">
                <p className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-brown-400">
                  Os cursos nao sao
                </p>
                <ul className="mt-4 space-y-3">
                  {[
                    "Outra forma de explicar os veus",
                    "Videos longos com teoria",
                    "Terapia ou diagnostico",
                    "Uma repeticao dos Espelhos",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-brown-500">
                      <span className="mt-0.5 text-brown-300">&mdash;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-sage/20 bg-sage/[0.04] p-6">
                <p className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-sage">
                  Os cursos sao
                </p>
                <ul className="mt-4 space-y-3">
                  {[
                    "A Vivianne a ensinar o que viveu",
                    "Licoes curtas, densas, praticas",
                    "Ferramentas para mudar o dia a dia",
                    "Temas que cruzam tudo sem se prender a nada",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-brown-700">
                      <span className="mt-0.5 text-sage">~</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Catalogo — cada curso, alternando */}
      {courses.map((course, i) => (
        <section
          key={course.slug}
          className={`px-6 py-16 ${i % 2 === 0 ? "bg-cream" : "bg-cream-dark"}`}
        >
          <div className="mx-auto max-w-5xl">
            <ScrollReveal>
              <div className={`items-start gap-10 md:flex ${i % 2 !== 0 ? "md:flex-row-reverse" : ""}`}>
                {/* Visual */}
                <div className="shrink-0 text-center md:w-56">
                  <div
                    className="mx-auto flex h-32 w-32 items-center justify-center rounded-full"
                    style={{ backgroundColor: course.color + "20" }}
                  >
                    <div
                      className="flex h-20 w-20 items-center justify-center rounded-full"
                      style={{ backgroundColor: course.color + "35" }}
                    >
                      <span
                        className="font-serif text-2xl font-bold"
                        style={{ color: course.color }}
                      >
                        {course.lessons}
                      </span>
                    </div>
                  </div>
                  <p className="mt-3 font-sans text-[0.55rem] uppercase tracking-wider text-brown-400">
                    {course.lessons} licoes · {course.totalDuration}
                  </p>
                  {course.status !== "available" && (
                    <span className="mt-2 inline-block rounded-full bg-brown-100/60 px-4 py-1 font-sans text-[0.6rem] uppercase tracking-wider text-brown-400">
                      {course.launchLabel}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="mt-8 flex-1 md:mt-0">
                  <div className="flex items-center gap-3">
                    <span
                      className="inline-block h-2 w-8 rounded-full"
                      style={{ backgroundColor: course.color }}
                    />
                    <span className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-brown-400">
                      Curso
                    </span>
                  </div>
                  <h2 className="mt-3 font-serif text-2xl text-brown-900 sm:text-3xl">
                    {course.title}
                  </h2>
                  <p className="mt-1 font-serif italic text-brown-500">
                    {course.subtitle}
                  </p>
                  <p className="mt-4 leading-relaxed text-brown-700">
                    {course.longDescription}
                  </p>

                  {/* Temas transversais */}
                  <div className="mt-5">
                    <p className="font-sans text-[0.55rem] uppercase tracking-[0.15em] text-brown-400">
                      Temas transversais
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {course.themes.map((theme) => (
                        <span
                          key={theme}
                          className="rounded-full border px-3 py-1 font-sans text-[0.6rem]"
                          style={{ borderColor: course.color + "40", color: course.color }}
                        >
                          {theme}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Preco e CTA */}
                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    {course.status === "available" ? (
                      <>
                        <Link
                          href={`/comprar/cursos?curso=${course.slug}`}
                          className="inline-block rounded-full bg-sage px-6 py-2.5 font-sans text-[0.75rem] font-medium uppercase tracking-wider text-white transition-colors hover:bg-sage-dark"
                        >
                          Comecar · ${course.priceUSD}
                        </Link>
                        <span className="text-sm text-brown-400">
                          {course.priceMT.toLocaleString()} MZN
                        </span>
                      </>
                    ) : (
                      <span className="inline-block font-serif text-lg font-bold text-brown-900">
                        ${course.priceUSD} USD
                        <span className="ml-2 text-sm font-normal text-brown-400">
                          / {course.priceMT.toLocaleString()} MZN
                        </span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      ))}

      {/* Precos e packs */}
      <section className="bg-cream px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <div className="text-center">
              <p className="font-sans text-[0.7rem] uppercase tracking-[0.25em] text-brown-400">
                Precos
              </p>
              <h2 className="mt-4 font-serif text-3xl text-brown-900">
                Escolhe o teu caminho
              </h2>
            </div>
          </ScrollReveal>

          <div className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-3">
            {/* Individual */}
            <ScrollReveal delay={0}>
              <div className="h-full rounded-2xl border border-brown-200 bg-white p-8">
                <p className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-brown-400">
                  Individual
                </p>
                <p className="mt-3 font-serif text-3xl font-bold text-brown-900">
                  ${COURSE_PRICING.individual.usd}
                </p>
                <p className="mt-1 text-sm text-brown-400">
                  {COURSE_PRICING.individual.mt.toLocaleString()} MZN
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    "1 curso a tua escolha",
                    "Todas as licoes em audio",
                    "Exercicios e diario",
                    "Acesso vitalicio",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-brown-600">
                      <span className="mt-0.5 text-brown-300">~</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/comprar/cursos"
                  className="mt-6 block w-full rounded-full border-2 border-sage bg-transparent py-2.5 text-center font-sans text-[0.7rem] uppercase tracking-[0.15em] text-sage transition-all hover:bg-sage hover:text-white"
                >
                  Escolher curso
                </Link>
              </div>
            </ScrollReveal>

            {/* Pack 3 */}
            <ScrollReveal delay={0.1}>
              <div className="h-full rounded-2xl border-2 border-sage/30 bg-white p-8 shadow-lg">
                <p className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-sage">
                  Pack 3 Cursos
                </p>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="font-serif text-3xl font-bold text-brown-900">
                    ${COURSE_PRICING.pack3.usd}
                  </span>
                  <span className="rounded-full bg-sage/10 px-2 py-0.5 font-sans text-[0.55rem] font-medium text-sage">
                    -{COURSE_PRICING.pack3Savings}%
                  </span>
                </div>
                <p className="mt-1 text-sm text-brown-400">
                  {COURSE_PRICING.pack3.mt.toLocaleString()} MZN
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    "3 cursos a tua escolha",
                    "Todas as licoes em audio",
                    "Exercicios e diario",
                    "Acesso vitalicio",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-brown-600">
                      <span className="mt-0.5 text-sage">~</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <button
                  disabled
                  className="mt-6 block w-full rounded-full bg-sage/40 py-2.5 text-center font-sans text-[0.7rem] uppercase tracking-[0.15em] text-white"
                >
                  Em breve
                </button>
              </div>
            </ScrollReveal>

            {/* Todos */}
            <ScrollReveal delay={0.2}>
              <div className="relative h-full rounded-2xl border-2 border-[#c9a87c]/40 bg-white p-8 shadow-lg">
                <span className="absolute -top-3 right-6 rounded-full bg-[#c9a87c] px-3 py-1 font-sans text-[0.55rem] font-bold uppercase tracking-wider text-white">
                  Melhor valor
                </span>
                <p className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-[#c9a87c]">
                  Todos os Cursos
                </p>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="font-serif text-3xl font-bold text-brown-900">
                    ${COURSE_PRICING.allCourses.usd}
                  </span>
                  <span className="rounded-full bg-[#c9a87c]/10 px-2 py-0.5 font-sans text-[0.55rem] font-medium text-[#c9a87c]">
                    -{COURSE_PRICING.allSavings}%
                  </span>
                </div>
                <p className="mt-1 text-sm text-brown-400">
                  {COURSE_PRICING.allCourses.mt.toLocaleString()} MZN
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    "Todos os 5 cursos",
                    "Cursos futuros incluidos",
                    "Exercicios e diario",
                    "Acesso vitalicio",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-brown-600">
                      <span className="mt-0.5 text-[#c9a87c]">~</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <button
                  disabled
                  className="mt-6 block w-full rounded-full bg-[#c9a87c]/40 py-2.5 text-center font-sans text-[0.7rem] uppercase tracking-[0.15em] text-white"
                >
                  Em breve
                </button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Bridge — Espelhos */}
      <section className="bg-cream-dark px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal>
            <p className="font-sans text-[0.7rem] uppercase tracking-[0.25em] text-[#c9b896]">
              O outro lado
            </p>
            <h2 className="mt-4 font-serif text-3xl text-brown-900">
              Coleccao Espelhos
            </h2>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-brown-600">
              Os cursos ensinam. Os Espelhos contam historias onde te reconheces.
              Sao experiencias diferentes — e complementam-se. Podes ter uma sem a outra,
              ou descobrir as duas.
            </p>
            <Link
              href="/os-sete-veus"
              className="mt-8 inline-block rounded-full border-2 border-[#c9b896]/40 px-8 py-3 font-sans text-[0.8rem] font-medium uppercase tracking-[0.15em] text-[#c9b896] transition-all hover:border-[#c9b896] hover:bg-[#c9b896]/10"
            >
              Explorar Espelhos
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-cream px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
            <h2 className="mb-8 text-center font-serif text-2xl text-brown-900">
              Perguntas frequentes
            </h2>
          </ScrollReveal>
          <div className="space-y-4">
            {[
              {
                q: "Preciso de ter os Espelhos para fazer os cursos?",
                a: "Nao. Os cursos sao um produto separado. Podes fazer cursos sem ter os Espelhos, e vice-versa. Complementam-se, mas nao dependem um do outro.",
              },
              {
                q: "Qual e o formato das licoes?",
                a: "Cada licao tem um audio gravado pela Vivianne, texto de apoio, um exercicio pratico e uma pergunta para o teu diario. Dura entre 15 e 25 minutos.",
              },
              {
                q: "Posso ouvir as licoes no telemovel?",
                a: "Sim. Toda a experiencia e pensada para funcionar no telemovel. Podes ouvir, ler e escrever a partir de qualquer dispositivo.",
              },
              {
                q: "O que sao os temas transversais?",
                a: "Cada curso cruza varios veus e espelhos sem se prender a nenhum em particular. Por exemplo, 'O Corpo que Guarda' toca na Permanencia, na Memoria e no Turbilhao — mas nao e um curso sobre esses veus. E um curso sobre o corpo.",
              },
              {
                q: "O acesso e vitalicio?",
                a: "Sim. Uma vez comprado, tens acesso para sempre. Podes voltar as licoes quando quiseres.",
              },
            ].map((faq) => (
              <ScrollReveal key={faq.q}>
                <div className="rounded-xl bg-white p-6 shadow-sm">
                  <h3 className="font-bold text-brown-900">{faq.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brown-600">{faq.a}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final — dark */}
      <section className="bg-gradient-to-b from-brown-800 to-brown-900 px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl text-cream">
            O proximo passo e teu
          </h2>
          <p className="mx-auto mt-4 max-w-md leading-relaxed text-brown-200">
            Nao ha pressa. Nao ha ordem certa. Ha apenas o que te chama agora.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/comprar/cursos"
              className="inline-block rounded-md border-2 border-cream bg-cream px-8 py-3.5 font-sans text-[0.8rem] font-medium uppercase tracking-[0.15em] text-brown-900 transition-all hover:bg-transparent hover:text-cream"
            >
              Ver cursos disponiveis
            </Link>
            <Link
              href="/os-sete-veus"
              className="inline-block rounded-md border-2 border-cream/40 px-8 py-3.5 font-sans text-[0.8rem] font-medium uppercase tracking-[0.15em] text-cream/80 transition-all hover:border-cream hover:text-cream"
            >
              Explorar Espelhos
            </Link>
          </div>
          <p className="mx-auto mt-10 max-w-sm font-serif text-sm italic text-brown-400">
            &ldquo;Saber nao basta. E preciso fazer algo com o que se sabe.&rdquo;
          </p>
        </div>
      </section>
    </>
  );
}
