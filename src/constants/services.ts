import {
  IconCalculator,
  IconCar,
  IconBuildingBank,
  IconCoin,
  IconPhoneCall,
  IconShieldCheck,
} from "@tabler/icons-react";
import type { QuickActionItem, ServiceCategory } from "../types/site";

export const serviceCategories: ServiceCategory[] = [
  {
    number: "01",
    title: "Pojištění",
    description:
      "Kompletní krytí pro auto, domov, rodinu i podnikání na jednom místě.",
    href: "/sluzby",
    icon: IconShieldCheck,
    items: [
      "Povinné ručení a havarijní pojištění vozidel",
      "Pojištění domácnosti a nemovitosti",
      "Životní a úrazové pojištění",
      "Cestovní pojištění",
      "Pojištění podnikatelů a firem",
      "Pojištění odpovědnosti",
      "Flotilové pojištění",
    ],
  },
  {
    number: "02",
    title: "Financování",
    description:
      "Úvěry a hypotéky nastavujeme podle vaší situace i dlouhodobého plánu.",
    href: "/sluzby",
    icon: IconBuildingBank,
    items: [
      "Spotřebitelské úvěry",
      "Hypotéky",
      "Konsolidace a refinancování",
    ],
  },
  {
    number: "03",
    title: "Investice a služby",
    description:
      "Dlouhodobá péče o finance, smlouvy i související administrativu.",
    href: "/sluzby",
    icon: IconCoin,
    items: [
      "Investice (dlouhodobé zhodnocení kapitálu)",
      "Energie (elektřina, plyn)",
      "Odhady nemovitostí",
      "Servis a správa smluv",
      "Pomoc při vymáhání pojistného plnění",
    ],
  },
];

export const quickActions: QuickActionItem[] = [
  {
    title: "Požadavek na zavolání",
    description:
      "Zanechte na sebe telefon a e-mail. Ozveme se vám obratem a domluvíme další postup.",
    label: "Chci zavolat zpět",
    href: "#contact",
    icon: IconPhoneCall,
    highlighted: true,
  },
  {
    title: "Kalkulace autopojištění",
    description:
      "Online kalkulaci připravujeme. Zatím vám nachystáme orientační nabídku podle vašich údajů.",
    label: "Poptat autopojištění",
    href: "/autopojisteni",
    icon: IconCar,
  },
  {
    title: "Kalkulace úvěru nebo hypotéky",
    description:
      "Projdeme s vámi záměr, příjmy i možnosti financování a připravíme orientační propočet.",
    label: "Poptat propočet",
    href: "/hypoteka-propocet",
    icon: IconCalculator,
  },
];
