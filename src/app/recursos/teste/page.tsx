"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { experiences, quizVeilToExperience, PRICING } from "@/data/experiences";

const questions = [
  {
    text: "Sentes que a vida que tens foi mais construída por expectativas alheias do que por escolhas tuas?",
    veu: 0,
  },
  {
    text: "Há coisas que queres fazer, mas adias por medo do que pode acontecer?",
    veu: 1,
  },
  {
    text: "Sentes que desejas muitas coisas, mas nenhuma delas te preenche de verdade?",
    veu: 2,
  },
  {
    text: "Precisas de ter tudo sob controlo para te sentires segura?",
    veu: 3,
  },
  {
    text: "Sentes culpa quando fazes algo só para ti, sem ser para os outros?",
    veu: 4,
  },
  {
    text: "Já não sabes bem quem és quando não estás a desempenhar um papel para alguém?",
    veu: 5,
  },
  {
    text: "Sentes que te afastas de ti mesma para seres aceite pelos outros?",
    veu: 6,
  },
  {
    text: "Há momentos em que tudo parece no sítio, mas sentes uma inquietação que não consegues explicar?",
    veu: 0,
  },
  {
    text: "Evitas conversas difíceis por medo de perder alguém ou algo?",
    veu: 1,
  },
  {
    text: "Compras, comes ou preenches o tempo com coisas que no fundo sabes que não precisas?",
    veu: 2,
  },
  {
    text: "Ficas ansiosa quando os planos mudam ou quando algo foge à rotina?",
    veu: 3,
  },
  {
    text: "Quando te elogiam, a tua primeira reacção é desvalorizar ou sentir que não mereces?",
    veu: 4,
  },
  {
    text: "Adaptas a tua opinião ou comportamento dependendo de com quem estás?",
    veu: 5,
  },
  {
    text: "Sentes que se parasses de dar, as pessoas à tua volta se afastariam?",
    veu: 6,
  },
];

const veus = [
  {
    title: "O Espelho da Ilusão",
    subtitle: "Quando a vida que tens não foi a que escolheste",
    description: "Sentes que foste construindo uma vida que faz sentido para toda a gente — menos para ti. Há uma inquietação gentil que te diz: há mais. E essa parte merece ser ouvida.",
    image: "/images/espelho-1-ilusao.png",
    color: "bg-veu-1",
  },
  {
    title: "O Espelho do Medo",
    subtitle: "Quando o medo decide por ti",
    description: "Sabes o que queres, mas o medo decide antes de ti. E se pudesses ver o que há do outro lado? O primeiro passo não precisa de ser grande — precisa apenas de ser teu.",
    image: "/images/espelho-2-medo.png",
    color: "bg-veu-2",
  },
  {
    title: "O Espelho do Desejo",
    subtitle: "Quando desejas tudo menos o que precisas",
    description: "Preenches o tempo e o espaço com coisas que não te preenchem. Talvez estejas a procurar fora o que só podes encontrar dentro. E se parasses para perguntar: o que é que eu quero, de verdade?",
    image: "/images/espelho-3-desejo.png",
    color: "bg-veu-3",
  },
  {
    title: "O Espelho do Controlo",
    subtitle: "Quando segurar é a única forma que conheces",
    description: "Cuidas de tudo e de todos. Mas por vezes, cuidar é outra forma de segurar. E se aprendesses a largar — não tudo, mas o suficiente para te encontrares?",
    image: "/images/espelho-4-controlo.png",
    color: "bg-veu-4",
  },
  {
    title: "O Espelho da Culpa",
    subtitle: "Quando te castigas por querer mais",
    description: "Querer mais parece-te egoísmo. Mas e se fosse vida? A permissão que procuras só tu te podes dar. Mereces tanto quanto dás — e isso não é egoísmo.",
    image: "/images/espelho-5-culpa.png",
    color: "bg-veu-5",
  },
  {
    title: "O Espelho da Identidade",
    subtitle: "Quando já não sabes quem és sem os outros",
    description: "Mãe, filha, mulher, profissional — são tantos os papéis que já não sabes o que sobra quando os tiras. Este espelho convida-te a descobrir quem és por baixo de tudo.",
    image: "/images/espelho-6-identidade.png",
    color: "bg-veu-6",
  },
  {
    title: "O Espelho da Separação",
    subtitle: "Quando te afastas de ti mesma para pertencer",
    description: "Dás tanto para pertencer que te perdeste no processo. E se não precisasses de te separar de ti para seres aceite? O caminho de volta começa por ti.",
    image: "/images/espelho-7-separacao.png",
    color: "bg-veu-7",
  },
];

type Answer = "sim" | "talvez" | "nao";

export default function TestePage() {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [result, setResult] = useState<number | null>(null);
  const [secondVeil, setSecondVeil] = useState<number | null>(null);

  function handleAnswer(answer: Answer) {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      // Calculate result
      const scores = [0, 0, 0, 0, 0, 0, 0];
      newAnswers.forEach((a, i) => {
        const weight = a === "sim" ? 2 : a === "talvez" ? 1 : 0;
        scores[questions[i].veu] += weight;
      });
      const maxScore = Math.max(...scores);
      const primaryVeil = scores.indexOf(maxScore);
      setResult(primaryVeil);

      // Find second highest veil
      const scoresWithIndex = scores.map((s, i) => ({ score: s, index: i }));
      scoresWithIndex.sort((a, b) => b.score - a.score);
      const second = scoresWithIndex.find((s) => s.index !== primaryVeil);
      if (second && second.score > 0) {
        setSecondVeil(second.index);
      }

      // Store for personalized upsells later
      try {
        localStorage.setItem("quiz-primary-veil", String(primaryVeil));
        if (second && second.score > 0) {
          localStorage.setItem("quiz-second-veil", String(second.index));
        }
      } catch {
        // localStorage not available
      }
    }
  }

  function restart() {
    setStarted(false);
    setCurrent(0);
    setAnswers([]);
    setResult(null);
  }

  // Intro screen
  if (!started) {
    return (
      <>
        <section className="bg-gradient-to-b from-brown-800 to-brown-900 px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-serif text-4xl leading-tight text-cream sm:text-5xl">
              Qual véu te esconde?
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-brown-200">
              Um teste breve e gentil para descobrires qual dos sete véus pode estar a esconder-te
              de ti mesma. Sem julgamento. Apenas curiosidade.
            </p>
            <p className="mt-4 text-sm text-brown-400">14 perguntas &middot; 3 minutos</p>
            <button
              onClick={() => setStarted(true)}
              className="mt-10 inline-block rounded-md border-2 border-cream bg-cream px-10 py-4 font-sans text-[0.8rem] font-medium uppercase tracking-[0.15em] text-brown-900 transition-all hover:bg-transparent hover:text-cream"
            >
              Quero descobrir
            </button>
          </div>
        </section>
        <section className="bg-cream px-6 py-16">
          <div className="mx-auto max-w-2xl text-center">
            <p className="leading-relaxed text-brown-600">
              Este teste não é um diagnóstico. É um convite para olhares para dentro com gentileza.
              Não há respostas certas ou erradas — apenas as tuas.
            </p>
          </div>
        </section>
      </>
    );
  }

  // Result screen
  if (result !== null) {
    const veu = veus[result];
    const experienceSlug = quizVeilToExperience[result];
    const experience = experiences.find((e) => e.slug === experienceSlug);
    const secondExp = secondVeil !== null
      ? experiences.find((e) => e.slug === quizVeilToExperience[secondVeil])
      : null;

    return (
      <>
        <section className="bg-gradient-to-b from-brown-800 to-brown-900 px-6 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-sans text-[0.7rem] uppercase tracking-[0.2em] text-brown-300">
              O teu resultado
            </p>
            <h1 className="mt-4 font-serif text-4xl leading-tight text-cream sm:text-5xl">
              {veu.title}
            </h1>
            <p className="mt-2 font-serif text-lg italic text-brown-200">{veu.subtitle}</p>
          </div>
        </section>

        <section className="bg-cream px-6 py-16">
          <div className="mx-auto max-w-3xl">
            <div className="items-center gap-10 md:flex">
              <div className="shrink-0 text-center">
                <Image
                  src={veu.image}
                  alt={veu.title}
                  width={220}
                  height={330}
                  className="mx-auto rounded-lg shadow-xl"
                />
              </div>
              <div className="mt-8 flex-1 md:mt-0">
                <p className="text-lg leading-relaxed text-brown-700">{veu.description}</p>
                <div className="mt-6 rounded-r-xl border-l-[3px] border-sage bg-cream-dark px-6 py-5">
                  <p className="font-serif italic leading-relaxed text-brown-700">
                    &ldquo;Este véu não é um rótulo. É um convite para olhares com gentileza para esta parte de ti.&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* Primary CTA — start this experience */}
            {experience && (
              <div className="mt-12 rounded-2xl border border-brown-100 bg-white p-8 shadow-sm">
                <div className="text-center">
                  <p className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-sage">
                    A tua experiência
                  </p>
                  <h3 className="mt-2 font-serif text-2xl text-brown-900">
                    Começa a travessia de {veu.title}
                  </h3>
                  <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-brown-600">
                    7 capítulos de ficção imersiva, respiração guiada, diário de
                    reflexão e O Teu Espelho — tudo ao teu ritmo.
                  </p>
                  <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                    {experience.status === "available" ? (
                      <Link
                        href="/experiencias#precos"
                        className="inline-block rounded-md bg-sage px-8 py-3.5 font-sans text-[0.8rem] font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-sage-dark"
                      >
                        Começar — ${experience.priceUSD}
                      </Link>
                    ) : (
                      <span className="inline-block rounded-md border-2 border-brown-200 px-8 py-3.5 font-sans text-[0.8rem] font-medium uppercase tracking-[0.12em] text-brown-400">
                        Disponível em {experience.launchLabel}
                      </span>
                    )}
                    <Link
                      href="/experiencias#precos"
                      className="inline-block rounded-md border-2 border-brown-900 px-8 py-3.5 font-sans text-[0.8rem] font-medium uppercase tracking-[0.12em] text-brown-900 transition-all hover:bg-brown-900 hover:text-cream"
                    >
                      Ou todas por ${PRICING.journey.usd}
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Second veil detected */}
            {secondExp && (
              <div className="mt-6 rounded-2xl border border-brown-100 bg-cream-dark px-6 py-5">
                <div className="flex items-center gap-4">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-serif text-sm font-bold text-white"
                    style={{ backgroundColor: secondExp.color }}
                  >
                    {secondExp.number}
                  </span>
                  <div className="flex-1">
                    <p className="font-sans text-xs text-brown-400">
                      O quiz também detectou
                    </p>
                    <p className="font-serif text-base text-brown-800">
                      {secondExp.title}
                    </p>
                    <p className="font-serif text-sm italic text-brown-500">
                      {secondExp.subtitle}
                    </p>
                  </div>
                  <Link
                    href="/experiencias"
                    className="shrink-0 font-sans text-xs text-sage hover:underline"
                  >
                    Explorar &rarr;
                  </Link>
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/experiencias"
                className="inline-block rounded-md border-2 border-brown-900 bg-brown-900 px-8 py-3.5 text-center font-sans text-[0.8rem] font-medium uppercase tracking-[0.15em] text-cream transition-all hover:bg-transparent hover:text-brown-900"
              >
                Ver todas as experiências
              </Link>
              <button
                onClick={restart}
                className="inline-block rounded-md border-2 border-brown-300 bg-transparent px-8 py-3.5 text-center font-sans text-[0.8rem] font-medium uppercase tracking-[0.15em] text-brown-700 transition-all hover:border-brown-900 hover:bg-brown-900 hover:text-cream"
              >
                Recomeçar o teste
              </button>
            </div>
          </div>
        </section>
      </>
    );
  }

  // Question screen
  const progress = ((current + 1) / questions.length) * 100;
  return (
    <>
      <section className="bg-cream px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-2xl">
          {/* Progress bar */}
          <div className="mb-4 flex items-center justify-between font-sans text-[0.7rem] text-brown-400">
            <span>Pergunta {current + 1} de {questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="mb-12 h-1 overflow-hidden rounded-full bg-brown-100">
            <div
              className="h-full rounded-full bg-sage transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Question */}
          <p className="font-serif text-2xl leading-relaxed text-brown-900 sm:text-3xl">
            {questions[current].text}
          </p>

          {/* Answers */}
          <div className="mt-10 flex flex-col gap-4">
            {([
              { value: "sim" as Answer, label: "Sim, identifico-me" },
              { value: "talvez" as Answer, label: "Talvez, às vezes" },
              { value: "nao" as Answer, label: "Não, não me revejo" },
            ]).map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className="rounded-xl border-2 border-brown-100 bg-white px-6 py-5 text-left font-sans text-sm text-brown-700 transition-all hover:border-sage hover:bg-sage/5"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
