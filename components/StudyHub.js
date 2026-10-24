"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { rooms } from "@/data/rooms";
import RoomPreview from "@/components/RoomPreview";

function RoomCard({ room, index }) {
  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 32,
        borderColor: "rgba(227,185,92,0.2)",
        boxShadow: "0 0 0px 0px rgba(0,0,0,0), 0 8px 30px rgba(0,0,0,0.4)",
      }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      whileHover={{
        y: -10,
        borderColor: room.accent,
        boxShadow: `0 0 44px 4px ${room.glow}, 0 20px 50px rgba(0,0,0,0.6)`,
        transition: { duration: 0.35, delay: 0 },
      }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: "easeOut" }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border bg-midnight-900/80 backdrop-blur-sm"
    >
      {/* Scene preview */}
      <div className="relative h-56 overflow-hidden">
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110">
          <RoomPreview slug={room.slug} />
        </div>
        {/* Light sweep on hover */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 transition-all duration-1000 ease-out group-hover:left-full group-hover:opacity-100"/>
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-16"
          style={{
            background: "linear-gradient(to top, #0b1026, transparent)",
          }}
        />
      </div>

      {/* Text */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-semibold leading-snug tracking-[0.1em] text-gold-300">
          {room.title}
        </h3>
        <p className="mt-3 flex-1 text-lg italic leading-relaxed text-parchment-200/85">
          {room.shortDescription}
        </p>
        <Link
          href={`/rooms/${room.slug}`}
          aria-label={`Enter ${room.title}`}
          className="mt-6 block rounded-full border border-gold-400/50 px-6 py-3 text-center font-display text-xs tracking-[0.3em] text-gold-300 transition-colors hover:border-gold-300 hover:bg-gold-400/15 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-300"
        >
          ENTER ROOM
        </Link>
      </div>
    </motion.article>
  );
}

export default function StudyHub() {
  return (
    <section
      id="study-hub"
      className="relative isolate overflow-hidden px-6 py-24 sm:py-32"
      style={{
        background:
          "linear-gradient(to bottom, #060913 0%, #0b1026 30%, #0b1026 80%, #1f130b 100%)",
      }}
    >
      <div className="mx-auto max-w-7xl">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center"
        >
          <p className="text-xs tracking-[0.4em] text-gold-400/80">
            CHOOSE YOUR SANCTUARY
          </p>
          <h2 className="text-glow mt-4 pl-[0.2em] font-display text-3xl font-semibold tracking-[0.2em] text-gold-300 sm:text-5xl">
            THE STUDY HUB
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-xl italic text-parchment-200/85">
            Choose the room where your focus will begin. Each one is its own
            small world.
          </p>
        </motion.header>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {rooms.map((room, i) => (
            <RoomCard key={room.slug} room={room} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}