"use client";

import { createContext, useContext, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

const ParallaxContext = createContext(null);

// Tracks the pointer once and shares it with every layer inside
export function ParallaxScene({ children }) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const x = useSpring(px, { stiffness: 60, damping: 20, mass: 0.6 });
  const y = useSpring(py, { stiffness: 60, damping: 20, mass: 0.6 });

  useEffect(() => {
    if (reduce) return;
    const onMove = (e) => {
      px.set(e.clientX / window.innerWidth - 0.5);
      py.set(e.clientY / window.innerHeight - 0.5);
    };
    const onLeave = () => {
      px.set(0);
      py.set(0);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [reduce, px, py]);

  return (
    <ParallaxContext.Provider value={{ x, y }}>
      {children}
    </ParallaxContext.Provider>
  );
}

// A layer that drifts opposite the pointer. Bigger depth = moves more (feels closer)
export function ParallaxLayer({ depth = 10, className = "", children }) {
  const ctx = useContext(ParallaxContext);
  const zero = useMotionValue(0);
  const tx = useTransform(ctx?.x ?? zero, (v) => v * -depth);
  const ty = useTransform(ctx?.y ?? zero, (v) => v * -depth * 0.6);

  return (
    <motion.div className={className} style={{ x: tx, y: ty }}>
      {children}
    </motion.div>
  );
}