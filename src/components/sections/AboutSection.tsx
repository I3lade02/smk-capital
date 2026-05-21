import { aboutHighlights, aboutParagraphs } from "../../constants/home";
import { SectionKicker } from "../ui/SectionKicker";

export function AboutSection() {
  return (
    <section id="about" className="bg-white px-5 py-20 md:px-12 lg:px-16">
      <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr]">
        <div>
          <SectionKicker>O nás</SectionKicker>
          <h2 className="font-serif text-5xl leading-tight tracking-[-0.03em]">
            Jsme finanční dům pro náročné.
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-8 text-[#061a34]/65">
            Pomáháme klientům mít všechny finance přehledně na jednom místě. Bez
            chaosu, bez zbytečné byrokracie a bez starostí.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {aboutHighlights.map((item) => (
              <span
                key={item}
                className="rounded-full border border-[#061a34]/10 bg-(--section-bg) px-4 py-2 text-sm text-[#061a34]/70"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-4xl bg-[#061a34] p-8 text-white shadow-[0_30px_80px_rgba(6,26,52,0.16)] md:p-10">
          <div className="space-y-5 text-base leading-8 text-white/78">
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#c89750]">
              Video
            </p>
            <h3 className="mt-4 font-serif text-3xl leading-tight">
              Představení SMK Capital
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-7 text-white/65">
              Do této sekce doplníme krátké video s představením firmy a způsobu
              spolupráce.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
