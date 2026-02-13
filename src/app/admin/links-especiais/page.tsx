"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

const ADMIN_EMAIL = "viv.saraiva@gmail.com";

interface SpecialLink {
  id: string;
  code: string;
  access_type_code: string;
  is_active: boolean;
  is_used: boolean;
  max_uses: number;
  current_uses: number;
  expires_at: string | null;
  notes: string | null;
  created_at: string;
}

export default function LinksEspeciaisPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [links, setLinks] = useState<SpecialLink[]>([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [notes, setNotes] = useState("");
  const [maxUses, setMaxUses] = useState(1);
  const [expiresInDays, setExpiresInDays] = useState(0);
  const [creating, setCreating] = useState(false);
  const [newLink, setNewLink] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && (!user || user.email !== ADMIN_EMAIL)) {
      router.push("/entrar");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user && user.email === ADMIN_EMAIL) {
      loadLinks();
    }
  }, [user]);

  async function loadLinks() {
    setLoading(true);

    const { data, error } = await supabase
      .from("special_links")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading links:", error);
    } else {
      setLinks(data || []);
    }

    setLoading(false);
  }

  async function handleCreateLink() {
    setCreating(true);
    setNewLink(null);

    try {
      const response = await fetch("/api/special-link/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_type_code: "livro-fisico",
          max_uses: maxUses,
          expires_in_days: expiresInDays > 0 ? expiresInDays : null,
          notes,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setNewLink(data.link);
        setNotes("");
        setMaxUses(1);
        setExpiresInDays(0);
        loadLinks();
      } else {
        alert(data.error || "Erro ao criar link");
      }
    } catch {
      alert("Erro de conexão");
    }

    setCreating(false);
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    alert("Link copiado!");
  }

  if (authLoading || !user || user.email !== ADMIN_EMAIL) {
    return null;
  }

  return (
    <section className="min-h-screen bg-cream px-6 py-12">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/admin"
            className="mb-4 inline-flex items-center gap-2 text-sm text-brown-600 hover:text-brown-900"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            Voltar ao painel
          </Link>
          <h1 className="font-serif text-4xl text-brown-900">
            Links Especiais
          </h1>
          <p className="mt-2 text-brown-600">
            Criar links de acesso para livro físico
          </p>
        </div>

        {/* Create Link Form */}
        <div className="mb-8 rounded-lg border-2 border-sage/20 bg-white p-8">
          <h2 className="mb-6 font-serif text-2xl text-brown-900">
            Criar Novo Link
          </h2>

          <div className="space-y-5">
            <div>
              <label
                htmlFor="notes"
                className="font-sans text-sm font-medium text-brown-700"
              >
                Notas (opcional)
              </label>
              <input
                id="notes"
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ex: João Silva - compra 15/02"
                className="mt-1 w-full rounded-lg border border-brown-100 bg-white px-4 py-3 font-sans text-sm text-brown-900 placeholder:text-brown-300 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/30"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="max-uses"
                  className="font-sans text-sm font-medium text-brown-700"
                >
                  Máximo de usos
                </label>
                <input
                  id="max-uses"
                  type="number"
                  min="1"
                  value={maxUses}
                  onChange={(e) => setMaxUses(parseInt(e.target.value) || 1)}
                  className="mt-1 w-full rounded-lg border border-brown-100 bg-white px-4 py-3 font-sans text-sm text-brown-900 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/30"
                />
              </div>

              <div>
                <label
                  htmlFor="expires"
                  className="font-sans text-sm font-medium text-brown-700"
                >
                  Expira em (dias, 0 = nunca)
                </label>
                <input
                  id="expires"
                  type="number"
                  min="0"
                  value={expiresInDays}
                  onChange={(e) =>
                    setExpiresInDays(parseInt(e.target.value) || 0)
                  }
                  className="mt-1 w-full rounded-lg border border-brown-100 bg-white px-4 py-3 font-sans text-sm text-brown-900 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/30"
                />
              </div>
            </div>

            <button
              onClick={handleCreateLink}
              disabled={creating}
              className={`w-full rounded-lg bg-sage px-8 py-3.5 font-sans text-sm font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-sage-dark ${creating ? "opacity-60" : ""}`}
            >
              {creating ? "A criar..." : "Criar Link Especial"}
            </button>

            {newLink && (
              <div className="rounded-lg border border-green-200 bg-green-50 p-6">
                <p className="mb-3 font-sans text-sm font-medium text-green-900">
                  ✓ Link criado com sucesso!
                </p>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={newLink}
                    className="flex-1 rounded-lg border border-green-200 bg-white px-4 py-2 font-mono text-sm text-green-900"
                  />
                  <button
                    onClick={() => copyToClipboard(newLink)}
                    className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                  >
                    Copiar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Links List */}
        <div className="rounded-lg border border-brown-100 bg-white">
          <div className="border-b border-brown-100 p-6">
            <h2 className="font-serif text-xl text-brown-900">
              Links Criados ({links.length})
            </h2>
          </div>

          {loading ? (
            <div className="p-12 text-center text-brown-500">
              A carregar...
            </div>
          ) : links.length === 0 ? (
            <div className="p-12 text-center text-brown-500">
              Nenhum link criado ainda
            </div>
          ) : (
            <div className="divide-y divide-brown-100">
              {links.map((link) => {
                const baseUrl =
                  typeof window !== "undefined"
                    ? window.location.origin
                    : "https://seteecos.com";
                const fullLink = `${baseUrl}/registar-livro?code=${link.code}`;
                const isExpired =
                  link.expires_at && new Date(link.expires_at) < new Date();

                return (
                  <div key={link.id} className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <code className="rounded bg-brown-50 px-3 py-1 font-mono text-sm text-brown-900">
                            {link.code}
                          </code>
                          {!link.is_active && (
                            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                              Inativo
                            </span>
                          )}
                          {link.is_used && (
                            <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">
                              Usado
                            </span>
                          )}
                          {isExpired && (
                            <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-700">
                              Expirado
                            </span>
                          )}
                        </div>

                        {link.notes && (
                          <p className="mt-2 text-sm text-brown-600">
                            {link.notes}
                          </p>
                        )}

                        <div className="mt-3 flex flex-wrap gap-4 text-xs text-brown-400">
                          <div>
                            Usos: {link.current_uses}/{link.max_uses}
                          </div>
                          {link.expires_at && (
                            <div>
                              Expira:{" "}
                              {new Date(link.expires_at).toLocaleDateString(
                                "pt-PT"
                              )}
                            </div>
                          )}
                          <div>
                            Criado:{" "}
                            {new Date(link.created_at).toLocaleDateString(
                              "pt-PT"
                            )}
                          </div>
                        </div>

                        <div className="mt-3 flex items-center gap-2">
                          <input
                            type="text"
                            readOnly
                            value={fullLink}
                            className="flex-1 rounded border border-brown-100 bg-brown-50 px-3 py-1.5 font-mono text-xs text-brown-700"
                          />
                          <button
                            onClick={() => copyToClipboard(fullLink)}
                            className="rounded bg-sage px-3 py-1.5 text-xs font-medium text-white hover:bg-sage-dark"
                          >
                            Copiar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
