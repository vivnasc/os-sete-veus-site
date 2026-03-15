"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { getAvailableNos } from "@/data/nos-collection";
import { ADMIN_EMAILS } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";

export default function NosIndexPage() {
  const { user, profile, loading } = useAuth();
  const router = useRouter();

  const isAdmin = profile?.is_admin || ADMIN_EMAILS.includes(user?.email || "");
  const hasMirrorsAccess = isAdmin || profile?.has_mirrors_access || false;

  useEffect(() => {
    if (!loading && !user) {
      router.push("/entrar");
    } else if (!loading && user && !hasMirrorsAccess) {
      router.push("/membro");
    }
  }, [user, loading, hasMirrorsAccess, router]);

  const availableNos = getAvailableNos();

  // If only one Nó available, redirect directly to it
  if (!loading && hasMirrorsAccess && availableNos.length === 1) {
    router.push(`/membro/nos/${availableNos[0].slug}`);
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-sage border-t-transparent" />
      </div>
    );
  }

  if (loading || !hasMirrorsAccess) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-sage border-t-transparent" />
      </div>
    );
  }

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/membro"
          className="inline-block font-sans text-[0.65rem] uppercase tracking-[0.15em] text-brown-400 hover:text-brown-600"
        >
          &larr; A tua experiência
        </Link>

        <div className="mb-10 mt-6 text-center">
          <p className="font-sans text-[0.6rem] uppercase tracking-[0.25em] text-[#c9a87c]">
            Colecção Nós
          </p>
          <h1 className="mt-3 font-serif text-4xl text-brown-900">Nós</h1>
          <p className="mt-2 font-serif text-lg italic text-brown-500">
            Ficção relacional — o que se passa entre duas pessoas quando um véu cai
          </p>
        </div>

        <div className="space-y-4">
          {availableNos.map((nos) => (
            <Link
              key={nos.slug}
              href={`/membro/nos/${nos.slug}`}
              className="group flex items-center gap-5 rounded-2xl border border-brown-100 bg-white p-5 shadow-sm transition-all hover:shadow-md"
            >
              <div className="shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={nos.image}
                  alt={nos.title}
                  width={80}
                  height={120}
                  className="rounded-lg transition-transform group-hover:scale-105"
                />
              </div>
              <div className="flex-1">
                <p className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-brown-400">
                  Livro {nos.number} · {nos.characters}
                </p>
                <h2 className="mt-1 font-serif text-xl text-brown-900">{nos.title}</h2>
                <p className="mt-1 font-serif text-sm italic text-brown-500">{nos.subtitle}</p>
              </div>
              <span className="font-sans text-xs text-brown-300 transition-colors group-hover:text-brown-500">
                Ler &rarr;
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
