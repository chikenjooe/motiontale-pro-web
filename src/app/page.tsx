import Link from "next/link";
import { UploadPanel } from "@/components/UploadPanel";

const EXAMPLES = [
  { title: "Dance transfer", desc: "Bring choreography to your character." },
  { title: "Action sync", desc: "Match fast motion with stable identity." },
  { title: "Facial nuance", desc: "Capture subtle expressions." },
  { title: "Camera follow", desc: "Keep motion coherent across frames." },
  { title: "Full-body pose", desc: "Preserve silhouettes and limbs." },
  { title: "Stylized performance", desc: "Anime / cinematic vibes." },
];

const FAQ = [
  {
    q: "What is Motiontale Pro?",
    a: "Motiontale Pro is a motion-control interface that transfers motion from a reference video to your character image.",
  },
  {
    q: "What files can I upload?",
    a: "Images: JPG/PNG. Videos: MP4/WebM. This is a demo UI — generation is not connected yet.",
  },
  {
    q: "Do you store my uploads?",
    a: "In this demo build, uploads are not sent anywhere. When we connect a backend, we’ll add clear privacy controls.",
  },
  {
    q: "Why do I need to login?",
    a: "The product is gated by whitelist during early access. After login you’ll see the whitelist confirmation screen.",
  },
];

function SectionTitle({ kicker, title, desc }: { kicker: string; title: string; desc?: string }) {
  return (
    <div className="mb-8">
      <div className="text-xs font-medium tracking-widest text-white/50">{kicker}</div>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">{title}</h2>
      {desc ? <p className="mt-2 max-w-2xl text-sm text-white/60">{desc}</p> : null}
    </div>
  );
}

export default function Home() {
  return (
    <div>
      <section className="mx-auto max-w-6xl px-4 pb-10 pt-14 md:pb-16 md:pt-20">
        <div className="grid items-start gap-10 md:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Early access · Motion control via video references
            </div>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
              Motion control at the
              <span className="block bg-gradient-to-r from-white to-white/55 bg-clip-text text-transparent">
                speed of AI
              </span>
            </h1>
            <p className="mt-4 max-w-xl text-base text-white/65">
              Upload a character image and a reference video. Motiontale Pro transfers movement, timing, and
              expression — while preserving identity.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="#examples"
                className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black hover:bg-white/90"
              >
                Explore examples
              </Link>
              <Link
                href="#features"
                className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10"
              >
                See features
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 text-xs text-white/55 md:max-w-md">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-3">
                <div className="text-white/80">Control</div>
                <div className="mt-1">Body motion, gesture, expression</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-3">
                <div className="text-white/80">Preserve</div>
                <div className="mt-1">Character identity & style</div>
              </div>
            </div>
          </div>

          <div>
            <UploadPanel ctaLabel="Login to Generate" ctaHref="/login" />
            <div className="mt-3 text-xs text-white/40">
              Tip: For best results, match the starting pose of your image to the first frame of your video.
            </div>
          </div>
        </div>
      </section>

      <section id="examples" className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <SectionTitle
          kicker="EXAMPLES"
          title="Video motion previews"
          desc="Placeholders for now. Once you send me approved preview videos (or we generate our own), I’ll wire them in."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {EXAMPLES.map((e) => (
            <div
              key={e.title}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]"
            >
              <div className="aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/0">
                <div className="flex h-full items-center justify-center text-xs text-white/45">
                  Video preview
                </div>
              </div>
              <div className="mt-3 text-sm font-medium">{e.title}</div>
              <div className="mt-1 text-xs text-white/55">{e.desc}</div>
            </div>
          ))}
        </div>

        <div className="mt-4 text-xs text-white/45">
          Note: I can embed videos from external URLs, but downloading/republishing third‑party assets may require
          permission.
        </div>
      </section>

      <section id="features" className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <SectionTitle kicker="FEATURES" title="Precision motion transfer" desc="A clean interface with pro-grade controls." />

        <div className="grid gap-4 md:grid-cols-3">
          {[{
            t: "Full-body motion",
            d: "Transfer posture, limbs, and rhythm with consistent timing.",
          }, {
            t: "Expression fidelity",
            d: "Preserve identity while capturing subtle facial cues.",
          }, {
            t: "Creator workflow",
            d: "Upload → prompt → generate → iterate (backend coming next).",
          }].map((c) => (
            <div key={c.t} className="rounded-3xl border border-white/10 bg-black/25 p-5">
              <div className="text-sm font-medium">{c.t}</div>
              <div className="mt-2 text-sm text-white/60">{c.d}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <SectionTitle kicker="HOW IT WORKS" title="Three steps" />

        <div className="grid gap-4 md:grid-cols-3">
          {[
            { n: "01", t: "Upload image + video", d: "Pick your character image and a motion reference clip." },
            { n: "02", t: "Describe the vibe", d: "Add optional prompt: cinematic, stylized, smooth, etc." },
            { n: "03", t: "Generate", d: "Login to generate (demo shows the flow; backend is next)." },
          ].map((s) => (
            <div key={s.n} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
              <div className="text-xs text-white/50">{s.n}</div>
              <div className="mt-2 text-sm font-medium">{s.t}</div>
              <div className="mt-2 text-sm text-white/60">{s.d}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <SectionTitle kicker="FAQ" title="Quick answers" />

        <div className="space-y-3">
          {FAQ.map((f) => (
            <details
              key={f.q}
              className="group rounded-3xl border border-white/10 bg-black/25 px-5 py-4"
            >
              <summary className="cursor-pointer list-none text-sm font-medium">
                <span className="text-white/90">{f.q}</span>
                <span className="float-right text-white/40 group-open:rotate-45">+</span>
              </summary>
              <div className="mt-3 text-sm text-white/60">{f.a}</div>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-white/[0.07] to-white/[0.03] p-8">
          <div className="text-2xl font-semibold tracking-tight">Ready to try Motiontale Pro?</div>
          <div className="mt-2 max-w-2xl text-sm text-white/60">
            Login to access the early access flow. After login, you’ll see the whitelist confirmation screen.
          </div>
          <div className="mt-5">
            <Link
              href="/login"
              className="inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black hover:bg-white/90"
            >
              Login
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
