# A Cinematic Birthday Website 💫

A premium, emotional, interactive birthday experience built with React, Vite, Tailwind CSS v4,
Framer Motion, GSAP, and Lenis smooth scrolling. The site tells a story — classmates → best
friends → love — through a cinematic scroll journey that ends in a personal voice message and
video.

## Quick start

```bash
npm install
npm run dev       # start the local dev server
npm run build     # production build → dist/
npm run preview   # preview the production build locally
```

Requires Node 18+.

## The one file you need to edit

Everything you'll want to personalize lives in **`src/config/content.js`**:

- Names, hero title/subtitle
- **`backgroundMusic`** — the single track that plays throughout the entire
  site (ducks lower during the letter/voice message, fades out at the finale).
  Just point `src` at your own song.
- The Chapter 1 timeline (labels + descriptions)
- Chapter 2 photo list (paths + captions)
- **`memoryVideos`** — a gallery of your own raw, unedited video clips (as
  many as you like)
- **`memoryJar`** — the ~60 notes inside the jar, plus `jarMilestoneNotes`
  (the golden notes unlocked at 10/25/50/75 reasons read)
- **`loveReasons`** — the 100 reasons deck (edit freely; the progress
  indicator and milestones adapt automatically to however many you have)
- **`reasonsFinalLetter`** — the wax-sealed letter unlocked after all 100
  reasons are read
- The Chapter 3 love letter text
- Chapter 4 song list (title, artist, cover, audio file)
- The Chapter 5 birthday message
- The typewriter script for the final surprise
- The voice message caption + audio path
- The final video path + timing
- The ending lines and spiritual closing dedication

You never need to touch component code to update the content.

## Where to put your media

```
src/assets/
├── photos/   → gallery images for Chapter 2 (jpg/png/webp)
├── music/    → background music track + song mp3s/album art for Chapter 4
├── voice/    → your recorded voice message (mp3/m4a)
└── videos/   → your raw memory clips + the final polished video (mp4)
```

Drop your files in these folders, then update the matching paths in
`src/config/content.js`. **Placeholder assets are already included** (soft gradient
photos, silent audio clips, short blank videos) so the site runs out of the box —
swap them out whenever you're ready.

## Structure of the experience

1. **Loading screen** — glowing heart, starry sky, "Preparing your surprise..."
2. **Opening scene** — full-screen hero, piano music begins, "Begin Our Story"
3. **Dynamic sky** — the background gradually shifts from sunset → golden hour →
   evening → night → starry sky as the visitor scrolls (`DynamicSky.jsx`)
4. **Chapter 1 — Our Story** — animated timeline (classmates → best friends → love)
5. **Chapter 2 — Our Memories** — photo gallery with a fullscreen lightbox
   (swipe / arrow keys / buttons)
6. **A Few Unedited Moments** — a gallery of your own raw memory video clips
   (muted preview on hover, opens with sound on click)
7. **Memory Jar + 100 Reasons** (`MemoryExperience.jsx`) — two connected
   features:
   - a tiltable, glowing **Memory Jar** (`MemoryJarSection.jsx`) that reveals
     a random handwritten note on click (no repeats until the jar reshuffles)
   - a swipeable, 3D-flipping deck of **100 Reasons** (`LoveReasonsSection.jsx`)
     with keyboard/button/touch navigation and a live progress count

   Reading reasons unlocks golden notes inside the jar at 10 / 25 / 50 / 75
   read (with a quiet toast notification), persisted across visits via
   `localStorage`. Reading all 100 reveals a glowing envelope inside the jar
   holding a final wax-sealed letter (`ReasonsFinalLetter.jsx`).
8. **Chapter 3 — Love Letter** — an envelope with a breakable wax seal; opening it
   dims the ambient effects and ducks the music for a quiet reading mode
9. **Chapter 4 — Our Songs** — custom music player cards with equalizer + progress bar
10. **Chapter 5 — Birthday Surprise** — confetti, fireworks, and balloons triggered on scroll
11. **Finale sequence** (`FinaleSequence.jsx`) — a single glowing button leads into:
    - a cinematic typewriter scene
    - an auto-playing voice message with an animated waveform
    - the final memory video, fading in underneath
    - a silent ending with closing lines and a signature
    - a still, spiritual closing scene with a detailed, hand-illustrated
      peacock feather (`PeacockFeather.jsx`) and a quiet way back to the top

## Tech notes

- **Tailwind CSS v4** is wired up via the `@tailwindcss/vite` plugin — no separate
  `tailwind.config.js` is required; design tokens (colors, fonts, easing) live as CSS
  custom properties at the top of `src/index.css`.
- **Lenis** (`src/hooks/useLenis.js`) drives smooth scrolling and is synced to GSAP's ticker.
- **`prefers-reduced-motion`** is respected throughout (`src/hooks/usePrefersReducedMotion.js`) —
  particle counts drop, transitions shorten, and ambient motion is disabled.
- All chapters are modular components in `src/components/`, each documented with a
  one-line comment describing its role.
- A tiny background-music manager (`src/hooks/useAudioManager.js`) fades, ducks, and
  stops the single looping bgm track as the story moves between chapters.

## Deploying

`npm run build` outputs a static site in `dist/` that can be hosted anywhere static
files are served (Vercel, Netlify, GitHub Pages, etc).
