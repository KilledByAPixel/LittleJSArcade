# 🕹️ LittleJS Arcade

*50+ classic arcade games rebuilt in pure HTML5 — each one a single, self-contained file, AI-assisted and playable instantly in your browser.*

## 🎮 [▶ Play in the LittleJS Arcade](https://killedbyapixel.github.io/LittleJSArcade)

<!-- Tip: a looping GIF of the games makes a great banner here, e.g. ![LittleJS Arcade](docs/arcade.gif) -->

The **LittleJS Arcade** is a growing collection of arcade games — shooters, puzzlers, board games, racers, physics toys, and more — all built with the [LittleJS](https://github.com/KilledByAPixel/LittleJS) engine. There's nothing to install: every game runs right in your browser, and because each one is open source, you can fork any of them as a starting point for your own.

### Inside the arcade
- ▶️ **Instant play** — pick a game and go, no installs or downloads
- 🔎 **Browse & search** by category, with Top Picks and Recently Played
- 🎲 **Random** button for when you can't decide
- 🎮 **Gamepad support**, fullscreen, and shareable links
- 💾 **Saved high scores** for each game
- 📱 Works on **desktop and mobile**
- 🧩 Every game is **open source** — fork it and make it your own

## 🕹️ Featured Games
A few favorites to start with — play all 50+ in the [arcade](https://killedbyapixel.github.io/LittleJSArcade).

- 🏙️ [Missile Defense](https://killedbyapixel.github.io/LittleJSArcade/games/missileDefense.html)
- 🤖 [Robo Rescue](https://killedbyapixel.github.io/LittleJSArcade/games/roboRescue.html)
- 🎱 [Pool](https://killedbyapixel.github.io/LittleJSArcade/games/pool.html)
- 🧛 [Emoji Survivors](https://killedbyapixel.github.io/LittleJSArcade/games/emojiSurvivors.html)
- 👾 [Space Intruders](https://killedbyapixel.github.io/LittleJSArcade/games/spaceIntruders.html)
- 🐸 [Froggit](https://killedbyapixel.github.io/LittleJSArcade/games/froggit.html)
- 🃏 [FreeCell](https://killedbyapixel.github.io/LittleJSArcade/games/freecell.html)
- 🔴 [Checkers](https://killedbyapixel.github.io/LittleJSArcade/games/checkers.html)

## 🛠️ Make Your Own
Each game is one self-contained HTML file — no build step, no external assets, no dependencies. To start:

1. Copy a file from [templates/](templates/).
2. Edit the JavaScript inside the `<script>` tag.
3. Open the `.html` in a web browser.

### 📝 Templates
- [game.html](templates/game.html) — minimal scaffold
- [boardGame.html](templates/boardGame.html) — grid-based games (chess, sokoban, match-3)
- [menuGame.html](templates/menuGame.html) — title, pause, options, medals, HUD toolbar
- [box2dGame.html](templates/box2dGame.html) — Box2D physics (pool, plinko, pinball)
- [textureGame.html](templates/textureGame.html) — procedural sprite atlases from canvas draw ops
- [tweakableGame.html](templates/tweakableGame.html) — live-tweak globals via an HTML slider overlay
- [uiGame.html](templates/uiGame.html) — canvas-drawn UI (menus, sliders, dialogs)

### 🔌 Helper scripts
Mix these in to add features fast:
- `menus.js` — DOM menus, best-score tracking, game-over dialog, `setPlaying` / `quitToTitle`
- `gameFx.js` — procedural SFX + screen shake
- `textureGenerator.js` — sprite painter
- `tweakables.js` — live value tweaking

## 🤖 Built with AI
Many of these games were generated or iterated with AI assistance — and you can do the same.

**Want to make a game without writing code?** Try the [LittleJS GPT](https://chatgpt.com/g/g-67c7c080b5bc81919736bc8815836be6-littlejs-game-maker) — describe the game you want and it builds it with LittleJS.

For advanced users, LittleJS also works great with tools like **GitHub Copilot, Codex, and Cursor**. The [LittleJS AI Tools](https://github.com/KilledByAPixel/LittleJS-AI) repo has templates, skills, and prompts to improve your LittleJS + AI workflow.

## 📚 Resources
- [LittleJS Engine](https://github.com/KilledByAPixel/LittleJS) — the main LittleJS repository
- [LittleJS AI Tools](https://github.com/KilledByAPixel/LittleJS-AI) — templates and skills to improve LittleJS + AI workflows
- [LittleJS GPT](https://chatgpt.com/g/g-67c7c080b5bc81919736bc8815836be6-littlejs-game-maker) — make games in ChatGPT without writing any code
- [Games Folder](games/) — the source for every game in the arcade
- [Templates Folder](templates/) — starting templates and reusable components

## 💬 Feedback & Contributing
Found a bug, got a high score to brag about, or a classic you'd love to see added? Jump into [Discussions](https://github.com/KilledByAPixel/LittleJSArcade/discussions) — gameplay feedback and game ideas are always welcome.

Made a game you think belongs here? Send a pull request!

## 📄 License

LittleJS and everything in this repository (except Twemoji font) is **MIT licensed** — see [LICENSE](LICENSE) for details.

Twemoji (twemoji.ttf) (c) Twitter, Inc & contributors, [licensed under CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/)
