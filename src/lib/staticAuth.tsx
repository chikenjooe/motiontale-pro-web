"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

const KEY = "motiontale_session";

type Session = { email: string } | null;

type Ctx = {
  session: Session;
  status: "authenticated" | "unauthenticated";
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const StaticAuthContext = createContext<Ctx | null>(null);

function readInitial(): { session: Session; status: Ctx["status"] } {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return { session: null, status: "unauthenticated" };
    return { session: JSON.parse(raw) as Session, status: "authenticated" };
  } catch {
    return { session: null, status: "unauthenticated" };
  }
}

export function StaticAuthProvider({ children }: { children: React.ReactNode }) {
  const initial = readInitial();
  const [session, setSession] = useState<Session>(initial.session);
  const [status, setStatus] = useState<Ctx["status"]>(initial.status);

  const value = useMemo<Ctx>(() => {
    return {
      session,
      status,
      async login(email, password) {
        // Demo-only.
        const ok = email.toLowerCase().trim() === "boss@motiontale.pro" && password === "motiontale";
        if (!ok) return false;
        const next = { email: "boss@motiontale.pro" };
        setSession(next);
        setStatus("authenticated");
        window.localStorage.setItem(KEY, JSON.stringify(next));
        return true;
      },
      logout() {
        setSession(null);
        setStatus("unauthenticated");
        window.localStorage.removeItem(KEY);
      },
    };
  }, [session, status]);

  return <StaticAuthContext.Provider value={value}>{children}</StaticAuthContext.Provider>;
}

export function useStaticAuth() {
  const ctx = useContext(StaticAuthContext);
  if (!ctx) throw new Error("useStaticAuth must be used within StaticAuthProvider");
  return ctx;
}
