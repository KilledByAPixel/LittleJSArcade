---
name: atlas-retrofit
description: Use when retrofitting an existing LittleJS game to draw its circles, radial-gradient glows, and hand-rolled round shapes through the default texture atlas instead of drawCircle / drawCircleGradient / createRadialGradient. Triggers include "convert this game to atlas icons", "use icons.circle / icons.glow here", "retrofit X to the default atlas", or /atlas-retrofit games/foo.html.
---

# atlas-retrofit

Convert one LittleJS game's round shapes to the default texture atlas
(`initDefaultAtlas()` → `drawTile(pos, size, icons.NAME, color)`). One game per
invocation; you reason over the file directly and apply edits.

## Why

`drawCircle` emits a triangle fan every call; `drawTile(icons.circle, …)` draws
one textured quad — cheaper and smoother (anti-aliased rounded edge). `icons.glow`
is a baked `drawCircleGradient` (one quad, no per-frame CPU gradient). The atlas
also ships `ring`, `star`, `burst`, `spark`, `heart`, `plus`, `arrow`, `bolt`,
`droplet`, `roundSquare`, and regular polygons that are tedious to hand-roll. All
icons are white-on-transparent and tint per-instance via `drawTile`'s `color`.

## Conversion mapping (size is 1:1 — see size rule)

| Existing | Becomes |
|---|---|
| `drawCircle(pos, D, color)` | `drawTile(pos, vec2(D), icons.circle, color)` |
| `drawEllipse(pos, vec2(w,h), color)` | `drawTile(pos, vec2(w,h), icons.circle, color)` |
| `drawCircleGradient(pos, D, inner, outer)` / `drawEllipseGradient` / a **symmetric** center→transparent `createRadialGradient` halo | `drawTile(pos, vec2(D), icons.glow, color)` (see glow rule) |
| hand-built ring (`arc` + reverse `arc`) | `icons.ring` |
| hand-built triangle / diamond / pentagon / hexagon | `icons.triangle` / `diamond` / `pentagon` / `hexagon` |
| hand-built star / 10-point burst / 4-point spark | `icons.star` / `burst` / `spark` |
| hand-built heart / plus / arrow / bolt / droplet / rounded square | matching `icons.*` |

Icon tile order (0–15): circle, glow, ring, roundSquare, triangle, diamond,
pentagon, hexagon, spark, star, burst, plus, heart, droplet, bolt, arrow.

## Size rule — 1:1, no fudge factor

`drawCircle`'s size arg is the **diameter** (it forwards to `drawEllipse`, which
uses `size.x/2` as radius). Default-atlas icons fill their tile, so an icon drawn
at `vec2(D)` renders at diameter `D`. Map straight through: `drawCircle(pos, D)` →
`drawTile(pos, vec2(D), icons.circle, color)`.

Do **not** multiply sizes by any `"fill"`/`"fit"`/`1.15` factor to "compensate."
Older atlas games did that when icons were inset in their tile; icons now fill
the tile, so such a factor over-sizes every shape — it's what made dominoes
overlap their layout footprint. Drop it and map 1:1.

## Glow rule — plain tint by default; additive needs alpha-0

Default: replace an alpha-blended `drawCircleGradient` with a **plain tinted**
glow — faithful 1:1 blend:

```js
drawTile(pos, vec2(D), icons.glow, color);   // color's alpha controls intensity
```

Only for a brighter "energy" glow draw it **additive** (7th arg). The additive
color **must have alpha 0**, or it draws a translucent square over the tile:

```js
drawTile(pos, vec2(D), icons.glow, color, 0, false, hsl(.55,.9,.72, 0)); // alpha 0
```

## Procedure

1. **Read the whole target file.** Ask for the path if not given.
2. **Check the script tag.** If there's no `<script src="../templates/textureGenerator.js">`,
   add one after littlejs/engineLoader (and after the box2d tag, if any), before
   menus.js. **Copy the exact form of the sibling `<script>` tags in the same
   file** — including any `?<version>` query string they carry (this repo stamps
   one on every tag). Don't invent a new stamp and don't strip an existing one.
3. **Check atlas wiring — and guard against clobbering a custom atlas.**
   `initDefaultAtlas()` bakes its 16 icons into tiles **0–15**. If the game
   already paints its own sprites via `drawToTexture(...)` into those tiles (grep
   for `drawToTexture` / `initDrawToTexture`), calling `initDefaultAtlas()` will
   **overwrite that art.** In that case this skill does **not** apply — STOP and
   tell the user the game already has a full custom atlas (don't force it; don't
   rewrite the sheet to 8 columns just to make room — that's a separate task).
   Only proceed when the game draws with primitives and has no custom sprites in
   0–15. Then add a module-level `let icons;` by the other globals and `icons =
   initDefaultAtlas();` in `gameInit` **before the first draw** (after
   `await box2dInit()` if present). Use the file's existing icon-map name if it
   has one (`ICON`, `atlasIcons`, …); otherwise `icons`.
4. **Inventory candidates — runtime draws only.** Grep the file for `drawCircle`,
   `drawEllipse`, `drawCircleGradient`, `drawEllipseGradient`. Only the engine's
   world/screen-space draw calls are candidates. **`ctx.arc` / `ctx.ellipse` /
   `createRadialGradient` inside a `drawToTexture(...)` or `drawCanvas2D(...)`
   paint callback are baking a sprite into the atlas — leave them alone.** A
   `createRadialGradient` is a candidate only when it's a runtime glow drawn into
   the live frame, not when it paints an atlas tile.
5. **Apply with Edit**, one logical change at a time, preserving each call's
   color and `angle`. For a polygon baked with a fixed rotation, pass `angle`
   (clockwise-positive in LittleJS) to match the original orientation. If the
   original used `screenSpace=true` (e.g. a HUD/title circle), keep it — pass it
   through `drawTile`'s later positional args: `drawTile(pos, size, icon, color,
   0, false, undefined, true, true)` (the trailing `useWebGL, screenSpace`).
6. **Verify.** `node --check` does **not** accept `.html` (it errors with
   `ERR_UNKNOWN_FILE_EXTENSION`) — the game is one HTML file with an inline
   `<script>`. Instead: re-read each region you edited to confirm balanced
   parens/syntax, re-grep to confirm no orphaned calls and that `icons` is in
   scope at every new `drawTile`. (If you want a real parse check, copy the inline
   script body to `local/temp/check.js` and run `node --check` on that.) Then
   **ask the user to open the game and eyeball it** — the browser console surfaces
   any runtime error, and you cannot judge visual fidelity yourself.

## When NOT to convert (leave as-is)

- True rectangles (`drawRect`), lines (`drawLine`), text, arbitrary polygons with
  no matching icon.
- **Directional / offset shading gradients** that sculpt a lit sphere (highlight
  nudged off-center). These define form; flattening them to disc + glow is an
  aesthetic downgrade. Leave them, or only convert if the look is clearly kept.
- **Inverse vignettes** (transparent center → dark edges over a whole area). No
  icon is the inverse of `glow`; faking it looks worse. Leave it.
- Calm / board games: swap the shape, keep behavior — don't add glow/juice that
  wasn't there.

## Common mistakes

| Mistake | Fix |
|---|---|
| Multiplying sizes by a "fill"/"fit"/1.15 factor | Icons fill the tile now — map 1:1. |
| Additive glow with a non-zero-alpha additive color | Additive color alpha must be 0, else a translucent square appears. |
| Inventing or stripping the `?<version>` stamp on the new script tag | Copy sibling tags verbatim, stamp and all. |
| Converting `ctx.arc` inside a `drawToTexture` paint fn | That bakes a sprite; only convert runtime `drawCircle`/`drawEllipse`. |
| `initDefaultAtlas()` after the first `drawTile`, or called twice | Wire it once, before any draw, in `gameInit`. |
| Force-fitting a rectangle/line/vignette to an icon | Leave true primitives and inverse vignettes alone. |
| Calling `initDefaultAtlas()` in a game with its own `drawToTexture` sprites | It overwrites tiles 0–15. STOP; the skill doesn't apply. |
| Running `node --check` on the `.html` | It rejects `.html`. Re-read edits; copy inline script to a temp `.js` if you need a parse check. |
| Claiming done after a parse check | Parsing ≠ looks right. Ask the user to eyeball it. |
