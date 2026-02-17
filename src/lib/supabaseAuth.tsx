"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";

type Ctx = {
  session: Session | null;
  user: User | null;
  status: "loading" | "authenticated" | "unauthenticated";
  signInWithPassword: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  signUpWithPassword: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  signInWithGoogle: () => Promise<{ ok: boolean; error?: string }>;
  signOut: () => Promise<void>;
  isConfigured: boolean;
};

const SupabaseAuthContext = createContext<Ctx | null>(null);

export function SupabaseAuthProvider({ children }: { children: React.ReactNode }) {
  const isConfigured = !!supabase;
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<Ctx["status"]>(isConfigured ? "loading" : "unauthenticated");

  useEffect(() => {
    const sb = supabase;
    if (!sb) return;

    let mounted = true;

    const init = async () => {
      const { data, error } = await sb.auth.getSession();
      if (!mounted) return;
      if (error) {
        setSession(null);
        setUser(null);
        setStatus("unauthenticated");
        return;
      }
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setStatus(data.session ? "authenticated" : "unauthenticated");
    };

    init();

    const { data: sub } = sb.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setUser(nextSession?.user ?? null);
      setStatus(nextSession ? "authenticated" : "unauthenticated");
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<Ctx>(() => {
    return {
      session,
      user,
      status,
      isConfigured,
      async signInWithPassword(email, password) {
        if (!supabase) return { ok: false, error: "Supabase is not configured" };
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        return error ? { ok: false, error: error.message } : { ok: true };
      },
      async signUpWithPassword(email, password) {
        if (!supabase) return { ok: false, error: "Supabase is not configured" };
        const { error } = await supabase.auth.signUp({ email, password });
        return error ? { ok: false, error: error.message } : { ok: true };
      },
      async signInWithGoogle() {
        if (!supabase) return { ok: false, error: "Supabase is not configured" };
        const redirectTo = `${window.location.origin}/auth/callback`;
        const { error } = await supabase.auth.signInWithOAuth({
          provider: "google",
          options: { redirectTo },
        });
        return error ? { ok: false, error: error.message } : { ok: true };
      },
      async signOut() {
        if (!supabase) return;
        await supabase.auth.signOut();
      },
    };
  }, [session, status, user, isConfigured]);

  return <SupabaseAuthContext.Provider value={value}>{children}</SupabaseAuthContext.Provider>;
}

export function useSupabaseAuth() {
  const ctx = useContext(SupabaseAuthContext);
  if (!ctx) throw new Error("useSupabaseAuth must be used within SupabaseAuthProvider");
  return ctx;
}
