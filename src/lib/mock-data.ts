import type { Profile, Post, Comment, VeuType } from "@/types/database";

// Mock data for development before Supabase is connected
// Replace with real Supabase queries when backend is ready

export const MOCK_PROFILES: Profile[] = [
  {
    id: "1",
    username: "vivianne",
    display_name: "Vivianne",
    avatar_url: null,
    bio: "Criadora d'Os 7 Véus. Em constante descoberta interior.",
    current_veu: "identidade",
    veus_completed: ["ilusao", "medo", "desejo", "controlo", "culpa"],
    created_at: "2025-01-01T00:00:00Z",
    followers_count: 128,
    following_count: 34,
  },
  {
    id: "2",
    username: "maria.lua",
    display_name: "Maria Lua",
    avatar_url: null,
    bio: "A trabalhar o véu do medo. Um dia de cada vez.",
    current_veu: "medo",
    veus_completed: ["ilusao"],
    created_at: "2025-06-15T00:00:00Z",
    followers_count: 42,
    following_count: 18,
  },
  {
    id: "3",
    username: "joao.terra",
    display_name: "João Terra",
    avatar_url: null,
    bio: "Descobri os 7 véus há pouco tempo. Fascinado com o processo.",
    current_veu: "ilusao",
    veus_completed: [],
    created_at: "2026-01-10T00:00:00Z",
    followers_count: 8,
    following_count: 25,
  },
  {
    id: "4",
    username: "ana.sol",
    display_name: "Ana Sol",
    avatar_url: null,
    bio: "Terapeuta holística. O trabalho com os véus transformou a minha prática.",
    current_veu: "controlo",
    veus_completed: ["ilusao", "medo", "desejo"],
    created_at: "2025-09-01T00:00:00Z",
    followers_count: 95,
    following_count: 47,
  },
  {
    id: "5",
    username: "pedro.rio",
    display_name: "Pedro Rio",
    avatar_url: null,
    bio: "Em busca de autenticidade.",
    current_veu: "desejo",
    veus_completed: ["ilusao", "medo"],
    created_at: "2025-11-20T00:00:00Z",
    followers_count: 22,
    following_count: 31,
  },
];

export const MOCK_CURRENT_USER: Profile = MOCK_PROFILES[0];

export const MOCK_POSTS: Post[] = [
  {
    id: "p1",
    author_id: "2",
    author: MOCK_PROFILES[1],
    content:
      "Hoje percebi que passei anos a evitar confrontos por medo de rejeição. Não era paz — era fuga. O Véu do Medo é pesado mas começar a vê-lo já é um alívio enorme.",
    category: "reflexao",
    veu_tag: "medo",
    likes_count: 24,
    comments_count: 5,
    liked_by_me: true,
    created_at: "2026-02-05T10:30:00Z",
  },
  {
    id: "p2",
    author_id: "4",
    author: MOCK_PROFILES[3],
    content:
      "Desafio da semana: dizer \"não\" a pelo menos um pedido que normalmente aceitaria por culpa. Quem se junta?",
    category: "desafio",
    veu_tag: "controlo",
    likes_count: 45,
    comments_count: 12,
    liked_by_me: false,
    created_at: "2026-02-04T16:00:00Z",
  },
  {
    id: "p3",
    author_id: "3",
    author: MOCK_PROFILES[2],
    content:
      "Acabei de ler o capítulo sobre o Véu da Ilusão. A parte sobre \"a vida que funciona mas não convence\" tocou-me profundamente. Alguém mais sentiu isto?",
    category: "pergunta",
    veu_tag: "ilusao",
    likes_count: 18,
    comments_count: 8,
    liked_by_me: false,
    created_at: "2026-02-04T09:15:00Z",
  },
  {
    id: "p4",
    author_id: "1",
    author: MOCK_PROFILES[0],
    content:
      "Marco importante: completei o trabalho com o Véu da Culpa. Foram meses intensos de olhar para padrões que arrastava desde a infância. A libertação não é um momento — é um processo contínuo.",
    category: "progresso",
    veu_tag: "culpa",
    likes_count: 67,
    comments_count: 15,
    liked_by_me: false,
    created_at: "2026-02-03T20:00:00Z",
  },
  {
    id: "p5",
    author_id: "5",
    author: MOCK_PROFILES[4],
    content:
      "Partilho convosco: comecei a meditar 10 minutos por dia focando-me em observar os meus desejos sem reagir. Tem sido revelador perceber quantas decisões tomo no piloto automático.",
    category: "partilha",
    veu_tag: "desejo",
    likes_count: 31,
    comments_count: 6,
    liked_by_me: true,
    created_at: "2026-02-03T14:30:00Z",
  },
  {
    id: "p6",
    author_id: "4",
    author: MOCK_PROFILES[3],
    content:
      "Na minha prática terapêutica, o conceito dos 7 véus tem ajudado os meus clientes a identificar padrões de forma muito mais concreta. O Véu do Desejo em particular gera sempre muitas revelações.",
    category: "reflexao",
    veu_tag: "desejo",
    likes_count: 53,
    comments_count: 9,
    liked_by_me: false,
    created_at: "2026-02-02T11:00:00Z",
  },
];

export const MOCK_COMMENTS: Record<string, Comment[]> = {
  p1: [
    {
      id: "c1",
      post_id: "p1",
      author_id: "4",
      author: MOCK_PROFILES[3],
      content: "Reconheço-me muito nisto, Maria. O primeiro passo é mesmo ver o padrão. Força!",
      created_at: "2026-02-05T11:00:00Z",
    },
    {
      id: "c2",
      post_id: "p1",
      author_id: "1",
      author: MOCK_PROFILES[0],
      content: "Que bonita esta partilha. O véu do medo é dos mais transformadores quando o enfrentamos.",
      created_at: "2026-02-05T11:30:00Z",
    },
  ],
  p2: [
    {
      id: "c3",
      post_id: "p2",
      author_id: "5",
      author: MOCK_PROFILES[4],
      content: "Eu entro! Já disse o primeiro \"não\" hoje e sobrevivi 😄",
      created_at: "2026-02-04T17:00:00Z",
    },
  ],
};

// Simulate following relationships
export const MOCK_FOLLOWING = new Set(["2", "4"]); // Current user follows these IDs

export function getTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "agora";
  if (diffMins < 60) return `${diffMins}min`;
  if (diffHours < 24) return `${diffHours}h`;
  if (diffDays < 7) return `${diffDays}d`;
  return date.toLocaleDateString("pt-PT", { day: "numeric", month: "short" });
}
