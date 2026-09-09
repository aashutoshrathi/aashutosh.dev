# Easter Eggs - Local Drafts (not committed)

You asked for 10 weird, creative easter eggs that are *not* the usual bottom CLI.
All are implemented below as standalone components in `src/components/easter-eggs/`.
Nothing is imported yet, nothing is committed, pick one and we will wire it.

## How to try locally
```bash
# still on early-september-overhaul, these files are untracked
git status --short # you will see ?? src/components/easter-eggs/
pnpm run build # still passes because they are not imported
pnpm run serve -- -p 9000 # http://localhost:9000
```

## The 10

| # | File | Trigger | What it does | Why it is weird |
|---|------|---------|--------------|-----------------|
| 1 | `konami-matrix.tsx` | `↑ ↑ ↓ ↓ ← → ← → B A` | Full-screen Matrix rain canvas, 6s, then auto-closes | Classic but with your name in katakana falling |
| 2 | `console-art.tsx` | Open DevTools | Logs ASCII `aashutosh.dev` + `curl` hint + hidden `window.aashutosh` object | Only devs see it |
| 3 | `midnight-owl.tsx` | After 1:00 AM local | Footer becomes “The owl says go to sleep” + owl emoji hoots every 30s | Time-aware, not just click |
| 4 | `profile-spin.tsx` | Click avatar 5x in 3s | Avatar spins 720deg, meows (WebAudio), shows random cat meme | Abuse the hero image |
| 5 | `spotify-now.tsx` | Widget on `/work` or `/` | Shows Spotify currently playing (or last played) via `/api/spotify` mock | Live data, needs token but degrades to “Not playing - try `nibbles.dev`” |
| 6 | `chess-widget.tsx` | Widget | Fetches `api.chess.com/pub/player/<you>` + puzzle rush, shows rating | Pulls real Chess.com if username set |
| 7 | `duolingo-widget.tsx` | Widget | Fetches Duolingo streak/XP via `www.duolingo.com/api/1/users/show?username=` | Shame-based productivity |
| 8 | `vim-navigator.tsx` | Press `:` | Bottom bar like vim `:`  - type `work`, `timeline`, `uses`, `blog`, `clear`, `matrix` to navigate | Nerdy navigation, not a CLI |
| 9 | `tilt-card.tsx` | Hover project cards | 3D tilt + glare follows mouse, double-click card copies `git clone` | Physical feeling cards |
| 10 | `time-capsule.tsx` | Widget on `/timeline` | “On this day N years ago” - picks random old commit date and shows GitHub contributions for that day | Personal history |

## Picking one
Tell me `1`..`10` and I will:
1. Wire it into `src/components/layout.tsx` or specific page
2. Remove other 9 or keep them dormant
3. Push as a new commit if you want

All respect `prefers-reduced-motion` and `no em dashes`.

