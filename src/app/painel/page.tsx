"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PainelPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/painel/marketing");
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-brown-200 border-t-sage" />
    </div>
  );
}
