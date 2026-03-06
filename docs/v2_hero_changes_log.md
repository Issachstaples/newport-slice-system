# v2_hero_changes_log.md — Shadowbox Hero Change Log

**Project:** Newport Slice System  
**Component:** NewportEcom v2 Shadowbox Hero  
**Purpose:** Track changes, decisions, and rationale for the Shadowbox Hero implementation

---

## 2026-03-03 — Day 1: HUD Layout Implementation

### Summary

Implemented modular Shadowbox Hero with strict HUD layout, two-card carousel system, and honest CTA messaging. Removed fake performance metrics and replaced with value proposition. Completed visual hierarchy polish with enhanced readability and repositioned controls.

### Files Touched

1. `src/components/home/hero/HeroBackground.tsx` — **Created**
2. `src/components/home/hero/HeroCarousel.tsx` — **Created**
3. `src/components/home/hero/HeroShadowbox.tsx` — **Created**
4. `src/slices/HeroShadowbox/index.tsx` — **Created**
5. `src/app/(marketing)/v2-preview/page.tsx` — **Created**
6. `src/app/globals.css` — **Updated**

### Key Decisions and Why

#### 1. **Modular Component Architecture**

**Decision:** Split HeroShadowbox into three isolated components (Background, Carousel, Shadowbox shell).

**Why:** 
- Separation of concerns: background overlays are independent of carousel logic
- Reusability: HeroCarousel can be used in other contexts with different positioning
- Maintainability: Each component has single responsibility
- Testing: Easier to test and iterate on individual pieces

#### 2. **Strict Shadowbox Spec with Empty Center**

**Decision:** Enforce absolute positioning for all HUD cards with explicit empty center.

**Why:**
- Visual breathing room: Empty center creates command interface aesthetic vs. dense marketing page
- Future-proofing: z-10 optics layer reserved for laser/targeting effects
- Clarity: Forces intentional card placement instead of auto-layout that fills all space
- Brand differentiation: Unique layout that stands out from typical hero sections

#### 3. **Two-Card Carousel Instead of Stacked 5-Card System**

**Decision:** Render only Alpha (active) + Beta (on-deck) cards; hide remaining cards until rotated in.

**Why:**
- Reduced visual clutter: Stacked 5-card system felt chaotic and hard to parse
- Clear hierarchy: Alpha/Beta roles are explicit vs. "active card + background noise"
- Intentional docking aesthetic: Beta card's "Docking Bay" frame feels purposeful vs. accidental overlap
- Performance: Only render what's visible (2 cards vs. 5 cards with complex transforms)

#### 4. **Removed Fake Performance Metrics**

**Decision:** Replace metrics card (+247%, 3.2x, $127K sparkline) with "Pay only for what you use" CTA module.

**Why:**
- **Honesty:** Original metrics were not backed by real customer data
- **Misleading:** Sparkline chart implied real results when none existed
- **Legal risk:** False advertising exposure if metrics can't be substantiated
- **Trust:** Honest value proposition builds credibility vs. inflated claims
- **Conversion focus:** Direct CTA ("Book a Demo") is more actionable than passive metrics display

#### 5. **Visual Hierarchy Polish**

**Decision:** Reduce headline card dominance, enhance alpha/beta readability, reposition controls to left cluster.

**Why:**
- **Headline card:** Was too visually heavy (glass-panel-strong) and competed with alpha card for attention
- **Alpha card:** Dark text backplate was too small; text was hard to read against background bleed
- **Beta card:** Low contrast (text-white/90) made on-deck card feel like ghost content
- **Controls:** Center positioning felt generic; left cluster positioning creates spatial relationship with alpha card
- **CTA card:** Enhanced as "primary powered HUD module" with top sheen + cobalt edge accent to draw conversion focus

#### 6. **Increased Alpha Vertical Separation**

**Decision:** Move alpha card down +80-100px from headline card and add subtle cobalt divider.

**Why:**
- **Collision avoidance:** Original positioning caused headline and alpha to visually touch/overlap
- **Breathing room:** More space creates clearer hierarchy and reduces cognitive load
- **Intentional separation:** Subtle divider line makes gap feel designed vs. accidental
- **Mobile readiness:** Extra separation prevents collision on smaller screens when cards stack

### Technical Notes

#### Glass Panel Utilities

Created three glass variants with different alpha/blur/border values:
- `.glass-panel` — Base variant for secondary cards (headline)
- `.glass-panel-strong` — Enhanced variant for primary/active cards (CTA)
- `.glass-panel-soft` — Subtle variant for background cards (beta on-deck)

This tiered system creates visual hierarchy without relying on size/color alone.

#### Z-Index Layer Strategy

Frozen z-index layers prevent stacking context bugs:
- z-0: Background (image + overlays)
- z-10: Optics (reserved; currently empty div)
- z-20: UI (alpha/beta cards)
- z-30: CTA card (must be above UI for prominence)
- z-40: Controls (must be above everything for interaction)

This is NOT arbitrary; each layer has specific purpose and prevents future refactor pain.

#### Positioning Strategy

All HUD cards use absolute positioning with explicit top/left/right values instead of grid/flex auto-layout.

**Why absolute?**
- Precise control: Each card can be positioned independently without affecting others
- No layout shifts: Adding/removing cards doesn't reflow the entire layout
- Empty center enforcement: Grid/flex would auto-fill empty space; absolute positioning respects gaps
- Responsive flexibility: Different breakpoints can have completely different spatial arrangements

### What We Did NOT Do (and Why)

#### ❌ No Laser/Incineration Effects Yet

**Reason:** Visual polish and layout must be rock-solid before adding complex animations. Laser effects will be Day 2 work behind a dev toggle.

#### ❌ No Prismic Integration Yet

**Reason:** Hardcoded preview route allows rapid iteration without CMS overhead. Slice model + adapter will be Day 3 work once layout is finalized.

#### ❌ No Mobile-Specific Polish Yet

**Reason:** Desktop layout took priority (most traffic). Mobile refinement (stacked cards, tighter spacing) is optional polish pass.

#### ❌ No Additional HUD Modules

**Reason:** Scope limited to headline + alpha + beta + CTA. Future modules (e.g., metrics, notifications, status) can be added as needed.

---

## Verification Status

- ✅ TypeScript: Clean (`npx tsc --noEmit`)
- ✅ ESLint: Clean (`npx eslint --max-warnings=0`)
- ✅ Preview: Renders at `/v2-preview`
- ✅ Git: Committed and pushed to `main`
- ✅ Documentation: Updated `context_anchor.md`, created `v2_hero_worklog.md`, created `v2_hero_changes_log.md`

---

## Next Session Prep

If resuming in a new chat, provide these context files:
1. `public/docs/context_anchor.md` — Project identity + Shadowbox Hero section
2. `docs/v2_hero_worklog.md` — Day-by-day checkpoint log
3. `docs/v2_hero_changes_log.md` — This file (decisions + rationale)
4. `src/components/home/hero/HeroShadowbox.tsx` — HUD shell implementation
5. `src/components/home/hero/HeroCarousel.tsx` — Alpha/Beta carousel logic

This will allow instant bootstrap without rediscovering decisions.

---

## 2026-03-05 — Day 2: 3D Shadowbox Implementation

### Summary

Implemented React Three Fiber 3D shadowbox backdrop with four layered transparent PNG plates. Added independent per-mesh parallax, container-relative pointer tracking with clamping, explicit renderOrder for transparent sorting, global scaling system, cavity vignette, and responsive wrapper sizing. Composition tuned across multiple iterations for optimal depth and frame dominance.

### Files Touched

1. `src/components/home/hero/Shadowbox3D.tsx` — **Created**
2. `src/components/home/hero/HeroShadowbox.tsx` — **Updated** (dynamic import, vignette, wrapper sizing)
3. `package.json` — **Updated** (R3F dependencies)
4. `public/images/hero/shadowbox_eye_back_2048.png` — **Added** (719KB)
5. `public/images/hero/shadowbox_core_mid_2048.png` — **Added** (1.3MB)
6. `public/images/hero/shadowbox_wrap_front_2048.png` — **Added** (1.4MB)

### Key Decisions and Why

#### 1. **React Three Fiber for 3D Shadowbox**

**Decision:** Use @react-three/fiber Canvas with drei helpers instead of CSS transforms or video.

**Why:**
- True 3D depth with WebGL rendering
- Independent parallax per mesh (not achievable with CSS parent transforms)
- Emissive material pulsing for sci-fi aesthetic
- Performant with dpr capping and framerate-independent smoothing
- React component integration (no separate WebGL context management)

#### 2. **Independent Per-Mesh Parallax**

**Decision:** Share pointer state via Scene component, apply parallax at Plate level with individual moveFactorX/Y.

**Why:**
- Each plate can have different parallax sensitivity (eye subtle, wrap more pronounced)
- Avoids parent group movement that moves entire stack together (breaks depth illusion)
- Container-relative tracking via getBoundingClientRect() keeps parallax accurate within constrained wrapper
- Clamp [-0.6, 0.6] prevents excessive drift on large screens

#### 3. **Explicit RenderOrder for Transparent Layers**

**Decision:** Set renderOrder: Eye=10, Core=20, AO=30, Wrap=40 on each Plate mesh.

**Why:**
- Three.js transparent sorting can fail with overlapping geometry
- Explicit order prevents z-fighting and visual glitches
- Ensures wrap always renders in front, eye always behind, regardless of camera angle

#### 4. **Unit Plane + BaseScale System**

**Decision:** Use constant 1×1 planeGeometry with per-plate baseScale prop instead of viewport-relative sizing.

**Why:**
- Viewport sizing caused shadowbox to scale unpredictably with window resize
- BaseScale provides predictable, art-directable sizing
- OffsetX/offsetY props allow independent positioning while maintaining parallax
- Global scale multiplier (1.35) can uniformly scale entire cluster without refactoring individual values

#### 5. **Global Scale System (GLOBAL_SCALE = 1.35)**

**Decision:** Add single constant that multiplies all baseScale values uniformly.

**Why:**
- Shadowbox cluster was too small relative to ~1200px wrapper
- Needed to fill ~80% of hero background area without changing relative proportions
- Single constant easier to tune than adjusting 4 individual baseScale values
- Maintains eye < core < wrap < AO hierarchy

#### 6. **Core Visual Dominance Reduction**

**Decision:** Reduce core opacity (0.95 → 0.88), alphaTest (0.02 → 0.01), emissive pulse amplitude.

**Why:**
- Core plate was reading as "rectangular sticker" with hard edges
- Too visually dominant vs. wrap frame (felt like core was the hero, not the wrap)
- Reduced opacity/alphaTest creates softer blend with vignette and AO shim
- Subtler emissive pulse prevents attention-grabbing flash

#### 7. **Cavity Vignette (Localized, Not Full-Screen)**

**Decision:** Create centered box at z-5 with radial gradient, responsive sizing, positioned with transform.

**Why:**
- Full-screen vignette (inset-0) darkened entire viewport including HUD cards
- Localized box targets only shadowbox area without muddying UI
- Tighter falloff (50%/75% stops) concentrates shadow in cavity center
- Neutral dark gradient (no blue tint) prevents color cast on wrap texture
- Positioned with translate(-55%, -42%) to align with wrap/core and avoid CTA overlap

#### 8. **Responsive Wrapper Sizing**

**Decision:** Make Shadowbox3D wrapper responsive with breakpoint classes: 700px/900px/1200px.

**Why:**
- Larger fixed size (1200px) caused collision with HUD cards on mobile/tablet
- Responsive sizing keeps shadowbox readable at all viewport sizes
- Min() constraints prevent overflow on very small screens
- Positioned with translate percentages maintains centering at all breakpoints

#### 9. **Eye Plate Raised (offsetY 0.14 → 0.21)**

**Decision:** Move eye upward in composition by +0.07.

**Why:**
- Eye was too close to core cavity, felt cramped
- Raising it creates clear "watcher" positioning above the frame
- Avoids collision with left headline card on smaller viewports
- Makes three-layer hierarchy (eye / core / wrap) more visually distinct

#### 10. **DEBUG Flag for Background Evaluation**

**Decision:** Add DEBUG_SHADOWBOX_3D flag to disable legacy HeroBackground temporarily.

**Why:**
- Legacy background (vignette + spotlight + grain) interfered with shadowbox evaluation
- Needed clean slate to tune cavity vignette and composition
- Flag allows quick toggle for future re-enabling of background atmosphere blend
- Prevents accidental deletion of legacy background code

### Technical Notes

#### Parallax Smoothing

Used THREE.MathUtils.damp for framerate-independent parallax:
```tsx
meshRef.current.position.x = THREE.MathUtils.damp(
    meshRef.current.position.x,
    targetX,
    4,  // damping factor
    delta  // time since last frame
);
```

This ensures 60fps and 120fps devices have identical movement feel.

#### AO Shim Implementation

AO shim is duplicate wrap texture with modified material:
- `zDepth=-0.02` (behind wrap at 0.05)
- `opacity=0.22` (subtle darkening)
- `scale multiplier=1.02` (slightly larger than wrap)
- `alphaTest=0.02` (trim fully transparent pixels)
- `color="#000000"` (pure black for shadow)

Creates subtle ambient occlusion effect without expensive lighting calculations.

#### Emissive Pulse

Eye and Core materials use sine wave pulse:
```tsx
const amplitude = isCore ? 0.08 : 0.15;
const baseline = isCore ? 0.15 : 0.2;
const pulse = Math.sin(state.clock.elapsedTime * 0.8) * amplitude + baseline;
meshRef.current.material.emissiveIntensity = pulse;
```

Core has half the amplitude of Eye to prevent visual dominance.

### Current Status

- `/v2-preview` renders with no runtime errors
- TypeScript + ESLint clean (--max-warnings=0)
- Shadowbox fills ~80% of hero background area
- All 4 plates render with correct depth separation and parallax
- Cavity vignette provides depth cue without muddying UI
- HUD cards (z-20) correctly float above shadowbox (z-10)

### Next Steps

- Optional: Re-enable legacy background atmosphere (blend with DEBUG flag)
- Optional: Implement "heartbeat sparks" overlay (TODO in Shadowbox3D.tsx)
- Future: Prismic slice integration (hero_shadowbox model)
- Future: Mobile responsive polish (test stacked HUD layout)

