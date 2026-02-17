"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useStaticAuth } from "@/lib/staticAuth";

const useStatic = process.env.NEXT_PUBLIC_STATIC_AUTH === "true";

export function NavBar() {
  return useStatic ? <StaticNav /> : <NextAuthNav />;
}

function NextAuthNav() {
  const { status } = useSession();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-semibold tracking-tight">
          Motiontale <span className="text-white/70">Pro</span>
        </Link>
        <div className="flex items-center gap-2">
          {status === "authenticated" ? (
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

function StaticNav() {
  const { status, logout } = useStaticAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-semibold tracking-tight">
          Motiontale <span className="text-white/70">Pro</span>
        </Link>
        <div className="flex items-center gap-2">
          {status === "authenticated" ? (
            <button
              onClick={() => logout()}
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
