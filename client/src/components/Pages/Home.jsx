import { Link } from "react-router-dom";
import SEO, { breadcrumbSchema } from "../SEO/SEO";
import {
  businessName,
  officeLocations,
  phone,
  phoneHref,
  servicePages,
} from "../../data/seoContent";
import { ServiceMarquee } from "../Premium/DynamicBlocks";

const highlights = [
  ["01", "Choose a service", "Explore a clear page for the visa, immigration, passport, or OCI support you need."],
  ["02", "Plan your documents", "Understand the materials commonly reviewed before you begin your file."],
  ["03", "Move forward prepared", "Request a consultation when you are ready to discuss your next steps."],
];

const trustPoints = ["Clear service explanations", "Two California office locations", "Document-focused preparation", "Support for USA and India clients"];

function Arrow() {
  return <span aria-hidden="true" className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-red-50 text-lg text-red-700 transition group-hover:translate-x-1 group-hover:bg-red-600 group-hover:text-white">→</span>;
}

export default function Home() {
  return (
    <main className="premium-shell overflow-hidden text-slate-900">
      <SEO
        title="Immigration Consultant in Fremont, CA | CAIALS Immigration Services"
        description="CAIALS Immigration Services provides clear, document-focused support for immigration, visas, OCI, Indian passport, India visa, UK visa, Canada visa, and Canada PR matters."
        keywords="immigration consultant Fremont, visa consultant Tracy CA, visa services Bay Area, family immigration, OCI, Indian passport assistance"
        schema={[breadcrumbSchema([{ name: "Home", path: "/" }])]}
      />

      <section className="relative isolate border-b border-slate-200 bg-[#fbfcfe]">
        <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
          <div className="absolute -left-28 -top-28 h-96 w-96 rounded-full bg-red-100/70 blur-3xl" />
          <div className="absolute -right-32 top-20 h-[28rem] w-[28rem] rounded-full bg-blue-100/60 blur-3xl" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-red-200 to-transparent" />
        </div>
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.08fr_.92fr] lg:px-8 lg:py-24">
          <div className="reveal-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[.14em] text-red-700 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-red-600" /> Immigration & visa support
            </div>
            <h1 className="premium-title mt-6 max-w-4xl text-5xl sm:text-6xl lg:text-7xl">
              Your next chapter deserves a <span className="hero-word">clear path.</span>
            </h1>
            <p className="premium-text mt-6 max-w-2xl text-lg">
              {businessName} helps families, students, visitors, and Indian-origin clients prepare organised documentation with calm guidance and realistic next steps.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/consultation" className="premium-button px-7 py-3.5 text-center text-sm font-bold">Request a consultation</Link>
              <Link to="/services" className="soft-button px-7 py-3.5 text-center text-sm font-bold">Find your service</Link>
            </div>
            <div className="mt-10 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
              {trustPoints.map((point) => <div key={point} className="flex items-start gap-2 text-sm font-semibold leading-5 text-slate-700"><span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-red-600" />{point}</div>)}
            </div>
          </div>

          <aside className="reveal-up relative rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_28px_70px_rgba(15,23,42,.12)] sm:p-7" style={{ animationDelay: "120ms" }}>
            <div className="flex items-center justify-between border-b border-slate-100 pb-5">
              <div><p className="section-kicker">Start here</p><h2 className="mt-2 text-2xl font-bold text-slate-950">What do you need help with?</h2></div>
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-xl text-white">✦</span>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {servicePages.slice(0, 6).map((service) => (
                <Link key={service.slug} to={`/${service.slug}`} className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-800 transition hover:border-red-200 hover:bg-white hover:text-red-700">
                  <span>{service.shortTitle}</span><Arrow />
                </Link>
              ))}
            </div>
            <Link to="/services" className="mt-5 flex items-center justify-between rounded-2xl bg-red-50 px-5 py-4 text-sm font-bold text-red-800 transition hover:bg-red-100">View every service <span>→</span></Link>
          </aside>
        </div>
      </section>

      <ServiceMarquee />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl"><p className="section-kicker">The CAIALS approach</p><h2 className="premium-title mt-3 text-4xl sm:text-5xl">Less confusion. More confidence at every step.</h2><p className="premium-text mt-5 text-lg">We make a complex process feel more manageable by explaining the service, preparing a practical document plan, and helping you understand what comes next.</p></div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {highlights.map(([number, title, text], index) => <article key={number} className="premium-card reveal-up rounded-[1.5rem] p-7" style={{ animationDelay: `${index * 90}ms` }}><p className="text-sm font-bold text-red-700">{number}</p><h3 className="mt-7 text-2xl font-bold text-slate-950">{title}</h3><p className="premium-text mt-3 text-sm">{text}</p><div className="mt-7 h-px w-full bg-gradient-to-r from-red-200 to-transparent" /></article>)}
        </div>
      </section>

      <section className="bg-slate-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[.8fr_1.2fr] lg:px-8">
          <div><p className="text-xs font-bold uppercase tracking-[.16em] text-red-300">Services, clearly organised</p><h2 className="mt-4 text-4xl font-bold leading-tight">Choose a service, then see the details.</h2><p className="mt-5 max-w-md leading-7 text-white/70">Each route takes you to a dedicated page with service coverage, preparation guidance, FAQs, and the next action to take.</p><Link to="/services" className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-red-50">Search all services</Link></div>
          <div className="grid gap-3 sm:grid-cols-2">
            {servicePages.map((service, index) => <Link key={service.slug} to={`/${service.slug}`} className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[.06] p-5 transition hover:-translate-y-1 hover:border-red-400/50 hover:bg-white/[.1]"><div><p className="text-xs font-bold text-red-300">SERVICE {String(index + 1).padStart(2, "0")}</p><h3 className="mt-2 text-lg font-bold text-white">{service.shortTitle}</h3></div><span className="text-xl text-red-300 transition group-hover:translate-x-1">→</span></Link>)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-7 sm:p-10"><p className="section-kicker">Local support, broader reach</p><h2 className="premium-title mt-3 text-4xl">Visit us in Fremont or Tracy.</h2><p className="premium-text mt-5 max-w-xl">Our offices serve the Bay Area and Central Valley, while we also support eligible clients across the USA and India.</p><div className="mt-8 grid gap-4 sm:grid-cols-2">{officeLocations.map((office) => <article key={office.name} className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200"><p className="font-bold text-slate-950">{office.name}</p><p className="mt-2 text-sm leading-6 text-slate-600">{office.address}</p></article>)}</div><Link to="/contact" className="mt-8 inline-flex text-sm font-bold text-red-700 hover:text-red-900">View office details and directions →</Link></div>
          <aside className="rounded-[2rem] bg-red-700 p-7 text-white sm:p-10"><p className="text-xs font-bold uppercase tracking-[.16em] text-red-100">Speak with CAIALS</p><h2 className="mt-3 text-3xl font-bold leading-tight">Start with a conversation, not a guess.</h2><p className="mt-5 leading-7 text-white/80">Tell us your destination and goal. We will direct you to the right service and help you understand the preparation process.</p><div className="mt-8 grid gap-3"><Link to="/consultation" className="rounded-full bg-white px-6 py-3 text-center text-sm font-bold text-red-700 transition hover:bg-red-50">Request consultation</Link><a href={phoneHref} className="rounded-full border border-white/35 px-6 py-3 text-center text-sm font-bold text-white transition hover:bg-white/10">Call {phone}</a></div></aside>
        </div>
      </section>
    </main>
  );
}
