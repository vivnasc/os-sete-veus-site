export type VeuType =
  | "ilusao"
  | "medo"
  | "desejo"
  | "controlo"
  | "culpa"
  | "identidade"
  | "separacao";

export interface VeuInfo {
  id: VeuType;
  name: string;
  number: number;
  color: string;
  bgColor: string;
  emoji: string;
}

export const VEUS: VeuInfo[] = [
  { id: "ilusao", name: "Ilusão", number: 1, color: "text-blue-600", bgColor: "bg-blue-100", emoji: "🪞" },
  { id: "medo", name: "Medo", number: 2, color: "text-red-600", bgColor: "bg-red-100", emoji: "🔥" },
  { id: "desejo", name: "Desejo", number: 3, color: "text-pink-600", bgColor: "bg-pink-100", emoji: "🌹" },
  { id: "controlo", name: "Controlo", number: 4, color: "text-amber-600", bgColor: "bg-amber-100", emoji: "⚡" },
  { id: "culpa", name: "Culpa", number: 5, color: "text-gray-600", bgColor: "bg-gray-200", emoji: "⛓️" },
  { id: "identidade", name: "Identidade", number: 6, color: "text-purple-600", bgColor: "bg-purple-100", emoji: "🎭" },
  { id: "separacao", name: "Separação", number: 7, color: "text-emerald-600", bgColor: "bg-emerald-100", emoji: "🌊" },
];

export interface Profile {
  id: string;
  username: string;
  display_name: string;
  avatar_url: string | null;
  bio: string | null;
  current_veu: VeuType | null;
  veus_completed: VeuType[];
  created_at: string;
  followers_count: number;
  following_count: number;
}

export type PostCategory = "reflexao" | "desafio" | "progresso" | "pergunta" | "partilha";

export interface Post {
  id: string;
  author_id: string;
  author: Profile;
  content: string;
  category: PostCategory;
  veu_tag: VeuType | null;
  likes_count: number;
  comments_count: number;
  liked_by_me: boolean;
  created_at: string;
}

export interface Comment {
  id: string;
  post_id: string;
  author_id: string;
  author: Profile;
  content: string;
  created_at: string;
}

export interface Follow {
  follower_id: string;
  following_id: string;
  created_at: string;
}

export const POST_CATEGORIES: { id: PostCategory; label: string; emoji: string }[] = [
  { id: "reflexao", label: "Reflexão", emoji: "💭" },
  { id: "desafio", label: "Desafio", emoji: "🎯" },
  { id: "progresso", label: "Progresso", emoji: "✨" },
  { id: "pergunta", label: "Pergunta", emoji: "❓" },
  { id: "partilha", label: "Partilha", emoji: "💜" },
];
