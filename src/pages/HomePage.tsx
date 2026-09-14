import { AboutSection } from "../components/sections/AboutSection";
import { ContactSection } from "../components/sections/ContactSection";
import { HeroSection } from "../components/sections/HeroSection";
import { PartnersSection } from "../components/sections/PartnersSection";
import { ProcessSection } from "../components/sections/ProcessSection";
import { ReviewsSection } from "../components/sections/ReviewsSection";
import { ServicesSection } from "../components/sections/ServicesSection";
import { WhyUsSection } from "../components/sections/WhyUsSection";
import { Seo } from "../components/Seo";

export function HomePage() {
  return (
    <>
      <Seo
        title="SMK Capital | Pojištění, hypotéky a finance"
        description="SMK Capital nabízí pojištění, hypotéky, úvěry, investice a dlouhodobou správu smluv. Srozumitelný finanční servis bez zbytečných starostí."
        path="/"
      />
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <PartnersSection />
      <ProcessSection />
      <WhyUsSection />
      <ReviewsSection />
      <ContactSection />
    </>
  );
}
