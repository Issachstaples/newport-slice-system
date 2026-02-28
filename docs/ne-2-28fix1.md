# ne-2-28fix1.md — Fix Log (2026-02-28)

## Summary
This log documents fixes made to restore Tailwind + globals, normalize Prismic select enums, and harden slice rendering to prevent runtime schema mismatches.

---

## 1) Tailwind v4 Globals Fix

### Problem
Next dev build failed with a PostCSS/Tailwind error:

- `CssSyntaxError: tailwindcss: ... "./base" is not exported ...`
- Caused by using Tailwind v3 directives in a Tailwind v4 project.

### Root Cause
Project uses Tailwind v4 (`@tailwindcss/postcss`). Tailwind v4 no longer supports:

- `@tailwind base;`
- `@tailwind components;`
- `@tailwind utilities;`

### Fix
Updated `src/app/globals.css` to use Tailwind v4 import:

```css
@import "tailwindcss";