import Link from "next/link";
import { UploadPanel } from "@/components/UploadPanel";
import { ExampleVideo } from "@/components/ExampleVideo";

const EXAMPLE_VIDEOS = [
  {
    title: "Motion transfer",
    desc: "Reference motion → your character.",
    src: "https://cdn.jsdelivr.net/gh/zengyue/cdn@v1.0.45/monet/pages/motion-transfer/2.mp4",
  },
  {
    title: "Motion transfer",
    desc: "Timing and rhythm preserved.",
    src: "https://cdn.jsdelivr.net/gh/zengyue/cdn@v1.0.45/monet/pages/motion-transfer/4.mp4",
  },
  {
    title: "Motion transfer",
    desc: "Identity stays consistent.",
    src: "https://cdn.jsdelivr.net/gh/zengyue/cdn@v1.0.45/monet/pages/motion-transfer/5.mp4",
  },
  {
    title: "Motion control",
    desc: "Short clips work great.",
    src: "https://files.monet.vision/1f3cbc1a-a2db-4e49-ac1c-0bbdcc3d66c7.mp4",
  },
  {
    title: "Motion control",
    desc: "Strong motion, stable subject.",
    src: "https://files.monet.vision/2461feae-e42a-4c83-9abd-d6f44bde6e55.mp4",
  },
  {
    title: "Motion control",
    desc: "Clean tracking, smooth result.",
    src: "https://files.monet.vision/499ad85e-44af-4c00-9917-11cbd922a761.mp4",
  },
  {
    title: "Motion control",
    desc: "Preview from reference flow.",
    src: "https://files.monet.vision/7a9ade2e-752f-424a-8fde-5b8a3a05ae12.mp4",
  },
  {
    title: "Motion control",
    desc: "Another reference preview.",
    src: "https://files.monet.vision/8e2eeca8-213e-465a-8c24-b4949e204cdc.mp4",
  },
  {
    title: "Action sync",
    desc: "Fast motion, stable subject.",
    src: "https://cdn.openart.ai/assets/video-tutorial-thumbnail-1440.mp4",
  },
  {
    title: "Motion control",
    desc: "Taichi example.",
    src: "https://replicate.delivery/pbxt/OHMFv2w6blsLcBTvRSEujuJnNvRNXXEmyLlXIvpMSVzG8mhN/taichi.mp4",
  },
  {
    title: "Motion control",
    desc: "AnimateImg example.",
    src: "https://cdn.animateimg.com/user/cmk86ib2w0000ncw1uk729gff/20260112/cmkawpgyd000313bsjqdkiez7_0.mp4",
  },
];

const FAQ = [
  {
    q: "What is Motiontale Pro?",
    a: "A clean motion-control workflow: upload an image + a reference video, add optional prompt, generate. This is currently a demo UI.",
  },
  {
    q: "What’s supported?",
    a: "Images: JPG/PNG. Videos: MP4/WebM. Backend is not connected yet.",
  },
  {
    q: "Why login?",
    a: "Early access is whitelisted. After login you’ll see the whitelist confirmation screen.",
  },
  {
    q: "Can I use it for commercial work?",
    a: "Once we add plans + Terms, yes. For now, this is an early-access demo.",
  },
];

function SectionTitle({ kicker, title, desc }: { kicker: string; title: string; desc?: string }) {
  return (
    <div className="mb-8">
      <div className="text-[11px] font-semibold tracking-[0.18em] text-black/35">{kicker}</div>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">{title}</h2>
      {desc ? <p className="mt-2 max-w-2xl text-sm text-black/55">{desc}</p> : null}
    </div>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
      <div className="text-2xl font-semibold tracking-tight">{value}</div>
      <div className="mt-1 text-xs text-black/50">{label}</div>
    </div>
  );
}

function LogoCloud() {
  const items = ["Studios", "Creators", "Agencies", "Games", "Ads", "AI Teams"];
  return (
    <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
      <div className="text-[11px] font-semibold tracking-[0.18em] text-black/35">TRUST</div>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((t) => (
          <div
            key={t}
            className="rounded-full border border-black/10 bg-[#f6f6f8] px-3 py-1 text-xs font-medium text-black/60"
          >
            {t}
          </div>
        ))}
      </div>
      <div className="mt-3 text-xs text-black/45">
        Placeholders for now — when you have real logos/testimonials we’ll plug them in.
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div>
      <section className="mx-auto max-w-6xl px-4 pb-10 pt-14 md:pb-16 md:pt-20">
        <div className="grid items-start gap-10 md:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1 text-xs text-black/60">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff3333]" />
              Early access · Motion control via video references
            </div>

            <h1 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
              Motiontale Pro
              <span className="mt-2 block text-black/55">Serious motion control for creators</span>
            </h1>

            <p className="mt-4 max-w-xl text-base text-black/60">
              Upload a character image and a reference video. Transfer motion, timing, and expression — while
              keeping identity clean.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="#examples"
                className="rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-black/90"
              >
                Watch examples
              </Link>
              <Link
                href="#features"
                className="rounded-full border border-black/10 bg-white px-5 py-2.5 text-sm font-medium text-black/80 hover:bg-black/5"
              >
                Features
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 text-xs text-black/55 md:max-w-md">
              <div className="rounded-2xl border border-black/10 bg-white p-3">
                <div className="text-black/85">Control</div>
                <div className="mt-1">Body motion, gesture, expression</div>
              </div>
              <div className="rounded-2xl border border-black/10 bg-white p-3">
                <div className="text-black/85">Preserve</div>
                <div className="mt-1">Identity & consistency</div>
              </div>
            </div>
          </div>

          <div>
            <UploadPanel ctaLabel="Login to Generate" ctaHref="/login" />
            <div className="mt-3 text-xs text-black/45">
              Tip: match starting pose of your image to the first frame of the reference video.
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          <Metric value="< 10s" label="Best reference clip length" />
          <Metric value="720p" label="Default output (demo)" />
          <Metric value="1-click" label="Upload → prompt → generate" />
          <Metric value="Whitelist" label="Early access gate" />
        </div>

        <div className="mt-4">
          <LogoCloud />
        </div>
      </section>

      <section id="examples" className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <SectionTitle kicker="EXAMPLES" title="Preview motion" desc="Video previews pulled from your references." />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {EXAMPLE_VIDEOS.map((e) => (
            <div
              key={e.src}
              className="rounded-3xl border border-black/10 bg-white p-4 shadow-[0_10px_40px_rgba(0,0,0,0.06)]"
            >
              <div className="aspect-video w-full overflow-hidden rounded-2xl border border-black/10 bg-black/5">
                {/* preview */}
                <ExampleVideo src={e.src} />
              </div>
              <div className="mt-3 text-sm font-semibold">{e.title}</div>
              <div className="mt-1 text-xs text-black/55">{e.desc}</div>
            </div>
          ))}
        </div>

        <div className="mt-4 text-xs text-black/45">
          Note: videos are referenced via external URLs. If you want, we can replace them with your own generated
          previews.
        </div>
      </section>

      <section id="features" className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <SectionTitle kicker="FEATURES" title="Clean UI, pro workflow" />

        <div className="grid gap-4 md:grid-cols-3">
          {[{
            t: "High signal UI",
            d: "No neon scam vibes. Clear controls and spacing.",
          }, {
            t: "Motion fidelity",
            d: "Transfer rhythm + gesture while preserving identity.",
          }, {
            t: "Creator workflow",
            d: "Upload → prompt → generate → iterate.",
          }].map((c) => (
            <div key={c.t} className="rounded-3xl border border-black/10 bg-white p-5 shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
              <div className="text-sm font-semibold">{c.t}</div>
              <div className="mt-2 text-sm text-black/60">{c.d}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <SectionTitle kicker="HOW IT WORKS" title="Three steps" />

        <div className="grid gap-4 md:grid-cols-3">
          {[
            { n: "01", t: "Upload", d: "Character image + motion reference clip." },
            { n: "02", t: "Describe", d: "Optional prompt to steer style." },
            { n: "03", t: "Generate", d: "Login to generate (UI-ready)." },
          ].map((s) => (
            <div key={s.n} className="rounded-3xl border border-black/10 bg-white p-5 shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
              <div className="text-xs font-semibold text-black/40">{s.n}</div>
              <div className="mt-2 text-sm font-semibold">{s.t}</div>
              <div className="mt-2 text-sm text-black/60">{s.d}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <SectionTitle kicker="FAQ" title="Quick answers" />

        <div className="space-y-3">
          {FAQ.map((f) => (
            <details key={f.q} className="group rounded-3xl border border-black/10 bg-white px-5 py-4">
              <summary className="cursor-pointer list-none text-sm font-semibold">
                <span className="text-black/90">{f.q}</span>
                <span className="float-right text-black/35 group-open:rotate-45">+</span>
              </summary>
              <div className="mt-3 text-sm text-black/60">{f.a}</div>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="rounded-3xl border border-black/10 bg-white p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
          <div className="text-2xl font-semibold tracking-tight">Try Motiontale Pro</div>
          <div className="mt-2 max-w-2xl text-sm text-black/60">
            Login to access early access flow. After login you’ll see the whitelist confirmation.
          </div>
          <div className="mt-5">
            <Link
              href="/login"
              className="inline-flex rounded-full bg-[#ff3333] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#ff1f1f]"
            >
              Login
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
