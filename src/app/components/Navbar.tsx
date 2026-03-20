"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          scrolled
            ? "bg-[#1A1A1A]/80 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <a
            href="#"
            className="font-[Playfair_Display] text-lg md:text-xl font-semibold tracking-[0.15em] uppercase text-white"
          >
            Saint Voyage
          </a>

          <div className="hidden md:flex items-center gap-10">
            {["Collection", "Story", "Vessels", "Pricing"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-[13px] uppercase tracking-[0.2em] font-medium text-white/60 hover:text-white transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
              >
                {item}
              </a>
            ))}
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-[1.5px] bg-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] origin-center ${
                menuOpen ? "rotate-45 translate-y-[3.5px]" : ""
              }`}
            />
            <span
              className={`block w-6 h-[1.5px] bg-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] origin-center ${
                menuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#1A1A1A]/95 backdrop-blur-3xl flex flex-col items-center justify-center gap-8 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {["Collection", "Story", "Vessels", "Pricing"].map((item, i) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            onClick={() => setMenuOpen(false)}
            className="text-2xl uppercase tracking-[0.3em] font-medium text-white/80 hover:text-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
            style={{
              transitionDelay: menuOpen ? `${100 + i * 80}ms` : "0ms",
              transform: menuOpen ? "translateY(0)" : "translateY(2rem)",
              opacity: menuOpen ? 1 : 0,
            }}
          >
            {item}
          </a>
        ))}
      </div>
    </>
  );
}
