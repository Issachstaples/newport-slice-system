# AI_rules.md — Newport Slice System & HelixFlow

Last Updated: 2026-02-28
Applies to: Entire repository
Authority Level: Non-negotiable

If code conflicts with this document, **this document wins.**

---

# 1. Core Philosophy

This system is a:

* Config-driven SaaS architecture
* Multi-tenant Next.js platform
* Prismic slice factory
* Defensive rendering environment

Guiding principles:

* Slices are layout-only
* Data normalization is centralized
* Never assume Prismic data shape
* Defensive rendering is mandatory
* Reuse > cleverness
* Factory > playground
* Minimal diffs > sweeping refactors

---

# 2. Slice Architecture Rules (Hard Constraints)

## 2.1 Slices Must

* Accept `slice` only
* Never fetch data
* Never know about pages
* Never access router
* Never hardcode copy (except safe fallbacks)

Correct:

```tsx
slice.primary.headline
```

Forbidden:

```tsx
"Build once. Operate everything."
```

---

# 3. Rendering Rules by Field Type

| Prismic Field | Required Rendering     |
| ------------- | ---------------------- |
| Rich Text     | `<SafeRichText />`     |
| Key Text      | `asTextValue()`        |
| Select / Enum | `asEnumValue()`        |
| Boolean       | direct conditional     |
| Number        | direct render          |
| Image         | `<PrismicNextImage />` |
| Link          | `<PrismicNextLink />`  |

If unsure → assume Rich Text.

---

# 4. Absolute Forbidden Patterns

❌ Rendering Rich Text directly:

```tsx
<h2>{primary.headline}</h2>
```

❌ Importing `PrismicRichText` inside slices

❌ Using `any` to silence shape uncertainty

❌ Assuming mocks === API shape

❌ Reading repeatables without guards

❌ Inline normalization logic inside slice components

❌ Moving files or refactoring architecture unless explicitly requested

---

# 5. Required Helpers (Mandatory)

All slices MUST use:

* `SafeRichText`
* `asTextValue`
* `asEnumValue`

Helpers must live under:

```
src/lib/prismic/
```

Normalization must never be duplicated inline.

---

# 6. Repeatable Fields Rule (Critical)

Prismic repeatables may exist in two places:

### A) Slice-level repeatables

```ts
slice.items
```

### B) Group field inside primary

```ts
slice.primary.cards
```

Never assume array shape.

Always guard:

```ts
const cards = Array.isArray(slice.primary.cards)
  ? slice.primary.cards
  : [];
```

Factory standard:
If `cards` exists in model, treat `slice.primary.cards` as canonical.

---

# 7. Slice Machine Wrapper Rule

Slice Machine v2 may wrap fields as:

```json
{ "__TYPE__": "...", "value": ... }
```

All rendering must:

* Detect wrapper objects
* Extract `.value`
* Support both mock + API shapes

Never render wrapper objects directly.

---

# 8. Text vs Rich Text Boundary Rule

UI text and content text are different.

## Key Text / UI Controls (Use `asTextValue`)

* CTA labels
* Badge text
* Toggle labels
* Visual mode
* Enum values

## Rich Text (Use `SafeRichText`)

* Body copy
* Subheadline
* Descriptive paragraphs

🚫 Never use Rich Text for headlines in system slices.

---

# 9. Naming & Structure Rules

Folder structure:

```
src/slices/
  HeroSystem/
    index.tsx
    model.json
    mocks.json
    screenshot.png
```

Naming conventions:

| Item       | Rule           |
| ---------- | -------------- |
| Slice Name | PascalCase     |
| Slice ID   | snake_case     |
| Field IDs  | snake_case     |
| Variants   | kebab or snake |

Never break naming alignment.

---

# 10. Control Field Requirements

Every system slice must include:

* At least 1 Boolean
* At least 1 Select

Example:

```json
badge_enabled
visual_mode
```

These are design toggles, not content.

---

# 11. Visual Mode Standard

Allowed enum values:

* none
* gradient_orb
* helix_3d

Never invent new naming patterns casually.

Rendering must branch cleanly:

```ts
if (visualMode === "gradient_orb") { ... }
```

Visual logic must never pollute layout logic.

---

# 12. Styling Rules (Liquid Glass System)

Reusable glass utilities live in:

```
globals.css
```

Examples:

* .glass-frost
* .glass-rim
* .pulse-dot

🚫 Never inline complex glass CSS in components.

---

# 13. Variants (Scaling Pattern)

Do not duplicate slices for layout differences.

Use variations:

* default
* centered
* compact

Branch minimally:

```ts
slice.variation === "centered"
```

---

# 14. Mock Discipline Rule

Immediately update `mocks.json`.

Never design against lorem ipsum.

Mocks must include:

* Real headline
* Real body
* Real CTAs
* Correct visual_mode

Mocks drive clarity.

---

# 15. Debugging Protocol

If runtime error occurs:

1. Disable slices incrementally
2. Identify crashing slice
3. Audit for:

   * Direct JSX interpolation
   * PrismicRichText usage
   * Unguarded repeatables
4. Replace with SafeRichText / guards
5. Re-enable slices gradually

---

# 16. AI Fix Protocol (Mandatory When Debugging)

When asking AI to fix slice code, prepend:

```
Follow the Newport Slice System rules.

Use:
- SafeRichText for content
- asTextValue for UI labels
- asEnumValue for enums

Do NOT refactor beyond minimal fix.
Do NOT introduce `any`.
Do NOT change slice models.
All imports must be at the top.
Make the smallest possible change.
```

AI must not:

* Refactor architecture
* Change slice model
* Introduce abstractions
* Touch unrelated code

---

# 17. Multi-Tenant System Rules (HelixFlow Layer)

Slices are not just marketing components.

They are future dashboard modules.

Constraints:

* All tenant data filtered by `organization_id`
* RLS enforced
* UI modules conditionally rendered
* Feature toggles via:

  * `organization_modules`
  * Prismic `Client_Configuration` slices

Slices must remain config-driven and reusable across tenants.

---

# 18. Factory Rule (The Payoff)

If a slice:

* Depends on copy hacks
* Contains unclear field purpose
* Hardcodes styling logic
* Can crash the page

It does not belong in the system.

The slice library is a manufacturing line.

Not a design sandbox.

---

# 19. Final Rule (Most Important)

If a slice can crash the page,
the slice is incorrect.

There are no exceptions.
### Rich Text Rule (Critical)

If a field is modeled as Rich Text (lists, formatting, structure):
- NEVER render with asTextValue
- ALWAYS pass through normalizeRichText → SafeRichText
- Local normalizers are forbidden; use shared helper only

Violating this rule will cause mock/API divergence and silent rendering failures.

20. Constitutional Awareness Rule (AI Prompt Requirement)

When generating, modifying, or debugging any slice, model, or architectural file, AI must assume the following documents are authoritative:

PROJECT_IDENTITY.md

context_anchor.md

UNIVERSAL_SLICE_CONTROL_SCHEMA.md

SLICE_LIBRARY_INDEX.md

NE_error_log.md

AI must:

Respect required slice controls.

Preserve snake_case naming.

Never introduce new enums without explicit approval.

Never violate the multi-tenant architecture.

Never bypass defensive rendering requirements.

Never restructure architectural files unless explicitly instructed.

Apply minimal-diff philosophy when editing existing files.

If output conflicts with any governing document, the governing document wins.

Failure to follow this rule invalidates the response.
---

End of AI_rules.md
