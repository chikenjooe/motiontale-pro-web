"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

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

  const border = dragOver ? "border-black/20" : "border-black/10";

  return (
    <div
      className={`group rounded-2xl border ${border} bg-white p-4 transition`}
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
        <div className="text-sm font-medium text-black/85">{label}</div>
        <button
          type="button"
          className="text-xs text-black/45 hover:text-black"
          onClick={() => inputRef.current?.click()}
        >
          Browse
        </button>
      </div>
      <div className="text-xs text-black/50">
        {fileName ? <span className="text-black/80">{fileName}</span> : <span>Click or drag to upload</span>}
      </div>
      <div className="mt-1 text-[11px] text-black/35">Accepted: {accept}</div>
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

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <label className="block">
      <div className="mb-1 text-[11px] font-semibold tracking-[0.12em] text-black/35">{label}</div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-black/80 outline-none focus:border-black/20"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
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
  const [model, setModel] = useState("kling-motion-control");
  const [resolution, setResolution] = useState("720p");
  const router = useRouter();

  const hint = useMemo(() => {
    if (!image && !video) return "Add your character + motion reference";
    if (image && !video) return "Now add a reference video";
    if (!image && video) return "Now add a character image";
    return "Ready";
  }, [image, video]);

  return (
    <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-sm font-semibold tracking-tight">Describe your generation</div>
        <div className="text-xs text-black/45">{hint}</div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <Dropzone label="Image" accept=".jpg,.jpeg,.png" onFile={setImage} />
        <Dropzone label="Video" accept=".mp4,.webm" onFile={setVideo} />
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <Select
          label="MODEL"
          value={model}
          onChange={setModel}
          options={[
            { value: "kling-motion-control", label: "Kling Motion Control" },
            { value: "motiontale-pro", label: "Motiontale Pro (beta)" },
          ]}
        />
        <Select
          label="RESOLUTION"
          value={resolution}
          onChange={setResolution}
          options={[
            { value: "720p", label: "720p" },
            { value: "1080p", label: "1080p" },
          ]}
        />
      </div>

      <div className="mt-3">
        <div className="mb-1 text-[11px] font-semibold tracking-[0.12em] text-black/35">PROMPT</div>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Optional: smooth camera, cinematic lighting, clean background, high fidelity"
          className="min-h-24 w-full resize-none rounded-2xl border border-black/10 bg-[#f6f6f8] px-4 py-3 text-sm text-black placeholder:text-black/35 outline-none focus:border-black/20"
        />
        <div className="mt-2 text-[11px] text-black/40">
          Selected: <span className="font-medium text-black/70">{model}</span> ·{" "}
          <span className="font-medium text-black/70">{resolution}</span>
        </div>
      </div>

      <div className="mt-3">
        <button
          type="button"
          disabled={ctaDisabled}
          className={`inline-flex w-full items-center justify-center rounded-2xl px-4 py-3 text-sm font-medium transition ${
            ctaDisabled
              ? "cursor-not-allowed bg-black/5 text-black/35"
              : "bg-[#ff3333] text-white hover:bg-[#ff1f1f]"
          }`}
          onClick={() => {
            if (ctaDisabled) return;
            if (ctaHref) router.push(ctaHref);
          }}
        >
          {ctaLabel}
        </button>
      </div>

      <div className="mt-3 text-xs text-black/45">
        Demo UI only. Generation backend is not connected yet.
      </div>
    </div>
  );
}
