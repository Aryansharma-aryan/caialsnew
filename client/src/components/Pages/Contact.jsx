import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_BASE_URL } from "../../config/api";
import SEO, { breadcrumbSchema } from "../SEO/SEO";
import {
  addressLine,
  businessName,
  email,
  officeLocations,
  phone,
  phoneHref,
  serviceLinks,
  siteUrl,
} from "../../data/seoContent";
import { AnimatedImmigrationBackdrop } from "../Premium/DynamicBlocks";

const contactCards = [
  ["Call CAIALS", phone, "Speak with the Fremont office about your immigration or visa documentation needs.", phoneHref],
  ["Email", email, "Send questions, documents, or consultation details for review.", `mailto:${email}`],
  ["WhatsApp", "+1 (408) 422-8585", "Message CAIALS for quick coordination and appointment questions.", "https://wa.me/14084228585"],
];

const initialRequest = { fullName: "", email: "", phone: "", visaType: "", message: "" };

function ContactRequestForm() {
  const [request, setRequest] = useState(initialRequest);
  const [isSending, setIsSending] = useState(false);
  const update = (event) => setRequest((current) => ({ ...current, [event.target.name]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    setIsSending(true);
    try {
      await axios.post(`${API_BASE_URL}/consult`, {
        ...request,
        countryOfInterest: "To be discussed",
        contactMethod: "Email",
        purpose: "Contact page enquiry",
      }, { timeout: 30000 });
      setRequest(initialRequest);
      toast.success("Thank you. Your message has been sent to the CAIALS team.");
    } catch (error) {
      toast.error(error.response?.data?.message || "We could not send your message. Please call or try again.");
    } finally {
      setIsSending(false);
    }
  };

  const field = "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-red-300 focus:ring-4 focus:ring-red-100";
  return (
    <form onSubmit={submit} className="premium-card rounded-[1.75rem] p-6 sm:p-8">
      <p className="section-kicker">Send an enquiry</p>
      <h2 className="mt-2 text-3xl font-bold text-slate-950">How can we help?</h2>
      <p className="premium-text mt-3 text-sm">Send a question to our team. For a full document upload and appointment preference, use the consultation form.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <input className={field} name="fullName" value={request.fullName} onChange={update} placeholder="Full name *" required />
        <input className={field} type="email" name="email" value={request.email} onChange={update} placeholder="Email address *" required />
        <input className={field} type="tel" name="phone" value={request.phone} onChange={update} placeholder="Phone number *" pattern="[0-9]{7,15}" required />
        <select className={field} name="visaType" value={request.visaType} onChange={update} required><option value="">Service needed *</option>{serviceLinks.map((service) => <option key={service.path} value={service.label}>{service.label}</option>)}</select>
      </div>
      <textarea className={`${field} mt-4 min-h-32`} name="message" value={request.message} onChange={update} placeholder="Tell us what you need help with (optional)" maxLength="500" />
      <button disabled={isSending} className="premium-button mt-5 w-full px-6 py-3 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-60">{isSending ? "Sending..." : "Send message"}</button>
    </form>
  );
}

export default function Contact() {
  return (
    <main className="premium-shell text-slate-900">
      <ToastContainer position="top-right" autoClose={3500} />
      <SEO
        title="Contact CAIALS Immigration Services Fremont CA"
        description="Contact CAIALS Immigration Services at 2450 Peralta Blvd, Suite #107, Fremont, CA 94536 for immigration, visa, OCI, Indian passport, and Canada PR support."
        keywords="immigration services Fremont CA, visa consultant near Fremont, CAIALS contact"
        schema={[breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])]}
      />

      <section className="relative overflow-hidden">
        <AnimatedImmigrationBackdrop />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="section-kicker">Contact</p>
        <h1 className="premium-title mt-4 max-w-5xl text-6xl sm:text-7xl">
          Visit or contact CAIALS Immigration Services in Fremont, CA
        </h1>
        <p className="premium-text mt-6 max-w-3xl text-lg">
          Reach out for family immigration, green card petition, citizenship, student visa, OCI,
          Indian passport, India visa, UK visa, Canada visa, Canada PR, and documentation support.
        </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div className="space-y-5">
          {contactCards.map(([title, value, text, href], index) => (
            <a
              key={title}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="premium-card reveal-up block rounded-[1.5rem] p-6 transition hover:-translate-y-1"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <p className="section-kicker">{title}</p>
              <h2 className="mt-2 text-2xl font-bold text-slate-950">{value}</h2>
              <p className="premium-text mt-2 text-sm">{text}</p>
            </a>
          ))}

          <section className="premium-card rounded-[1.5rem] p-6">
            <p className="section-kicker">Our offices</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-950">{businessName}</h2>
            <div className="premium-text mt-3 space-y-3">{officeLocations.map((office) => <p key={office.name}><strong className="text-slate-800">{office.name}</strong><br />{office.address}</p>)}<p>Website: <a className="text-red-700" href={siteUrl}>{siteUrl}</a></p></div>
          </section>
        </div>

        <div className="premium-card overflow-hidden rounded-[1.75rem] p-3">
          <div className="rounded-[1.4rem] bg-slate-950 p-5 text-white">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-red-200">Map and directions</p>
            <h2 className="mt-2 text-2xl font-bold">Fremont Office</h2>
            <p className="mt-2 text-sm leading-6 text-white/70">{addressLine}</p>
            <p className="mt-3 text-sm font-semibold text-red-100">Tracy Office: 1660 W Linne Road, Unit J24, Tracy, CA 95376</p>
          </div>
          <iframe
            title="CAIALS Immigration Services Fremont CA Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3154.0!2d-122.030742!3d37.548547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fbf0a2a5c8d4f%3A0xa9e48742da5f3af5!2s2450%20Peralta%20Blvd%20%23107%2C%20Fremont%2C%20CA%2094536!5e0!3m2!1sen!2sus!4v1710000000000!5m2!1sen!2sus"
            width="100%"
            height="430"
            style={{ border: 0, display: "block", borderRadius: "1.25rem", marginTop: "0.75rem" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <a
            className="premium-button mt-4 inline-flex px-6 py-3 text-sm font-bold"
            href="https://www.google.com/maps/dir//2450+Peralta+Blvd+%23107,+Fremont,+CA+94536"
            target="_blank"
            rel="noreferrer"
          >
            Open directions
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <ContactRequestForm />
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="section-kicker">Service links</p>
          <h2 className="premium-title mt-3 text-4xl">Not sure what to ask about?</h2>
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
