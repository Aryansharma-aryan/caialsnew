import { useState, useEffect, useRef } from "react";
import logo from "../../assets/logo.jpg"

// ─── NAV DATA ─────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      "Family Immigration",
      "Green Card Petition",
      "Citizenship",
      "Business / Visitor Visa",
      "OCI Card & Indian Passport",
      "India Visa",
      "Student Visa",
      "Religious Visa",
      "Divorce Services",
    ],
  },
  {
    label: "Countries",
    href: "/countries",
    children: [
      "United States 🇺🇸",
      "United Kingdom 🇬🇧",
      "Canada 🇨🇦",
      "Australia 🇦🇺",
      "Schengen Zone 🇪🇺",
    ],
  },
  { label: "Contact", href: "/contact" },
];

// ─── GLOBE LOGO SVG ───────────────────────────────────────────────────────────
const GlobeIcon = ({ color = "#B01C2E" }) => (
  <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
    <circle cx="40" cy="40" r="34" stroke={color} strokeWidth="2.8" />
    <ellipse cx="40" cy="40" rx="17" ry="34" stroke={color} strokeWidth="2.2" />
    <line x1="6" y1="40" x2="74" y2="40" stroke={color} strokeWidth="2" />
    <path d="M10 26 Q40 33 70 26" stroke={color} strokeWidth="1.6" fill="none" />
    <path d="M10 54 Q40 47 70 54" stroke={color} strokeWidth="1.6" fill="none" />
    <circle cx="40" cy="40" r="5.5" fill={color} />
  </svg>
);

// ─── ICONS ────────────────────────────────────────────────────────────────────
const PhoneIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const ChevronDown = ({ open }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
    className={`w-3 h-3 transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const CalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// ─── DESKTOP DROPDOWN ─────────────────────────────────────────────────────────
const Dropdown = ({ items, visible }) => (
  <div className={`absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 min-w-[250px]
    bg-white border border-gray-100 border-t-[3px] border-t-[#B01C2E]
    shadow-[0_20px_60px_rgba(0,0,0,0.13)] z-50 py-2
    transition-all duration-200 origin-top
    ${visible
      ? "opacity-100 translate-y-0 pointer-events-auto scale-100"
      : "opacity-0 -translate-y-2 pointer-events-none scale-95"
    }`}
  >
    <span className="absolute -top-[8px] left-1/2 -translate-x-1/2 w-0 h-0
      border-l-[8px] border-r-[8px] border-b-[8px]
      border-l-transparent border-r-transparent border-b-[#B01C2E]" />
    {items.map((item) => (
      <a key={item} href="#"
        className="flex items-center gap-3 px-5 py-2.5 group
          text-[11px] font-semibold tracking-[1.3px] uppercase text-gray-500
          hover:text-[#B01C2E] hover:bg-red-50 hover:pl-7
          transition-all duration-200 border-b border-gray-50 last:border-0">
        <span className="w-1.5 h-1.5 rounded-full bg-[#B01C2E]/25 group-hover:bg-[#B01C2E] transition-colors shrink-0" />
        {item}
      </a>
    ))}
  </div>
);

// ─── RIGHT SIDEBAR (MOBILE) ───────────────────────────────────────────────────
const Sidebar = ({ open, onClose, activeDropdown, setActiveDropdown }) => (
  <>
    {/* Backdrop */}
    <div
      onClick={onClose}
      className={`fixed inset-0 z-[998] transition-all duration-300
        ${open ? "bg-black/40 backdrop-blur-sm pointer-events-auto" : "bg-transparent pointer-events-none"}`}
    />

    {/* Panel */}
    <aside
      className={`fixed top-0 right-0 h-full w-[300px] z-[999] bg-white
        shadow-[-8px_0_50px_rgba(0,0,0,0.15)] flex flex-col
        transition-transform duration-[380ms] ease-[cubic-bezier(0.4,0,0.2,1)]
        ${open ? "translate-x-0" : "translate-x-full"}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 bg-[#B01C2E] shrink-0">
        <div className="flex items-center gap-3">
          {/* Logo emblem white bg */}
          <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center
            shadow-[0_0_0_2px_rgba(255,255,255,0.3),0_4px_12px_rgba(0,0,0,0.2)] shrink-0">
            <div className="w-8 h-8"><GlobeIcon color="#B01C2E" /></div>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-bold text-white text-[15px] tracking-wide"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              California
            </span>
            <span className="text-[7.5px] font-bold tracking-[2.5px] uppercase text-white/65 mt-0.5">
              Immigration Service
            </span>
          </div>
        </div>
        <button onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-full
            bg-white/10 hover:bg-white/20 text-white transition-colors">
          <CloseIcon />
        </button>
      </div>

      {/* Crimson stripe */}
      <div className="h-[3px] bg-gradient-to-r from-[#8B1520] via-[#e04055] to-[#8B1520] shrink-0" />

      {/* Links */}
      <nav className="flex-1 overflow-y-auto">
        {NAV_LINKS.map((link, i) => {
          const isOpen = activeDropdown === link.label;
          return (
            <div key={link.label} className="border-b border-gray-100 last:border-0">
              <div
                className="flex items-center justify-between px-6 py-4 cursor-pointer
                  hover:bg-red-50 group transition-colors duration-200"
                onClick={() =>
                  link.children
                    ? setActiveDropdown(isOpen ? null : link.label)
                    : onClose()
                }
              >
                <a href={link.href}
                  className="text-[11.5px] font-bold tracking-[2px] uppercase
                    text-gray-700 group-hover:text-[#B01C2E] transition-colors">
                  {link.label}
                </a>
                {link.children ? (
                  <span className="text-gray-400 group-hover:text-[#B01C2E] transition-colors">
                    <ChevronDown open={isOpen} />
                  </span>
                ) : (
                  <span className="text-gray-300 group-hover:text-[#B01C2E] transition-colors text-lg leading-none">›</span>
                )}
              </div>

              {/* Submenu accordion */}
              <div className={`overflow-hidden transition-all duration-300 bg-gray-50
                ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                {link.children?.map((child) => (
                  <a key={child} href="#"
                    className="flex items-center gap-3 pl-10 pr-6 py-2.5
                      text-[10.5px] font-semibold tracking-[1.2px] uppercase
                      text-gray-500 hover:text-[#B01C2E] hover:bg-red-50
                      border-b border-gray-100/70 last:border-0 transition-colors group">
                    <span className="w-1 h-1 rounded-full bg-[#B01C2E]/30 group-hover:bg-[#B01C2E] transition-colors shrink-0" />
                    {child}
                  </a>
                ))}
              </div>
            </div>
          );
        })}
      </nav>

      {/* Footer CTAs */}
      <div className="p-5 space-y-3 border-t border-gray-100 bg-gray-50 shrink-0">
        <a href="tel:+18001234567"
          className="flex items-center justify-center gap-2 py-3
            border-2 border-[#B01C2E] text-[#B01C2E]
            text-[10.5px] font-bold tracking-[2px] uppercase
            hover:bg-[#B01C2E] hover:text-white transition-all duration-250">
          <PhoneIcon /> +1 (800) CIS-VISA
        </a>
        <a href="#"
          className="flex items-center justify-center gap-2 py-3.5
            bg-[#B01C2E] text-white text-[10.5px] font-bold tracking-[2px] uppercase
            hover:bg-[#8B1520] transition-colors shadow-[0_4px_15px_rgba(176,28,46,0.3)]">
          <CalIcon /> Free Consultation
        </a>
      </div>
    </aside>
  </>
);

// ─── MAIN NAVBAR ─────────────────────────────────────────────────────────────
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen]);

  useEffect(() => {
    const handler = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Montserrat:wght@400;500;600;700;800&display=swap');
        .font-cormorant { font-family: 'Cormorant Garamond', serif !important; }
        @keyframes navSlide {
          from { opacity: 0; transform: translateY(-100%); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .nav-slide { animation: navSlide 0.55s cubic-bezier(0.4,0,0.2,1) both; }
        .top-slide { animation: navSlide 0.4s ease both; }

        /* Logo ring glow */
        .logo-emblem {
          box-shadow: 0 0 0 2.5px #B01C2E, 0 0 0 5px rgba(176,28,46,0.1), 0 4px 18px rgba(176,28,46,0.18);
          transition: box-shadow 0.3s, transform 0.3s;
        }
        .logo-emblem:hover {
          box-shadow: 0 0 0 2.5px #B01C2E, 0 0 0 7px rgba(176,28,46,0.16), 0 6px 26px rgba(176,28,46,0.28);
          transform: scale(1.05);
        }

        /* Nav link animated underline */
        .nav-lnk {
          position: relative;
        }
        .nav-lnk::after {
          content: '';
          position: absolute;
          bottom: 6px; left: 50%; right: 50%;
          height: 2px;
          background: #B01C2E;
          border-radius: 2px;
          transition: left 0.28s ease, right 0.28s ease;
        }
        .nav-lnk:hover::after,
        .nav-lnk.is-active::after { left: 14px; right: 14px; }

        /* CTA slide-fill */
        .cta-fill {
          position: relative;
          overflow: hidden;
          transition: box-shadow 0.25s, transform 0.2s;
        }
        .cta-fill::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #8B1520;
          transform: translateX(-101%);
          transition: transform 0.3s ease;
          z-index: 0;
        }
        .cta-fill:hover::before { transform: translateX(0); }
        .cta-fill:hover {
          box-shadow: 0 6px 28px rgba(176,28,46,0.45);
          transform: translateY(-1px);
        }
        .cta-fill > * { position: relative; z-index: 1; }
      `}</style>

      <div
        ref={navRef}
        className="sticky top-0 z-[997]"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >

        {/* ── TOP INFO BAR ── */}
        <div className="top-slide bg-[#1c1c1c] px-5 md:px-12 py-[5px]
          flex items-center justify-between">
          <div className="flex items-center gap-5 text-[9px] font-semibold tracking-[1.8px] uppercase text-white/45">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B01C2E] animate-pulse" />
              Est. 2013 · Registered &amp; Bonded
            </span>
            <a href="tel:+18001234567"
              className="hidden sm:flex items-center gap-1.5 hover:text-white transition-colors">
              <PhoneIcon className="w-3 h-3" /> +1 (800) CIS-VISA
            </a>
            <a href="mailto:info@caials.in"
              className="hidden md:flex items-center gap-1.5 hover:text-white transition-colors">
              <MailIcon /> info@caials.in
            </a>
          </div>
          <div className="flex items-center gap-3 text-[9px] font-semibold tracking-[1.6px] uppercase text-white/35">
            <a href="#" className="hover:text-white transition-colors">🇬🇧 UK</a>
            <span className="text-white/15">|</span>
            <a href="#" className="hover:text-white transition-colors">🇨🇦 CA</a>
            <span className="text-white/15">|</span>
            <a href="#" className="hover:text-white transition-colors">🇦🇺 AU</a>
            <span className="hidden md:inline text-white/15">|</span>
            <a href="#" className="hidden md:inline text-[#B01C2E]/60 hover:text-[#B01C2E] transition-colors">caials.in</a>
          </div>
        </div>

        {/* ── MAIN NAV ── */}
        <nav
          className={`nav-slide relative flex items-center justify-between px-5 md:px-12
            transition-all duration-[380ms]
            ${scrolled
              ? "h-[66px] bg-white shadow-[0_2px_28px_rgba(0,0,0,0.1)] border-b-2 border-[#B01C2E]"
              : "h-[80px] bg-white shadow-[0_1px_16px_rgba(0,0,0,0.07)] border-b border-gray-200"
            }`}
        >
          {/* Scroll indicator bar */}
          <div className={`absolute bottom-0 left-0 h-[3px] bg-[#B01C2E]
            transition-[width] duration-500
            ${scrolled ? "w-full" : "w-0"}`} />

          {/* ── LOGO ── */}
          <a href="/" className="flex items-center gap-4 group shrink-0">
            {/* Circle emblem */}
            <div
              className={`logo-emblem rounded-full bg-white flex items-center justify-center shrink-0
                transition-all duration-300
                ${scrolled ? "w-[46px] h-[46px]" : "w-[56px] h-[56px]"}`}
            >
              <div className={`transition-all duration-300 ${scrolled ? "w-[30px] h-[30px]" : "w-[38px] h-[38px]"}`}>
                <GlobeIcon color="#B01C2E" />
              </div>
            </div>

            {/* Thin divider */}
            <div className="w-px h-9 bg-gradient-to-b from-transparent via-[#B01C2E]/20 to-transparent" />

            {/* Brand name */}
            <div className="flex flex-col leading-none">
              <div className="flex items-baseline gap-2">
                <span
                  className={`font-bold text-[#B01C2E] leading-none transition-all duration-300
                    ${scrolled ? "text-[19px]" : "text-[23px]"}`}
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  California
                </span>
                <span
                  className={`font-bold text-gray-800 leading-none transition-all duration-300
                    ${scrolled ? "text-[19px]" : "text-[23px]"}`}
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Immigration
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-[7px] font-bold tracking-[3px] uppercase text-gray-400">
                  Service Inc.
                </span>
                <span className="w-[3px] h-[3px] rounded-full bg-[#B01C2E]/35" />
                <span className="text-[7px] font-bold tracking-[3px] uppercase text-[#B01C2E]/55">
                  Since 2013
                </span>
              </div>
            </div>
          </a>

          {/* ── DESKTOP LINKS ── */}
          <ul className="hidden lg:flex items-center gap-0">
            {NAV_LINKS.map((link) => {
              const hasChildren = !!link.children;
              const isOpen = activeDropdown === link.label;
              const isActive = link.href === "/";

              return (
                <li
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => hasChildren && setActiveDropdown(link.label)}
                  onMouseLeave={() => hasChildren && setActiveDropdown(null)}
                >
                  <a
                    href={link.href}
                    className={`nav-lnk${isActive ? " is-active" : ""}
                      flex items-center gap-1.5 px-4 py-3
                      text-[10.5px] font-bold tracking-[2px] uppercase
                      transition-colors duration-200
                      ${isActive ? "text-[#B01C2E]" : "text-gray-500 hover:text-gray-900"}`}
                  >
                    {link.label}
                    {hasChildren && <ChevronDown open={isOpen} />}
                  </a>
                  {hasChildren && <Dropdown items={link.children} visible={isOpen} />}
                </li>
              );
            })}
          </ul>

          {/* ── CTA AREA ── */}
          <div className="hidden lg:flex items-center gap-5 shrink-0">
            {/* Phone block */}
            <a href="tel:+18001234567"
              className="flex items-center gap-2.5 group text-gray-600 hover:text-[#B01C2E] transition-colors">
              <div className="w-8 h-8 rounded-full bg-[#B01C2E]/8 flex items-center justify-center
                text-[#B01C2E] group-hover:bg-[#B01C2E]/15 transition-colors">
                <PhoneIcon className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[7px] font-semibold tracking-[1.5px] uppercase text-gray-400 mb-0.5">
                  Call Us Free
                </span>
                <span className="text-[14px] font-bold text-gray-700 group-hover:text-[#B01C2E] transition-colors"
                  style={{ fontFamily: ", serif" }}>
                  +1 4084228585
                </span>
              </div>
            </a>

            <div className="w-px h-8 bg-gray-200" />

            {/* CTA Button */}
            <a
              href="/consultation"
              className="cta-fill flex items-center gap-2 px-5 py-3
                bg-[#B01C2E] text-white text-[10px] font-bold tracking-[2px] uppercase
                shadow-[0_4px_18px_rgba(176,28,46,0.3)]"
            >
              <CalIcon />
              Free Consultation
            </a>
          </div>

          {/* ── HAMBURGER ── */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden flex flex-col justify-center items-center gap-[5px]
              w-10 h-10 rounded hover:bg-gray-100 transition-colors"
            aria-label="Open menu"
          >
            <span className="w-5 h-[2px] bg-[#B01C2E] rounded-full" />
            <span className="w-5 h-[2px] bg-gray-400 rounded-full" />
            <span className="w-3 h-[2px] bg-gray-300 rounded-full self-end mr-[10px]" />
          </button>
        </nav>
      </div>

      {/* ── RIGHT SIDEBAR ── */}
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeDropdown={activeDropdown}
        setActiveDropdown={setActiveDropdown}
      />
    </>
  );
}