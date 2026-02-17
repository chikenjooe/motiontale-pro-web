"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useStaticAuth } from "@/lib/staticAuth";

const useStatic = process.env.NEXT_PUBLIC_STATIC_AUTH === "true";

function Button({
  children,
  onClick,
  href,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
}) {
  const cls =
    "inline-flex items-center justify-center rounded-full bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/90";

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={cls} type="button">
      {children}
    </button>
  );
}

export function NavBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[#f6f6f8]/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[#ff3333] text-xs font-bold text-white">
            M
          </span>
          Motiontale <span className="text-black/50">Pro</span>
        </Link>

        <div className="flex items-center gap-2">
          {useStatic ? <StaticAuthButton /> : <NextAuthButton />}
        </div>
      </div>
    </header>
  );
}

function NextAuthButton() {
  const { status } = useSession();
  if (status === "authenticated") {
    return <Button onClick={() => signOut({ callbackUrl: "/" })}>Logout</Button>;
  }
  return <Button href="/login">Login</Button>;
}

function StaticAuthButton() {
  const { status, logout } = useStaticAuth();
  if (status === "authenticated") return <Button onClick={logout}>Logout</Button>;
  return <Button href="/login">Login</Button>;
}
