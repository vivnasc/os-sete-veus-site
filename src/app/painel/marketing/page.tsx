"use client";

import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { professionalCarousels, hashtagSets } from "@/data/content-calendar-weeks";
import type { CarouselSlide } from "@/data/content-calendar-weeks";

const AUTHOR_EMAILS = ["viv.saraiva@gmail.com"];
const DIMS = { w: 1080, h: 1080 };
const STORY_DIMS = { w: 1080, h: 1920 };

// ─── CAMPAIGN CALENDAR ───────────────────────────────────────────────────────

type DayContent = {
  carouselId?: string;
  whatsapp?: string;
  hook: string;
  storyBg?: string;
};

const CAMPAIGN_START = new Date(2026, 1, 25);

const DAILY_PLAN: DayContent[] = [
  // ── Semana 1 — "Despertar" — perguntas filosóficas + introduzir a experiência ──

  // Dia 1: Abertura filosófica — provocar
  { carouselId: "carousel-o-que-te-esconde", hook: "E se aquilo que mais te protege for exactamente o que te aprisiona?", storyBg: "/prints/7veus-dessolucao-portrait.png", whatsapp: `Há uma pergunta que me perseguiu durante anos:\n\nE se aquilo que mais te protege for exactamente o que te aprisiona?\n\nNão escrevi Os 7 Véus para dar respostas. Escrevi porque precisava de fazer as perguntas certas. Para mim, primeiro. Depois, para quem quisesse ouvir.\n\nSe isto te diz algo, começa por aqui:\nhttps://seteveus.space/recursos/teste\n\n3 minutos. 7 perguntas. Nenhuma resposta certa.\n\n— Vivianne` },

  // Dia 2: O que são os 7 véus — educativo
  { carouselId: "carousel-o-que-e", hook: "Não são chakras. Não são fases. São aquilo que te esconde de ti mesma.", storyBg: "/prints/7veus- incio-portrait.png", whatsapp: `Há 7 camadas entre ti e ti mesma.\n\nNão são chakras, não são fases, não são etapas de um curso. São véus. Coisas que usas todos os dias sem saber — para te proteger, para sobreviver, para não sentir.\n\nIlusão. Medo. Culpa. Identidade. Controlo. Desejo. Separação.\n\nReconheces algum?\n\nhttps://seteveus.space\n\n— Vivianne` },

  // Dia 3: Carta da autora — pessoal
  { carouselId: "carousel-vivianne-carta", hook: "Não escrevi este livro para te ajudar.", storyBg: "/images/mandala-7veus.png", whatsapp: `Vou ser honesta contigo.\n\nNão escrevi este livro para te ajudar. Escrevi-o porque precisava de entender o que me estava a acontecer. A ajuda foi um efeito secundário.\n\nTalvez seja por isso que funciona. Não é um livro que te diz o que fazer. É um livro que te pergunta o que já sabes.\n\nhttps://seteveus.space\n\n— Vivianne` },

  // Dia 4: Como funciona — produto
  { carouselId: "carousel-como-funciona", hook: "Ler. Parar. Escrever. Respirar. Partilhar. Repetir.", storyBg: "/prints/7veus-3niveis-portrait.png", whatsapp: `A experiência digital d'Os 7 Véus não é um ebook.\n\nLês ao teu ritmo. Paras quando precisas. Escreves o que sentes num diário que só tu vês. Respiras entre capítulos. Partilhas anonimamente se quiseres.\n\nNão há pressa. Não há certo nem errado. Há só tu, diante de ti mesma.\n\nhttps://seteveus.space\n\n— Vivianne` },

  // Dia 5: Espelho da Ilusão — quotes do livro
  { carouselId: "carousel-espelho-ilusão", hook: "O primeiro véu é sempre o mais difícil. Porque parece verdade.", storyBg: "/prints/7veus-introdeveu-portrait.png", whatsapp: `O primeiro véu chama-se Ilusão.\n\nNão porque seja falso. Mas porque é tão familiar que parece verdade. A ilusão não engana — acolhe. E é aí que mora o perigo.\n\n"Aquilo que chamas de vida pode ser apenas o hábito de não te questionares."\n\nSe quiseres começar por aqui:\nhttps://seteveus.space/recursos/teste\n\n— Vivianne` },

  // Dia 6-7: Descanso
  { hook: "Descanso." },
  { hook: "Descanso." },

  // ── Semana 2 — "O que te esconde" — conteúdo profundo + comunidade + véus ──

  // Dia 8: 7 perguntas que ninguém te faz
  { carouselId: "carousel-7-perguntas", hook: "7 perguntas que ninguém te faz. Talvez por medo da resposta.", storyBg: "/prints/7veus-darkmode-portrait.png", whatsapp: `Há perguntas que ninguém te faz. Talvez por medo da resposta. Talvez porque nem sabem que existem.\n\nAqui ficam 7:\n\nO que estás a evitar sentir neste momento?\nQue parte de ti deixaste de ouvir?\nA quem estás a tentar provar alguma coisa?\nO que farias se não tivesses medo de ser julgada?\nQue silêncio carregas que não é teu?\nOnde terminas tu e começa a expectativa dos outros?\nO que aconteceria se parasses de te controlar?\n\nNão precisas responder agora. Mas guarda-as.\n\nhttps://seteveus.space\n\n— Vivianne` },

  // Dia 9: Isto não é autoajuda
  { carouselId: "carousel-nao-e-autoajuda", hook: "Isto não é autoajuda. Autoajuda pressupõe que estás partida.", storyBg: "/prints/7veus-dessolucao-portrait.png", whatsapp: `Uma coisa que preciso de dizer:\n\nIsto não é autoajuda. A autoajuda parte do princípio de que algo em ti está partido e precisa de ser consertado.\n\nOs 7 Véus partem de outro lugar: tu já sabes. Só esqueceste. E entre ti e esse saber há camadas — de medo, de culpa, de controlo — que podes aprender a ver.\n\nVer já é o início.\n\nhttps://seteveus.space\n\n— Vivianne` },

  // Dia 10: Os 7 véus resumidos
  { carouselId: "carousel-7-véus-resumo", hook: "Ilusão. Medo. Culpa. Identidade. Controlo. Desejo. Separação. Qual é o teu?", storyBg: "/prints/7veus- incio-portrait.png", whatsapp: `Os 7 véus que te escondem de ti mesma:\n\n1. Ilusão — o conforto do que sempre foi assim\n2. Medo — o silêncio que te paralisa\n3. Culpa — o peso que não te pertence\n4. Identidade — a máscara que esqueceste que usas\n5. Controlo — a mão fechada sobre o que não podes segurar\n6. Desejo — o vazio disfarçado de querer\n7. Separação — a ilusão de que estás sozinha\n\nQual destes reconheces?\n\nhttps://seteveus.space/recursos/teste\n\n— Vivianne` },

  // Dia 11: Comunidade Ecos
  { carouselId: "carousel-comunidade-ecos", hook: "E se pudesses dizer o que sentes sem que ninguém soubesse quem és?", storyBg: "/prints/comunidade-ecos-tabs.jpeg", whatsapp: `Imagina um lugar onde podes dizer o que realmente sentes. Sem nome. Sem foto. Sem julgamento.\n\nNa comunidade Ecos, as reflexões são anónimas e desaparecem ao fim de 30 dias. Não há likes — há "reconheço-me". Não há conversas — há sussurros de uma só via que expiram.\n\nÉ uma comunidade construída sobre impermanência. Como tudo o que é real.\n\nhttps://seteveus.space/comunidade\n\n— Vivianne` },

  // Dia 12: Antes e depois do primeiro véu
  { carouselId: "carousel-antes-depois", hook: "Antes do primeiro véu, tudo fazia sentido. Depois, nada voltou ao lugar.", storyBg: "/prints/7veus-introdeveu-portrait.png", whatsapp: `Antes do primeiro véu, a vida parecia fazer sentido. Havia um plano, uma direcção, uma versão de ti que funcionava.\n\nDepois, algo se move. Não parte — desloca-se. E tu percebes que aquela ordem toda era só uma forma de não olhar.\n\nÉ desconfortável. Mas é real.\n\nSe estás nesse momento, talvez isto te diga algo:\nhttps://seteveus.space/recursos/teste\n\n— Vivianne` },

  // Dia 13-14: Descanso
  { hook: "Descanso." },
  { hook: "Descanso." },

  // ── Semana 3 — "Vozes" — testemunhos + Nó da Herança + tom íntimo ──

  // Dia 15: Testemunhos
  { carouselId: "carousel-testemunhos", hook: "Não saí do livro a mesma. Não sei explicar porquê.", storyBg: "/prints/comunidade-reflexoes-leitoras.jpeg", whatsapp: `Palavras de quem leu:\n\n"Saí do modo automático. Não sei para onde vou, mas pelo menos estou acordada."\n\n"Chorei no banho. Outra vez. Mas desta vez não foi por tristeza. Foi por reconhecimento."\n\n"Não é um livro que se lê. É um livro que te lê."\n\nSe te reconheces nestas palavras, talvez estejas pronta.\n\nhttps://seteveus.space\n\n— Vivianne` },

  // Dia 16: Nó da Herança — Sara e Helena
  { carouselId: "carousel-mãe-filha", hook: "A mãe sempre soube. Esperou anos. Agora que Sara acordou, tem algo para lhe dizer.", storyBg: "/prints/7veus-darkmode-portrait.png", whatsapp: `Sara viu o primeiro véu. Mas o que acontece quando a mãe sempre soube?\n\nO Nó da Herança é a história do que ficou por dizer entre Sara e Helena. O silêncio herdado entre mãe e filha. As palavras que uma engoliu para proteger a outra.\n\nNão é uma sequela. É o que acontece entre duas pessoas quando um véu cai.\n\nSó se desbloqueia depois de viveres o Espelho da Ilusão por inteiro.\n\nhttps://seteveus.space\n\n— Vivianne` },

  // Dia 17: Tom íntimo — a experiência de leitura
  { carouselId: "carousel-tom-intimo", hook: "Ler sem escrever é como olhar para um espelho de olhos fechados.", storyBg: "/prints/7veus-3niveis-portrait.png", whatsapp: `Há uma frase que escrevi e que me persegue:\n\n"Ler sem escrever é como olhar para um espelho de olhos fechados."\n\nPor isso criei o diário reflexivo dentro da experiência digital. Cada capítulo tem um espaço para escreveres o que sentiste. Não é obrigatório. Mas muda tudo.\n\nO que escreves é só teu. Ninguém lê.\n\nhttps://seteveus.space\n\n— Vivianne` },

  // Dia 18: Vozes da comunidade (simuladas)
  { carouselId: "carousel-vozes-ecos", hook: "Não estás sozinha nisto. Mesmo que sintas que estás.", storyBg: "/prints/comunidade-reflexoes-leitoras.jpeg", whatsapp: `Ontem, na comunidade Ecos, alguém escreveu:\n\n"Passei a vida a cuidar de todos. Hoje percebi que ninguém me ensinou a cuidar de mim."\n\nOutra pessoa respondeu com um "reconheço-me".\n\nNão há nomes. Não há rostos. Só vozes que se encontram no escuro e dizem: eu também.\n\nhttps://seteveus.space/comunidade\n\n— Vivianne` },

  // Dia 19: Práticas guiadas
  { carouselId: "carousel-praticas-guiadas", hook: "Não é só ler. É parar. Respirar. Deixar que o silêncio fale.", storyBg: "/prints/7veus-introdeveu-portrait.png", whatsapp: `Entre capítulos, há um momento de respiração. Não é um exercício. É uma pausa.\n\nA experiência digital d'Os 7 Véus foi desenhada para te obrigar a abrandar. Respiração guiada. Práticas escritas pela autora. Espaço para ficares em silêncio.\n\nNum mundo que te pede para correr, isto é um acto de rebeldia.\n\nhttps://seteveus.space\n\n— Vivianne` },

  // Dia 20-21: Descanso
  { hook: "Descanso." },
  { hook: "Descanso." },

  // ── Semana 4 — "Convite" — recursos + Espelho do Medo + convite final ──

  // Dia 22: Recursos gratuitos
  { carouselId: "carousel-recursos-gratis", hook: "Antes de comprares o que quer que seja, experimenta isto. Gratuito.", storyBg: "/prints/quiz-qual-veu.jpeg", whatsapp: `Não te vou pedir que compres nada.\n\nAntes disso, experimenta:\n\n1. Teste: Qual véu te esconde? (3 minutos, gratuito)\n2. As 7 Perguntas do Despertar (PDF)\n3. Diário de 7 Dias (PDF)\n4. Mini-guia: O que são os 7 Véus?\n\nSem compromisso. Sem email obrigatório para tudo. Só tu e a tua curiosidade.\n\nhttps://seteveus.space/recursos\n\n— Vivianne` },

  // Dia 23: Espelho do Medo — teaser
  { carouselId: "carousel-espelho-medo-coming", hook: "Em Março, o segundo véu cai. E este chama-se Medo.", storyBg: "/prints/7veus-dessolucao-portrait.png", whatsapp: `O segundo Espelho está quase pronto.\n\nChama-se O Espelho do Medo. E é sobre tudo aquilo que não disseste. As palavras que ficaram presas. As decisões que não tomaste.\n\nO medo não grita. O medo cala. E no silêncio, constrói a tua vida sem te pedir permissão.\n\nChega em Março de 2026. Se quiseres ser das primeiras a saber:\nhttps://seteveus.space\n\n— Vivianne` },

  // Dia 24: Experiência completa — leitura em 3 níveis
  { carouselId: "carousel-leitura-3-niveis", hook: "O mesmo texto, três profundidades. Escolhe até onde queres ir.", storyBg: "/prints/7veus-3niveis-portrait.png", whatsapp: `Na experiência digital, cada véu pode ser lido de 3 formas:\n\nSemente — guia acessível, com exemplos do dia-a-dia\nRaiz — texto com notas de contexto filosófico\nÁrvore — o texto original, puro, sem interrupções\n\nNão há uma forma certa. Há a tua forma. Há o teu ritmo. Há até onde quiseres ir hoje.\n\nhttps://seteveus.space\n\n— Vivianne` },

  // Dia 25: Do papel ao digital — para quem tem o livro físico
  { carouselId: "carousel-do-papel-ao-digital", hook: "Se tens o livro físico, há algo que talvez ainda não saibas.", storyBg: "/prints/dashboard-membro.jpeg", whatsapp: `Se tens o livro físico d'Os 7 Véus do Despertar, há uma experiência digital que o complementa.\n\nNão é uma cópia. É outra coisa. Escreves reflexões à medida que lês. Tens práticas guiadas por véu. E há uma comunidade anónima de mulheres a atravessar o mesmo caminho.\n\nSe já tens o livro, o acesso é gratuito:\nhttps://seteveus.space/pedir-codigo\n\n— Vivianne` },

  // Dia 26: Carta final — convite
  { carouselId: "carousel-carta-autora", hook: "Não sei se estás pronta. Mas sei que se estás a ler isto, alguma coisa em ti sabe.", storyBg: "/images/mandala-7veus.png", whatsapp: `Uma última coisa.\n\nNão sei se estás pronta. Não sei se este é o momento. Mas sei que se estás a ler isto, alguma coisa em ti já se moveu.\n\nOs 7 Véus não são um destino. São um caminho. E o caminho não pede que estejas preparada — pede que estejas presente.\n\nSe quiseres começar, estou aqui:\nhttps://seteveus.space\n\nCom respeito pelo teu tempo,\n\n— Vivianne` },

  // Dia 27-28: Descanso
  { hook: "Descanso." },
  { hook: "Descanso." },
];

const DAY_NAMES_SHORT = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const DAY_NAMES_FULL = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
const MONTH_NAMES = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

function getDayIndex(date: Date): number {
  return Math.floor((date.getTime() - CAMPAIGN_START.getTime()) / (1000 * 60 * 60 * 24));
}

function getWeekStart(date: Date): Date {
  const d = new Date(date);
  d.setDate(d.getDate() - d.getDay());
  d.setHours(0, 0, 0, 0);
  return d;
}

// ─── CAPTION GENERATORS ─────────────────────────────────────────────────────

function stripHashtags(text: string): string {
  return text.replace(/\n*#[^\s#]+(\s+#[^\s#]+)*/g, "").trim();
}

function toFacebook(igCaption: string): string {
  const clean = stripHashtags(igCaption);
  if (!clean.includes("seteveus.space")) {
    return clean + "\n\nDescobre mais em seteveus.space";
  }
  return clean;
}

function toTikTok(hook: string, igCaption: string): string {
  const firstLine = igCaption.split("\n")[0];
  return `${firstLine}\n\n${hook}\n\nLink na bio.\n\n#autoconhecimento #livros #booktokmocambique #booktok #seteveus`;
}

// ─── SLIDE RENDERER ──────────────────────────────────────────────────────────

function SlidePreview({ slide, index, scale, dims }: {
  slide: CarouselSlide; index: number; scale: number; dims?: { w: number; h: number };
}) {
  const d = dims || DIMS;
  return (
    <div className="relative overflow-hidden" style={{
      width: d.w, height: d.h,
      transform: `scale(${scale})`, transformOrigin: "top left",
      backgroundColor: slide.bg, color: slide.text,
    }}>
      {slide.bgImage && (
        <>
          <img src={slide.bgImage} alt="" crossOrigin="anonymous"
            className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0" style={{ backgroundColor: slide.bg, opacity: 0.72 }} />
        </>
      )}
      <div style={{ position: "absolute", left: 48, top: 48, width: 64, height: 64, borderRadius: "50%",
        backgroundColor: slide.accent + "30", color: slide.accent, display: "flex", alignItems: "center",
        justifyContent: "center", fontFamily: "system-ui, sans-serif", fontSize: 26, fontWeight: 700 }}>
        {index + 1}
      </div>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "100px 80px" }}>
        {slide.title && (
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 58,
            lineHeight: 1.15, fontWeight: 700, whiteSpace: "pre-line", margin: 0 }}>{slide.title}</h2>
        )}
        {slide.title && slide.body && (
          <div style={{ width: "15%", height: 3, backgroundColor: slide.accent, opacity: 0.6, margin: "36px 0" }} />
        )}
        {slide.body && (
          <p style={{ fontFamily: "system-ui, sans-serif", fontSize: 28, lineHeight: 1.55,
            fontWeight: 400, whiteSpace: "pre-line", margin: 0 }}>{slide.body}</p>
        )}
      </div>
      {slide.footer && (
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "0 80px 52px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <p style={{ fontFamily: "system-ui, sans-serif", fontSize: 20, fontWeight: 600,
              letterSpacing: "0.08em", textTransform: "uppercase", color: slide.accent, margin: 0 }}>{slide.footer}</p>
            <span style={{ fontFamily: "Georgia, serif", fontSize: 32, opacity: 0.3, color: slide.accent }}>~</span>
          </div>
        </div>
      )}
      <img src="/images/mandala-7veus.png" alt="" crossOrigin="anonymous"
        style={{ position: "absolute", right: 36, top: 36, width: 72, height: 72, opacity: 0.15, objectFit: "contain" }} />
    </div>
  );
}

// Story text version — 9:16 with first slide content
function StoryTextPreview({ slide, scale }: { slide: CarouselSlide; scale: number }) {
  return (
    <div className="relative overflow-hidden" style={{
      width: STORY_DIMS.w, height: STORY_DIMS.h,
      transform: `scale(${scale})`, transformOrigin: "top left",
      backgroundColor: slide.bg, color: slide.text,
    }}>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center", padding: "120px 80px", textAlign: "center" }}>
        {slide.title && (
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 52,
            lineHeight: 1.25, fontWeight: 700, whiteSpace: "pre-line", margin: 0 }}>{slide.title}</h2>
        )}
        {slide.title && slide.body && (
          <div style={{ width: 60, height: 2, backgroundColor: slide.accent, opacity: 0.5, margin: "40px auto" }} />
        )}
        {slide.body && (
          <p style={{ fontFamily: "system-ui, sans-serif", fontSize: 24, lineHeight: 1.7,
            fontWeight: 300, whiteSpace: "pre-line", margin: 0, opacity: 0.85 }}>{slide.body}</p>
        )}
      </div>
      {slide.footer && (
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "0 80px 80px", textAlign: "center" }}>
          <p style={{ fontFamily: "system-ui, sans-serif", fontSize: 18, fontWeight: 500,
            letterSpacing: "0.08em", textTransform: "uppercase", color: slide.accent, margin: 0 }}>{slide.footer}</p>
        </div>
      )}
      <img src="/images/mandala-7veus.png" alt="" crossOrigin="anonymous"
        style={{ position: "absolute", right: 40, top: 40, width: 80, height: 80, opacity: 0.12, objectFit: "contain" }} />
    </div>
  );
}

// Story mockup version — 9:16 with device screenshot
function StoryMockupPreview({ bgImage, title, scale }: { bgImage: string; title: string; scale: number }) {
  return (
    <div className="relative overflow-hidden" style={{
      width: STORY_DIMS.w, height: STORY_DIMS.h,
      transform: `scale(${scale})`, transformOrigin: "top left",
      backgroundColor: "#2a2420",
    }}>
      {/* Screenshot as background */}
      <img src={bgImage} alt="" crossOrigin="anonymous"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.35 }} />
      {/* Dark overlay */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(42,36,32,0.7) 0%, rgba(42,36,32,0.4) 40%, rgba(42,36,32,0.7) 100%)" }} />
      {/* Phone frame with screenshot */}
      <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)",
        width: 660, height: 1320, borderRadius: 48, overflow: "hidden",
        border: "6px solid rgba(255,255,255,0.15)", boxShadow: "0 40px 100px rgba(0,0,0,0.5)" }}>
        <img src={bgImage} alt="" crossOrigin="anonymous"
          style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      {/* Title overlay at top */}
      <div style={{ position: "absolute", top: 80, left: 0, right: 0, textAlign: "center", padding: "0 60px" }}>
        <p style={{ fontFamily: "system-ui, sans-serif", fontSize: 18, fontWeight: 600,
          letterSpacing: "0.12em", textTransform: "uppercase", color: "#c9b896", margin: 0 }}>
          Os Sete Véus
        </p>
      </div>
      {/* CTA at bottom */}
      <div style={{ position: "absolute", bottom: 80, left: 0, right: 0, textAlign: "center", padding: "0 60px" }}>
        <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 28,
          lineHeight: 1.3, color: "#f7f5f0", margin: 0 }}>{title}</p>
        <p style={{ fontFamily: "system-ui, sans-serif", fontSize: 16, fontWeight: 500,
          color: "#c9b896", marginTop: 16, letterSpacing: "0.05em" }}>seteveus.space</p>
      </div>
      <img src="/images/mandala-7veus.png" alt="" crossOrigin="anonymous"
        style={{ position: "absolute", right: 40, top: 40, width: 72, height: 72, opacity: 0.1, objectFit: "contain" }} />
    </div>
  );
}

// WhatsApp Status image — clean 9:16 image, ready to download and post directly
function WhatsAppStatusImage({ slide, bgImage, hook, scale }: {
  slide: CarouselSlide; bgImage?: string; hook: string; scale: number;
}) {
  const img = bgImage || slide.bgImage;
  return (
    <div className="relative overflow-hidden" style={{
      width: STORY_DIMS.w, height: STORY_DIMS.h,
      transform: `scale(${scale})`, transformOrigin: "top left",
      backgroundColor: "#075e54",
    }}>
      {/* Background image — sharp */}
      {img && (
        <>
          <img src={img} alt="" crossOrigin="anonymous"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.15) 35%, rgba(0,0,0,0.6) 100%)" }} />
        </>
      )}
      {/* Content — centred, personal */}
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center", padding: "140px 72px", textAlign: "center" }}>
        <p style={{ fontFamily: "system-ui, sans-serif", fontSize: 20, fontWeight: 600,
          letterSpacing: "0.1em", textTransform: "uppercase", color: "#25D366", margin: 0 }}>
          Os Sete Véus
        </p>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 48,
          lineHeight: 1.25, fontWeight: 700, whiteSpace: "pre-line", margin: "32px 0 0",
          color: "white" }}>
          {hook}
        </h2>
        {slide.body && !img && (
          <p style={{ fontFamily: "system-ui, sans-serif", fontSize: 22, lineHeight: 1.7,
            fontWeight: 300, whiteSpace: "pre-line", margin: "28px 0 0", opacity: 0.85,
            color: "white" }}>{slide.body}</p>
        )}
      </div>
      {/* CTA at bottom */}
      <div style={{ position: "absolute", bottom: 80, left: 0, right: 0, textAlign: "center", padding: "0 60px" }}>
        <div style={{ display: "inline-block", backgroundColor: "#25D366", borderRadius: 12,
          padding: "16px 40px" }}>
          <p style={{ fontFamily: "system-ui, sans-serif", fontSize: 20, fontWeight: 600,
            color: "white", margin: 0 }}>seteveus.space/pedir-codigo</p>
        </div>
      </div>
      {/* Mandala watermark */}
      <img src="/images/mandala-7veus.png" alt="" crossOrigin="anonymous"
        style={{ position: "absolute", right: 40, top: 40, width: 72, height: 72, opacity: 0.15, objectFit: "contain" }} />
    </div>
  );
}

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────

export default function MarketingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const storyTextRef = useRef<HTMLDivElement | null>(null);
  const storyMockupRef = useRef<HTMLDivElement | null>(null);
  const waStatusRef = useRef<HTMLDivElement | null>(null);
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [activeSlide, setActiveSlide] = useState(0);
  const [exporting, setExporting] = useState(false);
  const [exportingStory, setExportingStory] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [openCaption, setOpenCaption] = useState<string | null>(null);

  const today = useMemo(() => new Date(), []);

  // Compute day/carousel data before early return so hooks stay consistent
  const weekStart = getWeekStart(selectedDate);
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    return d;
  });

  const dayIdx = getDayIndex(selectedDate);
  const dayContent = dayIdx >= 0 && dayIdx < DAILY_PLAN.length ? DAILY_PLAN[dayIdx] : null;
  const carousel = dayContent?.carouselId
    ? professionalCarousels.find((c) => c.id === dayContent.carouselId)
    : null;

  const postScale = 320 / DIMS.h;
  const storyScale = 180 / STORY_DIMS.h;

  const exportAll = useCallback(async () => {
    if (!carousel) return;
    setExporting(true);
    const { toPng } = await import("html-to-image");
    for (let i = 0; i < carousel.slides.length; i++) {
      const wrapper = slideRefs.current[i];
      if (!wrapper) continue;
      const el = (wrapper.firstElementChild as HTMLElement) || wrapper;
      const orig = { t: el.style.transform, w: el.style.width, h: el.style.height };
      el.style.transform = "none";
      el.style.width = `${DIMS.w}px`;
      el.style.height = `${DIMS.h}px`;
      try {
        const dataUrl = await toPng(el, { width: DIMS.w, height: DIMS.h, pixelRatio: 1, cacheBust: true });
        const a = document.createElement("a");
        a.download = `${carousel.id}-slide-${i + 1}.png`;
        a.href = dataUrl;
        a.click();
      } catch { /* skip */ }
      el.style.transform = orig.t;
      el.style.width = orig.w;
      el.style.height = orig.h;
      await new Promise((r) => setTimeout(r, 400));
    }
    setExporting(false);
  }, [carousel]);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/entrar");
    } else if (!loading && user && !AUTHOR_EMAILS.includes(user.email || "")) {
      router.push("/membro");
    }
  }, [loading, user, router]);

  if (loading || !user || !AUTHOR_EMAILS.includes(user.email || "")) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brown-200 border-t-sage" />
      </div>
    );
  }

  async function copyText(id: string, text: string) {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  async function exportStory(ref: React.RefObject<HTMLDivElement | null>, name: string, dims = STORY_DIMS) {
    const wrapper = ref.current;
    if (!wrapper) return;
    const el = (wrapper.firstElementChild as HTMLElement) || wrapper;
    setExportingStory(name);
    const orig = { t: el.style.transform, w: el.style.width, h: el.style.height };
    el.style.transform = "none";
    el.style.width = `${dims.w}px`;
    el.style.height = `${dims.h}px`;
    try {
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(el, { width: dims.w, height: dims.h, pixelRatio: 1, cacheBust: true });
      const a = document.createElement("a");
      a.download = `story-${name}.png`;
      a.href = dataUrl;
      a.click();
    } catch { /* skip */ }
    el.style.transform = orig.t;
    el.style.width = orig.w;
    el.style.height = orig.h;
    setExportingStory(null);
  }

  function prevWeek() {
    setSelectedDate((prev) => { const d = new Date(prev); d.setDate(d.getDate() - 7); return d; });
    setActiveSlide(0);
  }
  function nextWeek() {
    setSelectedDate((prev) => { const d = new Date(prev); d.setDate(d.getDate() + 7); return d; });
    setActiveSlide(0);
  }
  function selectDay(d: Date) {
    setSelectedDate(d);
    setActiveSlide(0);
    setOpenCaption(null);
  }

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

  // Per-platform captions
  const igCaption = carousel?.caption || "";
  const fbCaption = toFacebook(igCaption);
  const waCaption = dayContent?.whatsapp || stripHashtags(igCaption).replace(/seteveus\.space/g, "https://seteveus.space");
  const tkCaption = toTikTok(dayContent?.hook || "", igCaption);

  const platformCaptions = [
    { id: "ig", label: "Instagram", caption: igCaption, color: "#E1306C" },
    { id: "fb", label: "Facebook", caption: fbCaption, color: "#1877F2" },
    { id: "tk", label: "TikTok / Reels", caption: tkCaption, color: "#000000" },
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="border-b border-[#c9b896]/20 bg-gradient-to-r from-brown-900 to-brown-800 px-4 py-4">
        <div className="mx-auto flex max-w-lg items-center justify-between">
          <Link href="/admin" className="font-sans text-xs text-[#c9b896]/70 hover:text-[#c9b896]">
            &larr; Painel
          </Link>
          <p className="font-serif text-sm font-medium tracking-wide text-cream">Conteúdo Pronto</p>
          <Link href="/painel/marketing/gerador"
            className="rounded-lg bg-[#c9b896] px-3 py-1.5 font-sans text-[0.65rem] font-semibold uppercase tracking-wider text-brown-900 hover:bg-[#b8a785]">
            Criar Imagem
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-lg px-4 pb-8">
        {/* Date header */}
        <div className="py-5">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-gradient-to-r from-[#c9b896] to-[#b8a785] px-3 py-1 font-serif text-[0.6rem] font-medium tracking-wide text-brown-900">
              Os Sete Véus
            </span>
          </div>
          <p className="mt-2 font-serif text-lg text-brown-900">
            {DAY_NAMES_FULL[selectedDate.getDay()]}, {selectedDate.getDate()} de {MONTH_NAMES[selectedDate.getMonth()]}
          </p>
        </div>

        {/* Week calendar */}
        <div className="flex items-center gap-1">
          <button onClick={prevWeek} className="p-1 text-brown-300 hover:text-brown-600">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <div className="flex flex-1 justify-between">
            {weekDates.map((d) => {
              const idx = getDayIndex(d);
              const hasContent = idx >= 0 && idx < DAILY_PLAN.length && DAILY_PLAN[idx].carouselId;
              const isToday = isSameDay(d, today);
              const isSelected = isSameDay(d, selectedDate);

              return (
                <button key={d.toISOString()} onClick={() => selectDay(d)}
                  className={`flex flex-col items-center rounded-xl px-2 py-2 transition-all ${
                    isSelected ? "bg-brown-900 text-cream" : "text-brown-400 hover:bg-brown-50"
                  }`}>
                  <span className="font-sans text-[0.55rem] font-medium uppercase">
                    {DAY_NAMES_SHORT[d.getDay()]}
                  </span>
                  <span className={`mt-0.5 font-sans text-lg font-semibold ${isSelected ? "text-cream" : "text-brown-700"}`}>
                    {d.getDate()}
                  </span>
                  <div className="mt-1 h-1.5 w-1.5 rounded-full" style={{
                    backgroundColor: hasContent ? (isSelected ? "#ebe7df" : "#7a8c6e") : "transparent",
                  }} />
                  {isToday && !isSelected && (
                    <div className="mt-0.5 h-0.5 w-3 rounded-full bg-sage" />
                  )}
                </button>
              );
            })}
          </div>
          <button onClick={nextWeek} className="p-1 text-brown-300 hover:text-brown-600">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>

        {/* Day content */}
        <div className="mt-6">
          {dayContent && carousel ? (
            <>
              {/* Hook */}
              <div className="mb-5 rounded-2xl bg-gradient-to-r from-[#c9b896]/10 to-transparent p-4">
                <p className="font-sans text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-[#c9b896]">
                  Post do Dia
                </p>
                <h2 className="mt-2 font-serif text-xl leading-snug text-brown-900">{dayContent.hook}</h2>
              </div>

              {/* ── Post image (1:1) — swipeable carousel ── */}
              <div className="rounded-2xl border border-brown-100 bg-white p-4">
                <div className="mb-3 flex items-center justify-between">
                  <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-wider text-[#c9b896]">
                    Carrossel ~ {carousel.slides.length} slides
                  </p>
                  <span className="rounded bg-brown-100 px-2 py-0.5 font-sans text-[0.55rem] font-semibold text-brown-500">
                    {activeSlide + 1}/{carousel.slides.length}
                  </span>
                </div>

                {/* Swipeable area */}
                <div className="relative mx-auto overflow-hidden rounded-xl"
                  style={{ width: DIMS.w * postScale, height: DIMS.h * postScale }}
                  onTouchStart={(e) => {
                    const touch = e.touches[0];
                    (e.currentTarget as HTMLElement).dataset.touchX = String(touch.clientX);
                  }}
                  onTouchEnd={(e) => {
                    const startX = Number((e.currentTarget as HTMLElement).dataset.touchX || 0);
                    const endX = e.changedTouches[0].clientX;
                    const diff = startX - endX;
                    if (Math.abs(diff) > 40) {
                      if (diff > 0 && activeSlide < carousel.slides.length - 1) setActiveSlide(activeSlide + 1);
                      if (diff < 0 && activeSlide > 0) setActiveSlide(activeSlide - 1);
                    }
                  }}
                >
                  <div className="flex transition-transform duration-300 ease-out"
                    style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
                    {carousel.slides.map((slide, i) => (
                      <div key={i} className="w-full shrink-0">
                        <div ref={(el) => { slideRefs.current[i] = el; }}>
                          <SlidePreview slide={slide} index={i} scale={postScale} />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Nav arrows */}
                  {activeSlide > 0 && (
                    <button onClick={() => setActiveSlide(activeSlide - 1)}
                      className="absolute left-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-opacity hover:bg-black/60">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
                    </button>
                  )}
                  {activeSlide < carousel.slides.length - 1 && (
                    <button onClick={() => setActiveSlide(activeSlide + 1)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-opacity hover:bg-black/60">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
                    </button>
                  )}
                </div>

                {/* Dot indicators */}
                {carousel.slides.length > 1 && (
                  <div className="mt-3 flex justify-center gap-1.5">
                    {carousel.slides.map((_, i) => (
                      <button key={i} onClick={() => setActiveSlide(i)}
                        className={`h-1.5 rounded-full transition-all ${
                          activeSlide === i ? "w-4 bg-brown-900" : "w-1.5 bg-brown-200"
                        }`} />
                    ))}
                  </div>
                )}

                <button onClick={exportAll} disabled={exporting}
                  className={`mt-4 w-full rounded-xl bg-brown-900 py-3 font-sans text-sm font-medium text-cream transition-colors hover:bg-brown-800 ${exporting ? "opacity-60" : ""}`}>
                  {exporting ? "A descarregar..." : `Descarregar ${carousel.slides.length} imagens`}
                </button>
              </div>

              {/* ── Stories (9:16) ── */}
              <div className="mt-4 rounded-2xl border border-brown-100 bg-white p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-wider text-[#c9b896]">
                      Stories — 2 Versões
                    </p>
                  </div>
                  <span className="rounded bg-brown-100 px-2 py-0.5 font-sans text-[0.55rem] font-semibold text-brown-500">
                    9:16
                  </span>
                </div>

                <div className="flex gap-3">
                  {/* Story version 1: Text */}
                  <div className="flex-1">
                    <div className="overflow-hidden rounded-xl"
                      style={{ width: STORY_DIMS.w * storyScale, height: STORY_DIMS.h * storyScale, margin: "0 auto" }}>
                      <div ref={storyTextRef}>
                        <StoryTextPreview slide={carousel.slides[0]} scale={storyScale} />
                      </div>
                    </div>
                    <button onClick={() => exportStory(storyTextRef, "texto")}
                      disabled={exportingStory === "texto"}
                      className="mt-2 w-full rounded-lg bg-brown-900 py-2 font-sans text-[0.6rem] font-medium text-cream hover:bg-brown-800">
                      {exportingStory === "texto" ? "..." : "Descarregar"}
                    </button>
                  </div>

                  {/* Story version 2: Mockup */}
                  <div className="flex-1">
                    <div className="overflow-hidden rounded-xl"
                      style={{ width: STORY_DIMS.w * storyScale, height: STORY_DIMS.h * storyScale, margin: "0 auto" }}>
                      <div ref={storyMockupRef}>
                        {dayContent.storyBg ? (
                          <StoryMockupPreview
                            bgImage={dayContent.storyBg}
                            title={carousel.slides[0]?.title?.split("\n")[0] || dayContent.hook}
                            scale={storyScale}
                          />
                        ) : (
                          <StoryTextPreview slide={{
                            ...carousel.slides[0],
                            bg: "#2a2420",
                            text: "#f7f5f0",
                            accent: "#c9b896",
                          }} scale={storyScale} />
                        )}
                      </div>
                    </div>
                    <button onClick={() => exportStory(storyMockupRef, "mockup")}
                      disabled={exportingStory === "mockup"}
                      className="mt-2 w-full rounded-lg bg-brown-900 py-2 font-sans text-[0.6rem] font-medium text-cream hover:bg-brown-800">
                      {exportingStory === "mockup" ? "..." : "Descarregar"}
                    </button>
                  </div>
                </div>
              </div>

              {/* ── WhatsApp (secção principal) ── */}
              <div className="mt-4 rounded-2xl border-2 border-[#25D366]/30 bg-[#0b141a] p-4">
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#25D366]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  </div>
                  <div>
                    <p className="font-sans text-sm font-semibold text-white">WhatsApp Status</p>
                    <p className="font-sans text-[0.55rem] text-[#8696a0]">Imagem pronta — descarrega e publica</p>
                  </div>
                </div>

                {/* WhatsApp Status image — clean, ready to post */}
                <div className="mx-auto overflow-hidden rounded-xl"
                  style={{ width: STORY_DIMS.w * storyScale, height: STORY_DIMS.h * storyScale }}>
                  <div ref={waStatusRef}>
                    <WhatsAppStatusImage
                      slide={carousel.slides[0]}
                      bgImage={dayContent.storyBg}
                      hook={dayContent.hook}
                      scale={storyScale}
                    />
                  </div>
                </div>
                <button onClick={() => exportStory(waStatusRef, "wa-status")}
                  disabled={exportingStory === "wa-status"}
                  className="mt-3 w-full rounded-xl bg-[#25D366] py-3 font-sans text-sm font-medium text-white hover:bg-[#1da851]">
                  {exportingStory === "wa-status" ? "A descarregar..." : "Descarregar para Status"}
                </button>

                {/* WhatsApp caption */}
                <div className="mt-3 rounded-xl bg-[#1b2b27] p-3">
                  <p className="mb-1.5 font-sans text-[0.55rem] font-semibold uppercase tracking-wider text-[#25D366]">Legenda</p>
                  <pre className="max-h-48 overflow-y-auto whitespace-pre-wrap font-sans text-[0.7rem] leading-relaxed text-[#d1d7db]">
                    {waCaption}
                  </pre>
                </div>
                <button
                  onClick={() => copyText("wa", waCaption)}
                  className="mt-2 w-full rounded-lg bg-[#25D366]/20 py-2 font-sans text-xs font-medium text-[#25D366] hover:bg-[#25D366]/30"
                >
                  {copiedId === "wa" ? "Copiada!" : "Copiar legenda"}
                </button>
              </div>

              {/* ── Legendas (IG / FB / TK) ── */}
              <div className="mt-4 rounded-2xl border border-brown-100 bg-white p-4">
                <div className="mb-3">
                  <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-[#c9b896]">
                    Outras Redes
                  </p>
                </div>

                <div className="space-y-1">
                  {platformCaptions.map((p) => (
                    <div key={p.id} className="overflow-hidden rounded-xl border border-brown-50">
                      <button
                        onClick={() => setOpenCaption(openCaption === p.id ? null : p.id)}
                        className="flex w-full items-center justify-between px-3 py-2.5 text-left transition-colors hover:bg-cream/40"
                      >
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full" style={{ backgroundColor: p.color }} />
                          <span className="font-sans text-xs font-medium text-brown-700">{p.label}</span>
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); copyText(p.id, p.caption); }}
                          className="rounded-lg px-3 py-1 font-sans text-[0.6rem] font-medium text-white transition-colors"
                          style={{ backgroundColor: copiedId === p.id ? "#7a8c6e" : p.color }}
                        >
                          {copiedId === p.id ? "Copiada!" : "Copiar"}
                        </button>
                      </button>
                      {openCaption === p.id && (
                        <div className="border-t border-brown-50 bg-cream/30 px-3 py-2.5">
                          <pre className="max-h-48 overflow-y-auto whitespace-pre-wrap font-sans text-[0.7rem] leading-relaxed text-brown-600">
                            {p.caption}
                          </pre>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Hashtags ── */}
              <div className="mt-4 rounded-2xl border border-brown-100 bg-white p-4">
                <div className="mb-3">
                  <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-[#c9b896]">
                    Hashtags
                  </p>
                  <p className="mt-0.5 font-sans text-[0.55rem] text-brown-400">
                    Toca num grupo para copiar. Combina 2-3 grupos por post.
                  </p>
                </div>
                <div className="space-y-2">
                  {hashtagSets.map((set) => {
                    const allTags = set.tags.join(" ");
                    return (
                      <button key={set.name}
                        onClick={() => copyText(`ht-${set.name}`, allTags)}
                        className="block w-full rounded-xl border border-brown-50 p-2.5 text-left transition-colors hover:bg-cream/40">
                        <div className="flex items-center justify-between">
                          <span className="font-sans text-[0.65rem] font-semibold text-brown-700">{set.name}</span>
                          <span className="rounded-full bg-brown-50 px-2 py-0.5 font-sans text-[0.5rem] text-brown-400">
                            {copiedId === `ht-${set.name}` ? "Copiado!" : `${set.tags.length} tags`}
                          </span>
                        </div>
                        <p className="mt-1 font-sans text-[0.55rem] leading-relaxed text-brown-400">{set.description}</p>
                        <p className="mt-1.5 font-sans text-[0.55rem] leading-relaxed text-[#c9b896]">
                          {set.tags.slice(0, 4).join(" ")}{set.tags.length > 4 ? " ..." : ""}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          ) : dayContent ? (
            <div className="rounded-2xl border border-brown-100 bg-white p-8 text-center">
              <p className="font-serif text-base text-brown-400">{dayContent.hook}</p>
              <p className="mt-2 font-sans text-xs text-brown-300">Sem post agendado para hoje.</p>
            </div>
          ) : (
            <div className="rounded-2xl border border-brown-100 bg-white p-8 text-center">
              <p className="font-serif text-base text-brown-400">Fora do calendário de campanha.</p>
              <p className="mt-2 font-sans text-xs text-brown-300">
                A campanha vai de 25 Fev a 25 Mar.
              </p>
            </div>
          )}
        </div>

        {/* Todos os posts */}
        <div className="mt-8">
          <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-[#c9b896]">
            Todos os Posts ({professionalCarousels.length})
          </p>
          <div className="mt-3 space-y-2">
            {professionalCarousels.map((c) => (
              <button key={c.id} onClick={() => {
                const idx = DAILY_PLAN.findIndex((d) => d.carouselId === c.id);
                if (idx >= 0) {
                  const d = new Date(CAMPAIGN_START);
                  d.setDate(d.getDate() + idx);
                  selectDay(d);
                }
              }}
                className="flex w-full items-center gap-3 rounded-xl border border-brown-100 bg-white p-3 text-left transition-colors hover:bg-cream/50">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg"
                  style={{ backgroundColor: c.slides[0]?.bg || "#3d3630" }}>
                  <span className="font-serif text-[0.5rem] leading-tight" style={{ color: c.slides[0]?.text || "#f7f5f0" }}>
                    {c.slides[0]?.title?.split("\n")[0]?.slice(0, 12)}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-sans text-xs font-medium text-brown-700">{c.title}</p>
                  <p className="font-sans text-[0.6rem] text-brown-400">{c.slides.length} slides</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
