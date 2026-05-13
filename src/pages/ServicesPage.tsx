import { IconArrowRight, IconCircleCheck } from "@tabler/icons-react";
import { services } from "../constants/services";
import { images } from "../constants/site";
import { PageHero } from "../components/ui/PageHero";
import { ContactSection } from "../components/sections/ContactSection";
import { SectionKicker } from "../components/ui/SectionKicker";

const processSteps = [
  "Poznáme vaši situaci",
  "Porovnáme možnosti na trhu",
  "Doporučíme vhodné řešení",
  "Pomůžeme s vyřízením",
];

export function ServicesPage() {
  return (
    <>
      <PageHero
        kicker="Naše služby"
        title="Finance, pojištění a úvěry pod jednou střechou."
        description="Pomáháme klientům najít srozumitelná a dlouhodobě funkční řešení pro bydlení, rodinu, majetek i budoucnost."
        image={images.house}
      />

      <section className="bg-[#fbfaf7] px-5 py-20 md:px-12 lg:px-16">
        <div className="mb-12 max-w-3xl">
          <SectionKicker>Co řešíme</SectionKicker>
          <h2 className="font-serif text-5xl tracking-[-0.03em]">
            Vyberte oblast, se kterou vám můžeme pomoci
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article
                key={service.title}
                className="group rounded-3xl bg-white p-8 shadow-[0_22px_55px_rgba(6,26,52,0.09)] transition hover:-translate-y-1 hover:shadow-[0_30px_75px_rgba(6,26,52,0.15)]"
              >
                <div className="flex items-start justify-between gap-6">
                  <p className="font-serif text-3xl text-[#c89750]">
                    {service.number}
                  </p>
                  <Icon size={42} strokeWidth={1.4} className="text-[#c89750]" />
                </div>

                <h3 className="mt-8 font-serif text-3xl">{service.title}</h3>

                <p className="mt-4 leading-7 text-[#061a34]/60">
                  {service.description}
                </p>

                <ul className="mt-7 space-y-3 text-sm text-[#061a34]/70">
                  <li className="flex gap-3">
                    <IconCircleCheck size={17} className="mt-0.5 text-[#c89750]" />
                    Individuální návrh podle vaší situace
                  </li>
                  <li className="flex gap-3">
                    <IconCircleCheck size={17} className="mt-0.5 text-[#c89750]" />
                    Srozumitelné vysvětlení podmínek
                  </li>
                  <li className="flex gap-3">
                    <IconCircleCheck size={17} className="mt-0.5 text-[#c89750]" />
                    Pomoc s vyřízením od začátku do konce
                  </li>
                </ul>

                <a
                  href="#kontakt"
                  className="mt-8 inline-flex items-center gap-3 text-sm font-semibold text-[#c89750]"
                >
                  Zjistit více
                  <IconArrowRight
                    size={17}
                    className="transition group-hover:translate-x-1"
                  />
                </a>
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
            {processSteps.map((step, index) => (
              <div key={step} className="rounded-3xl border border-[#061a34]/10 p-7">
                <p className="font-serif text-4xl text-[#c89750]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-6 font-serif text-2xl">{step}</h3>
                <p className="mt-4 text-sm leading-6 text-[#061a34]/60">
                  Každý krok vysvětlíme srozumitelně a doporučíme jen to, co
                  dává smysl pro vaši konkrétní situaci.
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
