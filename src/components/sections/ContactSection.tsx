import { IconMail, IconMapPin, IconPhone } from "@tabler/icons-react";
import { siteConfig } from "../../constants/site";
import { Button } from "../ui/Button";

export function ContactSection() {
  return (
    <section id="contact" className="bg-[#fbfaf7] px-5 py-16 md:px-12 lg:px-16">
      <div className="grid overflow-hidden rounded-3xl bg-white shadow-[0_25px_80px_rgba(6,26,52,0.1)] lg:grid-cols-[0.75fr_1.35fr_0.8fr]">
        <div className="bg-[#f4efe7] p-9">
          <h2 className="font-serif text-5xl leading-tight">Nezávazná konzultace</h2>
          <p className="mt-6 leading-7 text-[#061a34]/65">
            Rádi vám pomůžeme najít nejlepší řešení pro vás a vaši rodinu.
          </p>
          <div className="mt-8 h-px w-14 bg-[#c89750]" />
        </div>

        <form className="grid gap-4 p-9">
          <div className="grid gap-4 md:grid-cols-2">
            <input className="input" placeholder="Jméno a příjmení" />
            <input className="input" placeholder="Telefon" />
            <input className="input" placeholder="E-mail" />
            <select className="input">
              <option>Vyberte službu</option>
              <option>Pojištění domácnosti</option>
              <option>Pojištění vozidel</option>
              <option>Hypotéky</option>
              <option>Úvěry</option>
              <option>Životní pojištění</option>
            </select>
          </div>

          <textarea className="input min-h-36 resize-none" placeholder="Zpráva" />

          <div className="flex justify-end">
            <Button href="#">Odeslat zprávu</Button>
          </div>
        </form>

        <div className="border-l border-[#061a34]/10 p-9">
          <h3 className="font-serif text-2xl">Další způsoby kontaktu</h3>

          <div className="mt-7 space-y-5 text-sm text-[#061a34]/65">
            <ContactLine icon={<IconPhone size={18} />} text={siteConfig.phone} />
            <ContactLine icon={<IconMail size={18} />} text={siteConfig.email} />
            <ContactLine
              icon={<IconMapPin size={18} />}
              text={siteConfig.address.join(", ")}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

type ContactLineProps = {
  icon: React.ReactNode;
  text: string;
};

function ContactLine({ icon, text }: ContactLineProps) {
  return (
    <div className="flex gap-3">
      <span className="text-[#c89750]">{icon}</span>
      <span>{text}</span>
    </div>
  );
}
