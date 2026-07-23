import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.jpg"; // <-- import the image
import { serviceLinks } from "../../data/seoContent";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Countries", path: "/countries" },
  { name: "Process", path: "/process" },
  { name: "FAQ", path: "/faq" },
  { name: "Contact", path: "/contact" },
  { name: "Consultation", path: "/consultation" }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
    Boolean(localStorage.getItem("adminToken"))
  );
  const location = useLocation();
  const navigate = useNavigate();
  const adminLoginPath = "/login";
  const adminPanelPath = "/admin";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when sidebar open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Keep auth state in sync across tabs.
  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key === "adminToken") {
        setIsAdminLoggedIn(Boolean(event.newValue));
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // If login succeeds and token is set, move admin directly to panel.
  useEffect(() => {
    if (location.pathname !== adminLoginPath) return undefined;

    const interval = setInterval(() => {
      const tokenExists = Boolean(localStorage.getItem("adminToken"));
      setIsAdminLoggedIn(tokenExists);

      if (tokenExists) {
        clearInterval(interval);
        navigate(adminPanelPath, { replace: true });
      }
    }, 200);

    return () => clearInterval(interval);
  }, [
    location.pathname,
    navigate,
    adminLoginPath,
    adminPanelPath,
  ]);

  const handleAdminLogout = () => {
    localStorage.removeItem("adminToken");
    setIsAdminLoggedIn(false);
    setIsOpen(false);
    navigate("/");
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 shadow-lg shadow-slate-900/10 backdrop-blur-xl"
            : "bg-white/80 backdrop-blur-xl"
        }`}
      >
        {/* Top accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-red-600 via-slate-900 to-red-600" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <Link to="/" className="flex items-center shrink-0">
              <img
                src={logo}
                alt="CAIALS Immigration Services in Fremont CA"
                className="h-10 md:h-14 w-auto object-contain"
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden xl:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative rounded-full px-4 py-2 text-sm font-semibold tracking-wide transition-colors duration-200 group ${
                      isActive
                        ? "bg-red-50 text-red-700"
                        : "text-slate-700 hover:bg-slate-100 hover:text-red-700"
                    }`}
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {link.name}
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 bg-red-600 transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* CTA Buttons (desktop) */}
            <div className="hidden xl:flex items-center gap-2">
              {isAdminLoggedIn ? (
                <>
                  <Link
                    to={adminPanelPath}
                    className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all duration-200 hover:bg-slate-800"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Admin Panel
                  </Link>
                  <button
                    type="button"
                    onClick={handleAdminLogout}
                    className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-5 py-2.5 text-sm font-bold text-slate-900 shadow-sm transition-all duration-200 hover:bg-slate-200"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to={adminLoginPath}
                  className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all duration-200 hover:bg-slate-800"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Admin Login
                </Link>
              )}
              <Link
                to="/consultation"
                className="inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-red-200 transition-all duration-200 hover:bg-red-700"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-3 3v-3z" />
                </svg>
                Free Consultation
              </Link>
            </div>

            {/* Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              className="xl:hidden flex flex-col justify-center items-center w-11 h-11 rounded-xl border border-slate-200 bg-white shadow-sm hover:border-red-200 hover:bg-red-50 transition-colors"
            >
              <span
                className={`block w-6 h-0.5 bg-blue-900 transition-all duration-300 ${
                  isOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-blue-900 mt-1.5 transition-all duration-300 ${
                  isOpen ? "opacity-0 scale-x-0" : ""
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-blue-900 mt-1.5 transition-all duration-300 ${
                  isOpen ? "-rotate-45 -translate-y-3" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-40 bg-slate-950/45 backdrop-blur-sm xl:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-[21rem] max-w-[88vw] bg-white shadow-2xl xl:hidden flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="h-1.5 w-full bg-gradient-to-r from-red-600 via-slate-900 to-red-600" />
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <img
            src={logo}
            alt="CAIALS Immigration Services logo"
            className="h-10 w-auto object-contain"
          />
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-50 text-blue-900 hover:text-red-600 transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Sidebar Links */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {navLinks.map((link, i) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-1 font-semibold text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-red-600 text-white shadow-md shadow-red-200"
                    : "text-blue-900 hover:bg-blue-50 hover:text-red-600"
                }`}
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  animationDelay: `${i * 50}ms`,
                }}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-white" : "bg-red-400"}`} />
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar CTA */}
        <div className="border-t border-gray-100 p-5">
          <div className="mb-4 max-h-36 overflow-y-auto rounded-2xl bg-slate-50 p-3">
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">All services</p>
            {serviceLinks.map((link) => (
              <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)} className="mb-1 block rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-white hover:text-red-700">
                {link.label}
              </Link>
            ))}
          </div>
          {isAdminLoggedIn ? (
            <div className="flex gap-2 mb-3">
              <Link
                to={adminPanelPath}
                onClick={() => setIsOpen(false)}
                className="flex-1 flex items-center justify-center bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold uppercase tracking-wider py-2.5 rounded-full transition-all duration-200"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Admin Panel
              </Link>
              <button
                type="button"
                onClick={handleAdminLogout}
                className="flex-1 flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-blue-900 text-xs font-bold uppercase tracking-wider py-2.5 rounded-full transition-all duration-200"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to={adminLoginPath}
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full bg-blue-900 hover:bg-blue-800 text-white text-sm font-bold uppercase tracking-wider py-3 rounded-full shadow-lg transition-all duration-200 mb-3"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Admin Login
            </Link>
          )}
          <Link
            to="/consultation"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-700 text-white text-sm font-bold uppercase tracking-wider py-3 rounded-full shadow-lg transition-all duration-200"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-3 3v-3z" />
            </svg>
            Free Consultation
          </Link>
          <p className="text-center text-xs text-gray-400 mt-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            © 2026 CAIALS Immigration Services
          </p>
        </div>
      </aside>

      {/* Spacer */}
      <div className="h-[65px] md:h-[85px]" />
    </>
  );
}
