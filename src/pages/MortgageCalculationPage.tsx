import {
  IconBuildingBank,
  IconCalculator,
  IconClockHour3,
  IconShieldCheck,
} from "@tabler/icons-react";
import { MortgageCalculationForm } from "../components/forms/MortgageCalculationForm";
import { SectionKicker } from "../components/ui/SectionKicker";
import { Seo } from "../components/Seo";

const processItems = [
  {
    icon: IconCalculator,
    title: "Zadáte základní čísla",
    text: "Doba splatnosti, příjmy, splátky a závazky nám dají první orientaci.",
  },
  {
    icon: IconBuildingBank,
    title: "Připravíme orientaci",
    text: "Nejde o závazný výpočet, ale o podklad pro další hypoteční konzultaci.",
  },
  {
    icon: IconShieldCheck,
    title: "Ozveme se zpět",
    text: "Doplníme detaily a projdeme možnosti financování podle vaší situace.",
  },
];

export function MortgageCalculationPage() {
  return (
    <>
      <Seo
        title="Hypoteční propočet – orientační výpočet splátek | SMK Capital"
        description="Zadejte příjmy, splátky a závazky a získejte orientační podklad pro hypoteční konzultaci. Ozveme se s dalším postupem."
        path="/hypoteka-propocet"
      />
      <section className="relative overflow-hidden bg-[var(--section-bg)] px-5 pb-16 pt-36 md:px-12 lg:px-16 lg:pt-40">
        <div className="absolute inset-x-0 top-0 h-px bg-[#c89750]/25" />
        <div className="grid items-start gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="min-w-0 pt-4 lg:sticky lg:top-28">
            <SectionKicker>Hypoteční propočet</SectionKicker>

            <h1 className="max-w-3xl font-serif text-5xl leading-[0.98] tracking-[-0.04em] text-[#061a34] md:text-7xl">
              Rychlá žádost o orientační propočet.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#061a34]/65">
              Zadejte základní příjmy, splátky a závazky. Připravíme podklad
              pro další hypoteční konzultaci a ozveme se vám s dalším postupem.
            </p>

            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[24px] border border-[#061a34]/10 bg-white p-5 shadow-[0_18px_45px_rgba(6,26,52,0.08)]">
                <IconClockHour3
                  size={32}
                  stroke={1.5}
                  className="text-[#c89750]"
                />
                <p className="mt-4 font-serif text-2xl leading-tight text-[#061a34]">
                  Bez zdlouhavého zadávání
                </p>
                <p className="mt-3 text-sm leading-6 text-[#061a34]/60">
                  Stačí několik základních čísel. Detaily doladíme telefonicky.
                </p>
              </div>

              <div className="rounded-[24px] border border-[#c89750]/30 bg-[#fbf8f3] p-5 shadow-[0_18px_45px_rgba(6,26,52,0.08)]">
                <IconBuildingBank
                  size={32}
                  stroke={1.5}
                  className="text-[#c89750]"
                />
                <p className="mt-4 font-serif text-2xl leading-tight text-[#061a34]">
                  Nezávazně a přehledně
                </p>
                <p className="mt-3 text-sm leading-6 text-[#061a34]/60">
                  Výsledek slouží jako orientace před dalším ověřením možností
                  financování.
                </p>
              </div>
            </div>
          </div>

          <div className="min-w-0">
            <MortgageCalculationForm />
          </div>
        </div>
      </section>

      <section className="bg-[var(--section-bg)] px-5 py-16 md:px-12 lg:px-16">
        <div className="mb-10 max-w-3xl">
          <SectionKicker>Jak to probíhá</SectionKicker>
          <h2 className="font-serif text-5xl leading-tight tracking-[-0.03em] text-[#061a34]">
            Orientace před konkrétní nabídkou.
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
