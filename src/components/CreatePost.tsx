"use client";

import { useState } from "react";
import type { Post, PostCategory, VeuType } from "@/types/database";
import { POST_CATEGORIES, VEUS } from "@/types/database";
import { MOCK_CURRENT_USER } from "@/lib/mock-data";
import Avatar from "./Avatar";

interface CreatePostProps {
  onPost: (post: Post) => void;
}

export default function CreatePost({ onPost }: CreatePostProps) {
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<PostCategory>("reflexao");
  const [veuTag, setVeuTag] = useState<VeuType | "">("");
  const [isExpanded, setIsExpanded] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;

    const newPost: Post = {
      id: `p-${Date.now()}`,
      author_id: MOCK_CURRENT_USER.id,
      author: MOCK_CURRENT_USER,
      content: content.trim(),
      category,
      veu_tag: veuTag || null,
      likes_count: 0,
      comments_count: 0,
      liked_by_me: false,
      created_at: new Date().toISOString(),
    };

    onPost(newPost);
    setContent("");
    setCategory("reflexao");
    setVeuTag("");
    setIsExpanded(false);
  }

  return (
    <div className="card">
      <div className="flex gap-3">
        <Avatar
          name={MOCK_CURRENT_USER.display_name}
          url={MOCK_CURRENT_USER.avatar_url}
        />
        <div className="flex-1">
          {!isExpanded ? (
            <button
              onClick={() => setIsExpanded(true)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-left text-sm text-gray-500 transition-colors hover:bg-gray-100"
            >
              Partilha uma reflexão, desafio ou progresso...
            </button>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="O que queres partilhar com a comunidade?"
                rows={4}
                autoFocus
                className="input-field resize-none !rounded-xl"
              />

              {/* Category Selector */}
              <div className="flex flex-wrap gap-1.5">
                {POST_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    className={`veu-badge transition-all ${
                      category === cat.id
                        ? "bg-veu-100 text-veu-700 ring-1 ring-veu-300"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {cat.emoji} {cat.label}
                  </button>
                ))}
              </div>

              {/* Veu Tag Selector */}
              <div>
                <p className="mb-1.5 text-xs font-medium text-gray-500">
                  Associar a um véu (opcional):
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => setVeuTag("")}
                    className={`veu-badge transition-all ${
                      veuTag === ""
                        ? "bg-gray-200 text-gray-700"
                        : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                    }`}
                  >
                    Nenhum
                  </button>
                  {VEUS.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setVeuTag(v.id)}
                      className={`veu-badge transition-all ${
                        veuTag === v.id
                          ? `${v.bgColor} ${v.color} ring-1 ring-current`
                          : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                      }`}
                    >
                      {v.emoji} {v.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsExpanded(false);
                    setContent("");
                  }}
                  className="btn-ghost text-gray-500"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={!content.trim()}
                  className="btn-primary disabled:opacity-40"
                >
                  Publicar
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
