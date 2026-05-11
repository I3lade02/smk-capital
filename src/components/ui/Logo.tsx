import { cn } from "../../lib/cn";
import { siteConfig } from "../../constants/site";

type LogoProps = {
  variant?: "light" | "dark";
  compact?: boolean;
};

export function Logo({ variant = "dark", compact = false }: LogoProps) {
  const isLight = variant === "light";

  return (
    <div className="flex flex-col items-center text-center">
      <div
        className={cn(
          "font-serif leading-none text-[#c89750]",
          compact ? "text-5xl" : "text-7xl",
        )}
      >
        A
      </div>

      <div
        className={cn(
          "mt-2 text-[10px] uppercase tracking-[0.35em]",
          isLight ? "text-white" : "text-[#061a34]",
        )}
      >
        {siteConfig.shortName}
        <br />
        Finance
      </div>
    </div>
  );
}