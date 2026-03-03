# SLICE_FACTORY_WORKFLOW.md

**Newport Slice System — Slice Build Process**
**Status: Canonical | Version: 1.0 | Date: 2026-03-02**

---

## Purpose

This document defines the repeatable 10-step process for building, verifying, and shipping a slice in the Newport Slice System. Every new slice must follow this workflow in order. Steps are not optional.

---

## The 10-Step Slice Build Process

### Step 1 — Define the Slice Purpose

Before writing any code or JSON, answer:
- What layout problem does this slice solve?
- What content types does it need (Key Text, Rich Text, Booleans, Selects)?
- Does a planned slice in `slice_library_index.md` already cover this?

If the answer to the last question is yes, extend the existing slice. Do not create a duplicate.

---

### Step 2 — Design the Model

Open or create `src/slices/[SliceName]/model.json`.

Requirements:
- Slice ID: `snake_case`
- Slice name: `PascalCase`
- `primary` must open with the required control block in order:
  1. `is_enabled` (Boolean)
  2. `visual_mode` (Select)
  3. `section_padding` (Select)
  4. `container_width` (Select)
- Content fields follow after all control fields.
- Group fields are placed inside `primary` — never inside `items`.
- `items: {}` remains empty at the variation root.
- All field IDs: `snake_case`.
- No nested Group fields.

Cross-check against `canonical_slice_model_template.json` and `UNIVERSAL_SLICE_CONTROL_SCHEMA.md` before proceeding.

---

### Step 3 — Validate the Model JSON

Run:

```bash
node -e "JSON.parse(require('fs').readFileSync('src/slices/[SliceName]/model.json','utf8')); console.log('valid')"
```

Do not proceed until JSON is valid.

---

### Step 4 — Write the Component

Replace the Slice Machine stub in `src/slices/[SliceName]/index.tsx`.

Requirements:
- Imports at the top.
- `"use client"` only if the slice uses `useState` or `useEffect`.
- `is_enabled` kill switch is the first logic.
- All enum fields read via `asEnumValue()`.
- All Key Text fields read via `asTextValue()`.
- All Rich Text fields read via `normalizeRichText()` → `<SafeRichText />`.
- All Group fields guarded with `Array.isArray()`.
- No `PrismicRichText` import.
- Headline uses `text-slate-900 dark:text-slate-100`.
- No hardcoded copy.
- No layout logic beyond reading control enums.

---

### Step 5 — Run Lint

```bash
npx eslint src/slices/[SliceName]/index.tsx --max-warnings=0
```

Zero warnings. Zero errors. Do not proceed until this passes.

---

### Step 6 — Write Mocks

Open `src/slices/[SliceName]/mocks.json`.

Requirements:
- Minimum two mock entries.
- No lorem ipsum.
- `is_enabled: true` in all mocks.
- All required control fields present at valid enum values.
- At least one mock covers a non-default `visual_mode`.
- At least one Rich Text field includes a bulleted or numbered list.
- Validate JSON:

```bash
node -e "JSON.parse(require('fs').readFileSync('src/slices/[SliceName]/mocks.json','utf8')); console.log('valid')"
```

---

### Step 7 — Verify in Slice Machine Simulator

Run the dev server and open `http://localhost:3000/slice-simulator`.

QA Checklist:
- [ ] Slice renders without error in the simulator
- [ ] All mock entries render correctly (switch between mocks)
- [ ] `is_enabled: false` mock returns null (nothing rendered)
- [ ] Rich Text lists render as `<ul>` / `<ol>` (not as plain text)
- [ ] Headline is readable (not invisible against background)
- [ ] Visual mode accent layer renders for `gradient_orb` and `helix_3d`
- [ ] No console errors or warnings
- [ ] No layout overflow or clipping visible

---

### Step 8 — Update Documentation

After the slice passes QA:

1. **`public/docs/slice_library_index.md`** — Add or update the slice entry with ✅ status and one-line description.
2. **`public/docs/context_anchor.md`** — Append a bullet under the "Slice Library Updates" section noting the slice is implemented and lint-verified.
3. Do not modify `PROJECT_IDENTITY.md` or `UNIVERSAL_SLICE_CONTROL_SCHEMA.md` unless the slice requires a new control field (which requires an architectural decision).

---

### Step 9 — Verify No Regressions

Run full lint across the project:

```bash
npx eslint src/ --max-warnings=0
```

Confirm no new errors introduced in other files.

---

### Step 10 — Commit and Push

Use the commit message convention:

```
feat: implement [SliceName] slice with [key capability]
```

Examples:
```
feat: implement StepsTimeline slice with layout, connector, and animation modes
feat: implement TabsSection slice with pills/underline/cards styles and grid content mode
chore: update [SliceName] mocks with realistic Newport content
fix: correct [SliceName] field source for [field name]
```

Rules:
- `feat:` for new slice implementations
- `fix:` for bug fixes to existing slices
- `chore:` for mocks, docs, config updates
- One logical change per commit
- Push to `main` after each completed slice

---

## Commit Message Convention Reference

| Prefix | Use for |
|---|---|
| `feat:` | New slice implementation |
| `fix:` | Bug fix in existing slice |
| `chore:` | Mocks, docs, config, non-functional updates |
| `refactor:` | Internal restructure (requires explicit approval) |

---

*This workflow is the manufacturing line. Following it ensures every slice is correct, documented, and reversible.*
