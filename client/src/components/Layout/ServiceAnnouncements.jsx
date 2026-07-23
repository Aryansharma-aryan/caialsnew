import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const announcements = [
  ["Service guidance", "Explore clear support for family immigration, visas, OCI, passports, and Canada PR.", "/services", "Explore services"],
  ["Ready to begin?", "Tell us your destination and goal. We will help you understand the preparation steps.", "/consultation", "Request a consultation"],
  ["Document-first support", "Every service page includes preparation guidance, commonly reviewed documents, and FAQs.", "/document-checklist", "View checklist"],
];

export default function ServiceAnnouncements() {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!sessionStorage.getItem("caials-service-welcome")) {
      const timer = window.setTimeout(() => setIsOpen(true), 650);
      return () => window.clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => setActive((current) => (current + 1) % announcements.length), 30000);
    return () => window.clearInterval(interval);
  }, []);

  const closeWelcome = () => {
    sessionStorage.setItem("caials-service-welcome", "true");
    setIsOpen(false);
  };
  const [title, text, path, action] = announcements[active];

  return (
    <>
      <aside className="fixed bottom-4 left-4 right-4 z-40 mx-auto flex max-w-2xl items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white/95 px-4 py-3 shadow-xl shadow-slate-900/10 backdrop-blur sm:left-auto sm:right-5 sm:w-[31rem]">
        <div className="min-w-0"><p className="text-xs font-extrabold uppercase tracking-[0.14em] text-red-700">{title}</p><p className="mt-1 text-sm leading-5 text-slate-600">{text}</p></div>
        <Link to={path} className="shrink-0 text-sm font-bold text-red-700 hover:text-red-900">{action} →</Link>
      </aside>
      {isOpen && <div className="fixed inset-0 z-[90] flex items-center justify-center px-4"><button aria-label="Close service introduction" onClick={closeWelcome} className="absolute inset-0 bg-slate-950/35 backdrop-blur-sm" /><section role="dialog" aria-modal="true" aria-labelledby="service-welcome-title" className="relative w-full max-w-lg rounded-[2rem] border border-white bg-white p-7 shadow-2xl sm:p-9"><button onClick={closeWelcome} className="absolute right-5 top-5 rounded-full p-2 text-slate-500 hover:bg-slate-100" aria-label="Close">×</button><p className="section-kicker">Welcome to CAIALS</p><h2 id="service-welcome-title" className="premium-title mt-3 text-3xl">Find the right service with confidence.</h2><p className="premium-text mt-4">We provide document-focused support for immigration, visa, passport, OCI, and PR preparation. Explore a service to see what it covers before you request a consultation.</p><div className="mt-7 flex flex-col gap-3 sm:flex-row"><Link to="/services" onClick={closeWelcome} className="premium-button px-6 py-3 text-center text-sm font-bold">Browse services</Link><Link to="/contact" onClick={closeWelcome} className="soft-button px-6 py-3 text-center text-sm font-bold">Contact our team</Link></div></section></div>}
    </>
  );
}
