import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { serviceLinks, servicePages } from "../../data/seoContent";

export function AnimatedImmigrationBackdrop() {
  return (
    <div className="cinematic-bg" aria-hidden="true">
      <div className="flight-path" />
      <div className="absolute left-[8%] top-[18%] hidden rounded-2xl border border-white/70 bg-white/60 px-5 py-4 text-sm font-bold text-slate-700 shadow-xl backdrop-blur md:block">
        Visa file review
      </div>
      <div className="absolute right-[10%] top-[22%] hidden rounded-2xl border border-white/70 bg-white/70 px-5 py-4 text-sm font-bold text-slate-700 shadow-xl backdrop-blur lg:block">
        Fremont to worldwide
      </div>
      <div className="absolute bottom-[16%] left-[18%] hidden rounded-2xl border border-white/70 bg-white/70 px-5 py-4 text-sm font-bold text-slate-700 shadow-xl backdrop-blur md:block">
        Documents organized
      </div>
    </div>
  );
}

export function ServiceMarquee() {
  const repeated = [...serviceLinks, ...serviceLinks];
  return (
    <div className="overflow-hidden border-y border-slate-200 bg-white/78 py-4">
      <div className="marquee-track gap-3">
        {repeated.map((link, index) => (
          <Link
            key={`${link.path}-${index}`}
            to={link.path}
            className="rounded-full border border-slate-200 bg-slate-50 px-5 py-2 text-sm font-bold text-slate-700 hover:border-red-200 hover:bg-red-50 hover:text-red-700"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function ProcessTracker({ compact = false }) {
  const steps = [
    ["01", "Consultation", "Your goal, destination, timeline, and current documents are reviewed."],
    ["02", "Document Checklist", "CAIALS creates a practical checklist for the selected service."],
    ["03", "Preparation", "Forms and evidence are organized into a clean, reviewable file."],
    ["04", "Quality Review", "Names, dates, document order, and missing items are checked."],
    ["05", "Tracking", "You understand notices, interview prep, and next follow-up steps."],
  ];

  return (
    <div className={`process-line ${compact ? "space-y-4" : "space-y-5"}`}>
      {steps.map(([number, title, text], index) => (
        <article
          key={number}
          className="premium-card reveal-up relative rounded-2xl p-5 pl-20"
          style={{ animationDelay: `${index * 90}ms` }}
        >
          <div className="process-dot absolute left-5 top-6 flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
            {number}
          </div>
          <h3 className="text-lg font-extrabold text-slate-950">{title}</h3>
          <p className="premium-text mt-2 text-sm">{text}</p>
        </article>
      ))}
    </div>
  );
}

export function DocumentPrepPanel({ serviceName = "Immigration Service" }) {
  const [files, setFiles] = useState([]);
  const required = [
    "Passport / ID",
    "Application history",
    "Civil documents",
    "Financial or support evidence",
    "Photos / translations",
  ];

  const progress = Math.min(100, Math.round((files.length / required.length) * 100));

  return (
    <section className="premium-card rounded-[1.5rem] p-6">
      <p className="section-kicker">Document preparation</p>
      <h2 className="mt-3 text-2xl font-extrabold text-slate-950">{serviceName} document workspace</h2>
      <p className="premium-text mt-3 text-sm">
        This preview helps clients understand the type of organized document workflow CAIALS uses.
        Files selected here stay in the browser preview and are not submitted until a formal request
        is reviewed.
      </p>

      <label className="mt-5 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-red-200 bg-red-50/60 px-5 py-8 text-center transition hover:border-red-300 hover:bg-red-50">
        <span className="text-sm font-extrabold text-red-700">Select documents for preparation preview</span>
        <span className="mt-1 text-xs font-medium text-slate-500">PDF, JPG, PNG, DOC files</span>
        <input
          type="file"
          multiple
          className="hidden"
          onChange={(event) => setFiles(Array.from(event.target.files || []))}
        />
      </label>

      <div className="mt-5">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500">
          <span>Preparation progress</span>
          <span>{progress}%</span>
        </div>
        <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-gradient-to-r from-red-600 to-blue-800 transition-all duration-700" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="mt-5 grid gap-2">
        {required.map((item, index) => (
          <div key={item} className="flex items-center justify-between rounded-xl bg-white px-4 py-3 ring-1 ring-slate-200">
            <span className="text-sm font-semibold text-slate-700">{item}</span>
            <span className={`rounded-full px-3 py-1 text-xs font-bold ${files.length > index ? "bg-green-50 text-green-700" : "bg-slate-100 text-slate-500"}`}>
              {files.length > index ? "Ready" : "Pending"}
            </span>
          </div>
        ))}
      </div>

      {files.length > 0 && (
        <div className="mt-5 rounded-2xl bg-slate-950 p-4 text-white">
          <p className="text-xs font-bold uppercase tracking-wide text-white/50">Selected files</p>
          <ul className="mt-3 space-y-2">
            {files.map((file) => (
              <li key={`${file.name}-${file.size}`} className="truncate text-sm font-medium text-white/80">
                {file.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

export function SearchableFaq({ faqs, title }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return faqs;
    return faqs.filter(([question, answer]) => `${question} ${answer}`.toLowerCase().includes(q));
  }, [faqs, query]);

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="section-kicker">FAQ</p>
          <h2 className="premium-title mt-3 text-4xl">{title}</h2>
        </div>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search questions..."
          className="w-full rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold outline-none focus:border-red-300 focus:ring-4 focus:ring-red-100 md:max-w-sm"
        />
      </div>
      <div className="mt-8 space-y-4">
        {filtered.map(([question, answer]) => (
          <section key={question} className="premium-card hover-lift rounded-2xl p-6">
            <h3 className="text-xl font-bold text-slate-950">{question}</h3>
            <p className="premium-text mt-3">{answer}</p>
          </section>
        ))}
      </div>
    </div>
  );
}

export function ServiceSearchDirectory() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return servicePages;
    return servicePages.filter((service) =>
      [service.title, service.shortTitle, service.metaDescription, service.keywords, service.intro]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [query]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="section-kicker">Search services</p>
          <h2 className="premium-title mt-3 text-4xl sm:text-5xl">Find the right immigration service</h2>
          <p className="premium-text mt-4 max-w-3xl">
            Search by country, document, visa type, or goal. Every result links to a detailed
            service page with FAQs, process details, and documentation guidance.
          </p>
        </div>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search: OCI, student visa, Canada PR..."
          className="w-full rounded-full border border-slate-200 bg-white px-5 py-4 text-sm font-semibold text-slate-900 shadow-sm outline-none focus:border-red-300 focus:ring-4 focus:ring-red-100 md:max-w-md"
        />
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((service, index) => (
          <Link
            key={service.slug}
            to={`/${service.slug}`}
            className="premium-card hover-lift reveal-up rounded-[1.5rem] p-6"
            style={{ animationDelay: `${index * 45}ms` }}
          >
            <p className="text-xs font-black uppercase tracking-[0.14em] text-red-700">
              {service.shortTitle}
            </p>
            <h3 className="mt-3 text-2xl font-extrabold text-slate-950">{service.title}</h3>
            <p className="premium-text mt-3 text-sm">{service.metaDescription}</p>
            <span className="mt-5 inline-flex rounded-full bg-red-50 px-4 py-2 text-sm font-bold text-red-700">
              Open detailed page
            </span>
          </Link>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="mt-8 rounded-[1.5rem] border border-dashed border-slate-300 bg-white p-8 text-center">
          <p className="text-lg font-bold text-slate-900">No matching service found.</p>
          <p className="premium-text mt-2 text-sm">Try a broader term such as “visa”, “passport”, “family”, or “Canada”.</p>
        </div>
      )}
    </section>
  );
}

export function CountryCarousel() {
  const cards = [
    ["USA", "Family immigration, green cards, citizenship, visitor, business, student, and religious visa support."],
    ["India", "OCI card, Indian passport assistance, India visa, and Indian consular documentation."],
    ["Canada", "Visitor visa, study visa, Canada PR, and documentation planning."],
    ["UK", "Visitor, study, family visa, and travel documentation support."],
    ["Bay Area", "Fremont, Newark, Union City, Hayward, Milpitas, San Jose, and nearby areas."],
  ];

  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex min-w-max gap-5">
        {cards.map(([country, text], index) => (
          <article key={country} className="premium-card hover-lift reveal-up w-80 rounded-[1.5rem] p-6" style={{ animationDelay: `${index * 80}ms` }}>
            <p className="section-kicker">{country}</p>
            <h3 className="mt-3 text-3xl font-extrabold text-slate-950">{country} Services</h3>
            <p className="premium-text mt-4 text-sm">{text}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
