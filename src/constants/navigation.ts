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
