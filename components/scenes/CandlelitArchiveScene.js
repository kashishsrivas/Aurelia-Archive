"use client";

import { motion } from "framer-motion";
import DustParticles from "@/components/DustParticles";
import Candle from "@/components/Candle";

const SHELF_BOOKS = [
  { h: 52, w: 14, c: "#3b1d14" },
  { h: 60, w: 12, c: "#1f2f4a" },
  { h: 46, w: 16, c: "#5a2a1a" },
  { h: 64, w: 13, c: "#2b3a2a" },
  { h: 50, w: 15, c: "#4a1f2b" },
  { h: 58, w: 12, c: "#6b4a1f" },
  { h: 44, w: 17, c: "#24304f" },
  { h: 62, w: 13, c: "#3d2b1f" },
  { h: 54, w: 14, c: "#512a2a" },
  { h: 48, w: 15, c: "#1d3b3a" },
  { h: 60, w: 12, c: "#3b1d14" },
  { h: 56, w: 16, c: "#5a2a1a" },
  { h: 50, w: 13, c: "#1f2f4a" },
  { h: 64, w: 14, c: "#4a1f2b" },
  { h: 46, w: 15, c: "#6b4a1f" },
  { h: 58, w: 12, c: "#2b3a2a" },
];

const PARCHMENT_LINES = [92, 78, 88, 64, 84, 46];

export default function CandlelitArchiveScene() {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        background:
          "repeating-linear-gradient(90deg, rgba(0,0,0,0.28) 0 2px, transparent 2px 120px), radial-gradient(ellipse at 35% 70%, #4a2c14 0%, #25150a 45%, #0a0604 100%)",
      }}
    >
      {/* Small wall shelf */}
      <div
        aria-hidden
        className="absolute left-[5%] top-[18%] flex w-[55%] items-end gap-px overflow-hidden px-1 lg:w-[50%]"
        style={{
          borderBottom: "8px solid #4d2f17",
          boxShadow: "0 12px 18px rgba(0,0,0,0.5)",
        }}
      >
        {SHELF_BOOKS.map((b, i) => (
          <div
            key={i}
            className="shrink-0 rounded-t-[2px]"
            style={{
              height: b.h,
              width: b.w,
              background: `linear-gradient(to right, rgba(255,255,255,0.1), ${b.c} 30%, rgba(0,0,0,0.5))`,
            }}
          />
        ))}
      </div>

      {/* Pinned parchment map on the wall */}
      <div
        aria-hidden
        className="parchment-card absolute left-[62%] top-[14%] h-24 w-20 rotate-3 rounded-sm p-2 lg:left-[58%]"
      >
        <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-gold-500" />
        <span className="block h-px bg-wood-800/40" />
        <span className="mt-2 block h-px w-3/4 bg-wood-800/40" />
        <span className="mt-2 block h-6 rounded-sm border border-wood-800/30" />
        <span className="mt-2 block h-px w-2/3 bg-wood-800/40" />
      </div>

      {/* Desk */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[34%]"
        style={{
          borderTop: "6px solid #6b4423",
          background:
            "repeating-linear-gradient(90deg, rgba(0,0,0,0.14) 0 2px, transparent 2px 38px), linear-gradient(to bottom, #3a2312, #1f130b)",
          boxShadow: "0 -14px 40px rgba(0,0,0,0.6)",
        }}
      />

      {/* Warm light pooling on the desk */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-[4%] left-0 h-[40%] w-[75%]"
        style={{
          mixBlendMode: "screen",
          background:
            "radial-gradient(ellipse at 30% 40%, rgba(255,170,70,0.35), transparent 70%)",
        }}
        animate={{ opacity: [0.5, 0.9, 0.6, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Stack of books */}
      <div aria-hidden className="absolute bottom-[26%] left-[17%] flex flex-col gap-px">
        <div
          className="h-3.5 w-16 rounded-sm"
          style={{ background: "#4a1f2b", borderTop: "1px solid rgba(227,185,92,0.5)" }}
        />
        <div
          className="ml-2 h-4 w-14 rounded-sm"
          style={{ background: "#24304f", borderTop: "1px solid rgba(227,185,92,0.5)" }}
        />
        <div
          className="h-4 w-[72px] rounded-sm"
          style={{ background: "#3d2b1f", borderTop: "1px solid rgba(227,185,92,0.5)" }}
        />
      </div>

      {/* Open book */}
      <div aria-hidden className="absolute bottom-[26%] left-[30%] flex">
        <div
          className="h-5 w-16 origin-bottom-right -skew-x-6 rounded-tl-md"
          style={{ background: "linear-gradient(to right, #d9c79a, #f4e9cc)" }}
        />
        <div className="h-5 w-px bg-wood-900/60" />
        <div
          className="h-5 w-16 origin-bottom-left skew-x-6 rounded-tr-md"
          style={{ background: "linear-gradient(to left, #d9c79a, #f4e9cc)" }}
        />
      </div>

      {/* Inkwell and quill */}
      <div aria-hidden className="absolute bottom-[26%] left-[53%]">
        <div
          className="absolute bottom-6 left-3 origin-bottom"
          style={{
            width: 14,
            height: 96,
            background: "linear-gradient(to top, #6b4a1f 0 25%, #f4e9cc 25%)",
            borderRadius: "50% 50% 2px 2px / 70% 70% 2px 2px",
            transform: "rotate(24deg)",
          }}
        />
        <div
          className="relative h-7 w-8 rounded-b-lg border border-gold-500/40 bg-midnight-950"
          style={{ boxShadow: "inset 0 4px 6px rgba(0,0,0,0.6)" }}
        />
      </div>

      {/* Candles: the stars of the room */}
      <Candle className="bottom-[26%] left-[5%]" scale={1.5} delay={0} />
      <Candle className="bottom-[26%] left-[44%]" scale={1.1} delay={0.6} />
      <Candle
        className="bottom-[26%] left-[64%] hidden sm:block lg:left-[62%]"
        scale={0.8}
        delay={1.2}
      />

      {/* Parchment sheet lying flat in the foreground */}
      <div
        aria-hidden
        className="absolute bottom-[5%] left-[14%] h-[22%] w-[38%]"
        style={{
          transform: "perspective(600px) rotateX(50deg) rotateZ(-3deg)",
        }}
      >
        <div className="parchment-card h-full w-full rounded-sm px-[8%] pt-[10%]">
          {PARCHMENT_LINES.map((w, i) => (
            <span
              key={i}
              className="mb-[5%] block h-[2px] rounded-full bg-wood-800/45"
              style={{ width: `${w}%` }}
            />
          ))}
        </div>
      </div>

      {/* Room-wide flame flicker */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          mixBlendMode: "screen",
          background:
            "radial-gradient(ellipse at 25% 75%, rgba(255,150,60,0.4), transparent 60%)",
        }}
        animate={{ opacity: [0.25, 0.55, 0.3, 0.6, 0.35, 0.25] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Rising embers, then a few faint motes */}
      <DustParticles count={28} color="255, 140, 50" seed={17} />
      <DustParticles count={14} seed={23} />

      {/* Heavy vignette keeps the room intimate */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 40% 70%, transparent 25%, rgba(2,2,4,0.92) 100%)",
        }}
      />
    </div>
  );
}