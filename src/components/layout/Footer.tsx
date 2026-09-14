import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTiktok,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { siteConfig } from "../../constants/site";
import { serviceCategories } from "../../constants/services";
import { Logo } from "../ui/Logo";

const socialLinks = [
  {
    label: "Facebook",
    icon: IconBrandFacebook,
    href: "/nenalezeno",
    external: false,
  },
  {
    label: "Instagram",
    icon: IconBrandInstagram,
    href: "https://www.instagram.com/smk.capital",
    external: true,
  },
  {
    label: "LinkedIn",
    icon: IconBrandLinkedin,
    href: "https://www.linkedin.com/in/smk-capital-b4394541b",
    external: true,
  },
  {
    label: "TikTok",
    icon: IconBrandTiktok,
    href: "/nenalezeno",
    external: false,
  },
];

const socialLinkClassName =
  "flex size-10 items-center justify-center rounded-full bg-[#061a34] text-white transition hover:bg-[#c89750]";

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
            {serviceCategories.map((service) => (
              <li key={service.title}>
                <Link to={service.href}>{service.title}</Link>
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
              const icon = (
                <Icon size={19} strokeWidth={1.8} aria-hidden="true" />
              );

              if (social.external) {
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={socialLinkClassName}
                  >
                    {icon}
                  </a>
                );
              }

              return (
                <Link
                  key={social.label}
                  to={social.href}
                  aria-label={`${social.label} – stránka zatím není dostupná`}
                  className={socialLinkClassName}
                >
                  {icon}
                </Link>
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
