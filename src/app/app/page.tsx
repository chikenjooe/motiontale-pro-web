"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { UploadPanel } from "@/components/UploadPanel";
import { useStaticAuth } from "@/lib/staticAuth";

const useStatic = process.env.NEXT_PUBLIC_STATIC_AUTH === "true";

export default function AppPage() {
  return useStatic ? <StaticApp /> : <NextAuthApp />;
}

function NextAuthApp() {
  const { status, data } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  if (status !== "authenticated") {
    return <div className="mx-auto max-w-6xl px-4 py-14 text-sm text-white/60">Loading…</div>;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <div className="grid gap-10 md:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
            You’re whitelisted
          </div>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight">We added you to the whitelist</h1>
          <p className="mt-3 max-w-xl text-sm text-white/60">
            You can now access the generation flow. This build is UI-only: upload, prompt, and button states are
            ready — next step is wiring the backend.
          </p>

          <div className="mt-6 rounded-3xl border border-white/10 bg-black/25 p-5 text-sm text-white/70">
            Signed in as <span className="text-white">{data?.user?.email}</span>
          </div>
        </div>

        <div>
          <UploadPanel ctaLabel="Generate (coming soon)" ctaDisabled />
        </div>
      </div>
    </div>
  );
}

function StaticApp() {
  const { status, session } = useStaticAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  if (status !== "authenticated") {
    return <div className="mx-auto max-w-6xl px-4 py-14 text-sm text-white/60">Loading…</div>;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <div className="grid gap-10 md:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
            You’re whitelisted
          </div>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight">We added you to the whitelist</h1>
          <p className="mt-3 max-w-xl text-sm text-white/60">
            GitHub Pages mode: this is a static demo. Backend/auth are mocked client-side.
          </p>

          <div className="mt-6 rounded-3xl border border-white/10 bg-black/25 p-5 text-sm text-white/70">
            Signed in as <span className="text-white">{session?.email}</span>
          </div>
        </div>

        <div>
          <UploadPanel ctaLabel="Generate (coming soon)" ctaDisabled />
        </div>
      </div>
    </div>
  );
}
