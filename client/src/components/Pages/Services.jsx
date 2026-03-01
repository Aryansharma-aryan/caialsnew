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

const anim = (visible, delay = 0, dir = "up") => ({
  opacity: visible ? 1 : 0,
  transform: visible
    ? "translate(0,0)"
    : dir === "left" ? "translateX(-30px)"
    : dir === "right" ? "translateX(30px)"
    : "translateY(28px)",
  transition: `opacity 0.75s ease ${delay}ms, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
});

/* ─── ALL SERVICES DATA ─── */
const SERVICES = [
  {
    id: "family",
    number: "01",
    title: "Family Immigration",
    tagline: "Reuniting Families Across Borders",
    accent: "#ef4444",
    bg: "#1a0505",
    badge: "Most Requested",
    icon: "👨‍👩‍👧‍👦",
    overview:
      "Family-based immigration is the most common pathway to a Green Card in the United States. At CAIS Inc., we handle every aspect of family petitions with compassion and expertise — from filing the initial I-130 to guiding your loved ones through consular processing or adjustment of status.",
    whoFor: "Spouses, children, parents, and siblings of U.S. citizens or Lawful Permanent Residents.",
    timeline: [
      { step: "01", title: "Initial Consultation", desc: "Assess eligibility, relationship type, and visa category (immediate relative vs. preference).", time: "Day 1" },
      { step: "02", title: "Petition Filing (I-130)", desc: "Prepare and submit Form I-130 Petition for Alien Relative with all supporting evidence.", time: "Week 1–2" },
      { step: "03", title: "USCIS Receipt & Processing", desc: "Receive NOA (Notice of Action). USCIS reviews and approves the petition.", time: "3–12 months" },
      { step: "04", title: "NVC / Consular Processing", desc: "National Visa Center collects fees and documents; embassy schedules visa interview.", time: "2–6 months" },
      { step: "05", title: "Visa Interview", desc: "Prepare client for the embassy/USCIS interview with mock Q&A sessions.", time: "Scheduled by embassy" },
      { step: "06", title: "Approval & Entry", desc: "Visa granted; beneficiary travels to USA and receives Green Card.", time: "2–4 weeks post-interview" },
    ],
    includes: [
      "I-130 Petition for Alien Relative", "Adjustment of Status (I-485)", "Consular processing guidance",
      "K-1 Fiancé Visa", "I-751 Conditional Green Card removal", "Travel documents & Advance Parole",
      "Family preference categories (F1–F4)", "Derivative beneficiary petitions",
    ],
   
    successRate: "97%",
  },
  {
    id: "greencard",
    number: "02",
    title: "Green Card Petition",
    tagline: "Your Permanent Home in America",
    accent: "#22c55e",
    bg: "#011a05",
    badge: "High Demand",
    icon: "🟩",
    overview:
      "A Lawful Permanent Resident (Green Card) status gives you the right to live and work permanently in the USA. CAIS Inc. handles both family-sponsored and employment-based Green Card petitions, managing every document, deadline, and filing with precision.",
    whoFor: "Family members of U.S. citizens/LPRs, skilled workers, refugees, and special immigrants.",
    timeline: [
      { step: "01", title: "Eligibility Review", desc: "Determine correct category: family-based, employment-based (EB-1/EB-2/EB-3), or special immigrant.", time: "Day 1" },
      { step: "02", title: "Petition Filing", desc: "File I-130 (family) or I-140 (employment) with complete documentation package.", time: "Week 1–3" },
      { step: "03", title: "Priority Date Monitoring", desc: "Track visa bulletin monthly; notify client when priority date becomes current.", time: "Ongoing" },
      { step: "04", title: "I-485 Filing", desc: "File Adjustment of Status with EAD (work permit) and Advance Parole concurrently.", time: "When date current" },
      { step: "05", title: "Biometrics & Interview", desc: "Attend biometrics appointment; prepare for USCIS field office interview if required.", time: "Within 90 days" },
      { step: "06", title: "Green Card Issued", desc: "USCIS approves case; Green Card mailed to client. Valid for 10 years.", time: "4–8 weeks post-approval" },
    ],
    includes: [
      "I-130 / I-140 petition preparation", "I-485 Adjustment of Status", "EAD Work Authorization (I-765)",
      "Advance Parole (I-131)", "Priority date tracking", "EB-1, EB-2, EB-3 employment petitions",
      "Green Card renewal (I-90)", "Conditional Green Card removal (I-751)",
    ],
   
    successRate: "98%",
  },
  {
    id: "citizenship",
    number: "03",
    title: "Citizenship & Naturalization",
    tagline: "Become a Proud U.S. Citizen",
    accent: "#3b82f6",
    bg: "#010a1a",
    badge: "Life Changing",
    icon: "🏛️",
    overview:
      "U.S. Citizenship is the highest immigration benefit available. It gives you the right to vote, obtain a U.S. passport, sponsor more relatives, and never worry about deportation. Our team guides you through every step of the N-400 naturalization process with confidence.",
    whoFor: "Green Card holders who have maintained residence for 5 years (or 3 years if married to a U.S. citizen).",
    timeline: [
      { step: "01", title: "Eligibility Check", desc: "Verify 5-year/3-year continuous residence, physical presence, good moral character requirements.", time: "Day 1" },
      { step: "02", title: "N-400 Application", desc: "Complete and file Form N-400 Application for Naturalization with all supporting documents.", time: "Week 1–2" },
      { step: "03", title: "Biometrics Appointment", desc: "Attend USCIS biometrics appointment for fingerprints and background check.", time: "4–8 weeks post-filing" },
      { step: "04", title: "Civics & English Test Prep", desc: "Provide study materials and conduct mock civics test (100 questions) and English interview prep.", time: "Ongoing coaching" },
      { step: "05", title: "USCIS Interview", desc: "Attend naturalization interview; officer tests English and civics knowledge.", time: "8–14 months post-filing" },
      { step: "06", title: "Oath Ceremony", desc: "Take the Oath of Allegiance at ceremony. Receive Certificate of Naturalization.", time: "Same day or scheduled" },
    ],
    includes: [
      "N-400 application preparation", "Eligibility assessment (5-yr / 3-yr rule)",
      "Civics test study materials (100 questions)", "English interview preparation",
      "Mock interview sessions", "Name change coordination",
      "Expedite request when qualifying", "Oath ceremony scheduling support",
    ],
    
    successRate: "99%",
  },
  {
    id: "business",
    number: "04",
    title: "Business / Visitor Visa",
    tagline: "Travel, Meet & Explore America",
    accent: "#f59e0b",
    bg: "#1a0f00",
    badge: "Quick Processing",
    icon: "💼",
    overview:
      "Whether you're attending a business meeting, visiting family, exploring tourism, or seeking medical care, a B-1/B-2 visa is your key to entering the USA. CAIS Inc. builds robust, well-documented applications that give you the best chance of approval.",
    whoFor: "Business travelers, tourists, family visitors, medical treatment seekers, conference attendees.",
    timeline: [
      { step: "01", title: "Purpose Assessment", desc: "Determine B-1 (business) vs. B-2 (tourism/pleasure) or combined B-1/B-2 classification.", time: "Day 1" },
      { step: "02", title: "DS-160 Completion", desc: "Complete online DS-160 nonimmigrant visa application form accurately.", time: "Day 2–3" },
      { step: "03", title: "Document Package", desc: "Prepare supporting documents: financial proof, employment letter, itinerary, ties to home country.", time: "Week 1" },
      { step: "04", title: "Interview Appointment", desc: "Schedule and confirm embassy/consulate interview appointment.", time: "1–4 weeks" },
      { step: "05", title: "Interview Preparation", desc: "Coach client on likely questions; review complete application packet.", time: "Before interview" },
      { step: "06", title: "Visa Issuance", desc: "Passport returned with visa stamp; entry valid per officer's discretion.", time: "3–10 business days" },
    ],
    includes: [
      "B-1 Business Visa applications", "B-2 Tourist / Visitor Visa",
      "DS-160 form completion", "Supporting document preparation",
      "Interview coaching", "Visa extension (I-539)",
      "Multiple-entry visa strategy", "Visa renewal guidance",
    ],
   
    successRate: "95%",
  },
  {
    id: "oci",
    number: "05",
    title: "OCI Card & Indian Passport",
    tagline: "Stay Connected to Your Roots",
    accent: "#f97316",
    bg: "#1a0800",
    badge: "NRI Specialist",
    icon: "🇮🇳",
    overview:
      "For Non-Resident Indians (NRIs) living in the USA, managing Indian government documents can be complex and time-consuming. CAIS Inc. is a specialist in OCI Card applications, Indian passport renewals, and all related consular services — handled with expertise and care.",
    whoFor: "NRIs, PIOs, Indian-origin U.S. citizens, and their minor children seeking OCI cards or Indian passport services.",
    timeline: [
      { step: "01", title: "Service Identification", desc: "Determine exact requirement: new OCI, renewal, reissue, passport renewal, or PCC.", time: "Day 1" },
      { step: "02", title: "Document Collection", desc: "Gather passport copies, birth certificates, address proof, photos, and prior documents.", time: "Week 1" },
      { step: "03", title: "Online Application", desc: "Complete Indian government portal application; upload all required documents.", time: "Week 1–2" },
      { step: "04", title: "Consulate Submission", desc: "Submit physical documents to Indian Consulate San Francisco or via mail service.", time: "Week 2–3" },
      { step: "05", title: "Processing & Tracking", desc: "Track application status; respond to any queries from consulate.", time: "4–10 weeks" },
      { step: "06", title: "Document Delivery", desc: "Receive OCI card / renewed passport via courier or in-person pickup.", time: "Within processing time" },
    ],
    includes: [
      "OCI Card new application", "OCI Card renewal & re-issue",
      "Indian Passport renewal (adult & minor)", "Tatkal urgent passport",
      "Police Clearance Certificate (PCC)", "Name/address change services",
      "Surrender Certificate", "Life Certificate assistance",
    ],
    
    successRate: "99%",
  },
  {
    id: "indiavisa",
    number: "06",
    title: "India Visa",
    tagline: "Visit India — Hassle Free",
    accent: "#84cc16",
    bg: "#0a1400",
    badge: "Fast Turnaround",
    icon: "✈️",
    overview:
      "Planning a trip to India from the USA? CAIS Inc. handles all India visa categories — from quick e-Visa approvals to traditional sticker visas through the embassy. We ensure fast, accurate processing so your India travel plans stay on track.",
    whoFor: "U.S. residents, OCI cardholders needing updated documents, and foreign nationals planning India travel.",
    timeline: [
      { step: "01", title: "Visa Type Selection", desc: "Choose between e-Visa (quick) or traditional embassy visa based on duration and purpose.", time: "Day 1" },
      { step: "02", title: "Application Completion", desc: "Fill India visa application form with personal, travel, and reference details.", time: "Day 1–2" },
      { step: "03", title: "Document Preparation", desc: "Prepare passport copies, photos (spec-compliant), itinerary, hotel bookings.", time: "Day 2–3" },
      { step: "04", title: "Submission", desc: "Submit e-Visa online or physical application to Indian consulate/VFS center.", time: "Week 1" },
      { step: "05", title: "Processing", desc: "Government processes application; we track and follow up as needed.", time: "3–15 days" },
      { step: "06", title: "Visa Received", desc: "e-Visa delivered to email or sticker visa in passport returned.", time: "Per processing time" },
    ],
    includes: [
      "India e-Visa (tourist, business, medical)", "India Embassy sticker visa",
      "Emergency / urgent India visa", "Medical visa applications",
      "Conference & business visa", "Multiple-entry visa",
      "Visa extension coordination", "VFS appointment scheduling",
    ],
   
    successRate: "98%",
  },
  {
    id: "student",
    number: "07",
    title: "Student Visa",
    tagline: "Invest in Your Global Future",
    accent: "#8b5cf6",
    bg: "#0d0118",
    badge: "Study Abroad",
    icon: "🎓",
    overview:
      "Education opens borders. CAIS Inc. helps students worldwide secure F-1, M-1, and J-1 visas to study in the USA, as well as student visas for UK, Canada, and Australia. We guide students from SEVIS registration through visa interview to OPT/CPT work authorization.",
    whoFor: "International students enrolled in U.S. academic institutions, vocational programs, or exchange programs.",
    timeline: [
      { step: "01", title: "School & I-20 Review", desc: "Verify SEVIS I-20 document from school; confirm program details and start date.", time: "Day 1" },
      { step: "02", title: "SEVIS Fee Payment", desc: "Pay I-901 SEVIS fee and obtain payment confirmation.", time: "Day 1–2" },
      { step: "03", title: "DS-160 & Interview Booking", desc: "Complete DS-160 form; book visa interview at nearest U.S. Embassy/Consulate.", time: "Week 1" },
      { step: "04", title: "Document Package", desc: "Compile financial evidence, acceptance letters, academic records, and ties to home country.", time: "Week 1–2" },
      { step: "05", title: "Interview Coaching", desc: "Conduct mock F-1 interview; coach on intent to return and academic goals.", time: "Before interview" },
      { step: "06", title: "Visa & Entry", desc: "Receive F-1 visa; guidance on entry, port of entry interview, and OPT/CPT planning.", time: "Post-approval" },
    ],
    includes: [
      "F-1 Academic Student Visa", "M-1 Vocational Student Visa",
      "J-1 Exchange Visitor Visa", "SEVIS fee guidance",
      "I-20 document review", "OPT work authorization (I-765)",
      "STEM OPT extension", "Change of status to F-1",
    ],
    
    successRate: "96%",
  },
  {
    id: "religious",
    number: "08",
    title: "Religious Visa",
    tagline: "Serve Your Community Across Borders",
    accent: "#06b6d4",
    bg: "#001418",
    badge: "Specialized",
    icon: "🕊️",
    overview:
      "Religious workers and ministers play a vital role in communities across the United States. CAIS Inc. handles R-1 non-immigrant religious worker visas and EB-4 special immigrant religious worker petitions, working closely with religious organizations to meet USCIS documentation requirements.",
    whoFor: "Ministers, priests, religious instructors, liturgical workers, and members of qualifying religious denominations.",
    timeline: [
      { step: "01", title: "Organization Eligibility", desc: "Verify religious organization's IRS tax-exempt status and USCIS qualifying denomination status.", time: "Day 1–3" },
      { step: "02", title: "I-129 Petition", desc: "Prepare and file Form I-129 Petition for Nonimmigrant Worker with religious organization evidence.", time: "Week 2–4" },
      { step: "03", title: "USCIS Review", desc: "USCIS adjudicates petition; may issue Request for Evidence (RFE).", time: "3–9 months" },
      { step: "04", title: "Visa Application", desc: "With approved petition, worker applies for R-1 visa at consulate abroad.", time: "4–8 weeks" },
      { step: "05", title: "Entry & Work Authorization", desc: "Worker enters USA, begins religious duties as specified in petition.", time: "Upon visa issuance" },
      { step: "06", title: "Extension / EB-4 Green Card", desc: "File extension of R-1 or transition to EB-4 Special Immigrant Religious Worker for Green Card.", time: "Before expiry" },
    ],
    includes: [
      "R-1 Non-Immigrant Religious Worker Visa", "EB-4 Special Immigrant Religious Worker",
      "I-129 Petition for Nonimmigrant Worker", "I-360 Special Immigrant Petition",
      "Religious organization documentation", "RFE (Request for Evidence) responses",
      "R-1 extension filing", "Transition to Green Card",
    ],

    successRate: "95%",
  },
  {
    id: "divorce",
    number: "09",
    title: "Divorce & Immigration",
    tagline: "Protecting Your Status Through Life Changes",
    accent: "#94a3b8",
    bg: "#0d1018",
    badge: "Legal Guidance",
    icon: "⚖️",
    overview:
      "Divorce can have serious, far-reaching consequences on your immigration status. Whether you hold a conditional Green Card, have a pending petition, or are navigating VAWA protections, CAIS Inc. advises clients on the immigration impact of divorce and helps preserve their legal status.",
    whoFor: "Conditional Green Card holders, pending petition beneficiaries, and individuals in abusive marriages seeking VAWA protection.",
    timeline: [
      { step: "01", title: "Status Impact Assessment", desc: "Review current immigration status and how divorce affects pending or approved petitions.", time: "Day 1" },
      { step: "02", title: "Strategy Development", desc: "Determine best pathway: I-751 waiver, VAWA self-petition, or re-filing options.", time: "Week 1" },
      { step: "03", title: "Evidence Gathering", desc: "Compile evidence of bona fide marriage, abuse documentation (for VAWA), or hardship proof.", time: "Week 2–4" },
      { step: "04", title: "Petition / Waiver Filing", desc: "File I-751 waiver, I-360 VAWA petition, or other applicable forms.", time: "Week 4–6" },
      { step: "05", title: "USCIS Processing", desc: "USCIS reviews case; may schedule interview. We prepare client thoroughly.", time: "6–18 months" },
      { step: "06", title: "Status Protected", desc: "Green Card validity extended or full PR status preserved.", time: "Upon approval" },
    ],
    includes: [
      "Impact assessment on immigration status", "I-751 waiver for conditional Green Card",
      "VAWA self-petition (I-360)", "Bona fide marriage evidence compilation",
      "Children's immigration status guidance", "Coordination with family law attorneys",
      "Status during divorce proceedings", "Re-filing guidance post-divorce",
    ],
   
    successRate: "94%",
  },
  {
    id: "uk",
    number: "10",
    title: "UK Visa",
    tagline: "Explore Great Britain",
    accent: "#6366f1",
    bg: "#05040f",
    badge: "International",
    icon: "🇬🇧",
    overview:
      "The United Kingdom offers a range of visa pathways for visitors, students, workers, and families. CAIS Inc. is experienced with UKVI (UK Visas and Immigration) requirements, preparing comprehensive applications with strong supporting evidence.",
    whoFor: "Tourists, students, skilled workers, family members, and individuals seeking settlement in the UK.",
    timeline: [
      { step: "01", title: "Visa Category Selection", desc: "Identify correct UK visa: Standard Visitor, Student, Skilled Worker, or Family.", time: "Day 1" },
      { step: "02", title: "Online Application", desc: "Complete UKVI online application form; pay visa application fee.", time: "Week 1" },
      { step: "03", title: "Document Preparation", desc: "Prepare comprehensive evidence: finances, employment, accommodation, travel history.", time: "Week 1–2" },
      { step: "04", title: "Biometrics Appointment", desc: "Attend VFS biometrics appointment; submit biometric residence permit application.", time: "Week 2–3" },
      { step: "05", title: "UKVI Processing", desc: "UKVI reviews application; standard processing 3 weeks, priority 5 business days.", time: "1–6 weeks" },
      { step: "06", title: "Visa Decision", desc: "Passport returned with visa vignette or BRP collection details.", time: "Per processing" },
    ],
    includes: [
      "UK Standard Visitor Visa", "UK Student Visa (Tier 4 / Student route)",
      "UK Skilled Worker Visa", "UK Family Visa (spouse & dependents)",
      "UK Indefinite Leave to Remain (ILR)", "UK Citizenship application",
      "Priority application support", "UK visa refusal appeal guidance",
    ],
    
    successRate: "93%",
  },
  {
    id: "canada",
    number: "11",
    title: "Canada Visa & P.R.",
    tagline: "Your New Home in the Great White North",
    accent: "#ef4444",
    bg: "#1a0000",
    badge: "Top Destination",
    icon: "🇨🇦",
    overview:
      "Canada is one of the world's most welcoming immigration destinations. CAIS Inc. handles all major Canadian immigration pathways — from temporary visitor visas to Express Entry Permanent Residence applications — with deep expertise in IRCC requirements.",
    whoFor: "Tourists, students, skilled workers, family sponsors, and individuals seeking Canadian Permanent Residence.",
    timeline: [
      { step: "01", title: "Profile Assessment", desc: "Calculate CRS (Comprehensive Ranking System) score; identify optimal immigration pathway.", time: "Day 1" },
      { step: "02", title: "Express Entry Profile", desc: "Create Express Entry profile in IRCC system with education, work experience, language scores.", time: "Week 1–2" },
      { step: "03", title: "Document Preparation", desc: "Gather ECA (educational credential assessment), IELTS/CELPIP scores, work experience letters.", time: "Week 2–6" },
      { step: "04", title: "ITA Receipt", desc: "Receive Invitation to Apply (ITA) when CRS score meets draw cutoff.", time: "Ongoing draws" },
      { step: "05", title: "PR Application Filing", desc: "Submit complete PR application within 60 days of ITA with all documents.", time: "Within 60 days of ITA" },
      { step: "06", title: "PR Card Issued", desc: "IRCC approves PR; Confirmation of Permanent Residence (COPR) and PR card issued.", time: "6–12 months post-filing" },
    ],
    includes: [
      "Canada Visitor / Tourist Visa (TRV)", "Express Entry (Federal Skilled Worker)",
      "Provincial Nominee Program (PNP)", "Canadian Experience Class (CEC)",
      "Study Permit", "Work Permit (LMIA & exempt)",
      "Permanent Residence (PR) application", "Spousal / Family sponsorship",
    ],
   
    successRate: "96%",
  },
  {
    id: "various",
    number: "12",
    title: "Various Immigration Services",
    tagline: "Every Need, One Expert Team",
    accent: "#ec4899",
    bg: "#180010",
    badge: "Full Service",
    icon: "🌍",
    overview:
      "Beyond our core services, CAIS Inc. offers a comprehensive range of immigration-related support for Schengen countries, Australia, DACA, TPS, notarization, and more. Whatever your need, our experienced team is equipped to assist.",
    whoFor: "Individuals needing Schengen visas, Australia visas, DACA renewals, TPS, and document services.",
    timeline: [
      { step: "01", title: "Requirement Identification", desc: "Identify exact service needed — visa type, document service, or status protection.", time: "Day 1" },
      { step: "02", title: "Eligibility Review", desc: "Confirm eligibility requirements for selected country / program.", time: "Day 1–3" },
      { step: "03", title: "Document Collection", desc: "Gather all required documents per destination country consulate requirements.", time: "Week 1–2" },
      { step: "04", title: "Application Submission", desc: "Submit application to relevant consulate, embassy, or government portal.", time: "Week 2–3" },
      { step: "05", title: "Processing & Follow-Up", desc: "Track application; respond to additional information requests.", time: "Varies" },
      { step: "06", title: "Delivery / Approval", desc: "Visa, document, or status confirmation delivered to client.", time: "Per service" },
    ],
    includes: [
      "Schengen Visa (Italy, Germany, France, Spain & more)", "Australia Tourist & Student Visa",
      "DACA Renewal", "TPS (Temporary Protected Status)",
      "Certified document translation", "Document notarization",
      "Immigration form preparation", "Case status monitoring",
    ],
   
    successRate: "95%",
  },
];

/* ── Service Detail Block ── */
function ServiceDetail({ service, index }) {
  const [ref, visible] = useReveal(0.05);
  const [timelineRef, timelineVisible] = useReveal(0.08);
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} id={service.id} className="relative py-20 scroll-mt-24">
      {/* subtle section separator */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${service.accent}30, transparent)` }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <div className="grid lg:grid-cols-12 gap-10 mb-16">

          {/* Number + title side */}
          <div className={`lg:col-span-5 ${!isEven ? "lg:col-start-8 lg:row-start-1" : ""}`}
            style={anim(visible, 0, isEven ? "left" : "right")}>
            <div className="flex items-start gap-5">
              {/* big number */}
              <span className="text-7xl font-black leading-none select-none"
                style={{ color: `${service.accent}18`, fontFamily: "'Playfair Display', serif" }}>
                {service.number}
              </span>
              <div className="pt-2">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="text-2xl">{service.icon}</span>
                  {service.badge && (
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] rounded-full px-3 py-1"
                      style={{ background: `${service.accent}20`, color: service.accent }}>
                      {service.badge}
                    </span>
                  )}
                </div>
                <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}>
                  {service.title}
                </h2>
                <p className="font-bold text-sm uppercase tracking-[0.16em] mt-2"
                  style={{ color: service.accent }}>{service.tagline}</p>
              </div>
            </div>
          </div>

          {/* Overview + meta */}
          <div className={`lg:col-span-7 ${!isEven ? "lg:col-start-1 lg:row-start-1" : ""}`}
            style={anim(visible, 120, isEven ? "right" : "left")}>

            {/* colored top bar */}
            <div className="h-1 w-16 rounded-full mb-5"
              style={{ background: `linear-gradient(90deg, ${service.accent}, ${service.accent}60)` }} />

            <p className="text-white/55 text-base leading-relaxed mb-6"
              style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>
              {service.overview}
            </p>

            {/* who for */}
            <div className="flex items-start gap-3 rounded-xl p-4 mb-6"
              style={{ background: `${service.accent}0d`, border: `1px solid ${service.accent}20` }}>
              <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
                style={{ color: service.accent }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-1"
                  style={{ color: `${service.accent}99` }}>Who This Is For</p>
                <p className="text-white/60 text-sm" style={{ fontFamily: "'Lato', sans-serif" }}>{service.whoFor}</p>
              </div>
            </div>

            {/* meta strip */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Processing Time", value: service.processing, icon: "⏱️" },
                { label: "Success Rate", value: service.successRate, icon: "✅" },
                { label: "Consultation Fee", value: service.fee, icon: "💰" },
              ].map((m) => (
                <div key={m.label} className="rounded-xl p-3 text-center border border-white/[0.06] bg-white/[0.02]">
                  <span className="text-lg">{m.icon}</span>
                  <p className="text-white font-black text-sm mt-1" style={{ fontFamily: "'Playfair Display', serif" }}>{m.value}</p>
                  <p className="text-white/30 text-[9px] uppercase tracking-[0.14em] mt-0.5">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── TIMELINE ── */}
        <div ref={timelineRef}>
          <div className="flex items-center gap-3 mb-8" style={anim(timelineVisible, 0)}>
            <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${service.accent}40, transparent)` }} />
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/30">
              Step-by-Step Process
            </span>
            <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${service.accent}40)` }} />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {service.timeline.map((t, i) => (
              <div
                key={t.step}
                className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 overflow-hidden group hover:border-opacity-50 transition-all duration-400"
                style={{
                  opacity: timelineVisible ? 1 : 0,
                  transform: timelineVisible ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 80}ms`,
                  borderColor: "rgba(255,255,255,0.06)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${service.accent}40`; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}
              >
                {/* bg number watermark */}
                <span className="absolute -bottom-2 -right-1 text-7xl font-black leading-none pointer-events-none select-none"
                  style={{ color: `${service.accent}08`, fontFamily: "'Playfair Display', serif" }}>
                  {t.step}
                </span>

                {/* step badge */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black"
                    style={{ background: `${service.accent}20`, color: service.accent }}>
                    {t.step}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/30">{t.time}</span>
                </div>

                <h4 className="text-white font-black text-base mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {t.title}
                </h4>
                <p className="text-white/40 text-xs leading-relaxed relative z-10"
                  style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>
                  {t.desc}
                </p>

                {/* connector arrow (not last) */}
                {i < service.timeline.length - 1 && (
                  <div className="absolute top-1/2 -right-2.5 w-5 h-px hidden lg:block"
                    style={{ background: `${service.accent}40` }} />
                )}

                {/* bottom slide */}
                <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl"
                  style={{ background: `linear-gradient(90deg, ${service.accent}, ${service.accent}60)` }} />
              </div>
            ))}
          </div>
        </div>

        {/* ── INCLUDES GRID ── */}
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-3"
          style={anim(timelineVisible, 600)}>
          <div className="lg:col-span-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/25 mb-4">
              What's Included in This Service
            </p>
          </div>
          {service.includes.map((item, i) => (
            <div key={i} className="flex items-center gap-2.5 bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 group hover:bg-white/[0.04] transition-colors duration-200"
              style={{
                opacity: timelineVisible ? 1 : 0,
                transition: `opacity 0.5s ease ${700 + i * 40}ms`,
              }}>
              <svg className="w-2.5 h-2.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"
                style={{ color: service.accent }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-white/55 text-xs font-medium group-hover:text-white/80 transition-colors"
                style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {item}
              </span>
            </div>
          ))}
        </div>

        {/* CTA row */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 items-start" style={anim(timelineVisible, 900)}>
          <Link to="/contact"
            className="inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-white font-black text-xs uppercase tracking-[0.15em] hover:scale-105 transition-all duration-300 shadow-xl"
            style={{ background: `linear-gradient(135deg, ${service.accent}, ${service.accent}aa)`, boxShadow: `0 12px 30px ${service.accent}30` }}>
            Get Help with {service.title}
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <a href="https://wa.me/14084228585" target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-white/40 hover:text-green-400 border border-white/10 hover:border-green-500/30 rounded-full px-6 py-3.5 transition-all duration-300 hover:bg-green-900/20">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Quick WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════ */
export default function Services() {
  const [heroRef, heroVisible] = useReveal(0.05);
  const [navRef, navVisible] = useReveal(0.05);
  const [expertRef, expertVisible] = useReveal(0.1);
  const [activeNav, setActiveNav] = useState("family");

  // sticky nav active state on scroll
  useEffect(() => {
    const handler = () => {
      for (const s of SERVICES) {
        const el = document.getElementById(s.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveNav(s.id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="bg-[#04091a] min-h-screen" style={{ fontFamily: "'Montserrat', sans-serif" }}>

      {/* ══ HERO ══ */}
      <section ref={heroRef} className="relative pt-24 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-[0.12]"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1920&q=80')" }} />
        <div className="absolute inset-0 bg-gradient-to-br from-[#04091a] via-[#04091af0] to-[#0b1840]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none opacity-[0.07]"
          style={{ background: "radial-gradient(circle,#dc2626,transparent 65%)" }} />
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize: "44px 44px" }} />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div style={anim(heroVisible, 0)}>
            <span className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.04] rounded-full px-5 py-2 text-[10px] font-bold uppercase tracking-[0.25em] text-white/40 mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse inline-block" />
              12 Expert Immigration Services
            </span>
          </div>
          <h1 className="font-black leading-[1.04] mb-5"
            style={{ ...anim(heroVisible, 100), fontFamily: "'Playfair Display', serif" }}>
            <span className="block text-white text-5xl sm:text-6xl lg:text-7xl">Comprehensive</span>
            <span className="block text-5xl sm:text-6xl lg:text-7xl mt-1"
              style={{ background: "linear-gradient(110deg,#ef4444,#dc2626,#ff7043)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Immigration Services
            </span>
            <span className="block text-white/70 text-5xl sm:text-6xl lg:text-7xl mt-1">All Under One Roof</span>
          </h1>
          <p className="text-white/45 text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ ...anim(heroVisible, 230), fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>
            From Green Cards to Schengen visas — guided by <span className="text-white/70 font-semibold">Founder Kanwal Kaur</span> with{" "}
            <span className="text-red-400 font-semibold">13+ years of expertise</span> and a 98% success rate.
          </p>

          {/* stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-10" style={anim(heroVisible, 380)}>
            {[
              { v: "12+", l: "Services Offered" },
              { v: "13+", l: "Years Experience" },
              { v: "98%", l: "Success Rate" },
              { v: "50+", l: "Countries" },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <p className="text-white font-black text-3xl" style={{ fontFamily: "'Playfair Display', serif" }}>{s.v}</p>
                <p className="text-white/30 text-[10px] uppercase tracking-[0.18em] mt-0.5">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#04091a]"
          style={{ clipPath: "polygon(0 100%,100% 0,100% 100%)" }} />
      </section>

      {/* ══ STICKY SERVICE NAV ══ */}
      <div ref={navRef} className="sticky top-[64px] z-40 bg-[#04091af8] backdrop-blur-md border-b border-white/[0.06] overflow-x-auto"
        style={{ transition: "all 0.3s ease" }}>
        <div className="max-w-7xl mx-auto px-4 flex gap-1 py-3 min-w-max sm:min-w-0 sm:flex-wrap">
          {SERVICES.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={() => setActiveNav(s.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.12em] transition-all duration-300 whitespace-nowrap"
              style={{
                background: activeNav === s.id ? `${s.accent}25` : "transparent",
                color: activeNav === s.id ? s.accent : "rgba(255,255,255,0.3)",
                border: activeNav === s.id ? `1px solid ${s.accent}40` : "1px solid transparent",
              }}
            >
              <span>{s.icon}</span>
              <span className="hidden sm:inline">{s.title}</span>
            </a>
          ))}
        </div>
      </div>

      {/* ══ ALL SERVICES ══ */}
      <div className="bg-[#04091a]">
        {SERVICES.map((service, index) => (
          <div key={service.id}
            style={{ background: index % 2 === 0 ? "#04091a" : "#060c20" }}>
            <ServiceDetail service={service} index={index} />
          </div>
        ))}
      </div>

      {/* ══ EXPERT TEAM SECTION ══ */}
      <section ref={expertRef} className="py-24 bg-[#060c20] relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600/30 to-transparent" />
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize: "44px 44px" }} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.05] pointer-events-none"
          style={{ background: "radial-gradient(circle,#dc2626,transparent 65%)" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" style={anim(expertVisible, 0)}>
            <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-red-400 mb-4">
              <span className="w-8 h-px bg-red-600 inline-block" />
              Why Choose Us
              <span className="w-8 h-px bg-red-600 inline-block" />
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              All Services Handled by{" "}
              <span style={{ background: "linear-gradient(110deg,#ef4444,#dc2626)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                True Experts
              </span>
            </h2>
            <p className="text-white/40 text-lg max-w-2xl mx-auto"
              style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>
              Every case at CAIS Inc. is personally reviewed by Founder Kanwal Kaur — 13+ years of expertise behind every approval.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: "🎯", title: "Personalized Case Review", desc: "Every case is individually assessed by Kanwal Kaur. No templates, no one-size-fits-all approach — only tailored strategy.", color: "#ef4444" },
              { icon: "📋", title: "Document Perfection", desc: "Our team reviews every document for accuracy before submission. We catch errors before USCIS does — saving you time and money.", color: "#22c55e" },
              { icon: "⏱️", title: "Deadline Management", desc: "We track every filing deadline, priority date, and response window so nothing slips through the cracks.", color: "#3b82f6" },
              { icon: "📞", title: "End-to-End Support", desc: "From first consultation to final approval — we're with you every step. Reach us by phone, WhatsApp, or email anytime.", color: "#f59e0b" },
              { icon: "🌍", title: "Multi-Country Expertise", desc: "USA, Canada, UK, Australia, Schengen, India — our expertise spans 50+ countries and immigration systems.", color: "#8b5cf6" },
              { icon: "🏆", title: "13+ Years · 98% Success", desc: "Founded in 2013. Over 10,000 cases approved. Registered & Bonded. Our track record speaks for itself.", color: "#ec4899" },
            ].map((card, i) => (
              <div
                key={card.title}
                className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 hover:border-opacity-40 hover:bg-white/[0.04] transition-all duration-400 relative overflow-hidden"
                style={{
                  opacity: expertVisible ? 1 : 0,
                  transform: expertVisible ? "translateY(0)" : "translateY(24px)",
                  transition: `all 0.65s cubic-bezier(0.16,1,0.3,1) ${i * 90}ms`,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${card.color}35`; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{ background: `radial-gradient(ellipse at 50% 0%, ${card.color}12, transparent 65%)` }} />
                <span className="text-3xl mb-4 block">{card.icon}</span>
                <h3 className="text-white font-black text-lg mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {card.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed"
                  style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>
                  {card.desc}
                </p>
                <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl"
                  style={{ background: `linear-gradient(90deg, ${card.color}, ${card.color}60)` }} />
              </div>
            ))}
          </div>

          {/* Founder highlight */}
          <div className="mt-12 rounded-2xl overflow-hidden border border-white/[0.08]"
            style={{ ...anim(expertVisible, 700), background: "linear-gradient(135deg, #991b1b15, #04091a, #1d4ed815)" }}>
            <div className="grid lg:grid-cols-3 gap-0">
              <div className="lg:col-span-2 p-8 lg:p-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-full bg-red-600/20 border border-red-600/30 flex items-center justify-center text-2xl">
                    👩‍💼
                  </div>
                  <div>
                    <p className="text-white font-black text-xl" style={{ fontFamily: "'Playfair Display', serif" }}>Kanwal Kaur</p>
                    <p className="text-red-400 text-xs font-bold uppercase tracking-[0.16em]">Founder & Director · 13+ Years</p>
                  </div>
                </div>
                <blockquote className="text-white/55 text-lg leading-relaxed italic"
                  style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>
                  "Every client who walks through our door carries a dream — a dream of being with family, building a career, or starting fresh. My mission since 2013 has been to turn those dreams into reality, one case at a time."
                </blockquote>
              </div>
              <div className="lg:col-span-1 p-8 lg:p-10 border-t lg:border-t-0 lg:border-l border-white/[0.06] flex flex-col justify-center gap-4">
                {[
                  { v: "13+", l: "Years Experience" },
                  { v: "10K+", l: "Approved Cases" },
                  { v: "98%", l: "Success Rate" },
                ].map((s) => (
                  <div key={s.l} className="flex items-center gap-4">
                    <span className="text-3xl font-black text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{s.v}</span>
                    <span className="text-white/30 text-[10px] uppercase tracking-[0.18em] font-bold">{s.l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FINAL CTA ══ */}
      <section className="py-16 bg-[#04091a] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/15 via-transparent to-blue-900/10" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600/25 to-transparent" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Which Service Do{" "}
            <span style={{ background: "linear-gradient(110deg,#ef4444,#ff7043)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              You Need?
            </span>
          </h2>
          <p className="text-white/40 text-lg mb-10" style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>
            Not sure where to start? Our free consultation will identify the right pathway for your situation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact"
              className="inline-flex items-center justify-center gap-3 rounded-full px-9 py-4 text-white font-black text-sm uppercase tracking-[0.14em] hover:scale-105 transition-all duration-300 shadow-2xl shadow-red-900/40"
              style={{ background: "linear-gradient(135deg,#dc2626,#991b1b)" }}>
              Book Free Consultation
            </Link>
            <a href="tel:+14084228585"
              className="inline-flex items-center justify-center gap-3 border border-white/15 hover:border-white/35 text-white/70 hover:text-white rounded-full px-9 py-4 text-sm font-bold uppercase tracking-[0.13em] transition-all duration-300 hover:bg-white/[0.04]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +1 (408) 422-8585
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}