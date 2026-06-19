import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";
import { pageNavigation } from "../../constants/navigation";

export function PageNavigation() {
  const { pathname } = useLocation();
  const currentIndex = pageNavigation.findIndex((item) => item.href === pathname);
  const activeIndex = currentIndex >= 0 ? currentIndex : 0;
  const previous =
    pageNavigation[
      (activeIndex - 1 + pageNavigation.length) % pageNavigation.length
    ];
  const next = pageNavigation[(activeIndex + 1) % pageNavigation.length];

  return (
    <nav
      aria-label="Navigace mezi stránkami"
      className="bg-white px-5 py-10 md:px-12 lg:px-16"
    >
      <div className="flex flex-col gap-4 border-t border-[#061a34]/10 pt-10 sm:flex-row sm:items-stretch sm:justify-between">
        <Link
          to={previous.href}
          className="group flex min-h-24 flex-1 items-center gap-4 rounded-3xl border border-[#061a34]/10 bg-[var(--section-bg)] px-6 py-5 text-[#061a34] transition hover:-translate-y-1 hover:border-[#c89750]/35 hover:bg-[#fbf8f3] hover:shadow-[0_18px_45px_rgba(6,26,52,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c89750]/45 focus-visible:ring-offset-4 focus-visible:ring-offset-white"
        >
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-[#c89750] shadow-[0_12px_28px_rgba(6,26,52,0.08)] transition group-hover:-translate-x-1">
            <IconArrowLeft size={19} strokeWidth={1.9} aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block text-xs font-bold uppercase tracking-[0.22em] text-[#9f7035]">
              Předchozí stránka
            </span>
            <span className="mt-2 block font-serif text-2xl leading-tight">
              {previous.label}
            </span>
          </span>
        </Link>

        <Link
          to={next.href}
          className="group flex min-h-24 flex-1 items-center justify-end gap-4 rounded-3xl border border-[#061a34]/10 bg-[#061a34] px-6 py-5 text-right text-white shadow-[0_18px_45px_rgba(6,26,52,0.12)] transition hover:-translate-y-1 hover:bg-[#0b274b] hover:shadow-[0_24px_58px_rgba(6,26,52,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c89750]/45 focus-visible:ring-offset-4 focus-visible:ring-offset-white"
        >
          <span className="min-w-0">
            <span className="block text-xs font-bold uppercase tracking-[0.22em] text-[#d7b174]">
              Další stránka
            </span>
            <span className="mt-2 block font-serif text-2xl leading-tight">
              {next.label}
            </span>
          </span>
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-[#d7b174] transition group-hover:translate-x-1">
            <IconArrowRight size={19} strokeWidth={1.9} aria-hidden="true" />
          </span>
        </Link>
      </div>
    </nav>
  );
}
