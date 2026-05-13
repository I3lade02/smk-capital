import type { ReactNode } from "react";
import { IconArrowRight } from "@tabler/icons-react";
import { cn } from "../../lib/cn";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  className?: string;
};

export function Button({
  children,
  href = "#",
  variant = "primary",
  className,
}: ButtonProps) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-3 rounded-full px-7 py-4 text-sm font-semibold transition",
        variant === "primary" &&
          "bg-[#061a34] text-white shadow-[0_18px_45px_rgba(6,26,52,0.18)] hover:bg-[#0b274b]",
        variant === "secondary" &&
          "border border-[#c89750] bg-white/40 text-[#9f7035] hover:bg-white",
        className,
      )}
    >
      {children}
      <IconArrowRight size={17} stroke={1.8} />
    </a>
  );
}
