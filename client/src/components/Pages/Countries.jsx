import { useEffect, useRef, useState, useCallback } from "react";
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

const anim = (visible, delay = 0, dir = "up") => ({
  opacity: visible ? 1 : 0,
  transform: visible
    ? "translate(0,0)"
    : dir === "left" ? "translateX(-28px)"
    : dir === "right" ? "translateX(28px)"
    : "translateY(26px)",
  transition: `opacity 0.75s ease ${delay}ms, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
});

/* ─────────────────────────────────────────
   COUNTRIES DATA
───────────────────────────────────────── */
const COUNTRIES = [
  {
    id: "usa",
    name: "United States",
    flag: "🇺🇸",
    accent: "#ef4444",
    bg: "from-red-900/30 to-blue-900/20",
    capital: "Washington D.C.",
    region: "North America",
    tagline: "The Land of Opportunity",
    description:
      "The United States remains the world's most sought-after immigration destination. From Green Cards to Citizenship, CAIS Inc. has guided thousands of families to call America their permanent home.",
    popularVisas: ["Green Card", "Family Petition", "Citizenship", "B-1/B-2 Visitor", "F-1 Student", "Work Authorization"],
    processingTime: "6 months – 5 years",
    successRate: "98%",
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80",
    highlights: ["World's largest economy", "Diverse culture & opportunities", "Top-ranked universities", "Advanced healthcare system"],
    stats: { immigrants: "1M+/year", gdp: "$27 Trillion", universities: "4,000+", cities: "50 States" },
  },
  {
    id: "canada",
    name: "Canada",
    flag: "🇨🇦",
    accent: "#ef4444",
    bg: "from-red-900/25 to-rose-900/15",
    capital: "Ottawa",
    region: "North America",
    tagline: "Welcoming the World",
    description:
      "Canada consistently ranks as one of the world's best countries for immigration. With Express Entry, Provincial Nominee Programs, and family sponsorship pathways, we help you achieve Permanent Residence.",
    popularVisas: ["Express Entry PR", "Provincial Nominee", "Visitor Visa", "Study Permit", "Work Permit", "Spousal Sponsorship"],
    processingTime: "2 months – 2 years",
    successRate: "96%",
    image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=800&q=80",
    highlights: ["Universal healthcare", "Safe & multicultural", "Strong economy", "Excellent quality of life"],
    stats: { immigrants: "400K+/year", gdp: "$2.1 Trillion", universities: "100+", cities: "10 Provinces" },
  },
  {
    id: "uk",
    name: "United Kingdom",
    flag: "🇬🇧",
    accent: "#3b82f6",
    bg: "from-blue-900/25 to-indigo-900/20",
    capital: "London",
    region: "Europe",
    tagline: "Where History Meets Opportunity",
    description:
      "The United Kingdom offers world-class education, a dynamic economy, and a rich cultural heritage. Our team handles UK Standard Visitor, Student, Skilled Worker, and Family visas with expertise.",
    popularVisas: ["Standard Visitor Visa", "Student Visa", "Skilled Worker", "Family Visa", "ILR Settlement", "UK Citizenship"],
    processingTime: "3 – 12 weeks",
    successRate: "93%",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80",
    highlights: ["World-renowned universities", "NHS healthcare", "Global financial hub", "Rich cultural heritage"],
    stats: { immigrants: "500K+/year", gdp: "$3.1 Trillion", universities: "160+", cities: "4 Nations" },
  },
  {
    id: "australia",
    name: "Australia",
    flag: "🇦🇺",
    accent: "#f59e0b",
    bg: "from-yellow-900/20 to-green-900/15",
    capital: "Canberra",
    region: "Oceania",
    tagline: "A Land of Endless Possibilities",
    description:
      "Australia's points-based immigration system rewards skilled workers and international students. We assist with tourist, student, and skilled migration visas for this breathtaking destination.",
    popularVisas: ["Tourist Visa (600)", "Student Visa (500)", "Skilled Independent (189)", "Employer Nominated (186)", "Partner Visa", "Working Holiday"],
    processingTime: "1 month – 18 months",
    successRate: "94%",
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80",
    highlights: ["High quality of life", "World-class education", "Strong job market", "Stunning natural beauty"],
    stats: { immigrants: "200K+/year", gdp: "$1.7 Trillion", universities: "43", cities: "8 States/Territories" },
  },
  {
    id: "india",
    name: "India",
    flag: "🇮🇳",
    accent: "#f97316",
    bg: "from-orange-900/25 to-green-900/15",
    capital: "New Delhi",
    region: "South Asia",
    tagline: "The Soul of Civilization",
    description:
      "For NRIs and those wishing to visit India, CAIS Inc. handles all India visa categories and OCI card services. From e-Visa processing to Indian passport renewals, we keep you connected to your roots.",
    popularVisas: ["India e-Visa", "India Tourist Visa", "Business Visa", "Medical Visa", "OCI Card", "Indian Passport Renewal"],
    processingTime: "3 – 15 business days",
    successRate: "99%",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80",
    highlights: ["Ancient cultural heritage", "Fastest growing major economy", "World's largest democracy", "Vibrant festivals & cuisine"],
    stats: { nriPopulation: "18M+", gdp: "$3.9 Trillion", languages: "22 Official", states: "28 States" },
  },
  {
    id: "italy",
    name: "Italy",
    flag: "🇮🇹",
    accent: "#22c55e",
    bg: "from-green-900/20 to-red-900/15",
    capital: "Rome",
    region: "Schengen / Europe",
    tagline: "La Dolce Vita Awaits",
    description:
      "Italy — gateway to the Schengen Zone — opens doors to 26 European countries. Our team prepares comprehensive Schengen visa applications with high approval rates for business and tourism.",
    popularVisas: ["Schengen Tourist Visa", "Schengen Business Visa", "Student Visa", "Long-Stay Visa (D)", "Work Authorization", "Family Reunion"],
    processingTime: "2 – 4 weeks",
    successRate: "92%",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80",
    highlights: ["Gateway to 26 Schengen countries", "UNESCO World Heritage sites", "World-class cuisine & wine", "Rich art and architecture"],
    stats: { schengenAccess: "26 Countries", gdp: "$2.2 Trillion", tourists: "65M+/year", regions: "20 Regions" },
  },
  {
    id: "germany",
    name: "Germany",
    flag: "🇩🇪",
    accent: "#facc15",
    bg: "from-yellow-900/20 to-gray-900/20",
    capital: "Berlin",
    region: "Schengen / Europe",
    tagline: "Engineering the Future",
    description:
      "Germany is Europe's strongest economy and a leading destination for skilled workers and students. CAIS Inc. assists with Schengen visas and long-stay permits for this powerhouse nation.",
    popularVisas: ["Schengen Visa", "National Visa (D)", "Job Seeker Visa", "Student Visa", "Family Reunion", "EU Blue Card"],
    processingTime: "2 – 8 weeks",
    successRate: "91%",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80",
    highlights: ["Europe's largest economy", "Free/low-cost universities", "Engineering & tech hub", "Excellent public transport"],
    stats: { gdp: "$4.5 Trillion", universities: "400+", intlStudents: "300K+/year", regions: "16 States" },
  },
  {
    id: "france",
    name: "France",
    flag: "🇫🇷",
    accent: "#60a5fa",
    bg: "from-blue-900/20 to-red-900/15",
    capital: "Paris",
    region: "Schengen / Europe",
    tagline: "Art, Culture & Excellence",
    description:
      "France, home to the Eiffel Tower and global fashion, also leads in education, cuisine, and culture. Our team handles Schengen and long-stay French visa applications for visitors and students alike.",
    popularVisas: ["Schengen Tourist Visa", "Long-Stay Student Visa", "Work Permit", "Family Visa", "Talent Passport", "Business Visa"],
    processingTime: "2 – 6 weeks",
    successRate: "91%",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
    highlights: ["Cultural capital of the world", "Top-ranked universities", "World-class cuisine & wine", "Strong social system"],
    stats: { tourists: "90M+/year", gdp: "$3.0 Trillion", universities: "250+", regions: "18 Regions" },
  },
  {
    id: "spain",
    name: "Spain",
    flag: "🇪🇸",
    accent: "#f97316",
    bg: "from-orange-900/20 to-yellow-900/15",
    capital: "Madrid",
    region: "Schengen / Europe",
    tagline: "Vibrant Life Under the Sun",
    description:
      "Spain's stunning coastlines, vibrant cities, and warm culture make it a top destination. As a Schengen member, a Spanish visa grants access to 26 European countries.",
    popularVisas: ["Schengen Tourist Visa", "Student Visa", "Non-Lucrative Visa", "Digital Nomad Visa", "Golden Visa", "Work Permit"],
    processingTime: "2 – 6 weeks",
    successRate: "90%",
    image: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=800&q=80",
    highlights: ["26 Schengen countries access", "Mediterranean lifestyle", "UNESCO sites & culture", "Low cost of living"],
    stats: { tourists: "75M+/year", gdp: "$1.6 Trillion", universities: "76+", regions: "17 Communities" },
  },
  {
    id: "portugal",
    name: "Portugal",
    flag: "🇵🇹",
    accent: "#22c55e",
    bg: "from-green-900/20 to-red-900/10",
    capital: "Lisbon",
    region: "Schengen / Europe",
    tagline: "Europe's Atlantic Soul",
    description:
      "Portugal has emerged as one of Europe's most attractive immigration destinations with its Golden Visa program, D7 passive income visa, and digital nomad permit — all accessible via CAIS Inc.",
    popularVisas: ["Schengen Tourist Visa", "Golden Visa", "D7 Passive Income Visa", "Digital Nomad Visa", "Student Visa", "Family Reunification"],
    processingTime: "2 – 8 weeks",
    successRate: "92%",
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=800&q=80",
    highlights: ["Affordable cost of living", "NHR tax regime benefits", "Golden Visa program", "Schengen zone access"],
    stats: { tourists: "27M+/year", gdp: "$267 Billion", universities: "35+", regions: "7 Regions" },
  },
  {
    id: "schengen",
    name: "Schengen Zone",
    flag: "🇪🇺",
    accent: "#6366f1",
    bg: "from-indigo-900/25 to-blue-900/15",
    capital: "Multiple Capitals",
    region: "Europe (26 Countries)",
    tagline: "One Visa. A Continent of Possibilities.",
    description:
      "The Schengen Area allows free movement across 26 European countries with a single visa. CAIS Inc. prepares strong Schengen applications for tourism, business, and family visits with a high approval record.",
    popularVisas: ["Schengen Tourist Visa (C)", "Schengen Business Visa", "Transit Visa (A/B)", "Long-Stay National Visa (D)", "Multi-Entry Schengen", "Medical Visit Visa"],
    processingTime: "1 – 4 weeks",
    successRate: "91%",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80",
    highlights: ["26 countries, 1 visa", "Free movement across borders", "Business & tourism flexibility", "Valid up to 90 days / 180"],
    stats: { countries: "26", population: "420 Million", gdp: "$17+ Trillion", area: "4.3M km²" },
  },
];

/* ── Big Feature Carousel (top) ── */
function FeaturedCarousel({ visible }) {
  const [active, setActive] = useState(0);
  const featured = COUNTRIES.slice(0, 5);
  const timerRef = useRef(null);

  const go = useCallback((idx) => {
    setActive((idx + featured.length) % featured.length);
  }, [featured.length]);

  useEffect(() => {
    timerRef.current = setInterval(() => go(active + 1), 4500);
    return () => clearInterval(timerRef.current);
  }, [active, go]);

  const c = featured[active];

  return (
    <div className="relative rounded-3xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/60"
      style={{ minHeight: 480 }}>
      {/* bg image */}
      {featured.map((f, i) => (
        <div key={f.id}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
          style={{ backgroundImage: `url('${f.image}')`, opacity: i === active ? 0.35 : 0 }} />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-[#04091a] via-[#04091a80] to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#04091a] via-transparent to-transparent" />

      {/* content */}
      <div className="relative z-10 p-8 lg:p-12 flex flex-col justify-end h-full" style={{ minHeight: 480 }}>
        {/* tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {featured.map((f, i) => (
            <button key={f.id} onClick={() => { clearInterval(timerRef.current); go(i); }}
              className="flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] transition-all duration-300"
              style={{
                background: i === active ? `${f.accent}30` : "rgba(255,255,255,0.05)",
                border: `1px solid ${i === active ? f.accent + "60" : "rgba(255,255,255,0.08)"}`,
                color: i === active ? f.accent : "rgba(255,255,255,0.4)",
              }}>
              <span className="text-base">{f.flag}</span>
              <span className="hidden sm:inline">{f.name}</span>
            </button>
          ))}
        </div>

        {/* detail */}
        <div key={active} style={{ animation: "fadeUp 0.5s ease forwards" }}>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-5xl">{c.flag}</span>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/30">{c.region}</span>
              <h3 className="text-white font-black text-3xl lg:text-4xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                {c.name}
              </h3>
            </div>
          </div>
          <p className="text-base font-bold mb-2" style={{ color: c.accent }}>{c.tagline}</p>
          <p className="text-white/50 text-sm max-w-xl leading-relaxed mb-6"
            style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>
            {c.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {c.popularVisas.slice(0, 4).map((v) => (
              <span key={v} className="text-xs font-semibold rounded-full px-3 py-1.5 border"
                style={{ background: `${c.accent}15`, borderColor: `${c.accent}30`, color: c.accent }}>
                {v}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* nav arrows */}
      <button onClick={() => { clearInterval(timerRef.current); go(active - 1); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all duration-200 hover:scale-110">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button onClick={() => { clearInterval(timerRef.current); go(active + 1); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all duration-200 hover:scale-110">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* dots */}
      <div className="absolute bottom-4 right-8 flex gap-1.5">
        {featured.map((_, i) => (
          <button key={i} onClick={() => { clearInterval(timerRef.current); go(i); }}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === active ? 20 : 6,
              height: 6,
              background: i === active ? c.accent : "rgba(255,255,255,0.2)",
            }} />
        ))}
      </div>
    </div>
  );
}

/* ── Horizontal Scroll Carousel ── */
function HorizontalCarousel({ title, subtitle, countries, accent = "#ef4444" }) {
  const [ref, visible] = useReveal(0.05);
  const [selected, setSelected] = useState(null);
  const trackRef = useRef(null);

  const scroll = (dir) => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: dir * 320, behavior: "smooth" });
    }
  };

  return (
    <div ref={ref} className="py-20">
      {/* section header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex items-end justify-between gap-6">
          <div style={anim(visible, 0)}>
            <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] mb-3"
              style={{ color: accent }}>
              <span className="w-6 h-px inline-block" style={{ background: accent }} />
              {subtitle}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              {title}
            </h2>
          </div>
          <div className="flex gap-2 shrink-0" style={anim(visible, 100)}>
            <button onClick={() => scroll(-1)}
              className="w-10 h-10 rounded-full border border-white/10 hover:border-white/30 text-white/50 hover:text-white flex items-center justify-center transition-all duration-200 hover:bg-white/[0.05]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button onClick={() => scroll(1)}
              className="w-10 h-10 rounded-full border border-white/10 hover:border-white/30 text-white/50 hover:text-white flex items-center justify-center transition-all duration-200 hover:bg-white/[0.05]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* scrollable track */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={trackRef}
          className="flex gap-5 overflow-x-auto pb-4 scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {countries.map((c, i) => (
            <CountryCard key={c.id} country={c} index={i} visible={visible}
              onClick={() => setSelected(selected?.id === c.id ? null : c)} />
          ))}
        </div>
      </div>

      {/* expanded detail panel */}
      {selected && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <CountryDetailPanel country={selected} onClose={() => setSelected(null)} />
        </div>
      )}
    </div>
  );
}

/* ── Country Card ── */
function CountryCard({ country: c, index, visible, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="shrink-0 w-72 rounded-2xl overflow-hidden border cursor-pointer transition-all duration-400 relative"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(24px) scale(0.97)",
        transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 70}ms`,
        borderColor: hovered ? `${c.accent}50` : "rgba(255,255,255,0.07)",
        boxShadow: hovered ? `0 20px 48px ${c.accent}20` : "none",
        background: "#060c20",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {/* image */}
      <div className="relative overflow-hidden h-40">
        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
          style={{
            backgroundImage: `url('${c.image}')`,
            transform: hovered ? "scale(1.08)" : "scale(1)",
            opacity: 0.7,
          }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060c20] via-[#060c2060] to-transparent" />
        {/* flag overlay */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="text-3xl">{c.flag}</span>
        </div>
        {/* region badge */}
        <div className="absolute top-3 right-3 rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.15em]"
          style={{ background: `${c.accent}30`, color: c.accent, border: `1px solid ${c.accent}40` }}>
          {c.region.split("/")[0].trim()}
        </div>
      </div>

      {/* content */}
      <div className="p-5">
        <h3 className="text-white font-black text-xl mb-0.5" style={{ fontFamily: "'Playfair Display', serif" }}>
          {c.name}
        </h3>
        <p className="text-xs font-bold uppercase tracking-[0.14em] mb-3" style={{ color: c.accent }}>
          {c.tagline}
        </p>

        {/* visa chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {c.popularVisas.slice(0, 3).map((v) => (
            <span key={v} className="text-[10px] rounded-full px-2.5 py-1 font-semibold"
              style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.08)" }}>
              {v}
            </span>
          ))}
          {c.popularVisas.length > 3 && (
            <span className="text-[10px] rounded-full px-2.5 py-1 font-semibold"
              style={{ background: `${c.accent}15`, color: c.accent, border: `1px solid ${c.accent}25` }}>
              +{c.popularVisas.length - 3} more
            </span>
          )}
        </div>

        {/* bottom row */}
        <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
          <div>
            <p className="text-[9px] uppercase tracking-[0.18em] text-white/25">Success Rate</p>
            <p className="text-white font-black text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>{c.successRate}</p>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide transition-all duration-300"
            style={{ color: hovered ? c.accent : "rgba(255,255,255,0.3)" }}>
            {hovered ? "Close" : "Details"}
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d={hovered ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
            </svg>
          </div>
        </div>
      </div>

      {/* bottom accent */}
      <div className="absolute bottom-0 left-0 h-0.5 transition-all duration-500 rounded-b-2xl"
        style={{ width: hovered ? "100%" : "0%", background: `linear-gradient(90deg, ${c.accent}, ${c.accent}60)` }} />
    </div>
  );
}

/* ── Country Detail Panel (expands below card row) ── */
function CountryDetailPanel({ country: c, onClose }) {
  return (
    <div className="rounded-2xl border overflow-hidden"
      style={{ borderColor: `${c.accent}30`, background: "linear-gradient(135deg, #060c20, #04091a)", animation: "expandDown 0.4s ease forwards" }}>
      {/* header bar */}
      <div className="flex items-center justify-between px-7 py-5 border-b"
        style={{ borderColor: `${c.accent}20`, background: `${c.accent}0a` }}>
        <div className="flex items-center gap-4">
          <span className="text-4xl">{c.flag}</span>
          <div>
            <h3 className="text-white font-black text-2xl" style={{ fontFamily: "'Playfair Display', serif" }}>{c.name}</h3>
            <p className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: c.accent }}>{c.tagline}</p>
          </div>
        </div>
        <button onClick={onClose}
          className="w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white border border-white/10 hover:border-white/30 transition-all duration-200">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-0">
        {/* col 1: overview + highlights */}
        <div className="lg:col-span-1 p-7 border-r" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/25 mb-3">Overview</p>
          <p className="text-white/55 text-sm leading-relaxed mb-6"
            style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>
            {c.description}
          </p>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/25 mb-3">Key Highlights</p>
          <div className="space-y-2">
            {c.highlights.map((h) => (
              <div key={h} className="flex items-center gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: c.accent }} />
                <span className="text-white/60 text-xs">{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* col 2: visas + timing */}
        <div className="lg:col-span-1 p-7 border-r" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/25 mb-3">Visa Services We Offer</p>
          <div className="space-y-2 mb-6">
            {c.popularVisas.map((v) => (
              <div key={v} className="flex items-center gap-2.5 group">
                <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"
                  style={{ color: c.accent }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
                <span className="text-white/60 text-xs font-medium group-hover:text-white/90 transition-colors">{v}</span>
              </div>
            ))}
          </div>

          {/* timing + rate */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl p-3 text-center border border-white/[0.06] bg-white/[0.02]">
              <p className="text-white font-black text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>{c.processingTime}</p>
              <p className="text-white/25 text-[9px] uppercase tracking-[0.14em] mt-1">Processing Time</p>
            </div>
            <div className="rounded-xl p-3 text-center border border-white/[0.06] bg-white/[0.02]">
              <p className="font-black text-sm" style={{ color: c.accent, fontFamily: "'Playfair Display', serif" }}>{c.successRate}</p>
              <p className="text-white/25 text-[9px] uppercase tracking-[0.14em] mt-1">Success Rate</p>
            </div>
          </div>
        </div>

        {/* col 3: stats + CTA */}
        <div className="lg:col-span-1 p-7 flex flex-col">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/25 mb-4">Country Statistics</p>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {Object.entries(c.stats).map(([k, v]) => (
              <div key={k} className="rounded-xl p-3 border border-white/[0.06] bg-white/[0.02]">
                <p className="text-white font-black text-base" style={{ fontFamily: "'Playfair Display', serif" }}>{v}</p>
                <p className="text-white/25 text-[9px] uppercase tracking-[0.12em] mt-0.5 capitalize">{k.replace(/([A-Z])/g, " $1")}</p>
              </div>
            ))}
          </div>

          <div className="mt-auto space-y-3">
            <Link to="/contact"
              className="flex items-center justify-center gap-2 w-full rounded-full py-3.5 text-white font-black text-xs uppercase tracking-[0.15em] hover:scale-[1.02] transition-all duration-300 shadow-xl"
              style={{ background: `linear-gradient(135deg, ${c.accent}, ${c.accent}bb)`, boxShadow: `0 10px 28px ${c.accent}30` }}>
              Get {c.name} Visa Help
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <a href="https://wa.me/14084228585" target="_blank" rel="noreferrer"
              className="flex items-center justify-center gap-2 w-full rounded-full py-3 text-white/50 hover:text-green-400 border border-white/10 hover:border-green-500/30 text-xs font-bold uppercase tracking-wide transition-all duration-300 hover:bg-green-900/15">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Quick WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════ */
export default function Countries() {
  const [heroRef, heroVisible] = useReveal(0.05);
  const [featRef, featVisible] = useReveal(0.05);
  const [statsRef, statsVisible] = useReveal(0.1);
  const [ctaRef, ctaVisible] = useReveal(0.1);

  const northAmerica = COUNTRIES.filter((c) => c.region === "North America");
  const europe = COUNTRIES.filter((c) => c.region.includes("Europe") || c.region.includes("Schengen"));
  const asia = COUNTRIES.filter((c) => c.region === "South Asia");
  const oceania = COUNTRIES.filter((c) => c.region === "Oceania");

  return (
    <div className="bg-[#04091a] min-h-screen overflow-x-hidden" style={{ fontFamily: "'Montserrat', sans-serif" }}>

      {/* ══ HERO ══ */}
      <section ref={heroRef} className="relative pt-24 pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-[0.12]"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80')" }} />
        <div className="absolute inset-0 bg-gradient-to-br from-[#04091a] via-[#04091af0] to-[#0b1840]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none opacity-[0.07]"
          style={{ background: "radial-gradient(circle,#dc2626,transparent 65%)" }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none opacity-[0.05]"
          style={{ background: "radial-gradient(circle,#3b82f6,transparent 65%)" }} />
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize: "44px 44px" }} />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div style={anim(heroVisible, 0)}>
            <span className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.04] rounded-full px-5 py-2 text-[10px] font-bold uppercase tracking-[0.25em] text-white/40 mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse inline-block" />
              Serving 50+ Countries Worldwide
            </span>
          </div>

          <h1 className="font-black leading-[1.04] mb-5"
            style={{ ...anim(heroVisible, 100), fontFamily: "'Playfair Display', serif" }}>
            <span className="block text-white text-5xl sm:text-6xl lg:text-7xl">Your Dream Destination</span>
            <span className="block text-5xl sm:text-6xl lg:text-7xl mt-1"
              style={{ background: "linear-gradient(110deg,#ef4444,#dc2626,#ff7043)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Is Our Expertise
            </span>
          </h1>

          <p className="text-white/45 text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ ...anim(heroVisible, 230), fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>
            From the USA to Schengen Europe, Canada to Australia — CAIS Inc. has the expertise
            to get you there with a <span className="text-red-400 font-semibold">98% success rate</span>.
          </p>

          {/* floating country flags */}
          <div className="flex flex-wrap justify-center gap-3 mt-10" style={anim(heroVisible, 380)}>
            {COUNTRIES.map((c) => (
              <div key={c.id} className="flex items-center gap-2 border border-white/[0.07] rounded-full px-4 py-2 bg-white/[0.03] hover:bg-white/[0.07] transition-all duration-200 cursor-default hover:scale-105">
                <span className="text-xl">{c.flag}</span>
                <span className="text-white/50 text-xs font-semibold hidden sm:inline">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#04091a]"
          style={{ clipPath: "polygon(0 100%,100% 0,100% 100%)" }} />
      </section>

      {/* ══ GLOBAL STATS ══ */}
      <section ref={statsRef} className="py-6 bg-[#060c20] border-y border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.06]">
            {[
              { v: "11+", l: "Countries Served", icon: "🌍" },
              { v: "50+", l: "Visa Categories", icon: "📋" },
              { v: "98%", l: "Avg Success Rate", icon: "✅" },
              { v: "13+", l: "Years of Expertise", icon: "🏆" },
            ].map((s, i) => (
              <div key={s.l} className="flex flex-col items-center py-7 cursor-default group"
                style={{
                  opacity: statsVisible ? 1 : 0,
                  transform: statsVisible ? "translateY(0)" : "translateY(16px)",
                  transition: `all 0.6s ease ${i * 100}ms`,
                }}>
                <span className="text-2xl mb-2">{s.icon}</span>
                <p className="text-3xl font-black text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{s.v}</p>
                <p className="text-white/30 text-[10px] uppercase tracking-[0.18em] mt-1">{s.l}</p>
                <div className="h-0.5 w-6 bg-red-600 rounded-full mt-2.5 group-hover:w-12 transition-all duration-400" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FEATURED CAROUSEL ══ */}
      <section ref={featRef} className="py-20 bg-[#04091a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12" style={anim(featVisible, 0)}>
            <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-red-400 mb-4">
              <span className="w-8 h-px bg-red-600 inline-block" />
              Featured Destinations
              <span className="w-8 h-px bg-red-600 inline-block" />
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              Top Immigration{" "}
              <span style={{ background: "linear-gradient(110deg,#ef4444,#dc2626)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Destinations
              </span>
            </h2>
          </div>
          <div style={anim(featVisible, 120)}>
            <FeaturedCarousel visible={featVisible} />
          </div>
        </div>
      </section>

      {/* ══ CAROUSELS BY REGION ══ */}
      <div className="bg-[#060c20]">
        <HorizontalCarousel
          title="North America"
          subtitle="Dream Destinations"
          countries={northAmerica}
          accent="#ef4444"
        />
      </div>

      <div className="bg-[#04091a]">
        <HorizontalCarousel
          title="Europe & Schengen Zone"
          subtitle="Open Borders, Endless Opportunity"
          countries={europe}
          accent="#6366f1"
        />
      </div>

      <div className="bg-[#060c20]">
        <HorizontalCarousel
          title="South Asia & Oceania"
          subtitle="Connecting Roots & New Beginnings"
          countries={[...asia, ...oceania]}
          accent="#f97316"
        />
      </div>

      {/* ══ WHY CHOOSE CAIS ══ */}
      <section className="py-24 bg-[#04091a] relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600/25 to-transparent" />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize: "44px 44px" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-red-400 mb-4">
              <span className="w-8 h-px bg-red-600 inline-block" />
              Our Edge
              <span className="w-8 h-px bg-red-600 inline-block" />
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              Why Trust CAIS Inc. with{" "}
              <span style={{ background: "linear-gradient(110deg,#ef4444,#dc2626)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Any Country
              </span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: "🎯", title: "Country-Specific Expertise", desc: "Each country has unique rules. We stay current on USCIS, IRCC, UKVI, and Schengen updates so your application is always accurate.", color: "#ef4444" },
              { icon: "📄", title: "Bulletproof Documentation", desc: "Our document packages are prepared to meet the exact standards of each country's immigration authority — first time, every time.", color: "#22c55e" },
              { icon: "🔔", title: "Priority Date Alerts", desc: "For USA Green Cards and Canada Express Entry, we monitor bulletin updates and notify you the instant your date becomes current.", color: "#3b82f6" },
              { icon: "🌐", title: "Multi-Country Strategy", desc: "Want to maximize options? We help clients apply for multiple destinations simultaneously — USA + Canada + UK — to find the fastest pathway.", color: "#f59e0b" },
            ].map((card, i) => (
              <div key={card.title}
                className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 hover:bg-white/[0.04] transition-all duration-400 relative overflow-hidden cursor-default"
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${card.color}35`; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{ background: `radial-gradient(ellipse at 50% 0%, ${card.color}10, transparent 65%)` }} />
                <span className="text-3xl mb-5 block">{card.icon}</span>
                <h3 className="text-white font-black text-lg mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>{card.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed"
                  style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>{card.desc}</p>
                <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl"
                  style={{ background: `linear-gradient(90deg, ${card.color}, ${card.color}60)` }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FINAL CTA ══ */}
      <section ref={ctaRef} className="py-16 bg-[#060c20] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/15 via-transparent to-blue-900/10" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600/25 to-transparent" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center" style={anim(ctaVisible, 0)}>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Which Country Is Calling{" "}
            <span style={{ background: "linear-gradient(110deg,#ef4444,#ff7043)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Your Name?
            </span>
          </h2>
          <p className="text-white/40 text-lg mb-10"
            style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>
            Book a free consultation and let Kanwal Kaur map the fastest, strongest path to your dream destination.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact"
              className="inline-flex items-center justify-center gap-3 rounded-full px-9 py-4 text-white font-black text-sm uppercase tracking-[0.14em] hover:scale-105 transition-all duration-300 shadow-2xl shadow-red-900/40"
              style={{ background: "linear-gradient(135deg,#dc2626,#991b1b)" }}>
              Book Free Consultation
            </Link>
            <a href="https://wa.me/14084228585" target="_blank" rel="noreferrer"
              className="inline-flex items-center justify-center gap-3 border border-white/15 hover:border-green-500/40 text-white/70 hover:text-green-400 rounded-full px-9 py-4 text-sm font-bold uppercase tracking-[0.13em] transition-all duration-300 hover:bg-green-900/15">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        @keyframes expandDown { from { opacity:0; transform:scaleY(0.95) translateY(-8px); } to { opacity:1; transform:scaleY(1) translateY(0); } }
        ::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}