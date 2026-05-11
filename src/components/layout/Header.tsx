import { useEffect, useState } from "react";
import { IconPhone } from "@tabler/icons-react";
import { mainNavigation } from "../../constants/navigation";
import { siteConfig } from "../../constants/site";
import { cn } from "../../lib/cn";
import { Logo } from "../ui/Logo";

export function Header() {
  const [activeId, setActiveId] = useState(() =>
    typeof window === "undefined" ? "" : window.location.hash.replace("#", ""),
  );

  useEffect(() => {
    const updateFromHash = () => {
      setActiveId(window.location.hash.replace("#", ""));
    };

    const sections = mainNavigation
      .map((item) => item.href.replace("#", ""))
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleSection) {
          setActiveId(visibleSection.target.id);
        }
      },
      {
        rootMargin: "-35% 0px -50% 0px",
        threshold: [0.1, 0.35, 0.6],
      },
    );

    sections.forEach((section) => observer.observe(section));
    window.addEventListener("hashchange", updateFromHash);
    updateFromHash();

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", updateFromHash);
    };
  }, []);

  return (
    <header className="absolute left-0 right-0 top-0 z-30 flex items-center justify-between px-5 py-5 md:px-12 lg:px-16">
      <div className="lg:hidden">
        <Logo compact />
      </div>

      <nav className="hidden items-center gap-10 text-sm font-medium text-[#061a34]/75 lg:flex">
        {mainNavigation.map((item) => {
          const itemId = item.href.replace("#", "");
          const isActive = activeId === itemId;

          return (
            <a
              key={item.label}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "relative rounded-full px-1 py-2 transition after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:origin-left after:rounded-full after:bg-[#c89750] after:transition-transform after:duration-200",
                isActive
                  ? "text-[#061a34] after:scale-x-100"
                  : "hover:text-[#061a34] after:scale-x-0 hover:after:scale-x-100",
              )}
            >
              {item.label}
            </a>
          );
        })}
      </nav>

      <a
        href={siteConfig.phoneHref}
        className="ml-auto hidden items-center gap-3 rounded-full bg-[#c89750] px-8 py-4 text-sm font-semibold text-white shadow-[0_20px_50px_rgba(201,151,80,0.28)] md:flex"
      >
        <IconPhone size={16} />
        {siteConfig.phone}
      </a>
    </header>
  );
}
