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
