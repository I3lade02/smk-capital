import {
  IconBuildingBank,
  IconCar,
  IconCoin,
  IconHeartHandshake,
  IconHomeShield,
} from "@tabler/icons-react";
import type { ServiceItem } from "../types/site";

export const services: ServiceItem[] = [
  {
    number: "01",
    title: "Pojištění domácnosti",
    description: "Ochrana vašeho domova, majetku i odpovědnosti.",
    href: "#",
    icon: IconHomeShield,
  },
  {
    number: "02",
    title: "Pojištění vozidel",
    description: "Povinné ručení, havarijní pojištění a asistence.",
    href: "#",
    icon: IconCar,
  },
  {
    number: "03",
    title: "Hypotéky",
    description: "Chytré financování bydlení s přehledným plánem.",
    href: "#",
    icon: IconBuildingBank,
  },
  {
    number: "04",
    title: "Úvěry",
    description: "Řešení pro osobní, rodinné i podnikatelské cíle.",
    href: "#",
    icon: IconCoin,
  },
  {
    number: "05",
    title: "Životní pojištění",
    description: "Jistota pro vás i vaše blízké v těžkých chvílích.",
    href: "#",
    icon: IconHeartHandshake,
  },
];