"use client";

import { motion } from "framer-motion";
import StudyPanel from "@/components/StudyPanel";
import RoomPreview from "@/components/RoomPreview";
import GrandLibraryScene from "@/components/scenes/GrandLibraryScene";
import CandlelitArchiveScene from "@/components/scenes/CandlelitArchiveScene";
import RainyObservatoryScene from "@/components/scenes/RainyObservatoryScene";
import HiddenForestScene from "@/components/scenes/HiddenForestScene";
import { ParallaxScene, ParallaxLayer } from "@/components/Parallax";

// Rooms with a finished scene. The others fall back to their card preview for now.
const SCENES = {
  "grand-library": GrandLibraryScene,
  "candlelit-archive": CandlelitArchiveScene,
  "rainy-observatory": RainyObservatoryScene,
  "hidden-forest-study": HiddenForestScene,
};

export default function RoomTemplate({ room }) {
  const Scene = SCENES[room.slug];

  return (
    <section className="relative isolate flex min-h-svh flex-col bg-midnight-950 lg:min-h-[calc(100svh-4rem)] lg:flex-row">
      {/* Scene */}
      {/* Scene */}
      <div className="relative h-[60svh] w-full overflow-hidden lg:absolute lg:inset-0 lg:h-auto">
        <ParallaxScene>
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.6, ease: "easeOut" }}
          >
            <ParallaxLayer depth={18} className="absolute -inset-5">
              {Scene ? <Scene /> : <RoomPreview slug={room.slug} />}
            </ParallaxLayer>
          </motion.div>
        </ParallaxScene>

        {/* Soft shade so the title stays readable */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom right, rgba(6,9,19,0.7) 0%, transparent 45%)",
          }}
        />

        <div className="absolute left-5 top-20 z-10 max-w-[80%] sm:left-8 sm:top-24 lg:left-12 lg:top-28">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-xs tracking-[0.4em] text-gold-400/80"
          >
            STUDY ROOM
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.4, delay: 0.5, ease: "easeOut" }}
            className="text-glow mt-3 font-display text-3xl font-semibold leading-tight tracking-[0.12em] text-gold-300 sm:text-5xl lg:text-6xl"
          >
            {room.title}
          </motion.h1>
        </div>
      </div>

      {/* Study panel: right side on desktop, below the scene on mobile */}
      <aside className="relative z-10 flex flex-1 p-4 sm:p-6 lg:ml-auto lg:w-[440px] lg:flex-none lg:items-center lg:p-8">
        <StudyPanel room={room} />
      </aside>
    </section>
  );
}