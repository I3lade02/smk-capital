import {
  IconHome,
  IconShieldCheck,
  IconUsersGroup,
} from "@tabler/icons-react";
import type { NavItem } from "../types/site";

export const sidebarNavigation: NavItem[] = [
  {
    label: "Domů",
    href: "/",
    icon: IconHome,
  },
  {
    label: "Služby",
    href: "/sluzby",
    icon: IconShieldCheck,
  },
  {
    label: "O nás",
    href: "/o-nas",
    icon: IconUsersGroup,
  },
];

export const pageNavigation = [
  {
    label: "Domů",
    href: "/",
  },
  {
    label: "Služby",
    href: "/sluzby",
  },
  {
    label: "Revize smluv",
    href: "/revize-smluv",
  },
  {
    label: "Autopojištění",
    href: "/autopojisteni",
  },
  {
    label: "Hypoteční propočet",
    href: "/hypoteka-propocet",
  },
  {
    label: "O nás",
    href: "/o-nas",
  },
];
