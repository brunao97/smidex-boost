import {
  HeroSection,
  LagProblemSection,
  GamesSolutionSection,
  ProfessionalsSection,
  OfferSection,
  AboutSection,
  FaqSection,
  FooterSection,
} from "@/components/sections";

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
