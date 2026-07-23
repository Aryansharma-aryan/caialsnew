import { Link, Navigate, useParams } from "react-router-dom";
import SEO, { breadcrumbSchema, faqSchema } from "../SEO/SEO";
import {
  businessName,
  email,
  officeLocations,
  phone,
  phoneHref,
  serviceLinks,
  servicePages,
  siteUrl,
} from "../../data/seoContent";
import {
  AnimatedImmigrationBackdrop,
  DocumentPrepPanel,
  ProcessTracker,
  SearchableFaq,
  ServiceMarquee,
} from "../Premium/DynamicBlocks";

const commonDocuments = [
  "Passport and identity documents",
  "Current immigration or visa records",
  "Civil documents such as birth, marriage, or divorce records when applicable",
  "Financial, employment, admission, travel, or family evidence based on the service",
  "Translations, photos, and government-specific supporting materials when required",
];

export default function ServicePage() {
  const { slug } = useParams();
  const service = servicePages.find((item) => item.slug === slug);

  if (!service) return <Navigate to="/services" replace />;

  const related = serviceLinks.filter((link) => link.path !== `/${service.slug}`);

  return (
    <main className="premium-shell text-slate-900">
      <SEO
        title={service.metaTitle}
        description={service.metaDescription}
        keywords={service.keywords}
        schema={[
          faqSchema(service.faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.shortTitle, path: `/${service.slug}` },
          ]),
        ]}
      />

      <section className="relative overflow-hidden">
        <AnimatedImmigrationBackdrop />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-slate-500">
          <Link to="/" className="hover:text-red-700">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/services" className="hover:text-red-700">Services</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-800">{service.shortTitle}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          <div>
            <p className="section-kicker">{service.keywords}</p>
            <h1 className="premium-title mt-4 max-w-5xl text-6xl sm:text-7xl">{service.title}</h1>
            <p className="premium-text mt-6 max-w-3xl text-lg">{service.intro}</p>
            <p className="premium-text mt-4 max-w-3xl">
              This service is designed for clients who want clear guidance, organized paperwork,
              and a realistic understanding of the preparation process. CAIALS focuses on accurate
              documentation and professional support while government agencies make the final
              decisions.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/consultation" className="premium-button px-7 py-3 text-center text-sm font-bold">
                Start this service
              </Link>
              <a href={phoneHref} className="soft-button px-7 py-3 text-center text-sm font-bold">
                Call {phone}
              </a>
            </div>
          </div>

          <aside className="premium-card rounded-[1.5rem] p-6">
            <h2 className="text-xl font-bold text-slate-950">CAIALS Office</h2>
            <p className="premium-text mt-4 text-sm">
              <strong>{businessName}</strong><br />
              {officeLocations.map((office) => <span key={office.name}><strong>{office.name}:</strong> {office.address}<br /></span>)}
              Website: <a className="text-red-700" href={siteUrl}>{siteUrl}</a><br />
              Email: <a className="text-red-700" href={`mailto:${email}`}>{email}</a>
            </p>
            <div className="mt-6 rounded-2xl bg-slate-950 p-5 text-white">
              <p className="text-sm font-semibold text-white/60">Serving</p>
              <p className="mt-2 text-sm leading-6">Fremont, nearby Bay Area, USA, and Indian clients.</p>
            </div>
          </aside>
        </div>
        </div>
      </section>

      <ServiceMarquee />

      <section className="premium-band">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="section-kicker">What this service includes</p>
            <h2 className="premium-title mt-3 text-4xl">Detailed support areas</h2>
            <p className="premium-text mt-5">
              CAIALS explains the service in plain language and helps clients understand the
              documents, forms, timing, and preparation steps that may apply to their situation.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {service.services.map((item, index) => (
              <article key={item} className="premium-card reveal-up rounded-2xl p-5" style={{ animationDelay: `${index * 80}ms` }}>
                <p className="text-sm font-bold text-red-700">Support {index + 1}</p>
                <h3 className="mt-2 text-lg font-bold text-slate-950">{item}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
        <div>
          <p className="section-kicker">Process and tracking</p>
          <h2 className="premium-title mt-3 text-4xl">How CAIALS helps you move through the process</h2>
          <p className="premium-text mt-5">
            The exact government timeline depends on the visa or immigration category, agency
            workload, and case facts. CAIALS keeps the preparation process organized so clients know
            what has been gathered, what still needs review, and what comes next.
          </p>
        </div>
          <ProcessTracker />
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
          <div>
            <p className="section-kicker">Documents</p>
            <h2 className="premium-title mt-3 text-4xl">Common documents clients should prepare</h2>
            <p className="premium-text mt-5">
              Requirements vary by service and by government agency, but these are common document
              categories CAIALS may review during preparation.
            </p>
          </div>
          <ul className="space-y-3">
            {commonDocuments.map((item) => (
              <li key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-700">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="premium-band">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <DocumentPrepPanel serviceName={service.shortTitle} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
          <div>
            <SearchableFaq faqs={service.faqs} title={`Questions about ${service.shortTitle}`} />
          </div>
          <aside className="premium-card h-fit rounded-[1.5rem] p-6">
            <h2 className="text-xl font-bold text-slate-950">Related service pages</h2>
            <ul className="mt-5 space-y-3">
              {related.slice(0, 9).map((link) => (
                <li key={link.path}>
                  <Link className="text-sm font-bold text-red-700 hover:text-red-900" to={link.path}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </main>
  );
}
