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
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  signIn: async () => ({ error: null }),
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Timeout de segurança: se o Supabase demorar >5s, desbloquear a app
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 5000);

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      clearTimeout(timeout);
      setUser(session?.user ?? null);

      if (session?.user) {
        try {
          await loadProfile(session.user.id);
        } catch {
          // Profile load failed - continue without profile
        }
      }

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

  async function loadProfile(userId: string, retries = 2) {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error || !data) {
      if (retries > 0) {
        // Perfil pode nao estar disponivel imediatamente apos criacao
        await new Promise(resolve => setTimeout(resolve, 1000));
        return loadProfile(userId, retries - 1);
      }
      console.error("[AuthProvider] Error loading profile:", error);
      return;
    }

    setProfile(data);
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
    <AuthContext.Provider value={{ user, profile, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
