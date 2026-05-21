import { reviewsPlaceholder } from "../../constants/home";
import { Button } from "../ui/Button";
import { SectionKicker } from "../ui/SectionKicker";

const reviewCards = [
  "Google recenze",
  "Ověřené zkušenosti klientů",
  "Brzy přímo na webu",
];

export function ReviewsSection() {
  return (
    <section id="reviews" className="bg-[#061a34] px-5 py-20 text-white md:px-12 lg:px-16">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <SectionKicker>Recenze</SectionKicker>
          <h2 className="font-serif text-5xl leading-tight tracking-[-0.03em] text-white">
            {reviewsPlaceholder.title}
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/70">
            {reviewsPlaceholder.description}
          </p>

          <Button href="#contact" variant="secondary" className="mt-9 border-white/20 text-white hover:bg-white/10">
            Domluvit konzultaci
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {reviewCards.map((item) => (
            <div
              key={item}
              className="interactive-card rounded-3xl border border-white/10 bg-white/5 p-6"
            >
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#c89750]">
                Recenze
              </p>
              <h3 className="mt-5 font-serif text-2xl leading-tight text-white">
                {item}
              </h3>
              <p className="mt-4 text-sm leading-7 text-white/60">
                Sekci máme připravenou pro napojení externích hodnocení a referencí.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
