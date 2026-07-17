import { SectionKicker } from "../ui/SectionKicker";

type Partner = {
  name: string;
  logo: string;
};

const partnerRows: Partner[][] = [
  [
    { name: "BIDLI", logo: "partners/bidli.svg" },
    { name: "ČSOB", logo: "partners/csob.svg" },
    { name: "ČPP", logo: "partners/cpp.svg" },
    { name: "Allianz", logo: "partners/allianz.svg" },
    { name: "Kooperativa", logo: "partners/kooperativa.svg" },
    { name: "mBank", logo: "partners/mbank.svg" },
  ],
  [
    { name: "Raiffeisenbank", logo: "partners/raiffeisenbank.svg" },
    { name: "Pillow", logo: "partners/pillow.svg" },
    { name: "NN pojištění", logo: "partners/nn.svg" },
    { name: "Direct", logo: "partners/direct.svg" },
    { name: "UNIQA", logo: "partners/uniqa.svg" },
    { name: "VZP", logo: "partners/vzp.svg" },
  ],
];

const partners = partnerRows.flat();

function PartnerLogo({ partner }: { partner: Partner }) {
  return (
    <div className="partner-logo-card">
      <img
        src={`${import.meta.env.BASE_URL}${partner.logo}`}
        alt=""
        className="partner-logo"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

export function PartnersSection() {
  return (
    <section
      id="partners"
      aria-labelledby="partners-title"
      className="overflow-hidden bg-white py-20"
    >
      <div className="px-5 md:px-12 lg:px-16">
        <div className="mx-auto max-w-3xl text-center">
          <SectionKicker>Silní partneři</SectionKicker>
          <h2
            id="partners-title"
            className="font-serif text-5xl leading-tight tracking-[-0.03em]"
          >
            S kým spolupracujeme
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#061a34]/65">
            Spolupracujeme s předními bankami a pojišťovnami, abychom pro vás
            mohli porovnat více možností a doporučit řešení, které opravdu dává
            smysl.
          </p>
        </div>
      </div>

      <div className="partners-marquee mt-12 space-y-5" aria-hidden="true">
        {partnerRows.map((row, rowIndex) => (
          <div key={rowIndex} className="partners-marquee-row">
            {[0, 1, 2].map((copyIndex) => (
              <div
                key={copyIndex}
                className={`partners-marquee-track ${
                  rowIndex === 1 ? "partners-marquee-track--reverse" : ""
                } ${
                  copyIndex > 0 ? "partners-marquee-track--duplicate" : ""
                }`}
              >
                {row.map((partner) => (
                  <PartnerLogo
                    key={`${copyIndex}-${partner.name}`}
                    partner={partner}
                  />
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>

      <ul className="sr-only">
        {partners.map((partner) => (
          <li key={partner.name}>{partner.name}</li>
        ))}
      </ul>
    </section>
  );
}
