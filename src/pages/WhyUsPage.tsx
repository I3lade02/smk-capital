import { ContactSection } from "../components/sections/ContactSection";
import { PageHero } from "../components/ui/PageHero";
import { SectionKicker } from "../components/ui/SectionKicker";
import { benefits } from "../constants/benefits";
import { images } from "../constants/site";

export function WhyUsPage() {
  return (
    <>
      <PageHero
        kicker="Proč my"
        title="Řešíme finance tak, aby dávaly smysl dlouhodobě."
        description="Neskládáme vedle sebe jednotlivé smlouvy. Stavíme přehledný systém, který odpovídá vaší situaci a šetří vám čas."
        image={images.whyUsHero}
        imageAlt="Financial planning notes and laptops on an office desk"
      />

      <section className="bg-white px-5 py-20 md:px-12 lg:px-16">
        <div className="mb-12 max-w-3xl">
          <SectionKicker>Naše výhody</SectionKicker>
          <h2 className="font-serif text-5xl leading-tight tracking-[-0.03em]">
            Rozdíl poznáte hlavně v přístupu.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.title}
                className="rounded-3xl bg-[var(--section-bg)] p-8 shadow-[0_22px_55px_rgba(6,26,52,0.08)]"
              >
                <Icon size={40} strokeWidth={1.4} className="text-[#c89750]" />
                <h3 className="mt-7 font-serif text-3xl leading-tight">
                  {benefit.title}
                </h3>
                <p className="mt-4 leading-7 text-[#061a34]/60">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-[var(--section-bg)] px-5 py-20 md:px-12 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionKicker>Dlouhodobý pohled</SectionKicker>
            <h2 className="font-serif text-5xl leading-tight tracking-[-0.03em]">
              Finance bez zbytečného chaosu.
            </h2>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-[0_20px_50px_rgba(6,26,52,0.08)]">
            <p className="text-lg leading-8 text-[#061a34]/65">
              Přehled, kontrola a dlouhodobá stabilita. To je důvod, proč neřešíme
              jen okamžitou potřebu, ale celkový systém vašich financí. Hledáme
              řešení, které funguje i po letech, ne jen v den podpisu.
            </p>
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
