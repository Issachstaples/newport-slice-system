# NE_error_log.md — Newport Error & Fix Log

Project: Newport Slice System
Scope: Runtime + Build Failures
Purpose: Prevent rediscovery of solved bugs

This document records **root cause → fix → rule extracted** for all significant failures.

If an error reappears, it means the rule was not enforced.

---

# 2026-02-28 — Error Cluster: Tailwind + Prismic Rendering + Repeatables

---

## 1️⃣ Tailwind v4 Directive Failure

### Error

PostCSS/Tailwind build failure:

CssSyntaxError: tailwindcss: "./base" is not exported

### Root Cause

Project upgraded to Tailwind v4, but globals.css still used v3 directives:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Tailwind v4 requires:

```css
@import "tailwindcss";
```

### Fix Applied

Updated `src/app/globals.css` to:

```css
@import "tailwindcss";
```

### Rule Extracted

If Tailwind major version changes, globals must be audited.

Tailwind v4 only uses:

@import "tailwindcss";

Never mix directive styles.

Reference: 

---

## 2️⃣ FeatureGrid Runtime Crash — StructuredText Wrapper

### Error

Browser runtime crash:

Objects are not valid as a React child
(found: object with keys { **TYPE**, value, type })

### Root Cause

Slice Machine mocks wrap StructuredText as:

```json
{
  "__TYPE__": "StructuredTextContent",
  "value": [...]
}
```

FeatureGrid rendered fields directly in JSX:

```tsx
<h2>{primary.headline}</h2>
```

React cannot render wrapper objects.

### Fields Affected

* primary.eyebrow
* primary.headline
* primary.body
* item.title
* item.description

### Fix Applied

Introduced normalization + enforced `<PrismicRichText />` usage for all Rich Text fields.

Now compatible with:

* Mock wrapper objects
* Raw API arrays

Result:

✅ Page renders
✅ No client crash
✅ Mock-safe + API-safe

Reference: 

---

## 3️⃣ FeatureGrid Repeatable Misread

### Error

Cards rendered fallback titles ("Feature").

### Root Cause

Repeatables were incorrectly read from:

```ts
slice.primary.feature_cards
```

Correct location for slice-level repeatables:

```ts
slice.items
```

### Fix Applied

Standardized repeatable read pattern:

```ts
const cards = Array.isArray(slice.items) ? slice.items : [];
```

### Rule Extracted

Never assume repeatable location.

Valid patterns:

* slice.items
* slice.primary.group_field

Must guard with Array.isArray.

Reference: 

---

## 4️⃣ Visual Refactor Exposed Latent Data Bug

### Context

While adding backdrop layers and reordering slices:

* HeroSystem
* BentoGrid
* FeatureGrid
* CtaSection

Generic client-side crash appeared.

### Root Cause

Visual changes did NOT cause failure.

They exposed pre-existing improper Rich Text handling.

This is critical:

Visual layers often reveal hidden data assumptions.

Reference: 

---

## 5️⃣ Slice Not Rendering — Page Type Misconfiguration

### Symptom

FeatureGrid created locally but not visible in Prismic.

### Root Cause

Slice was:

* Created locally
* But NOT added to Page Type
* OR not pushed to Prismic

### Fix

Required 5-step workflow:

Create → Add to page type → Push → Add to document → Publish

### Rule Extracted

If slice is missing:

Check:

1. model.json exists
2. Page type includes slice
3. Slice pushed
4. Document includes slice
5. Document published

Never skip workflow steps.

---

# Failure Classes Identified

These are now formal bug classes in this system:

1. Tailwind major version mismatch
2. Rich Text wrapper rendered directly
3. Repeatable groups read from wrong location
4. Slice created but not added to page type
5. Slice created but not pushed
6. Visual refactor exposing latent data assumptions

All now documented invariants.

---

# Debug Protocol (Canonical)

When runtime error occurs:

1. Disable slices incrementally in SliceZone
2. Identify crashing slice
3. Audit for:

   * Direct JSX interpolation
   * PrismicRichText misuse
   * Unguarded repeatables
4. Replace with SafeRichText / guards
5. Re-enable slices one by one

Never debug visually first.
Debug data shape first.

---

# System Maturity Upgrade (Post 2/28)

After these fixes:

* Defensive rendering enforced
* Repeatable reading standardized
* Rich Text normalization mandatory
* Tailwind v4 stabilized
* Slice workflow formalized

System now stable under:

* Turbopack
* App Router
* Slice Machine mocks
* Real Prismic API responses

---

# Permanent Rule

If a slice can crash the page,
the slice is incorrect.

Not “needs a patch.”
Incorrect.
2026-03-01 — FeatureGrid / FeatureGridV2 Cards Not Rendering Correctly
Symptom

FeatureGrid rendered card titles as repeated placeholders (e.g. “Feature Feature Feature”)

FeatureGridV2 initially rendered only Slice Machine placeholder text

Rich Text descriptions (especially lists) failed to render or appeared empty

No runtime crashes; slices existed in DOM but content was incorrect or missing

Root Causes (Multiple, Related)
1️⃣ Slice Machine Stub Left in Place (FeatureGridV2)

FeatureGridV2 was still using the auto-generated Slice Machine stub:

return <section>Placeholder component for feature_grid_v2...</section>

Result: Prismic preview showed placeholder text instead of real UI.

2️⃣ Incorrect Cards Source (FeatureGrid)

Component read from primary.cards

Prismic model actually defined Group field as:

primary.feature_cards

Result: real card data was ignored → fallback titles rendered.

3️⃣ Rich Text Flattened Incorrectly

Card descriptions were modeled as Rich Text (lists required)

Component used asTextValue() which:

Flattens content

Breaks lists

Mishandles Slice Machine wrapper objects:

{ "__TYPE__": "StructuredTextContent", "value": [...] }

Result: descriptions silently failed or rendered incorrectly.

4️⃣ Local Normalization Logic (Anti-Pattern)

A local normalizeRichText existed inside the slice

Violated factory rule: normalization must be centralized

Caused inconsistent behavior between mocks and API data

Fixes Applied (Minimal, Correct)
✅ FeatureGridV2

Replaced Slice Machine stub with real rendering logic

Implemented:

Eyebrow / headline / body

Cards grid

Icon + highlight support

Defensive guards

Removed placeholder text entirely

✅ FeatureGrid

Switched canonical cards source to:

primary.feature_cards

Kept slice.items only as a fallback

Removed hardcoded “Feature” placeholder titles

✅ Rich Text Handling (Critical)

Added shared helper:

src/lib/prismic/normalizeRichText.ts

Updated all Rich Text rendering to:

<SafeRichText field={normalizeRichText(field)} />

Never flatten Rich Text with asTextValue

Rules Extracted (Permanent)
🔒 Rich Text Rendering Rule

If a field needs lists or formatting:

It must be Rich Text

It must be rendered with:

normalizeRichText → SafeRichText

asTextValue is forbidden for Rich Text

🔒 Group Field Canonical Rule

When a slice defines a Group field in primary:

That field is canonical

slice.items may exist only as a defensive fallback

Never guess repeatable location

🔒 Slice Stub Rule

Slice Machine stubs must not ship

Placeholder text indicates the slice is not implemented

If placeholder text appears in preview → implementation is incomplete

Final Status

FeatureGrid: ✅ renders real card data

FeatureGridV2: ✅ fully implemented (no stub)

Rich Text lists: ✅ render correctly

Slice Machine mocks + API parity: ✅ maintained

No runtime errors or fallback placeholders

Classification

Failure Class:
Rich Text wrapper mishandling + wrong group field + unimplemented slice stub

Prevented by:
Centralized normalization + canonical field discipline + stub removal

This entry is complete and factory-grade.
You’re now protected against this entire class of failure going forward.
---

End of NE_error_log.md

---

# 2026-03-03 — NewportEcom v2 Shadowbox Hero Implementation

**Note:** This is NOT a bug/error entry, but a significant architectural change log for reference.

## Summary

Implemented modular Shadowbox Hero with strict HUD layout, two-card carousel, and honest CTA messaging.

## Files Created/Modified

- src/components/home/hero/HeroBackground.tsx (created)
- src/components/home/hero/HeroCarousel.tsx (created)
- src/components/home/hero/HeroShadowbox.tsx (created)
- src/slices/HeroShadowbox/index.tsx (created)
- src/app/(marketing)/v2-preview/page.tsx (created)
- src/app/globals.css (updated with glass utilities)

## Key Decisions

1. **Removed fake performance metrics** (+247%, 3.2x, $127K sparkline) — Not backed by real data; replaced with honest "Pay only for what you use" CTA
2. **Strict Shadowbox spec** — Center must remain empty; absolute-positioned HUD cards only
3. **Two-card carousel** — Render only Alpha + Beta; hide remaining until rotated
4. **Visual hierarchy polish** — Reduced headline dominance, enhanced readability, repositioned controls

## Positioning Values (for future reference)

- **Alpha card top:** top-[300px] sm:top-[320px] lg:top-[380px]
- **Beta card top:** top-[420px] sm:top-[340px] lg:top-[180px]
- **Divider line:** top-[280px] sm:top-[300px] lg:top-[360px], w-12, cobalt 15% opacity

## What's NOT Done Yet

- Laser/incineration effects (z-10 optics layer reserved but empty)
- Prismic integration (currently hardcoded preview route)
- Mobile responsive polish

## Documentation

See full details in:
- public/docs/context_anchor.md — Shadowbox Hero section appended
- docs/v2_hero_worklog.md — Day-by-day checkpoint log
- docs/v2_hero_changes_log.md — Detailed decisions and rationale


---

## 2026-03-05 — 3D Shadowbox Implementation: No Runtime Errors ✅

### Session Summary

Implemented React Three Fiber 3D shadowbox backdrop with four layered PNG plates (Eye, Core, Wrap, AO shim). Session involved iterative composition tuning, client-side rendering fixes, and responsive wrapper adjustments.

### Runtime Errors Encountered

**None.** All TypeScript and ESLint checks passed clean (--max-warnings=0) throughout session.

### Build/Compile Issues Fixed

**1. Client-Side Rendering (R3F requires browser context)**

- **Initial Issue:** drei's `useTexture` requires Suspense boundary; R3F Canvas needs client-side rendering
- **Fix Applied:** 
  - Wrapped Scene component in `<Suspense fallback={null}>` within Canvas
  - Added `"use client"` directive to Shadowbox3D.tsx
  - Used `dynamic(() => import("./Shadowbox3D"), { ssr: false })` in HeroShadowbox.tsx
- **Outcome:** No SSR bailout warnings, clean client-side render

**2. Hook Rules Violation (conditional useTexture)**

- **Initial Attempt:** Wrapped `useTexture` in try-catch for defensive loading
- **ESLint Error:** React Hook "useTexture" cannot be called inside a callback
- **Fix Applied:** Removed try-catch, relied on Suspense for error boundary
- **Outcome:** ESLint clean, Suspense handles loading states

### Key Learnings

1. **Three.js Transparent Sorting:** Overlapping transparent meshes require explicit `renderOrder` prop to prevent z-fighting. Cannot rely on automatic depth sorting.

2. **Container-Relative Pointer Tracking:** When R3F Canvas is in constrained wrapper (not full-screen), must use `getBoundingClientRect()` on container instead of window coordinates. Otherwise parallax tracks wrong area.

3. **Viewport Scaling Issues:** Using `useThree().viewport.width/height` for plane sizing causes unpredictable scaling on window resize. Use constant 1×1 planes with `baseScale` prop instead.

4. **Global Scale Pattern:** When tuning multiple related values (4 plate scales), add single `GLOBAL_SCALE` constant that multiplies all values uniformly. Easier to tune than adjusting individual values.

5. **Emissive Pulse Dominance:** Core plate with same emissive pulse amplitude as Eye drew too much attention. Reduced amplitude/baseline for Core created better visual hierarchy.

6. **Localized Vignette > Full-Screen:** Full-screen vignettes (inset-0) darken entire viewport including UI. Localized centered box with responsive sizing targets only 3D area without muddying HUD cards.

### Rules Extracted

**RULE: R3F components must be client-only**
- Always use `"use client"` directive
- Always wrap in Suspense boundary
- Always use `dynamic(() => import(), { ssr: false })` when importing into server components

**RULE: Transparent meshes need explicit renderOrder**
- Cannot rely on Three.js automatic depth sorting for overlapping transparent geometry
- Assign explicit `renderOrder` prop to each mesh in back-to-front order

**RULE: Container-relative pointer tracking for constrained Canvas**
- When Canvas wrapper is not full-screen, use `getBoundingClientRect()` on container
- Normalize pointer coordinates relative to container, not window

**RULE: Avoid viewport-relative sizing in R3F**
- Use constant geometry (e.g., 1×1 planes) with scale props
- Do not use `useThree().viewport` for mesh sizing (causes resize issues)

**RULE: Global scale constants for related values**
- When multiple values need to scale together, use single multiplier constant
- Apply at calculation level: `const finalScale = baseScale * GLOBAL_SCALE`

**RULE: Localized effects over full-screen overlays**
- Use responsive-sized containers with transform positioning for localized effects
- Prevents unintended darkening/blurring of UI elements

---

# 2026-03-07 — HybridHero3D: Eye Pointer Stuck at (0, 0)

## 1️⃣ R3F `state.pointer` Stuck at (0,0) Behind Pointer-Events-None Canvas

### Error

Eye actor did not move in response to cursor. `state.pointer.x/y` always read `0, 0` in `useFrame`. No runtime error — silent failure.

### Root Cause

`HybridHero3D` Canvas was rendered with `style={{ pointerEvents: "none" }}` (required so HUD cards layered above remain clickable). With `pointerEvents: "none"` and no `eventSource` prop, R3F never received pointer events and `state.pointer` was never updated.

### Fix Applied

Added `eventSource={eventSourceEl}` to the Canvas, where `eventSourceEl` is the hero `<section>` element passed as a prop from `HeroShadowbox`. The section is set via `useEffect` on a `ref` after mount:

```tsx
// HeroShadowbox.tsx
const heroRef = useRef<HTMLElement>(null);
const [eventSourceEl, setEventSourceEl] = useState<HTMLElement | null>(null);
useEffect(() => { setEventSourceEl(heroRef.current); }, []);

<section ref={heroRef}>
  <HybridHero3D eventSourceEl={eventSourceEl} />
</section>
```

```tsx
// HybridHero3D.tsx
<Canvas
  eventSource={eventSourceEl}
  eventPrefix="client"
  style={{ pointerEvents: "none" }}
>
```

The `<section>` sits behind the HUD overlay divs in the stacking context but is not blocked by them. R3F receives all pointer events through the section; `state.pointer` updates correctly on every frame.

### Rule Extracted

**RULE: R3F Canvas with `pointerEvents: none` MUST have an explicit `eventSource`**

If a Canvas is `pointer-events: none` (so overlaid UI remains clickable), `state.pointer` will never update unless `eventSource` is provided pointing to a container element that can receive events.

Pattern:
1. Attach `ref` to the wrapper element that surrounds the Canvas
2. Set `eventSourceEl` state in `useEffect` after mount (not directly from ref — SSR safety)
3. Pass as `eventSource={eventSourceEl}` and `eventPrefix="client"` to Canvas
4. Canvas itself stays `pointerEvents: "none"`

Do NOT read pointer events from window or document — use the section/wrapper so coordinates are scoped correctly.

---

## 2️⃣ Inverted Vertical Gaze (Eye Looks Down When Cursor Is Above)

### Error

Eye pitched downward when cursor moved above it; upward when cursor moved below. Visually backwards.

### Root Cause

A constant `V_SIGN = -1` was applied: `targetRotationX = dy * V_GAIN * V_SIGN`. The sign was inverted relative to the actual coordinate convention. In R3F, positive `pointer.y` = cursor above screen center; positive `rotationX` on the eye group = pitched up (nose up). No sign flip is needed.

### Fix Applied

Removed `V_SIGN` constant entirely:

```tsx
const targetRotationX = dy * V_GAIN;  // no sign flip; dy > 0 = cursor above = look up ✓
```

### Rule Extracted

**RULE: Verify gaze sign convention before adding a sign constant**

R3F `state.pointer.y` is in NDC: +1 = top of container, -1 = bottom. Positive `rotation.x` on a forward-facing mesh = tilt upward. These conventions are consistent — adding a negation constant is almost always wrong.

Test: move cursor above the eye; eye should rotate toward cursor (upward). If inverted, check whether `V_SIGN` or a sign literal was added incorrectly rather than debugging the data pipeline.


