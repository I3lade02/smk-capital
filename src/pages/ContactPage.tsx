import { IconClockHour3, IconMail, IconMapPin, IconPhone } from "@tabler/icons-react";
import { ContactSection } from "../components/sections/ContactSection";
import { PageHero, PageHeroLogoMedia } from "../components/ui/PageHero";
import { SectionKicker } from "../components/ui/SectionKicker";
import { quickActions } from "../constants/services";
import { siteConfig } from "../constants/site";

const contactItems = [
  {
    label: "Telefon",
    value: siteConfig.phone,
    icon: IconPhone,
  },
  {
    label: "E-mail",
    value: siteConfig.email,
    icon: IconMail,
  },
  ...(siteConfig.address.length > 0
    ? [
        {
          label: "Adresa",
          value: siteConfig.address.join(", "),
          icon: IconMapPin,
        },
      ]
    : []),
  {
    label: "Dostupnost",
    value: "Po–Ne, 8:00–20:00",
    icon: IconClockHour3,
  },
];

export function ContactPage() {
  return (
    <>
      <PageHero
        kicker="Kontakt"
        title="Požádejte o zavolání nebo orientační propočet."
        description="Napište nám nebo zavolejte. Ozveme se vám zpět a projdeme s vámi pojištění, úvěr, hypotéku nebo správu stávajících smluv."
        media={<PageHeroLogoMedia />}
      />

      <section className="bg-white px-5 py-20 md:px-12 lg:px-16">
        <div className="mb-12 max-w-3xl">
          <SectionKicker>Kontaktní údaje</SectionKicker>
          <h2 className="font-serif text-5xl tracking-[-0.03em]">
            Jsme vám k dispozici
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {contactItems.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.label} className="interactive-card rounded-3xl bg-(--section-bg) p-7">
                <Icon size={36} strokeWidth={1.4} className="interactive-card-icon text-[#c89750]" />
                <h3 className="mt-6 font-serif text-2xl">{item.label}</h3>
                <p className="mt-3 text-sm leading-6 text-[#061a34]/60">
                  {item.value}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <ContactSection />

      <section className="bg-(--section-bg) px-5 pb-20 md:px-12 lg:px-16">
        <div className="mb-12 max-w-3xl">
          <SectionKicker>Co můžete poptat</SectionKicker>
          <h2 className="font-serif text-5xl tracking-[-0.03em]">
            Rychlé zadání pro nejčastější požadavky
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {quickActions.map((action) => {
            const Icon = action.icon;

            return (
              <div
                key={action.title}
                className="interactive-card rounded-3xl bg-white p-8 shadow-[0_22px_55px_rgba(6,26,52,0.08)]"
              >
                <Icon size={40} strokeWidth={1.4} className="interactive-card-icon text-[#c89750]" />
                <h3 className="mt-7 font-serif text-3xl leading-tight">
                  {action.title}
                </h3>
                <p className="mt-4 leading-7 text-[#061a34]/60">
                  {action.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
