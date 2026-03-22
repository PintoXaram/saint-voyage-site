"use client";

import { useEffect, useRef } from "react";

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = parallaxRef.current;
      if (!el) return;
      const scrollY = window.scrollY;
      const rate = scrollY * 0.3;
      el.style.transform = `translateY(${rate}px)`;
      el.style.opacity = `${Math.max(0, 1 - scrollY / 600)}`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Inward masking gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(
                ellipse 80% 70% at 50% 50%,
                transparent 40%,
                rgba(240, 240, 240, 0.2) 65%,
                rgba(240, 240, 240, 0.6) 82%,
                #F0F0F0 100%
              )
            `,
          }}
        />
        {/* Top edge fade */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#F0F0F0] to-transparent" />
        {/* Bottom edge fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F0F0F0] to-transparent" />
        {/* Left edge fade */}
        <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-[#F0F0F0] to-transparent" />
        {/* Right edge fade */}
        <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-[#F0F0F0] to-transparent" />
      </div>

      {/* Hero Content — parallax wrapper */}
      <div
        ref={parallaxRef}
        className="relative z-10 text-center px-6 max-w-3xl mx-auto"
      >
        <div>
          <span className="inline-block text-[11px] uppercase tracking-[0.3em] font-semibold text-[#1A1A1A] mb-8 bg-white/70 backdrop-blur-md rounded-full px-5 py-2 shadow-[0_2px_20px_rgba(0,0,0,0.08)]">
            Fragrance as Architecture
          </span>
        </div>

        <h1
          className="font-[Playfair_Display] italic text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1] text-[#1A1A1A] mb-6"
        >
          Monuments
          <br />
          <span className="not-italic">for the Senses</span>
        </h1>

        <p
          className="text-base md:text-lg text-[#1A1A1A]/80 leading-relaxed max-w-[50ch] mx-auto mb-10 font-normal bg-white/70 backdrop-blur-md rounded-xl px-6 py-3 inline-block shadow-[0_2px_20px_rgba(0,0,0,0.08)]"
        >
          Sculptural vessels and transportive fragrances.
          <br className="hidden md:block" />
          Where scent becomes ritual, atmosphere, and emotional architecture.
        </p>

        <div className="flex items-center justify-center gap-4">
          <a
            href="#collection"
            className="group inline-flex items-center gap-3 bg-[#1A1A1A] text-white rounded-full px-7 py-3.5 text-[13px] uppercase tracking-[0.15em] font-medium transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[#333] hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:scale-[1.02] active:scale-[0.98]"
          >
            Explore Collection
            <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className="transition-transform duration-700 group-hover:translate-x-[2px]"
              >
                <path
                  d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#1A1A1A]/30 font-medium">Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-[#1A1A1A]/20 to-transparent animate-[scrollPulse_2s_ease-in-out_infinite]" />
      </div>
    </section>
  );
}
