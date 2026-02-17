"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [msg, setMsg] = useState("Finishing sign-in…");

  useEffect(() => {
    const run = async () => {
      try {
        if (!supabase) {
          setMsg("Auth is not configured.");
          return;
        }
        const url = new URL(window.location.href);
        const code = url.searchParams.get("code");
        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) {
            setMsg(`Sign-in failed: ${error.message}`);
            return;
          }
        }
        router.replace("/app");
      } catch {
        setMsg("Sign-in failed.");
      }
    };
    run();
  }, [router]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="mx-auto max-w-md rounded-3xl border border-black/10 bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
        <div className="text-sm font-semibold">Auth</div>
        <div className="mt-2 text-sm text-black/60">{msg}</div>
      </div>
    </div>
  );
}
