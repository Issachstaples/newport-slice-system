# hero-effects.md — HybridHero3D VFX Reference

**Project:** Newport Slice System  
**Component:** `src/components/home/hero/HybridHero3D.tsx`  
**Status:** Active — DiodeEmitter anchor wired; laser/spark burst pending  
**Last Updated:** 2026-03-07  
**Commits:** `47dbc16` · `e23bbd4`

---

## Overview

`HybridHero3D` is a React Three Fiber Canvas mounted inside `HeroShadowbox` at z-10 (behind the HUD UI at z-20). It renders a single backdrop PNG (`/public/images/home/neon-eye-clean.png`) plus a layered VFX stack over an R3F eye actor. The Canvas is `pointer-events: none` and receives input via `eventSource` on the parent `<section>` element.

---

## VFX Layer Stack

Layers listed front-to-back (highest renderOrder first):

| Layer | Component / Mesh | renderOrder | Description |
|---|---|---|---|
| Glints | `glint1Ref`, `glint2Ref` inside `EyeActor` | 45 | Parallax glass glints; slide counter to gaze direction |
| Glass lens | mesh inside `EyeActor` | 44 | `meshPhysicalMaterial`, `transmission=0.94`, `opacity=0.11` |
| Pupil | `pupilRef` inside `EyeActor` | 43 | Translates in local eye space tracking dx/dy |
| Iris | `irisRef` inside `EyeActor` | 42 | Proximity-reactive `emissiveIntensity`; `emissive="#1d6eff"` |
| Inner lip torus | mesh inside `EyeActor` | 41 | Two-step barrel depth |
| Outer housing torus | mesh inside `EyeActor` | 40 | Base renderOrder for eye group |
| Orbital sparks | `OrbitalSparks` | 38 | 12 particles orbit eye; proximity-driven brightness |
| Ripple rings | `RipplePulse` | 37 | 2 expanding rings; proximity-driven speed + opacity |
| Glow halo | mesh inside `EyeActor` | 39 | Soft emissive disc behind housing |
| Always-on aura | `auraRef` (scene sibling) | 38 | Large soft disc at eye world position; slow pulse |
| DiodeEmitter | `DiodeEmitter` | 20–21 | Halo + core at `[EMIT_X, EMIT_Y, EMIT_Z]` |
| Backdrop plane | `Plane` (neon-eye-clean) | 10 | Static, no parallax, `tint="#ffffff"`, `opacity=1` |
| AO shim | `Plane` (wrap texture) | 15 | Black `opacity=0.22`, `alphaTest=0.02` |
| Cradle | `Plane` (wrap texture) | 30 | Foreground basin rim |

---

## DiodeEmitter — Anchor for Future Laser VFX

### Current State

A visible halo + core glow positioned at the top of the central diode on the backdrop image. Acts as the visual anchor and world-space origin for beam/spark effects.

```tsx
const EMIT_X =  0.04;   // slight right of center
const EMIT_Y =  0.02;   // slightly above scene center
const EMIT_Z = -0.50;   // backdrop is at -0.53; emitter sits just in front
```

**Meshes:**
- Halo: `r=0.12`, `color="#7ec8ff"`, `opacity=0.18` (proximity-independent breathing pulse)
- Core: `r=0.018`, `color="#cce8ff"`, `opacity=0.95`
- Pulse: `Math.sin(t * 1.4) * 0.2 + 0.8` — 0.6→1.0 oscillation

**Debug flag:** `DEBUG_EMITTER = false` — when `true`, adds `AxesHelper(0.05)` at emitter position for alignment tuning.

### Planned VFX (not yet implemented)

1. **Laser beam** — thin line/tube from `[EMIT_X, EMIT_Y, EMIT_Z]` toward eye position; opacity pulses; triggered on proximity threshold.
2. **Spark burst** — `OrbitalSparks`-style particles ejected from emitter on beam-fire event; velocity field biased toward eye.
3. **Scan ripple** — additional `RipplePulse`-origin at emitter position; different ring color (`#ff6a00`?) to distinguish from eye ripple.

**Implementation note:** DiodeEmitter world coordinates must be kept in sync with the backdrop image diode position. If the backdrop image is replaced, re-tune `EMIT_X/Y/Z` using `DEBUG_EMITTER = true`.

---

## Eye Actor — Gaze + Pupil Pipeline

### Coordinate conventions

- `state.pointer.x/y` — NDC, `[-1, 1]`, `+y` = top of container
- `dx = clamp(px - eyeNdc.x, -0.5, 0.5)` — horizontal offset of cursor from eye center
- `dy = clamp(py - eyeNdc.y, -0.5, 0.5)` — vertical offset
- Deadzone: `|dx| < 0.03` or `|dy| < 0.03` → zero (prevents micro-jitter when cursor is on eye)

### Gaze rotation

```tsx
const H_GAIN = 0.18;  // radians per NDC unit (horizontal)
const V_GAIN = 0.16;  // radians per NDC unit (vertical)

targetRotationY = dx * H_GAIN;   // positive dx (cursor right) → eye looks right
targetRotationX = dy * V_GAIN;   // positive dy (cursor above) → eye looks up
```

Damped with `THREE.MathUtils.damp(current, target, 5, delta)`.

### Pupil translation

Pupil mesh translates in local eye group space (not scene space):

```tsx
const PUPIL_GAIN_X = 0.38;
const PUPIL_GAIN_Y = 0.38;
const PUPIL_MAX    = 0.44;  // clamp — pupil stays inside iris (r=0.76)
```

Damped with factor `7` (faster than gaze for responsive feel).

### Iris proximity glow

```tsx
const PROX_NEAR    = 0.08;   // NDC distance — "very close"
const PROX_FAR     = 0.60;   // NDC distance — "far away"
const BASE_EMISSIVE = 0.26;
const BOOST_EMISSIVE = 0.50;

const t = clamp((FAR - dist) / (FAR - NEAR), 0, 1);
const proximity = t*t*(3-2*t);  // smoothstep
emissiveIntensity = BASE_EMISSIVE + proximity * BOOST_EMISSIVE + sin(t*0.8)*0.04;
```

Uses raw `(px - eyeNdc.x, py - eyeNdc.y)` distance (no deadzone) so center cursor still triggers max glow.

---

## Shared Proximity Helper

```tsx
const PROX_NEAR = 0.08;
const PROX_FAR  = 0.60;

function eyeProximity(px: number, py: number): number {
    const dx = px - SPARK_CX;  // SPARK_CX ≈ eye NDC x
    const dy = py - SPARK_CY;  // SPARK_CY ≈ eye NDC y
    const dist = Math.sqrt(dx*dx + dy*dy);
    const t = clamp((PROX_FAR - dist) / (PROX_FAR - PROX_NEAR), 0, 1);
    return t*t*(3-2*t);
}
```

Used by `OrbitalSparks` (speed + brightness) and `RipplePulse` (speed + opacity). `EyeActor` has its own inline version using eye NDC projection instead of `SPARK_CX/CY` constants.

---

## Rejected Effects

| Effect | Reason rejected |
|---|---|
| Lens flare (`THREE.Lensflare` or sprite) | Too noisy at eye scale (0.09); competed with iris glow; glass read achieved by glint parallax instead |
| Full-screen bloom (postprocessing) | Added `@react-three/postprocessing` dependency; produced color bleeding on HUD cards at z-20; deferred |
| Camera parallax (move camera vs. meshes) | Causes entire scene to shift including UI anchor points; per-mesh parallax preferred |

---

## Debug Flags

All are `false` at ship. Set to `true` only during tuning sessions.

```tsx
const DEBUG_EYE_AXES  = false;  // AxesHelper(8) on eye group — shows XYZ orientation
const DEBUG_GAZE_HUD  = false;  // HTML overlay with live dx/dy/rotation values + NDC cyan dot
const DEBUG_EMITTER   = false;  // AxesHelper(0.05) at [EMIT_X, EMIT_Y, EMIT_Z]
```

In `HeroShadowbox.tsx`:
```tsx
const DEBUG_NO_OVERLAYS = true;  // ← set false before production; suppresses vignette + exposure-lift
```

---

## File Map

```
src/components/home/hero/
├── HybridHero3D.tsx     — R3F Canvas + all VFX components (EyeActor, OrbitalSparks, RipplePulse, DiodeEmitter)
├── HeroShadowbox.tsx    — eventSource wiring (heroRef + useEffect); DEBUG_NO_OVERLAYS
├── HeroCarousel.tsx     — click-to-select alpha/beta cards; aria-pressed; empty guard
public/images/home/
└── neon-eye-clean.png   — backdrop asset (source of truth for EMIT_X/Y/Z alignment)
```
