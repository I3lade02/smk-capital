import {
  IconCar,
  IconClockHour3,
  IconFileTypePdf,
  IconShieldCheck,
} from "@tabler/icons-react";
import { CarInsuranceForm } from "../components/forms/CarInsuranceForm";
import { SectionKicker } from "../components/ui/SectionKicker";

const processItems = [
  {
    icon: IconCar,
    title: "Pošlete SPZ",
    text: "Doplníte telefon, e-mail a registrační značku vozidla.",
  },
  {
    icon: IconFileTypePdf,
    title: "PDF je nepovinné",
    text: "Aktuální smlouva nám pomůže rychleji porovnat cenu a krytí.",
  },
  {
    icon: IconShieldCheck,
    title: "Připravíme nabídku",
    text: "Ozveme se s možnostmi povinného ručení i havarijního pojištění.",
  },
];

export function CarInsurancePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[var(--section-bg)] px-5 pb-16 pt-36 md:px-12 lg:px-16 lg:pt-40">
        <div className="absolute inset-x-0 top-0 h-px bg-[#c89750]/25" />
        <div className="grid items-start gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="min-w-0 pt-4 lg:sticky lg:top-28">
            <SectionKicker>Autopojištění</SectionKicker>

            <h1 className="max-w-3xl font-serif text-5xl leading-[0.98] tracking-[-0.04em] text-[#061a34] md:text-7xl">
              Rychlá poptávka pojištění vozidla.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#061a34]/65">
              Stačí SPZ a kontakt. Pokud máte po ruce aktuální pojistnou
              smlouvu, můžete ji přiložit jako PDF a urychlit tím přípravu
              nabídky.
            </p>

            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[24px] border border-[#061a34]/10 bg-white p-5 shadow-[0_18px_45px_rgba(6,26,52,0.08)]">
                <IconClockHour3
                  size={32}
                  stroke={1.5}
                  className="text-[#c89750]"
                />
                <p className="mt-4 font-serif text-2xl leading-tight text-[#061a34]">
                  Rychlejší zpracování
                </p>
                <p className="mt-3 text-sm leading-6 text-[#061a34]/60">
                  PDF smlouvy je volitelné, ale pomůže nám porovnat parametry
                  bez zbytečného dohledávání.
                </p>
              </div>

              <div className="rounded-[24px] border border-[#c89750]/30 bg-[#fbf8f3] p-5 shadow-[0_18px_45px_rgba(6,26,52,0.08)]">
                <IconShieldCheck
                  size={32}
                  stroke={1.5}
                  className="text-[#c89750]"
                />
                <p className="mt-4 font-serif text-2xl leading-tight text-[#061a34]">
                  Bez závazku
                </p>
                <p className="mt-3 text-sm leading-6 text-[#061a34]/60">
                  Po odeslání vás kontaktujeme a doladíme údaje potřebné pro
                  relevantní nabídku.
                </p>
              </div>
            </div>
          </div>

          <div className="min-w-0">
            <CarInsuranceForm />
          </div>
        </div>
      </section>

      <section className="bg-[var(--section-bg)] px-5 py-16 md:px-12 lg:px-16">
        <div className="mb-10 max-w-3xl">
          <SectionKicker>Jak to probíhá</SectionKicker>
          <h2 className="font-serif text-5xl leading-tight tracking-[-0.03em] text-[#061a34]">
            Minimum údajů, jasný další krok.
          </h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {processItems.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="interactive-card rounded-3xl bg-white p-8 shadow-[0_22px_55px_rgba(6,26,52,0.09)]"
              >
                <Icon
                  size={42}
                  strokeWidth={1.4}
                  className="interactive-card-icon text-[#c89750]"
                />
                <h3 className="mt-7 font-serif text-3xl leading-tight text-[#061a34]">
                  {item.title}
                </h3>
                <p className="mt-4 leading-7 text-[#061a34]/60">
                  {item.text}
                </p>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
