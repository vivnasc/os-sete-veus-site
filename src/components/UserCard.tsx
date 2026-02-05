"use client";

import { useState } from "react";
import Link from "next/link";
import type { Profile } from "@/types/database";
import Avatar from "./Avatar";
import VeuBadge from "./VeuBadge";
import VeuProgress from "./VeuProgress";

interface UserCardProps {
  user: Profile;
  isFollowing?: boolean;
  showProgress?: boolean;
}

export default function UserCard({
  user,
  isFollowing: initialFollowing = false,
  showProgress = false,
}: UserCardProps) {
  const [isFollowing, setIsFollowing] = useState(initialFollowing);

  return (
    <div className="card">
      <div className="flex items-start gap-3">
        <Link href={`/perfil/${user.id}`}>
          <Avatar name={user.display_name} url={user.avatar_url} size="lg" />
        </Link>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <Link href={`/perfil/${user.id}`} className="min-w-0">
              <p className="truncate text-sm font-semibold text-gray-900">
                {user.display_name}
              </p>
              <p className="text-xs text-gray-500">@{user.username}</p>
            </Link>

            <button
              onClick={() => setIsFollowing(!isFollowing)}
              className={
                isFollowing
                  ? "btn-secondary !px-3 !py-1.5 !text-xs"
                  : "btn-primary !px-3 !py-1.5 !text-xs"
              }
            >
              {isFollowing ? "A seguir" : "Seguir"}
            </button>
          </div>

          {user.bio && (
            <p className="mt-1 text-sm text-gray-600 line-clamp-2">
              {user.bio}
            </p>
          )}

          <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
            <span>
              <strong className="text-gray-900">{user.followers_count}</strong>{" "}
              seguidores
            </span>
            <span>
              <strong className="text-gray-900">{user.following_count}</strong>{" "}
              a seguir
            </span>
          </div>

          {user.current_veu && (
            <div className="mt-2">
              <VeuBadge veu={user.current_veu} showNumber />
            </div>
          )}

          {showProgress && (
            <div className="mt-3">
              <VeuProgress
                completed={user.veus_completed}
                current={user.current_veu}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
