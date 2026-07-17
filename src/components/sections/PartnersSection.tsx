import { SectionKicker } from "../ui/SectionKicker";

const partnerRows = [
  ["BIDLI", "ČSOB", "ČPP", "ALLIANZ", "KOOPERATIVA", "mBank"],
  ["RAIFFEISENBANK", "PILLOW", "NN POJIŠTĚNÍ", "DIRECT", "UNIQA", "VZP"],
] as const;

const partners = partnerRows.flat();

type PartnerWordmarkProps = {
  name: (typeof partners)[number];
};

function PartnerWordmark({ name }: PartnerWordmarkProps) {
  return (
    <div className="partner-wordmark">
      <span className="partner-wordmark-accent" />
      <span>{name}</span>
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
                  <PartnerWordmark
                    key={`${copyIndex}-${partner}`}
                    name={partner}
                  />
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>

      <ul className="sr-only">
        {partners.map((partner) => (
          <li key={partner}>{partner}</li>
        ))}
      </ul>
    </section>
  );
}
