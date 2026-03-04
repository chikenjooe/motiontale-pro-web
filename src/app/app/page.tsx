"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { UploadPanel } from "@/components/UploadPanel";
import { useSupabaseAuth } from "@/lib/supabaseAuth";

function Badge() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-medium text-black/70">
      <span className="h-1.5 w-1.5 rounded-full bg-[#ff3333]" />
      Waitlist
    </div>
  );
}

export default function AppPage() {
  const { status, user } = useSupabaseAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  if (status !== "authenticated") {
    return <div className="mx-auto max-w-6xl px-4 py-14 text-sm text-black/55">Loading…</div>;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <div className="grid gap-10 md:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Badge />
          <h1 className="mt-5 text-4xl font-semibold tracking-tight">Спасибо за регистрацию</h1>
          <p className="mt-3 max-w-xl text-sm text-black/60">
            Вы попали в список ожидания — мы обязательно вам напишем, когда продукт запустится.
          </p>

          <div className="mt-6 rounded-3xl border border-black/10 bg-white p-5 text-sm text-black/65 shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
            Signed in as <span className="font-medium text-black">{user?.email}</span>
          </div>
        </div>

        <div>
          <UploadPanel ctaLabel="Request access" ctaHref="/login" disabled ctaDisabled />
        </div>
      </div>
    </div>
  );
}
