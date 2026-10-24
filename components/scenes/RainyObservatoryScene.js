"use client";

import { motion } from "framer-motion";
import Rain from "@/components/Rain";
import DustParticles from "@/components/DustParticles";
import { createRng } from "@/lib/random";

const WINDOWS = [
  { seed: 5, stars: 14, moon: false },
  { seed: 6, stars: 12, moon: true },
  { seed: 7, stars: 14, moon: false },
];

function Stars({ count, seed }) {
  const rng = createRng(seed);
  const stars = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.round(rng() * 10000) / 100,
    top: Math.round(rng() * 7000) / 100,
    size: rng() > 0.8 ? 3 : 2,
    delay: Math.round(rng() * 40) / 10,
    duration: Math.round((2.5 + rng() * 3) * 10) / 10,
  }));

  return (
    <div aria-hidden className="absolute inset-0">
      {stars.map((s) => (
        <motion.span
          key={s.id}
          className="absolute rounded-full bg-parchment-100"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
          }}
          animate={{ opacity: [0.25, 1, 0.25] }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function RainyObservatoryScene() {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        background:
          "repeating-linear-gradient(to bottom, rgba(185,195,224,0.04) 0 1px, transparent 1px 48px), linear-gradient(to bottom, #0b1026 0%, #131a3a 55%, #060913 100%)",
      }}
    >
      {/* Cool moonlight wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(185,195,224,0.1), transparent 60%)",
        }}
      />

      {/* Three tall arched windows */}
      <div className="absolute left-[4%] right-[4%] top-[12%] flex h-[56%] gap-[3%] lg:right-[34%]">
        {WINDOWS.map((w, i) => (
          <div
            key={i}
            className="relative flex-1 overflow-hidden"
            style={{
              borderRadius: "999px 999px 0 0",
              border: "7px solid #3a4470",
              background:
                "linear-gradient(to bottom, #060913 0%, #0f1736 55%, #1d2652 100%)",
              boxShadow:
                "0 0 50px rgba(185,195,224,0.18), inset 0 0 40px rgba(0,0,0,0.5)",
            }}
          >
            <Stars count={w.stars} seed={w.seed * 3} />

            {w.moon && (
              <div
                aria-hidden
                className="absolute right-[18%] top-[16%] h-8 w-8 rounded-full"
                style={{
                  background: "#e9eefb",
                  boxShadow: "0 0 24px 6px rgba(185,195,224,0.45)",
                }}
              />
            )}

            <Rain count={24} seed={w.seed} />

            {/* Glass sheen */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(115deg, rgba(255,255,255,0.08) 0%, transparent 35%)",
              }}
            />

            {/* Window bars */}
            <span className="absolute inset-y-0 left-1/2 w-[3px] -translate-x-1/2 bg-[#3a4470]" />
            <span className="absolute inset-x-0 top-[40%] h-[3px] bg-[#3a4470]" />
            <span className="absolute inset-x-0 top-[72%] h-[3px] bg-[#3a4470]" />
          </div>
        ))}
      </div>

      {/* Floor */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[22%]"
        style={{
          background:
            "linear-gradient(to top, #060913 0%, rgba(19,26,58,0.9) 55%, rgba(19,26,58,0) 100%)",
        }}
      />

      {/* Telescope, pointing up at the windows */}
      <div
        aria-hidden
        className="absolute bottom-[8%] left-[2%] h-44 w-44 origin-bottom-left scale-75 sm:left-[6%] sm:scale-100 lg:left-[8%]"
      >
        {[-20, 20, 0].map((angle, i) => (
          <span
            key={i}
            className="absolute"
            style={{
              left: 87,
              top: 70,
              width: 3,
              height: 100,
              transformOrigin: "top center",
              transform: `rotate(${angle}deg)`,
              background: i === 2 ? "#2a3560" : "#3a4470",
            }}
          />
        ))}
        <div
          className="absolute"
          style={{
            left: 88,
            top: 59,
            width: 150,
            height: 22,
            borderRadius: 4,
            transformOrigin: "0% 50%",
            transform: "rotate(-38deg)",
            background: "linear-gradient(to bottom, #d3dbf0, #7885ad 40%, #3a4470)",
            boxShadow: "0 0 14px rgba(185,195,224,0.25)",
          }}
        >
          <span className="absolute -top-[3px] right-0 h-[28px] w-3 rounded-sm bg-[#8b6a3a]" />
        </div>
        <span
          className="absolute rounded-full bg-[#8b6a3a]"
          style={{ left: 80, top: 62, width: 16, height: 16 }}
        />
      </div>

      {/* Small reading table */}
      <div
        aria-hidden
        className="absolute bottom-0 left-[30%] h-[16%] w-[46%] rounded-t-md lg:left-[32%] lg:w-[34%]"
        style={{
          borderTop: "5px solid #3a4470",
          background: "linear-gradient(to bottom, #1d2652, #0b1026)",
          boxShadow: "0 -10px 30px rgba(0,0,0,0.5)",
        }}
      />

      {/* Books on the table */}
      <div aria-hidden className="absolute bottom-[16%] left-[34%] flex flex-col gap-px lg:left-[36%]">
        <div
          className="h-3 w-12 rounded-sm"
          style={{ background: "#24304f", borderTop: "1px solid rgba(185,195,224,0.5)" }}
        />
        <div
          className="ml-1 h-3.5 w-10 rounded-sm"
          style={{ background: "#1d3b3a", borderTop: "1px solid rgba(185,195,224,0.5)" }}
        />
        <div
          className="h-3.5 w-14 rounded-sm"
          style={{ background: "#3b1d3a", borderTop: "1px solid rgba(185,195,224,0.5)" }}
        />
      </div>

      {/* Open book */}
      <div aria-hidden className="absolute bottom-[16%] left-[44%] flex lg:left-[45%]">
        <div
          className="h-4 w-10 origin-bottom-right -skew-x-6 rounded-tl-md sm:w-14"
          style={{ background: "linear-gradient(to right, #c9d1e8, #eef1fa)" }}
        />
        <div
          className="h-4 w-10 origin-bottom-left skew-x-6 rounded-tr-md sm:w-14"
          style={{ background: "linear-gradient(to left, #c9d1e8, #eef1fa)" }}
        />
      </div>

      {/* Silver reading lamp with a soft glow */}
      <div aria-hidden className="absolute bottom-[16%] left-[62%] flex flex-col items-center lg:left-[58%]">
        <div className="absolute left-1/2 top-3 -translate-x-1/2">
          <motion.div
            className="h-44 w-44 -translate-y-6 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(185,195,224,0.4) 0%, rgba(185,195,224,0.12) 45%, transparent 70%)",
            }}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <div
          className="relative z-10 h-8 w-12"
          style={{
            clipPath: "polygon(20% 0, 80% 0, 100% 100%, 0 100%)",
            background: "linear-gradient(to bottom, #eef1fa, #9aa6cc)",
          }}
        />
        <div className="relative z-10 h-10 w-1 bg-[#5a6694]" />
        <div className="relative z-10 h-2 w-8 rounded-full bg-[#5a6694]" />
      </div>

      {/* Drifting silver motes */}
      <DustParticles count={18} color="185, 195, 224" seed={31} />

      {/* Edge vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 45%, rgba(2,3,10,0.85) 100%)",
        }}
      />
    </div>
  );
}