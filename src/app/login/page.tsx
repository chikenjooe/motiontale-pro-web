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

function GoogleGIcon({ className }: { className?: string }) {
  // Official Google "G" colors (approx) as inline SVG.
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      className={className}
      width="18"
      height="18"
    >
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.01 1.53 7.39 2.81l5.43-5.43C33.46 3.85 29.08 1.5 24 1.5 14.72 1.5 6.88 6.82 3.05 14.56l6.33 4.91C11.11 13.89 17.09 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.5 24c0-1.57-.14-3.07-.41-4.5H24v9h12.65c-.55 2.96-2.2 5.47-4.67 7.15l7.18 5.57C43.33 37.36 46.5 31.17 46.5 24z"
      />
      <path
        fill="#FBBC05"
        d="M9.38 28.53A14.5 14.5 0 0 1 8.5 24c0-1.57.28-3.09.78-4.53l-6.33-4.91A22.47 22.47 0 0 0 1.5 24c0 3.63.87 7.07 2.45 10.09l5.43-5.56z"
      />
      <path
        fill="#34A853"
        d="M24 46.5c6.08 0 11.18-2.01 14.9-5.47l-7.18-5.57c-2 1.34-4.56 2.13-7.72 2.13-6.9 0-12.76-4.66-14.85-10.96l-5.43 5.56C7.5 40.94 15.44 46.5 24 46.5z"
      />
      <path fill="none" d="M1.5 1.5h45v45h-45z" />
    </svg>
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
            <span className="inline-flex items-center justify-center gap-2">
              <GoogleGIcon />
              <span>Continue with Google</span>
            </span>
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
