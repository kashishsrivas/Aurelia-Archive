"use client";

import { motion } from "framer-motion";
import DustParticles from "@/components/DustParticles";

function Icon({ children }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-7 w-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const FEATURES = [
  {
    title: "Immersive Study Spaces",
    text: "Step into four layered, softly animated rooms, from a golden library to a moonlit forest, each made to help you settle in.",
    span: "lg:col-span-2",
    icon: (
      <Icon>
        <path d="M5 21V10a7 7 0 0 1 14 0v11" />
        <path d="M5 21h14M12 3v18M5 12h14" />
      </Icon>
    ),
  },
  {
    title: "Focus Timer",
    text: "Choose a 25, 45, or 60 minute session, then start, pause, or reset whenever you need to.",
    span: "lg:col-span-2",
    icon: (
      <Icon>
        <path d="M6 3h12M6 21h12" />
        <path d="M7 3v2c0 3 5 5 5 7s-5 4-5 7v2" />
        <path d="M17 3v2c0 3-5 5-5 7s5 4 5 7v2" />
      </Icon>
    ),
  },
  {
    title: "Today's Notes",
    text: "A small page to write what you'll focus on today. It lives only for this visit, then quietly fades away.",
    span: "lg:col-span-2",
    icon: (
      <Icon>
        <path d="M6 3h9l4 4v14H6z" />
        <path d="M15 3v4h4M9 12h6M9 16h6" />
      </Icon>
    ),
  },
  {
    title: "Ambient Atmosphere",
    text: "Flickering candles, falling rain, drifting dust, and fireflies bring every room gently to life.",
    span: "lg:col-span-3",
    icon: (
      <Icon>
        <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />
        <path d="M17 3v4M15 5h4" />
      </Icon>
    ),
  },
  {
    title: "Calm Focus",
    text: "Just you, a quiet room, and the work in front of you.",
    span: "sm:col-span-2 lg:col-span-3",
    icon: (
      <Icon>
        <path d="M12 3c1 3 4 5 4 9a4 4 0 0 1-8 0c0-2 1-3 2-4 0 2 1 2 1.5 2C12 8 11 6 12 3z" />
      </Icon>
    ),
  },
];

function FeatureCard({ feature, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      whileHover={{ y: -6, transition: { duration: 0.3, delay: 0 } }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.12, ease: "easeOut" }}
      className={`group relative ${feature.span}`}
    >
      {/* Soft golden glow that fades in behind the card on hover */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-xl bg-gold-400/50 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="parchment-card relative h-full rounded-xl p-2">
        <div className="flex h-full flex-col items-center rounded-lg border border-wood-700/35 px-6 py-8 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-wood-700/40 bg-wood-800/10 text-wood-700">
            {feature.icon}
          </span>
          <h3 className="mt-5 font-display text-lg font-semibold tracking-[0.12em] text-wood-900">
            {feature.title}
          </h3>
          <p className="mt-3 text-lg leading-relaxed text-wood-800">
            {feature.text}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function WhatAwaits() {
  return (
    <section
      id="what-awaits"
      className="relative isolate overflow-hidden px-6 py-24 sm:py-32"
      style={{
        background:
          "linear-gradient(to bottom, #1f130b 0%, #131a3a 45%, #060913 100%)",
      }}
    >
      <DustParticles count={22} seed={13} />

      <div className="relative mx-auto max-w-6xl">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center"
        >
          <p className="text-xs tracking-[0.4em] text-gold-400/80">
            A GLIMPSE INSIDE
          </p>
          <h2 className="text-glow mt-4 pl-[0.2em] font-display text-3xl font-semibold tracking-[0.2em] text-gold-300 sm:text-5xl">
            WHAT AWAITS YOU
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-xl italic text-parchment-200/85">
            Everything you need to settle in, and nothing that gets in the way.
          </p>
        </motion.header>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}