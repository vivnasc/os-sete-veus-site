"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

const ADMIN_EMAILS = ["viv.saraiva@gmail.com"];

interface Member {
  id: string;
  email?: string;
  has_book_access: boolean;
  has_mirrors_access: boolean;
  has_audiobook_access: boolean;
  is_admin: boolean;
  created_at: string;
}

export default function AdminMembrosPage() {
  const { user, profile, loading: authLoading } = useAuth();
  const router = useRouter();
  const isAdmin = profile?.is_admin || ADMIN_EMAILS.includes(user?.email || "");

  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [grantEmail, setGrantEmail] = useState("");
  const [grantType, setGrantType] = useState("book");
  const [grantLoading, setGrantLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      router.push("/entrar");
    }
  }, [user, isAdmin, authLoading, router]);

  useEffect(() => {
    if (user && isAdmin) {
      loadMembers();
    }
  }, [user, isAdmin]);

  async function loadMembers() {
    setLoading(true);
    const { data, error } = await supabase
      .from("profiles")
      .select("id, email, has_book_access, has_mirrors_access, has_audiobook_access, is_admin, created_at")
      .order("created_at", { ascending: false })
      .limit(50);

    if (!error && data) {
      setMembers(data as Member[]);
    }
    setLoading(false);
  }

  async function handleGrantAccess(e: React.FormEvent) {
    e.preventDefault();
    if (!grantEmail.trim()) return;

    setGrantLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin/grant-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: grantEmail.trim().toLowerCase(),
          adminEmail: user?.email,
          accessType: grantType,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage("Erro: " + (data.error || "Erro desconhecido"));
      } else {
        setMessage(data.message);
        setGrantEmail("");
        loadMembers();
      }
    } catch {
      setMessage("Erro de ligação");
    }

    setGrantLoading(false);
  }

  if (authLoading || !user || !isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-sage border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="border-b border-sage/20 bg-white/50">
        <div className="mx-auto max-w-5xl px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-3xl text-forest">Membros</h1>
              <p className="mt-1 text-sage">Gerir acessos dos membros</p>
            </div>
            <Link
              href="/admin"
              className="text-sm text-sage hover:text-forest transition-colors"
            >
              Voltar ao painel
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-12">
        {/* Conceder acesso manualmente */}
        <div className="mb-10 rounded-lg border border-sage/20 bg-white/50 p-6">
          <h2 className="mb-4 font-display text-xl text-forest">
            Conceder acesso manualmente
          </h2>
          <p className="mb-4 text-sm text-sage">
            Usa isto para corrigir acessos ou dar acesso a alguem que teve problemas.
          </p>
          <form onSubmit={handleGrantAccess} className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <div className="flex-1">
              <label className="mb-1 block text-xs font-medium text-sage">
                Email do membro
              </label>
              <input
                type="email"
                required
                value={grantEmail}
                onChange={(e) => setGrantEmail(e.target.value)}
                placeholder="email@exemplo.com"
                className="w-full rounded-lg border border-sage/30 bg-white px-4 py-2.5 text-sm text-forest placeholder:text-sage/50 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/30"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-sage">
                Tipo de acesso
              </label>
              <select
                value={grantType}
                onChange={(e) => setGrantType(e.target.value)}
                className="rounded-lg border border-sage/30 bg-white px-4 py-2.5 text-sm text-forest focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/30"
              >
                <option value="book">Livro Filosofico</option>
                <option value="mirrors">Espelhos</option>
                <option value="audiobook">Audiobook</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={grantLoading}
              className="rounded-lg bg-sage px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-sage/80 disabled:opacity-50"
            >
              {grantLoading ? "A conceder..." : "Conceder acesso"}
            </button>
          </form>
          {message && (
            <p className={`mt-3 text-sm ${message.startsWith("Erro") ? "text-red-600" : "text-green-700"}`}>
              {message}
            </p>
          )}
        </div>

        {/* Lista de membros */}
        <h2 className="mb-4 font-display text-xl text-forest">
          Membros recentes
        </h2>
        {loading ? (
          <p className="text-sage">A carregar...</p>
        ) : members.length === 0 ? (
          <p className="text-sage">Nenhum membro encontrado.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-sage/20 bg-white/50">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-sage/10 bg-sage/5">
                <tr>
                  <th className="px-4 py-3 font-medium text-sage">Email</th>
                  <th className="px-4 py-3 font-medium text-sage">Livro</th>
                  <th className="px-4 py-3 font-medium text-sage">Espelhos</th>
                  <th className="px-4 py-3 font-medium text-sage">Audio</th>
                  <th className="px-4 py-3 font-medium text-sage">Admin</th>
                </tr>
              </thead>
              <tbody>
                {members.map((m) => (
                  <tr key={m.id} className="border-b border-sage/5 last:border-0">
                    <td className="px-4 py-3 text-forest">{m.email || m.id.slice(0, 8) + "..."}</td>
                    <td className="px-4 py-3">
                      <AccessBadge active={m.has_book_access} />
                    </td>
                    <td className="px-4 py-3">
                      <AccessBadge active={m.has_mirrors_access} />
                    </td>
                    <td className="px-4 py-3">
                      <AccessBadge active={m.has_audiobook_access} />
                    </td>
                    <td className="px-4 py-3">
                      <AccessBadge active={m.is_admin} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function AccessBadge({ active }: { active: boolean }) {
  return active ? (
    <span className="inline-block rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
      Sim
    </span>
  ) : (
    <span className="inline-block rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-400">
      --
    </span>
  );
}
