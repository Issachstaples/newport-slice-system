# Slice Library Index

Newport Slice System — Canonical Slice Inventory
Last Updated: 2026-03-02

All slices are layout-only, lint-clean, and compliant with `UNIVERSAL_SLICE_CONTROL_SCHEMA.md`.

Status key: ✅ Implemented | 🔲 Planned

---

## 1️⃣ Structural / Foundation Slices

Core primitives present on nearly every deployment.

| # | Slice | Status | Description |
|---|-------|--------|-------------|
| 1 | **HeroSystem** | ✅ | Above-the-fold hero with visual modes, badge, dual CTA, and split/centered/dashboard variations. |
| 2 | **SectionIntro** | ✅ | Headline + Rich Text section framing with universal layout controls. |
| 3 | **BentoGrid** | ✅ | Asymmetric feature grid with configurable card count, icons, and highlight support. |

---

## 2️⃣ Content / Feature Slices

Reusable mid-page modules for communicating value and features.

| # | Slice | Status | Description |
|---|-------|--------|-------------|
| 4 | **FeatureGrid** | ✅ | Icon + title + description card grid; reads from `primary.feature_cards` Group field. |
| 5 | **FeatureGridV2** | ✅ | Enhanced feature card grid with icon mapping, highlight support, and visual mode decorators. |
| 6 | **IconList** | ✅ | Vertically stacked icon rows with title, badge, Rich Text description, and per-row highlight. |
| 7 | **StepsTimeline** | ✅ | Numbered or icon-driven step sequence with vertical/horizontal layout, connector modes, and animation. |

---

## 3️⃣ Conversion Slices

High-intent modules optimised for lead capture, demo booking, and checkout.

| # | Slice | Status | Description |
|---|-------|--------|-------------|
| 8 | **CtaSection** | ✅ | Conversion block with centered/split/inline/minimal variations and dual CTA support. |

---

## 4️⃣ Interactive Slices

Client-rendered slices requiring `"use client"` and local state.

| # | Slice | Status | Description |
|---|-------|--------|-------------|
| 9 | **TabsSection** | ✅ | Tab switcher with pills/underline/cards styles, panel/grid content modes, and per-tab Rich Text bodies. |

---

## 5️⃣ Planned Slices (Roadmap)

| # | Slice | Status | Description |
|---|-------|--------|-------------|
| 10 | **PricingTable** | 🔲 | Tier comparison grid with recommended plan highlight and monthly/annual toggle. |
| 11 | **TestimonialsCarousel** | 🔲 | Quote + avatar + company cards with optional auto-rotate. |
| 12 | **LogoCloud** | 🔲 | Client logo grid with grayscale, glass-card, and marquee variants. |
| 13 | **StatsStrip** | 🔲 | Metric counters in static or animated mode. |
| 14 | **ProductShowcase** | 🔲 | Large image + feature bullets with CTA cluster and optional price display. |
| 15 | **ComparisonTable** | 🔲 | Feature comparison matrix with category toggle for competitive positioning. |
| 16 | **BlogFeedGrid** | 🔲 | Page-level data fed card grid for blog/content archive pages. |
| 17 | **Divider / SpacerSlice** | 🔲 | Controlled whitespace slice for layout composability. |

---

## Architectural Notes

- All implemented slices include the **required control block** (`is_enabled`, `visual_mode`, `section_padding`, `container_width`) per `UNIVERSAL_SLICE_CONTROL_SCHEMA.md`.
- **TabsSection** uses Rich Text blocks rendered as a CSS grid (`content_style: grid`) rather than nested Group fields, due to Slice Machine v2 not supporting nested groups.
- All Group fields are canonical in `primary` (not in `items`), per factory standard.
- `items: {}` is left empty at the variation root for all slices.
- All slices are lint-clean at time of implementation (ESLint exit 0).

---

*This file is the authoritative slice inventory. Update it whenever a slice is implemented, deprecated, or structurally changed.*
