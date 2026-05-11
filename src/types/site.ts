import type { TablerIcon } from "@tabler/icons-react";

export type NavItem = {
    label: string;
    href: string;
    icon?: TablerIcon;
};

export type ServiceItem = {
    number: string;
    title: string;
    description: string;
    href: string;
    icon: TablerIcon;
};

export type StatItem = {
    value: string;
    label: string;
    icon: TablerIcon;
};

export type BenefitItem = {
    title: string;
    description: string;
    icon: TablerIcon;
};
