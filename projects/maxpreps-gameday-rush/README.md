# MaxPreps GameDay Rush

Simple Phaser 3 browser game prototype for the MaxPreps AI Showcase.

## Run Locally

From the repo root:

```bash
npm install
npm run dev
```

Open the Vite URL and visit:

```text
http://127.0.0.1:5173/projects/maxpreps-gameday-rush/
```

The main showcase also links to the game from the Projects page as project #4.

## Controls

- Move with arrow keys or WASD.
- Dodge defenders.
- Collect MaxPreps powerups to increase score, streak, and the School Spirit Meter.
- Reach 100 yards to score a touchdown.
- Score as much as possible before the 60-second clock expires.

## Asset Swap Notes

Placeholder shapes are intentionally labeled:

- `MASCOT` is the player mascot placeholder.
- `DEF` marks defender placeholders.
- `MP` marks MaxPreps powerups.

The game already uses the local MaxPreps wordmark at:

```text
public/mds/logos/maxpreps-logo-white.svg
```

Future official assets can be swapped in by replacing the Phaser placeholder containers in:

```text
src/scenes/GameScene.js
```

Use `preload()` to register official logos, fonts, mascot art, defender art, powerup icons, and sounds, then replace the labeled rectangle/circle containers with sprites or animated sprite sheets.
