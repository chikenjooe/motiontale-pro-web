export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <div className="rounded-3xl border border-black/10 bg-white p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
        <h1 className="text-3xl font-semibold tracking-tight">Privacy Policy</h1>
        <p className="mt-3 text-sm text-black/60">Last updated: 2026-02-17</p>

        <div className="prose prose-sm mt-8 max-w-none text-black/80">
          <p>
            This is a placeholder legal page for Motiontale Pro. Replace with a real policy reviewed by counsel.
          </p>
          <h2>1. Scope</h2>
          <p>
            Motiontale Pro provides an interface for motion control and generation workflows. This site may be
            operated in early access.
          </p>
          <h2>2. Accounts</h2>
          <p>
            You may sign up with email/password or Google. You are responsible for keeping your account secure.
          </p>
          <h2>3. Uploads</h2>
          <p>
            You may upload images and videos. We will describe how long we store them and how they’re processed
            once the backend is connected.
          </p>
          <h2>4. Acceptable use</h2>
          <p>
            Do not upload illegal content. Do not attempt to abuse the service.
          </p>
          <h2>5. Contact</h2>
          <p>
            Contact: support@motiontale.pro
          </p>
        </div>
      </div>
    </div>
  );
}
