import { ContactSection } from "../components/sections/ContactSection";
import { PageHero } from "../components/ui/PageHero";
import { SectionKicker } from "../components/ui/SectionKicker";
import { aboutHighlights, aboutParagraphs } from "../constants/home";
import { images } from "../constants/site";

export function AboutPage() {
  return (
    <>
      <PageHero
        kicker="O nás"
        title="Jsme finanční dům pro náročné."
        description="Pomáháme klientům mít všechny finance přehledně na jednom místě – bez chaosu, bez zbytečné byrokracie a bez starostí."
        image={images.advisor}
      />

      <section className="bg-white px-5 py-20 md:px-12 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionKicker>Kdo jsme</SectionKicker>
            <h2 className="font-serif text-5xl leading-tight tracking-[-0.03em]">
              Neřešíme jen jednotlivé smlouvy, ale celkový systém vašich financí.
            </h2>

            <div className="mt-8 flex flex-wrap gap-3">
              {aboutHighlights.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[#061a34]/10 bg-[var(--section-bg)] px-4 py-2 text-sm text-[#061a34]/70"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-6 text-lg leading-8 text-[#061a34]/65">
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--section-bg)] px-5 py-20 md:px-12 lg:px-16">
        <div className="mb-12 max-w-3xl">
          <SectionKicker>Video</SectionKicker>
          <h2 className="font-serif text-5xl tracking-[-0.03em]">
            Představení SMK Capital doplníme přímo sem
          </h2>
        </div>

        <div className="rounded-[32px] bg-[#061a34] p-10 text-white">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#c89750]">
            Připravujeme
          </p>
          <h3 className="mt-4 font-serif text-4xl leading-tight">
            Krátké video o tom, jak s klienty pracujeme
          </h3>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">
            Do této sekce doplníme představení firmy, způsobu spolupráce a toho,
            jak klientům pomáháme s administrativou i dlouhodobou správou financí.
          </p>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
