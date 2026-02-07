"use client";

import Link from "next/link";
import Image from "next/image";
import { experiences, quizVeilToExperience, PRICING } from "@/data/experiences";

type Props = {
  completedVeilSlug: string;
};

export default function CeremonyUpsell({ completedVeilSlug }: Props) {
  // Try to get quiz result from localStorage for personalized recommendation
  let recommendedSlug: string | null = null;

  if (typeof window !== "undefined") {
    try {
      const quizResult = localStorage.getItem("quiz-primary-veil");
      const quizSecond = localStorage.getItem("quiz-second-veil");

      // Recommend the second veil if the primary was just completed
      if (quizResult !== null) {
        const primarySlug = quizVeilToExperience[parseInt(quizResult)];
        if (primarySlug === completedVeilSlug && quizSecond !== null) {
          recommendedSlug = quizVeilToExperience[parseInt(quizSecond)];
        } else if (primarySlug !== completedVeilSlug) {
          recommendedSlug = primarySlug;
        }
      }
    } catch {
      // localStorage not available
    }
  }

  // Fallback: recommend next experience in sequence
  if (!recommendedSlug) {
    const currentExp = experiences.find((e) => e.slug === completedVeilSlug);
    if (currentExp) {
      const nextExp = experiences.find(
        (e) => e.number === currentExp.number + 1
      );
      if (nextExp) recommendedSlug = nextExp.slug;
    }
  }

  const recommended = recommendedSlug
    ? experiences.find((e) => e.slug === recommendedSlug)
    : null;

  if (!recommended) return null;

  const completedCount = 1; // In a real implementation, fetch from Supabase
  const upgradePrice = Math.max(
    0,
    PRICING.journey.usd - completedCount * PRICING.individual.usd
  );

  return (
    <div className="space-y-4">
      {/* Next veil recommendation */}
      <div
        className="overflow-hidden rounded-2xl border shadow-sm"
        style={{ borderColor: recommended.color + "40" }}
      >
        <div
          className="px-6 py-4"
          style={{ backgroundColor: recommended.color + "10" }}
        >
          <p
            className="font-sans text-[0.6rem] uppercase tracking-[0.25em]"
            style={{ color: recommended.color }}
          >
            O quiz também detectou em ti
          </p>
          <h3 className="mt-1 font-serif text-xl text-brown-900">
            {recommended.title}
          </h3>
          <p className="mt-1 font-serif text-sm italic text-brown-500">
            {recommended.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-4 bg-white px-6 py-5">
          <Image
            src={recommended.image}
            alt={recommended.title}
            width={80}
            height={120}
            className="shrink-0 rounded-lg shadow-md"
          />
          <div className="flex-1">
            <p className="text-sm leading-relaxed text-brown-600">
              {recommended.description}
            </p>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              {recommended.status === "available" ? (
                <Link
                  href={`/experiencias/${recommended.slug}`}
                  className="rounded-full px-5 py-2 text-center font-sans text-[0.65rem] uppercase tracking-[0.12em] text-white transition-colors hover:opacity-90"
                  style={{ backgroundColor: recommended.color }}
                >
                  Continuar — ${recommended.priceUSD}
                </Link>
              ) : (
                <span
                  className="rounded-full border px-5 py-2 text-center font-sans text-[0.65rem] uppercase tracking-[0.12em]"
                  style={{
                    borderColor: recommended.color + "40",
                    color: recommended.color,
                  }}
                >
                  Disponível em {recommended.launchLabel}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bundle upsell */}
      <div className="rounded-2xl border border-sage/30 bg-sage/5 px-6 py-5 text-center">
        <p className="font-serif text-base text-brown-800">
          Ou desbloqueia todas as experiências
        </p>
        <p className="mt-1 text-sm text-brown-500">
          Upgrade para a Jornada Completa — o valor já pago é descontado
        </p>
        <Link
          href="/experiencias#precos"
          className="mt-3 inline-block rounded-full bg-sage px-6 py-2.5 font-sans text-[0.65rem] uppercase tracking-[0.12em] text-white transition-colors hover:bg-sage-dark"
        >
          Jornada Completa — ${upgradePrice}
        </Link>
      </div>
    </div>
  );
}
