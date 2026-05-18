import {
  officeAddress,
  primaryEmail,
  primaryPhone,
  primaryPhoneHref,
  supportEmail,
  websiteHref,
  whatsappHref,
} from "../../data/siteContent";

const quickActions = [
  {
    label: "Call Now",
    href: primaryPhoneHref,
    caption: primaryPhone,
    style:
      "bg-gradient-to-r from-red-700 to-orange-500 text-white shadow-[0_16px_36px_rgba(220,38,38,0.18)]",
  },
  {
    label: "WhatsApp",
    href: whatsappHref,
    caption: "Quick message support",
    style: "border border-emerald-200 bg-emerald-50 text-emerald-700",
  },
  {
    label: "Email Us",
    href: `mailto:${primaryEmail}`,
    caption: primaryEmail,
    style: "border border-slate-200 bg-white text-slate-700",
  },
];

export default function ContactPopup({ isOpen, onClose }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center px-4">
      <button
        type="button"
        aria-label="Close contact popup"
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
      />

      <div className="relative z-10 w-full max-w-xl rounded-[32px] border border-slate-200 bg-[#fffdf9] p-6 shadow-[0_32px_90px_rgba(15,23,42,0.18)] sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-700">
              Contact CAIALS
            </p>
            <h3 className="mt-3 text-3xl font-black text-slate-950">
              Reach our immigration team quickly.
            </h3>
            <p className="mt-3 text-base leading-7 text-slate-600">
              Call, WhatsApp, or email us directly. The popup is here so the
              important number stays easy to access.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="mt-8 grid gap-3">
          {quickActions.map((action) => (
            <a
              key={action.label}
              href={action.href}
              target={action.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className={`rounded-3xl px-5 py-4 transition-all hover:-translate-y-0.5 ${action.style}`}
            >
              <span className="block text-sm font-black uppercase tracking-[0.16em]">
                {action.label}
              </span>
              <span className="mt-1 block text-sm font-semibold opacity-90">
                {action.caption}
              </span>
            </a>
          ))}
        </div>

        <div className="mt-8 rounded-[28px] border border-slate-200 bg-white p-5">
          <div className="grid gap-4 text-sm text-slate-600 sm:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                Office
              </p>
              <p className="mt-2 font-semibold text-slate-700">{officeAddress}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                Email Support
              </p>
              <p className="mt-2 font-semibold text-slate-700">{primaryEmail}</p>
              <p className="font-semibold text-slate-700">{supportEmail}</p>
              <a
                href={websiteHref}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-block font-semibold text-red-700"
              >
                www.caials.in
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
