import { IconCircleCheck } from "@tabler/icons-react";
import { images } from "../../constants/site";
import { Button } from "../ui/Button";
import { SectionKicker } from "../ui/SectionKicker";

const mortgageBenefits = [
  "Srovnáme nabídky napříč trhem",
  "Vyjednáme nejlepší podmínky",
  "Vyřídíme vše za vás",
];

export function MortgageSection() {
  return (
    <section id="why-us" className="bg-[#fbfaf7] px-5 py-20 md:px-12 lg:px-16">
      <div className="grid items-center gap-12 xl:grid-cols-[1fr_0.7fr_0.9fr]">
        <div className="overflow-hidden rounded-[28px] rounded-br-[120px] rounded-tl-[120px]">
          <img
            src={images.house}
            alt="Moderní dům s bazénem"
            className="h-107.5 w-full object-cover"
          />
        </div>

        <div>
          <SectionKicker>Hypotéky na míru</SectionKicker>
          <h2 className="font-serif text-5xl leading-tight tracking-[-0.03em]">
            Domov začíná chytrým rozhodnutím
          </h2>

          <p className="mt-6 leading-8 text-[#061a34]/65">
            Zajistíme pro vás výhodné podmínky a provedeme vás celým procesem,
            od výběru až po čerpání.
          </p>

          <ul className="mt-7 space-y-4">
            {mortgageBenefits.map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm">
                <IconCircleCheck size={18} className="text-[#c89750]" />
                {item}
              </li>
            ))}
          </ul>

          <Button href="#" variant="secondary" className="mt-9">
            Zjistit více o hypotékách
          </Button>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-[0_25px_70px_rgba(6,26,52,0.12)]">
          <h3 className="font-serif text-2xl">Orientační kalkulačka hypotéky</h3>

          <div className="mt-8 space-y-7">
            <CalculatorRow label="Výše úvěru" value="3 000 000 Kč" percent="70%" />
            <CalculatorRow label="Doba splatnosti" value="25 let" percent="48%" />
            <CalculatorRow label="Úroková sazba od" value="4,29 %" percent="62%" />
          </div>

          <div className="mt-8 flex items-center justify-between rounded-2xl bg-[#f3eee6] p-5">
            <div>
              <p className="text-xs text-[#061a34]/55">Měsíční splátka od</p>
              <p className="font-serif text-4xl text-[#c89750]">16 123 Kč</p>
            </div>

            <Button href="#" className="px-5 py-3">
              Spočítat
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

type CalculatorRowProps = {
  label: string;
  value: string;
  percent: string;
};

function CalculatorRow({ label, value, percent }: CalculatorRowProps) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between text-sm">
        <span className="text-[#061a34]/60">{label}</span>
        <strong>{value}</strong>
      </div>

      <div className="h-px bg-[#061a34]/15">
        <div className="relative h-px bg-[#c89750]" style={{ width: percent }}>
          <span className="absolute right-0 top-1/2 size-4 -translate-y-1/2 rounded-full bg-[#c89750]" />
        </div>
      </div>
    </div>
  );
}
