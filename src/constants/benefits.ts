import {
  IconClockHour3,
  IconHeartHandshake,
  IconStar,
  IconShieldCheck,
  IconUserCircle,
} from "@tabler/icons-react";
import type { BenefitItem } from "../types/site";

export const benefits: BenefitItem[] = [
  {
    title: "Vše na jednom místě",
    description:
      "Pojištění, financování, investice i smluvní servis řešíte s jedním partnerem.",
    icon: IconShieldCheck,
  },
  {
    title: "Šetříme vám čas i energii",
    description:
      "Postaráme se o administrativu, změny i komunikaci s institucemi.",
    icon: IconClockHour3,
  },
  {
    title: "Přehled ve vašich financích",
    description:
      "Máte jasno, co kde běží, co dává smysl a co je potřeba upravit.",
    icon: IconStar,
  },
  {
    title: "Dlouhodobý servis a péče",
    description:
      "Nekončíme podpisem. Smlouvy spravujeme, hlídáme a upravujeme i dál.",
    icon: IconHeartHandshake,
  },
  {
    title: "Osobní přístup ke každému klientovi",
    description:
      "Řešení navrhujeme podle skutečné situace, ne podle univerzální šablony.",
    icon: IconUserCircle,
  },
];
