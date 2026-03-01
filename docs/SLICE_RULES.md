Operating Principle Going Forward

Document the rule once, automate it forever.

This system favors:

explicit helpers

defensive rendering

documented constraints

AI-assisted enforcement


---

## 📄 `SLICE_RULES.md` (Updated)

```md
# SLICE_RULES.md — Newport Slice System

This file defines **non-negotiable rules** for all Prismic slices in this repository.

Violating these rules will cause runtime bugs.

---

## 1) Repeatable Fields Rule (CRITICAL)

Prismic repeatables can live in two valid places depending on the slice model:

### A) Slice repeatable zone
✅ `slice.items`

### B) Group field inside primary (common for "cards")
✅ `slice.primary.cards` (or another group field)

🚫 Never assume repeatables exist or are arrays.
Always guard with `Array.isArray(...)`.

**Factory standard for system slices:** if the model includes a `cards` group field, treat
`slice.primary.cards` as canonical.

2) Field Type Rules
Key Text

Render as strings

Use asTextValue(field, fallback)

Rich Text

Render ONLY with SafeRichText

Never pass raw wrapper objects

Never assume array shape

Select / Enum

Normalize via asEnumValue

Never trust casing or separators

3) Slice Machine Wrapper Rule

Slice Machine v2 may wrap fields as:

{ "__TYPE__": "...", "value": ... }

All rendering logic must:

detect wrapper objects

extract .value

support both mock + API shapes

4) Banned Patterns

🚫 Direct PrismicRichText usage inside slices
🚫 any used to bypass shape uncertainty
🚫 Reading repeatables from primary
🚫 Assuming mocks == API data

5) Required Helpers

Slices SHOULD use:

asTextValue

asEnumValue

SafeRichText

Helpers SHOULD live under:

src/lib/prismic/
6) Before You Ship a Slice

Checklist:

 No any

 Repeatables read from slice.items

 Rich Text unwrapped safely

 Key Text rendered as strings

 Enums normalized

 Works with mocks AND real Prismic data

Guiding Principle

If it worked in mocks but broke in prod, the rule was missing.

Add the rule. Then automate it.

SLICE_RULES.md — Newport Slice System Authoring Rules

Last updated: 2026-02-28
Applies to: /src/slices/**
Audience: Humans + AI collaborators

Purpose

This document defines hard rules for authoring Prismic slices in the Newport Slice System.

These rules exist because real production bugs already occurred when assumptions were made about Prismic data shapes, Slice Machine mocks, and React rendering behavior.

AI’s greatest asset is learning from mistakes cheaply.
This document is that learning, preserved.

Core Philosophy

Slice components are layout-only

Data normalization is centralized

Assumptions about CMS data are always wrong

Defensive rendering is mandatory

Reuse > cleverness

🚫 Absolute Rules (Do Not Break)
❌ Rule 1 — Never render Prismic Rich Text directly in JSX

This is forbidden:

<h2>{primary.headline}</h2>
<p>{item.description}</p>

Why:

Prismic Rich Text is an object, not a string

Slice Machine mocks wrap content

React will crash at runtime

❌ Rule 2 — Never import PrismicRichText directly in slices

This is forbidden inside /src/slices/**:

import { PrismicRichText } from "@prismicio/react";

Why:

It bypasses normalization

It reintroduces known crash classes

It spreads fragile logic across the codebase

❌ Rule 3 — Never assume mock data shape === API data shape

Mocks and real API responses differ.

Any code that assumes otherwise will break.

✅ Required Patterns (Always Do This)
✅ Rule 4 — All Rich Text MUST go through SafeRichText

Correct pattern:

import { SafeRichText } from "@/components/prismic/SafeRichText";

<SafeRichText field={primary.body} />

What SafeRichText guarantees:

Works with Slice Machine mocks

Works with real Prismic API data

Guards against null / empty fields

Prevents object-as-child crashes

✅ Rule 5 — Slice components must be render-safe

Slices must:

Guard against missing fields

Guard against wrong data shapes

Never throw during render

Safe example:

{items.length > 0 && items.map(...)}
✅ Rule 6 — Repeatables must be validated

Always guard repeatable fields:

const items = Array.isArray(primary.cards) ? primary.cards : [];

Never assume repeatables exist.

✅ Rule 7 — Enums must be normalized defensively

CMS enums may change formatting.

Always normalize:

String(primary.visual_mode ?? "none").replace(/-/g, "_");

Never trust raw enum strings.

📐 Rendering Rules by Field Type
Prismic Field Type	How to Render
Rich Text	<SafeRichText field={field} />
Key Text	{field}
Select / Enum	{field} (after normalization)
Boolean	Conditional logic
Number	{field}
Image	<PrismicNextImage />
Link	<PrismicNextLink />

If unsure → assume Rich Text.

🧠 Known Failure Modes (Learned the Hard Way)

These errors have already occurred in production:

Objects are not valid as a React child

Client-side runtime exception with no stack trace

Slice renders fine until page structure changes

Bugs hidden until visual layers are added

All were caused by violating rules above.

🧪 Debugging Protocol (When Something Breaks)

Disable slices one by one in SliceZone

Identify the crashing slice

Audit for:

Direct JSX interpolation of Prismic fields

Direct PrismicRichText usage

Unguarded repeatables

Apply SafeRichText + guards

Re-enable slices incrementally

🧩 Design Boundary Contract
Layer	Responsibility
SafeRichText	Data normalization + safety
Slice components	Layout, spacing, visuals
Prismic CMS	Content only
Page files	Composition only

Slices must never cross boundaries.

🔒 Enforcement (Human + AI)

When writing or editing a slice, ask:

“Am I rendering Prismic data?”

If yes → SafeRichText

“Am I assuming shape?”

If yes → add a guard

If an AI suggests code that violates this doc, the AI is wrong.

Final Rule (Most Important)

If a slice can crash the page, the slice is incorrect.
There are no exceptions.
## Text vs Rich Text — Hard Boundary Rule

Not all “text-like” fields are the same.

### Key Principle

> **UI text and content text are different and must be handled differently.**

---

### 🟢 Key Text / Config Text (Use `asTextValue`)

These are **UI controls**, not content:

- CTA labels
- Badge text
- Toggle labels
- Select / enum values
- Visual mode selectors

**Correct handling:**

```ts
asTextValue(primary.primary_cta_label, "Start a Project")
**

End of document