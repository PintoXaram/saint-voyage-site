"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const scrollSections = [
  {
    eyebrow: "The Vessel",
    headline: "Sculpted to Hold\nthe Ethereal",
    body: "Each vessel is designed as an art object\u2009\u2014\u2009sculptural, weighty, and collectible. The form is intentional. The material is tactile. The silhouette is architectural.",
    position: "left" as const,
  },
  {
    eyebrow: "The Craft",
    headline: "Matte Ceramic\nFinish",
    body: "The SV monogram appears on a brass plate, debossed into the ceramic surface. An object that remains long after the fragrance has diffused.",
    position: "right" as const,
  },
  {
    eyebrow: "The Scent",
    headline: "Fragrance Moves\nThrough Time",
    body: "Naartjie, Oud, and Bergamot meet labdanum, amyris, and black pepper. Rose, Amber, and Myrrh woven with a saffron connector note. IFRA-compliant, clean fragrance.",
    position: "left" as const,
  },
];

const TOTAL_FRAMES = 60;

export default function ScrollVideoSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLCanvasElement[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const currentFrameRef = useRef(-1);
  const rafRef = useRef<number>(0);

  // Extract frames from video into offscreen canvases
  const extractFrames = useCallback(async () => {
    const video = document.createElement("video");
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";
    video.src = "/product-video.mp4";

    // Wait for video to be ready
    await new Promise<void>((resolve, reject) => {
      video.onloadeddata = () => resolve();
      video.onerror = () => reject(new Error("Video failed to load"));
      video.load();
    });

    const w = video.videoWidth;
    const h = video.videoHeight;
    const duration = video.duration;
    const frames: HTMLCanvasElement[] = [];

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const time = (i / (TOTAL_FRAMES - 1)) * duration;
      video.currentTime = time;

      // Wait for seek with timeout
      await new Promise<void>((resolve) => {
        let resolved = false;
        const done = () => {
          if (resolved) return;
          resolved = true;
          video.removeEventListener("seeked", done);
          resolve();
        };
        video.addEventListener("seeked", done);
        // Timeout fallback — if seeked never fires, continue anyway
        setTimeout(done, 500);
      });

      const offscreen = document.createElement("canvas");
      offscreen.width = w;
      offscreen.height = h;
      const ctx = offscreen.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, w, h);
      }
      frames.push(offscreen);
    }

    framesRef.current = frames;

    // Set display canvas size and draw first frame
    const display = canvasRef.current;
    if (display) {
      display.width = w;
      display.height = h;
      const ctx = display.getContext("2d");
      if (ctx && frames[0]) {
        ctx.drawImage(frames[0], 0, 0);
      }
    }

    setReady(true);
  }, []);

  // Draw a specific frame index
  const showFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const frames = framesRef.current;
    if (!canvas || !frames.length) return;

    const clamped = Math.max(0, Math.min(frames.length - 1, index));
    if (clamped === currentFrameRef.current) return;

    currentFrameRef.current = clamped;
    const ctx = canvas.getContext("2d");
    if (ctx && frames[clamped]) {
      ctx.drawImage(frames[clamped], 0, 0);
    }
  }, []);

  // Start extraction on mount
  useEffect(() => {
    extractFrames().catch(() => {
      // Fallback: if extraction fails, show nothing rather than break
      console.warn("Frame extraction failed");
    });
  }, [extractFrames]);

  // Scroll handler with lerped frame display
  useEffect(() => {
    if (!ready) return;

    const container = containerRef.current;
    if (!container) return;

    let targetFrame = 0;
    let currentSmooth = 0;

    const tick = () => {
      const delta = targetFrame - currentSmooth;
      currentSmooth += delta * 0.12;

      if (Math.abs(delta) < 0.01) {
        currentSmooth = targetFrame;
      }

      showFrame(Math.round(currentSmooth));
      rafRef.current = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollStart = rect.top + window.scrollY;
      const scrollDistance = containerHeight - windowHeight;
      const currentScroll = window.scrollY - scrollStart;
      const progress = Math.max(0, Math.min(1, currentScroll / scrollDistance));

      targetFrame = progress * (TOTAL_FRAMES - 1);

      const sectionCount = scrollSections.length;
      const newIndex = Math.min(
        sectionCount - 1,
        Math.floor(progress * sectionCount)
      );
      setActiveIndex(newIndex);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    rafRef.current = requestAnimationFrame(tick);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [ready, showFrame]);

  return (
    <section
      id="collection"
      ref={containerRef}
      className="relative bg-[#F0F0F0]"
      style={{ height: `${(scrollSections.length + 1) * 100}vh` }}
    >
      {/* Sticky wrapper */}
      <div className="sticky top-0 h-[100dvh] flex items-center justify-center">
        {/* Canvas — displays pre-extracted frames */}
        <div className="relative z-10 w-[320px] md:w-[380px] lg:w-[440px]">
          <canvas
            ref={canvasRef}
            className="w-full h-auto"
            style={{ aspectRatio: "1072 / 1928" }}
          />
          {!ready && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-[#C3592B]/30 border-t-[#C3592B] rounded-full animate-spin" />
            </div>
          )}
        </div>

        {/* Text sections — absolutely positioned */}
        {scrollSections.map((section, i) => {
          const isActive = activeIndex === i;
          const isLeft = section.position === "left";

          return (
            <div
              key={i}
              className={`hidden md:block absolute top-1/2 z-20 w-[280px] lg:w-[320px] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                isLeft
                  ? "left-[5%] lg:left-[8%] xl:left-[12%] text-left"
                  : "right-[5%] lg:right-[8%] xl:right-[12%] text-right"
              }`}
              style={{
                opacity: isActive ? 1 : 0,
                transform: isActive
                  ? "translateY(-50%)"
                  : "translateY(calc(-50% + 30px))",
                filter: isActive ? "blur(0px)" : "blur(6px)",
              }}
            >
              <span
                className={`inline-block text-[10px] uppercase tracking-[0.25em] font-medium mb-5 text-[#C3592B]/80 ${
                  isLeft ? "" : "ml-auto"
                }`}
              >
                {section.eyebrow}
              </span>
              <h2 className="font-[Playfair_Display] text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight leading-[1.1] text-[#1A1A1A] mb-4 whitespace-pre-line">
                {section.headline}
              </h2>
              <p
                className={`text-sm md:text-[15px] text-[#333]/55 leading-relaxed font-normal max-w-[28ch] ${
                  isLeft ? "" : "ml-auto"
                }`}
              >
                {section.body}
              </p>
            </div>
          );
        })}

        {/* Mobile: text below video */}
        <div className="md:hidden absolute bottom-8 left-0 right-0 px-6">
          {scrollSections.map((section, i) => {
            const isActive = activeIndex === i;
            return (
              <div
                key={i}
                className="absolute bottom-0 left-6 right-6 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? "translateY(0)" : "translateY(20px)",
                  filter: isActive ? "blur(0px)" : "blur(6px)",
                }}
              >
                <div className="rounded-2xl px-5 py-5 bg-[#F0F0F0]/90 backdrop-blur-sm">
                  <span className="inline-block text-[10px] uppercase tracking-[0.25em] font-medium mb-3 text-[#C3592B]/80">
                    {section.eyebrow}
                  </span>
                  <h2 className="font-[Playfair_Display] text-xl font-medium tracking-tight leading-[1.1] text-[#1A1A1A] mb-2 whitespace-pre-line">
                    {section.headline}
                  </h2>
                  <p className="text-sm text-[#333]/55 leading-relaxed font-normal">
                    {section.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
