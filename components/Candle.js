"use client";

import { motion } from "framer-motion";

export default function Candle({ className = "", scale = 1, delay = 0 }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute ${className}`}
      style={{ transform: `scale(${scale})`, transformOrigin: "bottom center" }}
    >
      <div className="relative flex flex-col items-center">
        {/* Warm glow around the flame */}
        <div className="absolute -top-[68px] left-1/2 -translate-x-1/2">
          <motion.div
            className="h-40 w-40 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(255,170,70,0.5) 0%, rgba(255,140,40,0.15) 40%, transparent 70%)",
            }}
            animate={{
              opacity: [0.7, 1, 0.6, 0.95, 0.75],
              scale: [1, 1.08, 0.96, 1.05, 1],
            }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay }}
          />
        </div>

        {/* Flame */}
        <motion.div
          className="relative z-10 h-6 w-3 origin-bottom"
          style={{
            borderRadius: "50% 50% 50% 50% / 65% 65% 35% 35%",
            background: "linear-gradient(to top, #ff7a1a, #ffd36b 60%, #fff6d6)",
            boxShadow: "0 0 14px 4px rgba(255,170,60,0.7)",
          }}
          animate={{
            scaleY: [1, 1.18, 0.92, 1.12, 1],
            scaleX: [1, 0.9, 1.05, 0.95, 1],
            rotate: [0, 2, -2, 1, 0],
          }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay }}
        />

        {/* Wick, wax, holder */}
        <div className="h-1.5 w-px bg-wood-900" />
        <div
          className="h-16 w-4 rounded-t-sm"
          style={{
            background: "linear-gradient(to right, #d9c79a, #f4e9cc 45%, #bfa874)",
          }}
        />
        <div className="h-2 w-10 rounded-full bg-gold-500/80" />
      </div>
    </div>
  );
}