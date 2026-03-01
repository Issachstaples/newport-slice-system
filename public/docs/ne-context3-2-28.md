Renamed this file to ne-context3-2-28.md
---

## 📄 `context_anchor3.md`

```md
# Context Anchor 3 — Newport Slice System (2026-02-28)

## Project Identity

**Name:** Newport Slice System  
**Goal:** Reusable Prismic Slice library for SaaS + agency sites  
**Philosophy:** Reuse-first, minutes not weeks, system over pages

---

## Stack

- Next.js (App Router)
- Tailwind v4
- Prismic Slice Machine v2
- Dynamic SliceZone rendering
- Apple-style liquid glass UI

---

## Core Slices

- HeroSystem
- FeatureGrid
- BentoGrid
- CtaSection

---

## Critical System Learnings

### 1) Prismic Data Shape Rules

- `slice.primary` → singleton fields only
- `slice.items` → repeatable groups **always**
- Never read repeatables from `primary`

---

### 2) Field Type Discipline

| Field Type | Render Strategy |
|-----------|-----------------|
| Key Text | `asTextValue()` → string |
| Rich Text | `SafeRichText` |
| Select / Enum | `asEnumValue()` |
| Boolean | direct coercion |

Mocks and API responses **do not share identical shapes**.

---

### 3) Slice Machine Wrappers

Slice Machine v2 wraps fields like:

```json
{ "__TYPE__": "...", "value": ... }