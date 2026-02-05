"use client";

import { useState } from "react";
import type { Post, VeuType } from "@/types/database";
import { VEUS } from "@/types/database";
import { MOCK_POSTS } from "@/lib/mock-data";
import BottomNav from "@/components/BottomNav";
import PostCard from "@/components/PostCard";
import CreatePost from "@/components/CreatePost";

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [filterVeu, setFilterVeu] = useState<VeuType | "all">("all");

  function handleNewPost(post: Post) {
    setPosts([post, ...posts]);
  }

  const filteredPosts =
    filterVeu === "all"
      ? posts
      : posts.filter((p) => p.veu_tag === filterVeu);

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur-lg">
        <div className="mx-auto max-w-lg px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">
              <span className="text-veu-600">Sete</span> Ecos
            </h1>
            <a
              href="/auth"
              className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-200"
            >
              Entrar
            </a>
          </div>

          {/* Veu Filter */}
          <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setFilterVeu("all")}
              className={`veu-badge shrink-0 transition-all ${
                filterVeu === "all"
                  ? "bg-veu-100 text-veu-700 ring-1 ring-veu-300"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Todos
            </button>
            {VEUS.map((v) => (
              <button
                key={v.id}
                onClick={() => setFilterVeu(v.id)}
                className={`veu-badge shrink-0 transition-all ${
                  filterVeu === v.id
                    ? `${v.bgColor} ${v.color} ring-1 ring-current`
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {v.emoji} {v.name}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-lg space-y-3 px-4 pt-4">
        {/* Create Post */}
        <CreatePost onPost={handleNewPost} />

        {/* Posts Feed */}
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <div className="py-12 text-center">
            <p className="text-4xl">🌀</p>
            <p className="mt-2 text-sm text-gray-500">
              Ainda não há publicações para este véu.
            </p>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
