"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import TransitionLink from "@/components/TransitionLink";

export default function Header() {
  return (
    <header className="pointer-events-none absolute left-0 top-0 z-50 w-full p-5 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <TransitionLink
          href="/"
          aria-label="Aurelia Archive, back to homepage"
          className="text-glow pointer-events-auto font-display text-sm font-semibold tracking-[0.3em] text-gold-300 transition-colors hover:text-gold-400 sm:text-base"
        >
          AURELIA ARCHIVE
        </TransitionLink>
      </motion.div>
    </header>
  );
}