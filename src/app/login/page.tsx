"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useStaticAuth } from "@/lib/staticAuth";

const useStatic = process.env.NEXT_PUBLIC_STATIC_AUTH === "true";

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
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      {useStatic ? <StaticLogin /> : <NextAuthLogin />}
    </div>
  );
}

function NextAuthLogin() {
  const router = useRouter();
  const callbackUrl = "/app";

  const [email, setEmail] = useState("boss@motiontale.pro");
  const [password, setPassword] = useState("motiontale");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <Card>
      <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
      <p className="mt-2 text-sm text-black/60">Demo credentials are prefilled.</p>

      <div className="mt-6 space-y-3">
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

        <div className="text-xs text-black/45">
          Credentials: <span className="font-medium">boss@motiontale.pro</span> /{" "}
          <span className="font-medium">motiontale</span>
        </div>
      </div>
    </Card>
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
    <Card>
      <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
      <p className="mt-2 text-sm text-black/60">GitHub Pages mode: client-side demo login.</p>

      <div className="mt-6 space-y-3">
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

        <div className="text-xs text-black/45">
          Credentials: <span className="font-medium">boss@motiontale.pro</span> /{" "}
          <span className="font-medium">motiontale</span>
        </div>
      </div>
    </Card>
  );
}
