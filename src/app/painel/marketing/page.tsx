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

const WEEK_THEMES = [
  "Pede o teu código",
  "O que são Os Sete Véus",
  "Testemunhos + valor",
  "Recursos + comunidade",
];

const DAILY_PLAN: DayContent[] = [
  // Semana 1 — Pede o teu código
  { carouselId: "carousel-pede-código", hook: "Compraste o livro? Pede o teu código digital gratuito.", storyBg: "/prints/7veuspedircod-portrait.png", whatsapp: `Já tens o livro físico "Os 7 Véus do Despertar"?\n\nAgora existe uma experiência digital que complementa a tua leitura — com diário reflexivo, comunidade anónima e conteúdo exclusivo.\n\nE o melhor: se já compraste o livro, o acesso é gratuito.\n\nPede o teu código aqui: https://seteveus.space/pedir-codigo\n\nDemora menos de 2 minutos. Recebes o código em até 24h.\n\n— Vivianne` },
  { carouselId: "carousel-funil-livro-físico", hook: "Tens o livro físico? Descobre o que mais te espera.", storyBg: "/prints/7veus-3niveis-portrait.png", whatsapp: `Tens o livro físico "Os 7 Véus do Despertar"?\n\nSabias que podes ter acesso gratuito à experiência digital?\n\nInclui:\n— Leitura em 3 níveis (Semente, Raiz, Árvore)\n— Diário reflexivo pessoal\n— Práticas guiadas por véu\n— Comunidade anónima\n\nPede o teu código aqui:\nhttps://seteveus.space/pedir-codigo\n\n— Vivianne` },
  { carouselId: "carousel-do-papel-ao-digital", hook: "Do papel ao ecrã. A mesma essência, uma nova forma.", storyBg: "/prints/7veus- incio-portrait.png", whatsapp: `Uma coisa que talvez não saibas:\n\nO livro físico "Os 7 Véus do Despertar" tem uma extensão digital.\n\nNão é uma cópia — é uma experiência diferente. Podes escrever reflexões à medida que lês, guardar pensamentos por capítulo, e participar numa comunidade anónima de leitoras.\n\nSe tens o livro, pede o teu código: https://seteveus.space/pedir-codigo\n\nÉ gratuito. É pessoal. É teu.\n\n— Vivianne` },
  { carouselId: "carousel-3-razões-digital", hook: "3 razões para activar o teu acesso digital.", storyBg: "/prints/7veus-darkmode-portrait.png", whatsapp: `3 razões para activar o teu acesso digital:\n\n1. O diário reflexivo muda a forma como lês. Ler sem escrever é como olhar para um espelho de olhos fechados.\n\n2. Na comunidade Ecos, não estás sozinha. Outras mulheres estão a atravessar os mesmos véus.\n\n3. 3 níveis de leitura: do guia acessível ao texto original da autora.\n\nJá tens o livro? O acesso é gratuito:\nhttps://seteveus.space/pedir-codigo\n\n— Vivianne` },
  { carouselId: "carousel-tom-intimo", hook: "Uma coisa que talvez não saibas sobre o teu livro.", storyBg: "/prints/7veus-introdeveu-portrait.png", whatsapp: `Antes do fim de semana:\n\nSe compraste "Os 7 Véus do Despertar" e ainda não pediste o teu código digital — este é o momento.\n\nSó precisas de nome, email e (se quiseres) uma foto do livro.\n\nhttps://seteveus.space/pedir-codigo\n\nBom fim de semana. Que o silêncio te encontre.\n\n— Vivianne` },
  { hook: "Descanso. Responder mensagens." },
  { hook: "Descanso." },
  // Semana 2 — O que são Os Sete Véus
  { carouselId: "carousel-o-que-e", hook: "Já sentiste que a vida que tens não foi a que escolheste?", storyBg: "/prints/7veus- incio-portrait.png", whatsapp: `Conheces Os 7 Véus do Despertar?\n\nFiz um teste gratuito — 3 minutos, 7 perguntas — que te mostra qual dos 7 véus mais te influencia neste momento.\n\nNão dá respostas. Dá perguntas.\n\nhttps://seteveus.space/recursos/teste\n\nSe quiseres saber mais: https://seteveus.space\n\n— Vivianne` },
  { carouselId: "carousel-7-véus-resumo", hook: "Os 7 véus que te escondem de ti mesma.", storyBg: "/prints/7veus-dessolucao-portrait.png", whatsapp: `Os 7 véus que te escondem de ti mesma:\n\n1. Permanência — a crença num eu fixo\n2. Memória — as histórias do passado\n3. Turbilhão — a identificação com pensamentos\n4. Esforço — a busca incessante\n5. Desolação — o medo do vazio\n6. Horizonte — a ilusão dos finais\n7. Dualidade — a separação eu/mundo\n\nQual véu te esconde? Descobre em 3 minutos:\nhttps://seteveus.space/recursos/teste\n\n— Vivianne` },
  { carouselId: "carousel-como-funciona", hook: "Como funciona a experiência digital. 3 passos.", storyBg: "/prints/7veus-3niveis-portrait.png", whatsapp: `Como funciona a experiência digital d'Os 7 Véus do Despertar?\n\n1. Pede o teu código (gratuito se tens o livro)\n2. Lê ao teu ritmo — 3 níveis de leitura por véu\n3. Escreve, respira, partilha — diário, práticas, comunidade\n\nInclui: livro completo, 3 níveis, diário, respiração guiada, comunidade Ecos, chatbot 24/7.\n\nhttps://seteveus.space/pedir-codigo\n\n— Vivianne` },
  { carouselId: "carousel-experiência-vs-livro", hook: "Isto não é um livro. É uma experiência.", storyBg: "/prints/7veus-darkmode-portrait.png", whatsapp: `Só com o livro físico: lês, fechas, guardas.\n\nCom o acesso digital: lês em 3 níveis, escreves no diário, práticas guiadas, comunidade anónima.\n\nOs 3 níveis:\n— Semente: guia acessível\n— Raiz: notas filosóficas\n— Árvore: texto original, puro\n\nJá tens o livro? O acesso digital é gratuito:\nhttps://seteveus.space/pedir-codigo\n\n— Vivianne` },
  { carouselId: "carousel-experiência-digital-completa", hook: "O que está dentro da experiência digital?", storyBg: "/prints/dashboard-membro.jpeg", whatsapp: `Para quem já leu ou está a ler Os 7 Véus do Despertar:\n\nSabias que agora podes continuar a experiência no digital? Existe um diário reflexivo por capítulo, uma comunidade anónima de leitoras, e recursos exclusivos.\n\nSe compraste o livro, o acesso é gratuito:\nhttps://seteveus.space/pedir-codigo\n\nSe queres começar:\nhttps://seteveus.space/comprar/livro\n\n— Vivianne` },
  { hook: "Descanso." },
  { hook: "Descanso." },
  // Semana 3 — Testemunhos + valor da experiência
  { carouselId: "carousel-leitura-3-niveis", hook: "Um livro que se lê de 3 formas diferentes.", storyBg: "/prints/7veus-3niveis-portrait.png", whatsapp: `Sabias que o livro "Os 7 Véus do Despertar" pode ser lido de 3 formas diferentes na plataforma digital?\n\nSemente — guia acessível com exemplos concretos\nRaiz — texto com notas de contexto filosófico\nÁrvore — o texto original, puro, sem interrupções\n\nSe já tens o livro físico, o acesso é gratuito:\nhttps://seteveus.space/pedir-codigo\n\n— Vivianne` },
  { carouselId: "carousel-testemunhos", hook: "O que dizem as leitoras.", storyBg: "/prints/comunidade-reflexoes-leitoras.jpeg", whatsapp: `O que dizem as leitoras d'Os 7 Véus do Despertar:\n\n"Saí do modo automático. Não sei para onde vou mas pelo menos estou acordada."\n\n"Chorei no banho. Outra vez. Mas desta vez não foi por tristeza. Foi por reconhecimento."\n\nReconheces-te?\nhttps://seteveus.space/recursos/teste\n\n— Vivianne` },
  { carouselId: "carousel-praticas-guiadas", hook: "Não é só ler. É parar, respirar, escrever.", storyBg: "/prints/7veus-introdeveu-portrait.png", whatsapp: `Não é só ler. É parar, respirar, escrever.\n\nNa experiência digital d'Os 7 Véus:\n\n— Respiração guiada entre capítulos\n— Práticas guiadas por véu, escritas pela autora\n— Diário reflexivo pessoal — só tu lês\n\n"Ler sem escrever é como olhar para um espelho de olhos fechados."\n\nGratuito se já tens o livro:\nhttps://seteveus.space/pedir-codigo\n\n— Vivianne` },
  { carouselId: "carousel-pede-código", hook: "Lembrete: pede o teu código digital gratuito.", storyBg: "/prints/7veuspedircod-portrait.png", whatsapp: `Obrigada pelo interesse!\n\nPara pedir o teu código de acesso digital gratuito, é só preencher este formulário:\n\nhttps://seteveus.space/pedir-codigo\n\nDemora menos de 2 minutos. Recebes o código no teu email em até 24h.\n\nQualquer dúvida, diz-me.\n\n— Vivianne` },
  { hook: "Descanso." },
  { hook: "Descanso." },
  { hook: "Descanso." },
  // Semana 4 — Recursos + comunidade + convite final
  { carouselId: "carousel-recursos-gratis", hook: "5 recursos gratuitos para começar a tua jornada.", storyBg: "/prints/quiz-qual-veu.jpeg", whatsapp: `5 recursos gratuitos para começar a tua jornada interior:\n\n1. Teste: Qual véu te esconde? (3 min)\n2. As 7 Perguntas do Despertar (PDF)\n3. Diário de 7 Dias (PDF)\n4. Checklist do Despertar (PDF)\n5. Mini-guia: O que são os 7 Véus? (PDF)\n\nTudo gratuito. Sem compromisso.\nhttps://seteveus.space/recursos\n\n— Vivianne` },
  { carouselId: "carousel-comunidade-ecos", hook: "Comunidade Ecos — onde as vozes se encontram.", storyBg: "/prints/comunidade-ecos-tabs.jpeg", whatsapp: `E se pudesses partilhar o que sentes sem ninguém saber quem és?\n\nComunidade Ecos:\n\n— Ecos: reflexões anónimas (expiram em 30 dias)\n— Reconhecimentos: não há likes, há "reconheço-me"\n— Sussurros: mensagens de uma só via (expiram em 7 dias)\n\nSem nomes. Sem fotos. Tudo desaparece.\n\nIncluída com qualquer acesso à plataforma:\nhttps://seteveus.space\n\n— Vivianne` },
  { carouselId: "carousel-carta-autora", hook: "Uma carta da autora sobre a experiência digital.", storyBg: "/images/mandala-7veus.png", whatsapp: `Uma mensagem pessoal:\n\nQuando escrevi Os 7 Véus do Despertar, sabia que o livro era apenas o início. A experiência digital nasceu para que não leias sozinha.\n\nHá um diário onde escreves o que sentes. Há práticas guiadas. Há uma comunidade anónima de mulheres que estão a atravessar os mesmos véus.\n\nSe já tens o livro físico, o acesso é gratuito:\nhttps://seteveus.space/pedir-codigo\n\n— Vivianne` },
  { carouselId: "carousel-funil-livro-físico", hook: "Tens o livro? O teu livro abre portas que ainda não conheces.", storyBg: "/prints/7veus-3niveis-portrait.png", whatsapp: `Última semana da campanha:\n\nSe tens o livro físico "Os 7 Véus do Despertar" e ainda não pediste o teu código — este é o momento.\n\nO acesso digital é gratuito. Inclui 3 níveis de leitura, diário, práticas guiadas e comunidade anónima.\n\nhttps://seteveus.space/pedir-codigo\n\n— Vivianne` },
  { carouselId: "carousel-experiência-digital-completa", hook: "Tour completo: o que inclui o acesso digital.", storyBg: "/prints/experiencia-funcionalidades.jpeg", whatsapp: `O que está dentro da experiência digital d'Os 7 Véus do Despertar?\n\n— Leitura em 3 níveis (Semente, Raiz, Árvore)\n— Diário reflexivo pessoal\n— Respiração guiada entre capítulos\n— Práticas guiadas por véu\n— Comunidade anónima (Ecos)\n— Chatbot de apoio 24/7\n— Recursos gratuitos\n\nTens o livro? O acesso é gratuito:\nhttps://seteveus.space/pedir-codigo\n\n— Vivianne` },
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

function getCampaignWeek(dayIdx: number): number {
  return Math.floor(dayIdx / 7);
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
          <div className="absolute inset-0" style={{ backgroundColor: slide.bg, opacity: 0.82 }} />
        </>
      )}
      <div style={{ position: "absolute", left: 56, top: 56, width: 80, height: 80, borderRadius: "50%",
        backgroundColor: slide.accent + "30", color: slide.accent, display: "flex", alignItems: "center",
        justifyContent: "center", fontFamily: "system-ui, sans-serif", fontSize: 32, fontWeight: 700 }}>
        {index + 1}
      </div>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "100px 90px" }}>
        {slide.title && (
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 76,
            lineHeight: 1.12, fontWeight: 700, whiteSpace: "pre-line", margin: 0 }}>{slide.title}</h2>
        )}
        {slide.title && slide.body && (
          <div style={{ width: "12%", height: 4, backgroundColor: slide.accent, opacity: 0.7, margin: "40px 0" }} />
        )}
        {slide.body && (
          <p style={{ fontFamily: "system-ui, sans-serif", fontSize: 34, lineHeight: 1.5,
            fontWeight: 400, whiteSpace: "pre-line", margin: 0 }}>{slide.body}</p>
        )}
      </div>
      {slide.footer && (
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "0 90px 56px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <p style={{ fontFamily: "system-ui, sans-serif", fontSize: 24, fontWeight: 600,
              letterSpacing: "0.08em", textTransform: "uppercase", color: slide.accent, margin: 0 }}>{slide.footer}</p>
            <span style={{ fontFamily: "Georgia, serif", fontSize: 36, opacity: 0.3, color: slide.accent }}>~</span>
          </div>
        </div>
      )}
      <img src="/images/mandala-7veus.png" alt="" crossOrigin="anonymous"
        style={{ position: "absolute", right: 44, top: 44, width: 80, height: 80, opacity: 0.12, objectFit: "contain" }} />
    </div>
  );
}

// ─── VERTICAL SLIDE (9:16) — for WhatsApp / CapCut slideshow ────────────────

function SlidePreviewVertical({ slide, index, scale }: {
  slide: CarouselSlide; index: number; scale: number;
}) {
  return (
    <div className="relative overflow-hidden" style={{
      width: STORY_DIMS.w, height: STORY_DIMS.h,
      transform: `scale(${scale})`, transformOrigin: "top left",
      backgroundColor: slide.bg, color: slide.text,
    }}>
      {slide.bgImage && (
        <>
          <img src={slide.bgImage} alt="" crossOrigin="anonymous"
            className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0" style={{ backgroundColor: slide.bg, opacity: 0.82 }} />
        </>
      )}
      {/* Number badge */}
      <div style={{ position: "absolute", left: 60, top: 80, width: 80, height: 80, borderRadius: "50%",
        backgroundColor: slide.accent + "30", color: slide.accent, display: "flex", alignItems: "center",
        justifyContent: "center", fontFamily: "system-ui, sans-serif", fontSize: 32, fontWeight: 700 }}>
        {index + 1}
      </div>
      {/* Content — centred with more vertical breathing room */}
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "200px 90px" }}>
        {slide.title && (
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 80,
            lineHeight: 1.15, fontWeight: 700, whiteSpace: "pre-line", margin: 0 }}>{slide.title}</h2>
        )}
        {slide.title && slide.body && (
          <div style={{ width: "12%", height: 4, backgroundColor: slide.accent, opacity: 0.7, margin: "48px 0" }} />
        )}
        {slide.body && (
          <p style={{ fontFamily: "system-ui, sans-serif", fontSize: 38, lineHeight: 1.55,
            fontWeight: 400, whiteSpace: "pre-line", margin: 0 }}>{slide.body}</p>
        )}
      </div>
      {slide.footer && (
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "0 90px 100px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <p style={{ fontFamily: "system-ui, sans-serif", fontSize: 26, fontWeight: 600,
              letterSpacing: "0.08em", textTransform: "uppercase", color: slide.accent, margin: 0 }}>{slide.footer}</p>
            <span style={{ fontFamily: "Georgia, serif", fontSize: 40, opacity: 0.3, color: slide.accent }}>~</span>
          </div>
        </div>
      )}
      {/* Brand mark */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, padding: "80px 90px 0", display: "flex",
        justifyContent: "flex-end" }}>
        <img src="/images/mandala-7veus.png" alt="" crossOrigin="anonymous"
          style={{ width: 80, height: 80, opacity: 0.12, objectFit: "contain" }} />
      </div>
    </div>
  );
}

function StoryTextPreview({ slide, scale }: { slide: CarouselSlide; scale: number }) {
  return (
    <div className="relative overflow-hidden" style={{
      width: STORY_DIMS.w, height: STORY_DIMS.h,
      transform: `scale(${scale})`, transformOrigin: "top left",
      backgroundColor: slide.bg, color: slide.text,
    }}>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center", padding: "140px 90px", textAlign: "center" }}>
        {slide.title && (
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 64,
            lineHeight: 1.2, fontWeight: 700, whiteSpace: "pre-line", margin: 0 }}>{slide.title}</h2>
        )}
        {slide.title && slide.body && (
          <div style={{ width: 60, height: 3, backgroundColor: slide.accent, opacity: 0.6, margin: "44px auto" }} />
        )}
        {slide.body && (
          <p style={{ fontFamily: "system-ui, sans-serif", fontSize: 30, lineHeight: 1.65,
            fontWeight: 300, whiteSpace: "pre-line", margin: 0, opacity: 0.85 }}>{slide.body}</p>
        )}
      </div>
      {slide.footer && (
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "0 90px 90px", textAlign: "center" }}>
          <p style={{ fontFamily: "system-ui, sans-serif", fontSize: 22, fontWeight: 500,
            letterSpacing: "0.08em", textTransform: "uppercase", color: slide.accent, margin: 0 }}>{slide.footer}</p>
        </div>
      )}
      <img src="/images/mandala-7veus.png" alt="" crossOrigin="anonymous"
        style={{ position: "absolute", right: 40, top: 40, width: 80, height: 80, opacity: 0.12, objectFit: "contain" }} />
    </div>
  );
}

function StoryMockupPreview({ bgImage, title, scale }: { bgImage: string; title: string; scale: number }) {
  return (
    <div className="relative overflow-hidden" style={{
      width: STORY_DIMS.w, height: STORY_DIMS.h,
      transform: `scale(${scale})`, transformOrigin: "top left",
      backgroundColor: "#2a2420",
    }}>
      <img src={bgImage} alt="" crossOrigin="anonymous"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.35 }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(42,36,32,0.7) 0%, rgba(42,36,32,0.4) 40%, rgba(42,36,32,0.7) 100%)" }} />
      <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)",
        width: 660, height: 1320, borderRadius: 48, overflow: "hidden",
        border: "6px solid rgba(255,255,255,0.15)", boxShadow: "0 40px 100px rgba(0,0,0,0.5)" }}>
        <img src={bgImage} alt="" crossOrigin="anonymous"
          style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div style={{ position: "absolute", top: 80, left: 0, right: 0, textAlign: "center", padding: "0 60px" }}>
        <p style={{ fontFamily: "system-ui, sans-serif", fontSize: 18, fontWeight: 600,
          letterSpacing: "0.12em", textTransform: "uppercase", color: "#c9b896", margin: 0 }}>
          Os Sete Véus
        </p>
      </div>
      <div style={{ position: "absolute", bottom: 90, left: 0, right: 0, textAlign: "center", padding: "0 60px" }}>
        <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 34,
          lineHeight: 1.25, color: "#f7f5f0", margin: 0 }}>{title}</p>
        <p style={{ fontFamily: "system-ui, sans-serif", fontSize: 20, fontWeight: 600,
          color: "#c9b896", marginTop: 20, letterSpacing: "0.06em" }}>seteveus.space</p>
      </div>
      <img src="/images/mandala-7veus.png" alt="" crossOrigin="anonymous"
        style={{ position: "absolute", right: 40, top: 40, width: 72, height: 72, opacity: 0.1, objectFit: "contain" }} />
    </div>
  );
}

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
      {img && (
        <>
          <img src={img} alt="" crossOrigin="anonymous"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.15) 35%, rgba(0,0,0,0.6) 100%)" }} />
        </>
      )}
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center", padding: "140px 72px", textAlign: "center" }}>
        <p style={{ fontFamily: "system-ui, sans-serif", fontSize: 22, fontWeight: 600,
          letterSpacing: "0.12em", textTransform: "uppercase", color: "#25D366", margin: 0 }}>
          Os Sete Véus
        </p>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 56,
          lineHeight: 1.2, fontWeight: 700, whiteSpace: "pre-line", margin: "36px 0 0",
          color: "white" }}>
          {hook}
        </h2>
        {slide.body && !img && (
          <p style={{ fontFamily: "system-ui, sans-serif", fontSize: 26, lineHeight: 1.65,
            fontWeight: 300, whiteSpace: "pre-line", margin: "32px 0 0", opacity: 0.85,
            color: "white" }}>{slide.body}</p>
        )}
      </div>
      <div style={{ position: "absolute", bottom: 90, left: 0, right: 0, textAlign: "center", padding: "0 60px" }}>
        <div style={{ display: "inline-block", backgroundColor: "#25D366", borderRadius: 16,
          padding: "20px 48px" }}>
          <p style={{ fontFamily: "system-ui, sans-serif", fontSize: 24, fontWeight: 700,
            color: "white", margin: 0 }}>seteveus.space/pedir-codigo</p>
        </div>
      </div>
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
  const vertSlideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const storyTextRef = useRef<HTMLDivElement | null>(null);
  const storyMockupRef = useRef<HTMLDivElement | null>(null);
  const waStatusRef = useRef<HTMLDivElement | null>(null);
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeVertSlide, setActiveVertSlide] = useState(0);
  const [exporting, setExporting] = useState(false);
  const [exportingVert, setExportingVert] = useState(false);
  const [exportingStory, setExportingStory] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [openCaption, setOpenCaption] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"instagram" | "whatsapp" | "stories">("whatsapp");

  const today = useMemo(() => new Date(), []);

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
  const campaignWeek = dayIdx >= 0 ? getCampaignWeek(dayIdx) : -1;
  const weekTheme = campaignWeek >= 0 && campaignWeek < WEEK_THEMES.length ? WEEK_THEMES[campaignWeek] : null;
  const campaignProgress = Math.min(100, Math.max(0, ((dayIdx + 1) / DAILY_PLAN.length) * 100));

  const postScale = 340 / DIMS.w;
  const storyScale = 200 / STORY_DIMS.h;
  const vertScale = 160 / STORY_DIMS.w;

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

  const exportAllVert = useCallback(async () => {
    if (!carousel) return;
    setExportingVert(true);
    const { toPng } = await import("html-to-image");
    for (let i = 0; i < carousel.slides.length; i++) {
      const wrapper = vertSlideRefs.current[i];
      if (!wrapper) continue;
      const el = (wrapper.firstElementChild as HTMLElement) || wrapper;
      const orig = { t: el.style.transform, w: el.style.width, h: el.style.height };
      el.style.transform = "none";
      el.style.width = `${STORY_DIMS.w}px`;
      el.style.height = `${STORY_DIMS.h}px`;
      try {
        const dataUrl = await toPng(el, { width: STORY_DIMS.w, height: STORY_DIMS.h, pixelRatio: 1, cacheBust: true });
        const a = document.createElement("a");
        a.download = `${carousel.id}-vertical-${i + 1}.png`;
        a.href = dataUrl;
        a.click();
      } catch { /* skip */ }
      el.style.transform = orig.t;
      el.style.width = orig.w;
      el.style.height = orig.h;
      await new Promise((r) => setTimeout(r, 400));
    }
    setExportingVert(false);
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
    setActiveVertSlide(0);
  }
  function nextWeek() {
    setSelectedDate((prev) => { const d = new Date(prev); d.setDate(d.getDate() + 7); return d; });
    setActiveSlide(0);
    setActiveVertSlide(0);
  }
  function selectDay(d: Date) {
    setSelectedDate(d);
    setActiveSlide(0);
    setActiveVertSlide(0);
    setOpenCaption(null);
  }

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

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
    <div className="min-h-screen bg-[#1a1814]">
      {/* ── HEADER ── */}
      <div className="sticky top-0 z-30 border-b border-[#c9b896]/10 bg-[#1a1814]/95 backdrop-blur-lg">
        <div className="mx-auto max-w-lg px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-1.5 font-sans text-xs text-[#c9b896]/50 hover:text-[#c9b896]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
              Painel
            </Link>
            <div className="text-center">
              <p className="font-serif text-sm font-medium tracking-wide text-cream/90">Campanha</p>
              {weekTheme && (
                <p className="font-sans text-[0.55rem] font-medium uppercase tracking-[0.2em] text-[#c9b896]/60">{weekTheme}</p>
              )}
            </div>
            <Link href="/painel/marketing/gerador"
              className="rounded-lg border border-[#c9b896]/30 px-2.5 py-1.5 font-sans text-[0.6rem] font-medium text-[#c9b896]/80 hover:border-[#c9b896]/60 hover:text-[#c9b896]">
              Gerador
            </Link>
          </div>

          {/* Campaign progress */}
          {dayIdx >= 0 && dayIdx < DAILY_PLAN.length && (
            <div className="mt-2.5">
              <div className="flex items-center justify-between">
                <span className="font-sans text-[0.5rem] uppercase tracking-widest text-cream/30">Dia {dayIdx + 1} de {DAILY_PLAN.length}</span>
                <span className="font-sans text-[0.5rem] uppercase tracking-widest text-cream/30">Semana {campaignWeek + 1}</span>
              </div>
              <div className="mt-1 h-0.5 overflow-hidden rounded-full bg-cream/10">
                <div className="h-full rounded-full bg-gradient-to-r from-[#c9b896]/50 to-[#c9b896] transition-all duration-500" style={{ width: `${campaignProgress}%` }} />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-lg px-4 pb-28">

        {/* ── DATE + WEEK ── */}
        <div className="py-4">
          <p className="font-serif text-lg text-cream/90">
            {DAY_NAMES_FULL[selectedDate.getDay()]}, {selectedDate.getDate()} de {MONTH_NAMES[selectedDate.getMonth()]}
          </p>
        </div>

        {/* Week calendar */}
        <div className="flex items-center gap-1">
          <button onClick={prevWeek} className="p-1.5 text-cream/30 hover:text-cream/60">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <div className="flex flex-1 justify-between">
            {weekDates.map((d) => {
              const idx = getDayIndex(d);
              const hasContent = idx >= 0 && idx < DAILY_PLAN.length && DAILY_PLAN[idx].carouselId;
              const isToday = isSameDay(d, today);
              const isSelected = isSameDay(d, selectedDate);

              return (
                <button key={d.toISOString()} onClick={() => selectDay(d)}
                  className={`flex flex-col items-center rounded-xl px-2.5 py-2 transition-all ${
                    isSelected
                      ? "bg-[#c9b896] shadow-lg shadow-[#c9b896]/20"
                      : isToday
                        ? "bg-cream/5"
                        : "hover:bg-cream/5"
                  }`}>
                  <span className={`font-sans text-[0.5rem] font-semibold uppercase tracking-wider ${
                    isSelected ? "text-[#1a1814]" : "text-cream/30"
                  }`}>
                    {DAY_NAMES_SHORT[d.getDay()]}
                  </span>
                  <span className={`mt-0.5 font-sans text-base font-bold ${
                    isSelected ? "text-[#1a1814]" : isToday ? "text-cream/90" : "text-cream/50"
                  }`}>
                    {d.getDate()}
                  </span>
                  {hasContent && !isSelected && (
                    <div className="mt-1 h-1 w-1 rounded-full bg-[#c9b896]/60" />
                  )}
                  {isSelected && hasContent && (
                    <div className="mt-1 h-1 w-1 rounded-full bg-[#1a1814]/40" />
                  )}
                </button>
              );
            })}
          </div>
          <button onClick={nextWeek} className="p-1.5 text-cream/30 hover:text-cream/60">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>

        {/* ── DAY CONTENT ── */}
        <div className="mt-6">
          {dayContent && carousel ? (
            <>
              {/* Hook */}
              <div className="mb-5 rounded-2xl border border-[#c9b896]/10 bg-gradient-to-br from-[#c9b896]/8 to-transparent p-5">
                <h2 className="font-serif text-xl leading-snug text-cream/90">{dayContent.hook}</h2>
              </div>

              {/* ── PLATFORM TABS ── */}
              <div className="mb-4 flex gap-1 rounded-xl bg-cream/5 p-1">
                {([
                  { id: "whatsapp" as const, label: "WhatsApp", icon: (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  )},
                  { id: "instagram" as const, label: "Instagram", icon: (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" /></svg>
                  )},
                  { id: "stories" as const, label: "Stories", icon: (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12" y2="18" strokeLinecap="round" strokeWidth="3" /></svg>
                  )},
                ] as const).map((tab) => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                    className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2.5 font-sans text-xs font-medium transition-all ${
                      activeTab === tab.id
                        ? tab.id === "whatsapp"
                          ? "bg-[#25D366] text-white shadow-lg shadow-[#25D366]/20"
                          : tab.id === "instagram"
                            ? "bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F77737] text-white shadow-lg"
                            : "bg-cream/90 text-[#1a1814] shadow-lg"
                        : "text-cream/40 hover:text-cream/60"
                    }`}>
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* ── WHATSAPP TAB ── */}
              {activeTab === "whatsapp" && (
                <div className="space-y-3">
                  {/* Vertical carousel (9:16) for CapCut slideshow */}
                  <div className="overflow-hidden rounded-2xl border border-[#25D366]/20 bg-[#0b141a]">
                    <div className="flex items-center justify-between border-b border-[#25D366]/10 px-4 py-3">
                      <div className="flex items-center gap-2">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2" /></svg>
                        <div>
                          <p className="font-sans text-xs font-semibold text-white">Carrossel Vertical ~ {carousel.slides.length} slides</p>
                          <p className="font-sans text-[0.5rem] text-[#8696a0]">9:16 — para CapCut / Reels / Status</p>
                        </div>
                      </div>
                      <span className="rounded-full bg-[#25D366]/20 px-2.5 py-0.5 font-sans text-[0.55rem] font-bold text-[#25D366]">
                        {activeVertSlide + 1}/{carousel.slides.length}
                      </span>
                    </div>

                    <div className="p-4">
                      {/* Swipeable vertical slides */}
                      <div className="relative mx-auto overflow-hidden rounded-xl"
                        style={{ width: STORY_DIMS.w * vertScale, height: STORY_DIMS.h * vertScale }}
                        onTouchStart={(e) => {
                          const touch = e.touches[0];
                          (e.currentTarget as HTMLElement).dataset.touchX = String(touch.clientX);
                        }}
                        onTouchEnd={(e) => {
                          const startX = Number((e.currentTarget as HTMLElement).dataset.touchX || 0);
                          const endX = e.changedTouches[0].clientX;
                          const diff = startX - endX;
                          if (Math.abs(diff) > 40) {
                            if (diff > 0 && activeVertSlide < carousel.slides.length - 1) setActiveVertSlide(activeVertSlide + 1);
                            if (diff < 0 && activeVertSlide > 0) setActiveVertSlide(activeVertSlide - 1);
                          }
                        }}
                      >
                        <div className="flex transition-transform duration-300 ease-out"
                          style={{ transform: `translateX(-${activeVertSlide * 100}%)` }}>
                          {carousel.slides.map((slide, i) => (
                            <div key={i} className="w-full shrink-0">
                              <div ref={(el) => { vertSlideRefs.current[i] = el; }}>
                                <SlidePreviewVertical slide={slide} index={i} scale={vertScale} />
                              </div>
                            </div>
                          ))}
                        </div>

                        {activeVertSlide > 0 && (
                          <button onClick={() => setActiveVertSlide(activeVertSlide - 1)}
                            className="absolute left-2 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-black/70">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
                          </button>
                        )}
                        {activeVertSlide < carousel.slides.length - 1 && (
                          <button onClick={() => setActiveVertSlide(activeVertSlide + 1)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-black/70">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
                          </button>
                        )}
                      </div>

                      {/* Dots */}
                      {carousel.slides.length > 1 && (
                        <div className="mt-3 flex justify-center gap-1.5">
                          {carousel.slides.map((_, i) => (
                            <button key={i} onClick={() => setActiveVertSlide(i)}
                              className={`h-1.5 rounded-full transition-all ${
                                activeVertSlide === i ? "w-5 bg-[#25D366]" : "w-1.5 bg-cream/20"
                              }`} />
                          ))}
                        </div>
                      )}

                      <button onClick={exportAllVert} disabled={exportingVert}
                        className={`mt-4 w-full rounded-xl bg-[#25D366] py-3 font-sans text-sm font-semibold text-white shadow-lg shadow-[#25D366]/20 transition-all hover:bg-[#1da851] active:scale-[0.98] ${exportingVert ? "opacity-60" : ""}`}>
                        {exportingVert ? "A descarregar..." : `Descarregar ${carousel.slides.length} imagens verticais`}
                      </button>
                    </div>
                  </div>

                  {/* WhatsApp Status image */}
                  <div className="overflow-hidden rounded-2xl border border-[#25D366]/20 bg-[#0b141a]">
                    <div className="flex items-center gap-2 border-b border-[#25D366]/10 px-4 py-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#25D366]">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      </div>
                      <div>
                        <p className="font-sans text-xs font-semibold text-white">Imagem para Status</p>
                        <p className="font-sans text-[0.5rem] text-[#8696a0]">Descarrega e publica directamente</p>
                      </div>
                    </div>

                    <div className="p-4">
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
                        className="mt-3 w-full rounded-xl bg-[#25D366] py-3 font-sans text-sm font-semibold text-white shadow-lg shadow-[#25D366]/20 transition-all hover:bg-[#1da851] active:scale-[0.98]">
                        {exportingStory === "wa-status" ? "A descarregar..." : "Descarregar para Status"}
                      </button>
                    </div>
                  </div>

                  {/* WhatsApp message */}
                  <div className="overflow-hidden rounded-2xl border border-[#25D366]/20 bg-[#0b141a]">
                    <div className="flex items-center justify-between border-b border-[#25D366]/10 px-4 py-3">
                      <p className="font-sans text-xs font-semibold text-[#25D366]">Mensagem</p>
                      <button
                        onClick={() => copyText("wa", waCaption)}
                        className={`rounded-lg px-4 py-1.5 font-sans text-xs font-semibold transition-all ${
                          copiedId === "wa"
                            ? "bg-[#25D366] text-white"
                            : "bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/30"
                        }`}
                      >
                        {copiedId === "wa" ? "Copiada!" : "Copiar"}
                      </button>
                    </div>
                    <div className="p-4">
                      <pre className="max-h-64 overflow-y-auto whitespace-pre-wrap rounded-xl bg-[#1b2b27] p-4 font-sans text-[0.75rem] leading-relaxed text-[#d1d7db]">
                        {waCaption}
                      </pre>
                    </div>
                  </div>
                </div>
              )}

              {/* ── INSTAGRAM TAB ── */}
              {activeTab === "instagram" && (
                <div className="space-y-3">
                  {/* Carousel */}
                  <div className="overflow-hidden rounded-2xl border border-cream/10 bg-[#222019]">
                    <div className="flex items-center justify-between border-b border-cream/5 px-4 py-3">
                      <p className="font-sans text-xs font-semibold text-cream/70">
                        Carrossel ~ {carousel.slides.length} slides
                      </p>
                      <span className="rounded-full bg-cream/10 px-2.5 py-0.5 font-sans text-[0.55rem] font-bold text-cream/50">
                        {activeSlide + 1}/{carousel.slides.length}
                      </span>
                    </div>

                    <div className="p-4">
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
                            className="absolute left-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-black/70">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
                          </button>
                        )}
                        {activeSlide < carousel.slides.length - 1 && (
                          <button onClick={() => setActiveSlide(activeSlide + 1)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-black/70">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
                          </button>
                        )}
                      </div>

                      {/* Dots */}
                      {carousel.slides.length > 1 && (
                        <div className="mt-3 flex justify-center gap-1.5">
                          {carousel.slides.map((_, i) => (
                            <button key={i} onClick={() => setActiveSlide(i)}
                              className={`h-1.5 rounded-full transition-all ${
                                activeSlide === i ? "w-5 bg-[#c9b896]" : "w-1.5 bg-cream/20"
                              }`} />
                          ))}
                        </div>
                      )}

                      <button onClick={exportAll} disabled={exporting}
                        className={`mt-4 w-full rounded-xl bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F77737] py-3 font-sans text-sm font-semibold text-white shadow-lg transition-all active:scale-[0.98] ${exporting ? "opacity-60" : ""}`}>
                        {exporting ? "A descarregar..." : `Descarregar ${carousel.slides.length} imagens`}
                      </button>
                    </div>
                  </div>

                  {/* Caption */}
                  <div className="overflow-hidden rounded-2xl border border-cream/10 bg-[#222019]">
                    <div className="flex items-center justify-between border-b border-cream/5 px-4 py-3">
                      <p className="font-sans text-xs font-semibold text-cream/70">Legenda</p>
                      <button
                        onClick={() => copyText("ig", igCaption)}
                        className={`rounded-lg px-4 py-1.5 font-sans text-xs font-semibold transition-all ${
                          copiedId === "ig"
                            ? "bg-[#E1306C] text-white"
                            : "bg-[#E1306C]/20 text-[#E1306C] hover:bg-[#E1306C]/30"
                        }`}
                      >
                        {copiedId === "ig" ? "Copiada!" : "Copiar"}
                      </button>
                    </div>
                    <div className="p-4">
                      <pre className="max-h-48 overflow-y-auto whitespace-pre-wrap rounded-xl bg-black/20 p-4 font-sans text-[0.75rem] leading-relaxed text-cream/70">
                        {igCaption}
                      </pre>
                    </div>
                  </div>

                  {/* Other platforms */}
                  <div className="overflow-hidden rounded-2xl border border-cream/10 bg-[#222019]">
                    <div className="border-b border-cream/5 px-4 py-3">
                      <p className="font-sans text-xs font-semibold text-cream/50">Facebook / TikTok</p>
                    </div>
                    <div className="divide-y divide-cream/5">
                      {platformCaptions.filter(p => p.id !== "ig").map((p) => (
                        <div key={p.id}>
                          <button
                            onClick={() => setOpenCaption(openCaption === p.id ? null : p.id)}
                            className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-cream/3"
                          >
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: p.color }} />
                              <span className="font-sans text-xs font-medium text-cream/60">{p.label}</span>
                            </div>
                            <button
                              onClick={(e) => { e.stopPropagation(); copyText(p.id, p.caption); }}
                              className={`rounded-lg px-3 py-1 font-sans text-[0.6rem] font-semibold transition-all ${
                                copiedId === p.id ? "bg-sage text-white" : "bg-cream/10 text-cream/50 hover:bg-cream/15"
                              }`}
                            >
                              {copiedId === p.id ? "Copiada!" : "Copiar"}
                            </button>
                          </button>
                          {openCaption === p.id && (
                            <div className="bg-black/20 px-4 py-3">
                              <pre className="max-h-48 overflow-y-auto whitespace-pre-wrap font-sans text-[0.7rem] leading-relaxed text-cream/60">
                                {p.caption}
                              </pre>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Hashtags */}
                  <div className="overflow-hidden rounded-2xl border border-cream/10 bg-[#222019]">
                    <div className="border-b border-cream/5 px-4 py-3">
                      <p className="font-sans text-xs font-semibold text-cream/50">Hashtags</p>
                    </div>
                    <div className="divide-y divide-cream/5">
                      {hashtagSets.map((set) => {
                        const allTags = set.tags.join(" ");
                        return (
                          <button key={set.name}
                            onClick={() => copyText(`ht-${set.name}`, allTags)}
                            className="block w-full px-4 py-3 text-left hover:bg-cream/3">
                            <div className="flex items-center justify-between">
                              <span className="font-sans text-xs font-semibold text-cream/60">{set.name}</span>
                              <span className="rounded-full bg-cream/10 px-2 py-0.5 font-sans text-[0.5rem] font-medium text-cream/40">
                                {copiedId === `ht-${set.name}` ? "Copiado!" : `${set.tags.length} tags`}
                              </span>
                            </div>
                            <p className="mt-1 font-sans text-[0.55rem] leading-relaxed text-[#c9b896]/50">
                              {set.tags.slice(0, 5).join(" ")}{set.tags.length > 5 ? " ..." : ""}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* ── STORIES TAB ── */}
              {activeTab === "stories" && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    {/* Story text */}
                    <div className="overflow-hidden rounded-2xl border border-cream/10 bg-[#222019]">
                      <div className="border-b border-cream/5 px-3 py-2.5">
                        <p className="font-sans text-[0.6rem] font-semibold text-cream/50">Texto</p>
                      </div>
                      <div className="p-3">
                        <div className="mx-auto overflow-hidden rounded-lg"
                          style={{ width: STORY_DIMS.w * storyScale, height: STORY_DIMS.h * storyScale }}>
                          <div ref={storyTextRef}>
                            <StoryTextPreview slide={carousel.slides[0]} scale={storyScale} />
                          </div>
                        </div>
                        <button onClick={() => exportStory(storyTextRef, "texto")}
                          disabled={exportingStory === "texto"}
                          className="mt-2 w-full rounded-lg bg-cream/10 py-2 font-sans text-[0.6rem] font-semibold text-cream/60 hover:bg-cream/15">
                          {exportingStory === "texto" ? "..." : "Descarregar"}
                        </button>
                      </div>
                    </div>

                    {/* Story mockup */}
                    <div className="overflow-hidden rounded-2xl border border-cream/10 bg-[#222019]">
                      <div className="border-b border-cream/5 px-3 py-2.5">
                        <p className="font-sans text-[0.6rem] font-semibold text-cream/50">Mockup</p>
                      </div>
                      <div className="p-3">
                        <div className="mx-auto overflow-hidden rounded-lg"
                          style={{ width: STORY_DIMS.w * storyScale, height: STORY_DIMS.h * storyScale }}>
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
                          className="mt-2 w-full rounded-lg bg-cream/10 py-2 font-sans text-[0.6rem] font-semibold text-cream/60 hover:bg-cream/15">
                          {exportingStory === "mockup" ? "..." : "Descarregar"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : dayContent ? (
            <div className="rounded-2xl border border-cream/10 bg-[#222019] p-8 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-cream/5">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cream/30">
                  <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="font-serif text-base text-cream/50">{dayContent.hook}</p>
              <p className="mt-2 font-sans text-xs text-cream/30">Sem post agendado para hoje.</p>
            </div>
          ) : (
            <div className="rounded-2xl border border-cream/10 bg-[#222019] p-8 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-cream/5">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cream/30">
                  <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="font-serif text-base text-cream/50">Fora do calendário de campanha.</p>
              <p className="mt-2 font-sans text-xs text-cream/30">
                A campanha vai de 25 Fev a {(() => { const d = new Date(CAMPAIGN_START); d.setDate(d.getDate() + DAILY_PLAN.length - 1); return `${d.getDate()} ${MONTH_NAMES[d.getMonth()]}`; })()}.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ── FLOATING QUICK ACTION ── */}
      {dayContent?.whatsapp && carousel && (
        <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-cream/5 bg-[#1a1814]/95 backdrop-blur-lg">
          <div className="mx-auto flex max-w-lg items-center gap-2 px-4 py-3">
            <button
              onClick={() => copyText("wa-quick", waCaption)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-3 font-sans text-sm font-semibold transition-all active:scale-[0.98] ${
                copiedId === "wa-quick"
                  ? "bg-[#25D366] text-white"
                  : "bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/30"
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              {copiedId === "wa-quick" ? "Copiada!" : "Copiar WhatsApp"}
            </button>
            <button
              onClick={() => copyText("ig-quick", igCaption)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-3 font-sans text-sm font-semibold transition-all active:scale-[0.98] ${
                copiedId === "ig-quick"
                  ? "bg-[#E1306C] text-white"
                  : "bg-cream/10 text-cream/50 hover:bg-cream/15"
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /></svg>
              {copiedId === "ig-quick" ? "Copiada!" : "Copiar Instagram"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
