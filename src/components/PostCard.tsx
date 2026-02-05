"use client";

import { useState } from "react";
import Link from "next/link";
import type { Post, Comment } from "@/types/database";
import { POST_CATEGORIES } from "@/types/database";
import { getTimeAgo, MOCK_COMMENTS } from "@/lib/mock-data";
import Avatar from "./Avatar";
import VeuBadge from "./VeuBadge";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const [liked, setLiked] = useState(post.liked_by_me);
  const [likesCount, setLikesCount] = useState(post.likes_count);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>(
    MOCK_COMMENTS[post.id] || []
  );
  const [newComment, setNewComment] = useState("");

  const category = POST_CATEGORIES.find((c) => c.id === post.category);

  function handleLike() {
    setLiked(!liked);
    setLikesCount((prev) => (liked ? prev - 1 : prev + 1));
  }

  function handleAddComment(e: React.FormEvent) {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: `c-${Date.now()}`,
      post_id: post.id,
      author_id: "1",
      author: {
        id: "1",
        username: "vivianne",
        display_name: "Vivianne",
        avatar_url: null,
        bio: null,
        current_veu: "identidade",
        veus_completed: [],
        created_at: "",
        followers_count: 0,
        following_count: 0,
      },
      content: newComment.trim(),
      created_at: new Date().toISOString(),
    };

    setComments([...comments, comment]);
    setNewComment("");
  }

  return (
    <article className="card space-y-3">
      {/* Header */}
      <div className="flex items-start justify-between">
        <Link
          href={`/perfil/${post.author_id}`}
          className="flex items-center gap-3"
        >
          <Avatar
            name={post.author.display_name}
            url={post.author.avatar_url}
          />
          <div>
            <p className="text-sm font-semibold text-gray-900">
              {post.author.display_name}
            </p>
            <p className="text-xs text-gray-500">
              @{post.author.username} · {getTimeAgo(post.created_at)}
            </p>
          </div>
        </Link>

        {category && (
          <span className="veu-badge bg-gray-100 text-gray-600">
            {category.emoji} {category.label}
          </span>
        )}
      </div>

      {/* Content */}
      <p className="text-[15px] leading-relaxed text-gray-800">
        {post.content}
      </p>

      {/* Veu Tag */}
      {post.veu_tag && (
        <div>
          <VeuBadge veu={post.veu_tag} showNumber />
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-1 border-t border-gray-100 pt-3">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm transition-all ${
            liked
              ? "text-veu-600"
              : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={liked ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth={liked ? 0 : 1.5}
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
          <span className="font-medium">{likesCount}</span>
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-gray-500 transition-all hover:bg-gray-50 hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
            />
          </svg>
          <span className="font-medium">
            {comments.length || post.comments_count}
          </span>
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="space-y-3 border-t border-gray-100 pt-3">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-2.5">
              <Avatar
                name={comment.author.display_name}
                url={comment.author.avatar_url}
                size="sm"
              />
              <div className="flex-1 rounded-xl bg-gray-50 px-3 py-2">
                <p className="text-xs font-semibold text-gray-900">
                  {comment.author.display_name}
                  <span className="ml-2 font-normal text-gray-400">
                    {getTimeAgo(comment.created_at)}
                  </span>
                </p>
                <p className="mt-0.5 text-sm text-gray-700">
                  {comment.content}
                </p>
              </div>
            </div>
          ))}

          {/* Add Comment */}
          <form onSubmit={handleAddComment} className="flex gap-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Escreve um comentário..."
              className="input-field flex-1 !rounded-full !py-2 text-sm"
            />
            <button
              type="submit"
              disabled={!newComment.trim()}
              className="rounded-full bg-veu-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-veu-700 disabled:opacity-40"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </article>
  );
}
