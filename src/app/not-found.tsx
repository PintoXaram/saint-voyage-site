export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F0F0F0]">
      <div className="text-center">
        <h1 className="font-[Playfair_Display] text-6xl font-medium text-[#1A1A1A] mb-4">
          404
        </h1>
        <p className="text-[#333]/60 text-sm uppercase tracking-[0.2em]">
          Page not found
        </p>
        <a
          href="/"
          className="inline-block mt-8 text-[12px] uppercase tracking-[0.15em] font-medium text-[#1A1A1A]/60 hover:text-[#1A1A1A] transition-colors duration-500"
        >
          Return Home
        </a>
      </div>
    </div>
  );
}
