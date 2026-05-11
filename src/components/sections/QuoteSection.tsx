import { benefits } from "../../constants/benefits";
import { images } from "../../constants/site";

export function QuoteSection() {
  return (
    <section id="about" className="bg-white px-5 py-12 md:px-12 lg:px-16">
      <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div className="flex flex-col gap-7 md:flex-row md:items-center">
          <img
            src={images.advisor}
            alt="Finanční poradkyně"
            className="size-32 rounded-full object-cover"
          />

          <div>
            <p className="font-serif text-6xl leading-none text-[#c89750]">“</p>
            <blockquote className="-mt-4 max-w-xl font-serif text-3xl leading-tight">
              Každý plán je jedinečný. Nasloucháme, rozumíme a navrhujeme
              řešení, která dávají smysl.
            </blockquote>

            <p className="mt-5 text-sm font-semibold">Markéta Svobodová</p>
            <p className="text-sm text-[#061a34]/55">Senior finanční poradkyně</p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div key={benefit.title} className="border-l border-[#061a34]/10 p-6">
                <Icon className="text-[#c89750]" size={38} strokeWidth={1.4} />
                <h3 className="mt-5 font-serif text-xl">{benefit.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#061a34]/55">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}