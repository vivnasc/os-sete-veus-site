"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

const praticas = [
  {
    file: "/audios/01_PRODUTO 1 - AFIRMAÇÕES-DESPROGRAMAR O VÉU DA ILUSÃO.mp3",
    label: "Afirmações",
    subtitle: "Desprogramar o Véu da Ilusão",
    desc: "Reprograma as crenças que te mantêm presa ao véu. Ouve de manhã, quando o dia ainda é promessa.",
    color: "#c9b896",
    icon: "&#9788;",
  },
  {
    file: "/audios/02_PRODUTO 2 -LIMPEZA- Soltar o Véu da Ilusão.mp3",
    label: "Limpeza",
    subtitle: "Soltar o que já não te serve",
    desc: "Um exercício guiado para soltar padrões antigos. Quando sentires que carregas peso que não é teu.",
    color: "#7a8c6e",
    icon: "&#9672;",
  },
  {
    file: "/audios/03_PRODUTO 3 - ANTES DE DORMIR-O VÉU DA ILUSÃO.mp3",
    label: "Antes de Dormir",
    subtitle: "Suave e restaurador",
    desc: "Para ouvir à noite, quando o dia termina. Deixa o corpo pousar. Deixa a mente aquietar.",
    color: "#8a7b9c",
    icon: "&#9790;",
  },
  {
    file: "/audios/04_PRODUTO 4- ESCRITA GUIADA-O VÉU DA ILUSÃO.mp3",
    label: "Escrita Guiada",
    subtitle: "Explorar o véu com palavras",
    desc: "Pega num caderno e segue a voz. Escreve sem julgar, sem corrigir, sem pensar. Apenas deixa sair.",
    color: "#b07a7a",
    icon: "&#9998;",
  },
];

export default function PraticasPage() {
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.push("/entrar");
      }
    });
  }, [router]);

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <p className="font-sans text-[0.65rem] uppercase tracking-[0.25em] text-sage">
            Práticas em áudio
          </p>
          <h1 className="mt-3 font-serif text-3xl text-brown-900">
            Quatro rituais para o teu dia
          </h1>
          <p className="mx-auto mt-3 max-w-md font-serif text-base text-brown-500">
            Ouve quando sentires que é o momento. Sem pressa, sem regras. Apenas presença.
          </p>
        </div>

        <div className="mt-10 space-y-4">
          {praticas.map((p) => (
            <div
              key={p.label}
              className="overflow-hidden rounded-2xl border border-brown-100 bg-white shadow-sm"
            >
              <div className="flex items-start gap-4 p-5">
                {/* Icon */}
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg text-white"
                  style={{ backgroundColor: p.color }}
                  dangerouslySetInnerHTML={{ __html: p.icon }}
                />

                <div className="flex-1">
                  <h3 className="font-serif text-base text-brown-800">{p.label}</h3>
                  <p className="font-sans text-[0.65rem] uppercase tracking-[0.15em]" style={{ color: p.color }}>
                    {p.subtitle}
                  </p>
                  <p className="mt-2 font-serif text-sm leading-relaxed text-brown-500">
                    {p.desc}
                  </p>
                </div>
              </div>

              {/* Audio player */}
              <div className="border-t border-brown-50 px-5 py-4">
                <audio
                  controls
                  preload="metadata"
                  className="w-full"
                  style={{
                    height: "40px",
                    borderRadius: "9999px",
                  }}
                  src={p.file}
                >
                  O teu navegador não suporta o elemento de áudio.
                </audio>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
