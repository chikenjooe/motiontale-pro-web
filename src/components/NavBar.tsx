"use client";

import Link from "next/link";
import Image from "next/image";
import { useSupabaseAuth } from "@/lib/supabaseAuth";

function Button({
  children,
  onClick,
  href,
  variant = "black",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "black" | "ghost";
}) {
  const base = "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition";
  const styles =
    variant === "black"
      ? "bg-black text-white hover:bg-black/90"
      : "border border-black/10 bg-white text-black/80 hover:bg-black/5";

  if (href) {
    return (
      <Link href={href} className={`${base} ${styles}`}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={`${base} ${styles}`} type="button">
      {children}
    </button>
  );
}

function Avatar({ url, email }: { url?: string | null; email?: string | null }) {
  const initial = (email || "?").trim().slice(0, 1).toUpperCase();
  if (url) {
    return (
      <span className="inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-black/10 bg-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={url} alt={email ?? "User"} className="h-full w-full object-cover" />
      </span>
    );
  }
  return (
    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white text-sm font-semibold text-black/70">
      {initial}
    </span>
  );
}

function UserHoverMenu() {
  const { user, signOut } = useSupabaseAuth();
  const avatarUrl = (user?.user_metadata as any)?.avatar_url || (user?.user_metadata as any)?.picture || null;
  const email = user?.email ?? null;

  return (
    <div className="group relative">
      <div className="cursor-pointer">
        <Avatar url={avatarUrl} email={email} />
      </div>

      <div className="invisible absolute right-0 top-11 z-50 w-[320px] rounded-3xl border border-black/10 bg-white p-4 shadow-[0_10px_40px_rgba(0,0,0,0.08)] opacity-0 transition group-hover:visible group-hover:opacity-100">
        <div className="flex items-center gap-3">
          <Avatar url={avatarUrl} email={email} />
          <div className="min-w-0">
            <div className="text-sm font-semibold tracking-tight">Signed in</div>
            <div className="truncate text-xs text-black/55">{email}</div>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-black/10 bg-[#f6f6f8] p-3">
          <div className="text-[11px] font-semibold tracking-[0.12em] text-black/35">GENERATION HISTORY</div>
          <div className="mt-2 text-sm text-black/60">No generations yet.</div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <Link
            href="/app"
            className="inline-flex flex-1 items-center justify-center rounded-2xl border border-black/10 bg-white px-4 py-2.5 text-sm font-medium text-black/80 hover:bg-black/5"
          >
            Dashboard
          </Link>
          <button
            type="button"
            onClick={() => signOut()}
            className="inline-flex flex-1 items-center justify-center rounded-2xl bg-black px-4 py-2.5 text-sm font-medium text-white hover:bg-black/90"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export function NavBar() {
  const { status, user } = useSupabaseAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[#f6f6f8]/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg overflow-hidden bg-white border border-black/10">
            <Image src="/brand/logo.png" alt="Motiontale Pro" width={28} height={28} priority />
          </span>
          Motiontale <span className="text-black/50">Pro</span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          <Button href="/pricing" variant="ghost">
            Pricing
          </Button>
          <Button href="#examples" variant="ghost">
            Examples
          </Button>
        </nav>

        <div className="flex items-center gap-2">
          {status === "authenticated" && user ? (
            <UserHoverMenu />
          ) : (
            <>
              <Button href="/login" variant="ghost">
                Login
              </Button>
              <Button href="/login">Get access</Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
