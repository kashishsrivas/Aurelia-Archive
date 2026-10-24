import { createRng } from "@/lib/random";

const SPINES = [
  "#3b1d14", "#5a2a1a", "#1f2f4a", "#2b3a2a", "#4a1f2b",
  "#6b4a1f", "#24304f", "#3d2b1f", "#512a2a", "#1d3b3a",
];

export default function BookShelf({ seed = 1, rows = 7, side = "left", compact = false, className = "" }) {
  const rng = createRng(seed);

  const shelves = Array.from({ length: rows }, () =>
    Array.from({ length: 22 }, () => ({
      height: 62 + Math.round(rng() * 34),
      width: 10 + Math.round(rng() * 10),
      color: SPINES[Math.floor(rng() * SPINES.length)],
      tilt: rng() > 0.93 ? Math.round((rng() * 8 - 4) * 10) / 10 : 0,
      band: rng() > 0.55,
    }))
  );

  // Fade the shelf out toward the centre of the screen
  const fade =
    side === "left"
      ? "linear-gradient(to right, black 55%, transparent 100%)"
      : "linear-gradient(to left, black 55%, transparent 100%)";

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-y-0 overflow-hidden ${
        side === "left" ? "left-0" : "right-0"
      } ${className}`}
      style={{ maskImage: fade, WebkitMaskImage: fade }}
    >
      <div
        className={`flex h-full flex-col px-3 ${
          compact ? "pb-4 pt-3" : "pb-[10svh] pt-[6svh]"
        }`}
        style={{
          background:
            "linear-gradient(to bottom, rgba(31,19,11,0.85), rgba(20,12,7,0.95))",
          borderLeft: side === "right" ? "10px solid #35200f" : undefined,
          borderRight: side === "left" ? "10px solid #35200f" : undefined,
        }}
      >
        {shelves.map((books, r) => (
          <div
            key={r}
            className="flex flex-1 items-end gap-px overflow-hidden px-1"
            style={{
              borderBottom: "8px solid #4d2f17",
              boxShadow: "inset 0 -10px 14px rgba(0,0,0,0.55)",
            }}
          >
            {books.map((b, i) => (
              <div
                key={i}
                className="relative shrink-0 rounded-t-[2px]"
                style={{
                  height: `${b.height}%`,
                  width: `${b.width}px`,
                  transform: b.tilt ? `rotate(${b.tilt}deg)` : undefined,
                  transformOrigin: "bottom center",
                  background: `linear-gradient(to right, rgba(255,255,255,0.12), ${b.color} 30%, rgba(0,0,0,0.45))`,
                }}
              >
                {b.band && (
                  <span className="absolute inset-x-0 top-[18%] h-[2px] bg-gold-400/60" />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}