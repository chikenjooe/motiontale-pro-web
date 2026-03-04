"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
  const { status } = useSupabaseAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  if (status !== "authenticated") {
    return <div className="mx-auto max-w-6xl px-4 py-14 text-sm text-black/55">Loading…</div>;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="mx-auto max-w-2xl rounded-3xl border border-black/10 bg-white p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
        <Badge />
        <h1 className="mt-5 text-4xl font-semibold tracking-tight">Спасибо за регистрацию</h1>
        <p className="mt-3 text-sm text-black/60">
          Вы попали в список ожидания — мы обязательно вам напишем, когда продукт запустится.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-black/90"
          >
            На главную
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white px-5 py-2.5 text-sm font-medium text-black/80 hover:bg-black/5"
          >
            Смотреть примеры
          </Link>
        </div>
      </div>
    </div>
  );
}
