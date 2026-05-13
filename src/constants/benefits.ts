import {
  IconShieldCheck,
  IconStar,
  IconUserCircle,
} from "@tabler/icons-react";
import type { BenefitItem } from "../types/site";

export const benefits: BenefitItem[] = [
  {
    title: "Osobní přístup",
    description: "Každý plán stavíme podle vaší situace.",
    icon: IconUserCircle,
  },
  {
    title: "Dlouhodobé partnerství",
    description: "Jsme tu i po podpisu smlouvy.",
    icon: IconShieldCheck,
  },
  {
    title: "Řešení na míru",
    description: "Žádné univerzální šablony, jen promyšlený návrh.",
    icon: IconStar,
  },
];