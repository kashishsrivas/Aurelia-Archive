export const rooms = [
    {
      slug: "grand-library",
      title: "The Grand Library",
      // Shown on the Study Hub card
      shortDescription:
        "Towering shelves, golden window light, and dust drifting through the hush.",
      // Shown in the study panel on the room page (Step 4)
      description:
        "Tall bookshelves rise into the shadows, heavy with ancient volumes. Warm candlelight pools on the floor while golden light spills through the high windows, and dust drifts slowly through every beam.",
      accent: "#e3b95c",
      glow: "rgba(227, 185, 92, 0.45)",
      effects: ["dust", "candles"],
      soundLabel: "Hushed room tone, a slow warm hum, and the rare rustle of a page",
    },
    {
      slug: "candlelit-archive",
      title: "The Candlelit Archive",
      shortDescription:
        "Dark wood, old parchment, and a single flame keeping you company.",
      description:
        "A small, private corner of the archive. Dark wood desks, curled parchment, and flickering flames make the whole world shrink to the page in front of you.",
      accent: "#ff9a3c",
      glow: "rgba(255, 154, 60, 0.45)",
      effects: ["candles", "embers"],
      soundLabel: "A softly crackling flame and a deep, warm hum",
    },
    {
      slug: "rainy-observatory",
      title: "The Rainy Observatory",
      shortDescription:
        "Arched windows, silver rain, and a peaceful indigo night sky.",
      description:
        "Great arched windows look out on a quiet night sky while soft rain runs down the glass. Everything is cool indigo and silver, and nothing needs your attention but the work.",
      accent: "#b9c3e0",
      glow: "rgba(185, 195, 224, 0.45)",
      effects: ["rain", "stars"],
      soundLabel: "Gentle rain on glass, with a soft, low hum",
    },
    {
      slug: "hidden-forest-study",
      title: "The Hidden Forest Study",
      shortDescription:
        "A moonlit clearing of lanterns, fireflies, and whispering trees.",
      description:
        "A secret study tucked between old trees. Lanterns glow softly, fireflies drift through the moonlight, and the air is tinted with a gentle green-gold light.",
      accent: "#9ccc65",
      glow: "rgba(156, 204, 101, 0.42)",
      effects: ["fireflies", "lanterns"],
      soundLabel: "Night wind, rustling leaves, and faraway crickets",
    },
  ];
  
  export function getRoom(slug) {
    return rooms.find((room) => room.slug === slug);
  }