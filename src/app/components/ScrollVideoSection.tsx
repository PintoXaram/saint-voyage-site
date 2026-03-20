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

const TOTAL_FRAMES = 150;

export default function ScrollVideoSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const framesRef = useRef<ImageBitmap[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [framesReady, setFramesReady] = useState(false);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number>(0);

  // Extract all frames from video into memory on load
  const extractFrames = useCallback(async () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;

    const offscreen = document.createElement("canvas");
    offscreen.width = video.videoWidth;
    offscreen.height = video.videoHeight;
    const ctx = offscreen.getContext("2d");
    if (!ctx) return;

    const frames: ImageBitmap[] = [];
    const duration = video.duration;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const time = (i / (TOTAL_FRAMES - 1)) * duration;
      video.currentTime = time;
      await new Promise<void>((resolve) => {
        const onSeeked = () => {
          video.removeEventListener("seeked", onSeeked);
          resolve();
        };
        video.addEventListener("seeked", onSeeked);
      });
      ctx.drawImage(video, 0, 0);
      const bitmap = await createImageBitmap(offscreen);
      frames.push(bitmap);
    }

    framesRef.current = frames;
    setFramesReady(true);

    // Draw first frame
    const displayCanvas = canvasRef.current;
    if (displayCanvas && frames[0]) {
      displayCanvas.width = video.videoWidth;
      displayCanvas.height = video.videoHeight;
      const displayCtx = displayCanvas.getContext("2d");
      displayCtx?.drawImage(frames[0], 0, 0);
    }
  }, []);

  // Display a specific frame — instant, no seeking
  const showFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const frames = framesRef.current;
    if (!canvas || !frames.length) return;

    const clampedIndex = Math.max(0, Math.min(frames.length - 1, index));
    if (clampedIndex === currentFrameRef.current) return;

    currentFrameRef.current = clampedIndex;
    const ctx = canvas.getContext("2d");
    if (ctx && frames[clampedIndex]) {
      ctx.drawImage(frames[clampedIndex], 0, 0);
    }
  }, []);

  // Extract frames when video loads
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onLoaded = () => {
      extractFrames();
    };

    if (video.readyState >= 2) {
      extractFrames();
    } else {
      video.addEventListener("loadeddata", onLoaded, { once: true });
    }

    return () => {
      video.removeEventListener("loadeddata", onLoaded);
    };
  }, [extractFrames]);

  // Scroll handler — lerped for smoothness
  useEffect(() => {
    if (!framesReady) return;

    const container = containerRef.current;
    if (!container) return;

    let targetFrame = 0;
    let currentSmooth = 0;

    const tick = () => {
      // Ultra-smooth lerp — low factor for cinematic easing
      const delta = targetFrame - currentSmooth;
      // Adaptive lerp: slower when close (smooth stop), faster when far (responsive)
      const lerpFactor = Math.abs(delta) > 5 ? 0.08 : 0.05;
      currentSmooth += delta * lerpFactor;

      // Snap when extremely close to avoid endless sub-pixel drift
      if (Math.abs(delta) < 0.01) {
        currentSmooth = targetFrame;
      }

      const roundedFrame = Math.round(currentSmooth);
      showFrame(roundedFrame);

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

    // Initial position
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [framesReady, showFrame]);

  return (
    <section
      id="collection"
      ref={containerRef}
      className="relative bg-[#F0F0F0]"
      style={{ height: `${(scrollSections.length + 1) * 100}vh` }}
    >
      {/* Sticky wrapper */}
      <div className="sticky top-0 h-[100dvh] flex items-center justify-center">
        {/* Hidden video for frame extraction */}
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          className="hidden"
        >
          <source src="/product-video.mp4" type="video/mp4" />
        </video>

        {/* Center canvas — displays pre-extracted frames */}
        <div className="relative z-10 w-[320px] md:w-[380px] lg:w-[440px]">
          <canvas
            ref={canvasRef}
            className="w-full h-auto"
            style={{ aspectRatio: "1072 / 1928" }}
          />
          {!framesReady && (
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
