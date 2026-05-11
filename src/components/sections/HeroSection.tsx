import { IconShieldCheck } from "@tabler/icons-react";
import { images } from "../../constants/site";
import { Button } from "../ui/Button";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#fbfaf7] px-5 pb-20 pt-32 md:px-12 lg:px-16 lg:pb-28 lg:pt-28"
    >
      <div className="grid items-center gap-12 lg:grid-cols-[0.88fr_1.12fr]">
        <div className="relative z-10 max-w-2xl">
          <h1 className="font-serif text-6xl leading-[0.92] tracking-tighter text-[#061a34] md:text-8xl xl:text-[112px]">
            Finance
            <br />s jistotou
            <br />
            pro moderní
            <br />
            <span className="text-[#c89750]">život.</span>
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-8 text-[#061a34]/70">
            Pojištění, hypotéky a úvěry, které chrání vaše jistoty a podporují
            vaše plány. Dnes, zítra i v budoucnu.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Button href="#services">Naše služby</Button>
            <Button href="#contact" variant="secondary">
              Nezávazná konzultace
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-[28px] rounded-tl-[110px] bg-white shadow-[0_30px_80px_rgba(6,26,52,0.12)]">
            <img
              src={images.hero}
              alt="Rodina v moderním domě"
              className="h-110 w-full object-cover md:h-140"
            />
          </div>

          <div className="absolute bottom-8 right-6 max-w-xs rounded-3xl bg-white p-7 shadow-[0_25px_70px_rgba(6,26,52,0.16)]">
            <div className="flex items-center gap-4">
              <div className="flex size-14 items-center justify-center rounded-2xl border border-[#d7b174] text-[#c89750]">
                <IconShieldCheck size={28} />
              </div>
              <div>
                <p className="font-serif text-2xl">Vaše jistota.</p>
                <p className="text-sm text-[#061a34]/60">Naše závazek.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
