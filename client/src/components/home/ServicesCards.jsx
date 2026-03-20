import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

/* ── Intersection Observer hook ── */
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

/* ── SVG Icons ── */
const Icons = {
  Family: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-full h-full">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  GreenCard: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-full h-full">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2" />
    </svg>
  ),
  Citizenship: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-full h-full">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
    </svg>
  ),
  Business: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-full h-full">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  OCI: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-full h-full">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  IndiaVisa: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-full h-full">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
    </svg>
  ),
  Student: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-full h-full">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    </svg>
  ),
  Religious: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-full h-full">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  ),
  Divorce: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-full h-full">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
    </svg>
  ),
  UK: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-full h-full">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 10h.01M12 10h.01M15 10h.01" />
    </svg>
  ),
  Canada: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-full h-full">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
      <circle cx="12" cy="9" r="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Various: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-full h-full">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
    </svg>
  ),
};

/* ── Service Data ── */
const SERVICES = [
  {
    id: 1,
    icon: Icons.Family,
    title: "Family Immigration",
    tagline: "Reuniting families across borders",
    color: "from-rose-600 to-red-700",
    accent: "#e11d48",
    badge: "Most Popular",
    short: "Bring your loved ones to the U.S. through family-based immigrant visa petitions — spouses, children, parents & siblings.",
    details: {
      overview: "Family immigration is the most common pathway to permanent residence in the United States. California Immigration Services Inc. handles all family-based petitions with precision, ensuring your family is reunited as quickly as possible.",
      includes: [
        "Spouse & immediate relative petitions (IR-1, CR-1, K-1 Fiancé Visa)",
        "Parent & child sponsorship (F1, F2A, F2B categories)",
        "Sibling sponsorship petitions (F4 category)",
        "Adjustment of Status (Form I-485)",
        "Consular processing & interview preparation",
        "Conditional Green Card removal (I-751)",
        "Travel documents & re-entry permits",
      ],
      countries: ["USA", "India", "Mexico", "Philippines", "China"],
      time: "6 months – 3 years depending on category",
      note: "We guide you through every USCIS form, translate documents, and prepare your family for the interview.",
    },
  },
  {
    id: 2,
    icon: Icons.GreenCard,
    title: "Green Card Petition",
    tagline: "Your gateway to permanent residence",
    color: "from-emerald-600 to-green-700",
    accent: "#059669",
    badge: "High Demand",
    short: "Employment-based and family-based Green Card petitions handled end-to-end — from I-130 / I-140 to final approval.",
    details: {
      overview: "A Green Card grants you permanent residence in the United States. Our team manages the full lifecycle of your Green Card case — from initial petition to card issuance — with a track record of 98% success.",
      includes: [
        "I-130 Petition for Alien Relatives",
        "I-140 Immigrant Petition for Alien Workers",
        "Employment-based EB-1, EB-2, EB-3 petitions",
        "I-485 Adjustment of Status filing",
        "Work Authorization (EAD) & Advance Parole",
        "Priority Date tracking & NVC coordination",
        "Green Card renewal (I-90)",
      ],
      countries: ["USA (all states)"],
      time: "1 – 5 years depending on preference category",
      note: "We monitor your priority date and alert you the moment a visa number becomes available.",
    },
  },
  {
    id: 3,
    icon: Icons.Citizenship,
    title: "Citizenship (Naturalization)",
    tagline: "Become a proud U.S. citizen",
    color: "from-blue-600 to-blue-800",
    accent: "#2563eb",
    badge: "Life-Changing",
    short: "Expert guidance on N-400 naturalization applications — eligibility checks, interview prep & oath ceremony support.",
    details: {
      overview: "U.S. citizenship is the ultimate milestone in your immigration journey. With our guidance, we make the N-400 naturalization process clear, smooth, and successful.",
      includes: [
        "Eligibility assessment (5-year / 3-year rule)",
        "N-400 Application for Naturalization",
        "Biometrics scheduling assistance",
        "Civics & English test preparation",
        "Interview coaching & mock sessions",
        "Name change coordination",
        "Oath ceremony scheduling support",
      ],
      countries: ["USA"],
      time: "8 – 18 months from application",
      note: "We provide study materials and conduct mock civics interviews to ensure you pass with confidence.",
    },
  },
  {
    id: 4,
    icon: Icons.Business,
    title: "Business / Visitor Visa",
    tagline: "Travel for business or pleasure",
    color: "from-amber-500 to-orange-600",
    accent: "#d97706",
    badge: "Quick Processing",
    short: "B-1/B-2 visa applications for business meetings, tourism, medical visits, and short-term stays in the USA.",
    details: {
      overview: "Whether you're visiting family, attending a business conference, or seeking medical treatment, our team prepares a compelling visa application that maximizes your approval chances.",
      includes: [
        "B-1 Business Visa applications",
        "B-2 Tourist / Visitor Visa applications",
        "DS-160 online form completion",
        "Supporting document preparation",
        "Interview appointment scheduling",
        "Visa extension (I-539) if needed",
        "Multiple-entry visa strategy",
      ],
      countries: ["USA", "UK", "Canada", "Schengen Countries", "Australia"],
      time: "2 – 8 weeks",
      note: "Strong documentation significantly increases approval. We build a complete, convincing package for every client.",
    },
  },
  {
    id: 5,
    icon: Icons.OCI,
    title: "OCI Card & Indian Passport",
    tagline: "Stay connected to your roots",
    color: "from-orange-500 to-amber-600",
    accent: "#ea580c",
    badge: "Specialist Service",
    short: "OCI Card applications, renewals, and Indian passport services for NRIs — handled with expertise and care.",
    details: {
      overview: "We specialize in all Indian government document services for Non-Resident Indians (NRIs) living in the USA. From OCI applications to passport renewals, we handle complex paperwork so you don't have to.",
      includes: [
        "OCI Card new application (Overseas Citizen of India)",
        "OCI Card renewal & re-issue",
        "Indian Passport renewal for adults & minors",
        "Tatkal (urgent) passport services",
        "Name change on Indian passport",
        "Police Clearance Certificate (PCC)",
        "Address change & photo update",
      ],
      countries: ["India (via Indian Consulate/Embassy)"],
      time: "4 – 12 weeks",
      note: "We work closely with the Indian Consulate in San Francisco to ensure your documents are prepared correctly the first time.",
    },
  },
  {
    id: 6,
    icon: Icons.IndiaVisa,
    title: "India Visa",
    tagline: "Visit India without the hassle",
    color: "from-saffron-500 to-orange-500",
    accent: "#f97316",
    badge: "Fast Turnaround",
    short: "India tourist, business, medical & e-Visa applications for U.S. residents planning to travel to India.",
    details: {
      overview: "Planning a trip to India? Our team handles all India visa categories — from e-Visa applications to full embassy visa processes — ensuring a smooth and timely approval.",
      includes: [
        "India e-Visa (tourist, business, medical)",
        "India Sticker Visa via Embassy/Consulate",
        "Emergency / Urgent India Visa",
        "India Medical Visa",
        "India Conference Visa",
        "Visa extension assistance",
        "Multiple-entry India Visa",
      ],
      countries: ["India"],
      time: "3 – 15 business days",
      note: "e-Visa can be obtained in as little as 3 days. We handle both e-Visa and traditional visa applications.",
    },
  },
  {
    id: 7,
    icon: Icons.Student,
    title: "Student Visa",
    tagline: "Invest in your future globally",
    color: "from-violet-600 to-purple-700",
    accent: "#7c3aed",
    badge: "Study Abroad",
    short: "F-1, M-1, and J-1 student visa guidance for international students pursuing education in the USA and other countries.",
    details: {
      overview: "Education is the most powerful investment you can make. We help students navigate the student visa process from start to finish — from SEVIS registration to visa interview preparation.",
      includes: [
        "F-1 Student Visa (academic programs)",
        "M-1 Student Visa (vocational programs)",
        "J-1 Exchange Visitor Visa",
        "SEVIS fee payment guidance",
        "I-20 document review",
        "OPT & CPT work authorization advice",
        "STEM OPT extension guidance",
      ],
      countries: ["USA", "UK", "Canada", "Australia"],
      time: "4 – 10 weeks",
      note: "We prepare students for the visa interview with mock Q&A sessions tailored to their specific program.",
    },
  },
  {
    id: 8,
    icon: Icons.Religious,
    title: "Religious Visa",
    tagline: "Serve your community, cross borders",
    color: "from-teal-600 to-cyan-700",
    accent: "#0d9488",
    badge: "Specialized",
    short: "R-1 Religious Worker Visa for ministers, priests, religious workers and members of religious organizations.",
    details: {
      overview: "Religious workers and ministers play a vital role in communities across the USA. We handle R-1 non-immigrant religious worker visas and EB-4 special immigrant religious worker petitions.",
      includes: [
        "R-1 Non-Immigrant Religious Worker Visa",
        "EB-4 Special Immigrant Religious Worker (Green Card)",
        "I-129 Petition for Nonimmigrant Worker",
        "I-360 Petition for Amerasian, Widow(er), or Special Immigrant",
        "Religious organization documentation",
        "Compensation & membership verification",
        "Extension of R-1 status",
      ],
      countries: ["USA"],
      time: "4 – 12 months",
      note: "We work directly with the religious organization to compile all required documentation per USCIS requirements.",
    },
  },
 
  {
    id: 10,
    icon: Icons.UK,
    title: "UK Visa",
    tagline: "Explore Great Britain",
    color: "from-indigo-600 to-blue-700",
    accent: "#4338ca",
    badge: "International",
    short: "UK Standard Visitor, Student, Work and Settlement visa applications for individuals and families.",
    details: {
      overview: "The United Kingdom offers multiple visa pathways for tourists, students, and workers. Our team is experienced with UKVI (UK Visas and Immigration) requirements and prepares thorough, well-documented applications.",
      includes: [
        "UK Standard Visitor Visa",
        "UK Student Visa (Tier 4)",
        "UK Skilled Worker Visa",
        "UK Family Visa (spouse, dependent)",
        "UK Indefinite Leave to Remain (ILR)",
        "UK Citizenship & Naturalization guidance",
        "Priority visa application support",
      ],
      countries: ["United Kingdom"],
      time: "3 – 12 weeks",
      note: "We prepare strong supporting evidence packages that meet UKVI's strict documentation requirements.",
    },
  },
  {
    id: 11,
    icon: Icons.Canada,
    title: "Canada Visa & P.R.",
    tagline: "Your new home in the Great White North",
    color: "from-red-600 to-rose-700",
    accent: "#dc2626",
    badge: "High Success Rate",
    short: "Canada visitor visas, Express Entry, Provincial Nominee Program, and Permanent Residence applications.",
    details: {
      overview: "Canada is one of the most sought-after immigration destinations in the world. We handle all major Canadian immigration pathways — from temporary visitor visas to full Permanent Residence (PR) applications.",
      includes: [
        "Canada Visitor / Tourist Visa (TRV)",
        "Express Entry (Federal Skilled Worker)",
        "Provincial Nominee Program (PNP)",
        "Canadian Experience Class (CEC)",
        "Study Permit (Student Visa)",
        "Work Permit (LMIA & LMIA-exempt)",
        "Permanent Residence (PR) applications",
      ],
      countries: ["Canada"],
      time: "2 months – 2 years depending on pathway",
      note: "We calculate your CRS score, identify the strongest pathway, and maximize your chances of receiving an Invitation to Apply (ITA).",
    },
  },
  {
    id: 12,
    icon: Icons.Various,
    title: "Various Immigration Services",
    tagline: "Comprehensive support for every need",
    color: "from-fuchsia-600 to-pink-700",
    accent: "#c026d3",
    badge: "Full Service",
    short: "Schengen visas, Australia visas, document translation, notarization, DACA renewals, and more — all under one roof.",
    details: {
      overview: "Beyond our core services, we offer a comprehensive range of immigration-related support services. Whatever your immigration need, our experienced team has the expertise to assist.",
      includes: [
        "Schengen Visa (Italy, Germany, France, Spain & more)",
        "Australia Tourist & Student Visa",
        "DACA Renewal (Deferred Action for Childhood Arrivals)",
        "TPS (Temporary Protected Status)",
        "Document translation (certified)",
        "Document notarization services",
        "Immigration form preparation & review",
      ],
      countries: ["Schengen Zone", "Australia", "USA", "Many more"],
      time: "Varies by service",
      note: "We serve clients from all backgrounds. If you don't see your specific need listed, contact us — chances are we can help.",
    },
  },
];

/* ── Expanded Card Panel ── */
function ExpandedPanel({ service, onClose }) {
  const Icon = service.icon;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 shadow-2xl shadow-black/60"
        style={{ background: "#060f26" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className={`relative bg-gradient-to-br ${service.color} p-7 overflow-hidden`}>
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize: "24px 24px" }} />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 rounded-2xl bg-white/15 p-3.5 shrink-0">
              <Icon />
            </div>
            <div>
              {service.badge && (
                <span className="inline-block text-[10px] font-black uppercase tracking-[0.2em] bg-white/20 text-white rounded-full px-3 py-0.5 mb-2">
                  {service.badge}
                </span>
              )}
              <h3 className="text-white font-black text-2xl sm:text-3xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                {service.title}
              </h3>
              <p className="text-white/70 text-sm mt-1" style={{ fontFamily: "'Lato', sans-serif" }}>{service.tagline}</p>
            </div>
          </div>
        </div>

        {/* body */}
        <div className="p-7 space-y-7">
          {/* overview */}
          <div>
            <h4 className="text-white/40 text-[10px] uppercase tracking-[0.22em] font-bold mb-3">Overview</h4>
            <p className="text-white/65 text-sm leading-relaxed" style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>
              {service.details.overview}
            </p>
          </div>

          {/* what's included */}
          <div>
            <h4 className="text-white/40 text-[10px] uppercase tracking-[0.22em] font-bold mb-3">What's Included</h4>
            <div className="grid sm:grid-cols-2 gap-2">
              {service.details.includes.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: service.accent }} />
                  <span className="text-white/60 text-xs leading-relaxed" style={{ fontFamily: "'Montserrat', sans-serif" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* meta row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
              <p className="text-white/30 text-[9px] uppercase tracking-[0.2em] font-bold mb-1.5">Processing Time</p>
              <p className="text-white/80 text-xs font-semibold" style={{ fontFamily: "'Montserrat', sans-serif" }}>{service.details.time}</p>
            </div>
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
              <p className="text-white/30 text-[9px] uppercase tracking-[0.2em] font-bold mb-1.5">Countries / Scope</p>
              <p className="text-white/80 text-xs font-semibold" style={{ fontFamily: "'Montserrat', sans-serif" }}>{service.details.countries.join(", ")}</p>
            </div>
          </div>

          {/* expert note */}
          <div className="flex items-start gap-3 rounded-xl p-4 border" style={{ background: `${service.accent}12`, borderColor: `${service.accent}30` }}>
            <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" style={{ color: service.accent }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <p className="text-white/50 text-xs leading-relaxed" style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>
              <span className="font-bold text-white/70">Expert Note: </span>{service.details.note}
            </p>
          </div>

          {/* CTA */}
          <Link
            to="/contact"
            onClick={onClose}
            className="flex items-center justify-center gap-3 w-full rounded-full py-4 text-white font-black text-sm uppercase tracking-[0.14em] shadow-xl transition-all duration-300 hover:scale-[1.02]"
            style={{ background: `linear-gradient(135deg, ${service.accent}, ${service.accent}bb)`, fontFamily: "'Montserrat', sans-serif" }}
          >
            Get Help with {service.title}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ── Single Service Card ── */
function ServiceCard({ service, index, visible, onOpen }) {
  const Icon = service.icon;
  return (
    <div
      className="group relative rounded-2xl border border-white/[0.07] bg-white/[0.025] hover:border-white/20 overflow-hidden cursor-pointer transition-all duration-400 hover:-translate-y-1 hover:shadow-2xl"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.97)",
        transition: `all 0.65s cubic-bezier(0.16,1,0.3,1) ${index * 70}ms`,
        boxShadow: "0 0 0 transparent",
      }}
      onClick={() => onOpen(service)}
    >
      {/* hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{ background: `radial-gradient(circle at 50% 0%, ${service.accent}18, transparent 65%)` }}
      />

      {/* top color bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${service.color}`} />

      <div className="p-6">
        {/* icon + badge */}
        <div className="flex items-start justify-between mb-5">
          <div
            className="w-13 h-13 rounded-xl p-3 shrink-0 transition-transform duration-300 group-hover:scale-110"
            style={{ background: `${service.accent}20`, color: service.accent, width: 52, height: 52 }}
          >
            <Icon />
          </div>
          {service.badge && (
            <span
              className="text-[9px] font-black uppercase tracking-[0.18em] rounded-full px-2.5 py-1"
              style={{ background: `${service.accent}20`, color: service.accent }}
            >
              {service.badge}
            </span>
          )}
        </div>

        {/* title */}
        <h3
          className="text-white font-black text-lg mb-1 group-hover:text-white transition-colors"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {service.title}
        </h3>
        <p className="text-xs font-bold uppercase tracking-[0.12em] mb-3" style={{ color: service.accent }}>
          {service.tagline}
        </p>

        {/* short desc */}
        <p className="text-white/45 text-xs leading-relaxed mb-5" style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>
          {service.short}
        </p>

        {/* expand button */}
        <div
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] transition-all duration-300 group-hover:gap-3"
          style={{ color: service.accent, fontFamily: "'Montserrat', sans-serif" }}
        >
          View Details
          <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>

      {/* bottom accent line */}
      <div
        className={`absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r ${service.color} transition-all duration-500`}
      />
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════ */
export default function ServicesCards() {
  const [sectionRef, visible] = useReveal(0.05);
  const [headerRef, headerVisible] = useReveal(0.1);
  const [selected, setSelected] = useState(null);

  // lock scroll when modal open
  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  return (
    <section
      id="services"
      className="relative py-24 bg-[#04091a] overflow-hidden"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {/* bg decoration */}
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize: "44px 44px" }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-[0.06] pointer-events-none" style={{ background: "radial-gradient(circle,#dc2626,transparent 65%)" }} />

      <div ref={headerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <div
          className="text-center mb-16"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-red-400 mb-5">
            <span className="w-8 h-px bg-red-600 inline-block" />
            What We Do
            <span className="w-8 h-px bg-red-600 inline-block" />
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Our{" "}
            <span style={{ background: "linear-gradient(110deg,#ef4444,#dc2626,#ff7043)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Immigration
            </span>{" "}
            Services
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>
            From Green Cards to Schengen visas — California Immigration Services Inc. offers
            expert guidance on <span className="text-white/65 font-semibold">12+ immigration services</span> across 50+ countries.
            Click any card to learn more.
          </p>
        </div>

        {/* ── Cards Grid ── */}
        <div ref={sectionRef} className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {SERVICES.map((s, i) => (
            <ServiceCard
              key={s.id}
              service={s}
              index={i}
              visible={visible}
              onOpen={setSelected}
            />
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <div
          className="text-center mt-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.7s ease 900ms",
          }}
        >
          <p className="text-white/30 text-sm mb-6" style={{ fontFamily: "'Lato', sans-serif" }}>
            Not sure which service you need? Let our expert guide you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-3 rounded-full px-9 py-4 text-white font-black text-sm uppercase tracking-[0.14em] shadow-2xl shadow-red-900/40 hover:scale-105 transition-all duration-300"
              style={{ background: "linear-gradient(135deg,#dc2626,#991b1b)" }}
            >
              Book Free Consultation
            </Link>
            <a
              href="tel:+14084228585"
              className="inline-flex items-center justify-center gap-3 border border-white/15 hover:border-white/35 text-white/70 hover:text-white rounded-full px-9 py-4 text-sm font-bold uppercase tracking-[0.13em] transition-all duration-300 hover:bg-white/[0.04]"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +1 (408) 422-8585
            </a>
          </div>
        </div>
      </div>

      {/* ── Expanded Modal ── */}
      {selected && <ExpandedPanel service={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}