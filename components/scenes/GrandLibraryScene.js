"use client";

import { motion } from "framer-motion";
import BookShelf from "@/components/BookShelf";
import DustParticles from "@/components/DustParticles";
import Candle from "@/components/Candle";

const BEAMS = [
  { rotate: -20, width: 220, delay: 0 },
  { rotate: -4, width: 300, delay: 1.5 },
  { rotate: 14, width: 220, delay: 3 },
];

export default function GrandLibraryScene() {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 40% 30%, #5a3d18 0%, #1d1409 55%, #07060a 100%)",
      }}
    >
      {/* Tall arched window */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[8%] h-[52%] w-[min(46vw,320px)] -translate-x-1/2 lg:left-[42%] lg:w-[min(24vw,320px)]"
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="relative h-full w-full overflow-hidden"
          style={{
            borderRadius: "999px 999px 0 0",
            border: "7px solid rgba(53,32,15,0.95)",
            background:
              "linear-gradient(to bottom, rgba(255,226,160,0.5), rgba(255,190,100,0.2) 55%, rgba(255,170,80,0.06))",
            boxShadow:
              "0 0 120px 30px rgba(227,185,92,0.28), inset 0 0 60px rgba(255,235,180,0.3)",
          }}
        >
          <span className="absolute inset-y-0 left-1/2 w-[4px] -translate-x-1/2 bg-wood-800/80" />
          <span className="absolute inset-x-0 top-[34%] h-[4px] bg-wood-800/80" />
          <span className="absolute inset-x-0 top-[64%] h-[4px] bg-wood-800/80" />
        </div>
      </motion.div>

      {/* Golden light beams from the window */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[14%] h-[86%] lg:left-[42%]"
      >
        {BEAMS.map((b, i) => (
          <motion.div
            key={i}
            className="absolute left-0 top-0 origin-top"
            style={{
              width: b.width,
              height: "100%",
              marginLeft: -b.width / 2,
              rotate: b.rotate,
              clipPath: "polygon(35% 0, 65% 0, 100% 100%, 0 100%)",
              background:
                "linear-gradient(to bottom, rgba(255,214,130,0.32), rgba(255,214,130,0))",
              filter: "blur(14px)",
            }}
            animate={{ opacity: [0.35, 0.85, 0.35] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: b.delay,
            }}
          />
        ))}
      </div>

      {/* Tall bookshelves */}
      <BookShelf side="left" seed={41} className="w-[30%] lg:w-[24%]" />
      <BookShelf side="right" seed={53} className="w-[30%] lg:w-[26%]" />

      {/* Floor */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[26%]"
        style={{
          background:
            "linear-gradient(to top, #1f130b 0%, rgba(53,32,15,0.9) 50%, rgba(53,32,15,0) 100%)",
        }}
      />

      {/* Reading desk */}
      <div
        aria-hidden
        className="absolute bottom-0 left-[6%] h-[20%] w-[62%] rounded-t-md"
        style={{
          borderTop: "6px solid #6b4423",
          background: "linear-gradient(to bottom, #35200f, #1f130b)",
          boxShadow: "0 -10px 30px rgba(0,0,0,0.5)",
        }}
      />

      {/* Books stacked on the desk */}
      <div aria-hidden className="absolute bottom-[20%] left-[8%] flex flex-col gap-px">
        <div
          className="h-3 w-14 rounded-sm"
          style={{ background: "#5a2a1a", borderTop: "1px solid rgba(227,185,92,0.5)" }}
        />
        <div
          className="ml-1 h-4 w-12 rounded-sm"
          style={{ background: "#1f2f4a", borderTop: "1px solid rgba(227,185,92,0.5)" }}
        />
        <div
          className="h-3.5 w-16 rounded-sm"
          style={{ background: "#3d2b1f", borderTop: "1px solid rgba(227,185,92,0.5)" }}
        />
      </div>

      {/* Open book */}
      <div aria-hidden className="absolute bottom-[20%] left-[25%] flex">
        <div
          className="h-4 w-14 origin-bottom-right -skew-x-6 rounded-tl-md"
          style={{ background: "linear-gradient(to right, #d9c79a, #f4e9cc)" }}
        />
        <div
          className="h-4 w-14 origin-bottom-left skew-x-6 rounded-tr-md"
          style={{ background: "linear-gradient(to left, #d9c79a, #f4e9cc)" }}
        />
      </div>

      {/* Candles on the desk */}
      <Candle className="bottom-[20%] left-[15%]" scale={0.9} delay={0} />
      <Candle className="bottom-[20%] left-[44%]" scale={0.75} delay={0.9} />

      {/* Slow warm candlelight pulse over the whole room */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          mixBlendMode: "screen",
          background:
            "radial-gradient(ellipse at 25% 85%, rgba(255,150,60,0.35), transparent 60%)",
        }}
        animate={{ opacity: [0.25, 0.5, 0.3, 0.55, 0.25] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating dust */}
      <DustParticles count={60} seed={9} />

      {/* Edge vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 45%, rgba(3,5,12,0.8) 100%)",
        }}
      />
    </div>
  );
}