"use client";

import { motion } from "framer-motion";
import { createRng } from "@/lib/random";

export default function Rain({
  count = 40,
  seed = 3,
  color = "185, 195, 224",
}) {
  const rng = createRng(seed);

  const drops = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.round(rng() * 10000) / 100,
    length: 12 + Math.round(rng() * 18),
    duration: Math.round((0.7 + rng() * 0.7) * 100) / 100,
    delay: Math.round(rng() * 20) / 10,
    opacity: Math.round((0.25 + rng() * 0.45) * 100) / 100,
  }));

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {drops.map((d) => (
        <motion.span
          key={d.id}
          className="absolute w-px"
          style={{
            left: `${d.left}%`,
            top: "-12%",
            height: d.length,
            background: `linear-gradient(to bottom, transparent, rgba(${color}, ${d.opacity}))`,
          }}
          animate={{ top: ["-12%", "112%"] }}
          transition={{
            duration: d.duration,
            delay: d.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}