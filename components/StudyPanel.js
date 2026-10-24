"use client";

import { useEffect, useRef, useState } from "react";
import TransitionLink from "@/components/TransitionLink";
import CompletionBurst from "@/components/CompletionBurst";
import { AnimatePresence, motion } from "framer-motion";
import SoundToggle from "@/components/SoundToggle";

const PRESETS = [25, 45, 60];
const RING_RADIUS = 80;
const RING_LENGTH = 2 * Math.PI * RING_RADIUS;

function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function StudyPanel({ room }) {
  const [preset, setPreset] = useState(25);
  const [remaining, setRemaining] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [notes, setNotes] = useState("");
  const endTimeRef = useRef(0);

  const finished = remaining === 0;
  const progress = 1 - remaining / (preset * 60);

  // Tick against the real clock so the timer stays accurate even if the tab is throttled
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      const left = Math.max(
        0,
        Math.ceil((endTimeRef.current - Date.now()) / 1000)
      );
      setRemaining(left);
      if (left === 0) setRunning(false);
    }, 250);
    return () => clearInterval(id);
  }, [running]);

  const start = () => {
    endTimeRef.current = Date.now() + remaining * 1000;
    setRunning(true);
  };

  const pause = () => {
    setRemaining(
      Math.max(0, Math.ceil((endTimeRef.current - Date.now()) / 1000))
    );
    setRunning(false);
  };

  const restart = () => {
    setRemaining(preset * 60);
    endTimeRef.current = Date.now() + preset * 60 * 1000;
    setRunning(true);
  };

  const reset = () => {
    setRunning(false);
    setRemaining(preset * 60);
  };

  const choosePreset = (minutes) => {
    setPreset(minutes);
    setRunning(false);
    setRemaining(minutes * 60);
  };

  const primaryLabel = finished
    ? "BEGIN AGAIN"
    : running
    ? "PAUSE"
    : remaining < preset * 60
    ? "RESUME"
    : "START";
  const onPrimary = finished ? restart : running ? pause : start;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
      className="glass-panel w-full rounded-2xl p-6 sm:p-7"
    >
      {/* Room description */}
      <p className="text-lg italic leading-relaxed text-parchment-200/90">
        {room.description}
      </p>

      <div
        aria-hidden
        className="my-6 flex items-center gap-3 text-gold-400/70"
      >
        <span className="h-px flex-1 bg-gold-400/30" />
        <span className="text-xs">✦</span>
        <span className="h-px flex-1 bg-gold-400/30" />
      </div>

      {/* Presets */}
      <div role="group" aria-label="Session length" className="grid grid-cols-3 gap-2">
        {PRESETS.map((m) => {
          const active = preset === m;
          return (
            <button
              key={m}
              type="button"
              onClick={() => choosePreset(m)}
              aria-pressed={active}
              className={`rounded-lg border px-3 py-2 font-display text-sm tracking-widest transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300 ${
                active
                  ? "text-midnight-950"
                  : "border-gold-400/30 text-parchment-200 hover:border-gold-400/70 hover:bg-gold-400/10"
              }`}
              style={
                active
                  ? { backgroundColor: room.accent, borderColor: room.accent }
                  : undefined
              }
            >
              {m} MIN
            </button>
          );
        })}
      </div>

      {/* Timer ring */}
      <div className="relative mx-auto mt-6 h-52 w-52">
        <motion.div
          aria-hidden
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle, ${room.glow}, transparent 70%)`,
          }}
          animate={
            finished
              ? { opacity: [0.2, 0.8, 0.2], scale: [1, 1.15, 1] }
              : { opacity: 0, scale: 1 }
          }
          transition={
            finished
              ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.4 }
          }
        />
        
        {finished && <CompletionBurst color={room.accent} />}
        
        <svg viewBox="0 0 200 200" className="relative h-full w-full -rotate-90" aria-hidden>
          <circle
            cx="100"
            cy="100"
            r={RING_RADIUS}
            fill="none"
            stroke="rgba(244,233,204,0.12)"
            strokeWidth="6"
          />
          <circle
            cx="100"
            cy="100"
            r={RING_RADIUS}
            fill="none"
            stroke={room.accent}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={RING_LENGTH}
            strokeDashoffset={RING_LENGTH * progress}
            style={{
              transition: "stroke-dashoffset 0.4s linear",
              filter: `drop-shadow(0 0 6px ${room.glow})`,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            role="timer"
            className="font-display text-4xl font-semibold tabular-nums tracking-wider text-parchment-100"
          >
            {formatTime(remaining)}
          </span>
          <span className="mt-1 text-sm tracking-[0.25em] text-parchment-200/60">
            {finished ? "COMPLETE" : running ? "FOCUSING" : "READY"}
          </span>
        </div>
      </div>

      <AnimatePresence>
        {finished && (
          <motion.p
            key="done"
            role="status"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 text-center text-lg italic"
            style={{ color: room.accent }}
          >
            Your session is complete. Take a slow breath. ✦
          </motion.p>
        )}
      </AnimatePresence>

      {/* Start / Pause / Reset */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <motion.button
          type="button"
          onClick={onPrimary}
          whileTap={{ scale: 0.97 }}
          className="rounded-full px-6 py-3 font-display text-sm font-semibold tracking-[0.25em] text-midnight-950 transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-300"
          style={{ backgroundColor: room.accent }}
        >
          {primaryLabel}
        </motion.button>
        <motion.button
          type="button"
          onClick={reset}
          whileTap={{ scale: 0.97 }}
          className="rounded-full border border-gold-400/40 px-6 py-3 font-display text-sm tracking-[0.25em] text-parchment-200 transition-colors hover:border-gold-300 hover:bg-gold-400/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-300"
        >
          RESET
        </motion.button>
      </div>

       {/* Ambient sound */}
       <SoundToggle room={room} />

      {/* Notes */}
      <div className="mt-8">
        <label
          htmlFor="focus-notes"
          className="block text-xl italic text-parchment-100"
        >
          What will you focus on today?
        </label>
        <textarea
          id="focus-notes"
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="A chapter, a problem set, a quiet intention…"
          className="mt-3 w-full resize-none rounded-lg border border-gold-400/25 bg-midnight-950/50 p-3 text-lg leading-relaxed text-parchment-100 placeholder:text-parchment-200/40 focus:border-gold-400/70 focus:outline-none focus:ring-1 focus:ring-gold-400/50"
        />
        <p className="mt-2 text-sm italic text-parchment-200/50">
          Your notes and timer reset when you refresh or leave.
        </p>
      </div>

      {/* Back to Study Hub */}
      <TransitionLink
        href="/#study-hub"
        className="mt-6 block rounded-full border border-gold-400/50 px-6 py-3 text-center font-display text-xs tracking-[0.3em] text-gold-300 transition-colors hover:border-gold-300 hover:bg-gold-400/15 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-300"
      >
        ← BACK TO STUDY HUB
      </TransitionLink>
    </motion.div>
  );
}