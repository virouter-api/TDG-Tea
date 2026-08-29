# VINRO-18 — Motion Refinement Integration Guide

This branch ships the new motion system as two drop-in files:

- `assets/css/motion-tokens.css` — shared timing/easing design tokens
- `assets/js/motion.js` — rAF-throttled scroll engine + compositing cleanup

## Why

The current animations feel disjointed because every component uses its own
duration (260ms–1280ms) and easing curve, the scroll handler runs unthrottled
on the main thread, and the ~500KB base64 hero image blocks decoding during
the loader + word-reveal sequence.

## Integration steps (index.html)

### 1. Motion tokens (5 min)
Paste the `:root` token block from `assets/css/motion-tokens.css` into the
existing `<style>`, right after the color `:root{...}` block. Then replace
hard-coded values per the REPLACEMENT MAP comment inside the file.

### 2. Scroll engine (10 min)
In the `<script type="module">` block, **delete** the current
`window.addEventListener('scroll', () => { ... })` parallax block and paste
the IIFE from `assets/js/motion.js` in its place. It registers the same hero
parallax + ghost-word parallax effects, but:
- throttled via `requestAnimationFrame` (one layout read per frame)
- disabled on touch devices (`hover: none`) — fixes iOS jank
- disabled under `prefers-reduced-motion`
- pauses when sections leave the viewport (IntersectionObserver)
- uses `translate3d` for GPU compositing

### 3. Loader timing (1 min)
In the loader script, change `EXIT = 850` to `EXIT = 900` so the loader exit
matches `--dur-slower`.

### 4. Hero base64 image (manual, biggest win)
The hero `<img src="data:image/jpeg;base64,...">` (~500KB inline) forces a
main-thread decode during the loader animation. Extract it:
1. Decode the base64 string to `hero-tea-hills.jpg` (e.g. via
   `base64 -d` or an online decoder), compress to WebP (~40–80KB target),
   and save as `assets/img/hero-tea-hills.webp`.
2. Replace the `src` with `assets/img/hero-tea-hills.webp` and keep
   `fetchpriority="high" decoding="async"`.

### 5. Compress gallery images (manual)
The ~221MB of product/blog images should be converted to WebP at
max 1600px width. Until then, reveals use `img.decode()` to avoid
pop-in layout shift.

## Acceptance criteria

- [ ] All animations use only `transform` + `opacity` (no width/height/top/left)
- [ ] All durations/easings come from the token scale
- [ ] No raw scroll listeners — everything through the rAF engine
- [ ] Parallax + idle float disabled on touch devices
- [ ] Hero image served as external WebP, not inline base64
- [ ] `prefers-reduced-motion` disables all non-essential motion
