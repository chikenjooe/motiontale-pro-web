"use client";

import { useMemo, useRef, useState } from "react";

function Dropzone({
  label,
  accept,
  onFile,
}: {
  label: string;
  accept: string;
  onFile: (file: File | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const border = dragOver ? "border-white/40" : "border-white/15";

  return (
    <div
      className={`group rounded-2xl border ${border} bg-white/5 p-4 transition`}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        const f = e.dataTransfer.files?.[0] ?? null;
        if (f) {
          setFileName(f.name);
          onFile(f);
        }
      }}
    >
      <div className="mb-2 flex items-center justify-between">
        <div className="text-sm font-medium text-white/90">{label}</div>
        <button
          type="button"
          className="text-xs text-white/60 hover:text-white"
          onClick={() => inputRef.current?.click()}
        >
          Browse
        </button>
      </div>
      <div className="text-xs text-white/60">
        {fileName ? (
          <span className="text-white/80">{fileName}</span>
        ) : (
          <span>Click or drag to upload ({accept})</span>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0] ?? null;
          setFileName(f?.name ?? null);
          onFile(f);
        }}
      />
    </div>
  );
}

export function UploadPanel({
  ctaLabel,
  ctaHref,
  ctaDisabled,
}: {
  ctaLabel: string;
  ctaHref?: string;
  ctaDisabled?: boolean;
}) {
  const [image, setImage] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [prompt, setPrompt] = useState("");

  const hint = useMemo(() => {
    if (!image && !video) return "Upload an image + a motion reference video";
    if (image && !video) return "Now add a reference video";
    if (!image && video) return "Now add a character image";
    return "Ready";
  }, [image, video]);

  const Button = (
    <button
      type="button"
      disabled={ctaDisabled}
      className={`inline-flex w-full items-center justify-center rounded-2xl px-4 py-3 text-sm font-medium transition ${
        ctaDisabled
          ? "cursor-not-allowed bg-white/10 text-white/40"
          : "bg-white text-black hover:bg-white/90"
      }`}
      onClick={() => {
        if (ctaDisabled) return;
        if (ctaHref) window.location.href = ctaHref;
      }}
    >
      {ctaLabel}
    </button>
  );

  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.03] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_30px_120px_rgba(0,0,0,0.55)]">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-sm font-medium text-white/80">Describe your generation</div>
        <div className="text-xs text-white/50">{hint}</div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <Dropzone label="Image" accept=".jpg,.jpeg,.png" onFile={setImage} />
        <Dropzone label="Video" accept=".mp4,.webm" onFile={setVideo} />
      </div>

      <div className="mt-3">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Prompt (optional): e.g. cinematic, high-energy dance, smooth camera..."
          className="min-h-24 w-full resize-none rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none focus:border-white/20"
        />
      </div>

      <div className="mt-3">{Button}</div>

      <div className="mt-3 text-xs text-white/45">
        Demo UI only. Generation backend is not connected yet.
      </div>
    </div>
  );
}
