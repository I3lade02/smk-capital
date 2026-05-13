import { IconAward, IconHeartHandshake, IconShieldCheck, IconUsersGroup } from "@tabler/icons-react";
import { ContactSection } from "../components/sections/ContactSection";
import { PageHero } from "../components/ui/PageHero";
import { SectionKicker } from "../components/ui/SectionKicker";
import { images } from "../constants/site";

const values = [
  {
    title: "Důvěra",
    description: "Stavíme na férovém jednání a dlouhodobých vztazích.",
    icon: IconShieldCheck,
  },
  {
    title: "Srozumitelnost",
    description: "Složité finanční věci vysvětlujeme lidsky a jasně.",
    icon: IconUsersGroup,
  },
  {
    title: "Partnerství",
    description: "Jsme tu před podpisem smlouvy i dlouho po něm.",
    icon: IconHeartHandshake,
  },
  {
    title: "Zkušenosti",
    description: "Opíráme se o znalost trhu a praktické zkušenosti.",
    icon: IconAward,
  },
];

export function AboutPage() {
  return (
    <>
      <PageHero
        kicker="O nás"
        title="Finanční poradenství s lidskou tváří."
        description="Pomáháme lidem dělat důležitá finanční rozhodnutí klidněji, přehledněji a s větší jistotou."
        image={images.advisor}
      />

      <section className="bg-white px-5 py-20 md:px-12 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionKicker>Kdo jsme</SectionKicker>
            <h2 className="font-serif text-5xl leading-tight tracking-[-0.03em]">
              Neprodáváme smlouvy. Pomáháme vybírat správná rozhodnutí.
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-8 text-[#061a34]/65">
            <p>
              SMK Capital s.r.o. stojí na osobním přístupu, důvěře a
              srozumitelné komunikaci. Naším cílem je, aby klient vždy věděl,
              proč dané řešení dává smysl a co od něj může očekávat.
            </p>

            <p>
              Pomáháme s pojištěním, hypotékami, úvěry i dlouhodobou ochranou
              rodiny a majetku. Každý návrh připravujeme podle konkrétní
              životní situace, ne podle univerzální šablony.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#fbfaf7] px-5 py-20 md:px-12 lg:px-16">
        <div className="mb-12 max-w-3xl">
          <SectionKicker>Naše hodnoty</SectionKicker>
          <h2 className="font-serif text-5xl tracking-[-0.03em]">
            Principy, podle kterých pracujeme
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {values.map((value) => {
            const Icon = value.icon;

            return (
              <div key={value.title} className="rounded-3xl bg-white p-8 shadow-[0_22px_55px_rgba(6,26,52,0.08)]">
                <Icon size={42} strokeWidth={1.4} className="text-[#c89750]" />
                <h3 className="mt-7 font-serif text-2xl">{value.title}</h3>
                <p className="mt-4 text-sm leading-6 text-[#061a34]/60">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <ContactSection />
    </>
  );
}
