import {
    IconHome,
    IconMail,
    IconNews,
    IconShieldCheck,
    IconUsersGroup,
} from "@tabler/icons-react";
import type { NavItem } from "../types/site";

export const mainNavigation: NavItem[] = [
    {
        label: "Služby",
        href: "#services",
    },
    {
        label: "O nás",
        href: "#about",
    },
    {
        label: "Proč my",
        href: "#why-us",
    },
    {
        label: "Blog",
        href: "#blog"
    },
    {
        label: "Kontakt",
        href: "#contact",
    },
];

export const sidebarNavigation: NavItem[] = [
    {
        label: "Domů",
        href: "#home",
        icon: IconHome,
    },
    {
        label: "Služby",
        href: "#services",
        icon: IconShieldCheck,
    },
    {
        label: "O nás",
        href: "#about",
        icon: IconUsersGroup,
    },
    {
        label: "Blog",
        href: "#blog",
        icon: IconNews,
    },
    {
        label: "Kontakt",
        href: "#contact",
        icon: IconMail,
    },
];
