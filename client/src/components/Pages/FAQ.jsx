import { Link } from "react-router-dom";
import SEO, { breadcrumbSchema, faqSchema } from "../SEO/SEO";
import { serviceLinks, servicePages } from "../../data/seoContent";
import { AnimatedImmigrationBackdrop, SearchableFaq, ServiceMarquee } from "../Premium/DynamicBlocks";

const allFaqs = servicePages.flatMap((service) =>
  service.faqs.map(([question, answer]) => [`${service.shortTitle}: ${question}`, answer])
);

export default function FAQ() {
  return (
    <main className="premium-shell text-slate-900">
      <SEO
        title="Immigration FAQ Fremont CA | CAIALS"
        description="Frequently asked questions about immigration, visa, OCI, Indian passport, India visa, student visa, green card, UK visa, Canada visa, and Canada PR support in Fremont."
        keywords="immigration FAQ Fremont CA, visa questions Fremont, OCI FAQ Fremont"
        schema={[faqSchema(allFaqs), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }])]}
      />
      <section className="relative overflow-hidden">
        <AnimatedImmigrationBackdrop />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="section-kicker">FAQ</p>
          <h1 className="premium-title mt-4 max-w-5xl text-6xl sm:text-7xl">
            Immigration and visa questions, answered clearly
          </h1>
          <p className="premium-text mt-6 max-w-3xl text-lg">
            Search common questions across CAIALS service pages and jump into the related service
            when you are ready.
          </p>
        </div>
      </section>
      <ServiceMarquee />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SearchableFaq faqs={allFaqs} title="Search all CAIALS FAQs" />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {serviceLinks.map((link) => (
            <Link key={link.path} to={link.path} className="rounded-2xl border border-slate-200 bg-white p-5 text-sm font-bold text-red-700 hover:bg-red-50">
              {link.label}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
