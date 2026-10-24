# Aurelia Archive

Aurelia Archive is an immersive study website that transforms focus time into a calm, magical ritual. Inspired by ancient libraries, rainy observatories, candlelit rooms, and hidden forest corners, it gives users a beautiful place to study without distraction.

The project uses high-quality 2D visual scenes, gentle animation, a focus timer, and temporary study notes. It is designed around dark academia, cozy fantasy, warm candlelight, and elegant storytelling.

## Features

- Enchanting landing screen with the **AURELIA ARCHIVE** title
- Smooth, in-site navigation with no new browser tabs
- Four unique study environments:
  - The Grand Library
  - The Candlelit Archive
  - The Rainy Observatory
  - The Hidden Forest Study
- Animated 2D visual effects, including candlelight, rain, dust particles, lantern glow, and parallax movement
- Study Hub for selecting a room
- Focus timer with 25, 45, and 60-minute session options
- Start, pause, and reset timer controls
- Temporary “What will you focus on today?” notes area
- Responsive design for desktop, tablet, and mobile

## Technology Stack

- **Next.js** — website framework
- **JavaScript** — project language
- **Tailwind CSS** — styling and responsive design
- **Framer Motion** — page transitions and visual animations

## Project Structure

```text
aurelia-archive/
├── app/
│   ├── page.js
│   ├── layout.js
│   ├── globals.css
│   └── rooms/
│       └── [slug]/
│           └── page.js
│
├── components/
│   ├── scenes/
│   │   ├── GrandLibraryScene.js
│   │   ├── CandlelitArchiveScene.js
│   │   ├── RainyObservatoryScene.js
│   │   └── HiddenForestScene.js
│   ├── Header.js
│   ├── Footer.js
│   ├── Hero.js
│   ├── StudyHub.js
│   ├── RoomPreview.js
│   ├── RoomTemplate.js
│   ├── StudyPanel.js
│   ├── WhatAwaits.js
│   └── TransitionProvider.js
│
├── data/
│   └── rooms.js
│
├── lib/
│   ├── ambience.js
│   └── random.js
│
└── public/
    └── visual assets
```

## Pages

### Home Page

The homepage welcomes visitors into Aurelia Archive. It includes the main title, an atmospheric introduction, the Study Hub, room cards, feature descriptions, and the footer.

### The Grand Library

A warm, golden study room with tall bookshelves, drifting dust, ancient books, and candlelight.

### The Candlelit Archive

A private, peaceful archive filled with dark wood, parchment, glowing candles, and a scholarly atmosphere.

### The Rainy Observatory

A cool, blue-toned room with tall windows, rain, distant stars, and a quiet late-night mood.

### The Hidden Forest Study

A moonlit study environment with lanterns, fireflies, trees, and a magical forest atmosphere.

## Data and Privacy

Aurelia Archive does not use user accounts, sign-in, databases, saved history, analytics, or permanent storage in its first version.

Study notes and timer progress are temporary. They reset when a user refreshes the page or leaves the website. This keeps the experience lightweight, private, and easy to use.

## Run Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

## Visit Aurelia Archive

[Explore Aurelia Archive](https://aurelia-archive.vercel.app/)
---

Made with love, Kash ❤️
