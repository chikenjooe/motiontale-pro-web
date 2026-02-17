import Link from "next/link";

type Tier = { name: string; price: string; desc: string; bullets: string[]; cta: string; highlight?: boolean };

const TIERS: Tier[] = [
  {
    name: "Starter",
    price: "$0",
    desc: "Try the flow. Watermarked previews.",
    bullets: ["Basic motion transfer", "Limited seconds / month", "Community support"],
    cta: "Get started",
  },
  {
    name: "Pro",
    price: "$29",
    desc: "For creators shipping weekly.",
    bullets: ["Higher quality", "No watermark", "Faster queue"],
    cta: "Go Pro",
    highlight: true,
  },
  {
    name: "Studio",
    price: "Custom",
    desc: "Teams, agencies, and pipelines.",
    bullets: ["Team seats", "SLA", "Batch + API (coming)"],
    cta: "Contact",
  },
];

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="flex items-end justify-between gap-6">
        <div>
          <div className="text-[11px] font-semibold tracking-[0.18em] text-black/35">PRICING</div>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">Simple plans</h1>
          <p className="mt-3 max-w-2xl text-sm text-black/55">
            Pricing is placeholder while we finalize compute costs. The important part: the product looks real.
          </p>
        </div>
        <Link
          href="/login"
          className="hidden rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-black/90 md:inline-flex"
        >
          Login
        </Link>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {TIERS.map((t) => (
          <div
            key={t.name}
            className={`rounded-3xl border p-6 shadow-[0_10px_40px_rgba(0,0,0,0.06)] ${
              t.highlight ? "border-black/20 bg-white" : "border-black/10 bg-white"
            }`}
          >
            <div className="text-sm font-semibold">{t.name}</div>
            <div className="mt-2 text-4xl font-semibold tracking-tight">
              {t.price}
              {t.price.startsWith("$") && t.price !== "$0" ? (
                <span className="text-sm font-medium text-black/45">/mo</span>
              ) : null}
            </div>
            <div className="mt-2 text-sm text-black/55">{t.desc}</div>

            <ul className="mt-5 space-y-2 text-sm text-black/70">
              {t.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-[#ff3333]" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <Link
                href="/login"
                className={`inline-flex w-full items-center justify-center rounded-2xl px-4 py-3 text-sm font-medium transition ${
                  t.highlight
                    ? "bg-[#ff3333] text-white hover:bg-[#ff1f1f]"
                    : "border border-black/10 bg-white text-black/80 hover:bg-black/5"
                }`}
              >
                {t.cta}
              </Link>
            </div>

            {t.highlight ? (
              <div className="mt-4 text-xs text-black/45">Most popular</div>
            ) : (
              <div className="mt-4 text-xs text-black/45">&nbsp;</div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 text-xs text-black/45">
        Legal: see <a className="underline" href="/terms-of-service">Terms of Service</a> and{" "}
        <a className="underline" href="/privacy-policy">Privacy Policy</a>.
      </div>
    </div>
  );
}
