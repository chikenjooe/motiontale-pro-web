"use client";

import { SessionProvider } from "next-auth/react";
import { StaticAuthProvider } from "@/lib/staticAuth";

const useStatic = process.env.NEXT_PUBLIC_STATIC_AUTH === "true";

export function Providers({ children }: { children: React.ReactNode }) {
  if (useStatic) return <StaticAuthProvider>{children}</StaticAuthProvider>;
  return <SessionProvider>{children}</SessionProvider>;
}
