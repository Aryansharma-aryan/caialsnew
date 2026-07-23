import { useEffect, useState } from "react";

export default function PremiumCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    const move = (event) => setPosition({ x: event.clientX, y: event.clientY });
    const over = (event) => {
      const target = event.target;
      setActive(Boolean(target.closest?.("a, button, input, select, textarea, label")));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  return (
    <div
      className={`pointer-events-none fixed left-0 top-0 z-[9999] hidden rounded-full border border-red-500/40 mix-blend-multiply transition-[width,height,background,border] duration-200 lg:block ${
        active ? "h-12 w-12 bg-red-500/10" : "h-5 w-5 bg-white/20"
      }`}
      style={{
        transform: `translate(${position.x - (active ? 24 : 10)}px, ${position.y - (active ? 24 : 10)}px)`,
      }}
      aria-hidden="true"
    />
  );
}
