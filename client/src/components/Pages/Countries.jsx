import { Link } from "react-router-dom";
import SEO, { breadcrumbSchema } from "../SEO/SEO";
import { serviceLinks } from "../../data/seoContent";
import { AnimatedImmigrationBackdrop, ServiceMarquee } from "../Premium/DynamicBlocks";

const countries = [
  {
    name: "United States",
    accent: "USA",
    text: "Family immigration, green card petitions, citizenship applications, visitor visas, student visas, religious visas, and India-to-USA family documentation support.",
    links: ["/family-immigration", "/green-card-petitions", "/citizenship-applications", "/student-visas"],
  },
  {
    name: "India",
    accent: "India",
    text: "OCI card services, Indian passport assistance, India visa services, tourist visa support, and Indian consular documentation for families in Fremont and across the USA.",
    links: ["/oci-card-services", "/indian-passport-assistance", "/india-visa-services"],
  },
  {
    name: "Canada",
    accent: "Canada",
    text: "Canada visitor visa, study visa, documentation support, and Canada PR preparation for Fremont, USA, and Indian clients.",
    links: ["/uk-canada-visa-pr", "/student-visas", "/business-visitor-visas"],
  },
  {
    name: "United Kingdom",
    accent: "UK",
    text: "UK visitor visa, study visa, family documentation, and supporting evidence preparation for clients planning travel or study.",
    links: ["/uk-canada-visa-pr", "/student-visas", "/business-visitor-visas"],
  },
];

export default function Countries() {
  return (
    <main className="premium-shell text-slate-900">
      <SEO
        title="USA, India, UK and Canada Visa Services Fremont | CAIALS"
        description="CAIALS Immigration Services supports USA, India, UK, and Canada visa documentation from Fremont, CA, including OCI, Indian passport, student visas, visitor visas, and Canada PR."
        keywords="USA immigration services for Indians, India visa services Fremont, Canada PR consultant Fremont, UK visa Fremont"
        schema={[breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Countries", path: "/countries" }])]}
      />

      <section className="relative overflow-hidden">
        <AnimatedImmigrationBackdrop />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="section-kicker">Countries</p>
        <h1 className="premium-title mt-4 max-w-5xl text-6xl sm:text-7xl">
          Country-focused immigration and visa support from Fremont
        </h1>
        <p className="premium-text mt-6 max-w-3xl text-lg">
          CAIALS helps clients prepare organized documentation for the USA, India, Canada, and UK
          while keeping expectations clear and realistic.
        </p>
        </div>
      </section>

      <ServiceMarquee />

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          {countries.map((country, index) => (
            <article key={country.name} className="premium-card reveal-up rounded-[1.7rem] p-8" style={{ animationDelay: `${index * 100}ms` }}>
              <p className="section-kicker">{country.accent}</p>
              <h2 className="mt-3 text-3xl font-bold text-slate-950">{country.name}</h2>
              <p className="premium-text mt-4">{country.text}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                {country.links.map((path) => {
                  const link = serviceLinks.find((item) => item.path === path);
                  return link ? (
                    <Link key={path} to={path} className="rounded-full bg-red-50 px-4 py-2 text-sm font-bold text-red-700 hover:bg-red-100">
                      {link.label}
                    </Link>
                  ) : null;
                })}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="section-kicker">All service pages</p>
          <h2 className="premium-title mt-3 text-4xl">Continue exploring</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {serviceLinks.map((link) => (
              <Link key={link.path} to={link.path} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm font-bold text-red-700 hover:bg-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
