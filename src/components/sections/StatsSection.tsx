import { stats } from "../../constants/stats";

export function StatsSection() {
  return (
    <section className="relative z-20 px-5 md:px-12 lg:px-16">
      <div className="grid gap-6 rounded-3xl bg-white/95 px-8 py-8 shadow-[0_25px_80px_rgba(6,26,52,0.11)] backdrop-blur md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.value}
              className="flex items-center gap-5 border-[#061a34]/10 xl:border-r xl:last:border-r-0"
            >
              <Icon className="shrink-0 text-[#c89750]" size={42} strokeWidth={1.4} />
              <div>
                <p className="font-serif text-4xl leading-none text-[#061a34]">
                  {stat.value}
                </p>
                <p className="mt-2 max-w-40 text-sm leading-5 text-[#061a34]/60">
                  {stat.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
