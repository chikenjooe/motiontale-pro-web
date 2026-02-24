"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { getBasePath } from "@/lib/basePath";

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-md rounded-3xl border border-black/10 bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
      {children}
    </div>
  );
}

export default function CheckEmailPage() {
  const router = useRouter();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <Card>
        <h1 className="text-2xl font-semibold tracking-tight">Check your email</h1>
        <p className="mt-2 text-sm text-black/60">
          We sent you a confirmation link. Please confirm your account, then come back and log in.
        </p>

        <div className="mt-6 space-y-3">
          <button
            className="w-full rounded-2xl bg-[#ff3333] px-4 py-3 text-sm font-medium text-white hover:bg-[#ff1f1f]"
            onClick={() => router.push(`${getBasePath()}/`)}
            type="button"
          >
            Back to Home
          </button>

          <button
            type="button"
            className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-medium text-black/75 hover:bg-black/5"
            onClick={() => router.push(`${getBasePath()}/login`)}
          >
            Back to Log in
          </button>

          <div className="text-xs text-black/45">
            Need help? Check spam/promotions or try signing up again. By continuing, you agree to our{" "}
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
