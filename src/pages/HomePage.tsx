import { AboutSection } from "../components/sections/AboutSection";
import { ContactSection } from "../components/sections/ContactSection";
import { HeroSection } from "../components/sections/HeroSection";
import { ProcessSection } from "../components/sections/ProcessSection";
import { ReviewsSection } from "../components/sections/ReviewsSection";
import { ServicesSection } from "../components/sections/ServicesSection";
import { WhyUsSection } from "../components/sections/WhyUsSection";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <ProcessSection />
      <WhyUsSection />
      <ReviewsSection />
      <ContactSection />
    </>
  );
}
