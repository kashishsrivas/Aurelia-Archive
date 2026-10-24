"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import BookShelf from "@/components/BookShelf";
import DustParticles from "@/components/DustParticles";
import Candle from "@/components/Candle";
import { ParallaxScene, ParallaxLayer } from "@/components/Parallax";

const BEAMS = [
  { rotate: -24, width: 200, delay: 0 },
  { rotate: 0, width: 280, delay: 1.5 },
  { rotate: 22, width: 200, delay: 3 },
];

function ArchedWindow() {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-[6svh] h-[68svh] w-[min(38vw,440px)] -translate-x-1/2"
      animate={{ opacity: [0.8, 1, 0.8] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
    >
      <div
        className="relative h-full w-full overflow-hidden"
        style={{
          borderRadius: "999px 999px 0 0",
          border: "6px solid rgba(53,32,15,0.95)",
          background:
            "linear-gradient(to bottom, rgba(255,226,160,0.38), rgba(255,190,100,0.16) 55%, rgba(255,170,80,0.05))",
          boxShadow:
            "0 0 120px 30px rgba(227,185,92,0.25), inset 0 0 60px rgba(255,235,180,0.3)",
        }}
      >
        <span className="absolute inset-y-0 left-1/2 w-[3px] -translate-x-1/2 bg-wood-800/80" />
        <span className="absolute inset-x-0 top-[38%] h-[3px] bg-wood-800/80" />
        <span className="absolute inset-x-0 top-[68%] h-[3px] bg-wood-800/80" />
      </div>
    </motion.div>
  );
}

function LightBeams() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {BEAMS.map((b, i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-[14svh] origin-top"
          style={{
            width: b.width,
            height: "85svh",
            marginLeft: -b.width / 2,
            rotate: b.rotate,
            clipPath: "polygon(35% 0, 65% 0, 100% 100%, 0 100%)",
            background:
              "linear-gradient(to bottom, rgba(255,214,130,0.3), rgba(255,214,130,0))",
            filter: "blur(14px)",
          }}
          animate={{ opacity: [0.35, 0.8, 0.35] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: b.delay,
          }}
        />
      ))}
    </div>
  );
}

const WORDS = ["AURELIA", "ARCHIVE"];

const GLOW_SOFT =
  "0 0 12px rgba(227,185,92,0.55), 0 0 32px rgba(227,185,92,0.25)";
const GLOW_BRIGHT =
  "0 0 18px rgba(243,220,155,0.8), 0 0 50px rgba(227,185,92,0.45)";

const titleContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.3 } },
};

const letter = {
  hidden: { opacity: 0, y: 26, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.1, ease: "easeOut" },
  },
};

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      id="welcome"
      className="relative isolate flex min-h-svh items-center justify-center overflow-hidden bg-midnight-950"
    >
      <ParallaxScene>
        {/* Artwork layers: slide slower than the page as you scroll, and drift with the mouse */}
        <motion.div aria-hidden className="absolute inset-0" style={{ y: bgY }}>
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 50% 35%, #3a2a14 0%, #131a3a 45%, #060913 85%)",
            }}
          />

          <ParallaxLayer depth={14} className="absolute -inset-4">
            <ArchedWindow />
            <LightBeams />
          </ParallaxLayer>

          <ParallaxLayer depth={30} className="absolute -inset-4">
            <BookShelf side="left" seed={11} className="w-[32%] md:w-[24%]" />
            <BookShelf side="right" seed={29} className="w-[32%] md:w-[24%]" />
          </ParallaxLayer>

          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[24svh]"
            style={{
              background:
                "linear-gradient(to top, #1f130b 0%, rgba(53,32,15,0.9) 45%, rgba(53,32,15,0) 100%)",
            }}
          />

          <ParallaxLayer depth={46} className="absolute -inset-4">
            <Candle className="bottom-[8svh] left-[22%]" scale={1} delay={0} />
            <Candle className="bottom-[7svh] right-[21%]" scale={0.85} delay={0.7} />
            <Candle
              className="bottom-[10svh] right-[32%] hidden md:block"
              scale={0.6}
              delay={1.3}
            />
          </ParallaxLayer>

          <ParallaxLayer depth={64} className="absolute -inset-4">
            <DustParticles count={45} />
          </ParallaxLayer>
        </motion.div>
      </ParallaxScene>

      {/* Readability shade behind the text, then edge vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(6,9,19,0.6) 0%, rgba(6,9,19,0.25) 40%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 45%, rgba(3,5,12,0.85) 100%)",
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center px-6 text-center"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.h1
          aria-label="Aurelia Archive"
          className="text-glow pl-[0.2em] font-display text-5xl font-semibold leading-tight tracking-[0.2em] text-gold-300 sm:text-6xl lg:text-8xl"
          animate={{ textShadow: [GLOW_SOFT, GLOW_BRIGHT, GLOW_SOFT] }}
          transition={{ duration: 6, delay: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.span
            aria-hidden
            variants={titleContainer}
            initial="hidden"
            animate="show"
          >
            {WORDS.map((word, wi) => (
              <span
                key={word}
                className={`block sm:inline-block ${wi === 0 ? "sm:mr-[0.35em]" : ""}`}
              >
                {word.split("").map((ch, i) => (
                  <motion.span key={i} variants={letter} className="inline-block">
                    {ch}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.span>
        </motion.h1>

        <motion.div
          aria-hidden
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.2, delay: 1.8 }}
          className="mt-6 flex items-center gap-4 text-gold-400/80"
        >
          <span className="h-px w-16 bg-gold-400/50 sm:w-28" />
          <span className="text-sm">✦</span>
          <span className="h-px w-16 bg-gold-400/50 sm:w-28" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 2.1 }}
          className="mt-6 max-w-2xl text-xl italic leading-relaxed text-parchment-200 sm:text-2xl"
        >
          Welcome to Aurelia Archive — a quiet world of stories, sound, and
          focused thought.
        </motion.p>

        <motion.a
          href="#study-hub"
          initial={{ opacity: 0, y: 12, boxShadow: "0 0 0px rgba(227,185,92,0)" }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05, boxShadow: "0 0 28px rgba(227,185,92,0.55)" }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 1.2, delay: 2.7 }}
          className="mt-12 inline-flex items-center rounded-full border border-gold-400/60 bg-midnight-950/40 px-9 py-4 font-display text-sm tracking-[0.3em] text-gold-300 backdrop-blur-sm transition-colors hover:border-gold-300 hover:bg-gold-400/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-300"
        >
          ENTER THE ARCHIVE
        </motion.a>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 3.4, duration: 1 },
          y: { delay: 3.4, duration: 2.4, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gold-400"
      >
        ⌄
      </motion.div>
    </section>
  );
}