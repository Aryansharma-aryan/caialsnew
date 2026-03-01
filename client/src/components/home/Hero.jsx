import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

const SERVICES = [
  "Family Immigration",
  "Green Card Petition",
  "Citizenship",
  "Business / Visitor Visa",
  "OCI Card & Indian Passport",
  "India Visa",
  "Student Visa",
  "Religious Visa",
  "Divorce Services",
  "UK & Canada Visa & P.R.",
  "Various Immigration Services",
];

const COUNTRIES = [
  { name: "USA", flag: "🇺🇸" },
  { name: "Canada", flag: "🇨🇦" },
  { name: "UK", flag: "🇬🇧" },
  { name: "Australia", flag: "🇦🇺" },
  { name: "Italy", flag: "🇮🇹" },
  { name: "Germany", flag: "🇩🇪" },
  { name: "France", flag: "🇫🇷" },
  { name: "India", flag: "🇮🇳" },
];

const STATS = [
  { value: "13+", label: "Years of Excellence" },
  { value: "10000+", label: "Visas Approved", display: "10K+" },
  { value: "98%", label: "Success Rate" },
  { value: "50+", label: "Countries Served" },
];

function AnimatedStat({ value, display, label, index, visible }) {
  const [count, setCount] = useState(0);
  const num = parseInt(value.replace(/\D/g, ""));
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    if (!visible || !num) return;
    let startTime = null;
    const duration = 2000;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * num));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [visible]);

  const shown = display || `${count}${suffix}`;

  return (
    <div
      className="flex flex-col items-center justify-center py-6 px-3 group cursor-default relative"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${600 + index * 130}ms`,
      }}
    >
      <div className="text-3xl xl:text-4xl font-black text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
        {visible ? shown : `0${suffix}`}
      </div>
      <div className="text-[10px] uppercase tracking-[0.18em] text-blue-300/50 mt-1.5 font-semibold text-center" style={{ fontFamily: "'Montserrat', sans-serif" }}>
        {label}
      </div>
      <div className={`h-0.5 w-6 rounded-full mt-3 transition-all duration-500 group-hover:w-14 ${index % 2 === 0 ? "bg-red-500" : "bg-blue-500"}`} />
    </div>
  );
}

export default function Hero() {
  const [visible, setVisible] = useState(false);
  const [serviceIdx, setServiceIdx] = useState(0);
  const [countryIdx, setCountryIdx] = useState(0);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => { const t = setTimeout(() => setVisible(true), 80); return () => clearTimeout(t); }, []);
  useEffect(() => { const id = setInterval(() => setServiceIdx((p) => (p + 1) % SERVICES.length), 2800); return () => clearInterval(id); }, []);
  useEffect(() => { const id = setInterval(() => setCountryIdx((p) => (p + 1) % COUNTRIES.length), 1800); return () => clearInterval(id); }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true); }, { threshold: 0.2 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const anim = (delay) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(28px)",
    transition: `all 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  });

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden" style={{ background: "#04091a" }}>

      {/* ── BACKGROUND IMAGE ── */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.18]"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1920&q=80')" }}
      />

      {/* Gradient layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#04091a] via-[#060e24cc] to-[#0b1840]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#04091a] via-transparent to-[#04091a90]" />

      {/* Red glow top-right */}
      <div className="absolute -top-32 right-0 w-[600px] h-[600px] rounded-full opacity-[0.08] pointer-events-none" style={{ background: "radial-gradient(circle, #dc2626, transparent 65%)" }} />
      {/* Blue glow bottom-left */}
      <div className="absolute bottom-0 -left-20 w-[500px] h-[500px] rounded-full opacity-[0.07] pointer-events-none" style={{ background: "radial-gradient(circle, #1d4ed8, transparent 65%)" }} />

      {/* Diagonal accent line */}
      <div className="absolute top-0 right-0 w-full h-full opacity-[0.035] pointer-events-none"
        style={{ background: "linear-gradient(148deg, transparent 48%, #ef4444 48%, #ef4444 49%, transparent 49%)" }} />

      {/* Dot grid */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "44px 44px" }} />

      {/* Floating particles */}
      {[
        { s: 6, t: "12%", l: "7%", c: "#ef4444", d: "0s" },
        { s: 4, t: "30%", l: "93%", c: "#3b82f6", d: "1.2s" },
        { s: 7, t: "72%", l: "4%", c: "#3b82f6", d: "0.6s" },
        { s: 5, t: "82%", l: "88%", c: "#ef4444", d: "1.8s" },
        { s: 3, t: "18%", l: "78%", c: "#fff", d: "0.9s" },
        { s: 4, t: "55%", l: "55%", c: "#ef4444", d: "2.2s" },
      ].map((p, i) => (
        <div key={i} className="absolute rounded-full animate-pulse pointer-events-none"
          style={{ width: p.s, height: p.s, top: p.t, left: p.l, background: p.c, opacity: 0.25, animationDelay: p.d, animationDuration: "3.5s" }} />
      ))}

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-14 pb-6">
        <div className="grid lg:grid-cols-12 gap-10 xl:gap-16 items-center">

          {/* ─ LEFT ─ */}
          <div className="lg:col-span-7">

            {/* Badge row */}
            <div className="flex flex-wrap items-center gap-3 mb-7" style={anim(0)}>
              <div className="flex items-center gap-2 border border-white/10 bg-white/[0.04] backdrop-blur-sm rounded-full px-4 py-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                <span className="text-[10px] font-bold tracking-[0.18em] text-white/50 uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Est. 2013 · Registered &amp; Bonded
                </span>
              </div>
              <div className="flex items-center gap-2 bg-red-600/10 border border-red-500/20 rounded-full px-4 py-1.5">
                <span className="text-sm">{COUNTRIES[countryIdx].flag}</span>
                <span className="text-[10px] font-bold tracking-[0.15em] text-red-400 uppercase transition-all duration-300" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  {COUNTRIES[countryIdx].name} Visas
                </span>
              </div>
            </div>

            {/* Eyebrow */}
            <p className="text-white/25 text-xs sm:text-sm uppercase tracking-[0.25em] mb-4 font-bold" style={{ ...anim(80), fontFamily: "'Montserrat', sans-serif" }}>
              California Immigration Services Inc.
            </p>

            {/* HEADLINE */}
            <div style={anim(150)}>
              <h1 style={{ fontFamily: "'Playfair Display', serif", lineHeight: 1.04 }}>
                <span className="block text-white text-5xl sm:text-6xl lg:text-7xl xl:text-[82px] font-black">
                  Turning Your
                </span>
                <span
                  className="block text-5xl sm:text-6xl lg:text-7xl xl:text-[82px] font-black mt-1"
                  style={{
                    background: "linear-gradient(110deg, #ef4444 0%, #dc2626 45%, #ff7043 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  American Dream
                </span>
                <span className="block text-white/80 text-5xl sm:text-6xl lg:text-7xl xl:text-[82px] font-black mt-1">
                  Into Reality.
                </span>
              </h1>
            </div>

            {/* Rule */}
            <div className="flex items-center gap-3 my-7" style={anim(280)}>
              <div className="h-px w-14 bg-gradient-to-r from-red-600 to-transparent" />
              <div className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0" />
              <div className="h-px w-6 bg-red-600/30" />
            </div>

            {/* Subtext */}
            <p className="text-lg sm:text-xl text-white/45 leading-relaxed max-w-2xl" style={{ ...anim(350), fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>
              Led by <span className="text-white/80 font-semibold">Founder Kanwal Kaur</span> with{" "}
              <span className="text-red-400 font-semibold">13+ years of expert immigration guidance</span> — helping
              families, professionals &amp; students reach the USA, Canada, UK, Australia, Schengen countries, and beyond.
            </p>

            {/* Cycling service */}
            <div className="flex items-center gap-3 mt-6" style={anim(440)}>
              <span className="text-white/25 text-[10px] uppercase tracking-[0.2em] shrink-0" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                We handle
              </span>
              <div
                key={serviceIdx}
                className="inline-block text-xs font-bold text-white bg-white/[0.06] border border-white/10 rounded-full px-4 py-2"
                style={{ fontFamily: "'Montserrat', sans-serif", animation: "fadeUp 0.45s ease forwards" }}
              >
                ✦&nbsp; {SERVICES[serviceIdx]}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mt-10" style={anim(540)}>
              <Link
                to="/contact"
                className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full px-8 py-4 text-white font-black text-sm uppercase tracking-[0.14em] shadow-2xl shadow-red-900/50 transition-all duration-300 hover:scale-105 hover:shadow-red-700/60"
                style={{ fontFamily: "'Montserrat', sans-serif", background: "linear-gradient(135deg, #dc2626 0%, #991b1b 100%)" }}
              >
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" style={{ background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)" }} />
                <svg className="w-4 h-4 relative z-10" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="relative z-10">Book Free Consultation</span>
              </Link>

              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-3 border border-white/15 hover:border-white/40 text-white/70 hover:text-white rounded-full px-8 py-4 text-sm font-semibold uppercase tracking-[0.13em] backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.06]"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                View All Services
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Trust pills */}
            <div className="flex flex-wrap items-center gap-5 mt-8" style={anim(640)}>
              {[
                { icon: "🏛️", t: "Registered & Bonded" },
                { icon: "🌐", t: "www.caials.in" },
                { icon: "⚡", t: "Fast Processing" },
              ].map((b) => (
                <div key={b.t} className="flex items-center gap-1.5">
                  <span className="text-sm">{b.icon}</span>
                  <span className="text-white/30 text-[11px] font-medium tracking-wider" style={{ fontFamily: "'Montserrat', sans-serif" }}>{b.t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ─ RIGHT: Services card ─ */}
          <div className="hidden lg:block lg:col-span-5" style={anim(250)}>
            <div className="rounded-2xl overflow-hidden border border-white/[0.08] bg-white/[0.025] backdrop-blur-md shadow-2xl shadow-black/50">
              {/* header */}
              <div className="px-5 py-4" style={{ background: "linear-gradient(135deg, #991b1b, #7f1d1d)" }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-white/50" />
                    <h3 className="text-white font-bold text-xs uppercase tracking-[0.2em]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      Our Services
                    </h3>
                  </div>
                  <span className="text-white/40 text-[10px]" style={{ fontFamily: "'Montserrat', sans-serif" }}>caials.in</span>
                </div>
              </div>
              {/* list */}
              <div className="px-5 py-3">
                {SERVICES.map((s, i) => (
                  <div
                    key={s}
                    className="flex items-center gap-3 py-2.5 border-b border-white/[0.05] last:border-0 group cursor-default"
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible ? "translateX(0)" : "translateX(16px)",
                      transition: `all 0.5s ease ${480 + i * 65}ms`,
                    }}
                  >
                    <svg className="w-3 h-3 text-red-500 shrink-0 group-hover:translate-x-0.5 transition-transform duration-150" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="text-white/60 text-[13px] group-hover:text-white transition-colors duration-200 font-medium" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      {s}
                    </span>
                  </div>
                ))}
              </div>
              {/* footer */}
              <div className="px-5 py-3 border-t border-white/[0.06] bg-white/[0.015]">
                <p className="text-center text-[10px] text-white/25 uppercase tracking-[0.18em]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  + Many More Immigration Services
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── STATS ── */}
        <div
          ref={statsRef}
          className="mt-14 grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.06] border border-white/[0.07] rounded-2xl overflow-hidden backdrop-blur-sm bg-white/[0.015]"
        >
          {STATS.map((s, i) => (
            <AnimatedStat key={s.label} {...s} index={i} visible={statsVisible} />
          ))}
        </div>

        {/* ── COUNTRIES STRIP ── */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3" style={anim(1000)}>
          <span className="text-white/20 text-[10px] uppercase tracking-[0.22em] font-bold" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            We Serve
          </span>
          {COUNTRIES.map((c) => (
            <div key={c.name} className="flex items-center gap-1.5 bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.07] rounded-full px-3 py-1 transition-all duration-200 cursor-default">
              <span className="text-sm">{c.flag}</span>
              <span className="text-white/45 text-[11px] font-semibold" style={{ fontFamily: "'Montserrat', sans-serif" }}>{c.name}</span>
            </div>
          ))}
          <span className="text-white/25 text-[11px] font-semibold italic" style={{ fontFamily: "'Lato', sans-serif" }}>+ Schengen &amp; More</span>
        </div>
      </div>

      {/* scroll hint */}
      <div className="relative z-10 flex flex-col items-center gap-1.5 pb-8 mt-2 opacity-25 animate-bounce">
        <span className="text-white text-[9px] uppercase tracking-[0.25em]" style={{ fontFamily: "'Montserrat', sans-serif" }}>Scroll</span>
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* bottom vignette */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#04091a] to-transparent pointer-events-none" />

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}