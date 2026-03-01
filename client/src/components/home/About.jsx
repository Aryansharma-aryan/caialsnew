import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import founder from "../../assets/founder.jpeg"

/* ── Intersection Observer hook ── */
function useReveal(threshold = 0.15) {
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

/* ── Animated counter ── */
function Counter({ to, suffix = "", duration = 2000, start }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let s = null;
    const step = (ts) => {
      if (!s) s = ts;
      const p = Math.min((ts - s) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(ease * to));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start]);
  return <>{start ? val : 0}{suffix}</>;
}

const STATS = [
  { to: 13, suffix: "+", label: "Years Experience" },
  { to: 10000, suffix: "+", label: "Visas Approved", display: "10K+" },
  { to: 98, suffix: "%", label: "Success Rate" },
  { to: 50, suffix: "+", label: "Countries Served" },
];

const VALUES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Integrity First",
    desc: "We handle every case with full transparency, honesty, and unwavering ethical standards.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Family Focused",
    desc: "We treat every client like family — your dreams matter deeply to us.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Fast & Efficient",
    desc: "Streamlined processes to move your case forward without delays.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
      </svg>
    ),
    title: "Global Reach",
    desc: "Serving clients across USA, Canada, UK, Australia, Schengen nations and beyond.",
  },
];

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
  "UK Visa",
  "Canada Visa & P.R.",
  "Various Immigration Services",
];

const TIMELINE = [
  { year: "2013", title: "Founded in Fremont, CA", desc: "Kanwal Kaur established CAIS Inc. with a vision to make immigration accessible and stress-free for every family." },
  { year: "2015", title: "Expanded Services", desc: "Added UK, Canada P.R., and Schengen visa services to serve a broader international clientele." },
  { year: "2018", title: "5,000+ Cases Milestone", desc: "Crossed the 5,000 approved visas milestone with a consistent 97%+ success rate." },
  { year: "2021", title: "Digital Transformation", desc: "Launched online consultation and document management to serve clients anywhere in the world." },
  { year: "2024", title: "10,000+ Visas Approved", desc: "Over a decade of excellence — 10,000+ families united, dreams fulfilled, borders crossed." },
];

/* ────────────────────────────────────────────── */
export default function About() {
  const [heroRef, heroVisible] = useReveal(0.05);
  const [storyRef, storyVisible] = useReveal(0.1);
  const [statsRef, statsVisible] = useReveal(0.2);
  const [valRef, valVisible] = useReveal(0.1);
  const [timeRef, timeVisible] = useReveal(0.1);
  const [servRef, servVisible] = useReveal(0.1);
  const [ctaRef, ctaVisible] = useReveal(0.2);

  const anim = (visible, delay = 0, dir = "up") => ({
    opacity: visible ? 1 : 0,
    transform: visible
      ? "translate(0,0)"
      : dir === "up"
      ? "translateY(36px)"
      : dir === "left"
      ? "translateX(-36px)"
      : "translateX(36px)",
    transition: `opacity 0.8s ease ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  });

  return (
    <div className="bg-[#04091a] min-h-screen overflow-x-hidden" style={{ fontFamily: "'Montserrat', sans-serif" }}>

      {/* ═══════════════════════════════════
          HERO BANNER
      ═══════════════════════════════════ */}
      <section ref={heroRef} className="relative pt-20 pb-24 overflow-hidden">
        {/* bg image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=1920&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#04091a] via-[#04091aee] to-[#0b1840]" />
        {/* red glow */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 pointer-events-none" style={{ background: "radial-gradient(circle, #dc2626, transparent 70%)" }} />
        {/* dot grid */}
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize: "44px 44px" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div style={anim(heroVisible, 0)}>
            <span className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.04] rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-white/40 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse inline-block" />
              About Us
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6" style={{ ...anim(heroVisible, 100), fontFamily: "'Playfair Display', serif" }}>
            A Legacy of{" "}
            <span style={{ background: "linear-gradient(110deg,#ef4444,#dc2626,#ff7043)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Trust
            </span>{" "}
            &amp;{" "}
            <br className="hidden sm:block" />
            <span className="text-blue-200">Excellence</span>
          </h1>
          <p className="text-white/45 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed" style={{ ...anim(heroVisible, 220), fontWeight: 300, fontFamily: "'Lato', sans-serif" }}>
            Since 2013, California Immigration Services Inc. has been the trusted gateway for thousands of families,
            professionals, and dreamers navigating the path to a new life.
          </p>

          {/* breadcrumb */}
          <div className="flex items-center justify-center gap-2 mt-8 text-white/25 text-xs uppercase tracking-[0.18em]" style={anim(heroVisible, 320)}>
            <Link to="/" className="hover:text-red-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/50">About Us</span>
          </div>
        </div>

        {/* diagonal bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#04091a]" style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }} />
      </section>


      {/* ═══════════════════════════════════
          FOUNDER STORY
      ═══════════════════════════════════ */}
      <section ref={storyRef} className="relative py-24 bg-[#04091a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left — visual card */}
            <div style={anim(storyVisible, 0, "left")} className="relative">
              {/* main image frame */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/60">
                <img
                  src={founder}
                  alt="Professional immigration consultant"
                  className="w-full h-[420px] object-cover object-top opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04091a] via-transparent to-transparent" />

                {/* overlay badge */}
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="bg-white/[0.07] backdrop-blur-md border border-white/10 rounded-xl px-5 py-4">
                    <p className="text-white font-black text-xl" style={{ fontFamily: "'Playfair Display', serif" }}>Kanwal Kaur</p>
                    <p className="text-red-400 text-xs font-bold uppercase tracking-[0.18em] mt-0.5">Founder &amp; Director</p>
                    <p className="text-white/40 text-xs mt-1.5">California Immigration Services Inc.</p>
                  </div>
                </div>
              </div>

              {/* floating stat card */}
              <div className="absolute -top-5 -right-5 bg-gradient-to-br from-red-600 to-red-800 rounded-2xl px-6 py-5 shadow-xl shadow-red-900/50 border border-red-500/30">
                <div className="text-white text-3xl font-black" style={{ fontFamily: "'Playfair Display', serif" }}>13+</div>
                <div className="text-red-200 text-[10px] uppercase tracking-[0.2em] font-bold mt-0.5">Years of<br />Excellence</div>
              </div>

              {/* floating second badge */}
              <div className="absolute -bottom-4 -left-4 bg-[#0b1840] border border-blue-500/20 rounded-2xl px-5 py-4 shadow-xl">
                <div className="text-white text-2xl font-black" style={{ fontFamily: "'Playfair Display', serif" }}>10K+</div>
                <div className="text-blue-300 text-[10px] uppercase tracking-[0.18em] font-bold mt-0.5">Visas<br />Approved</div>
              </div>
            </div>

            {/* Right — story text */}
            <div style={anim(storyVisible, 150, "right")}>
              <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-red-400 mb-4">
                <span className="w-6 h-px bg-red-600 inline-block" />
                Our Story
              </span>
              <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                More Than an Agency —{" "}
                <span style={{ background: "linear-gradient(110deg,#ef4444,#dc2626)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  We're Your Partner.
                </span>
              </h2>

              <div className="space-y-5 text-white/50 leading-relaxed" style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300, fontSize: "1.05rem" }}>
                <p>
                  Founded in <span className="text-white font-semibold">2013 by Kanwal Kaur</span> in the heart of Fremont, California,
                  California Immigration Services Inc. was built on a single belief: every person deserves expert,
                  honest immigration guidance — regardless of background or complexity.
                </p>
                <p>
                  With <span className="text-red-400 font-semibold">13+ years of hands-on experience</span>, Kanwal has guided thousands of
                  individuals and families through the most complex immigration processes — from green card petitions
                  and citizenship applications to OCI cards, student visas, religious visas, and international
                  visa services for UK, Canada, Australia, and Schengen countries.
                </p>
                <p>
                  <span className="text-white font-semibold">Registered & Bonded</span>, our firm operates with the highest standards of
                  professionalism, compassion, and confidentiality. We don't just process paperwork — we change lives.
                </p>
              </div>

              {/* contact strip */}
              <div className="mt-8 grid sm:grid-cols-2 gap-3">
                {[
                  { icon: "📍", label: "Address", val: "2450 Peralta Blvd, Suite #107\nFremont, CA 94536" },
                  { icon: "📞", label: "Phone", val: "+1 (408) 422-8585" },
                  { icon: "✉️", label: "Email", val: "rosy@caials.in\ninfo@caials.in" },
                  { icon: "🌐", label: "Website", val: "www.caials.in" },
                ].map((c) => (
                  <div key={c.label} className="flex items-start gap-3 bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 hover:border-red-600/30 transition-colors duration-300">
                    <span className="text-xl mt-0.5">{c.icon}</span>
                    <div>
                      <p className="text-white/30 text-[9px] uppercase tracking-[0.2em] font-bold mb-0.5">{c.label}</p>
                      <p className="text-white/70 text-xs font-medium leading-snug whitespace-pre-line">{c.val}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-white font-black text-sm uppercase tracking-[0.14em] shadow-xl shadow-red-900/40 hover:scale-105 transition-all duration-300"
                  style={{ background: "linear-gradient(135deg,#dc2626,#991b1b)" }}
                >
                  Get a Free Consultation
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════
          STATS STRIP
      ═══════════════════════════════════ */}
      <section ref={statsRef} className="py-6 bg-[#060c20] border-y border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.06]">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className="flex flex-col items-center py-8 px-4 group cursor-default"
                style={{
                  opacity: statsVisible ? 1 : 0,
                  transform: statsVisible ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 120}ms`,
                }}
              >
                <div className="text-4xl xl:text-5xl font-black text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {s.display ? (statsVisible ? s.display : `0${s.suffix}`) : (
                    <Counter to={s.to} suffix={s.suffix} start={statsVisible} />
                  )}
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/35 font-bold mt-2">{s.label}</div>
                <div className={`h-0.5 w-8 rounded-full mt-3 group-hover:w-16 transition-all duration-500 ${i % 2 === 0 ? "bg-red-600" : "bg-blue-600"}`} />
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════
          CORE VALUES
      ═══════════════════════════════════ */}
      <section ref={valRef} className="py-24 bg-[#04091a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* heading */}
          <div className="text-center mb-16" style={anim(valVisible, 0)}>
            <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-red-400 mb-4">
              <span className="w-6 h-px bg-red-600 inline-block" />
              What Drives Us
              <span className="w-6 h-px bg-red-600 inline-block" />
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
              Our Core <span style={{ background: "linear-gradient(110deg,#ef4444,#dc2626)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Values</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v, i) => (
              <div
                key={v.title}
                className="group relative rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:border-red-600/30 hover:bg-white/[0.04] p-7 transition-all duration-400 cursor-default overflow-hidden"
                style={{
                  opacity: valVisible ? 1 : 0,
                  transform: valVisible ? "translateY(0)" : "translateY(30px)",
                  transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 110}ms`,
                }}
              >
                {/* hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" style={{ background: "radial-gradient(circle at 50% 0%, #dc262615, transparent 70%)" }} />
                <div className="text-red-400 mb-5 group-hover:scale-110 transition-transform duration-300">{v.icon}</div>
                <h3 className="text-white font-black text-lg mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>{v.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed" style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>{v.desc}</p>
                <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-red-600 to-blue-600 transition-all duration-500 rounded-b-2xl" />
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════
          TIMELINE
      ═══════════════════════════════════ */}
      <section ref={timeRef} className="py-24 bg-[#060c20]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" style={anim(timeVisible, 0)}>
            <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-red-400 mb-4">
              <span className="w-6 h-px bg-red-600 inline-block" />
              Our Journey
              <span className="w-6 h-px bg-red-600 inline-block" />
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
              A Decade of{" "}
              <span style={{ background: "linear-gradient(110deg,#ef4444,#dc2626)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Making History
              </span>
            </h2>
          </div>

          {/* vertical timeline */}
          <div className="relative">
            {/* center line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent hidden md:block" />

            <div className="space-y-10">
              {TIMELINE.map((t, i) => (
                <div
                  key={t.year}
                  className={`flex items-start gap-6 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                  style={{
                    opacity: timeVisible ? 1 : 0,
                    transform: timeVisible ? "translateY(0)" : "translateY(25px)",
                    transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 130}ms`,
                  }}
                >
                  {/* content */}
                  <div className={`flex-1 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <div className="bg-white/[0.03] border border-white/[0.07] hover:border-red-600/25 rounded-2xl p-6 transition-all duration-300 group">
                      <span className="text-red-500 text-xs font-black uppercase tracking-[0.2em]">{t.year}</span>
                      <h3 className="text-white font-black text-lg mt-1 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{t.title}</h3>
                      <p className="text-white/40 text-sm leading-relaxed" style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>{t.desc}</p>
                    </div>
                  </div>

                  {/* center dot */}
                  <div className="relative z-10 shrink-0 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-[#0b1840] border-2 border-red-600 shadow-lg shadow-red-900/40">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-600" />
                  </div>

                  {/* spacer */}
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


    


      {/* ═══════════════════════════════════
          CTA BANNER
      ═══════════════════════════════════ */}
      <section ref={ctaRef} className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/30 via-[#04091a] to-blue-900/20" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize: "36px 36px" }} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-600/30 to-transparent" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <div style={anim(ctaVisible, 0)}>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Ready to Start Your{" "}
              <span style={{ background: "linear-gradient(110deg,#ef4444,#ff7043)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Journey?
              </span>
            </h2>
            <p className="text-white/45 text-lg mb-8" style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>
              Book a free consultation with Kanwal Kaur today. We'll assess your case and chart the best path forward.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center" style={anim(ctaVisible, 150)}>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-3 rounded-full px-9 py-4 text-white font-black text-sm uppercase tracking-[0.14em] shadow-2xl shadow-red-900/50 hover:scale-105 transition-all duration-300"
              style={{ background: "linear-gradient(135deg,#dc2626,#991b1b)" }}
            >
              Book Free Consultation
            </Link>
            <a
              href="tel:+14084228585"
              className="inline-flex items-center justify-center gap-3 border border-white/15 hover:border-white/35 text-white/70 hover:text-white rounded-full px-9 py-4 text-sm font-bold uppercase tracking-[0.13em] backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.05]"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +1 (408) 422-8585
            </a>
          </div>

          {/* contact chips */}
          <div className="flex flex-wrap justify-center gap-4 mt-8" style={anim(ctaVisible, 300)}>
            {[
              { icon: "✉️", val: "rosy@caials.in" },
              { icon: "✉️", val: "info@caials.in" },
              { icon: "📍", val: "Fremont, CA 94536" },
            ].map((c) => (
              <span key={c.val} className="flex items-center gap-1.5 text-white/30 text-[11px] font-medium">
                <span>{c.icon}</span> {c.val}
              </span>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}