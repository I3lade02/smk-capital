import { IconShieldCheck } from "@tabler/icons-react";
import { heroHighlights } from "../../constants/home";
import { images, siteConfig } from "../../constants/site";
import { Button } from "../ui/Button";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-(--section-bg) px-5 pb-20 pt-32 md:px-12 lg:px-16 lg:pb-28 lg:pt-28"
    >
      <div className="grid items-center gap-12 lg:grid-cols-[0.88fr_1.12fr]">
        <div className="relative z-10 max-w-2xl">
          <p className="inline-flex rounded-full border border-[#c89750]/25 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-[#9f7035] shadow-[0_16px_40px_rgba(6,26,52,0.08)]">
            SMK CAPITAL
          </p>

          <h1 className="mt-6 font-serif text-6xl leading-[0.92] tracking-tighter text-[#061a34] md:text-8xl xl:text-[108px]">
            Vy neřešíte nic.
            <br />
            <span className="text-[#c89750]">My řešíme vše.</span>
          </h1>

          <p className="mt-7 max-w-xl text-xl font-semibold leading-8 text-[#061a34]">
            {siteConfig.heroLead}
          </p>

          <p className="mt-4 max-w-xl text-lg leading-8 text-[#061a34]/70">
            {siteConfig.heroDescription} Pomáháme s pojištěním, financováním,
            investicemi i správou smluv.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Button
              href="#contact"
              className="px-10 py-5 text-lg font-bold md:px-12 md:py-6 md:text-xl"
            >
              Požadavek na zavolání
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {heroHighlights.map((item) => (
              <span
                key={item}
                className="rounded-full border border-[#061a34]/10 bg-white px-4 py-2 text-sm text-[#061a34]/65 shadow-[0_14px_35px_rgba(6,26,52,0.06)]"
              >
                {item}
              </span>
            ))}
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
                <p className="font-serif text-2xl">Telefonicky i osobně</p>
                <p className="text-sm leading-6 text-[#061a34]/60">
                  Finance i papíry řešíme za vás.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
