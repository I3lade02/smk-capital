import { IconCircleCheck, IconCircleX } from "@tabler/icons-react";
import { ContactSection } from "../components/sections/ContactSection";
import { PageHero } from "../components/ui/PageHero";
import { SectionKicker } from "../components/ui/SectionKicker";
import { images } from "../constants/site";

const commonProblems = [
  "Nepřehledné podmínky",
  "Nabídka jen od jedné instituce",
  "Tlak na rychlé rozhodnutí",
  "Minimum péče po podpisu",
];

const ourApproach = [
  "Srozumitelné vysvětlení",
  "Porovnání více možností",
  "Doporučení podle vaší situace",
  "Dlouhodobá péče a servis",
];

export function WhyUsPage() {
  return (
    <>
      <PageHero
        kicker="Proč my"
        title="Rozhodnutí, která dávají smysl i za několik let."
        description="Nejdeme cestou rychlých slibů. Hledáme řešení, která jsou udržitelná, srozumitelná a opravdu vhodná pro vaši situaci."
        image={images.hero}
      />

      <section className="bg-white px-5 py-20 md:px-12 lg:px-16">
        <div className="mb-12 max-w-3xl">
          <SectionKicker>Porovnání</SectionKicker>
          <h2 className="font-serif text-5xl leading-tight tracking-[-0.03em]">
            Rozdíl poznáte hlavně v přístupu.
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl bg-[#f7f3ed] p-8">
            <h3 className="font-serif text-3xl">Běžné řešení</h3>

            <ul className="mt-8 space-y-4">
              {commonProblems.map((item) => (
                <li key={item} className="flex gap-3 text-[#061a34]/65">
                  <IconCircleX size={19} className="mt-0.5 text-red-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl bg-[#061a34] p-8 text-white">
            <h3 className="font-serif text-3xl text-[#c89750]">
              SMK Capital
            </h3>

            <ul className="mt-8 space-y-4">
              {ourApproach.map((item) => (
                <li key={item} className="flex gap-3 text-white/80">
                  <IconCircleCheck size={19} className="mt-0.5 text-[#c89750]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-[#fbfaf7] px-5 py-20 md:px-12 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionKicker>Naše výhody</SectionKicker>
            <h2 className="font-serif text-5xl leading-tight tracking-[-0.03em]">
              Finance bez zbytečného chaosu.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {ourApproach.map((item, index) => (
              <div key={item} className="rounded-3xl bg-white p-7 shadow-[0_20px_50px_rgba(6,26,52,0.08)]">
                <p className="font-serif text-4xl text-[#c89750]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-6 font-serif text-2xl">{item}</h3>
                <p className="mt-4 text-sm leading-6 text-[#061a34]/60">
                  Vše vysvětlíme jednoduše, porovnáme možnosti a doporučíme
                  cestu, která odpovídá vašim plánům.
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
