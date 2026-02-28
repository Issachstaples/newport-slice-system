This is written in the same disciplined style as ne-2-28fix1.md, clearly separating root cause, fix, and rules going forward.

ne-2-28fix2.md — FeatureGrid Runtime Crash Resolution

Date: 2026-02-28
Status: Resolved
Scope: FeatureGrid slice (Rich Text rendering)
Impact: Client-side runtime crash on /

Summary

A client-side runtime error was caused by rendering Prismic StructuredText wrapper objects directly in JSX inside the FeatureGrid slice.

This issue surfaced after page-level visual updates but was not caused by CSS, Tailwind, or visual layers. The visual changes simply exposed an existing data-handling bug.

The issue is now fully resolved.

Error Signature

Browser error:

Objects are not valid as a React child
(found: object with keys { __TYPE__, value, type })

This error indicates that a non-renderable object was passed directly into JSX.

Root Cause

Prismic Slice Machine mocks represent Rich Text fields as objects:

{
  __TYPE__: "StructuredTextContent",
  value: [...]
}

However, React JSX cannot render objects, and @prismicio/react’s <PrismicRichText /> component expects only the raw array, not the wrapper.

In FeatureGrid, multiple fields were incorrectly assumed to be plain strings and were rendered directly:

Affected Fields

primary.eyebrow

primary.headline

primary.body (previously fixed)

item.title

item.description

These fields are Rich Text in the slice model and must never be interpolated directly.

Fix Applied
1. Canonical Rich Text Normalization

A defensive normalization helper was introduced to support both:

Slice Machine mocks

Real Prismic API responses

function normalizeRichText(field: any) {
  if (Array.isArray(field)) return field;
  if (field?.value && Array.isArray(field.value)) return field.value;
  return null;
}
2. All Rich Text Fields Rendered via <PrismicRichText />

Every StructuredText field in FeatureGrid is now rendered using:

normalizeRichText(field)

<PrismicRichText />

Custom components for semantic control (headings, spans, paragraphs)

This prevents all object-as-child runtime crashes.

Result

✅ Page renders cleanly on /

✅ No client-side runtime exceptions

✅ Compatible with Slice Machine mocks

✅ Compatible with real Prismic API data

✅ Visual layout and design preserved

✅ App Router + Turbopack safe

Explicit Rule Going Forward

Never render Prismic Rich Text fields directly in JSX.

Correct Rendering Matrix
Prismic Field Type	Rendering Rule
Rich Text	PrismicRichText(normalizeRichText(field))
Key Text	{field}
Select / Enum	{field}
Boolean	Conditional logic
Number	{field}
Image	<PrismicNextImage />
Notes

This fix resolves a class of bugs, not a one-off issue.

Similar audits should be applied to other slices (e.g. HeroSystem) to enforce consistency.

A future improvement may introduce a shared <SafeRichText /> component to enforce this pattern at the component level.

Related Documents

ne-2-28fix1.md — Enum normalization & repeatable mapping fixes

ne-error-wip2-28.md — Debug log (WIP, superseded by this fix)

End of document