import { Link } from "react-router-dom";
import {
  officeAddress,
  primaryEmail,
  primaryPhone,
  supportEmail,
} from "../../data/siteContent";
import useReveal from "../../hooks/useReveal";

export default function ContactBand({ onOpenContact }) {
  const [sectionRef, visible] = useReveal(0.08);

  return (
    <section ref={sectionRef} className="bg-white py-24">
      <div
        className="mx-auto max-w-7xl rounded-[32px] border border-slate-200 bg-[linear-gradient(135deg,#fff8f1_0%,#ffffff_55%,#fff4ef_100%)] px-6 py-10 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:px-8 lg:px-12"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "all 0.75s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-red-700">
              Contact CAIALS
            </span>
            <h2 className="mt-6 text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
              Talk to us and get the right immigration direction.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600 sm:text-xl">
              Use the contact popup for quick calling and messaging, or visit
              the full contact page for office details and consultation support.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="space-y-4 text-sm text-slate-600">
                <p>
                  <span className="block text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                    Phone
                  </span>
                  <span className="mt-1 block text-lg font-bold text-slate-950">
                    {primaryPhone}
                  </span>
                </p>
                <p>
                  <span className="block text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                    Emails
                  </span>
                  <span className="mt-1 block font-semibold text-slate-700">
                    {primaryEmail}
                  </span>
                  <span className="block font-semibold text-slate-700">
                    {supportEmail}
                  </span>
                </p>
                <p>
                  <span className="block text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                    Office
                  </span>
                  <span className="mt-1 block font-semibold text-slate-700">
                    {officeAddress}
                  </span>
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={onOpenContact}
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-red-700 to-orange-500 px-6 py-3.5 text-sm font-bold text-white shadow-[0_16px_36px_rgba(220,38,38,0.18)] transition-all hover:-translate-y-0.5 hover:brightness-105"
                >
                  Open Contact Popup
                </button>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50"
                >
                  Open Contact Page
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
