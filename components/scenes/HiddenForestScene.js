"use client";

import { motion } from "framer-motion";
import DustParticles from "@/components/DustParticles";
import Lantern from "@/components/Lantern";

const PINE =
  "polygon(50% 0, 80% 30%, 66% 30%, 92% 62%, 74% 62%, 100% 100%, 0 100%, 26% 62%, 8% 62%, 34% 30%, 20% 30%)";

const BACK_TREES = [
  { left: "-2%", w: "18%", h: "58%" },
  { left: "10%", w: "16%", h: "48%" },
  { left: "22%", w: "19%", h: "62%" },
  { left: "36%", w: "15%", h: "46%" },
  { left: "48%", w: "18%", h: "60%" },
  { left: "62%", w: "16%", h: "50%" },
  { left: "74%", w: "19%", h: "64%" },
  { left: "88%", w: "16%", h: "52%" },
];

const FRONT_TREES = [
  { left: "-8%", w: "30%", h: "105%", c: "#06201a" },
  { left: "18%", w: "14%", h: "84%", c: "#082a21" },
  { left: "78%", w: "34%", h: "110%", c: "#06201a" },
];

const BEAMS = [
  { rotate: -16, width: 170, delay: 0 },
  { rotate: 0, width: 210, delay: 2 },
  { rotate: 16, width: 170, delay: 4 },
];

function FireflyJar() {
  const dots = [
    { left: "25%", top: "30%", delay: 0 },
    { left: "60%", top: "50%", delay: 0.8 },
    { left: "40%", top: "70%", delay: 1.6 },
  ];
  return (
    <div
      aria-hidden
      className="relative h-14 w-10 rounded-lg"
      style={{
        border: "2px solid rgba(200,230,150,0.45)",
        background: "rgba(200,230,120,0.1)",
        boxShadow: "0 0 24px 6px rgba(200,230,120,0.3)",
      }}
    >
      <span className="absolute -top-2 left-1/2 h-2 w-6 -translate-x-1/2 rounded-t bg-[#5a3a1c]" />
      {dots.map((d, i) => (
        <motion.span
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full bg-[#d8f08a]"
          style={{
            left: d.left,
            top: d.top,
            boxShadow: "0 0 8px 3px rgba(216,240,138,0.8)",
          }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{
            duration: 2.4,
            delay: d.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function HiddenForestScene() {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom, #07161a 0%, #0c2a24 50%, #07130f 100%)",
      }}
    >
      {/* Moon */}
      <div
        aria-hidden
        className="absolute left-1/2 top-[7%] h-16 w-16 -translate-x-1/2 rounded-full sm:h-24 sm:w-24 lg:left-[34%]"
        style={{
          background: "radial-gradient(circle at 35% 35%, #fbf7e3, #e6e2c3)",
          boxShadow:
            "0 0 60px 18px rgba(230,240,200,0.35), 0 0 160px 60px rgba(150,200,150,0.15)",
        }}
      />

      {/* Moonbeams through the branches */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[18%] h-[72%] lg:left-[34%]"
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
                "linear-gradient(to bottom, rgba(210,240,200,0.2), rgba(210,240,200,0))",
              filter: "blur(14px)",
            }}
            animate={{ opacity: [0.3, 0.75, 0.3] }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: b.delay,
            }}
          />
        ))}
      </div>

      {/* Distant trees */}
      {BACK_TREES.map((t, i) => (
        <div
          key={i}
          aria-hidden
          className="absolute bottom-[18%]"
          style={{
            left: t.left,
            width: t.w,
            height: t.h,
            background: "#0d3327",
            opacity: 0.75,
            clipPath: PINE,
          }}
        />
      ))}

      {/* Tall trees framing the clearing */}
      {FRONT_TREES.map((t, i) => (
        <div
          key={i}
          aria-hidden
          className="absolute bottom-[10%]"
          style={{
            left: t.left,
            width: t.w,
            height: t.h,
            background: t.c,
            clipPath: PINE,
          }}
        />
      ))}

      {/* Mossy ground */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[26%]"
        style={{
          background:
            "linear-gradient(to top, #050e0c 0%, #0b2a1c 70%, rgba(11,42,28,0) 100%)",
        }}
      />

      {/* Drifting mist */}
      {[
        { bottom: "14%", duration: 18, from: "-6%", to: "6%" },
        { bottom: "26%", duration: 24, from: "5%", to: "-5%" },
      ].map((m, i) => (
        <motion.div
          key={i}
          aria-hidden
          className="pointer-events-none absolute -inset-x-[20%] h-[22%]"
          style={{
            bottom: m.bottom,
            background:
              "radial-gradient(ellipse at center, rgba(170,215,180,0.18), transparent 70%)",
          }}
          animate={{ x: [m.from, m.to] }}
          transition={{
            duration: m.duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Hanging lanterns */}
      <Lantern className="left-[22%] top-0" cord={90} scale={1.1} delay={0} />
      <Lantern className="left-[52%] top-0" cord={180} scale={1} delay={1.5} />
      <Lantern className="left-[62%] top-0 lg:left-[60%]" cord={120} scale={0.8} delay={3} />

      {/* Rustic table */}
      <div
        aria-hidden
        className="absolute bottom-0 left-[10%] h-[17%] w-[56%] rounded-t-md"
        style={{
          borderTop: "6px solid #5a3a1c",
          background:
            "repeating-linear-gradient(90deg, rgba(0,0,0,0.14) 0 2px, transparent 2px 36px), linear-gradient(to bottom, #3a2412, #1f130b)",
          boxShadow:
            "inset 0 3px 0 rgba(127,166,106,0.35), 0 -10px 30px rgba(0,0,0,0.5)",
        }}
      />

      {/* Books on the table */}
      <div aria-hidden className="absolute bottom-[17%] left-[14%] flex flex-col gap-px">
        <div
          className="h-3.5 w-14 rounded-sm"
          style={{ background: "#2b3a2a", borderTop: "1px solid rgba(200,230,150,0.5)" }}
        />
        <div
          className="ml-1 h-4 w-12 rounded-sm"
          style={{ background: "#3d2b1f", borderTop: "1px solid rgba(200,230,150,0.5)" }}
        />
        <div
          className="h-4 w-16 rounded-sm"
          style={{ background: "#1d3b3a", borderTop: "1px solid rgba(200,230,150,0.5)" }}
        />
      </div>

      {/* Open book */}
      <div aria-hidden className="absolute bottom-[17%] left-[28%] flex">
        <div
          className="h-5 w-12 origin-bottom-right -skew-x-6 rounded-tl-md sm:w-16"
          style={{ background: "linear-gradient(to right, #d9c79a, #f4e9cc)" }}
        />
        <div
          className="h-5 w-12 origin-bottom-left skew-x-6 rounded-tr-md sm:w-16"
          style={{ background: "linear-gradient(to left, #d9c79a, #f4e9cc)" }}
        />
      </div>

      {/* Jar of fireflies */}
      <div className="absolute bottom-[17%] left-[48%]">
        <FireflyJar />
      </div>

      {/* Soft green-gold light pooling around the table */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          mixBlendMode: "screen",
          background:
            "radial-gradient(ellipse at 35% 78%, rgba(200,220,110,0.28), transparent 65%)",
        }}
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Fireflies */}
      <DustParticles count={30} color="200, 230, 120" seed={21} />
      <DustParticles count={12} color="255, 220, 120" seed={27} />

      {/* Edge vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(1,6,5,0.9) 100%)",
        }}
      />
    </div>
  );
}