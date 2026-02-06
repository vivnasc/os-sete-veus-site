import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

const articles: Record<string, {
  title: string;
  subtitle: string;
  date: string;
  readingTime: string;
  image: string;
  metaDescription: string;
  paragraphs: string[];
}> = {
  "a-vida-que-funciona-e-o-que-vem-depois": {
    title: "A vida que funciona — e o que vem depois",
    subtitle: "Para quem sente que merece mais do que apenas cumprir",
    date: "2026-02-01",
    readingTime: "5 min",
    image: "/images/artigo-vida-funciona.png",
    metaDescription: "Tens uma vida que funciona. Mas sentes que há mais para ti. Este artigo é para quem está pronta para se escolher — sem pressa, sem culpa.",
    paragraphs: [
      "Há vidas que funcionam. Cumprem os prazos, pagam as contas, recebem os parabéns nas alturas certas. Há rotinas que se encaixam, relações que se mantêm, carreiras que avançam com a previsibilidade de quem faz tudo bem.",
      "E no entanto, quando a casa fica em silêncio e o dia termina, surge algo que não é queixa nem ingratidão. É uma intuição suave, quase um sussurro: há mais. Há mais para ti do que isto.",
      "Se já sentiste isso, não é porque algo esteja errado contigo. É porque algo em ti está acordado. Algo que sabe que funcionares bem não é o mesmo que viveres inteira. E essa parte merece ser ouvida.",
      "A maioria das mulheres que sente isto não se queixa. Aliás, queixar-se de quê? Há tanta gente com problemas reais, com razões concretas para sofrer. E tu tens saúde, tens trabalho, tens pessoas que te amam. Como é que se explica que, apesar de tudo isso, há manhãs em que acordas com uma espécie de inquietação gentil — não dor, mas uma pergunta sem resposta?",
      "Não precisas de a explicar. Precisas apenas de a reconhecer.",
      "Essa inquietação não é fraqueza. É a distância entre quem foste sendo e quem estás a tornar-te. Entre o que a vida te pediu e o que tu, no fundo, queres pedir à vida. É um sinal de que estás pronta — não para mudar tudo, mas para começar a ouvir-te.",
      "Porque a verdade é esta: foste construindo, com inteligência e dedicação, uma versão de ti que cabia nas expectativas de toda a gente. A filha responsável, a profissional competente, a amiga presente, a mulher que aguenta. E fizeste-o lindamente. Mas nesse processo, foste adiando uma pergunta essencial: e eu? O que é que eu quero?",
      "Não é que estejas a viver mal. É que há uma versão tua que ainda não teve espaço para existir. E ela está à tua espera.",
      "Este artigo não é sobre como mudar a tua vida. Não há passos, não há fórmulas, não há promessas. É apenas um convite — para parares um momento e reconheceres que essa voz que sentes merece atenção. Que não é egoísmo querer mais. Que há outras mulheres a sentir exactamente isto, mesmo sem conseguirem dizer em voz alta.",
      "E talvez esse seja o primeiro passo: não mudar, mas ver. Não resolver, mas permitir. Dar-te, pela primeira vez em muito tempo, a autorização de sentir que mereces mais — não mais coisas, mas mais ti.",
      "A vida que funciona é um começo. O que vem depois é teu.",
    ],
  },
  "o-dia-em-que-deixas-de-agradar": {
    title: "O dia em que deixas de agradar — e começas a escolher",
    subtitle: "Para quem está cansada de ser tudo para todos",
    date: "2026-01-20",
    readingTime: "5 min",
    image: "/images/artigo-agradar.png",
    metaDescription: "Há um momento em que percebes que podes deixar de agradar — e começar a viver. Este artigo é para quem está pronta para se escolher.",
    paragraphs: [
      "Começa cedo, tão cedo que já não sabes quando começou. Um sorriso de aprovação, um elogio bem colocado, uma sensação breve de pertença. O corpo aprende antes da mente: isto é seguro, isto é aceite, isto é amor.",
      "E a partir daí, sem regras escritas e sem contrato assinado, começas a jogar um jogo silencioso: não desiludir. Ser a filha fácil. A aluna responsável. A amiga presente. A colega fiável. A mulher que aguenta.",
      "Cada papel vem com expectativas subtis, e tu cumpres todas com tal naturalidade que deixas de perceber que estás a desempenhar um papel. Até ao dia em que olhas para trás e percebes que passaram anos. Muitos anos.",
      "Não foi erro. Foi competência. Fizeste tudo \"bem\". O problema é que esse \"bem\" nunca foi definido por ti. Foi moldado pelas necessidades alheias, pelas recompensas externas, pela tranquilidade dos outros.",
      "Mas há algo que acontece quando reconheces isto. Não é raiva, não é culpa — é clareza. É perceber que há uma diferença entre ser amada e ser necessária. E que mereces as duas coisas, mas não ao preço de ti mesma.",
      "Agradar tornou-se automático. Perguntar \"o que quero?\" começou a soar desconfortável, quase egoísta. As escolhas deixaram de ser escolhas e passaram a ser adaptações. Tudo atravessado pela mesma pergunta silenciosa: o que vão pensar de mim?",
      "Imagina, por um momento, que essa pergunta deixava de existir. Imagina que podias escolher sem justificar. Dizer não sem culpa. Querer algo só porque o queres. Não é egoísmo — é inteireza.",
      "O dia em que deixas de agradar não é um momento cinemático. É um processo gentil e gradual. Pequenos \"nãos\" ditos com coragem. Escolhas feitas com atenção. Limites colocados com amor — amor por ti. Cada passo prova a mesma coisa: o mundo não colapsa quando te escolhes.",
      "É assim que começa uma vida mais tua. Não necessariamente mais fácil. Nem mais aplaudida. Mas habitável. Inteira. Sustentável.",
      "Anos a agradar é muito tempo. Mas nunca é tarde para começar a escolher.",
    ],
  },
  "e-se-pudesses-escolher-de-novo": {
    title: "E se pudesses escolher de novo?",
    subtitle: "Para quem sente que a vida aconteceu — e quer começar a decidir",
    date: "2026-01-08",
    readingTime: "5 min",
    image: "/images/artigo-escolha.png",
    metaDescription: "Há um momento em que percebes que a tua vida aconteceu mais do que foi escolhida. Este artigo é para quem está pronta para começar a decidir.",
    paragraphs: [
      "Há um momento, e ele chega de formas diferentes para cada pessoa, em que olhas para a tua vida e percebes, com uma clareza tranquila, que a maioria das coisas que tens não foram escolhidas. Não de verdade. Não da forma como se escolhe quando se sabe que se está a escolher.",
      "Pode acontecer num domingo de manhã, com a casa em silêncio, sentada à mesa da cozinha, diante de uma chávena de café que já arrefeceu. Pode acontecer no meio de uma reunião, enquanto alguém fala de metas e tu te perguntas porque ainda estás ali. Pode acontecer à noite, quando todos dormem e tu ficas acordada a olhar para o tecto.",
      "O momento chega. E quando chega, não traz julgamento — traz uma pergunta gentil: e se pudesse ser diferente?",
      "Não é que a tua vida seja má. Pode até ser invejável vista de fora. A casa, o emprego, a família, as férias no verão. Mas por dentro, sentes que foste levada por uma corrente que nunca questionaste. Estudaste o que era suposto. Casaste quando era suposto. Tiveste filhos porque era o passo seguinte. Aceitaste o emprego porque apareceu.",
      "A palavra certa para isto não é erro. É inércia. E a inércia não é culpa tua — é humana. Seguimos o caminho de menor resistência porque é mais seguro, mais previsível, menos assustador do que perguntar: mas eu quero isto?",
      "Mas há uma beleza neste momento de lucidez. Porque perceber que não escolheste é, em si mesmo, o início de poderes escolher. Não é o fim — é a abertura.",
      "Não precisas de mudar tudo. Não precisas de abandonar o que tens, de reconstruir do zero, de fazer uma revolução. Precisas apenas de começar a perguntar: isto é meu? Isto quero eu? Isto escolho eu?",
      "Recuperar a tua voz leva tempo. Acontece aos poucos, em pequenos actos de honestidade. Em momentos em que te permites sentir o que sentes, sem te julgares. Em escolhas minúsculas — o que comes, como passas uma hora livre, o que dizes quando te perguntam \"estás bem?\" — feitas não por hábito, mas por atenção.",
      "Perceber que a vida aconteceu não é uma crise. É um despertar. O início de uma vida mais consciente. Não mais fácil, não mais perfeita, mas mais tua. Uma vida em que, finalmente, tens voz. E em que essa voz conta.",
      "Nunca é tarde para começar a escolher. E o primeiro passo é pequeno: ouvir-te.",
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const article = articles[slug];
    if (!article) return { title: "Artigo não encontrado" };
    return {
      title: article.title,
      description: article.metaDescription,
    };
  });
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("pt-PT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles[slug];
  if (!article) notFound();

  return (
    <>
      {/* Hero image */}
      <section className="relative h-[50vh] min-h-[360px]">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brown-900/80 via-brown-900/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 px-6 pb-12">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center gap-3 font-sans text-[0.7rem] text-brown-200">
              <time dateTime={article.date}>{formatDate(article.date)}</time>
              <span>&middot;</span>
              <span>{article.readingTime} de leitura</span>
            </div>
            <h1 className="mt-3 font-serif text-3xl leading-tight text-cream sm:text-4xl md:text-5xl">
              {article.title}
            </h1>
            <p className="mt-2 font-serif text-lg italic text-brown-200">
              {article.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Article body */}
      <section className="bg-cream px-6 py-16">
        <article className="mx-auto max-w-3xl">
          {article.paragraphs.map((p, i) => (
            <p key={i} className="mb-7 leading-[1.9] text-brown-700">
              {p}
            </p>
          ))}
        </article>
      </section>

      {/* CTA */}
      <section className="bg-cream-dark px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-r-xl border-l-[3px] border-sage bg-cream px-6 py-5">
            <p className="font-serif italic leading-relaxed text-brown-700">
              Se estas palavras ressoaram contigo, há sete histórias à tua espera.
              Não são manuais — são convites.
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/os-sete-veus"
              className="inline-block rounded-md border-2 border-brown-900 bg-brown-900 px-8 py-3.5 text-center font-sans text-[0.8rem] font-medium uppercase tracking-[0.15em] text-cream transition-all hover:bg-transparent hover:text-brown-900"
            >
              Conhece Os Sete Véus
            </Link>
            <Link
              href="/artigos"
              className="inline-block rounded-md border-2 border-brown-300 bg-transparent px-8 py-3.5 text-center font-sans text-[0.8rem] font-medium uppercase tracking-[0.15em] text-brown-700 transition-all hover:border-brown-900 hover:bg-brown-900 hover:text-cream"
            >
              Mais artigos
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
