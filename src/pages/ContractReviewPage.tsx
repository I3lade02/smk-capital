import {
  IconCircleCheck,
  IconFileTypePdf,
  IconPhoto,
  IconShieldCheck,
} from "@tabler/icons-react";
import { ContractReviewForm } from "../components/forms/ContractReviewForm";
import { SectionKicker } from "../components/ui/SectionKicker";

const reviewBenefits = [
  "PDF i fotografie smluv",
  "Kontrola ceny, krytí a podmínek",
  "Srozumitelné vysvětlení možností",
  "Bezplatně a nezávazně",
];

export function ContractReviewPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[var(--section-bg)] px-5 pb-16 pt-36 md:px-12 lg:px-16 lg:pt-40">
        <div className="absolute inset-x-0 top-0 h-px bg-[#c89750]/25" />

        <div className="grid items-start gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="min-w-0 pt-4 lg:sticky lg:top-28">
            <SectionKicker>Bezplatná revize smluv</SectionKicker>

            <h1 className="max-w-3xl font-serif text-5xl leading-[0.98] tracking-[-0.04em] text-[#061a34] md:text-7xl">
              Nahrajte smlouvy a nechte si je zkontrolovat.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#061a34]/65">
              Pošlete nám PDF nebo fotografie smluv. Připravíme přehled ceny,
              nastavení krytí, podmínek a míst, kde může dávat smysl úspora
              nebo lepší řešení.
            </p>

            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[24px] border border-[#061a34]/10 bg-white p-5 shadow-[0_18px_45px_rgba(6,26,52,0.08)]">
                <IconFileTypePdf
                  size={32}
                  stroke={1.5}
                  className="text-[#c89750]"
                  aria-hidden="true"
                />
                <p className="mt-4 font-serif text-2xl leading-tight text-[#061a34]">
                  Dokumenty i fotky
                </p>
                <p className="mt-3 text-sm leading-6 text-[#061a34]/60">
                  Přiložte PDF, JPG, PNG, WEBP nebo HEIC. Stačí i fotografie z
                  telefonu.
                </p>
              </div>

              <div className="rounded-[24px] border border-[#c89750]/30 bg-[#fbf8f3] p-5 shadow-[0_18px_45px_rgba(6,26,52,0.08)]">
                <IconShieldCheck
                  size={32}
                  stroke={1.5}
                  className="text-[#c89750]"
                  aria-hidden="true"
                />
                <p className="mt-4 font-serif text-2xl leading-tight text-[#061a34]">
                  Bez závazku
                </p>
                <p className="mt-3 text-sm leading-6 text-[#061a34]/60">
                  Pokud najdeme prostor pro zlepšení, vysvětlíme vám konkrétní
                  možnosti.
                </p>
              </div>
            </div>

            <ul className="mt-8 grid gap-3 text-sm leading-6 text-[#061a34]/70 sm:grid-cols-2">
              {reviewBenefits.map((benefit) => (
                <li key={benefit} className="flex gap-3">
                  <IconCircleCheck
                    size={18}
                    strokeWidth={2.1}
                    className="mt-0.5 shrink-0 text-[#c89750]"
                    aria-hidden="true"
                  />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            <ContractReviewForm />
          </div>
        </div>
      </section>

      <section className="bg-[var(--section-bg)] px-5 py-16 md:px-12 lg:px-16">
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            {
              icon: IconPhoto,
              title: "1. Nahrajete podklady",
              text: "Vyberete oblasti, přiložíte smlouvy a doplníte kontakt.",
            },
            {
              icon: IconShieldCheck,
              title: "2. Zkontrolujeme rizika",
              text: "Projdem cenu, rozsah krytí, limity, výluky i návaznosti.",
            },
            {
              icon: IconCircleCheck,
              title: "3. Dostanete návrh",
              text: "Pokud najdeme lepší řešení, vysvětlíme ho srozumitelně.",
            },
          ].map((item) => {
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
                  aria-hidden="true"
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
