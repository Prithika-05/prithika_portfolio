# Prithika.exe — Cyber-grid portfolio

A responsive React + Vite portfolio with a canvas click ripple/particle field, terminal command input, interactive project dossiers, simulated git logs, and optional synthesized UI click sounds.

## Run locally
1. Install Node.js 18+.
2. In this directory run `npm install`
3. Run `npm run dev`
4. Create a production build with `npm run build` (output: `dist/`).

## Personalize before deployment
Edit `PROFILE` and `PROJECTS` at the top of `src/main.jsx`. The projects, stacks, metrics, and git log entries are sample content; replace them with verified details. Set `PROFILE.email` to a real contact email and each project's `url` to its actual live deployment URL. The current “Launch Live App” action links to the GitHub profile as a safe placeholder.

## Deploy
- **Vercel:** Import the repository; framework preset Vite, build command `npm run build`, output directory `dist`.
- **Netlify:** Build command `npm run build`, publish directory `dist`.
- No server-side environment variables are required.

The click-sound toggle is off by default and synthesizes a short mechanical-style click with Web Audio (no audio asset download).
