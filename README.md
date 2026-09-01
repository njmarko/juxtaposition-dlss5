# Juxtaposition DLSS5

Before / after video studio. Drag a slider across two images, time the motion, and export a clip — all in the browser.

Made by [Marko Njegomir](https://x.com/njmarko) with Grok.

<!-- Add an animated GIF of an exported clip here.
     Save it as docs/demo.gif (or change the path below). -->
![Juxtaposition DLSS5 demo](docs/demo.gif)

## What it does

- Wipe from **image 1 (before)** to **image 2 (after)** and back, or record the path yourself.
- Vertical slider by default; optional horizontal slider.
- Drag an image to position it in the frame. Drag an edge or corner to resize. Center guides appear when it lines up.
- Optional **DLSS 5 ON** / **DLSS 5 OFF** badges on each image — sharp text in a rectangle, draggable and resizable, captured in the video.
- Upload, drag and drop, or paste images. Two files at once fill both slots.
- Export MP4 or WebM at 1080p / 2K / 4K / source / custom, 30 or 60 fps.
- Defaults: **4K, 60 fps, max quality**.
- Interface in **English** (default) and **Serbian (Cyrillic)**, with flags on the language switch. Hover any control for a localized hint.

## Motion

**Automatic** — hold, sweep, hold, sweep back, hold. Easing applies to the sweeps only (cinematic smootherstep by default). Edit phases in seconds or as a percentage of the video length.

**Manual** — you drive the slider with the mouse for the chosen video length. Capture stops when time is up. The pointer is never drawn in the file; only the split, images, and badges are encoded. Re-record if you want another take. Export uses the last take.

## Framing

Click and drag an image to move it — including out of the frame. Drag a side to stretch that edge; drag a corner to scale width and height together. When the image is near the center of the frame, a vertical and/or horizontal guide appears so you can line it up. Each image has its own **Reset**, which restores the current Image fit (cover / contain / stretch) centered in the visible frame. Double-click an image on the preview to do the same. Framing is captured in the export. Center guides are preview-only.

## DLSS 5 labels

Each image can show a badge:

- **DLSS 5 ON** — green background, white letters
- **DLSS 5 OFF** — gray background, white letters

Toggle a badge off, change its style, drag it on the preview, or pull the corner to resize. They are drawn as text and a rectangle so they stay sharp at any size, including 4K.

## Adding a language

English is the source of truth for keys.

1. Copy [`src/i18n/en.ts`](src/i18n/en.ts) to `src/i18n/<id>.ts`.
2. Translate every string. The file must satisfy the `Messages` type.
3. Register it in [`src/i18n/index.ts`](src/i18n/index.ts) under `LOCALES` (id, native name, `htmlLang`, messages).
4. Add a small flag SVG and map it in [`src/components/header.tsx`](src/components/header.tsx).

TypeScript will fail the build if a locale is missing a key. Hover hints live next to the labels they describe (`hint.*`).
