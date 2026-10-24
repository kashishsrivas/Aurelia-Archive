"use client";

import { motion } from "framer-motion";
import BookShelf from "@/components/BookShelf";
import DustParticles from "@/components/DustParticles";
import Candle from "@/components/Candle";
import Rain from "@/components/Rain";

function GrandLibraryScene() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse at 50% 30%, #6b4a1f 0%, #2a1c10 55%, #0b0a10 100%)",
      }}
    >
      <div
        className="absolute left-1/2 top-[8%] h-[55%] w-[26%] -translate-x-1/2"
        style={{
          borderRadius: "999px 999px 0 0",
          border: "3px solid rgba(53,32,15,0.95)",
          background:
            "linear-gradient(to bottom, rgba(255,226,160,0.6), rgba(255,190,100,0.15))",
          boxShadow: "0 0 40px 10px rgba(227,185,92,0.35)",
        }}
      />
      <BookShelf side="left" seed={3} rows={4} compact className="w-[38%]" />
      <BookShelf side="right" seed={5} rows={4} compact className="w-[38%]" />
      <DustParticles count={14} seed={3} />
    </div>
  );
}

function CandlelitScene() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse at 60% 70%, #5a3414 0%, #2a170a 55%, #0d0805 100%)",
      }}
    >
      <div
        className="absolute inset-x-0 bottom-0 h-[20%]"
        style={{ background: "linear-gradient(to bottom, #35200f, #1f130b)" }}
      />
      <div className="parchment-card absolute bottom-[16%] left-[12%] h-[36%] w-[34%] -rotate-6 rounded-sm px-3 pt-3">
        <span className="block h-px bg-wood-800/40" />
        <span className="mt-2 block h-px w-4/5 bg-wood-800/40" />
        <span className="mt-2 block h-px bg-wood-800/40" />
        <span className="mt-2 block h-px w-3/5 bg-wood-800/40" />
      </div>
      <div
        className="absolute bottom-[16%] left-[40%] h-[16%] w-[26%] rounded-sm"
        style={{
          background: "linear-gradient(to right, #4a1f2b, #2b0f18)",
          borderTop: "3px solid rgba(227,185,92,0.5)",
        }}
      />
      <Candle className="bottom-[16%] right-[18%]" scale={0.8} />
    </div>
  );
}

function RainyScene() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(to bottom, #1d2652 0%, #131a3a 55%, #0b1026 100%)",
      }}
    >
      <div className="absolute inset-x-[10%] top-[12%] flex h-[66%] gap-[6%]">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="flex-1"
            style={{
              borderRadius: "999px 999px 0 0",
              border: "3px solid rgba(185,195,224,0.55)",
              background:
                "linear-gradient(to bottom, rgba(185,195,224,0.28), rgba(29,38,82,0.4))",
              boxShadow: "inset 0 0 20px rgba(185,195,224,0.2)",
            }}
          />
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-0 h-[14%] bg-midnight-950" />
      <Rain count={26} seed={4} />
    </div>
  );
}

const TREES = [
  { left: "-4%", width: "30%", height: "78%", color: "#0f3a2c" },
  { left: "20%", width: "24%", height: "62%", color: "#0c2f24" },
  { left: "58%", width: "26%", height: "70%", color: "#0c2f24" },
  { left: "76%", width: "32%", height: "84%", color: "#0f3a2c" },
];

function ForestScene() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(to bottom, #0f2a22 0%, #0a1d19 55%, #050e0c 100%)",
      }}
    >
      <div
        className="absolute right-[18%] top-[10%] h-10 w-10 rounded-full"
        style={{
          background: "#f4e9cc",
          boxShadow: "0 0 30px 8px rgba(244,233,204,0.35)",
        }}
      />
      {TREES.map((t, i) => (
        <div
          key={i}
          className="absolute bottom-[10%]"
          style={{
            left: t.left,
            width: t.width,
            height: t.height,
            background: t.color,
            clipPath:
              "polygon(50% 0, 88% 45%, 68% 45%, 100% 100%, 0 100%, 32% 45%, 12% 45%)",
          }}
        />
      ))}
      <div className="absolute inset-x-0 bottom-0 h-[14%] bg-[#050e0c]" />
      <div className="absolute bottom-[14%] left-[44%]">
        <motion.div
          className="absolute -left-6 -top-6 h-16 w-16 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,200,90,0.55), transparent 70%)",
          }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative h-5 w-4 rounded-sm bg-gold-400" />
      </div>
      <DustParticles count={18} color="200, 230, 120" seed={21} />
    </div>
  );
}

const SCENES = {
  "grand-library": GrandLibraryScene,
  "candlelit-archive": CandlelitScene,
  "rainy-observatory": RainyScene,
  "hidden-forest-study": ForestScene,
};

export default function RoomPreview({ slug }) {
  const Scene = SCENES[slug];
  return Scene ? <Scene /> : null;
}