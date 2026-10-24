"use client";

import { useEffect, useRef, useState } from "react";
import { createAmbience, DEFAULT_VOLUME } from "@/lib/ambience";

// Set to true to start the sound by itself when you arrive via "Enter Room".
// Browsers only allow this after you've clicked something, so on a refresh
// or direct visit it stays off and the button is used instead.
const AUTO_START = false;

function SpeakerIcon({ on }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M11 5 6 9H3v6h3l5 4z" />
      {on ? (
        <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />
      ) : (
        <path d="M16 9l5 6M21 9l-5 6" />
      )}
    </svg>
  );
}

export default function SoundToggle({ room }) {
  const ambienceRef = useRef(null);
  const [on, setOn] = useState(false);
  const [volume, setVolume] = useState(DEFAULT_VOLUME);
  const [unsupported, setUnsupported] = useState(false);

  // Optional: begin automatically if the browser allows it
  useEffect(() => {
    if (!AUTO_START) return;
    if (!navigator.userActivation?.hasBeenActive) return;
    const amb = createAmbience(room.slug);
    ambienceRef.current = amb;
    amb.start().then((ok) => setOn(ok));
  }, [room.slug]);

  // Fade out and close the audio when leaving the room
  useEffect(() => {
    return () => {
      ambienceRef.current?.stop();
      ambienceRef.current = null;
    };
  }, []);

  const toggle = async () => {
    if (on) {
      ambienceRef.current?.stop();
      setOn(false);
      return;
    }
    if (!ambienceRef.current) {
      ambienceRef.current = createAmbience(room.slug);
    }
    ambienceRef.current.setVolume(volume);
    const ok = await ambienceRef.current.start();
    if (ok) setOn(true);
    else setUnsupported(true);
  };

  const onVolume = (e) => {
    const v = Number(e.target.value);
    setVolume(v);
    ambienceRef.current?.setVolume(v);
  };

  return (
    <div className="mt-6 rounded-xl border border-gold-400/20 bg-midnight-950/40 p-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-display text-xs tracking-[0.25em] text-gold-300">
            AMBIENT SOUND
          </p>
          <p className="mt-1 text-base italic leading-snug text-parchment-200/70">
            {room.soundLabel}
          </p>
        </div>
        <button
          type="button"
          onClick={toggle}
          aria-pressed={on}
          aria-label={on ? "Turn ambient sound off" : "Turn ambient sound on"}
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-300 ${
            on
              ? "text-midnight-950"
              : "border-gold-400/50 text-gold-300 hover:border-gold-300 hover:bg-gold-400/15"
          }`}
          style={
            on ? { backgroundColor: room.accent, borderColor: room.accent } : undefined
          }
        >
          <SpeakerIcon on={on} />
        </button>
      </div>

      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={onVolume}
        aria-label="Ambient sound volume"
        className="mt-4 w-full"
        style={{ accentColor: room.accent }}
      />

      <p className="mt-2 text-sm italic text-parchment-200/50">
        {unsupported
          ? "Sound isn't available in this browser."
          : "Fades in gently, and fades out when you leave."}
      </p>
    </div>
  );
}