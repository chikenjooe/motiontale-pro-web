"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { UploadPanel } from "@/components/UploadPanel";
import { useStaticAuth } from "@/lib/staticAuth";

const useStatic = process.env.NEXT_PUBLIC_STATIC_AUTH === "true";

function Badge() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-600/20 bg-emerald-600/10 px-3 py-1 text-xs font-medium text-emerald-700">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
      You’re whitelisted
    </div>
  );
}

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
    return <div className="mx-auto max-w-6xl px-4 py-14 text-sm text-black/55">Loading…</div>;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <div className="grid gap-10 md:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Badge />
          <h1 className="mt-5 text-4xl font-semibold tracking-tight">We added you to the whitelist</h1>
          <p className="mt-3 max-w-xl text-sm text-black/60">
            This is a demo UI. Next step: connect the generation backend.
          </p>

          <div className="mt-6 rounded-3xl border border-black/10 bg-white p-5 text-sm text-black/65 shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
            Signed in as <span className="font-medium text-black">{data?.user?.email}</span>
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
    return <div className="mx-auto max-w-6xl px-4 py-14 text-sm text-black/55">Loading…</div>;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <div className="grid gap-10 md:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Badge />
          <h1 className="mt-5 text-4xl font-semibold tracking-tight">We added you to the whitelist</h1>
          <p className="mt-3 max-w-xl text-sm text-black/60">
            GitHub Pages mode: static demo. Auth is mocked client-side.
          </p>

          <div className="mt-6 rounded-3xl border border-black/10 bg-white p-5 text-sm text-black/65 shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
            Signed in as <span className="font-medium text-black">{session?.email}</span>
          </div>
        </div>

        <div>
          <UploadPanel ctaLabel="Generate (coming soon)" ctaDisabled />
        </div>
      </div>
    </div>
  );
}
