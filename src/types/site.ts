import type { Icon } from "@tabler/icons-react";

export type NavItem = {
  label: string;
  href: string;
  icon?: Icon;
};

export type ServiceItem = {
  number: string;
  title: string;
  description: string;
  href: string;
  icon: Icon;
};

export type StatItem = {
  value: string;
  label: string;
  icon: Icon;
};

export type BenefitItem = {
  title: string;
  description: string;
  icon: Icon;
};