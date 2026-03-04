# AI_rules.md — Newport Slice System & HelixFlow

Authority Level: Constitutional
Applies To: Entire Repository

If any code, slice, or AI output conflicts with this document, **this document wins.**

---

# 1. System Philosophy

The Newport Slice System is a:

• Config-driven SaaS architecture
• Multi-tenant Next.js platform
• Prismic slice factory
• Defensive rendering environment

Guiding principles:

* Slices are layout-only
* Data normalization is centralized
* Defensive rendering is mandatory
* Reuse > cleverness
* Factory > playground
* Minimal diffs > sweeping refactors

Slices must **never crash the page.**

---

# 2. Universal Slice Control Schema

Every slice must begin its `primary` object with the required control block **in this exact order**.

Required fields:

1. `is_enabled` (Boolean)
2. `visual_mode` (Select)
3. `section_padding` (Select)
4. `container_width` (Select)

Enum values:

### visual_mode

```
none | gradient_orb | helix_3d
```

### section_padding

```
none | sm | md | lg
```

### container_width

```
standard | wide | full
```

Optional standardized controls:

```
background_tone
animation_mode
density_mode
align_mode
```

Enum-driven variability is mandatory.

Free-text style controls are forbidden.

---

# 3. Slice Architecture Rules

Slices must:

* Accept `slice` only
* Never fetch data
* Never access router
* Never manage global state
* Never know about pages
* Never hardcode copy

Correct:

```
slice.primary.headline
```

Forbidden:

```
"Build once. Operate everything."
```

---

# 4. Rendering Rules by Field Type

| Field     | Rendering                              |
| --------- | -------------------------------------- |
| Rich Text | normalizeRichText → `<SafeRichText />` |
| Key Text  | `asTextValue()`                        |
| Enum      | `asEnumValue()`                        |
| Boolean   | conditional                            |
| Number    | direct                                 |
| Image     | `<PrismicNextImage />`                 |
| Link      | `<PrismicNextLink />`                  |

Never render Rich Text directly.

`PrismicRichText` must **never** be imported inside slices.

Headlines must always be **Key Text**.

---

# 5. Hard Prohibitions

The following are forbidden:

• Rendering Rich Text directly
• Importing `PrismicRichText` inside slices
• Using `any` to silence types
• Assuming mocks match API shape
• Nested Group fields
• Inline normalization logic
• Free-text styling fields
• Hardcoded layout logic

Violation means the slice does not belong in the system.

---

# 6. Defensive Rendering Requirements

Slices must never crash.

Mandatory protections:

### Kill Switch

```
const isEnabled = primary?.is_enabled !== false
if (!isEnabled) return null
```

### Array Guards

```
const items = Array.isArray(primary?.items)
  ? primary.items
  : []
```

### Wrapper Awareness

Slice Machine mocks may return:

```
{ "__TYPE__": "...", "value": ... }
```

Helpers must unwrap `.value`.

Never render wrapper objects directly.

---

# 7. Repeatable Field Rule

Repeatables may appear as:

```
slice.items
```

or

```
slice.primary.cards
```

Never assume array shape.

Always guard with `Array.isArray`.

---

# 8. Implementation Standards

All slices must follow these structural rules.

### Folder Structure

```
src/slices/
  SliceName/
    index.tsx
    model.json
    mocks.json
    screenshot.png
```

Naming rules:

| Item       | Rule       |
| ---------- | ---------- |
| Slice Name | PascalCase |
| Slice ID   | snake_case |
| Field IDs  | snake_case |

---

# 9. Visual Mode Logic

Visual logic must never pollute layout logic.

Example:

```
if (visualMode === "gradient_orb") {
  // apply orb layer
}
```

Glass utilities must live in:

```
globals.css
```

Never inline complex CSS.

---

# 10. Variants Rule

Do not duplicate slices for layout differences.

Use variations:

```
default
centered
compact
```

Branch minimally:

```
slice.variation === "centered"
```

---

# 11. Slice Factory Workflow

All slices follow the manufacturing pipeline.

### Step 1 — Define Purpose

Confirm slice does not already exist.

---

### Step 2 — Design Model

Create:

```
src/slices/[SliceName]/model.json
```

Must include the control block first.

No nested groups.

---

### Step 3 — Validate JSON

```
node -e "JSON.parse(require('fs').readFileSync('model.json','utf8'))"
```

---

### Step 4 — Write Component

Requirements:

* `is_enabled` kill switch first
* `SafeRichText` for Rich Text
* `asTextValue` for Key Text
* `asEnumValue` for enums
* guarded arrays
* no hardcoded copy

---

### Step 5 — Lint

```
npx eslint src/slices/** --max-warnings=0
```

Zero warnings.

---

### Step 6 — Write Mocks

Requirements:

* realistic content
* `is_enabled: true`
* valid enums
* at least one list in Rich Text
* at least one non-default visual mode

---

### Step 7 — Simulator QA

Verify:

• slice renders
• mocks switch correctly
• kill switch works
• lists render properly
• no console errors

---

### Step 8 — Update Documentation

Update:

```
public/docs/slice_library_index.md
public/docs/context_anchor.md
```

Documentation is mandatory.

---

### Step 9 — Verify No Regressions

```
npx eslint src/ --max-warnings=0
```

---

### Step 10 — Commit

Commit format:

```
feat: implement SliceName slice
fix: correct SliceName bug
chore: update SliceName mocks
```

One logical change per commit.

---

# 12. Multi-Tenant Rules (HelixFlow)

Slices are future dashboard modules.

Constraints:

* tenant data filtered by `organization_id`
* RLS enforced
* feature toggles supported
* config-driven modules

Slices must remain reusable across tenants.

---

# 13. Documentation Protocol

When a slice ships:

Update:

```
slice_library_index.md
context_anchor.md
```

Failure to update docs is a protocol violation.

---

# 14. AI Fix Protocol

When asking AI to fix slice code, prepend:

```
Follow the Newport Slice System rules.

Use:
SafeRichText
asTextValue
asEnumValue

Do not refactor architecture.
Do not introduce `any`.
Make the smallest possible change.
```

---

# 15. Final Rule

If a slice can crash the page,

the slice is incorrect.

There are **no exceptions**.


