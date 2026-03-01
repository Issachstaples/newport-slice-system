# ne-error-2-28wip2.md — Runtime Rendering Debug (WIP)

**Date:** 2026-02-28  
**Status:** Stable but mid-refactor (HeroSystem + FeatureGrid corrected)

---

## Summary

This WIP documents a class of runtime rendering bugs caused by **data shape mismatches** between:

- Slice Machine v2 mocks
- Real Prismic API responses
- Incorrect assumptions about where fields live (`primary` vs `items`)
- Incorrect assumptions about field *types* (Key Text vs Rich Text)

The project is now stable, rendering real Prismic content, but refactoring is still in progress.

---

## Confirmed Fixes (DO NOT REGRESS)

### 1) FeatureGrid repeatables

**Bug**
- Cards rendered fallback titles (“Feature”)
- Repeatables were incorrectly read from `slice.primary.feature_cards`

**Fix**
- Repeatable groups **must be read from `slice.items`**

```ts
const cards = Array.isArray(slice.items) ? slice.items : [];
END OF FILE