"use client";

import { MOCK_CURRENT_USER, MOCK_POSTS } from "@/lib/mock-data";
import BottomNav from "@/components/BottomNav";
import Avatar from "@/components/Avatar";
import VeuBadge from "@/components/VeuBadge";
import VeuProgress from "@/components/VeuProgress";
import PostCard from "@/components/PostCard";

export default function PerfilPage() {
  const user = MOCK_CURRENT_USER;
  const userPosts = MOCK_POSTS.filter((p) => p.author_id === user.id);

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-lg items-center justify-between px-4 py-3">
          <h1 className="text-xl font-bold text-gray-900">Perfil</h1>
          <button className="rounded-lg bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
              <path fillRule="evenodd" d="M7.84 1.804A1 1 0 018.82 1h2.36a1 1 0 01.98.804l.331 1.652a6.993 6.993 0 011.929 1.115l1.598-.54a1 1 0 011.186.447l1.18 2.044a1 1 0 01-.205 1.251l-1.267 1.113a7.047 7.047 0 010 2.228l1.267 1.113a1 1 0 01.206 1.25l-1.18 2.045a1 1 0 01-1.187.447l-1.598-.54a6.993 6.993 0 01-1.929 1.115l-.33 1.652a1 1 0 01-.98.804H8.82a1 1 0 01-.98-.804l-.331-1.652a6.993 6.993 0 01-1.929-1.115l-1.598.54a1 1 0 01-1.186-.447l-1.18-2.044a1 1 0 01.205-1.251l1.267-1.114a7.05 7.05 0 010-2.227L1.821 7.773a1 1 0 01-.206-1.25l1.18-2.045a1 1 0 011.187-.447l1.598.54A6.993 6.993 0 017.51 3.456l.33-1.652zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 pt-4">
        {/* Profile Card */}
        <div className="card space-y-4">
          <div className="flex items-start gap-4">
            <Avatar name={user.display_name} url={user.avatar_url} size="xl" />
            <div className="flex-1">
              <h2 className="text-lg font-bold text-gray-900">
                {user.display_name}
              </h2>
              <p className="text-sm text-gray-500">@{user.username}</p>

              <div className="mt-2 flex gap-4 text-sm">
                <span>
                  <strong className="text-gray-900">
                    {user.followers_count}
                  </strong>{" "}
                  <span className="text-gray-500">seguidores</span>
                </span>
                <span>
                  <strong className="text-gray-900">
                    {user.following_count}
                  </strong>{" "}
                  <span className="text-gray-500">a seguir</span>
                </span>
              </div>
            </div>
          </div>

          {user.bio && (
            <p className="text-sm leading-relaxed text-gray-700">{user.bio}</p>
          )}

          {/* Current Veu */}
          {user.current_veu && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-gray-500">
                A trabalhar:
              </span>
              <VeuBadge veu={user.current_veu} showNumber />
            </div>
          )}

          {/* Veu Progress */}
          <div>
            <p className="mb-2 text-xs font-medium text-gray-500">
              Progresso nos 7 Véus
            </p>
            <VeuProgress
              completed={user.veus_completed}
              current={user.current_veu}
            />
          </div>

          <button className="btn-secondary w-full">Editar perfil</button>
        </div>

        {/* User Posts */}
        <div className="mt-6">
          <h3 className="mb-3 text-sm font-semibold text-gray-900">
            As minhas publicações
          </h3>
          {userPosts.length > 0 ? (
            <div className="space-y-3">
              {userPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="card py-8 text-center">
              <p className="text-3xl">✨</p>
              <p className="mt-2 text-sm text-gray-500">
                Ainda não partilhaste nada.
              </p>
              <p className="text-xs text-gray-400">
                Vai ao feed para criar a tua primeira publicação.
              </p>
            </div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
