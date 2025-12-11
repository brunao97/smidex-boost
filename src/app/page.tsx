"use client";

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
import { ScrollAnimate } from "@/components/ui/scroll-animate";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#1A0F0F]">
      <HeroSection />
      <ScrollAnimate>
        <LagProblemSection />
      </ScrollAnimate>
      <ScrollAnimate delay={0.1}>
        <GamesSolutionSection />
      </ScrollAnimate>
      <ScrollAnimate delay={0.1}>
        <ProfessionalsSection />
      </ScrollAnimate>
      <ScrollAnimate delay={0.1}>
        <OfferSection />
      </ScrollAnimate>
      <ScrollAnimate delay={0.1}>
        <AboutSection />
      </ScrollAnimate>
      <ScrollAnimate delay={0.1}>
        <FaqSection />
      </ScrollAnimate>
      <FooterSection />
    </main>
  );
}