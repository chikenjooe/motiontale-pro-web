"use client";

import { SupabaseAuthProvider } from "@/lib/supabaseAuth";

export function Providers({ children }: { children: React.ReactNode }) {
  return <SupabaseAuthProvider>{children}</SupabaseAuthProvider>;
}
