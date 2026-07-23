import { Link } from "react-router-dom";
import SEO, { breadcrumbSchema } from "../SEO/SEO";
import {
  addressLine,
  businessName,
  phone,
  phoneHref,
  serviceLinks,
  siteUrl,
} from "../../data/seoContent";
import founder from "../../assets/founder.jpeg";
import { AnimatedImmigrationBackdrop, ServiceMarquee } from "../Premium/DynamicBlocks";

export default function About() {
  return (
    <main className="premium-shell text-slate-900">
      <SEO
        title="About CAIALS Immigration Services Fremont CA"
        description="Learn about CAIALS Immigration Services in Fremont, CA, providing professional immigration, visa, OCI, Indian passport, and documentation support."
        keywords="CAIALS Immigration Services, immigration consultant in Fremont, Indian immigration services Fremont"
        schema={[breadcrumbSchema([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])]}
      />

      <section className="relative overflow-hidden">
        <AnimatedImmigrationBackdrop />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <img
          src={founder}
          alt="Founder of CAIALS Immigration Services in Fremont CA"
          className="h-[520px] w-full rounded-[2rem] object-cover object-top shadow-2xl"
        />
        <div>
          <p className="section-kicker">About founder and office</p>
          <h1 className="premium-title mt-4 text-6xl sm:text-7xl">
            Immigration support that feels personal, premium, and organized
          </h1>
          <p className="premium-text mt-6 text-lg">
            {businessName} helps clients understand requirements, organize documents, and prepare
            for immigration and visa processes with professional, realistic guidance from Fremont,
            California.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link className="premium-button px-7 py-3 text-center text-sm font-bold" to="/consultation">Book consultation</Link>
            <a className="soft-button px-7 py-3 text-center text-sm font-bold" href={phoneHref}>Call {phone}</a>
          </div>
        </div>
        </div>
      </section>

      <ServiceMarquee />

      <section className="premium-band">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-3 lg:px-8">
          {[
            ["Clear Guidance", "We explain the service, expected documents, and next steps in plain language."],
            ["Document Accuracy", "We help organize supporting materials so the file is consistent and easier to review."],
            ["Compliant Language", "We do not promise approvals. Government agencies decide outcomes."],
          ].map(([title, text]) => (
            <article key={title} className="premium-card rounded-[1.5rem] p-7">
              <h2 className="text-2xl font-bold text-slate-950">{title}</h2>
              <p className="premium-text mt-3">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
        <article>
          <p className="section-kicker">Who we serve</p>
          <h2 className="premium-title mt-3 text-4xl">Fremont, Bay Area, USA, and Indian clients</h2>
          <p className="premium-text mt-5">
            CAIALS serves families, students, travelers, professionals, religious workers,
            Indian-origin clients, and clients seeking support for UK, Canada, USA, and
            India-related documentation. Our Fremont office is available for local clients, and
            remote support is available for many clients across the USA and India.
          </p>
          <p className="premium-text mt-4">
            Office: {addressLine}. Website: <a className="text-red-700" href={siteUrl}>{siteUrl}</a>.
          </p>
        </article>
        <article className="premium-card rounded-[1.5rem] p-7">
          <p className="section-kicker">Services</p>
          <h2 className="mt-3 text-2xl font-bold text-slate-950">Explore detailed service pages</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {serviceLinks.map((link) => (
              <Link key={link.path} to={link.path} className="rounded-2xl bg-slate-50 p-4 text-sm font-bold text-red-700 ring-1 ring-slate-200 hover:bg-white">
                {link.label}
              </Link>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
