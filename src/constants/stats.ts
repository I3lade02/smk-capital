import {
    IconAward,
    IconClock,
    IconShieldCheck,
    IconUsersGroup,
} from "@tabler/icons-react";
import type { StatItem } from "../types/site";

export const stats: StatItem[] = [
    {
        value: "15+",
        label: "let zkušeností na českém trhu",
        icon: IconAward
    },
    {
        value: "20 000+",
        label: "spokojených klientů",
        icon: IconUsersGroup
    },
    {
        value: "24 h",
        label: "rychlá reakce na vaše dotazy",
        icon: IconClock
    },
    {
        value: "Nezávislé",
        label: "poradenství na Vaší straně",
        icon: IconShieldCheck
    },
];
