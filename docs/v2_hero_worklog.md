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

---

## Day 2 — 3D Shadowbox Implementation (2026-03-05)

### Summary

Implemented React Three Fiber 3D shadowbox backdrop with four layered transparent PNG plates (Eye, Core, Wrap, AO shim). Added independent per-mesh parallax, container-relative pointer tracking, and global scaling system. Integrated cavity vignette and made Shadowbox3D wrapper responsive. No runtime errors.

### Checkpoints Completed ✅

1. **R3F dependencies installed and Shadowbox3D component created**
   - Added @react-three/fiber@9.5.0, @react-three/drei@10.7.7, three@0.183.2
   - Created src/components/home/hero/Shadowbox3D.tsx with Canvas + Suspense
   - Used drei useTexture for asset loading with defensive rendering

2. **Client-side rendering fixes**
   - Wrapped Scene in Suspense fallback
   - Added dynamic import with `{ ssr: false }` in HeroShadowbox.tsx
   - Added "use client" directive to Shadowbox3D.tsx
   - Fixed hook rules violations (removed conditional useTexture calls)

3. **Independent parallax per mesh implemented**
   - Moved pointer state to Scene component (shared across all Plates)
   - Each Plate receives pointerPos prop and applies own moveFactorX/Y
   - Container-relative tracking via getBoundingClientRect()
   - Pointer clamped to [-0.6, 0.6] range
   - Framerate-independent smoothing with THREE.MathUtils.damp

4. **Transparent layer sorting fixed**
   - Added explicit renderOrder: Eye=10, Core=20, AO=30, Wrap=40
   - Prevents z-fighting and transparent sorting glitches

5. **AO shim improved**
   - Duplicate wrap texture at zDepth=-0.02
   - Opacity 0.22, scale multiplier 1.02, alphaTest 0.02
   - Provides subtle ambient occlusion behind wrap frame

6. **Camera and performance optimized**
   - fov: 48, position: [0, 0, 1.15]
   - dpr: [1, 1.5] for better iteration performance
   - Lighting: ambient 0.45, directional 0.9, fill 0.25

7. **Unit plane + baseScale system implemented**
   - Removed viewport-relative scaling (caused sizing issues)
   - Constant 1×1 planeGeometry with per-plate baseScale prop
   - Added offsetX/offsetY props for independent positioning

8. **Composition tuning (multiple iterations)**
   - Eye: baseScale 0.62, offsetY 0.21, zDepth -0.30
   - Core: baseScale 1.00, offsetY -0.10, zDepth -0.11, opacity 0.88, alphaTest 0.01
   - Wrap: baseScale 1.34, offsetY -0.08, zDepth 0.05
   - AO: baseScale 1.38, offsetY -0.08, zDepth -0.02
   - Fixed group rotation: rotation-x=-0.03, rotation-y=0.02

9. **Global scale system added**
   - GLOBAL_SCALE = 1.35 constant multiplies all baseScale values
   - Makes shadowbox cluster fill ~80% of hero background area
   - Maintains relative proportions (eye < core < wrap < AO)

10. **Cavity vignette added and refined**
    - Localized box at z-5 (behind Shadowbox3D at z-10)
    - Responsive sizing: 700px/900px/1200px at sm/md/lg breakpoints
    - Radial gradient: circle at 50% 60%, tighter falloff at 50%/75%
    - Positioned with translate(-55%, -42%)
    - Neutral dark gradient (no blue tint), opacity 0.25

11. **Shadowbox3D wrapper sizing and positioning**
    - Made wrapper responsive with min() constraints
    - Small: 700px×600px, Medium: 900px×700px, Large: 1200px×850px
    - Adjusted transform to translate(-55%, -42%) to avoid CTA overlap
    - Centers wrap frame between left and right HUD cards

12. **Core visual dominance reduction**
    - Reduced opacity: 0.95 → 0.88
    - Lowered alphaTest: 0.02 → 0.01 (softer edges)
    - Reduced emissive pulse amplitude: 0.15 → 0.08, baseline 0.2 → 0.15
    - Prevents "rectangular sticker" appearance

13. **Eye plate repositioned**
    - Moved offsetY from 0.14 to 0.21 (raised upward)
    - Reads clearly as back-layer "watcher" above cavity

### Git Commits (Day 2)

- `90824f4` — feat: implement 3D Shadowbox with React Three Fiber
- `36b85b4` — refine: Shadowbox3D composition tuning and layout optimization

### Files Modified (Day 2)

- `src/components/home/hero/Shadowbox3D.tsx` (created)
- `src/components/home/hero/HeroShadowbox.tsx` (updated: dynamic import, vignette, wrapper sizing)
- `package.json` (added R3F dependencies)
- `public/images/hero/shadowbox_eye_back_2048.png` (added, 719KB)
- `public/images/hero/shadowbox_core_mid_2048.png` (added, 1.3MB)
- `public/images/hero/shadowbox_wrap_front_2048.png` (added, 1.4MB)

### Technical Notes

#### Plate System Architecture

Four plates rendered with independent parallax:
- **Eye (back):** Smallest scale, farthest back, emissive pulse, "watcher" positioning
- **Core (mid):** Base scale 1.00, reduced visual dominance (opacity/alphaTest), emissive pulse
- **AO shim:** Ambient occlusion layer behind wrap, subtle opacity
- **Wrap (front):** Largest scale, closest to camera, frames the composition

Each plate has:
- `zDepth`: Z-axis position (Eye -0.30, Core -0.11, AO -0.02, Wrap 0.05)
- `baseScale`: Relative size (Eye 0.62, Core 1.00, Wrap 1.34, AO 1.38)
- `offsetY`: Vertical positioning offset
- `moveFactorX/Y`: Parallax sensitivity multipliers
- `renderOrder`: Explicit sort order for transparent layers

#### Global Scale System

`GLOBAL_SCALE = 1.35` applied to all plates uniformly:
```tsx
const finalScale = (isAO ? baseScale * 1.02 : baseScale) * GLOBAL_SCALE;
```

Maintains relative proportions while making entire cluster fill ~80% of background.

#### Pointer Tracking

Container-relative via `getBoundingClientRect()`:
```tsx
const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
const clampedX = Math.max(-0.6, Math.min(0.6, x));
```

Prevents parallax from tracking full viewport when shadowbox is in constrained wrapper.

#### Emissive Pulse Logic

Eye and Core materials pulse with sine wave:
```tsx
const amplitude = isCore ? 0.08 : 0.15;
const baseline = isCore ? 0.15 : 0.2;
const pulse = Math.sin(state.clock.elapsedTime * 0.8) * amplitude + baseline;
```

Core has reduced amplitude to prevent visual dominance over wrap frame.

### Current Status

- `/v2-preview` renders with no runtime errors
- TypeScript + ESLint clean (--max-warnings=0)
- All assets loaded (719KB + 1.3MB + 1.4MB = ~3.4MB total)
- Shadowbox fills ~80% of hero background area
- HUD cards (z-20) render correctly above shadowbox (z-10)
- Cavity vignette (z-5) provides depth cue behind stack

### Remaining Work

- Optional: Re-enable legacy background atmosphere blend (currently disabled via DEBUG flag)
- Optional: Implement "heartbeat sparks" overlay (TODO comment exists in Shadowbox3D.tsx)
- Future: Prismic integration (hero_shadowbox slice model)
- Future: Mobile responsive polish (test stacked layout on sm breakpoint)


---

## Day 5 — Feature Pages, Floating Nav, Prismic Routing + a11y Polish (2026-03-07)

### Summary

Full-stack feature page system shipped: HERO_CARDS driving carousel, Prismic dynamic route with 9-slice map, FloatingGlassNav with active-route state, /pricing + stub pages (/about /contact /blog), and hydration + a11y bug fixes across HeroCarousel.

### Checkpoints Completed ✅

1. **HERO_CARDS data model + carousel upgrade**
   - Added `body` field to `HeroCardData` in `heroCards.ts`
   - 5 cards wired: seo-conversion, pipeline, autopilot, dashboard, fusebox
   - Alpha/Beta cards now show title + blurb + body + "Explore Feature" CTA
   - Alpha CTA navigates to `/features/{uid}`; Beta advances carousel

2. **Nested button hydration fix**
   - Root cause: alpha wrapper `<button>` contained inner CTA `<button>` — invalid HTML
   - Fix: both wrappers converted to `<div role="link">` / `<div role="button">`
   - Inner CTAs converted from `<button>` to `<Link href={href}>`
   - `e.stopPropagation()` preserved on inner Link to prevent wrapper action firing

3. **Keyboard + screen reader a11y hardening**
   - `onKeyDown`: `Enter` fires action directly; `Space`/`Spacebar` calls `e.preventDefault()` first (blocks scroll) then fires
   - `aria-label`: Alpha — `"Open feature: {title}"`; Beta — `"Next card preview: {title}"`
   - Beta wrapper: `aria-describedby={on-deck-${betaIndex}}` pointing to visible "On Deck" label
   - `id` keyed to `betaIndex` so it stays in sync across rotations

4. **Beta hover/focus affordance**
   - Added `transition-[opacity,box-shadow,background-color] duration-200`
   - `hover:bg-white/[0.06]` + cobalt rim glow at 25% opacity
   - `focus-visible` mirrors hover exactly (keyboard parity)
   - Beta remains noticeably dimmer than Alpha (no `brightness-110` hack)

5. **FloatingGlassNav built and positioned**
   - Desktop: glass pill row with per-item active state; inactive items at `opacity-70`
   - Mobile: Menu toggle + dropdown with matching active styles
   - Active styles: `bg-white/[0.09]` + cobalt ring/glow `shadow-[0_0_0_1px_rgba(59,130,246,0.45)...]`
   - `aria-current="page"` on active link; `usePathname` for route detection
   - `isActive`: exact match for `/`; `startsWith` for all other routes
   - Wrapper changed to `w-fit` in HeroShadowbox — was `w-[420px]` causing center bleed
   - Mounted on `/v2-preview` via `navSlot` prop on HeroShadowbox

6. **Prismic feature page system**
   - 9 slice models defined in Slice Machine (FeatureHero, ProblemSolution, QaBlock, ProcessFlow, BeforeAfter, ChartPanel, BulletsSection, ProofStrip, PrimaryCta)
   - `feature_page` custom type created (`customtypes/feature_page/index.json`)
   - Dynamic route `app/features/[uid]/page.tsx` with `baseClient().getByUID("feature_page", uid)`
   - SliceZone components map: all 9 slice IDs wired to their components
   - `generateMetadata` safe — `try/catch` returns `{}` on miss
   - Static `/features/{uid}` pages removed to avoid route precedence conflict

7. **DraftFallback for unpublished docs**
   - Prismic API confirmed: `feature_page` type not yet registered in repo + 0 published docs
   - Known UIDs (`seo-conversion`, `pipeline`, `autopilot`, `dashboard`, `fusebox`) render a glass fallback with amber "Coming Soon" chip and 5-step publish instructions
   - Unknown UIDs still call `notFound()` for hard 404
   - `docs/prismic-feature-page-payloads.json` added: 5 complete document payloads (9 slices each) for fast Prismic entry

8. **Content pages shipped**
   - `/pricing` — 3-column plan grid (Starter/Growth/Scale), Fusebox Modules, AI Credit Packs, launch fees, FAQ, CTA
   - `/about` — What We Build (5 bullets), How We Work (3-step), Book a Demo CTA
   - `/contact` — Book a Demo (mailto), What to Include, What Happens Next (4-step)
   - `/blog` — Latest Posts (3 placeholders + Coming Soon), Topics, Explore Features CTA
   - All use fixed `app-grid` + cobalt radial bleed, `glass-chip` eyebrow, same footer nav

### Git Commits (Day 5)

- `977756d` — feat(hero-carousel): 5-card HERO_CARDS with title/blurb/href
- `cc62773` — feat(hero-carousel): add body copy + Explore Feature CTA to Alpha/Beta cards
- `fd567fb` — feat(nav): add FloatingGlassNav to v2-preview HUD, aligned to CTA column
- `ebd5ea2` — feat: add stub pages for /about, /contact, /blog with liquid glass aesthetic
- `c9c7221` — feat: add /pricing page with Business OS plans, Fusebox modules, credit packs, FAQ, and CTA
- `9f9caf7` — feat: rewrite /about, /contact, /blog with spec copy, 3-panel structure, glass aesthetic
- `7853006` — feat: add active state to FloatingGlassNav with usePathname + aria-current
- `4579290` — feat: right-align floating nav — w-fit wrapper, no center bleed
- `ffcbd6e` — fix: resolve nested button hydration error in HeroCarousel — div wrappers + Link CTAs
- `15c5e08` — fix: tighten HeroCarousel a11y — aria-labels + split Enter/Space keydown handlers
- `31dab58` — fix: add aria-describedby + stable id to Beta card On Deck label
- `5471ccb` — feat: add hover/focus glow affordance to Beta card — subtle cobalt rim + bg lift
- `8f7a82e` — feat(slices): 9 Slice Machine models + feature_page custom type
- `7a1079f` — fix(slices): harden Slice Machine v2 schemas — canonical field names
- `63f464c` — docs: add Prismic feature page document payloads (5 pages, 9 slices each)
- `7f4159d` — feat(prismic): dynamic [uid] feature page route + 9 slice components
- `300887a` — feat: remove static feature page routes (defer to [uid] dynamic route)
- `a8f2598` — fix: draft fallback UI for unpublished feature_page docs

### Files Modified (Day 5)

- `src/lib/heroCards.ts` — added `body` field to `HeroCardData`, 5 feature cards
- `src/components/home/hero/HeroCarousel.tsx` — nested button fix, a11y, hover/focus affordance
- `src/components/home/hero/HeroShadowbox.tsx` — nav slot wrapper `w-fit`
- `src/components/nav/FloatingGlassNav.tsx` — created; active route state, desktop + mobile
- `src/app/(marketing)/v2-preview/page.tsx` — mounted FloatingGlassNav via navSlot
- `src/app/features/page.tsx` — features hub with HERO_CARDS grid
- `src/app/features/[uid]/page.tsx` — Prismic dynamic route + DraftFallback
- `src/components/features/slices/index.ts` — 9-slice components map
- `src/components/features/slices/*.tsx` — 9 slice components (created)
- `src/app/pricing/page.tsx` — created
- `src/app/about/page.tsx` — created/rewritten
- `src/app/contact/page.tsx` — created/rewritten
- `src/app/blog/page.tsx` — created/rewritten
- `customtypes/feature_page/index.json` — created
- `docs/prismic-feature-page-payloads.json` — created

### Open Items / Next Session

- [ ] Publish `feature_page` custom type in Prismic dashboard (Settings → Custom Types → Import)
- [ ] Create + publish 5 feature_page docs using `prismic-feature-page-payloads.json`
- [ ] Test `/features/seo-conversion` renders SliceZone after publish (DraftFallback should disappear)
- [ ] Mount FloatingGlassNav globally across all pages (not just v2-preview)
- [ ] Laser VFX: fire DiodeEmitter beam toward Alpha card on carousel advance
- [ ] Mobile responsive audit: alpha/beta card overlap on narrow viewports
- [ ] Set `DEBUG_NO_OVERLAYS = false` in HeroShadowbox before production
