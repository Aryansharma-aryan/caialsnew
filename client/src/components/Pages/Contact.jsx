import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

/* ── Reveal hook ── */
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

/* ─────────────────────────────────────
   CONTACT CARDS DATA
───────────────────────────────────── */
const CONTACT_CARDS = [
  {
    id: "phone",
    emoji: "📞",
    label: "Call Us",
    primary: "+1 (408) 422-8585",
    secondary: "Mon – Sat · 9 AM – 6 PM PST",
    action: "Tap to Call",
    href: "tel:+14084228585",
    gradient: "from-emerald-500 to-green-700",
    glow: "#16a34a",
    bg: "from-emerald-950/60 to-[#04091a]",
    border: "#16a34a",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-full h-full">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    id: "whatsapp",
    emoji: "💬",
    label: "WhatsApp",
    primary: "+1 (408) 422-8585",
    secondary: "Message us anytime — quick replies",
    action: "Open WhatsApp",
    href: "https://wa.me/14084228585?text=Hello%2C%20I%20need%20help%20with%20immigration%20services.",
    gradient: "from-[#25D366] to-[#128C7E]",
    glow: "#25D366",
    bg: "from-green-950/60 to-[#04091a]",
    border: "#25D366",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    id: "email1",
    emoji: "✉️",
    label: "General Inquiries",
    primary: "info@caials.in",
    secondary: "For all general questions & consultations",
    action: "Send Email",
    href: "mailto:info@caials.in",
    gradient: "from-blue-500 to-blue-800",
    glow: "#3b82f6",
    bg: "from-blue-950/60 to-[#04091a]",
    border: "#3b82f6",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-full h-full">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: "email2",
    emoji: "📬",
    label: "Case Support",
    primary: "rosy@caials.in",
    secondary: "For existing case follow-ups & documents",
    action: "Send Email",
    href: "mailto:rosy@caials.in",
    gradient: "from-violet-500 to-purple-800",
    glow: "#8b5cf6",
    bg: "from-violet-950/60 to-[#04091a]",
    border: "#8b5cf6",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-full h-full">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
      </svg>
    ),
  },
  {
    id: "instagram",
    emoji: "📸",
    label: "Instagram",
    primary: "@caials_",
    secondary: "Follow for immigration tips & updates",
    action: "Follow Us",
    href: "https://www.instagram.com/caials_?igsh=ZHV3czE5M3p0ZDlo",
    gradient: "from-pink-500 via-red-500 to-yellow-500",
    glow: "#ec4899",
    bg: "from-pink-950/60 to-[#04091a]",
    border: "#ec4899",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    id: "website",
    emoji: "🌐",
    label: "Website",
    primary: "www.caials.in",
    secondary: "Visit our official website",
    action: "Visit Site",
    href: "https://www.caials.in",
    gradient: "from-orange-500 to-red-600",
    glow: "#f97316",
    bg: "from-orange-950/60 to-[#04091a]",
    border: "#f97316",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-full h-full">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

/* ── Single Contact Card ── */
function ContactCard({ card, index, visible }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={card.href}
      target={card.href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col rounded-2xl overflow-hidden border transition-all duration-500 cursor-pointer"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(32px) scale(0.96)",
        transition: `opacity 0.65s ease ${index * 80}ms, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${index * 80}ms`,
        borderColor: hovered ? card.border : "rgba(255,255,255,0.07)",
        boxShadow: hovered ? `0 24px 48px ${card.glow}22, 0 0 0 1px ${card.border}30` : "none",
        background: "#060c20",
      }}
    >
      {/* top gradient bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${card.gradient} transition-all duration-300`}
        style={{ opacity: hovered ? 1 : 0.5 }} />

      {/* inner glow bg */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 50% -20%, ${card.glow}15, transparent 70%)` }} />

      <div className="relative z-10 p-6 flex flex-col flex-1">
        {/* icon */}
        <div
          className="w-14 h-14 rounded-2xl p-3.5 mb-5 transition-all duration-400 group-hover:scale-110 group-hover:rotate-3"
          style={{ background: `${card.glow}18`, color: card.glow, border: `1px solid ${card.glow}25` }}
        >
          {card.icon}
        </div>

        {/* label */}
        <p className="text-[10px] font-black uppercase tracking-[0.22em] mb-2"
          style={{ color: card.glow, fontFamily: "'Montserrat', sans-serif" }}>
          {card.label}
        </p>

        {/* primary value */}
        <p className="text-white font-black text-lg leading-tight mb-1.5"
          style={{ fontFamily: "'Playfair Display', serif" }}>
          {card.primary}
        </p>

        {/* secondary */}
        <p className="text-white/35 text-xs leading-relaxed flex-1"
          style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>
          {card.secondary}
        </p>

        {/* CTA row */}
        <div className="flex items-center gap-2 mt-5 pt-4 border-t border-white/[0.06]">
          <span className="text-xs font-bold uppercase tracking-[0.15em] transition-colors duration-300"
            style={{ color: hovered ? card.glow : "rgba(255,255,255,0.3)", fontFamily: "'Montserrat', sans-serif" }}>
            {card.action}
          </span>
          <svg
            className="w-3.5 h-3.5 transition-all duration-300"
            style={{
              color: hovered ? card.glow : "rgba(255,255,255,0.2)",
              transform: hovered ? "translateX(4px)" : "translateX(0)",
            }}
            fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>

      {/* animated bottom line */}
      <div
        className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r ${card.gradient} transition-all duration-500`}
        style={{ width: hovered ? "100%" : "0%" }} />
    </a>
  );
}

/* ══════════════════════════════════════
   MAIN CONTACT PAGE
══════════════════════════════════════ */
export default function Contact() {
  const [heroRef, heroVisible] = useReveal(0.05);
  const [cardsRef, cardsVisible] = useReveal(0.08);
  const [infoRef, infoVisible] = useReveal(0.1);
  const [mapRef, mapVisible] = useReveal(0.1);
  const [hoursRef, hoursVisible] = useReveal(0.1);

  const anim = (visible, delay = 0, dir = "up") => ({
    opacity: visible ? 1 : 0,
    transform: visible
      ? "translate(0,0)"
      : dir === "left" ? "translateX(-36px)"
      : dir === "right" ? "translateX(36px)"
      : "translateY(28px)",
    transition: `opacity 0.8s ease ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  });

  return (
    <div className="bg-[#04091a] min-h-screen overflow-x-hidden" style={{ fontFamily: "'Montserrat', sans-serif" }}>

      {/* ══════════════════════════════
          HERO
      ══════════════════════════════ */}
      <section ref={heroRef} className="relative pt-24 pb-32 overflow-hidden">
        {/* bg layers */}
        <div className="absolute inset-0 bg-cover bg-center opacity-[0.12]"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1920&q=80')" }} />
        <div className="absolute inset-0 bg-gradient-to-br from-[#04091a] via-[#04091af0] to-[#0b1840]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none opacity-[0.09]"
          style={{ background: "radial-gradient(circle, #dc2626, transparent 65%)" }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #2563eb, transparent 65%)" }} />
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize: "44px 44px" }} />

        {/* animated particles */}
        {[
          { s: 6, t: "15%", l: "8%", c: "#ef4444", d: "0s" },
          { s: 4, t: "60%", l: "92%", c: "#3b82f6", d: "1s" },
          { s: 5, t: "75%", l: "5%", c: "#22c55e", d: "0.6s" },
          { s: 3, t: "25%", l: "80%", c: "#f472b6", d: "1.4s" },
        ].map((p, i) => (
          <div key={i} className="absolute rounded-full animate-pulse pointer-events-none"
            style={{ width: p.s, height: p.s, top: p.t, left: p.l, background: p.c, opacity: 0.3, animationDelay: p.d, animationDuration: "3s" }} />
        ))}

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* eyebrow */}
          <div style={anim(heroVisible, 0)}>
            <span className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.04] backdrop-blur-sm rounded-full px-5 py-2 text-[10px] font-bold uppercase tracking-[0.25em] text-white/40 mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse inline-block" />
              Contact California Immigration Services Inc.
            </span>
          </div>

          {/* headline */}
          <h1 className="font-black leading-[1.04] mb-6"
            style={{ ...anim(heroVisible, 100), fontFamily: "'Playfair Display', serif" }}>
            <span className="block text-white text-5xl sm:text-6xl lg:text-7xl">
              Let's Start Your
            </span>
            <span className="block text-5xl sm:text-6xl lg:text-7xl mt-1"
              style={{ background: "linear-gradient(110deg,#ef4444,#dc2626,#ff7043)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Immigration Journey
            </span>
          </h1>

          {/* sub */}
          <p className="text-white/45 text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ ...anim(heroVisible, 230), fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>
            Reach out via <span className="text-white/70 font-semibold">phone, WhatsApp, email, or Instagram</span> — our
            expert team responds fast and guides you every step of the way.
          </p>

          {/* quick pill links */}
          <div className="flex flex-wrap justify-center gap-3 mt-10" style={anim(heroVisible, 380)}>
            {[
              { label: "📞 Call Now", href: "tel:+14084228585", color: "#16a34a" },
              { label: "💬 WhatsApp", href: "https://wa.me/14084228585", color: "#25D366" },
              { label: "✉️ Email Us", href: "mailto:info@caials.in", color: "#3b82f6" },
              { label: "📸 Instagram", href: "https://www.instagram.com/caials_?igsh=ZHV3czE5M3p0ZDlo", color: "#ec4899" },
            ].map((pill) => (
              <a key={pill.href} href={pill.href} target={pill.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{ background: `${pill.color}22`, border: `1px solid ${pill.color}40`, boxShadow: `0 0 0 transparent` }}
                onMouseEnter={(e) => { e.currentTarget.style.background = `${pill.color}35`; e.currentTarget.style.boxShadow = `0 8px 24px ${pill.color}30`; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = `${pill.color}22`; e.currentTarget.style.boxShadow = "0 0 0 transparent"; }}>
                {pill.label}
              </a>
            ))}
          </div>
        </div>

        {/* diagonal bottom cut */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-[#04091a]"
          style={{ clipPath: "polygon(0 100%, 100% 20%, 100% 100%)" }} />
      </section>


      {/* ══════════════════════════════
          6 CONTACT CARDS
      ══════════════════════════════ */}
      <section ref={cardsRef} className="py-20 bg-[#04091a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14" style={anim(cardsVisible, 0)}>
            <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-red-400 mb-4">
              <span className="w-8 h-px bg-red-600 inline-block" />
              How to Reach Us
              <span className="w-8 h-px bg-red-600 inline-block" />
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              All Contact{" "}
              <span style={{ background: "linear-gradient(110deg,#ef4444,#dc2626)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Channels
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CONTACT_CARDS.map((card, i) => (
              <ContactCard key={card.id} card={card} index={i} visible={cardsVisible} />
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════
          ADDRESS + MAP (SIDE BY SIDE)
      ══════════════════════════════ */}
      <section className="py-20 bg-[#060c20]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-start">

            {/* ─ LEFT: Office Info ─ */}
            <div ref={infoRef}>
              <div style={anim(infoVisible, 0)}>
                <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-red-400 mb-4">
                  <span className="w-6 h-px bg-red-600 inline-block" />
                  Our Office
                </span>
                <h2 className="text-4xl sm:text-5xl font-black text-white mb-3"
                  style={{ fontFamily: "'Playfair Display', serif" }}>
                  Visit Us in{" "}
                  <span style={{ background: "linear-gradient(110deg,#ef4444,#dc2626)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                    Fremont
                  </span>
                </h2>
                <p className="text-white/35 text-base leading-relaxed mb-8"
                  style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>
                  Walk-ins welcome during office hours. Our team is ready to assist you in person.
                </p>
              </div>

              {/* Detail rows */}
              <div className="space-y-4">
                {[
                  {
                    icon: (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5 text-red-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    ),
                    label: "Office Address",
                    value: "2450 Peralta Blvd, Suite #107\nFremont, CA 94536",
                    href: "https://www.google.com/maps/dir//2450+Peralta+Blvd+%23107,+Fremont,+CA+94536",
                    color: "#ef4444",
                    cta: "Get Directions →",
                  },
                  {
                    icon: (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5 text-green-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    ),
                    label: "Phone Number",
                    value: "+1 (408) 422-8585",
                    href: "tel:+14084228585",
                    color: "#22c55e",
                    cta: "Call Now →",
                  },
                  {
                    icon: (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5 text-blue-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    ),
                    label: "Email Addresses",
                    value: "info@caials.in\nrosy@caials.in",
                    href: "mailto:info@caials.in",
                    color: "#3b82f6",
                    cta: "Send Email →",
                  },
                  {
                    icon: (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5 text-orange-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ),
                    label: "Website",
                    value: "www.caials.in",
                    href: "https://www.caials.in",
                    color: "#f97316",
                    cta: "Visit Site →",
                  },
                  {
                    icon: (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-pink-400">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    ),
                    label: "Instagram",
                    value: "@caials_",
                    href: "https://www.instagram.com/caials_?igsh=ZHV3czE5M3p0ZDlo",
                    color: "#ec4899",
                    cta: "Follow Us →",
                  },
                ].map((row, i) => (
                  <div
                    key={row.label}
                    className="group flex items-start gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 hover:bg-white/[0.04] transition-all duration-300 cursor-default"
                    style={{
                      opacity: infoVisible ? 1 : 0,
                      transform: infoVisible ? "translateX(0)" : "translateX(-24px)",
                      transition: `all 0.65s cubic-bezier(0.16,1,0.3,1) ${100 + i * 90}ms`,
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${row.color}40`; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: `${row.color}18`, border: `1px solid ${row.color}25` }}>
                      {row.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1"
                        style={{ color: `${row.color}99` }}>{row.label}</p>
                      <p className="text-white/75 text-sm font-semibold whitespace-pre-line leading-snug">{row.value}</p>
                    </div>
                    <a href={row.href} target={row.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                      className="shrink-0 text-[10px] font-bold uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105"
                      style={{ color: row.color }}>
                      {row.cta}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* ─ RIGHT: Map + Hours ─ */}
            <div ref={mapRef} className="flex flex-col gap-5" style={anim(mapVisible, 150, "right")}>

              {/* map embed — dark filtered */}
              <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/60">
                {/* overlay frame glow */}
                <div className="absolute inset-0 pointer-events-none z-10 rounded-2xl"
                  style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)" }} />

                {/* map label pin */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-[#04091af0] border border-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-white text-xs font-bold" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    CAIS Inc. — Fremont, CA
                  </span>
                </div>

                <iframe
                  title="California Immigration Services Inc. Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3154.0!2d-122.030742!3d37.548547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fbf0a2a5c8d4f%3A0xa9e48742da5f3af5!2s2450%20Peralta%20Blvd%20%23107%2C%20Fremont%2C%20CA%2094536!5e0!3m2!1sen!2sus!4v1710000000000!5m2!1sen!2sus"
                  width="100%"
                  height="320"
                  style={{
                    border: 0,
                    display: "block",
                    filter: "invert(90%) hue-rotate(180deg) brightness(0.82) saturate(0.65)",
                  }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

                {/* get directions button over map */}
                <a href="https://www.google.com/maps/dir//2450+Peralta+Blvd+%23107,+Fremont,+CA+94536"
                  target="_blank" rel="noreferrer"
                  className="absolute bottom-4 right-4 z-20 flex items-center gap-2 rounded-full px-5 py-2.5 text-white text-xs font-black uppercase tracking-[0.12em] shadow-xl hover:scale-105 transition-all duration-300"
                  style={{ background: "linear-gradient(135deg,#dc2626,#991b1b)", fontFamily: "'Montserrat', sans-serif" }}>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  Get Directions
                </a>
              </div>

              {/* Office Hours Card */}
              <div ref={hoursRef} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden"
                style={anim(hoursVisible, 200)}>
                <div className="px-6 py-4 border-b border-white/[0.05]"
                  style={{ background: "linear-gradient(135deg,#991b1b18,transparent)" }}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-red-600/20 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4 text-red-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">Office Hours</p>
                      <p className="text-white/30 text-[10px] uppercase tracking-wide">Walk-ins Welcome</p>
                    </div>
                    {/* open/closed live status */}
                    <div className="ml-auto flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
                      <span className="text-green-400 text-[10px] font-bold uppercase tracking-wide">Open Today</span>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  {[
                    { day: "Monday – Friday", hours: "9:00 AM – 6:00 PM PST", active: true },
                    { day: "Saturday", hours: "10:00 AM – 4:00 PM PST", active: true },
                    { day: "Sunday", hours: "Closed", active: false },
                  ].map((row) => (
                    <div key={row.day} className="flex items-center justify-between py-3 border-b border-white/[0.05] last:border-0">
                      <span className="text-white/60 text-xs font-medium">{row.day}</span>
                      <span className={`text-xs font-bold ${row.active ? "text-white/80" : "text-white/25"}`}>
                        {row.hours}
                      </span>
                    </div>
                  ))}

                  <div className="mt-5 pt-4 border-t border-white/[0.05]">
                    <p className="text-white/25 text-[10px] text-center" style={{ fontFamily: "'Lato', sans-serif" }}>
                      For urgent matters, WhatsApp us anytime — we typically respond within 1 hour
                    </p>
                  </div>
                </div>
              </div>

              {/* Established badge */}
              <div className="flex items-center justify-between rounded-2xl border border-white/[0.06] bg-white/[0.015] px-6 py-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/25 mb-0.5">Established</p>
                  <p className="text-white font-black text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>Since 2013</p>
                </div>
                <div className="h-10 w-px bg-white/[0.07]" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/25 mb-0.5">Founder</p>
                  <p className="text-white font-black text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>Kanwal Kaur</p>
                </div>
                <div className="h-10 w-px bg-white/[0.07]" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/25 mb-0.5">Status</p>
                  <p className="text-emerald-400 font-black text-sm">Registered & Bonded</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════
          BOTTOM CTA STRIP
      ══════════════════════════════ */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-[#04091a] to-blue-900/15" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600/30 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Ready to Take the Next Step?
          </h2>
          <p className="text-white/40 text-base mb-10"
            style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>
            13+ years of expertise. 10,000+ visas approved. Your dream is our mission.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {[
              { label: "📞 Call Us", href: "tel:+14084228585", grad: "linear-gradient(135deg,#16a34a,#15803d)", shadow: "#16a34a" },
              { label: "💬 WhatsApp", href: "https://wa.me/14084228585", grad: "linear-gradient(135deg,#25D366,#128C7E)", shadow: "#25D366" },
              { label: "✉️ Email", href: "mailto:info@caials.in", grad: "linear-gradient(135deg,#2563eb,#1d4ed8)", shadow: "#2563eb" },
              { label: "📸 Instagram", href: "https://www.instagram.com/caials_?igsh=ZHV3czE5M3p0ZDlo", grad: "linear-gradient(135deg,#e1306c,#833ab4)", shadow: "#ec4899" },
            ].map((b) => (
              <a key={b.href} href={b.href} target={b.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-white font-black text-sm uppercase tracking-[0.13em] hover:scale-105 transition-all duration-300 shadow-xl"
                style={{ background: b.grad, boxShadow: `0 12px 32px ${b.shadow}35` }}>
                {b.label}
              </a>
            ))}
          </div>

          <p className="text-white/20 text-xs mt-8 tracking-wide">
            © {new Date().getFullYear()} California Immigration Services Inc. · 2450 Peralta Blvd, Suite #107, Fremont, CA 94536
          </p>
        </div>
      </section>

    </div>
  );
}