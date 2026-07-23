import { Link } from "react-router-dom";
import SEO, { breadcrumbSchema } from "../SEO/SEO";
import { serviceLinks } from "../../data/seoContent";
import { AnimatedImmigrationBackdrop, DocumentPrepPanel, ServiceMarquee } from "../Premium/DynamicBlocks";

const checklists = [
  ["Identity", "Passport, visa history, IDs, photos, and prior immigration records."],
  ["Family Records", "Birth certificates, marriage certificates, divorce records, adoption or relationship evidence when applicable."],
  ["Financial Evidence", "Bank statements, income proof, employment letters, tax documents, sponsor documents, or school funding records."],
  ["Travel and Purpose", "Travel itinerary, invitation letters, admission letters, business purpose, or family visit details."],
  ["India Documents", "OCI, Indian passport, India visa, PCC, surrender certificate, and consular support documents."],
];

export default function DocumentChecklist() {
  return (
    <main className="premium-shell text-slate-900">
      <SEO
        title="Immigration Document Checklist Fremont CA | CAIALS"
        description="CAIALS document checklist for immigration, visa, OCI, Indian passport, India visa, student visa, green card, UK visa, Canada visa, and Canada PR preparation."
        keywords="immigration document checklist Fremont, visa documents Fremont, OCI documents Fremont"
        schema={[breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Document Checklist", path: "/document-checklist" }])]}
      />
      <section className="relative overflow-hidden">
        <AnimatedImmigrationBackdrop />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="section-kicker">Document checklist</p>
          <h1 className="premium-title mt-4 max-w-5xl text-6xl sm:text-7xl">
            Prepare documents before your immigration consultation
          </h1>
          <p className="premium-text mt-6 max-w-3xl text-lg">
            Use this page to understand common document categories. Exact requirements depend on
            the service, country, agency, and case facts.
          </p>
        </div>
      </section>
      <ServiceMarquee />
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
        <div className="space-y-4">
          {checklists.map(([title, text]) => (
            <article key={title} className="premium-card hover-lift rounded-2xl p-6">
              <h2 className="text-2xl font-extrabold text-slate-950">{title}</h2>
              <p className="premium-text mt-3">{text}</p>
            </article>
          ))}
        </div>
        <DocumentPrepPanel serviceName="General consultation" />
      </section>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="section-kicker">Choose service</p>
          <h2 className="premium-title mt-3 text-4xl">Open a detailed service page</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {serviceLinks.map((link) => (
              <Link key={link.path} to={link.path} className="rounded-2xl bg-slate-50 p-5 text-sm font-bold text-red-700 ring-1 ring-slate-200 hover:bg-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
