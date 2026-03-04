# AI_BOOTSTRAP

Purpose: Rapid context loader for AI assistants and engineers starting a change in this repo.
Keep this short — it is a mental map, not full documentation.

## Project at a glance
- Name: Newport Slice System
- Goal: Reusable, slice-driven UI factory that powers marketing sites and the HelixFlow SaaS platform.
- Key idea: Pages are assembled from modular Slices stored under `src/slices/` and authored via Prismic.

## Tech stack (quick)
- Frontend: Next.js (App Router), TypeScript, TailwindCSS, Framer Motion, Three.js / React Three Fiber
- CMS: Prismic + Slice Machine v2
- Backend: Supabase (multi-tenant via RLS)
- Deployment: Docker, Coolify, self-hosted VPS cluster

## Slice philosophy (short)
- Everything is modular. Build slices, then compose pages.
- Slices are layout-only: no data fetching, no router use, no hardcoded marketing copy.
- All editable content comes from Prismic; components read `slice.primary` (and guarded Group fields).
- Slices must be reusable across verticals and tenants.

## Universal control fields (each slice must support)
- is_enabled (Boolean) — kill-switch; must be checked first.
- visual_mode (Select) — none | gradient_orb | helix_3d
- container_width (Select) — standard | wide | full
- section_padding (Select) — none | sm | md | lg
- align_mode (Select) — left | center
- density_mode (Select) — relaxed | compact
- animation_mode (Select) — none | fade_in | slide_up | stagger

These fields drive consistent layout, spacing and decorative variants across the library.

## Slice file layout (per slice)
Each slice lives in `src/slices/<SliceName>/` and contains:
- `index.tsx` — React component (use `"use client"` only when state is required)
- `model.json` — Slice Machine v2 model (controls first in `primary`)
- `mocks.json` — realistic mocks (no lorem, include lists)
- `screenshot.png` — visual reference

Naming conventions:
- Slice Name: PascalCase (directory `SectionIntro`)
- Slice ID and field IDs: snake_case
- Variations: kebab-case or snake_case

## Implementation primitives (helpers)
- `src/components/prismic/SafeRichText.tsx` — render Rich Text only via this
- `src/lib/prismic/normalizeRichText.ts` — unwrap slice-machine mock shapes
- `asEnumValue` (root) — normalize Select values
- `asTextValue` — safe Key Text extraction (local helper allowed)

Rendering rules (mandatory):
- Key Text → `asTextValue()`
- Rich Text → `normalizeRichText()` → `<SafeRichText />`
- Selects → `asEnumValue()`
- Booleans → `primary?.flag !== false`
- Guard all repeatables: `Array.isArray(primary?.items) ? primary.items : []`

## Architecture model (one-line)
Content Layer → Prismic
Logic / Rendering → Next.js + Slices
Data Layer → Supabase (RLS)
Deployment → Docker / Coolify on VPS

This same slice library powers marketing sites, SaaS dashboards and client portals via configuration, not per-client code forks.

## Development method (slices-first)
1. Define slice purpose and fields
2. Add/validate `model.json` (controls first)
3. Implement `index.tsx` (kill-switch first, defensive guards)
4. Add `mocks.json` (realistic, lists included)
5. Add `screenshot.png`
6. Register slice in `src/slices/index.ts` if needed
7. Test in slice simulator and run lint: `npx eslint src --max-warnings=0`
8. Update docs and push

Follow the repository's `docs/SLICE_FACTORY_WORKFLOW.md` for exact steps and QA checklist.

## Quick behavior checklist for AI helpers
- Always read `docs/AI_rules.md` and `docs/UNIVERSAL_SLICE_CONTROL_SCHEMA.md` before changing models/components.
- Do not introduce nested Group fields (Slice Machine v2 limitation).
- Preserve minimal-diff philosophy: smallest, targeted edits only.
- Do not add new global CSS utilities. Prefer Tailwind and existing glass utilities.
- If a change touches architecture (models, control schema, multi-tenant behavior), ask for confirmation.

## Where to look first (entry points)
- `src/slices/` — all slice implementations
- `src/app/page.tsx` — homepage assembly and SliceZone usage
- `src/lib/prismic/` — normalize helpers
- `src/components/prismic/` — SafeRichText, links, images
- `public/docs/` & `docs/` — governance, schemas, and workflows

## Final note
Keep changes atomic, documented, and reversible. Documentation is part of the artifact — update `public/docs/slice_library_index.md` and `public/docs/context_anchor.md` when implementing slices.

End of bootstrap.
