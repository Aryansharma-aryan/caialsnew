import { Link } from "react-router-dom";
import {
  businessName,
  email,
  officeLocations,
  phone,
  phoneHref,
  serviceLinks,
  siteUrl,
} from "../../data/seoContent";
import logo from "../../assets/logo.jpg";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-900">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
        <section className="premium-card rounded-[1.5rem] p-6">
          <Link to="/" className="inline-flex items-center">
            <img
              src={logo}
              alt="CAIALS Immigration Services Fremont CA"
              className="h-16 w-auto object-contain"
            />
          </Link>
          <p className="premium-text mt-5 max-w-md text-sm">
            Professional immigration, visa, OCI, Indian passport, and documentation support for
            Fremont, nearby Bay Area, USA, and Indian clients.
          </p>
          <address className="mt-5 not-italic text-sm leading-7 text-slate-700">
            <strong>{businessName}</strong><br />
            {officeLocations.map((office) => <span key={office.name}><strong>{office.name}:</strong> {office.address}<br /></span>)}
            Website: <a className="text-red-700 hover:text-red-900" href={siteUrl}>{siteUrl}</a><br />
            Phone: <a className="text-red-700 hover:text-red-900" href={phoneHref}>{phone}</a><br />
            Email: <a className="text-red-700 hover:text-red-900" href={`mailto:${email}`}>{email}</a>
          </address>
        </section>

        <section>
          <h2 className="section-kicker">Services</h2>
          <ul className="mt-5 grid gap-2">
            {serviceLinks.map((link) => (
              <li key={link.path}>
                <Link className="text-sm font-semibold text-slate-600 hover:text-red-700" to={link.path}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="section-kicker">Quick links</h2>
          <ul className="mt-5 grid gap-2">
            {[
              ["Home", "/"],
              ["Services", "/services"],
              ["Process", "/process"],
              ["Document Checklist", "/document-checklist"],
              ["FAQ", "/faq"],
              ["About", "/about"],
              ["Countries", "/countries"],
              ["Contact", "/contact"],
              ["Consultation", "/consultation"],
            ].map(([label, path]) => (
              <li key={path}>
                <Link className="text-sm font-semibold text-slate-600 hover:text-red-700" to={path}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-2xl bg-slate-950 p-5 text-sm leading-7 text-white/70">
            Immigration outcomes are determined by government agencies. CAIALS provides professional
            documentation support and process guidance.
          </div>
        </section>
      </div>
      <div className="border-t border-slate-200 px-4 py-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {businessName}. All rights reserved.
      </div>
    </footer>
  );
}
