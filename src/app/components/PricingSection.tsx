"use client";

import { useEffect, useRef } from "react";

const products = [
  {
    name: "Reed Diffuser",
    variant: "Charcoal",
    price: "$89",
    size: "200ml",
    color: "#333333",
    image: "/product-charcoal.png",
    description: "Hand-finished matte ceramic vessel with debossed SV brass monogram. Includes 8 premium rattan reeds. 4\u20136 month scent life.",
  },
  {
    name: "Electric Diffuser",
    variant: "Beige",
    price: "$175",
    size: "Refillable",
    color: "#D6C7B2",
    image: "/product-beige.png",
    description: "Sculptural ceramic housing with whisper-quiet ultrasonic mist. Adjustable intensity, ambient LED glow. Compatible with all SV oils.",
    popular: true,
  },
  {
    name: "Reed Diffuser",
    variant: "Terracotta",
    price: "$89",
    size: "200ml",
    color: "#C3592B",
    image: "/product-terracotta.png",
    description: "Fired-clay ceramic finish with debossed SV brass monogram. Includes 8 premium rattan reeds. 4\u20136 month scent life.",
  },
];

export default function PricingSection() {
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
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    const items = sectionRef.current?.querySelectorAll("[data-reveal]");
    items?.forEach((item) => {
      const el = item as HTMLElement;
      el.style.opacity = "0";
      el.style.transform = "translateY(2.5rem)";
      el.style.filter = "blur(8px)";
      el.style.transition = "all 1.1s cubic-bezier(0.22, 1, 0.36, 1)";
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="relative py-32 md:py-44 bg-[#F0F0F0]"
    >
      <div className="max-w-[960px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div data-reveal className="text-center mb-20 md:mb-28">
          <span className="inline-block text-[10px] uppercase tracking-[0.25em] font-medium text-[#8A7E73] mb-6">
            The Collection
          </span>
          <h2 className="font-[Playfair_Display] text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1] text-[#1A1A1A] mb-5">
            Choose Your Vessel
          </h2>
          <p className="text-sm md:text-base text-[#333]/45 font-normal max-w-[50ch] mx-auto leading-relaxed">
            Three finishes. Two scent profiles. One enduring standard of craft.
          </p>
        </div>

        {/* Product rows */}
        <div>
          {products.map((product, i) => (
            <div
              key={i}
              data-reveal
              style={{ transitionDelay: `${i * 150}ms` }}
              className="border-t border-[#1A1A1A]/8 py-8 md:py-10 group/row transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[#1A1A1A]/[0.02] hover:px-4 rounded-2xl"
            >
              {/* Desktop layout */}
              <div className="hidden md:grid grid-cols-[80px_1fr_1fr_100px_140px] gap-6 items-center">
                {/* Image */}
                <div className="w-[72px] h-[72px] rounded-2xl flex-shrink-0 overflow-hidden bg-[#F5F5F5]">
                  <img
                    src={product.image}
                    alt={`${product.name} — ${product.variant}`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Name + meta */}
                <div>
                  <h3 className="font-[Playfair_Display] text-xl font-medium tracking-tight text-[#1A1A1A] mb-1">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] uppercase tracking-[0.12em] text-[#333]/40 font-medium">
                      {product.variant}
                    </span>
                    <span className="text-[#333]/15 text-[10px]">/</span>
                    <span className="text-[11px] uppercase tracking-[0.12em] text-[#333]/40 font-medium">
                      {product.size}
                    </span>
                    {product.popular && (
                      <>
                        <span className="text-[#333]/15 text-[10px]">/</span>
                        <span className="text-[10px] uppercase tracking-[0.12em] text-[#C3592B] font-semibold">
                          Popular
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-[13px] text-[#333]/40 leading-relaxed font-normal">
                  {product.description}
                </p>

                {/* Price — fixed width, right-aligned */}
                <span className="font-[Playfair_Display] text-2xl font-medium text-[#1A1A1A] tracking-tight text-right">
                  {product.price}
                </span>

                {/* CTA — fixed width */}
                <button className="group/btn inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[11px] uppercase tracking-[0.15em] font-semibold border border-[#1A1A1A]/10 text-[#1A1A1A]/60 hover:bg-[#1A1A1A] hover:text-white hover:border-[#1A1A1A] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] whitespace-nowrap">
                  Add to Cart
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 12 12"
                    fill="none"
                    className="transition-transform duration-500 group-hover/btn:translate-x-[2px]"
                  >
                    <path
                      d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              {/* Mobile layout */}
              <div className="md:hidden">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-xl flex-shrink-0 overflow-hidden bg-[#F5F5F5]">
                    <img
                      src={product.image}
                      alt={`${product.name} — ${product.variant}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-[Playfair_Display] text-lg font-medium tracking-tight text-[#1A1A1A]">
                      {product.name}
                    </h3>
                    <span className="text-[11px] uppercase tracking-[0.12em] text-[#333]/40 font-medium">
                      {product.variant} / {product.size}
                    </span>
                  </div>
                  <span className="font-[Playfair_Display] text-xl font-medium text-[#1A1A1A] tracking-tight">
                    {product.price}
                  </span>
                </div>
                <p className="text-[13px] text-[#333]/40 leading-relaxed font-normal mb-4">
                  {product.description}
                </p>
                <button className="w-full rounded-full py-3 text-[11px] uppercase tracking-[0.15em] font-semibold border border-[#1A1A1A]/10 text-[#1A1A1A]/60 hover:bg-[#1A1A1A] hover:text-white transition-all duration-500 active:scale-[0.98]">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
          <div className="border-t border-[#1A1A1A]/8" />
        </div>
      </div>
    </section>
  );
}
