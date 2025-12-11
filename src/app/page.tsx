import HeroSection from "@/components/sections/hero-section";
import LagProblemSection from "@/components/sections/lag-problem-section";
import GamesSolutionSection from "@/components/sections/games-solution-section";
import ProfessionalsSection from "@/components/sections/professionals-section";
import OfferSection from "@/components/sections/offer-section";
import AboutSection from "@/components/sections/about-section";
import FaqSection from "@/components/sections/faq-section";
import FooterSection from "@/components/sections/footer-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#1A0F0F]">
      <HeroSection />
      <LagProblemSection />
      <GamesSolutionSection />
      <ProfessionalsSection />
      <OfferSection />
      <AboutSection />
      <FaqSection />
      <FooterSection />
    </main>
  );
}
