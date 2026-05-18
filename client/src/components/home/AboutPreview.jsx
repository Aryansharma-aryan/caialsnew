import { Link } from "react-router-dom";
import founderImage from "../../assets/founder.jpeg";
import { founderProfile, values } from "../../data/siteContent";
import useReveal from "../../hooks/useReveal";

export default function AboutPreview() {
  const [sectionRef, visible] = useReveal(0.08);

  return (
    <section ref={sectionRef} className="bg-white py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div
          className="lg:col-span-5"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.75s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-[#fffaf5] shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
            <img
              src={founderImage}
              alt="Founder Kanwal Kaur"
              className="h-[440px] w-full object-cover object-top"
            />
            <div className="border-t border-slate-200 p-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-700">
                Founder Spotlight
              </p>
              <h3 className="mt-2 text-3xl font-black text-slate-950">
                {founderProfile.name}
              </h3>
              <p className="mt-1 text-base font-semibold text-slate-600">
                {founderProfile.title}
              </p>
            </div>
          </div>
        </div>

        <div
          className="lg:col-span-7"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(28px)",
            transition: "all 0.75s cubic-bezier(0.16,1,0.3,1) 120ms",
          }}
        >
          <span className="inline-flex rounded-full border border-slate-200 bg-[#fffaf5] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-red-700">
            About CAIALS
          </span>
          <h2 className="mt-6 text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
            Honest immigration support with a real founder-led presence.
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-600 sm:text-xl">
            {founderProfile.summary} Clients come to CAIALS for trustworthy
            support in tourist visa, study visa, passport renew service, PR,
            DS-260 immigration visa, and family-based matters.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="rounded-3xl border border-slate-200 bg-[#fffdf9] p-5 shadow-sm"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(18px)",
                  transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${200 + index * 70}ms`,
                }}
              >
                <h3 className="text-xl font-black text-slate-950">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/about"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-7 py-3.5 text-sm font-bold text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50"
            >
              Read About CAIALS
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-red-700 to-orange-500 px-7 py-3.5 text-sm font-bold text-white shadow-[0_16px_36px_rgba(220,38,38,0.18)] transition-all hover:-translate-y-0.5 hover:brightness-105"
            >
              Speak With Our Team
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
