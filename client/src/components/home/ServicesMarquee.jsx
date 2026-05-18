import { serviceMarquee } from "../../data/siteContent";

const items = [...serviceMarquee, ...serviceMarquee];

export default function ServicesMarquee() {
  return (
    <section className="border-y border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl overflow-hidden px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <span className="shrink-0 rounded-full bg-red-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-red-700">
            We Provide Services
          </span>
          <div className="marquee-track flex min-w-0 gap-4 whitespace-nowrap">
            {items.map((item, index) => (
              <span
                key={`${item}-${index}`}
                className="inline-flex items-center gap-4 text-sm font-semibold text-slate-600 sm:text-base"
              >
                {item}
                <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
