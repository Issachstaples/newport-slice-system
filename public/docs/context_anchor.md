# context_anchor.md

Project: Newport Slice System / HelixFlow
Last Updated: 2026-02-28

---

# 1. Project Identity

**Newport Slice System** is not just a marketing website system.

It is a **Reusable SaaS Factory Architecture** built on:

* Next.js (App Router)
* TypeScript (strict)
* Tailwind v4
* Prismic Slice Machine v2
* Supabase (Multi-tenant + RLS)
* Coolify + Docker (Self-hosted VPS cluster)

Design language:

* Apple-style Liquid Glass
* Dark, SaaS-dense layouts
* Reuse-first philosophy (“minutes not weeks”)

This system powers:

* Newport Ecom (Agency Frontend)
* HelixFlow (Modular Vertical SaaS Platform)
* Future White-Label Client Deployments
* 100+ Tenant Architecture from one codebase

This is a **config-driven multi-tenant operating system**, not a collection of websites.

---

# 2. The Core Vision (From Gemini Strategic Blueprint)

The goal is not to “build websites.”

The goal is to build:

> A repeatable, modular, commission-free vertical SaaS system that outperforms Jobber, Toast, Thryv, and generic all-in-one platforms.

### Positioning Strategy

HelixFlow competes by:

* 0% commission model
* Ultra-fast Next.js PWA performance
* Industry-specific modular dashboards
* Client-owned data (Supabase isolation)
* Configurable slice-based UI instead of bloated monolith dashboards

---

# 3. The Software Factory Model

## The HelixFlow Assembly Line (SOP)

Every client follows this pipeline:

1. Scoping

   * Identify required modules (CRM, Scheduling, Ordering, Proposals, AI Support)

2. Provisioning

   * Create organization_id in Supabase
   * Create Client_Configuration document in Prismic

3. Feature Wiring

   * Enable modules in organization_modules table
   * Configure Prismic slices for dashboard layout

4. Deployment

   * Coolify builds Docker container
   * Subdomain mapped automatically

5. Handoff

   * Client receives dashboard login
   * System begins automated lead-to-handoff flow

Manual work target: under 15 minutes per client.

---

# 4. Modular Logic — "Slice Machined Dashboards"

Prismic is not just for marketing pages.

It is the **Feature Toggle Brain** of HelixFlow.

### Mechanism:

* A Custom Type: `Client_Configuration`
* Each client document contains slices representing enabled modules
* Next.js reads slices and conditionally renders dashboard components

Example logic:

if (slices.includes('ReviewManagement')) render <ReviewWidget />

Each dashboard widget:

* Talks to Supabase
* Filters by organization_id
* Respects RLS isolation

One codebase.
Config-driven UI.
Selective rendering per subscription tier.

---

# 5. Multi-Tenant Architecture (Supabase Model)

Core database structure:

* organizations
* modules
* organization_modules (feature toggles)
* profiles
* leads
* future tables: proposals, contracts, invoices, reviews

All tables include:

organization_id UUID NOT NULL

RLS Policies ensure:

organization_id = auth.uid() org_id claim

Database-level isolation.
Cryptographic tenant separation.
Single database, 100+ businesses.

---

# 6. Scaling Strategy

Level 1:
Single KVM VPS running:

* Coolify
* Next.js apps
* Self-hosted Supabase

Level 2:
Move Supabase to dedicated database server

Level 3:
Add Coolify Worker Nodes
Distribute containers per tenant

Level 4:
Swarm / Kubernetes auto-scaling
Spin up containers dynamically per traffic spike

System designed to scale from 1 VPS → Enterprise cluster.

---

# 7. Architectural Philosophy

## Core Principles

* Slices are layout-only
* Data normalization centralized
* Never assume Prismic data shape
* Defensive rendering mandatory
* Reuse > cleverness
* Factory > playground
* Config-driven > Hardcoded logic
* Monoliths do not scale

---

# 8. Slice Development Model

Slices are built “Slices-First.”

Never build monolithic pages then refactor.

Workflow:

Create slice
→ Add to page type
→ Push
→ Add to document
→ Publish
→ Verify render

All six steps required.

Slices are:

* Marketing building blocks
* Dashboard feature toggles
* Future white-label deployment modules

---

# 9. Confirmed Working System State

## Tailwind v4

Correct import:

@import "tailwindcss";

Custom utilities live in @layer utilities.

Global utilities confirmed:

* .glass-frost
* .glass-rim
* .glass-chip
* .glass-sheen
* .glass-orb
* .glass-helix
* .pulse-dot

---

## Prismic Data Handling

Field Discipline:

| Field Type | Rendering Strategy |
| ---------- | ------------------ |
| Key Text   | asTextValue()      |
| Rich Text  | SafeRichText       |
| Select     | asEnumValue()      |
| Boolean    | direct coercion    |

Slice Machine mocks wrap structured text as:

{ "**TYPE**": "...", "value": [...] }

Rendering must support:

* API array
* Mock wrapper

Never render wrapper objects.

---

# 10. Competitive Advantage Model

HelixFlow Bundle Packaging:

Tier 1 — Foundations

* Next.js Site
* Lead capture
* Basic automation

Tier 2 — Flow

* CRM dashboard
* Proposal builder
* Client portal
* Review loop

Tier 3 — Helix

* AI support agent
* Advanced automation
* Revenue reporting
* Multi-user permissions

Sell outcomes:

* Margin
* Time
* Automation
* Ownership

Not “features.”

---

# 11. End-to-End Data Flow

Lead → Supabase → Edge Function → Dashboard → Contract → Invoice → Review Request

Every step automated.
Every event logged.
Every action traceable.

Website = Hook
Dashboard = Engine
Automation = Glue

---

# 12. Visual System Tokens

Dark Mode:

* Obsidian (#050505)
* Midnight (#0A0A0B)
* Silver (#E2E8F0)
* Electric Cobalt (#3B82F6)

Material:

* backdrop-blur 24px
* 1px white border at 0.1 opacity
* inner glow depth
* metallic heading gradients

Glass utilities abstracted.
Never inline styling.

---

# 13. Operating Rule Going Forward

When something breaks:

1. Identify layer:

   * Slice Definition
   * Page Type
   * Document
   * Rendering
   * Database
   * Feature Toggle

2. Add invariant rule

3. Update fixes_log.md

4. Update AI_RULES.md if structural

Never rediscover the same architecture lesson twice.

---

This is no longer a website rebuild.

This is the HelixFlow Operating System.

---

## Slice Library Updates

- **SectionIntro** implemented (`src/slices/SectionIntro/index.tsx`) — replaces Slice Machine stub; full universal control block (`is_enabled`, `visual_mode`, `section_padding`, `container_width`, `align_mode`), `SafeRichText` + `normalizeRichText` for body, `asTextValue` for eyebrow/headline, lint verified (exit 0), two mocks added (gradient_orb/left and helix_3d/center), `slice_library_index.md` updated. *(2026-03-02)*

---

## Slice Library Milestone — 2026-03-02

The following slices were implemented, lint-verified (ESLint exit 0), and pushed to `main` in this session:

- **IconList** (`src/slices/IconList/index.tsx`) — vertically stacked icon rows; reads from `primary.items` Group; supports `item_icon` (Select → lucide map), `item_title`, `item_description` (Rich Text), `item_badge`, `item_is_highlighted`; full `density_mode` control.
- **StepsTimeline** (`src/slices/StepsTimeline/index.tsx`) — numbered or icon-driven step sequence; reads from `primary.steps` Group; supports `layout_mode` (vertical/horizontal), `connector_mode` (line/dots/none), `number_style` (numeric/icon), `animation_mode` (none/fade_in/slide_up/stagger with per-step inline delay).
- **TabsSection** (`src/slices/TabsSection/index.tsx`) — interactive tab switcher (`"use client"`); reads from `primary.tabs` Group; supports `tabs_style` (pills/underline/cards), `content_style` (panel/grid), `show_icons`, `allow_wrap`, `default_tab_index` (clamped); ARIA-compliant tab/tabpanel roles.

**Architectural note:** TabsSection uses Rich Text blocks rendered into a CSS `[&>*]` grid (`content_style: grid`) rather than nested Group fields. Slice Machine v2 does not support nested Groups. This is the canonical pattern for grid-like content within tab panels.

**Documentation updated this session:**
- `public/docs/slice_library_index.md` — fully rewritten as canonical table-format inventory (9 implemented, 8 planned)
- `docs/SLICE_IMPLEMENTATION_STANDARDS.md` — created; formalises required control block order, hard rules, defensive rendering standards
- `docs/SLICE_FACTORY_WORKFLOW.md` — created; defines 10-step build process, QA checklist, JSON validation steps, commit message conventions
- `docs/AI_rules.md` — updated with doc maintenance rule, cross-check rule, and no-nested-groups rule

---

# NewportEcom v2 Shadowbox Hero — HUD Layout Iteration (Day 1.x)

**Date:** 2026-03-03  
**Status:** HUD layout complete; laser/incineration deferred to Day 2  
**Preview Route:** `/v2-preview`

## A) Goals / Intent

- Homepage hero is a static, no-scroll Shadowbox HUD.
- Center must remain empty; composition is 3-lane HUD: Left (Alpha), Center (empty), Right (Beta).
- Bottom-right CTA is the conversion module (no fake metrics).

## B) What was built

### Modular hero components created/refactored:

- **`HeroBackground.tsx`** — image + vignette + spotlight + subtle grain overlay
- **`HeroShadowbox.tsx`** — absolute-position HUD layout; strict z-index layers (z-0 background, z-10 optics placeholder, z-20 UI, z-30 CTA, z-40 controls)
- **`HeroCarousel.tsx`** — two-card system: Alpha (active left) + Beta (on-deck right with docking bay frame)

### Glass tokens/utilities (`globals.css`):

- `.glass-panel` (base: 0.06 alpha, 24px blur)
- `.glass-panel-strong` (active/CTA: 0.10 alpha, 32px blur, 0.18 border, inset glow)
- `.glass-panel-soft` (beta/secondary: 0.04 alpha, 20px blur, 0.08 border)
- `.text-metallic` (gradient text: #e0e7ef → #a8b2c1 → #cbd5e0)
- Sheen overlays + edge accents added for premium "liquid glass" aesthetic

### Two-card carousel rules:

- Only Alpha and Beta are rendered in DOM; remaining cards are hidden until rotated in.
- **Beta card "Docking Bay" aesthetic:**
  - `translateY(22px)`, `scale(0.92)`, `opacity(0.72)`, `brightness(0.92)`, `saturate(0.95)`
  - Docking frame + status dots
  - "ON DECK" label
- Controls repositioned to left cluster (`bottom-10 left-10`)
- Hover-reveal dots (`opacity-40 → 100`), smaller button (`p-3`), horizontal pill active state (`w-6 h-1.5`)

### CTA moved to bottom-right and made honest:

- **Headline:** "Pay only for what you use."
- **Subheadline:** Modular pricing message
- **Buttons:** "Book a Demo" (primary cobalt glow) + "See Modules" (secondary border)
- **Removed:** Fake/unsupported performance metrics (+247%, 3.2x, $127K sparkline) that implied real results

## C) Layout "Strict Shadowbox Spec" (frozen decisions)

- **Top-left:** Headline HUD card (no buttons; "SYSTEM" eyebrow label)
- **Left:** Alpha card (active carousel card)
- **Right:** Beta card (on-deck carousel card)
- **Center:** Always empty (reserved for future laser/optics effects at z-10)
- **Bottom-right:** CTA card pinned; never moves

## D) Current positioning report (exact values)

### Alpha card `alphaClassName` top values:

- **Mobile:** `top-[300px]`
- **sm:** `top-[320px]`
- **lg:** `top-[380px]`

### Divider line (subtle horizontal cobalt glow between headline and alpha):

- **Position:** `top-[280px] sm:top-[300px] lg:top-[360px]`
- **Width:** `w-12` (48px)
- **Color:** `rgba(59, 130, 246, 0.15)` (15% opacity cobalt)
- **Effect:** `blur(0.5px)` for soft glow
- **Gradient:** `linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.15) 50%, transparent)`

### Visual hierarchy polish (completed):

- Reduced headline card dominance (glass-panel instead of glass-panel-strong, smaller text: `text-[2.75rem]`, max-w-[480px])
- Enhanced alpha card readability (larger backplate coverage: `-m-3 p-3`, darker gradient: 0.5-0.7 opacity)
- Improved beta card contrast (title: `text-white`, description: `text-[#cbd5e0]`)
- Enhanced CTA card as "primary powered HUD module" (top sheen at 0.10 opacity, thin cobalt top edge gradient, enhanced button glow with `boxShadow: '0 0 24px rgba(59, 130, 246, 0.6), 0 0 12px rgba(59, 130, 246, 0.4)'`)

## E) What is NOT done yet (explicit)

- No laser/beam targeting, no incineration animation
- No WebGL optics layer yet (reserved z-10 slot exists as empty `div`)
- No Prismic integration yet for `hero_shadowbox` slice (still hardcoded preview route)

## F) Where to preview

- **Route:** `/v2-preview`
- **Background asset path:** `/public/images/home/neon-eye-clean.png`

## G) Files touched

- `src/components/home/hero/HeroBackground.tsx`
- `src/components/home/hero/HeroCarousel.tsx`
- `src/components/home/hero/HeroShadowbox.tsx`
- `src/slices/HeroShadowbox/index.tsx` (re-export for backward compatibility)
- `src/app/(marketing)/v2-preview/page.tsx`
- `src/app/globals.css`

## H) Key decisions and rationale

### Why remove fake metrics?

The original design included a metrics card with "+247% conversion increase", "3.2x faster deployment", "$127K saved annually" with a sparkline chart. **These metrics are not backed by real customer data and could be misleading.** Replaced with honest value proposition: "Pay only for what you use" with modular pricing message.

### Why strict Shadowbox spec with empty center?

The empty center is intentional for future laser/targeting effects that will render at z-10 (optics layer). This creates visual breathing room and allows the HUD cards to feel like a command interface rather than a dense marketing page.

### Why two-card carousel instead of stacked 5-card system?

The original design stacked all 5 cards with offset/rotation. This created visual clutter and made the beta (on-deck) card feel like background noise. The two-card system with explicit Alpha/Beta roles creates clearer hierarchy and makes the docking bay aesthetic feel intentional.
Update documentation with two quick additions:
1) In context_anchor.md, add a single short paragraph under the Shadowbox Hero section titled "Frozen HUD Rules (1-paragraph)" that restates the strict 5 rules (empty center, alpha left, beta right docking bay, bottom-right CTA pinned, only alpha/beta rendered).
2) In v2_hero_worklog.md and/or v2_hero_changes_log.md, update the "Next session bootstrap files" list to include globals.css (glass tokens/utilities are required to reproduce visuals).
Do not modify any app code.
---



---

## HybridHero3D — R3F Eye Actor + HeroCarousel Interaction (2026-03-07)

**Commits:** `47dbc16` (VFX), `e23bbd4` (lint clean + a11y fixes)  
**Status:** `/v2-preview` working — eye tracks cursor correctly, alpha card selectable by click and controls, lint 0 problems.

### What was built

- **`HybridHero3D.tsx`** — React Three Fiber Canvas mounted inside `HeroShadowbox`; single `neon-eye-clean.png` backdrop; R3F eye actor (`EyeActor`) with gaze rotation driven by `state.pointer.x/y` projected relative to the eye's own NDC position, eliminating dead zones; pupil mesh translates in local eye space tracking the same dx/dy vector; iris emissive intensity is proximity-reactive (smoothstep 0→1 over NDC distance 0.60→0.08) with a slow breathing pulse on top; VFX layer includes `OrbitalSparks` (12 particles, orbit + proximity brightness), `RipplePulse` (2 expanding ring meshes, staggered 180°, proximity-driven speed/opacity), glint parallax (2 glint meshes slide counter to gaze), always-on aura mesh, and `DiodeEmitter` (halo + core at world position `[0.04, 0.02, -0.50]` — anchor for future laser/spark VFX).
- **`HeroCarousel.tsx`** — Alpha and Beta cards promoted to `<button>` elements; single `activeIndex` useState is the sole source of truth; clicking Beta calls `setActiveIndex(betaIndex)`, clicking Alpha calls `setActiveIndex(alphaIndex)`; dot nav and Next button share the same state; `aria-pressed={true/false}` explicit on both; empty-cards guard (`if (!cards || cards.length === 0) return null`) placed after hooks.

### Key decisions

- **HybridHero3D route** (R3F inside existing HeroShadowbox, not a separate page): avoids re-architecting the HUD layout; Canvas lives at z-10 behind the HUD (z-20).
- **eventSource on `<section ref={heroRef}>`**: Canvas has `style={{ pointerEvents: "none" }}` and `eventSource={eventSourceEl}` pointing to the hero section so R3F receives pointer events without the HUD overlay divs blocking them. `eventSourceEl` state is set in a `useEffect` after mount.
- **dx/dy gaze**: pointer NDC minus eye's own projected NDC (not raw pointer); removes the offset dead zone when eye is not centered in viewport.
- **Pitch direction**: `targetRotationX = dy * V_GAIN` (positive dy = cursor above eye = positive rotX = look up) — no sign flip needed.
- **`SPARK_PHASES` at module scope**: `Math.random()` calls moved out of component render cycle to satisfy `react-hooks/purity` lint rule; values are identical, generated once at module load.
- **Lens flare rejected**: too noisy at current eye scale; glint parallax provides the glass-surface read without it.

---

## 3D Shadowbox Hero Implementation (2026-03-05)

**Goal:** Implement 3D "shadowbox" hero backdrop using React Three Fiber with layered PNG plates and HUD UI floating above.

### Assets

Three prepared 2048×2048 transparent PNG plates stored at:
- `/public/images/hero/shadowbox_eye_back_2048.png` (719KB)
- `/public/images/hero/shadowbox_core_mid_2048.png` (1.3MB)
- `/public/images/hero/shadowbox_wrap_front_2048.png` (1.4MB)

### Implementation

**Component:** `src/components/home/hero/Shadowbox3D.tsx`

Uses @react-three/fiber Canvas + @react-three/drei useTexture with Suspense boundary. Four plates rendered (Eye, Core, AO shim, Wrap) with:

- **Independent parallax per mesh** (no parent/camera parallax): pointer state shared via Scene component, each Plate applies its own moveFactorX/Y
- **Container-relative pointer tracking:** via getBoundingClientRect() on wrapper div
- **Pointer clamp:** [-0.6, 0.6] range prevents excessive drift
- **Framerate-independent smoothing:** THREE.MathUtils.damp with delta
- **RenderOrder:** Eye=10, Core=20, AO=30, Wrap=40 (prevents transparent sorting glitches)
- **Emissive pulse:** Eye and Core materials pulse with reduced amplitude for Core (0.08 vs 0.15)
- **AO shim:** Duplicate wrap texture at opacity 0.22, scale multiplier 1.02, alphaTest 0.02
- **Unit planes + baseScale system:** Constant 1×1 planeGeometry with per-plate baseScale values
- **Global scale (GLOBAL_SCALE = 1.35):** Uniformly scales all plates to fill ~80% of hero background
- **Fixed group rotation:** rotation-x=-0.03, rotation-y=0.02 for physical tilt
- **Camera:** fov=48, position=[0, 0, 1.15], dpr=[1, 1.5]

**Plate Configuration:**
- Eye: zDepth=-0.30, baseScale=0.62, offsetY=0.21, renderOrder=10
- Core: zDepth=-0.11, baseScale=1.00, offsetY=-0.10, renderOrder=20, opacity=0.88, alphaTest=0.01
- AO: zDepth=-0.02, baseScale=1.38, offsetY=-0.08, renderOrder=30
- Wrap: zDepth=0.05, baseScale=1.34, offsetY=-0.08, renderOrder=40

### Hero Layout Integration

**Updated:** `src/components/home/hero/HeroShadowbox.tsx`

- Mounts Shadowbox3D at z-10 optics layer behind HUD (z-20)
- Added localized cavity vignette at z-5 (NOT full-screen): centered box with responsive sizing, radial gradient darkening center cavity, positioned with translate(-55%, -42%)
- Shadowbox3D wrapper made responsive: 700px/900px/1200px at sm/md/lg breakpoints
- DEBUG_SHADOWBOX_3D flag temporarily disables legacy background for accurate evaluation

### Iteration Timeline

1. Initial R3F implementation with 3 plates + AO shim
2. Fixed client-side exceptions (Suspense, dynamic import, "use client")
3. Fixed parallax moving whole stack → per-mesh independent parallax
4. Added container-relative pointer tracking with [-0.6, 0.6] clamp
5. Added renderOrder to prevent transparent layer glitches
6. Improved AO shim (opacity 0.22, scale 1.02, alphaTest 0.02)
7. Camera optimization (fov 48, position z 1.15, dpr [1, 1.5])
8. Switched to unit plane + baseScale system (removed viewport scaling)
9. Composition tuning (scales and offsets refined across multiple iterations)
10. Added cavity vignette (localized, neutral dark gradient, tighter falloff)
11. Z-depth separation increase (Eye -0.24→-0.30, Wrap 0.03→0.05)
12. Frame dominance increase (Wrap 1.28→1.34, AO 1.32→1.38)
13. Core visual dominance reduction (opacity 0.95→0.88, alphaTest 0.02→0.01, reduced emissive pulse)
14. Fixed group rotation added (x: -0.03, y: 0.02)
15. Global scale system (GLOBAL_SCALE = 1.35) for ~80% background fill
16. Shadowbox3D wrapper sizing responsive + repositioning (translate -55%, -42%)
17. Eye moved upward (offsetY 0.14→0.21) for "watcher" positioning

**Note:** "Heartbeat sparks" overlay planned but not yet implemented (reference TODO comment in Shadowbox3D.tsx).

### Current Status

- `/v2-preview` renders correctly with no runtime errors
- TypeScript and ESLint clean (--max-warnings=0)
- Remaining: optional re-enable background atmosphere blend, future heartbeat sparks overlay

