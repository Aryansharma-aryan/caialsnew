import { testimonials } from "../../data/siteContent";
import useReveal from "../../hooks/useReveal";

export default function Testimonial() {
  const [sectionRef, visible] = useReveal(0.08);

  return (
    <section id="testimonials" ref={sectionRef} className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="mx-auto max-w-3xl text-center"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(22px)",
            transition: "all 0.75s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <span className="inline-flex rounded-full border border-slate-200 bg-[#fffaf5] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-red-700">
            Testimonials
          </span>
          <h2 className="mt-6 text-4xl font-black text-slate-950 sm:text-5xl">
            Real names. Real services. Real client confidence.
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600 sm:text-xl">
            Testimonials now cover passport renew service, study visa, tourist
            visa service, DS-260 immigration visa, PR, and broader immigration
            support with better visibility on the page.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((item, index) => (
            <article
              key={item.name}
              className="rounded-[26px] border border-slate-200 bg-[#fffdfa] p-6 shadow-[0_20px_55px_rgba(15,23,42,0.06)]"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(26px)",
                transition: `all 0.75s cubic-bezier(0.16,1,0.3,1) ${index * 80}ms`,
              }}
            >
              <div className={`mb-5 h-1 w-20 rounded-full ${item.accent}`} />
              <p className="text-base leading-8 text-slate-600">{item.quote}</p>

              <div className="mt-6 border-t border-slate-200 pt-4">
                <p className="text-lg font-black text-slate-950">{item.name}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                  {item.service}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
