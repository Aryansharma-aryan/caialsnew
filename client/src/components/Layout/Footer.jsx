import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.jpg"

function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Visa Info", to: "/visa-info" },
  { label: "Countries", to: "/countries" },
  { label: "Contact", to: "/contact" },
];

const SERVICES = [
  { label: "Family Immigration", to: "/services#family" },
  { label: "Green Card Petition", to: "/services#greencard" },
  { label: "Citizenship", to: "/services#citizenship" },
  { label: "Business / Visitor Visa", to: "/services#business" },
  { label: "OCI Card & Indian Passport", to: "/services#oci" },
  { label: "Student Visa", to: "/services#student" },
  { label: "Religious Visa", to: "/services#religious" },
  { label: "UK & Canada Visa", to: "/services#uk" },
  { label: "Divorce Services", to: "/services#divorce" },
  { label: "India Visa", to: "/services#indiavisa" },
  { label: "Canada P.R.", to: "/services#canada" },
  { label: "Various Services", to: "/services#various" },
];

const COUNTRIES = [
  { flag: "🇺🇸", name: "USA", to: "/countries#usa" },
  { flag: "🇨🇦", name: "Canada", to: "/countries#canada" },
  { flag: "🇬🇧", name: "UK", to: "/countries#uk" },
  { flag: "🇦🇺", name: "Australia", to: "/countries#australia" },
  { flag: "🇮🇳", name: "India", to: "/countries#india" },
  { flag: "🇮🇹", name: "Italy", to: "/countries#italy" },
  { flag: "🇩🇪", name: "Germany", to: "/countries#germany" },
  { flag: "🇫🇷", name: "France", to: "/countries#france" },
  { flag: "🇪🇸", name: "Spain", to: "/countries#spain" },
  { flag: "🇵🇹", name: "Portugal", to: "/countries#portugal" },
  { flag: "🇪🇺", name: "Schengen", to: "/countries#schengen" },
];

const SOCIALS = [
  {
    label: "WhatsApp",
    href: "https://wa.me/14084228585?text=Hello%2C%20I%20need%20immigration%20help.",
    color: "#25D366",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/caials_?igsh=ZHV3czE5M3p0ZDlo",
    color: "#e1306c",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:info@caials.in",
    color: "#3b82f6",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: "Call",
    href: "tel:+14084228585",
    color: "#22c55e",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
];

/* ── Animated counter ── */
function Counter({ to, suffix = "", start }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let s = null;
    const step = (ts) => {
      if (!s) s = ts;
      const p = Math.min((ts - s) / 1800, 1);
      setVal(Math.floor((1 - Math.pow(1 - p, 3)) * to));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, to]);
  return <>{start ? val : 0}{suffix}</>;
}

/* ══════════════════════════════════════
   FOOTER
══════════════════════════════════════ */
export default function Footer() {
  const [topRef, topVisible] = useReveal(0.05);
  const [midRef, midVisible] = useReveal(0.05);
  const [botRef, botVisible] = useReveal(0.1);
  const location = useLocation();
  const year = new Date().getFullYear();

  const anim = (visible, delay = 0) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.7s ease ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  });

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "#020810", fontFamily: "'Montserrat', sans-serif" }}
    >
      {/* ── top red line ── */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-red-600 to-transparent" />

      {/* ── background decoration ── */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full pointer-events-none opacity-[0.05]"
        style={{ background: "radial-gradient(circle,#dc2626,transparent 65%)" }} />
      <div className="absolute bottom-0 right-0 w-[400px] h-[300px] rounded-full pointer-events-none opacity-[0.04]"
        style={{ background: "radial-gradient(circle,#1d4ed8,transparent 65%)" }} />

      {/* ════════════════════════════
          TOP CTA STRIP
      ════════════════════════════ */}
      <div ref={topRef} className="relative border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid lg:grid-cols-2 gap-10 items-center">

            {/* left */}
            <div style={anim(topVisible, 0)}>
              <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-red-400 mb-4">
                <span className="w-6 h-px bg-red-600 inline-block" />
                Start Your Journey Today
              </span>
              <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                Turn Your Dream into{" "}
                <span style={{
                  background: "linear-gradient(110deg,#ef4444,#dc2626,#ff7043)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>
                  Your Address.
                </span>
              </h2>
              <p className="text-white/40 mt-4 text-base leading-relaxed max-w-lg"
                style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>
                Book a free consultation with <span className="text-white/65 font-semibold">Founder Kanwal Kaur</span> — 13+ years of expertise, 98% success rate, and a team that truly cares.
              </p>
            </div>

            {/* right — CTA buttons + quick stats */}
            <div style={anim(topVisible, 150)}>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link to="/contact"
                  className="inline-flex items-center justify-center gap-3 rounded-full px-8 py-4 text-white font-black text-sm uppercase tracking-[0.13em] hover:scale-105 transition-all duration-300 shadow-2xl shadow-red-900/40"
                  style={{ background: "linear-gradient(135deg,#dc2626,#991b1b)" }}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Book Free Consultation
                </Link>
                <a href="https://wa.me/14084228585" target="_blank" rel="noreferrer"
                  className="inline-flex items-center justify-center gap-3 rounded-full px-8 py-4 text-white font-black text-sm uppercase tracking-[0.13em] hover:scale-105 transition-all duration-300"
                  style={{ background: "linear-gradient(135deg,#16a34a,#15803d)" }}>
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp Us
                </a>
              </div>

              {/* mini stats */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { to: 13, suffix: "+", label: "Years" },
                  { to: 10000, suffix: "+", label: "Approved", display: "10K+" },
                  { to: 98, suffix: "%", label: "Success" },
                ].map((s, i) => (
                  <div key={s.label} className="text-center rounded-xl border border-white/[0.06] bg-white/[0.02] py-4 px-2">
                    <p className="text-white font-black text-2xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {s.display ? (topVisible ? s.display : `0${s.suffix}`) : (
                        <Counter to={s.to} suffix={s.suffix} start={topVisible} />
                      )}
                    </p>
                    <p className="text-white/25 text-[10px] uppercase tracking-[0.18em] mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════
          MAIN FOOTER GRID
      ════════════════════════════ */}
      <div ref={midRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10">

          {/* ── Brand Column ── */}
          <div className="lg:col-span-4" style={anim(midVisible, 0)}>
            {/* Logo */}
            <Link to="/" className="inline-block mb-5">
              <img src={logo} alt="California Immigration Services Inc."
                className="h-14 w-auto object-contain" />
            </Link>

            <p className="text-white/35 text-sm leading-relaxed mb-6"
              style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>
              California Immigration Services Inc. — your trusted partner since 2013. Led by Founder{" "}
              <span className="text-white/55 font-semibold">Kanwal Kaur</span>, we have guided 10,000+ families,
              professionals, and dreamers to their immigration goals across 50+ countries.
            </p>

            {/* badges */}
            <div className="flex flex-wrap gap-2 mb-7">
              {["Registered & Bonded", "Est. 2013", "98% Success Rate"].map((b) => (
                <span key={b} className="text-[9px] font-bold uppercase tracking-[0.16em] border border-white/[0.08] rounded-full px-3 py-1.5 text-white/30">
                  {b}
                </span>
              ))}
            </div>

            {/* social icons */}
            <div className="flex gap-3">
              {SOCIALS.map((s) => (
                <a key={s.label} href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  title={s.label}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{ background: `${s.color}18`, color: s.color, border: `1px solid ${s.color}25` }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = `${s.color}30`; e.currentTarget.style.borderColor = `${s.color}50`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = `${s.color}18`; e.currentTarget.style.borderColor = `${s.color}25`; }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── Quick Links ── */}
          <div className="lg:col-span-2" style={anim(midVisible, 80)}>
            <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-white/25 mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to}
                    className="text-white/45 hover:text-red-400 text-sm font-medium flex items-center gap-2 group transition-colors duration-200">
                    <span className="w-0 group-hover:w-3 h-px bg-red-500 transition-all duration-300 inline-block" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Services ── */}
          <div className="lg:col-span-3" style={anim(midVisible, 160)}>
            <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-white/25 mb-5">
              Our Services
            </h4>
            <ul className="space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s.to}>
                  <Link to={s.to}
                    className="text-white/40 hover:text-white/80 text-xs font-medium flex items-center gap-2 group transition-colors duration-200">
                    <svg className="w-2.5 h-2.5 shrink-0 text-red-500/60 group-hover:text-red-400 transition-colors" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact & Countries ── */}
          <div className="lg:col-span-3" style={anim(midVisible, 240)}>
            {/* Contact */}
            <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-white/25 mb-5">
              Contact Us
            </h4>
            <ul className="space-y-4 mb-8">
              {[
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4 text-red-400 shrink-0">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                  text: "2450 Peralta Blvd, Suite #107\nFremont, CA 94536",
                  href: "https://www.google.com/maps/search/2450+Peralta+Blvd+Suite+107+Fremont+CA",
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4 text-green-400 shrink-0">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  ),
                  text: "+1 (408) 422-8585",
                  href: "tel:+14084228585",
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4 text-blue-400 shrink-0">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                  text: "info@caials.in\nrosy@caials.in",
                  href: "mailto:info@caials.in",
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4 text-orange-400 shrink-0">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  text: "www.caials.in",
                  href: "https://www.caials.in",
                },
              ].map((item, i) => (
                <li key={i}>
                  <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                    className="flex items-start gap-3 group">
                    <span className="mt-0.5">{item.icon}</span>
                    <span className="text-white/40 text-xs leading-snug group-hover:text-white/70 transition-colors duration-200 whitespace-pre-line font-medium">
                      {item.text}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Countries mini grid */}
            <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-white/25 mb-4">
              Countries We Serve
            </h4>
            <div className="flex flex-wrap gap-2">
              {COUNTRIES.map((c) => (
                <Link key={c.name} to={c.to}
                  className="flex items-center gap-1.5 rounded-full px-2.5 py-1 border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/20 transition-all duration-200 text-white/45 hover:text-white/80 text-[10px] font-semibold">
                  <span className="text-sm">{c.flag}</span>
                  <span>{c.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════
          OFFICE HOURS STRIP
      ════════════════════════════ */}
      <div className="border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-600/15 border border-red-600/20 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4 text-red-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/25">Office Hours</p>
                <p className="text-white/55 text-xs font-semibold">Mon – Fri: 9 AM – 6 PM &nbsp;·&nbsp; Sat: 10 AM – 4 PM PST &nbsp;·&nbsp; Sun: Closed</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block" />
              <span className="text-green-400 text-xs font-bold uppercase tracking-[0.15em]">Currently Open</span>
              <span className="text-white/20 text-xs mx-2">·</span>
              <span className="text-white/30 text-xs">WhatsApp available 24/7</span>
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════
          BOTTOM BAR
      ════════════════════════════ */}
      <div ref={botRef} className="border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4" style={anim(botVisible, 0)}>

            {/* copyright */}
            <div className="text-center md:text-left">
              <p className="text-white/25 text-xs">
                © {year}{" "}
                <span className="text-white/40 font-semibold">California Immigration Services Inc.</span>
                {" "}· All Rights Reserved.
              </p>
              <p className="text-white/15 text-[10px] mt-0.5 uppercase tracking-[0.14em]">
                Registered & Bonded · Fremont, California · Est. 2013
              </p>
            </div>

            {/* center — back to top */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group flex items-center gap-2 border border-white/[0.08] hover:border-red-600/40 rounded-full px-5 py-2.5 text-white/30 hover:text-red-400 text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 hover:bg-red-600/10"
            >
              <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
              </svg>
              Back to Top
            </button>

          </div>
        </div>
      </div>

      {/* ── very bottom accent line ── */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-red-800/40 to-transparent" />
    </footer>
  );
}