"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

type Profile = {
  id: string;
  email: string;
  is_admin: boolean;
  subscription_status: string;
  has_book_access: boolean;
  has_mirrors_access: boolean;
  has_audiobook_access: boolean;
  has_early_access?: boolean;
  purchased_products: Array<{
    type: string;
    date: string;
    code?: string;
  }>;
};

type AuthContextType = {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  signIn: async () => ({ error: null }),
  signOut: async () => {},
  refreshProfile: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Timeout de segurança: se o Supabase demorar >8s, desbloquear a app
    // NÃO limpar este timeout até loading ser false — previne loading infinito
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 8000);

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setUser(session?.user ?? null);

      if (session?.user) {
        try {
          await loadProfile(session.user.id);
        } catch {
          // Profile load failed - continue without profile
        }
      }

      clearTimeout(timeout);
      setLoading(false);
    }).catch(() => {
      clearTimeout(timeout);
      // Session check failed - resolve loading anyway
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);

      if (session?.user) {
        // Sinalizar loading durante sign-in para evitar flash de "sem acesso"
        if (event === "SIGNED_IN") {
          setLoading(true);
        }
        try {
          await loadProfile(session.user.id);
        } catch {
          // Profile load failed silently
        }
        if (event === "SIGNED_IN") {
          setLoading(false);
        }
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function loadProfile(_userId: string, retries = 3) {
    try {
      // Usar API server-side para contornar RLS na tabela profiles
      const res = await fetch("/api/profile/me", {
        method: "GET",
        credentials: "same-origin",
      });

      if (!res.ok) {
        if (retries > 0) {
          await new Promise(resolve => setTimeout(resolve, 1500));
          return loadProfile(_userId, retries - 1);
        }
        return;
      }

      const { profile: data } = await res.json();

      if (!data) {
        if (retries > 0) {
          await new Promise(resolve => setTimeout(resolve, 1500));
          return loadProfile(_userId, retries - 1);
        }
        return;
      }

      setProfile(data);
    } catch {
      if (retries > 0) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        return loadProfile(_userId, retries - 1);
      }
    }
  }

  async function refreshProfile() {
    const session = await supabase.auth.getSession();
    const userId = session.data.session?.user?.id;
    if (userId) {
      await loadProfile(userId, 3);
    }
  }

  async function signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (!error && data.user) {
      // Carregar perfil ANTES de retornar para evitar race condition
      // O redirect so acontece depois do perfil estar disponivel
      await loadProfile(data.user.id);
    }
    return { error: error?.message ?? null };
  }

  async function signOut() {
    setUser(null);
    setProfile(null);
    await supabase.auth.signOut();
  }

  return (
    <AuthContext.Provider value={{ user, profile, loading, signIn, signOut, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
