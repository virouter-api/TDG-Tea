# Mobile Fixes Integration Guide (VINRO-19)

## Files changed
- `assets/css/mobile-fixes.css` — drop-in stylesheet with all mobile fixes
- `product.html` — add `<link rel="stylesheet" href="assets/css/mobile-fixes.css">` before `</head>`
- `blog.html` — add `<link rel="stylesheet" href="assets/css/mobile-fixes.css">` before `</head>`
- `index.html` — add `<link rel="stylesheet" href="assets/css/mobile-fixes.css">` before `</head>` (manual step, file too large for API push)

## What each fix does

| Fix | Root cause | Solution |
|-----|-----------|----------|
| **overflow-x** | `overflow-x:hidden` only on `body`, not `html` / `.shell` | Add `overflow-x:clip` on `html`, `body`, `.shell`, `.page`, `main` + `max-width:100%` on all elements |
| **100dvh hero** | `min-height:28rem` fixed rem breaks on mobile URL bar show/hide | Use `100dvh` with `100vh` fallback for dynamic viewport height |
| **Parallax iOS** | `position:sticky` + `backdrop-filter` causes repaint storms on iOS | Disable `backdrop-filter` on `@supports(-webkit-touch-callout:none)`, remove sticky on touch devices |
| **Carousel swipe** | `.product-switcher` is a vertical list, no touch scroll | Add `scroll-snap-type`, `touch-action`, `overscroll-behavior`, hide scrollbar |
| **Burger duplicate** | Multiple nav links crowd mobile header | Hide non-essential nav links on `max-width:640px`, shrink logo |

## Manual step for index.html
`index.html` is 571KB (mostly base64 images) and cannot be pushed via API. Edit on GitHub web:
1. Open `index.html` → Edit
2. Add before `</head>`:
   ```html
   <link rel="stylesheet" href="assets/css/mobile-fixes.css">
   ```
3. Commit to `feature/mobile-fixes`

## Testing checklist
- [ ] iPhone Safari: no horizontal scroll, hero fills viewport correctly when URL bar hides/shows
- [ ] Android Chrome: same checks
- [ ] Product page: switcher swipes horizontally, buttons are ≥44px touch targets
- [ ] Blog page: header does not jitter on scroll
- [ ] All pages: no content cut off at edges on 320px width
