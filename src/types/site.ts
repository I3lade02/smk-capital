import type { Icon } from "@tabler/icons-react";

export type NavItem = {
  label: string;
  href: string;
  icon?: Icon;
};

export type ServiceCategory = {
  number: string;
  title: string;
  description: string;
  href: string;
  icon: Icon;
  items: string[];
};

export type QuickActionItem = {
  title: string;
  description: string;
  label: string;
  href: string;
  icon: Icon;
  highlighted?: boolean;
};

export type ProcessStepItem = {
  number: string;
  title: string;
  description: string;
};

export type BenefitItem = {
  title: string;
  description: string;
  icon: Icon;
};
