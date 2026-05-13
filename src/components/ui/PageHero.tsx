import type { ReactNode } from "react";
import { Button } from "./Button";
import { SectionKicker } from "./SectionKicker";

type PageHeroProps = {
    kicker: string;
    title: string;
    description: string;
    image?: string;
    children?: ReactNode;
};

export function PageHero({
    kicker,
    title,
    description,
    image,
    children,
}: PageHeroProps) {
    return (
        <section className="relative bg-[#fbfaf7] px-5 pb-16 pt-36 md:px-12 lg:px-16 lg:pt-40">
            <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
                <div>
                    <SectionKicker>{kicker}</SectionKicker>

                    <h1 className="max-w-3xl font-serif text-5xl leading-[0.98] tracking-[-0.04em] text-[#061a34] md:text-7xl">
                        {title}
                    </h1>

                    <p className="mt-7 max-w-2xl text-lg leading-8 text-[#061a34]/65">
                        {description}
                    </p>

                    <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                        <Button href="#kontakt">Nezávazná konzultace</Button>
                        <Button href="/#/sluzby" variant="secondary">
                            Zobrazit služby
                        </Button>
                    </div>

                    {children ? <div className="mt-10">{children}</div> : null}
                </div>

                {image ? (
                    <div className="overflow-hidden rounded-[28px] rounded-tl-[110px] shadow-[0_30px_80px_rgba(6, 26, 52, 0.12)]">
                        <img src={image} alt="" className="h-115 w-full object-cover" />
                    </div>
                ) : (
                    <div className="min-h-80 rounded-[28px] rounded-tl-[110px] bg-[#061a34]" />
                )}
            </div>
        </section>
    );
}
