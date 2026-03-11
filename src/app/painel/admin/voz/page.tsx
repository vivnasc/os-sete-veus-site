"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PainelAdminVozRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin/voz");
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-brown-200 border-t-sage" />
    </div>
  );
}
