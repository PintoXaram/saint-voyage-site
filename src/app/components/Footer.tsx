"use client";

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] border-t border-white/[0.04] py-16 md:py-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="font-[Playfair_Display] text-lg font-semibold tracking-[0.15em] uppercase text-white mb-4">
              Saint Voyage
            </h3>
            <p className="text-sm text-white/30 font-light leading-relaxed max-w-[40ch]">
              Sculptural vessels and transportive fragrances. Designed for the
              intentional curator who believes scent deserves a home worthy of
              keeping.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-white/50 font-medium mb-5">
              Navigate
            </h4>
            <ul className="space-y-3">
              {["Collection", "Story", "Vessels", "Pricing"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-sm text-white/30 hover:text-white/60 transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] font-light"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-white/50 font-medium mb-5">
              Connect
            </h4>
            <ul className="space-y-3">
              {["Instagram", "Pinterest", "Contact"].map((item) => (
                <li key={item}>
                  <span className="text-sm text-white/30 font-light">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.04] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-white/20 tracking-[0.1em] uppercase">
            &copy; 2026 Saint Voyage. All rights reserved.
          </p>
          <p className="text-[11px] text-white/15 tracking-[0.1em]">
            Where scent becomes ritual.
          </p>
        </div>
      </div>
    </footer>
  );
}
