"use client";

import { motion } from "framer-motion";

export default function Lantern({
  className = "",
  cord = 120,
  scale = 1,
  delay = 0,
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute ${className}`}
      style={{ transform: `scale(${scale})`, transformOrigin: "top center" }}
    >
      <motion.div
        className="flex origin-top flex-col items-center"
        animate={{ rotate: [-1.5, 1.5, -1.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay }}
      >
        {/* Cord */}
        <span className="block w-px bg-wood-700" style={{ height: cord }} />
        {/* Cap */}
        <span className="block h-2 w-6 rounded-t-full bg-[#5a3a1c]" />

        {/* Glass body with glow */}
        <div className="relative">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div
              className="h-40 w-40 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,210,100,0.45) 0%, rgba(255,200,90,0.14) 45%, transparent 70%)",
              }}
              animate={{ opacity: [0.7, 1, 0.75, 0.95, 0.7], scale: [1, 1.06, 0.97, 1.03, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
            />
          </div>
          <div
            className="relative h-12 w-8 rounded-sm"
            style={{
              background: "linear-gradient(to bottom, #ffe9a8, #ffc85a)",
              border: "2px solid #5a3a1c",
              boxShadow: "0 0 20px 6px rgba(255,200,90,0.55)",
            }}
          />
        </div>

        {/* Base */}
        <span className="block h-1.5 w-7 rounded-b bg-[#5a3a1c]" />
      </motion.div>
    </div>
  );
}