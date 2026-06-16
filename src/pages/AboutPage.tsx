import { IconCheck } from "@tabler/icons-react";
import { ContactSection } from "../components/sections/ContactSection";
import { PageHero } from "../components/ui/PageHero";
import { SectionKicker } from "../components/ui/SectionKicker";
import { aboutHighlights, aboutParagraphs } from "../constants/home";
import { useInteractiveAutoplayVideo } from "../hooks/useInteractiveAutoplayVideo";

const watchedAreas = [
  "výročí smluv",
  "ceny energií",
  "změny trhu",
  "financování",
  "pojistné události",
  "vozový park",
  "domácnost",
  "váš klid",
];

export function AboutPage() {
  const { videoRef, videoInteractionProps } =
    useInteractiveAutoplayVideo();

  return (
    <>
      <PageHero
        kicker="O nás"
        title="Jsme finanční dům pro náročné."
        description="Pomáháme klientům mít všechny finance přehledně na jednom místě – bez chaosu, bez zbytečné byrokracie a bez starostí."
        media={
          <div className="rounded-[28px] rounded-tl-[110px] bg-[#061a34] px-8 py-12 text-white shadow-[0_30px_80px_rgba(6,26,52,0.14)] md:px-12 md:py-14">
            <p className="font-serif text-4xl leading-tight text-[#d7b174] md:text-5xl">
              Vy žijete svůj život.
            </p>
            <p className="mt-7 text-sm font-bold uppercase tracking-[0.28em] text-white/55">
              My hlídáme:
            </p>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {watchedAreas.map((item) => (
                <li key={item} className="flex items-center gap-3 text-lg">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#c89750]/15 text-[#d7b174]">
                    <IconCheck size={17} strokeWidth={2.5} aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        }
      />

      <section className="bg-white px-5 py-20 md:px-12 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionKicker>Kdo jsme</SectionKicker>
            <h2 className="font-serif text-5xl leading-tight tracking-[-0.03em]">
              Neřešíme jen jednotlivé smlouvy, ale celkový systém vašich financí.
            </h2>

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

          <div className="space-y-6 text-lg leading-8 text-[#061a34]/65">
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-(--section-bg) px-5 py-20 md:px-12 lg:px-16">
        <div className="mb-12 max-w-3xl">
          <SectionKicker>Video</SectionKicker>
          <h2 className="font-serif text-5xl tracking-[-0.03em]">
            Představení SMK Capital
          </h2>
        </div>

        <div className="grid items-stretch gap-6 xl:grid-cols-[minmax(0,1.7fr)_minmax(280px,0.7fr)]">
          <div className="aspect-video w-full overflow-hidden rounded-[28px] rounded-tl-[110px] shadow-[0_30px_80px_rgba(6,26,52,0.14)]">
            <video
              ref={videoRef}
              {...videoInteractionProps}
              src={`${import.meta.env.BASE_URL}reklama_final.mp4`}
              aria-label="Představení SMK Capital"
              className="size-full object-cover"
              autoPlay
              controls
              loop
              muted
              playsInline
              preload="metadata"
            >
              Váš prohlížeč nepodporuje přehrávání videa.
            </video>
          </div>

          <aside className="flex flex-col justify-between rounded-[28px] bg-[#061a34] p-8 text-white shadow-[0_24px_60px_rgba(6,26,52,0.12)]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#c89750]">
                Ve videu uvidíte
              </p>
              <h3 className="mt-5 font-serif text-4xl leading-tight">
                Jak se staráme o vaše finance.
              </h3>

              <ul className="mt-8 space-y-5">
                {[
                  "Všechny finance přehledně na jednom místě",
                  "Administrativu a změny řešíme za vás",
                  "O smlouvy se staráme dlouhodobě",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 leading-7 text-white/75">
                    <IconCheck
                      size={20}
                      strokeWidth={2.3}
                      className="mt-1 shrink-0 text-[#d7b174]"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-10 border-t border-white/10 pt-6 font-serif text-2xl leading-tight text-[#d7b174]">
              Vy se nestaráte. My se staráme.
            </p>
          </aside>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
