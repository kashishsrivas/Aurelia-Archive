"use client";

import { motion } from "framer-motion";

const COUNT = 24;

export default function CompletionBurst({ color = "#e3b95c" }) {
  return (
    <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2">
      {Array.from({ length: COUNT }, (_, i) => {
        const angle = (i / COUNT) * Math.PI * 2;
        const distance = 95 + (i % 3) * 28;
        return (
          <motion.span
            key={i}
            className="absolute -ml-[3px] -mt-[3px] block h-1.5 w-1.5 rotate-45"
            style={{ background: color, boxShadow: `0 0 8px 2px ${color}` }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x: Math.cos(angle) * distance,
              y: Math.sin(angle) * distance,
              opacity: 0,
              scale: 0.2,
            }}
            transition={{ duration: 1.8, ease: "easeOut", delay: (i % 4) * 0.05 }}
          />
        );
      })}
    </div>
  );
}