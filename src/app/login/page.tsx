"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useStaticAuth } from "@/lib/staticAuth";

const useStatic = process.env.NEXT_PUBLIC_STATIC_AUTH === "true";

export default function LoginPage() {
  return useStatic ? <StaticLogin /> : <NextAuthLogin />;
}

function NextAuthLogin() {
  const router = useRouter();
  const callbackUrl = "/app";

  const [email, setEmail] = useState("boss@motiontale.pro");
  const [password, setPassword] = useState("motiontale");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-black/25 p-6">
        <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
        <p className="mt-2 text-sm text-white/60">Demo credentials are prefilled.</p>

        <div className="mt-6 space-y-3">
          <label className="block">
            <div className="mb-1 text-xs text-white/55">Email</div>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-white/20"
            />
          </label>
          <label className="block">
            <div className="mb-1 text-xs text-white/55">Password</div>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-white/20"
            />
          </label>

          {error ? <div className="text-sm text-red-300">{error}</div> : null}

          <button
            className={`w-full rounded-2xl px-4 py-3 text-sm font-medium transition ${
              loading ? "bg-white/10 text-white/40" : "bg-white text-black hover:bg-white/90"
            }`}
            disabled={loading}
            onClick={async () => {
              setLoading(true);
              setError(null);
              const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
                callbackUrl,
              });
              setLoading(false);
              if (!res || res.error) {
                setError("Invalid credentials.");
                return;
              }
              router.push(res.url ?? "/app");
            }}
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>

          <div className="text-xs text-white/45">
            Credentials: <span className="text-white/70">boss@motiontale.pro</span> /{" "}
            <span className="text-white/70">motiontale</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function StaticLogin() {
  const { login } = useStaticAuth();
  const router = useRouter();

  const [email, setEmail] = useState("boss@motiontale.pro");
  const [password, setPassword] = useState("motiontale");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-black/25 p-6">
        <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
        <p className="mt-2 text-sm text-white/60">GitHub Pages mode: client-side demo login.</p>

        <div className="mt-6 space-y-3">
          <label className="block">
            <div className="mb-1 text-xs text-white/55">Email</div>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-white/20"
            />
          </label>
          <label className="block">
            <div className="mb-1 text-xs text-white/55">Password</div>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-white/20"
            />
          </label>

          {error ? <div className="text-sm text-red-300">{error}</div> : null}

          <button
            className={`w-full rounded-2xl px-4 py-3 text-sm font-medium transition ${
              loading ? "bg-white/10 text-white/40" : "bg-white text-black hover:bg-white/90"
            }`}
            disabled={loading}
            onClick={async () => {
              setLoading(true);
              setError(null);
              const ok = await login(email, password);
              setLoading(false);
              if (!ok) {
                setError("Invalid credentials.");
                return;
              }
              router.push("/app");
            }}
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>

          <div className="text-xs text-white/45">
            Credentials: <span className="text-white/70">boss@motiontale.pro</span> /{" "}
            <span className="text-white/70">motiontale</span>
          </div>
        </div>
      </div>
    </div>
  );
}
