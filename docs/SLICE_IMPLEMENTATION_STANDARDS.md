# SLICE_IMPLEMENTATION_STANDARDS.md

**Newport Slice System — Implementation Standard**
**Status: Canonical | Version: 1.0 | Date: 2026-03-02**

---

## Purpose

This document formalises the implementation requirements for every slice in the Newport Slice System. Compliance is not optional. A slice that does not meet these standards does not belong in the library.

---

## 1. Required Control Block — Order and Placement

Every slice `primary` object must begin with these fields, in this exact order, before any content fields:

1. `is_enabled` — Boolean
2. `visual_mode` — Select
3. `section_padding` — Select
4. `container_width` — Select

Refer to `UNIVERSAL_SLICE_CONTROL_SCHEMA.md` for full field definitions and permitted enum values.

Deviating from this order requires an architectural decision record.

---

## 2. Hard Rules

### 2.1 No Nested Groups

Slice Machine v2 does not support Group fields nested inside other Group fields. All Group fields must be flat and placed directly inside `primary`. The `items` key at the variation root must remain `{}` (empty).

When grid-like content is needed inside a tab or card (e.g. TabsSection grid mode), use Rich Text blocks styled via CSS — not nested Groups.

### 2.2 SafeRichText Only

Rich Text fields must never be rendered directly. They must always pass through:

1. `normalizeRichText(field)` — from `src/lib/prismic/normalizeRichText.ts`
2. `<SafeRichText field={...} />` — from `src/components/prismic/SafeRichText.tsx`

`PrismicRichText` must not be imported inside any slice file. No exceptions.

### 2.3 Enum-Driven Variability Only

All layout, visual, spacing, and density variations must be expressed as Select enum fields. The slice component reads the enum via `asEnumValue()` and maps it to a fixed Tailwind class or behaviour.

Permitted variability axes and their field names:
- Layout: `visual_mode`, `section_padding`, `container_width`, `layout_mode`
- Alignment: `align_mode`
- Density: `density_mode`
- Animation: `animation_mode`
- Style: `tabs_style`, `connector_mode`, `number_style`, etc.

### 2.4 No Free-Text Styling Controls

No field of any type may accept CSS class names, Tailwind utilities, hex colours, or any style tokens as authored content. Style is resolved at render time from approved enum values.

### 2.5 Layout-Only Slices

Slices do not:
- Fetch data
- Access the router
- Manage global state
- Communicate with other slices
- Accept props beyond `slice`

### 2.6 Lint Clean Required

Every slice must pass `eslint --max-warnings=0` before being committed. A slice that introduces lint warnings or errors does not ship.

---

## 3. Defensive Rendering Standards

A slice must never crash the page. The following practices are mandatory:

### 3.1 Kill Switch

The first logic in every slice component must be:

```tsx
const isEnabled = primary?.is_enabled !== false;
if (!isEnabled) return null;
```

### 3.2 Array Guards

All repeatable Group fields must be guarded before iteration:

```tsx
const items = Array.isArray(primary?.items) ? primary.items : [];
```

Never call `.map()` or `.length` on an unguarded field.

### 3.3 Slice Machine Wrapper Awareness

Slice Machine v2 mocks wrap fields as:

```json
{ "__TYPE__": "FieldContent", "value": "..." }
```

All rendering helpers (`asTextValue`, `asEnumValue`, `normalizeRichText`) must detect and unwrap this shape. Never render wrapper objects directly. Never assume mock shape equals API shape.

### 3.4 Null Rendering

Fields that resolve to empty string, null, or empty array must not render their container elements. Use explicit null returns:

```tsx
{headline ? <h2>{headline}</h2> : null}
```

Do not render empty `<div>` or `<p>` wrappers.

### 3.5 Key Stability

When rendering repeatable items, keys must be stable and unique. Prefer:

```tsx
const key = title ? `${title}-${index}` : `item-${index}`;
```

Never use `Math.random()` as a key.

---

## 4. Field Type Boundary

| Field Type | Rendering Rule |
|---|---|
| Key Text | `asTextValue()` — returns plain string |
| Rich Text | `normalizeRichText()` → `<SafeRichText />` |
| Select / Enum | `asEnumValue()` — returns normalised string |
| Boolean | Direct conditional (`!== false`) |
| Number | `asNumberValue()` or direct cast |
| Link | `<PrismicNextLink />` |
| Image | `<PrismicNextImage />` |

Headlines must always be Key Text (`type: "Text"` in model). Never model a headline as Rich Text.

---

## 5. Headline Contrast Rule

Headline elements must be readable in both Slice Machine (light background) and the deployed site (dark mode):

```tsx
className="... text-slate-900 dark:text-slate-100 ..."
```

`text-white` alone is not permitted for headlines.

---

## 6. Helpers — Source of Truth

| Helper | Location |
|---|---|
| `normalizeRichText` | `src/lib/prismic/normalizeRichText.ts` |
| `asTextValue` | Defined locally in each slice (pending centralisation) |
| `asEnumValue` | `asEnumValue.ts` (root) |
| `SafeRichText` | `src/components/prismic/SafeRichText.tsx` |

Local copies of `normalizeRichText` are forbidden. The shared helper is the only permitted implementation.

---

## 7. Mock Discipline

`mocks.json` must:
- Contain realistic copy (no lorem ipsum)
- Have `is_enabled: true`
- Include all required control fields at valid enum values
- Cover at least one non-default visual mode (e.g. `gradient_orb` or `helix_3d`)
- Include at least one Rich Text field with a list to validate list rendering

Mocks are design contracts, not throwaway data.

---

*A slice that violates any rule in this document does not belong in the library. There are no exceptions.*
