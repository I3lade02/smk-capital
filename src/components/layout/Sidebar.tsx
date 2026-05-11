import logoEdit from "../../assets/logo_edit.png";
import { sidebarNavigation } from "../../constants/navigation";
import { siteConfig } from "../../constants/site";

export function Sidebar() {
  return (
    <aside className="hidden bg-[#061a34] text-white lg:flex lg:flex-col lg:items-center lg:justify-between">
      <div className="w-full">
        <div className="flex h-80 items-center justify-center overflow-hidden border-b border-white/10">
          <div className="relative h-full w-full overflow-hidden">
            <img
              src={logoEdit}
              alt={`${siteConfig.name} logo`}
              className="absolute left-1/2 top-1/2 h-[444px] w-[296px] max-w-none -translate-x-1/2 -translate-y-[46%] object-cover object-center"
            />
          </div>
        </div>

        <nav className="mt-7 flex flex-col gap-2 px-5">
          {sidebarNavigation.map((item, index) => {
            const Icon = item.icon;

            return (
              <a
                key={item.label}
                href={item.href}
                className={`flex items-center gap-4 rounded-2xl px-5 py-4 text-sm font-semibold transition hover:bg-white/10 ${
                  index === 0 ? "text-[#d5a660]" : "text-white/80"
                }`}
              >
                {Icon ? <Icon size={20} className="text-[#d5a660]" /> : null}
                {item.label}
              </a>
            );
          })}
        </nav>
      </div>

      <div className="mb-16 flex flex-col items-center">
        <p className="max-w-28 text-center text-[11px] uppercase leading-5 tracking-[0.28em] text-white/75">
          {siteConfig.slogan}
        </p>
        <div className="mt-8 h-px w-12 bg-[#c89750]" />
      </div>
    </aside>
  );
}
