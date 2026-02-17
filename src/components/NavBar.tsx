"use client";

import Link from "next/link";
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

export function NavBar() {
  const { status, signOut } = useSupabaseAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[#f6f6f8]/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[#ff3333] text-xs font-bold text-white">
            M
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
          {status === "authenticated" ? (
            <>
              <Button href="/app" variant="ghost">
                App
              </Button>
              <Button onClick={() => signOut()}>Logout</Button>
            </>
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
