"use client";

import { useEffect, useRef } from "react";

export function ExampleVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    // Try to start playback for autoplay previews.
    const tryPlay = async () => {
      try {
        await v.play();
      } catch {
        // Autoplay may be blocked; user can still click the video.
      }
    };
    tryPlay();
  }, []);

  return (
    <video
      ref={ref}
      className="h-full w-full object-cover"
      src={src}
      muted
      loop
      playsInline
      autoPlay
      preload="metadata"
    />
  );
}
