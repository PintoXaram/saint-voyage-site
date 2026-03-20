"use client";

import { useEffect, useRef } from "react";

const scents = [
  {
    name: "Naartjie x Oud x Bergamot",
    notes: "Labdanum, Amyris, Black Pepper",
    description:
      "A citrus-forward opening that gives way to the deep, resinous warmth of oud. Grounded by the smoky spice of black pepper and the woody softness of amyris.",
    color: "#C3592B",
  },
  {
    name: "Rose x Amber x Myrrh",
    notes: "Saffron Connector Note",
    description:
      "An opulent blend where the richness of damask rose meets the golden warmth of amber. Myrrh adds an ancient, sacred depth, unified by a saffron thread.",
    color: "#D6C7B2",
  },
];

export default function ScentSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
            el.style.filter = "blur(0)";
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    const items = sectionRef.current?.querySelectorAll("[data-reveal]");
    items?.forEach((item) => {
      const el = item as HTMLElement;
      el.style.opacity = "0";
      el.style.transform = "translateY(2.5rem)";
      el.style.filter = "blur(8px)";
      el.style.transition =
        "all 1.1s cubic-bezier(0.22, 1, 0.36, 1)";
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="relative py-32 md:py-44 bg-[#F0F0F0]"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div data-reveal className="mb-20 md:mb-28">
          <span className="inline-block text-[10px] uppercase tracking-[0.25em] font-medium text-[#8A7E73] mb-6">
            Scent Profiles
          </span>
          <h2 className="font-[Playfair_Display] text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tighter leading-[1] text-[#1A1A1A] max-w-[18ch]">
            Fragrance Moves Through Time and Space
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {scents.map((scent, i) => (
            <div
              key={i}
              data-reveal
              style={{ transitionDelay: `${i * 150}ms` }}
              className="group border border-[#1A1A1A]/15 rounded-xl p-8 md:p-10 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[#1A1A1A]/25 hover:shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: scent.color }}
                />
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#333]/55 font-medium">
                  {scent.notes}
                </span>
              </div>

              <h3 className="font-[Playfair_Display] text-xl md:text-2xl font-medium tracking-tight text-[#1A1A1A] mb-4">
                {scent.name}
              </h3>

              <p className="text-sm text-[#333]/65 leading-relaxed font-normal">
                {scent.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
