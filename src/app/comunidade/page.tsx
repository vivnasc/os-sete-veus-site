"use client";

import { useState } from "react";
import { MOCK_PROFILES, MOCK_FOLLOWING } from "@/lib/mock-data";
import { VEUS, type VeuType } from "@/types/database";
import BottomNav from "@/components/BottomNav";
import UserCard from "@/components/UserCard";

type Tab = "descobrir" | "seguidores" | "a-seguir";

export default function ComunidadePage() {
  const [tab, setTab] = useState<Tab>("descobrir");
  const [search, setSearch] = useState("");
  const [filterVeu, setFilterVeu] = useState<VeuType | "all">("all");

  // Skip the first profile (current user) for display
  const otherUsers = MOCK_PROFILES.slice(1);

  const filteredUsers = otherUsers.filter((user) => {
    const matchesSearch =
      search === "" ||
      user.display_name.toLowerCase().includes(search.toLowerCase()) ||
      user.username.toLowerCase().includes(search.toLowerCase());

    const matchesVeu =
      filterVeu === "all" || user.current_veu === filterVeu;

    const matchesTab =
      tab === "descobrir" ||
      (tab === "a-seguir" && MOCK_FOLLOWING.has(user.id)) ||
      (tab === "seguidores" && true); // Mock: show all as followers

    return matchesSearch && matchesVeu && matchesTab;
  });

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur-lg">
        <div className="mx-auto max-w-lg px-4 py-3">
          <h1 className="text-xl font-bold text-gray-900">Comunidade</h1>

          {/* Search */}
          <div className="relative mt-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
            >
              <path
                fillRule="evenodd"
                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Procurar pessoas..."
              className="input-field !pl-9"
            />
          </div>

          {/* Tabs */}
          <div className="mt-3 flex rounded-xl bg-gray-100 p-1">
            {(
              [
                { id: "descobrir", label: "Descobrir" },
                { id: "seguidores", label: "Seguidores" },
                { id: "a-seguir", label: "A seguir" },
              ] as const
            ).map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex-1 rounded-lg py-1.5 text-xs font-medium transition-all ${
                  tab === t.id
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Veu Filter */}
          <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1">
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
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              isFollowing={MOCK_FOLLOWING.has(user.id)}
              showProgress
            />
          ))
        ) : (
          <div className="py-12 text-center">
            <p className="text-4xl">🔍</p>
            <p className="mt-2 text-sm text-gray-500">
              Nenhum utilizador encontrado.
            </p>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
