import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ScrollVideoSection from "./components/ScrollVideoSection";
import ScentSection from "./components/ScentSection";
import PricingSection from "./components/PricingSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <ScrollVideoSection />
      <ScentSection />
      <PricingSection />
      <Footer />
    </main>
  );
}
