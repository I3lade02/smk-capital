import { IconCircleCheck } from "@tabler/icons-react";
import { images } from "../constants/site";
import { processSteps } from "../constants/home";
import { serviceCategories } from "../constants/services";
import { PageHero } from "../components/ui/PageHero";
import { ContactSection } from "../components/sections/ContactSection";
import { SectionKicker } from "../components/ui/SectionKicker";

export function ServicesPage() {
  return (
    <>
      <PageHero
        kicker="Přehled služeb"
        title="Pojištění, financování i servis smluv pod jednou střechou."
        description="Pomáháme klientům řešit finance jako celek. Nejen jednotlivé produkty, ale i jejich návaznost, správu a dlouhodobý přehled."
        image={images.house}
      />

      <section className="bg-[var(--section-bg)] px-5 py-20 md:px-12 lg:px-16">
        <div className="mb-12 max-w-3xl">
          <SectionKicker>Co řešíme</SectionKicker>
          <h2 className="font-serif text-5xl tracking-[-0.03em]">
            Vyberte oblast, se kterou vám můžeme pomoci
          </h2>
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          {serviceCategories.map((service) => {
            const Icon = service.icon;

            return (
              <article
                key={service.title}
                className="interactive-card group rounded-3xl bg-white p-8 shadow-[0_22px_55px_rgba(6,26,52,0.09)] transition hover:-translate-y-1 hover:shadow-[0_30px_75px_rgba(6,26,52,0.15)]"
              >
                <div className="flex items-start justify-between gap-6">
                  <p className="font-serif text-3xl text-[#c89750]">
                    {service.number}
                  </p>
                  <Icon size={42} strokeWidth={1.4} className="interactive-card-icon text-[#c89750]" />
                </div>

                <h3 className="mt-8 font-serif text-3xl">{service.title}</h3>

                <p className="mt-4 leading-7 text-[#061a34]/60">
                  {service.description}
                </p>

                <ul className="mt-7 space-y-3 text-sm text-[#061a34]/70">
                  {service.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <IconCircleCheck size={17} className="mt-0.5 text-[#c89750]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-white px-5 py-20 md:px-12 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionKicker>Jak spolupráce probíhá</SectionKicker>
            <h2 className="font-serif text-5xl leading-tight tracking-[-0.03em]">
              Jednoduše, přehledně a bez zbytečného tlaku.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {processSteps.map((step) => (
              <div
                key={step.number}
                className="interactive-card rounded-3xl border border-[#061a34]/10 p-7"
              >
                <p className="font-serif text-4xl text-[#c89750]">{step.number}</p>
                <h3 className="mt-6 font-serif text-2xl">{step.title}</h3>
                <p className="mt-4 text-sm leading-6 text-[#061a34]/60">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
