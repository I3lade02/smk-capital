import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
} from "@tabler/icons-react";
import { siteConfig } from "../../constants/site";
import { services } from "../../constants/services";
import { Logo } from "../ui/Logo";

const socialLinks = [
  {
    label: "Facebook",
    icon: IconBrandFacebook,
    href: "#",
  },
  {
    label: "Instagram",
    icon: IconBrandInstagram,
    href: "#",
  },
  {
    label: "LinkedIn",
    icon: IconBrandLinkedin,
    href: "#",
  },
];

export function Footer() {
  return (
    <footer className="bg-white px-5 py-10 md:px-12 lg:px-16">
      <div className="grid gap-10 border-t border-[#061a34]/10 pt-10 md:grid-cols-[220px_1fr_1fr_1fr]">
        <div>
          <Logo compact />
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold">Služby</h3>
          <ul className="space-y-2 text-sm text-[#061a34]/65">
            {services.map((service) => (
              <li key={service.title}>
                <a href={service.href}>{service.title}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold">Kontakt</h3>
          <div className="space-y-2 text-sm text-[#061a34]/65">
            <p>{siteConfig.phone}</p>
            <p>{siteConfig.email}</p>
            {siteConfig.address.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold">Sledujte nás</h3>

          <div className="flex gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;

              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex size-10 items-center justify-center rounded-full bg-[#061a34] text-white transition hover:bg-[#c89750]"
                >
                  <Icon size={19} strokeWidth={1.8} aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-3 border-t border-[#061a34]/10 pt-6 text-xs text-[#061a34]/50 md:flex-row md:items-center md:justify-between">
        <p>© 2026 {siteConfig.name}. Všechna práva vyhrazena.</p>

        <div className="flex gap-6">
          <a href="#">Ochrana osobních údajů</a>
          <a href="#">Obchodní podmínky</a>
        </div>
      </div>
    </footer>
  );
}
