# v2_hero_worklog.md — Shadowbox Hero Development Log

**Project:** Newport Slice System  
**Component:** NewportEcom v2 Shadowbox Hero  
**Start Date:** 2026-03-03  
**Status:** Day 1 complete; laser/incineration deferred to Day 2

---

## Day 1.x — HUD Layout Implementation (2026-03-03)

### Checkpoints Completed ✅

1. **Tokens + utilities + preview route compiled clean**
   - Added Tailwind v4 custom tokens: cobalt (#3B82F6), obsidian/midnight/cyber-silver palette
   - Created glass panel utilities (`.glass-panel`, `.glass-panel-strong`, `.glass-panel-soft`)
   - Added `.text-metallic` gradient text utility
   - Created `/v2-preview` route with hardcoded HeroShadowbox
   - TypeScript + ESLint clean (--max-warnings=0)

2. **Modular component split complete**
   - `HeroBackground.tsx` — image layer with vignette + type spotlight + grain overlay
   - `HeroCarousel.tsx` — two-card alpha/beta system with external positioning control via className props
   - `HeroShadowbox.tsx` — HUD shell with absolute-positioned cards and strict z-index layers

3. **Strict Shadowbox HUD layout implemented**
   - Top-left: Headline card (glass-panel, "SYSTEM" eyebrow, no buttons)
   - Left: Alpha card (absolute positioned via alphaClassName prop)
   - Right: Beta card (absolute positioned via betaClassName prop)
   - Center: Explicitly empty (reserved z-10 optics layer for future laser effects)
   - Bottom-right: CTA card (glass-panel-strong with top sheen + cobalt edge accent)

4. **Two-card Alpha/Beta carousel implemented**
   - Refactored from 5-card stacked system to clean two-card rendering
   - Alpha: Active card left side with pulsing cobalt indicator + enhanced dark backplate
   - Beta: On-deck card right side with "Docking Bay" aesthetic (scale 0.92, translateY 22px, status dots, "ON DECK" label)
   - Controls: Repositioned to left cluster (bottom-10 left-10), hover-reveal dots, smaller button

5. **CTA moved to bottom-right; removed false metrics**
   - Original metrics card had fake performance numbers (+247%, 3.2x, $127K sparkline)
   - Replaced with honest value proposition: "Pay only for what you use"
   - Added modular pricing subheadline and microcopy
   - Primary button: "Book a Demo" with enhanced cobalt glow
   - Secondary button: "See Modules" with border style

6. **Alpha position separation updated + divider added**
   - Increased vertical gap between headline and alpha card
   - Mobile: top-[300px] (+80px from original 220px)
   - sm: top-[320px] (+80px from original 240px)
   - lg: top-[380px] (+100px from original 280px)
   - Added subtle horizontal cobalt divider line (w-12, 15% opacity, blur 0.5px)

### Git Commits (Day 1)

- `9be1b8f` — feat: add HeroShadowbox slice with glass panel styling and v2 preview page
- `b3c2953` — feat: refactor and polish HeroShadowbox with modular components and 2-column layout
- `5117417` — polish: final HeroShadowbox improvements before laser integration
- `88cf8bd` — refactor: implement strict Shadowbox spec with absolute-positioned HUD cards
- `53bb5f5` — Polish HUD hierarchy: reduce headline dominance, enhance readability, reposition controls
- *(pending)* — Increase alpha vertical separation and add subtle cobalt divider

### Files Modified (Day 1)

- `src/components/home/hero/HeroBackground.tsx` (created)
- `src/components/home/hero/HeroCarousel.tsx` (created)
- `src/components/home/hero/HeroShadowbox.tsx` (created)
- `src/slices/HeroShadowbox/index.tsx` (created; re-export for backward compatibility)
- `src/app/(marketing)/v2-preview/page.tsx` (created)
- `src/app/globals.css` (updated with glass utilities and custom tokens)

---

## Next Planned Steps (NOT executed yet)

### Day 2 — Laser/Incineration Effects (Optional; behind dev toggle)

- Implement WebGL or CSS-based laser/beam targeting animation in z-10 optics layer
- Add particle system for "incineration" effect on card transitions
- Ensure effects do not interfere with HUD readability
- Add feature flag or dev toggle to enable/disable effects

### Day 3 — Prismic Slice Integration

- Create `hero_shadowbox` slice model in Slice Machine
- Define fields:
  - `background_image` (Image)
  - `headline` (Rich Text)
  - `subheadline` (Rich Text)
  - `cards` (Group repeatable with title, description, icon)
  - `cta_text` (Key Text)
  - `cta_href` (Link)
  - `secondary_cta_text` (Key Text)
  - `secondary_cta_href` (Link)
- Create adapter to map Prismic data to HeroShadowboxProps
- Update homepage to fetch from Prismic instead of hardcoded preview route
- Add mocks.json for Slice Simulator

### Optional — Mobile Responsive Polish

- Test stacked layout on mobile (sm breakpoint)
- Verify headline + alpha + beta + CTA cards don't collide vertically
- Consider hiding beta card on mobile if space is too tight
- Add mobile-specific carousel controls positioning

### Optional — Additional Visual Polish

- Divider width alignment (currently w-12; consider matching headline card width or alpha card width)
- Beta card spacing (currently right-6 lg:right-10; consider increasing right margin for more breathing room)
- CTA card density (currently p-6 lg:p-8; consider reducing padding for tighter module feel)
- Headline card max-width refinement (currently 480px; consider responsive scaling)

---

## Known Constraints & Rules

1. **Center must remain empty** — No content between alpha (left) and beta (right) cards
2. **No fake metrics** — All performance claims must be backed by real customer data
3. **Two-card carousel only** — Never render more than Alpha + Beta in DOM
4. **Absolute positioning required** — All HUD cards use absolute positioning; no grid/flex auto-layout
5. **Z-index layers frozen:**
   - z-0: Background
   - z-10: Optics (reserved for laser effects)
   - z-20: UI (alpha/beta cards)
   - z-30: CTA card
   - z-40: Controls
6. **Controls must stay near alpha card** — Left cluster positioning (bottom-10 left-10)

---

## Preview & Testing

- **Preview URL:** `http://localhost:3000/v2-preview`
- **Background Asset:** `/public/images/home/neon-eye-clean.png`
- **Test Cards:** 5 hardcoded cards (Visual Mode System, Universal Controls, Defensive Rendering, Rich Text Safety, Slice Machine v2)
- **TypeScript:** Clean (`npx tsc --noEmit`)
- **ESLint:** Clean (`npx eslint --max-warnings=0`)

---

## TODOs

- [ ] Commit and push alpha separation + divider changes
- [ ] Decision point: implement laser/incineration effects on Day 2 or defer further
- [ ] Mobile responsive testing and refinement
- [ ] Prismic slice integration (Day 3)
- [ ] Optional: make eyebrow label ("SYSTEM") configurable via props
- [ ] Optional: add dev toggle for laser effects (feature flag)
