import { NavLink } from "react-router-dom";
import { sidebarNavigation } from "../../constants/navigation";
import { siteConfig } from "../../constants/site";
import { Logo } from "../ui/Logo";

export function Sidebar() {
  return (
    <aside className="hidden bg-[#061a34] text-white lg:flex lg:flex-col lg:items-center lg:justify-between">
      <div className="w-full">
        <NavLink
          to="/"
          className="flex h-59.75 items-center justify-center border-b border-white/10"
        >
          <Logo variant="light" />
        </NavLink>

        <nav className="mt-8 flex flex-col gap-1 px-6">
          {sidebarNavigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.label}
                to={item.href}
                end={item.href === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-4 rounded-2xl border px-4 py-4 text-xs font-semibold transition hover:bg-white/10 ${
                    isActive
                      ? "border-[#c89750]/35 bg-white/10 text-[#f3c77f] shadow-[inset_0_0_0_1px_rgba(201,151,80,0.12)]"
                      : "border-transparent text-white/80"
                  }`
                }
              >
                {Icon ? <Icon size={17} className="text-[#d5a660]" /> : null}
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="mb-16 flex flex-col items-center">
        <p className="max-w-16 text-[10px] uppercase leading-5 tracking-[0.35em] text-white/75">
          {siteConfig.slogan}
        </p>
        <div className="mt-8 h-px w-12 bg-[#c89750]" />
      </div>
    </aside>
  );
}
