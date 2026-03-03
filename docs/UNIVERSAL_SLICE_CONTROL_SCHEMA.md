# UNIVERSAL SLICE CONTROL SCHEMA

**Newport Slice System — Governing Standard**
**Status: Canonical | Version: 1.0 | Date: 2026-03-02**

---

## Purpose

This document defines the universal control field schema that governs all Prismic Slice Machine v2 slices in the Newport Slice System. Every slice produced within this system — regardless of content type, layout purpose, or variation count — must conform to the standards defined here.

This is not a guide. It is a contract.

---

## Required Control Block

Every slice must include the following fields in the `primary` object. These fields must appear at the top of `primary`, before any content fields, in the order listed below.

Deviation from this block requires an explicit architectural decision and documented override.

---

### `is_enabled`

| Property | Value |
|---|---|
| **Field ID** | `is_enabled` |
| **Field Type** | Boolean |
| **Default** | `true` |
| **Purpose** | Gates the rendering of the entire slice. When `false`, the slice must not render. This is the system-level kill switch and is not a preview or draft toggle. |

---

### `visual_mode`

| Property | Value |
|---|---|
| **Field ID** | `visual_mode` |
| **Field Type** | Select |
| **Options** | `none` \| `gradient_orb` \| `helix_3d` |
| **Default** | `none` |
| **Purpose** | Drives the background and decorative visual treatment of the section. The slice component reads this enum and applies a predetermined visual layer. No raw style values are accepted. |

---

### `section_padding`

| Property | Value |
|---|---|
| **Field ID** | `section_padding` |
| **Field Type** | Select |
| **Options** | `none` \| `sm` \| `md` \| `lg` |
| **Default** | `md` |
| **Purpose** | Controls the vertical padding applied to the section wrapper. Maps to a fixed spacing scale. Slices do not define their own padding outside of this enum. |

---

### `container_width`

| Property | Value |
|---|---|
| **Field ID** | `container_width` |
| **Field Type** | Select |
| **Options** | `standard` \| `wide` \| `full` |
| **Default** | `standard` |
| **Purpose** | Controls the maximum width of the content container within the section. Maps to a fixed width scale in the design system. Slices do not define their own max-width logic. |

---

## Optional Standardized Control Block

The following fields are approved for use across slices but are not universally required. When included, they must conform exactly to the definitions below. Enum values must not be modified, extended, or aliased on a per-slice basis.

---

### `background_tone`

| Property | Value |
|---|---|
| **Field ID** | `background_tone` |
| **Field Type** | Select |
| **Options** | `default` \| `subtle` \| `elevated` \| `inverted` |
| **Purpose** | Defines the surface tone of the section background, independent of visual mode. Maps to design token layers. Used when visual differentiation between adjacent sections is required. |

---

### `animation_mode`

| Property | Value |
|---|---|
| **Field ID** | `animation_mode` |
| **Field Type** | Select |
| **Options** | `none` \| `fade_in` \| `slide_up` \| `stagger` |
| **Purpose** | Controls the entrance animation applied to the section's primary content block. Animation behavior for each value is defined at the system level and must not be customized per slice. |

---

### `density_mode`

| Property | Value |
|---|---|
| **Field ID** | `density_mode` |
| **Field Type** | Select |
| **Options** | `relaxed` \| `compact` |
| **Purpose** | Controls the internal spacing density between child elements within the slice (e.g., card gaps, list spacing). Does not affect the section wrapper padding, which is governed by `section_padding`. |

---

### `align_mode`

| Property | Value |
|---|---|
| **Field ID** | `align_mode` |
| **Field Type** | Select |
| **Options** | `left` \| `center` |
| **Purpose** | Controls the horizontal alignment of the primary content block (headline, body, CTA cluster). Applies to the content axis only. Grid and card layout alignment is governed separately. |

---

## Global Restrictions

The following restrictions apply to all slices in the Newport Slice System without exception:

1. **No free-text style controls.** No field of type `Text` or `StructuredText` may be used to encode style, layout, or visual behavior. Style is always enum-driven.

2. **No arbitrary enum creation per slice.** New Select fields must use only values defined in this document or in an approved architectural extension. Inventing per-slice enum vocabularies is prohibited.

3. **No raw className fields in the CMS.** No field — under any name — may accept raw CSS class names, Tailwind utility strings, or any other style tokens as authored content.

4. **No layout logic hardcoded in slices.** Slices do not own their layout dimensions, spacing, or container constraints. These are resolved at render time by reading the approved control fields.

5. **All layout variability must be enum-driven.** Any dimension of layout that varies between slice instances — padding, width, density, alignment, visual treatment — must be expressed through an approved Select field mapped to a fixed design system scale.

---

## Implementation Rule

The following rules govern how control fields are implemented in slice components:

1. **All slices must include the required control block in `primary`.** There are no exceptions for content-only slices, hero sections, or decorative slices.

2. **Required controls must be placed at the top of `primary`.** Content fields — headline, body, CTA, repeatable groups — follow after all control fields. This ordering is enforced at the model level.

3. **All field IDs must use `snake_case`.** No camelCase, kebab-case, or PascalCase field IDs are permitted in any slice model.

4. **No deviation without an architectural decision.** Any modification to this schema — adding a required field, changing an enum set, removing a control — requires a documented architectural decision record (ADR) and must be applied uniformly across all affected slices.
