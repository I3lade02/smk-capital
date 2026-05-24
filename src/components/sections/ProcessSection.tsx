import { processSteps } from "../../constants/home";
import { SectionKicker } from "../ui/SectionKicker";

export function ProcessSection() {
  return (
    <section
      id="process"
      className="bg-(--section-bg) px-5 py-20 md:px-12 lg:px-16"
    >
      <div className="mb-12 max-w-3xl">
        <SectionKicker>Jak to u nás probíhá</SectionKicker>
        <h2 className="font-serif text-5xl leading-tight tracking-[-0.03em]">
          Jednoduše, přehledně a bez starostí.
        </h2>
        <p className="mt-6 text-lg leading-8 text-[#061a34]/65">
          Od prvního kontaktu až po dlouhodobou správu smluv vedeme spolupráci tak,
          aby pro Vás byla co nejjednodušší a bez zbytečných starostí.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        {processSteps.map((step) => (
          <article
            key={step.number}
            className="interactive-card rounded-3xl bg-white p-7 shadow-[0_22px_55px_rgba(6,26,52,0.08)]"
          >
            <p className="font-serif text-4xl text-[#c89750]">{step.number}</p>
            <h3 className="mt-6 font-serif text-2xl leading-tight">{step.title}</h3>
            <p className="mt-4 text-sm leading-7 text-[#061a34]/60">
              {step.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
