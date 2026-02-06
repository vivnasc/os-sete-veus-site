import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Para Quem — Descobre se Sete Ecos é para ti",
  description:
    "A plataforma Sete Ecos foi criada para mulheres que sentem que merecem mais da própria vida. Descobre se este ecossistema fala contigo.",
  openGraph: {
    title: "Para Quem — Descobre se Sete Ecos é para ti",
    description:
      "Ficção psicológica, diário de reflexão e práticas guiadas para quem quer viver, não apenas funcionar.",
  },
};

const perfis = [
  {
    titulo: "A que construiu tudo certo — mas sente que falta algo",
    descricao:
      "Tens a carreira, a rotina, talvez a família. Tudo funciona. Mas à noite, quando tudo pára, sentes um vazio que não sabes nomear. Não é ingratidão — é intuição.",
    sinais: [
      "Sentes que vives no automático",
      "Fazes tudo bem, mas nada te preenche",
      "Tens medo de admitir que queres mais",
    ],
    veu: "O Véu da Ilusão",
    cor: "#c9b896",
    cta: "Começa por aqui",
    link: "/recursos/teste",
  },
  {
    titulo: "A que quer mudar mas não sabe por onde começar",
    descricao:
      "Já leste livros de desenvolvimento pessoal, já tentaste fórmulas. Nada pegou de verdade. Talvez porque o que precisas não é de instruções — é de reconhecimento.",
    sinais: [
      "Sentes sobrecarga de informação",
      "Queres algo mais profundo do que \"dicas\"",
      "Procuras algo que respeite o teu ritmo",
    ],
    veu: "O Véu do Medo",
    cor: "#8b9b8e",
    cta: "Explora os recursos gratuitos",
    link: "/recursos",
  },
  {
    titulo: "A que precisa de parar e ouvir-se",
    descricao:
      "A vida não te deu espaço para ti. Estás sempre a cuidar dos outros, a responder ao que pedem. Precisas de um lugar onde as perguntas sejam tuas — e as respostas também.",
    sinais: [
      "Sentes que te perdeste de ti mesma",
      "Não te lembras da última vez que escreveste sobre ti",
      "Queres um espaço seguro de reflexão",
    ],
    veu: "A experiência completa",
    cor: "#c08aaa",
    cta: "Conhece o ecossistema",
    link: "/ecossistema",
  },
  {
    titulo: "A que já está no caminho e quer ir mais fundo",
    descricao:
      "Já meditas, já reflectes, já te escolhes. Mas queres ferramentas que integrem leitura e prática. Algo que não seja superficial nem dogmático.",
    sinais: [
      "Valorizas profundidade sobre velocidade",
      "Procuras ficção com substância",
      "Queres práticas que complementem a leitura",
    ],
    veu: "A colecção completa",
    cor: "#baaacc",
    cta: "Conhece Os Sete Véus",
    link: "/os-sete-veus",
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
              Para quem é Sete Ecos?
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
                &ldquo;Isto não é para quem quer respostas. É para quem está pronta
                para fazer as suas próprias perguntas.&rdquo;
              </p>
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
