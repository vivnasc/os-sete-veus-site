import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Para Quem — Os Sete Véus",
  description:
    "Os Sete Véus foi criado para quem construiu uma vida que faz sentido para toda a gente — menos para si. Descobre se te reconheces.",
  openGraph: {
    title: "Para Quem — Os Sete Véus",
    description:
      "Ficção literária, diário de reflexão e práticas guiadas para quem quer viver, não apenas funcionar.",
  },
};

const perfis = [
  {
    titulo: "A que construiu tudo certo — mas sente que falta algo",
    descricao:
      "Tens a carreira, a rotina, talvez a família. Os prazos cumprem-se. Os parabéns chegam nas alturas certas. Mas à noite, quando tudo para, surge algo que não é queixa nem ingratidão — é uma intuição suave que diz: há uma versão minha que nunca foi convidada a existir.",
    sinais: [
      "Respondes às perguntas sem saber o que realmente pensas",
      "Cumpriste todos os planos — e mesmo assim sentes que falta algo por perguntar",
      "Tens medo de parar porque não sabes o que vais encontrar no silêncio",
    ],
    veu: "O Espelho da Ilusão",
    cor: "#c9b896",
    cta: "Começa por aqui",
    link: "/recursos/teste",
  },
  {
    titulo: "A que sabe o que quer — mas algo a puxa para trás",
    descricao:
      "Não é covardia. É um mecanismo antigo, treinado ao longo de anos de cautela disfarçada de bom senso. Já leste os livros, já tomaste as decisões certas no papel. Mas na hora de agir, algo hesita. Esse algo não é fraqueza — é o véu que ainda não viste.",
    sinais: [
      "Já sabes o que mudarias — e continuas sem mudar",
      "Sentes que te proteges de algo que ainda não consegues nomear",
      "Queres um passo real, não mais uma fórmula ou lista de tarefas",
    ],
    veu: "O Espelho do Medo",
    cor: "#8b9b8e",
    cta: "Explora os recursos gratuitos",
    link: "/recursos",
  },
  {
    titulo: "A que cuida de tudo — menos de si mesma",
    descricao:
      "A tua vida funciona porque tu seguras tudo no lugar. Mas há perguntas que ficam por fazer porque não há tempo — ou porque tens medo das respostas. Precisas de um lugar onde as perguntas sejam tuas e as respostas também. Sem pressa. Sem ter de justificar.",
    sinais: [
      "Não te lembras da última vez que fizeste algo só porque quiseste",
      "A tua primeira reacção quando alguém pergunta o que queres é perguntar o que os outros querem",
      "Sentes culpa quando te escolhes",
    ],
    veu: "A experiência completa",
    cor: "#c08aaa",
    cta: "Conhece o ecossistema",
    link: "/ecossistema",
  },
  {
    titulo: "A que já está no caminho e quer ir mais fundo",
    descricao:
      "Já meditas, já reflectes, já te escolhes. Mas queres algo que não seja superficial nem dogmático — algo que integre leitura e prática sem te dizer quem tens de ser no fim. Os Espelhos não ensinam nada. Reconhecem o que já sabes mas ainda não admitiste.",
    sinais: [
      "Procuras ficção com substância, não com lições",
      "Valorizas profundidade sobre velocidade",
      "Queres práticas que emergem da história, não instruções separadas",
    ],
    veu: "A colecção completa",
    cor: "#baaacc",
    cta: "Conhece Os Sete Espelhos",
    link: "/experiencias",
  },
];

const naoEPara = [
  "Quem procura respostas prontas ou fórmulas de transformação rápida",
  "Quem quer um PDF para baixar e esquecer",
  "Quem não está disposta a parar e olhar para dentro",
  "Quem espera que alguém lhe diga o que fazer",
];

export default function ParaQuemPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-gradient-animated bg-gradient-to-br from-brown-800 via-[#3d3630] to-brown-900 px-6 py-28 sm:py-36">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal>
            <p className="font-sans text-[0.7rem] uppercase tracking-[0.25em] text-sage-light">
              Descobre
            </p>
            <h1 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-cream sm:text-5xl">
              Para quem são Os Sete Véus?
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-brown-200">
              Se chegaste até aqui, provavelmente já sabes que não é para toda a gente.
              E está tudo bem. Vê se te reconheces.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Perfis */}
      {perfis.map((perfil, i) => (
        <section
          key={perfil.titulo}
          className={`px-6 py-20 ${i % 2 === 0 ? "bg-cream" : "bg-cream-dark"}`}
        >
          <div className="mx-auto max-w-3xl">
            <ScrollReveal>
              <div
                className="mb-4 h-1 w-12 rounded-full"
                style={{ backgroundColor: perfil.cor }}
              />
              <h2 className="font-serif text-2xl leading-snug text-brown-900 sm:text-3xl">
                {perfil.titulo}
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <p className="mt-4 leading-relaxed text-brown-700">
                {perfil.descricao}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.25}>
              <div className="mt-6 rounded-xl border border-brown-100 bg-white p-6">
                <p className="font-sans text-[0.7rem] font-medium uppercase tracking-[0.15em] text-brown-400">
                  Sinais de que isto fala contigo
                </p>
                <ul className="mt-3 space-y-2">
                  {perfil.sinais.map((sinal) => (
                    <li key={sinal} className="flex items-start gap-2 text-sm text-brown-600">
                      <span className="mt-0.5" style={{ color: perfil.cor }}>&#10003;</span>
                      {sinal}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.35}>
              <div className="mt-6 flex items-center gap-4">
                <span
                  className="rounded-full px-3 py-1 font-sans text-xs font-medium text-white"
                  style={{ backgroundColor: perfil.cor }}
                >
                  {perfil.veu}
                </span>
                <Link
                  href={perfil.link}
                  className="font-sans text-sm font-medium text-sage transition-colors hover:text-sage-dark"
                >
                  {perfil.cta} &rarr;
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      ))}

      {/* Não é para quem */}
      <section className="bg-gradient-to-b from-brown-800 to-brown-900 px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
            <h2 className="text-center font-serif text-3xl text-cream">
              E para quem não é?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-center leading-relaxed text-brown-300">
              Preferimos ser honestas. Este ecossistema não é para:
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <ul className="mx-auto mt-8 max-w-lg space-y-3">
              {naoEPara.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-brown-300">
                  <span className="mt-0.5 text-brown-500">&#10005;</span>
                  {item}
                </li>
              ))}
            </ul>
          </ScrollReveal>
          <ScrollReveal delay={0.3} variant="fadeIn">
            <div className="mx-auto mt-10 max-w-lg rounded-r-xl border-l-[3px] border-sage bg-brown-800/50 px-6 py-5">
              <p className="font-serif italic leading-relaxed text-brown-200">
                &ldquo;Os Espelhos não vieram para te mudar. Vieram para que te
                reconheças — e escolhas o que fazer com isso.&rdquo;
              </p>
              <p className="mt-3 text-sm text-brown-500">— Vivianne dos Santos</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-cream px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal>
            <h2 className="font-serif text-3xl text-brown-900">
              Reconheceste-te?
            </h2>
            <p className="mx-auto mt-4 max-w-md leading-relaxed text-brown-600">
              Então o próximo passo é teu. Podes começar sem compromisso — ou mergulhar
              directamente.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/recursos/teste"
                className="animate-pulse-glow inline-block rounded-md border-2 border-sage bg-sage px-8 py-3.5 font-sans text-[0.8rem] font-medium uppercase tracking-[0.15em] text-white transition-all hover:bg-transparent hover:text-sage"
              >
                Faz o teste gratuito
              </Link>
              <Link
                href="/ecossistema"
                className="inline-block rounded-md border-2 border-brown-300 bg-transparent px-8 py-3.5 font-sans text-[0.8rem] font-medium uppercase tracking-[0.15em] text-brown-600 transition-all hover:border-sage hover:bg-sage hover:text-white"
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
