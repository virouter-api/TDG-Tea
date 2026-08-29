# Landing Page Structure — Integration Guide

## Overview

This PR introduces a **5-tier product information architecture** for TDG Tea's landing page, standardizing how product information is presented across all pages.

## The 5 Tiers

| Tier | Purpose | Content |
|------|---------|---------|
| **1. Hero** | Value proposition | Headline, sub-headline, primary CTA |
| **2. Trust Bar** | Social proof | Key claims (natural, lab-tested, direct sourcing, FDA) |
| **3. Benefits** | Product features | 3-card grid: sourcing, testing, packaging |
| **4. Story** | Product detail | Process narrative + checklist |
| **5. CTA** | Conversion | Email capture with incentive |

## Files Added

| File | Purpose |
|------|---------|
| `assets/css/landing-structure.css` | Complete stylesheet for all 5 tiers |
| `templates/landing-structure.html` | Drop-in HTML template with placeholder content |

## Integration Steps

### 1. Add stylesheet to `index.html`

In `<head>`, after existing stylesheets:

```html
<link rel="stylesheet" href="assets/css/landing-structure.css">
```

### 2. Replace current hero section

Find the existing hero section in `index.html` and replace with Tier 1 from `templates/landing-structure.html`.

### 3. Insert remaining tiers

After the hero, insert Tiers 2–5 in order. Adjust placeholder content (images, copy) to match actual TDG Tea assets.

### 4. Update navigation anchors

Ensure nav links point to new section IDs:
- `#products` → Tier 3 (Benefits)
- `#story` → Tier 4 (Story)

## Design Tokens

All spacing uses CSS custom properties for easy theming:

```css
--tier-gap: clamp(4rem, 8vw, 8rem);
--tier-padding: clamp(2rem, 5vw, 4rem);
--content-max: 72rem;
--text-max: 42rem;
```

## Responsive Behavior

- **Mobile (<768px)**: Story grid stacks vertically, CTA form stacks, hero CTAs center
- **Desktop**: 2-column story layout, inline form, horizontal CTAs

## Accessibility

- Semantic HTML5 sectioning elements
- Sufficient color contrast (tested against WCAG 2.1 AA)
- Focus states on all interactive elements
- `loading="lazy"` on below-fold images

## Testing Checklist

- [ ] Hero displays correctly on 320px–2560px viewports
- [ ] Trust bar numbers are legible at all sizes
- [ ] Benefit cards hover state works on desktop
- [ ] Story image loads lazily
- [ ] CTA form validates email format
- [ ] All anchor links scroll smoothly
- [ ] No horizontal overflow on any viewport
