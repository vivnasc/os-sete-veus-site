"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { courses, COURSE_PRICING } from "@/data/courses";
import { useAuth } from "@/components/AuthProvider";

export default function CursosPage() {
  const { user } = useAuth();
  const available = courses.filter((c) => c.status === "available");
  const upcoming = courses.filter((c) => c.status !== "available");

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-stone-100">
      {/* Hero */}
      <div className="bg-gradient-to-b from-brown-800 to-brown-900 py-20 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="font-sans text-[0.65rem] uppercase tracking-[0.25em] text-brown-300">
              Ensino e mentoria
            </p>
            <h1 className="mt-4 font-serif text-4xl text-cream sm:text-5xl">
              Cursos
            </h1>
            <p className="mx-auto mt-5 max-w-xl font-serif text-base leading-relaxed text-brown-200">
              Temas transversais que cruzam veus, espelhos e nos.
              Nao para explicar o que a literatura ja conta —
              mas para te ensinar a viver de outra forma.
            </p>
            <p className="mx-auto mt-4 max-w-md font-serif text-sm italic text-brown-300">
              Pela Vivianne dos Santos
            </p>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-16">
        {/* O que sao */}
        <section className="mb-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-2xl text-brown-900">
              O que sao os cursos
            </h2>
            <p className="mt-4 font-serif text-sm leading-relaxed text-brown-600">
              Os Espelhos contam historias onde te reconheces.
              Os cursos sao outra coisa — sao a Vivianne a partilhar o que aprendeu,
              a ensinar ferramentas e reflexoes que podes usar no teu dia a dia.
              Cada curso cruza varios temas sem se prender a nenhum.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-3">
            {[
              {
                label: "Licoes em audio",
                desc: "A voz da Vivianne a guiar cada licao, ao teu ritmo",
              },
              {
                label: "Exercicios praticos",
                desc: "Praticas simples que podes aplicar na tua vida real",
              },
              {
                label: "Diario reflexivo",
                desc: "Perguntas que te convidam a olhar para dentro",
              },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <p className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-sage">
                  {item.label}
                </p>
                <p className="mt-2 font-serif text-sm text-brown-500">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Disponiveis */}
        {available.length > 0 && (
          <section className="mb-16">
            <h2 className="text-center font-serif text-2xl text-brown-900 sm:text-3xl">
              Disponivel agora
            </h2>
            <div className={`mx-auto mt-10 ${available.length === 1 ? "max-w-lg" : "grid gap-6 sm:grid-cols-2"}`}>
              {available.map((course) => (
                <motion.div
                  key={course.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border-2 border-sage/30 bg-white p-8 shadow-lg"
                >
                  <p className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-sage">
                    Curso · {course.lessons} licoes · {course.totalDuration}
                  </p>
                  <h3 className="mt-2 font-serif text-2xl text-brown-900">
                    {course.title}
                  </h3>
                  <p className="mt-1 font-serif text-sm italic text-brown-500">
                    {course.subtitle}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-brown-600">
                    {course.description}
                  </p>

                  <div className="mt-4">
                    <p className="font-sans text-[0.55rem] uppercase tracking-[0.15em] text-brown-400">
                      Temas transversais
                    </p>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {course.themes.map((theme) => (
                        <span
                          key={theme}
                          className="rounded-full border border-brown-100 px-2.5 py-0.5 font-sans text-[0.6rem] text-brown-500"
                        >
                          {theme}
                        </span>
                      ))}
                    </div>
                  </div>

                  <ul className="mt-5 space-y-2">
                    {[
                      `${course.lessons} licoes em audio`,
                      "Exercicios praticos por licao",
                      "Diario de reflexao pessoal",
                      "Acesso vitalicio",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-brown-600">
                        <span className="mt-0.5 text-sage">~</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="font-serif text-3xl font-bold text-brown-900">
                      ${course.priceUSD} USD
                    </span>
                    <span className="text-sm text-brown-400">
                      / {course.priceMT.toLocaleString()} MZN
                    </span>
                  </div>

                  <Link
                    href={user ? `/comprar/cursos?curso=${course.slug}` : "/entrar"}
                    className="mt-5 block w-full rounded-lg bg-sage py-3.5 text-center font-sans text-sm font-medium uppercase tracking-wider text-white transition-colors hover:bg-sage-dark"
                  >
                    {user ? "Comprar" : "Entrar para comprar"}
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Em preparacao */}
        {upcoming.length > 0 && (
          <section className="mb-16">
            <h2 className="text-center font-serif text-2xl text-brown-900 sm:text-3xl">
              Em preparacao
            </h2>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {upcoming.map((course) => (
                <motion.div
                  key={course.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-brown-200 bg-white p-6"
                >
                  <div
                    className="mb-3 h-1 w-12 rounded-full"
                    style={{ backgroundColor: course.color }}
                  />
                  <h3 className="font-serif text-lg text-brown-900">
                    {course.title}
                  </h3>
                  <p className="mt-1 text-sm italic text-brown-400">
                    {course.subtitle}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-brown-500">
                    {course.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-serif text-xl font-bold text-brown-900">
                      ${course.priceUSD} USD
                    </span>
                    <span className="font-sans text-xs text-brown-400">
                      {course.launchLabel}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Packs */}
        <section className="mb-16">
          <div className="mx-auto max-w-2xl rounded-2xl border border-brown-200 bg-white p-8 text-center">
            <p className="font-sans text-[0.6rem] uppercase tracking-[0.25em] text-sage">
              Packs com desconto
            </p>
            <h2 className="mt-3 font-serif text-2xl text-brown-900">
              Quanto mais cursos, mais valor
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-sage/20 p-5">
                <p className="font-sans text-xs font-medium uppercase tracking-wider text-sage">
                  Pack 3 Cursos
                </p>
                <p className="mt-2 font-serif text-2xl font-bold text-brown-900">
                  ${COURSE_PRICING.pack3.usd} USD
                </p>
                <p className="mt-1 text-xs text-brown-400">
                  {COURSE_PRICING.pack3Savings}% desconto
                </p>
              </div>
              <div className="rounded-xl border border-[#c9a87c]/30 bg-[#c9a87c]/[0.04] p-5">
                <p className="font-sans text-xs font-medium uppercase tracking-wider text-[#c9a87c]">
                  Todos os Cursos
                </p>
                <p className="mt-2 font-serif text-2xl font-bold text-brown-900">
                  ${COURSE_PRICING.allCourses.usd} USD
                </p>
                <p className="mt-1 text-xs text-brown-400">
                  {COURSE_PRICING.allSavings}% desconto
                </p>
              </div>
            </div>
            <p className="mt-4 text-xs text-brown-400">
              Disponivel quando houver 3+ cursos publicados
            </p>
          </div>
        </section>

        {/* Diferenca */}
        <section className="mb-16">
          <div className="mx-auto max-w-2xl rounded-2xl border border-[#c9a87c]/20 bg-[#c9a87c]/[0.04] px-8 py-8 text-center">
            <p className="font-sans text-[0.6rem] uppercase tracking-[0.25em] text-[#c9a87c]">
              Cursos vs. Espelhos
            </p>
            <p className="mx-auto mt-4 max-w-md font-serif text-sm leading-relaxed text-brown-600">
              Os Espelhos sao ficcao — historias onde te reconheces.
              Os cursos sao ensino — a Vivianne a partilhar sabedoria, ferramentas
              e exercicios praticos que te ajudam a viver de outra forma.
              Sao produtos separados. Podes ter um sem o outro.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
