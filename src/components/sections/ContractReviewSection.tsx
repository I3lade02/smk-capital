import {
  IconBolt,
  IconBriefcase,
  IconBulb,
  IconBuildingBank,
  IconChartPie,
  IconChevronRight,
  IconFileText,
  IconHomeShield,
  IconShieldCheck,
  IconStethoscope,
} from "@tabler/icons-react";
import { SectionKicker } from "../ui/SectionKicker";

const reviewAreas = [
  {
    label: "Pojištění vozidel",
    icon: IconShieldCheck,
  },
  {
    label: "Pojištění majetku a domácnosti",
    icon: IconHomeShield,
  },
  {
    label: "Životní a úrazové pojištění",
    icon: IconStethoscope,
  },
  {
    label: "Hypotéky a úvěry",
    icon: IconBuildingBank,
  },
  {
    label: "Investice a spoření",
    icon: IconChartPie,
  },
  {
    label: "Energie",
    icon: IconBolt,
  },
  {
    label: "Firemní a podnikatelská řešení",
    icon: IconBriefcase,
  },
];

const reviewSteps = [
  {
    number: "01",
    title: "Vyplníte krátký formulář",
    description: "Sdělíte nám, jaké služby aktuálně využíváte.",
  },
  {
    number: "02",
    title: "Nahrajete své smlouvy",
    description: "Stačí PDF nebo fotografie smluv.",
  },
  {
    number: "03",
    title: "Připravíme analýzu",
    description: "Zkontrolujeme cenu, podmínky i případná rizika.",
  },
  {
    number: "04",
    title: "Navrhneme řešení",
    description:
      "Pokud najdeme prostor pro úsporu nebo zlepšení, vše vám srozumitelně vysvětlíme.",
  },
];

const clientReasons = [
  "Jeden partner pro všechny finance",
  "Pravidelná péče o smlouvy",
  "Pomoc při pojistných událostech",
  "Pojištění, úvěry, investice i energie na jednom místě",
  "Bezplatná analýza stávajícího stavu",
];

export function ContractReviewSection() {
  return (
    <section className="bg-white px-5 py-20 md:px-12 lg:px-16">
      <div className="grid gap-12 xl:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
        <div className="min-w-0">
          <SectionKicker>Bezplatná revize smluv</SectionKicker>

          <h2 className="max-w-3xl font-serif text-5xl leading-tight tracking-[-0.03em] text-[#061a34] md:text-6xl">
            Máte své finance skutečně pod kontrolou?
          </h2>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#061a34]/65">
            Většina lidí má několik smluv u různých společností, platí zbytečně
            vysoké částky nebo nemá správně nastavené krytí. Proto klientům
            nabízíme bezplatnou revizi všech finančních produktů na jednom
            místě.
          </p>

          <div className="mt-9 rounded-[28px] bg-[#061a34] p-7 text-white shadow-[0_24px_65px_rgba(6,26,52,0.16)]">
            <div className="flex items-start gap-4">
              <span className="flex size-13 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-[#d7b174]">
                <IconFileText size={28} strokeWidth={1.5} aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-serif text-3xl leading-tight">
                  Bezplatná revize smluv
                </h3>
                <p className="mt-3 leading-7 text-white/72">
                  Vyplňte formulář a zjistěte, zda můžete ušetřit nebo získat
                  lepší podmínky.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="min-w-0">
          <div className="mb-7 flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#9f7035]">
                Co pro vás zkontrolujeme?
              </p>
              <h3 className="mt-3 font-serif text-3xl leading-tight text-[#061a34]">
                Jeden přehled pro všechny důležité produkty.
              </h3>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {reviewAreas.map((area) => {
              const Icon = area.icon;

              return (
                <article
                  key={area.label}
                  className="interactive-card flex min-h-24 items-center gap-4 rounded-3xl bg-[var(--section-bg)] p-5"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white text-[#c89750] shadow-[0_12px_28px_rgba(6,26,52,0.08)]">
                    <Icon size={22} strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <p className="font-semibold leading-6 text-[#061a34]">
                    {area.label}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-16 grid gap-10 xl:grid-cols-[minmax(0,1.18fr)_minmax(280px,0.72fr)]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#9f7035]">
            Jak to funguje?
          </p>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {reviewSteps.map((step) => (
              <article
                key={step.number}
                className="interactive-card rounded-3xl border border-[#061a34]/10 bg-white p-7 shadow-[0_20px_50px_rgba(6,26,52,0.08)]"
              >
                <p className="font-serif text-4xl text-[#c89750]">
                  {step.number}
                </p>
                <h3 className="mt-5 font-serif text-2xl leading-tight text-[#061a34]">
                  {step.title}
                </h3>
                <p className="mt-4 leading-7 text-[#061a34]/60">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        <aside className="rounded-[28px] bg-[var(--section-bg)] p-8">
          <div className="flex size-13 items-center justify-center rounded-2xl bg-white text-[#c89750] shadow-[0_12px_28px_rgba(6,26,52,0.08)]">
            <IconBulb size={28} strokeWidth={1.5} aria-hidden="true" />
          </div>
          <h3 className="mt-7 font-serif text-3xl leading-tight text-[#061a34]">
            Proč klienti využívají SMK Capital?
          </h3>

          <ul className="mt-7 space-y-4">
            {clientReasons.map((reason) => (
              <li
                key={reason}
                className="flex items-start gap-3 leading-7 text-[#061a34]/72"
              >
                <IconChevronRight
                  size={18}
                  strokeWidth={2.2}
                  className="mt-1 shrink-0 text-[#c89750]"
                  aria-hidden="true"
                />
                <span>{reason}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 h-px w-16 bg-[#c89750]" />

          <p className="mt-6 text-sm leading-6 text-[#061a34]/58">
            Revizi bereme jako začátek dlouhodobé péče. Nejde jen o cenu, ale o
            správné krytí, návaznosti smluv a přehled do budoucna.
          </p>
        </aside>
      </div>
    </section>
  );
}
