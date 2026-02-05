"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { MOCK_PROFILES, MOCK_POSTS, MOCK_FOLLOWING } from "@/lib/mock-data";
import BottomNav from "@/components/BottomNav";
import Avatar from "@/components/Avatar";
import VeuBadge from "@/components/VeuBadge";
import VeuProgress from "@/components/VeuProgress";
import PostCard from "@/components/PostCard";

export default function UserProfilePage() {
  const params = useParams();
  const userId = params.id as string;
  const user = MOCK_PROFILES.find((p) => p.id === userId);
  const [isFollowing, setIsFollowing] = useState(
    MOCK_FOLLOWING.has(userId)
  );

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center pb-20">
        <div className="text-center">
          <p className="text-4xl">🤷</p>
          <p className="mt-2 text-sm text-gray-500">
            Utilizador não encontrado.
          </p>
          <Link href="/comunidade" className="btn-ghost mt-4 inline-block">
            Voltar à comunidade
          </Link>
        </div>
        <BottomNav />
      </div>
    );
  }

  const userPosts = MOCK_POSTS.filter((p) => p.author_id === userId);

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-lg items-center gap-3 px-4 py-3">
          <Link
            href="/comunidade"
            className="rounded-lg p-1 text-gray-600 transition-colors hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
              <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
            </svg>
          </Link>
          <h1 className="text-lg font-bold text-gray-900">
            {user.display_name}
          </h1>
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

          <button
            onClick={() => setIsFollowing(!isFollowing)}
            className={isFollowing ? "btn-secondary w-full" : "btn-primary w-full"}
          >
            {isFollowing ? "A seguir" : "Seguir"}
          </button>
        </div>

        {/* User Posts */}
        <div className="mt-6">
          <h3 className="mb-3 text-sm font-semibold text-gray-900">
            Publicações
          </h3>
          {userPosts.length > 0 ? (
            <div className="space-y-3">
              {userPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="card py-8 text-center">
              <p className="text-3xl">🌱</p>
              <p className="mt-2 text-sm text-gray-500">
                Ainda sem publicações.
              </p>
            </div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
