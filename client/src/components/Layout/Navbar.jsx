import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.jpg"; // <-- import the image

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Countries", path: "/countries" },
  { name: "Contact", path: "/contact" },
  {name:"Consultation Form", path:"/consultation"}
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

  // Close sidebar on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Prevent body scroll when sidebar open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    setIsAdminLoggedIn(Boolean(localStorage.getItem("adminToken")));
  }, [location.pathname]);

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
            ? "bg-white shadow-lg shadow-blue-900/10"
            : "bg-white/95 backdrop-blur-md"
        }`}
      >
        {/* Top accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-red-600 via-blue-800 to-red-600" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <Link to="/" className="flex items-center shrink-0">
              <img
                src={logo}
                alt="California Immigration Service"
                className="h-10 md:h-14 w-auto object-contain"
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative px-4 py-2 text-sm font-semibold tracking-wide uppercase transition-colors duration-200 group ${
                      isActive
                        ? "text-red-600"
                        : "text-blue-900 hover:text-red-600"
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
            <div className="hidden lg:flex items-center gap-2">
              {isAdminLoggedIn ? (
                <>
                  <Link
                    to={adminPanelPath}
                    className="inline-flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white text-sm font-bold uppercase tracking-wider px-5 py-2.5 rounded-full shadow-md transition-all duration-200"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Admin Panel
                  </Link>
                  <button
                    type="button"
                    onClick={handleAdminLogout}
                    className="inline-flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-blue-900 text-sm font-bold uppercase tracking-wider px-5 py-2.5 rounded-full shadow-sm transition-all duration-200"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to={adminLoginPath}
                  className="inline-flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white text-sm font-bold uppercase tracking-wider px-5 py-2.5 rounded-full shadow-md transition-all duration-200"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Admin Login
                </Link>
              )}
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold uppercase tracking-wider px-5 py-2.5 rounded-full shadow-md hover:shadow-red-300 transition-all duration-200"
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
              className="lg:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg hover:bg-blue-50 transition-colors"
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
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-white shadow-2xl lg:hidden flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="h-1 w-full bg-gradient-to-r from-red-600 via-blue-800 to-red-600" />
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <img
            src={logo}
            alt="CIS"
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
                className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-1 font-semibold text-sm uppercase tracking-wide transition-all duration-200 ${
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
        <div className="p-5 border-t border-gray-100">
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
            to="/contact"
            className="flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-700 text-white text-sm font-bold uppercase tracking-wider py-3 rounded-full shadow-lg transition-all duration-200"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-3 3v-3z" />
            </svg>
            Free Consultation
          </Link>
          <p className="text-center text-xs text-gray-400 mt-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            © 2024 California Immigration Service
          </p>
        </div>
      </aside>

      {/* Spacer */}
      <div className="h-[65px] md:h-[85px]" />
    </>
  );
}