import { IconArrowRight } from "@tabler/icons-react";
import { PageHero } from "../components/ui/PageHero";
import { SectionKicker } from "../components/ui/SectionKicker";
import { images } from "../constants/site";

const posts = [
  {
    title: "Jak vybrat pojištění domácnosti a neplatit zbytečně navíc",
    category: "Pojištění",
    excerpt:
      "Podívejte se, co by měla kvalitní pojistka obsahovat a kde se často skrývají zbytečné náklady.",
  },
  {
    title: "Na co si dát pozor při sjednání hypotéky",
    category: "Hypotéky",
    excerpt:
      "Úroková sazba není všechno. Důležité jsou i poplatky, fixace, podmínky čerpání a flexibilita.",
  },
  {
    title: "Kdy se vyplatí refinancování hypotéky",
    category: "Hypotéky",
    excerpt:
      "Refinancování může ušetřit peníze, ale jen pokud se správně načasuje a porovnají se všechny náklady.",
  },
  {
    title: "Životní pojištění: kdy dává smysl a kdy ne",
    category: "Životní pojištění",
    excerpt:
      "Dobré životní pojištění chrání příjem a rodinu. Špatně nastavené jen zatěžuje rozpočet.",
  },
];

export function BlogPage() {
  return (
    <>
      <PageHero
        kicker="Blog"
        title="Praktické tipy ze světa financí."
        description="Srozumitelně vysvětlujeme témata kolem pojištění, hypoték, úvěrů a rodinných financí."
        image={images.car}
      />

      <section className="bg-[#fbfaf7] px-5 py-20 md:px-12 lg:px-16">
        <div className="mb-12 max-w-3xl">
          <SectionKicker>Nejnovější články</SectionKicker>
          <h2 className="font-serif text-5xl tracking-[-0.03em]">
            Čtěte dřív, než podepíšete
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {posts.map((post) => (
            <article
              key={post.title}
              className="group rounded-3xl bg-white p-8 shadow-[0_22px_55px_rgba(6,26,52,0.08)]"
            >
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#c89750]">
                {post.category}
              </p>

              <h3 className="mt-6 font-serif text-2xl leading-tight">
                {post.title}
              </h3>

              <p className="mt-5 text-sm leading-6 text-[#061a34]/60">
                {post.excerpt}
              </p>

              <a
                href="#"
                className="mt-8 inline-flex items-center gap-3 text-sm font-semibold text-[#c89750]"
              >
                Číst článek
                <IconArrowRight
                  size={17}
                  className="transition group-hover:translate-x-1"
                />
              </a>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
