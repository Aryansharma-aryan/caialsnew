import { Link } from "react-router-dom";
import { countries } from "../../data/siteContent";
import useReveal from "../../hooks/useReveal";

export default function CountriesPreview() {
  const [sectionRef, visible] = useReveal(0.08);

  return (
    <section ref={sectionRef} className="bg-[#fffaf5] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.75s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-red-700">
              Countries We Support
            </span>
            <h2 className="mt-6 text-4xl font-black text-slate-950 sm:text-5xl">
              Immigration and visa support across major destinations.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600 sm:text-xl">
              From the United States and Canada to the UK, Australia, India,
              and Schengen countries, CAIALS helps clients move forward with a
              more confident file.
            </p>
          </div>

          <Link
            to="/countries"
            className="inline-flex w-fit items-center justify-center rounded-full border border-slate-200 bg-white px-7 py-3.5 text-sm font-bold text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50"
          >
            Explore Countries
          </Link>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {countries.map((country, index) => (
            <article
              key={country.id}
              className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-[0_20px_55px_rgba(15,23,42,0.06)]"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(26px)",
                transition: `all 0.75s cubic-bezier(0.16,1,0.3,1) ${index * 80}ms`,
              }}
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-red-700">
                  {country.region}
                </span>
                <span className="text-sm font-bold text-slate-500">
                  {country.flag}
                </span>
              </div>
              <h3 className="mt-5 text-2xl font-black text-slate-950">
                {country.name}
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                {country.summary}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
