import { ContactSection } from "../components/sections/ContactSection";
import { HeroSection } from "../components/sections/HeroSection";
import { MortgageSection } from "../components/sections/MortgageSection";
import { QuoteSection } from "../components/sections/QuoteSection";
import { ServicesSection } from "../components/sections/ServicesSection";
import { StatsSection } from "../components/sections/StatsSection";

export function HomePage() {
    return (
        <>
            <HeroSection />
            <ServicesSection />
            <StatsSection />
            <MortgageSection />
            <QuoteSection />
            <ContactSection />
        </>
    );
}