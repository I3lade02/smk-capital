import { IconArrowRight } from "@tabler/icons-react";
import { images } from "../../constants/site";
import { services } from "../../constants/services";
import { SectionKicker } from "../ui/SectionKicker";

export function ServicesSection() {
  return (
    <section id="services" className="relative bg-[#fbfaf7] px-5 pb-20 md:px-12 lg:px-16">
      <div className="grid gap-8 xl:grid-cols-[260px_1fr]">
        <div className="overflow-hidden rounded-[28px] rounded-tr-[90px] bg-white shadow-[0_25px_70px_rgba(6,26,52,0.1)]">
          <img
            src={images.car}
            alt="Luxusní automobil před domem"
            className="h-72 w-full object-cover"
          />

          <div className="p-8">
            <SectionKicker>Naše služby</SectionKicker>
            <h2 className="font-serif text-4xl leading-tight">
              Komplexní řešení pro váš klid
            </h2>
            <a
              href="#"
              className="mt-8 inline-flex items-center gap-3 text-sm font-semibold text-[#c89750]"
            >
              Zobrazit všechny služby
              <IconArrowRight size={16} />
            </a>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <a
                key={service.number}
                href={service.href}
                className="group min-h-72 rounded-3xl bg-white p-8 shadow-[0_22px_55px_rgba(6,26,52,0.1)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_30px_75px_rgba(6,26,52,0.16)]"
              >
                <p className="font-serif text-2xl text-[#c89750]">
                  {service.number}
                </p>

                <Icon className="mt-8 text-[#c89750]" size={42} strokeWidth={1.4} />

                <h3 className="mt-7 font-serif text-2xl leading-tight">
                  {service.title}
                </h3>

                <p className="mt-4 text-sm leading-6 text-[#061a34]/60">
                  {service.description}
                </p>

                <IconArrowRight
                  className="mt-8 text-[#c89750] transition group-hover:translate-x-2"
                  size={18}
                />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
