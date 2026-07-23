import { Link } from "react-router-dom";
import SEO, { breadcrumbSchema } from "../SEO/SEO";
import { servicePages } from "../../data/seoContent";
import {
  AnimatedImmigrationBackdrop,
  ServiceMarquee,
  ServiceSearchDirectory,
} from "../Premium/DynamicBlocks";

export default function Services() {
  return (
    <main className="premium-shell text-slate-900">
      <SEO
        title="Immigration Services Fremont CA | CAIALS Immigration Services"
        description="Explore immigration services in Fremont, CA including family immigration, green card petitions, citizenship, student visas, OCI, Indian passport, India visa, UK visa, Canada visa, and Canada PR."
        keywords="immigration services Fremont CA, visa consultant near Fremont, Indian immigration services Fremont, USA immigration services for Indians"
        schema={[breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }])]}
      />

      <section className="relative overflow-hidden">
        <AnimatedImmigrationBackdrop />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="section-kicker">Services</p>
        <h1 className="premium-title mt-4 max-w-5xl text-6xl sm:text-7xl">
          Detailed immigration and visa services, built to be searchable and clear
        </h1>
        <p className="premium-text mt-6 max-w-3xl text-lg">
          Each service page is written to explain what the service covers, how the preparation
          process works, what documents are commonly reviewed, and what clients can expect while
          tracking next steps.
        </p>
        </div>
      </section>

      <ServiceMarquee />
      <ServiceSearchDirectory />

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {servicePages.map((service, index) => (
            <article
              key={service.slug}
              className="premium-card reveal-up rounded-[1.5rem] p-7"
              style={{ animationDelay: `${index * 55}ms` }}
            >
              <div className="flex items-start justify-between gap-4">
                <p className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-700">
                  Service {String(index + 1).padStart(2, "0")}
                </p>
                <span className="h-3 w-3 rounded-full bg-red-500" />
              </div>
              <h2 className="mt-5 text-2xl font-bold text-slate-950">{service.shortTitle}</h2>
              <p className="premium-text mt-3 text-sm">{service.intro}</p>
              <ul className="mt-5 space-y-2">
                {service.services.slice(0, 3).map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-slate-700">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to={`/${service.slug}`}
                className="premium-button mt-6 inline-flex px-6 py-3 text-sm font-bold"
              >
                View full service details
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
