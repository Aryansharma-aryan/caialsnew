import { useState, useEffect } from "react";
import logo from "../../assets/logo.jpg";

// ─── HOW TO USE ───────────────────────────────────────────────────────────────
// In your App.jsx:
//
//   import Loader from "./components/Loader";
//
//   function App() {
//     return (
//       <>
//         <Loader />
//         <Navbar />
//         {/* rest of your app */}
//       </>
//     );
//   }
// ─────────────────────────────────────────────────────────────────────────────

export default function Loader() {
  const [phase, setPhase]       = useState("enter");
  const [progress, setProgress] = useState(0);
  const [visible, setVisible]   = useState(true);

  useEffect(() => {
    let start = null;
    const duration = 2200;

    const tick = (ts) => {
      if (!start) start = ts;
      const pct = Math.min(((ts - start) / duration) * 100, 100);
      setProgress(Math.floor(pct));
      if (pct < 100) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => setPhase("exit"), 350);
        setTimeout(() => setVisible(false), 1150);
      }
    };

    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (!visible) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400&family=Montserrat:wght@400;600;700&display=swap');

        /* ── Curtain split ── */
        .curt-top { transition: transform 0.78s cubic-bezier(0.76,0,0.24,1); }
        .curt-top.exit { transform: translateY(-100%); }
        .curt-bot { transition: transform 0.78s cubic-bezier(0.76,0,0.24,1); }
        .curt-bot.exit { transform: translateY(100%); }

        /* ── Logo: drops in from slight above, no blur ── */
        @keyframes logoIn {
          0%   { opacity: 0; transform: translateY(-22px) scale(0.94); }
          100% { opacity: 1; transform: translateY(0)    scale(1); }
        }
        .logo-in { animation: logoIn 0.75s cubic-bezier(0.34,1.26,0.64,1) 0.2s both; }

        /* ── One-time shine sweep across logo ── */
        @keyframes shine {
          0%   { left: -70%; opacity: 0; }
          15%  { opacity: 1; }
          100% { left: 130%; opacity: 0; }
        }
        .shine { animation: shine 1.6s ease 0.85s both; }

        /* ── Soft glow breathe behind logo ── */
        @keyframes breathe {
          0%,100% { opacity: 0.14; transform: scale(1); }
          50%      { opacity: 0.28; transform: scale(1.1); }
        }
        .breathe { animation: breathe 2.4s ease-in-out infinite; }

        /* ── Text reveal ── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(13px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fu1 { animation: fadeUp 0.55s ease 0.7s  both; }
        .fu2 { animation: fadeUp 0.55s ease 0.9s  both; }
        .fu3 { animation: fadeUp 0.55s ease 1.05s both; }

        /* ── Divider grow ── */
        @keyframes lineGrow {
          from { width: 0; opacity: 0; }
          to   { width: 100%; opacity: 1; }
        }
        .line-grow { animation: lineGrow 0.65s ease 0.8s both; }

        /* ── Letter stagger (tagline) ── */
        @keyframes ltrIn {
          from { opacity: 0; transform: translateY(7px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ltr { display: inline-block; animation: ltrIn 0.04s ease both; }

        /* ── Progress shimmer ── */
        @keyframes barShimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
        .bar-shimmer { animation: barShimmer 1.5s ease-in-out infinite; }

        /* ── Floating particles ── */
        @keyframes floatA {
          0%,100% { transform: translateY(0) translateX(0); opacity:.22; }
          50%      { transform: translateY(-22px) translateX(7px); opacity:.42; }
        }
        @keyframes floatB {
          0%,100% { transform: translateY(0) translateX(0); opacity:.17; }
          50%      { transform: translateY(-18px) translateX(-6px); opacity:.35; }
        }
        .fa { animation: floatA 3.4s ease-in-out infinite; }
        .fb { animation: floatB 4.1s ease-in-out 0.6s infinite; }
        .fc { animation: floatA 3.0s ease-in-out 1.1s infinite; }
        .fd { animation: floatB 3.7s ease-in-out 0.3s infinite; }

        /* ── Content fade on exit ── */
        .content { transition: opacity 0.28s ease; }
        .content.exit { opacity: 0; }
      `}</style>

      <div className="fixed inset-0 z-[9999] pointer-events-none" aria-hidden="true">

        {/* TOP CURTAIN */}
        <div className={`curt-top absolute top-0 left-0 right-0 h-1/2 bg-[#0c0707] overflow-hidden ${phase === "exit" ? "exit" : ""}`}>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[240px] bg-[#B01C2E]/[0.07] blur-[80px] rounded-full" />
          <div className="fa absolute top-[22%] left-[11%]  w-1.5 h-1.5 rounded-full bg-[#B01C2E]/35" />
          <div className="fb absolute top-[58%] left-[80%]  w-1   h-1   rounded-full bg-[#B01C2E]/22" />
          <div className="fc absolute top-[16%] left-[62%]  w-2   h-2   rounded-full bg-white/8" />
        </div>

        {/* BOTTOM CURTAIN */}
        <div className={`curt-bot absolute bottom-0 left-0 right-0 h-1/2 bg-[#0c0707] overflow-hidden ${phase === "exit" ? "exit" : ""}`}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[240px] bg-[#B01C2E]/[0.06] blur-[80px] rounded-full" />
          <div className="fd absolute top-[28%] left-[25%]  w-1   h-1   rounded-full bg-[#B01C2E]/20" />
          <div className="fa absolute top-[65%] left-[70%]  w-1.5 h-1.5 rounded-full bg-[#B01C2E]/15" />
          <div className="fb absolute top-[78%] left-[44%]  w-1   h-1   rounded-full bg-white/7" />
        </div>

        {/* Seam */}
        <div className={`absolute top-1/2 left-0 right-0 h-px bg-[#B01C2E]/15 transition-opacity duration-200 ${phase === "exit" ? "opacity-0" : "opacity-100"}`} />

        {/* CENTER CONTENT */}
        <div className={`content absolute inset-0 flex flex-col items-center justify-center px-8 ${phase === "exit" ? "exit" : ""}`}>

          {/* ✅ LOGO — full original, premium styled presentation */}
          <div className="logo-in relative mb-6 flex flex-col items-center">

            {/* Outer deep glow — wide, soft, crimson */}
            <div className="breathe absolute w-[280px] h-[180px] bg-[#B01C2E]/25 blur-[70px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

            {/* Decorative TOP label strip */}
            <div className="relative flex items-center gap-2 mb-3 z-10">
              <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#B01C2E]/60" />
              <span
                className="text-[7px] font-bold tracking-[4px] uppercase text-[#B01C2E]/70"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Est. 2013
              </span>
              <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#B01C2E]/60" />
            </div>

            {/* Logo wrapper — subtle drop shadow + scale hover feel */}
            <div
              className="relative z-10"
              style={{
                filter: "drop-shadow(0 8px 32px rgba(176,28,46,0.35)) drop-shadow(0 2px 8px rgba(0,0,0,0.6))",
              }}
            >
              {/* ✅ Full original logo — styled with radius + crimson theme */}
              <img
                src={logo}
                alt="California Immigration Service"
                className="block w-[210px] h-auto"
                style={{
                  objectFit: "contain",
                  imageRendering: "auto",
                  borderRadius: "18px",
                  border: "2px solid rgba(176,28,46,0.55)",
                  boxShadow: `
                    0 0 0 4px rgba(176,28,46,0.12),
                    0 0 0 8px rgba(176,28,46,0.05),
                    0 12px 40px rgba(0,0,0,0.55),
                    0 4px 15px rgba(176,28,46,0.2)
                  `,
                  background: "linear-gradient(145deg, #fff8f8 0%, #ffffff 60%, #fff2f2 100%)",
                  padding: "10px",
                }}
                draggable={false}
              />

              {/* One-pass shine sweep */}
              <div
                className="shine pointer-events-none absolute top-0 bottom-0 w-[35%] skew-x-[-12deg]"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
                }}
              />
            </div>

            {/* Decorative BOTTOM: two symmetric corner lines */}
            <div className="relative z-10 flex items-center gap-3 mt-3">
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#B01C2E]/50 to-transparent" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#B01C2E]/60" />
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#B01C2E]/50 to-transparent" />
            </div>

          </div>

          {/* Brand name */}
          <div className="fu1 flex items-baseline gap-3 mb-1">
            <span className="text-[28px] font-bold text-[#B01C2E]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              California
            </span>
            <span className="text-[28px] font-bold text-white"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Immigration
            </span>
          </div>

          {/* Sub-brand */}
          <div className="fu2 text-[7px] font-bold tracking-[5px] uppercase text-white/28 mb-4"
            style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Service Inc. &nbsp;·&nbsp; Since 2013
          </div>

          {/* Divider */}
          <div className="line-grow h-px bg-gradient-to-r from-transparent via-[#B01C2E]/45 to-transparent w-48 mb-4" />

          {/* Tagline */}
          <div className="fu3 mb-7" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            {"Turning Your American Dream Into Reality.".split("").map((char, i) => (
              <span
                key={i}
                className="ltr text-[13px] italic text-white/32"
                style={{ animationDelay: `${1.1 + i * 0.022}s` }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </div>

          {/* Progress */}
          <div className="w-[200px] flex flex-col gap-2">
            <div className="relative w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-[#B01C2E] rounded-full"
                style={{ width: `${progress}%`, transition: "width 80ms linear" }}
              />
              <div className="bar-shimmer absolute top-0 left-0 h-full w-1/3
                bg-gradient-to-r from-transparent via-white/35 to-transparent rounded-full" />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[8px] font-semibold tracking-[2px] uppercase text-white/18"
                style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Loading
              </span>
              <span className="text-[10px] font-bold tabular-nums text-[#B01C2E]/65"
                style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {progress}%
              </span>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
