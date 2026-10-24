"use client";

import { motion } from "framer-motion";
import { createRng } from "@/lib/random";

export default function DustParticles({
  count = 45,
  color = "255, 226, 160",
  seed = 7,
}) {
  const rng = createRng(seed);

  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.round(rng() * 10000) / 100,
    top: Math.round(rng() * 10000) / 100,
    size: Math.round((1 + rng() * 2.5) * 10) / 10,
    rise: Math.round(30 + rng() * 60),
    sway: Math.round(-25 + rng() * 50),
    duration: Math.round((10 + rng() * 10) * 10) / 10,
    delay: Math.round(rng() * 80) / 10,
    peak: Math.round((0.3 + rng() * 0.5) * 100) / 100,
  }));

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            background: `rgba(${color}, 0.9)`,
            boxShadow: `0 0 6px 1px rgba(${color}, 0.6)`,
          }}
          animate={{
            y: [0, -p.rise],
            x: [0, p.sway, 0],
            opacity: [0, p.peak, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}