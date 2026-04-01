"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

/**
 * Requires authentication to use the app.
 * Public routes (login, register, share pages) are exempt.
 * Music is free but you need an account to listen.
 *
 * Also syncs the Supabase access token to a cookie so that
 * <audio> elements (which can't send custom headers) can
 * authenticate with the stream proxy.
 */

const PUBLIC_ROUTES = ["/login", "/registar", "/partilha", "/o/", "/apoiar"];

function syncTokenCookie(accessToken: string | null) {
  if (accessToken) {
    document.cookie = `veus-token=${accessToken}; path=/; max-age=3600; SameSite=Lax`;
  } else {
    document.cookie = "veus-token=; path=/; max-age=0; SameSite=Lax";
  }
}

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [authed, setAuthed] = useState(false);

  const isPublic = PUBLIC_ROUTES.some(r => pathname.startsWith(r));

  useEffect(() => {
    if (isPublic) {
      setChecked(true);
      setAuthed(true);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) {
        setAuthed(true);
        syncTokenCookie(data.session.access_token);
      } else {
        syncTokenCookie(null);
        router.replace("/login");
      }
      setChecked(true);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      syncTokenCookie(session?.access_token || null);
      if (session?.user) {
        setAuthed(true);
      } else if (!isPublic) {
        router.replace("/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [pathname, isPublic, router]);

  if (!checked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0D0D1A]">
        <div className="w-6 h-6 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!authed && !isPublic) return null;

  return <>{children}</>;
}
