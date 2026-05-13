import { IconClockHour3, IconMail, IconMapPin, IconPhone } from "@tabler/icons-react";
import { ContactSection } from "../components/sections/ContactSection";
import { PageHero } from "../components/ui/PageHero";
import { SectionKicker } from "../components/ui/SectionKicker";
import { images, siteConfig } from "../constants/site";

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
  {
    label: "Adresa",
    value: siteConfig.address.join(", "),
    icon: IconMapPin,
  },
  {
    label: "Dostupnost",
    value: "Po–Pá, 9:00–17:00",
    icon: IconClockHour3,
  },
];

export function ContactPage() {
  return (
    <>
      <PageHero
        kicker="Kontakt"
        title="Pojďme zjistit, jaké řešení pro vás dává smysl."
        description="Napište nám nebo zavolejte. Ozveme se vám zpět a domluvíme si krátkou nezávaznou konzultaci."
        image={images.house}
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
              <div key={item.label} className="rounded-3xl bg-[#fbfaf7] p-7">
                <Icon size={36} strokeWidth={1.4} className="text-[#c89750]" />
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

      <section className="bg-[#fbfaf7] px-5 pb-20 md:px-12 lg:px-16">
        <div className="flex min-h-85 items-center justify-center rounded-[28px] rounded-tl-[110px] bg-[#061a34] p-10 text-center text-white">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#c89750]">
              Mapa
            </p>
            <h2 className="mt-4 font-serif text-4xl">Zde může být vložená mapa</h2>
            <p className="mt-4 max-w-xl text-white/60">
              Později sem můžeme přidat Google Maps nebo Mapy.cz iframe podle
              skutečné adresy klienta.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
