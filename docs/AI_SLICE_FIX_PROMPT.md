AI_SLICE_FIX_PROMPT.md — Newport Slice System
Purpose

This prompt instructs an AI coding assistant to make safe, minimal, system-compliant fixes to Prismic slice components.

It is designed to:

Prevent repeat bugs

Enforce architectural boundaries

Avoid “helpful” refactors that break invariants

Use this prompt before asking an AI to fix, refactor, or debug any slice.

🔒 System Context (DO NOT VIOLATE)

You are working in a Next.js App Router + TypeScript (strict) project using Prismic Slice Machine v2.

This project follows the Newport Slice System with the following hard rules:

Architecture Rules

Slices are layout-only

Data normalization is centralized

Never assume Prismic data shape

Never introduce any

Minimal diffs only

🧩 Required Helpers (Must Be Used)
Purpose	Helper
Content (Rich Text)	<SafeRichText />
UI / Label Text	asTextValue()
Config / Select / Enum	asEnumValue()
🚫 Forbidden Actions

You MUST NOT:

Render Prismic fields directly in JSX

<h1>{primary.headline}</h1> // ❌ forbidden

Import PrismicRichText inside slices

Inline normalization logic inside slices

Change slice models

Add new abstractions unless explicitly asked

Reformat or “improve” unrelated code

Move files unless explicitly asked

✅ Allowed Actions

You MAY:

Move imports to the top of the file

Add missing TypeScript types (e.g. ReactNode)

Replace unsafe rendering with:

SafeRichText

asTextValue

asEnumValue

Add guards (Array.isArray, null checks)

Fix strict TypeScript errors without weakening types

🎯 Typical Tasks This Prompt Covers

Fixing runtime errors:

“Objects are not valid as a React child”

Fixing TS errors:

implicit any

import placement (ts1232)

Normalizing enum / select fields

Making slices mock-safe + API-safe

🛠️ How to Apply This Prompt (Copy/Paste)

When asking the AI to fix something, prepend this exact block:

Follow the Newport Slice System rules.

Use:
- SafeRichText for content
- asTextValue for UI labels
- asEnumValue for enums

Do NOT refactor beyond the minimal fix.
Do NOT introduce `any`.
Do NOT change slice models.
All imports must be at the top of the file.

Make the smallest possible change that resolves the error.

Then paste the error or code below it.

🧠 Rule of Thumb (Most Important)

If a slice can crash the page, the slice is incorrect.
Fixes must eliminate the entire class of failure, not just the symptom.

📌 Example Use (Import Error)
Follow the Newport Slice System rules.

Fix this error:
"An import declaration can only be used at the top level of a module (ts1232)"

Do not change logic or JSX.
Only move the import to the correct location.
📌 Example Use (Rendering Error)
Follow the Newport Slice System rules.

Fix this error:
"Objects are not valid as a React child"

Use SafeRichText.
Do not inline normalization.
Do not change styling.
Final Note

This prompt exists because:

The same bugs already occurred

The rules are now known

Relearning them is unnecessary

The goal is not smarter AI — it’s repeatable correctness.

End of document

Where this puts you (big picture)

You now have:

A self-defensive slice architecture

A ruleset AI must obey

A way to make tomorrow’s changes cheaper than today’s