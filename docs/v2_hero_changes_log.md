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
