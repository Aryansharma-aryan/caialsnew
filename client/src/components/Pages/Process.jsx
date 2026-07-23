import { Link } from "react-router-dom";
import SEO, { breadcrumbSchema } from "../SEO/SEO";
import { serviceLinks } from "../../data/seoContent";
import { AnimatedImmigrationBackdrop, ProcessTracker, ServiceMarquee } from "../Premium/DynamicBlocks";

export default function Process() {
  return (
    <main className="premium-shell text-slate-900">
      <SEO
        title="Immigration Process and Tracking Fremont CA | CAIALS"
        description="Learn the CAIALS immigration and visa preparation process, including consultation, document checklist, file preparation, review, tracking, and follow-up."
        keywords="immigration process Fremont, visa tracking process Fremont, document preparation Fremont"
        schema={[breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Process", path: "/process" }])]}
      />
      <section className="relative overflow-hidden">
        <AnimatedImmigrationBackdrop />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="section-kicker">Process</p>
          <h1 className="premium-title mt-4 max-w-5xl text-6xl sm:text-7xl">
            A transparent process for immigration and visa preparation
          </h1>
          <p className="premium-text mt-6 max-w-3xl text-lg">
            CAIALS keeps clients oriented from the first conversation through document preparation,
            quality review, and next-step tracking.
          </p>
        </div>
      </section>
      <ServiceMarquee />
      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <p className="section-kicker">Tracking system</p>
          <h2 className="premium-title mt-3 text-4xl">Know what is pending, reviewed, and ready</h2>
          <p className="premium-text mt-5">
            This process is not a government case tracker. It is a preparation framework that helps
            clients organize documents, understand next steps, and reduce confusion before and after
            filing.
          </p>
          <Link to="/consultation" className="premium-button mt-7 inline-flex px-7 py-3 text-sm font-bold">
            Start consultation
          </Link>
        </div>
        <ProcessTracker />
      </section>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="section-kicker">Services</p>
          <h2 className="premium-title mt-3 text-4xl">Apply the process to your service</h2>
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
