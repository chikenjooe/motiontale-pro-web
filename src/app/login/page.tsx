"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSupabaseAuth } from "@/lib/supabaseAuth";
import { getBasePath } from "@/lib/basePath";

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-md rounded-3xl border border-black/10 bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
      {children}
    </div>
  );
}

function Input({
  label,
  type,
  value,
  onChange,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <div className="mb-1 text-xs font-medium text-black/55">{label}</div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={type}
        className="w-full rounded-2xl border border-black/10 bg-[#f6f6f8] px-4 py-3 text-sm text-black outline-none focus:border-black/20"
      />
    </label>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const { signInWithPassword, signUpWithPassword, signInWithGoogle } = useSupabaseAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"login" | "signup">("login");

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <Card>
        <h1 className="text-2xl font-semibold tracking-tight">{mode === "login" ? "Login" : "Create account"}</h1>
        <p className="mt-2 text-sm text-black/60">
          Sign in with Google or use email + password.
        </p>

        <div className="mt-6 space-y-3">
          <button
            className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-medium text-black/85 hover:bg-black/5"
            onClick={async () => {
              setLoading(true);
              setError(null);
              const res = await signInWithGoogle();
              setLoading(false);
              if (!res.ok) setError(res.error ?? "Google sign-in failed");
              // Redirect happens via Supabase.
            }}
            disabled={loading}
            type="button"
          >
            Continue with Google
          </button>

          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-black/10" />
            <div className="text-xs text-black/40">or</div>
            <div className="h-px flex-1 bg-black/10" />
          </div>

          <Input label="Email" type="email" value={email} onChange={setEmail} />
          <Input label="Password" type="password" value={password} onChange={setPassword} />

          {error ? <div className="text-sm text-red-600">{error}</div> : null}

          <button
            className={`w-full rounded-2xl px-4 py-3 text-sm font-medium transition ${
              loading ? "bg-black/5 text-black/35" : "bg-[#ff3333] text-white hover:bg-[#ff1f1f]"
            }`}
            disabled={loading}
            onClick={async () => {
              setLoading(true);
              setError(null);
              const res =
                mode === "login"
                  ? await signInWithPassword(email, password)
                  : await signUpWithPassword(email, password);
              setLoading(false);
              if (!res.ok) {
                setError(res.error ?? "Auth failed");
                return;
              }
              router.push(`${getBasePath()}/app`);
            }}
            type="button"
          >
            {mode === "login" ? "Sign in" : "Sign up"}
          </button>

          <button
            type="button"
            className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-medium text-black/75 hover:bg-black/5"
            onClick={() => setMode((m) => (m === "login" ? "signup" : "login"))}
            disabled={loading}
          >
            {mode === "login" ? "Create an account" : "I already have an account"}
          </button>

          <div className="text-xs text-black/45">
            By continuing, you agree to our{" "}
            <Link className="underline" href="/terms-of-service">
              Terms
            </Link>{" "}
            and acknowledge our{" "}
            <Link className="underline" href="/privacy-policy">
              Privacy Policy
            </Link>.
          </div>
        </div>
      </Card>
    </div>
  );
}
