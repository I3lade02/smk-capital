import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import { Sidebar } from "./components/layout/Sidebar";
import { ContactSection } from "./components/sections/ContactSection";
import { HeroSection } from "./components/sections/HeroSection";
import { MortgageSection } from "./components/sections/MortgageSection";
import { QuoteSection } from "./components/sections/QuoteSection";
import { ServicesSection } from "./components/sections/ServicesSection";
import { StatsSection } from "./components/sections/StatsSection";

function App() {
  return (
    <main className="min-h-screen bg-[#f7f3ed] text-[#061a34]">
      <div className="mx-auto grid min-h-screen max-w-480 lg:grid-cols-[220px_1fr]">
        <Sidebar />

        <div className="relative overflow-hidden">
          <Header />
          <HeroSection />
          <ServicesSection />
          <StatsSection />
          <MortgageSection />
          <QuoteSection />
          <ContactSection />
          <Footer />
        </div>
      </div>
    </main>
  );
}

export default App;
