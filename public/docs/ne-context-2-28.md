Newport Slice System — Error Context Anchor (2026-02-28)
Project

Goal: Build a reusable Prismic slice library for SaaS + agency sites (Newport / HelixFlow)

Stack:

Next.js (App Router)

Tailwind v4

Prismic Slice Machine v2

Design system: Apple-style liquid glass, SaaS-dense, reuse-first

Confirmed Working (DO NOT RE-DEBUG)

Tailwind v4 globals are correct:

@import "tailwindcss";

Custom utilities live inside @layer utilities

Global glass utilities restored:

.glass-frost, .glass-rim, .glass-chip, .glass-sheen

.glass-orb, .glass-helix

.pulse-dot

Prismic select enums normalized across slices:

none

gradient_orb

helix_3d

Defensive enum normalization in code:

String(primary.visual_mode ?? "none").replace(/-/g, "_")

BentoGrid runtime crash fixed:

Mapping repeatables via slice.items, not slice.primary.cards

Fixes documented in:

ne-2-28fix1.md

Current Problem State (ACTIVE)

Page / throws a client-side runtime exception

Error surfaced after:

Rendering FeatureGrid on the page

Adding page-level backdrop layers

Issue is not Tailwind, not CSS, not enum mismatch

Identified Root Cause (Partial Fix Applied)

Slice Machine mocks wrap rich text as:

{ "__TYPE__": "StructuredTextContent", "value": [...] }

PrismicRichText expects the array, not the wrapper

FeatureGrid was crashing by passing the wrapper object

Fix applied in FeatureGrid/index.tsx
const bodyField = Array.isArray(primary.body)
  ? primary.body
  : primary.body?.value;
<PrismicRichText field={bodyField} />

This fix is correct and should remain

Suspected Remaining Issues

HeroSystem likely still passes mock rich text wrappers directly into PrismicRichText

Possibly other slices using PrismicRichText without .value unwrapping

Need to isolate by disabling slices one by one

Current Slice Inventory

HeroSystem ⚠️ (suspected rich text issue)

BentoGrid ✅ (items mapping fixed)

FeatureGrid ⚠️ (rich text fix applied, needs verification)

CtaSection (not yet validated in error state)

Debug Strategy Going Forward

Isolate crash by disabling slices

Apply same rich text unwrap pattern to HeroSystem (and others)

Re-enable slices incrementally

Confirm / renders cleanly

Only then resume visual polish

Rules Going Forward

NEVER pass mock rich text wrappers directly to PrismicRichText

Always normalize enums defensively

Variants = slice variations only (no primary.variants)

Document confirmed fixes separately from WIP
