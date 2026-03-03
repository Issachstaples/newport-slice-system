# context_anchor.md

Project: Newport Slice System / HelixFlow
Last Updated: 2026-02-28

---

# 1. Project Identity

**Newport Slice System** is not just a marketing website system.

It is a **Reusable SaaS Factory Architecture** built on:

* Next.js (App Router)
* TypeScript (strict)
* Tailwind v4
* Prismic Slice Machine v2
* Supabase (Multi-tenant + RLS)
* Coolify + Docker (Self-hosted VPS cluster)

Design language:

* Apple-style Liquid Glass
* Dark, SaaS-dense layouts
* Reuse-first philosophy (“minutes not weeks”)

This system powers:

* Newport Ecom (Agency Frontend)
* HelixFlow (Modular Vertical SaaS Platform)
* Future White-Label Client Deployments
* 100+ Tenant Architecture from one codebase

This is a **config-driven multi-tenant operating system**, not a collection of websites.

---

# 2. The Core Vision (From Gemini Strategic Blueprint)

The goal is not to “build websites.”

The goal is to build:

> A repeatable, modular, commission-free vertical SaaS system that outperforms Jobber, Toast, Thryv, and generic all-in-one platforms.

### Positioning Strategy

HelixFlow competes by:

* 0% commission model
* Ultra-fast Next.js PWA performance
* Industry-specific modular dashboards
* Client-owned data (Supabase isolation)
* Configurable slice-based UI instead of bloated monolith dashboards

---

# 3. The Software Factory Model

## The HelixFlow Assembly Line (SOP)

Every client follows this pipeline:

1. Scoping

   * Identify required modules (CRM, Scheduling, Ordering, Proposals, AI Support)

2. Provisioning

   * Create organization_id in Supabase
   * Create Client_Configuration document in Prismic

3. Feature Wiring

   * Enable modules in organization_modules table
   * Configure Prismic slices for dashboard layout

4. Deployment

   * Coolify builds Docker container
   * Subdomain mapped automatically

5. Handoff

   * Client receives dashboard login
   * System begins automated lead-to-handoff flow

Manual work target: under 15 minutes per client.

---

# 4. Modular Logic — "Slice Machined Dashboards"

Prismic is not just for marketing pages.

It is the **Feature Toggle Brain** of HelixFlow.

### Mechanism:

* A Custom Type: `Client_Configuration`
* Each client document contains slices representing enabled modules
* Next.js reads slices and conditionally renders dashboard components

Example logic:

if (slices.includes('ReviewManagement')) render <ReviewWidget />

Each dashboard widget:

* Talks to Supabase
* Filters by organization_id
* Respects RLS isolation

One codebase.
Config-driven UI.
Selective rendering per subscription tier.

---

# 5. Multi-Tenant Architecture (Supabase Model)

Core database structure:

* organizations
* modules
* organization_modules (feature toggles)
* profiles
* leads
* future tables: proposals, contracts, invoices, reviews

All tables include:

organization_id UUID NOT NULL

RLS Policies ensure:

organization_id = auth.uid() org_id claim

Database-level isolation.
Cryptographic tenant separation.
Single database, 100+ businesses.

---

# 6. Scaling Strategy

Level 1:
Single KVM VPS running:

* Coolify
* Next.js apps
* Self-hosted Supabase

Level 2:
Move Supabase to dedicated database server

Level 3:
Add Coolify Worker Nodes
Distribute containers per tenant

Level 4:
Swarm / Kubernetes auto-scaling
Spin up containers dynamically per traffic spike

System designed to scale from 1 VPS → Enterprise cluster.

---

# 7. Architectural Philosophy

## Core Principles

* Slices are layout-only
* Data normalization centralized
* Never assume Prismic data shape
* Defensive rendering mandatory
* Reuse > cleverness
* Factory > playground
* Config-driven > Hardcoded logic
* Monoliths do not scale

---

# 8. Slice Development Model

Slices are built “Slices-First.”

Never build monolithic pages then refactor.

Workflow:

Create slice
→ Add to page type
→ Push
→ Add to document
→ Publish
→ Verify render

All six steps required.

Slices are:

* Marketing building blocks
* Dashboard feature toggles
* Future white-label deployment modules

---

# 9. Confirmed Working System State

## Tailwind v4

Correct import:

@import "tailwindcss";

Custom utilities live in @layer utilities.

Global utilities confirmed:

* .glass-frost
* .glass-rim
* .glass-chip
* .glass-sheen
* .glass-orb
* .glass-helix
* .pulse-dot

---

## Prismic Data Handling

Field Discipline:

| Field Type | Rendering Strategy |
| ---------- | ------------------ |
| Key Text   | asTextValue()      |
| Rich Text  | SafeRichText       |
| Select     | asEnumValue()      |
| Boolean    | direct coercion    |

Slice Machine mocks wrap structured text as:

{ "**TYPE**": "...", "value": [...] }

Rendering must support:

* API array
* Mock wrapper

Never render wrapper objects.

---

# 10. Competitive Advantage Model

HelixFlow Bundle Packaging:

Tier 1 — Foundations

* Next.js Site
* Lead capture
* Basic automation

Tier 2 — Flow

* CRM dashboard
* Proposal builder
* Client portal
* Review loop

Tier 3 — Helix

* AI support agent
* Advanced automation
* Revenue reporting
* Multi-user permissions

Sell outcomes:

* Margin
* Time
* Automation
* Ownership

Not “features.”

---

# 11. End-to-End Data Flow

Lead → Supabase → Edge Function → Dashboard → Contract → Invoice → Review Request

Every step automated.
Every event logged.
Every action traceable.

Website = Hook
Dashboard = Engine
Automation = Glue

---

# 12. Visual System Tokens

Dark Mode:

* Obsidian (#050505)
* Midnight (#0A0A0B)
* Silver (#E2E8F0)
* Electric Cobalt (#3B82F6)

Material:

* backdrop-blur 24px
* 1px white border at 0.1 opacity
* inner glow depth
* metallic heading gradients

Glass utilities abstracted.
Never inline styling.

---

# 13. Operating Rule Going Forward

When something breaks:

1. Identify layer:

   * Slice Definition
   * Page Type
   * Document
   * Rendering
   * Database
   * Feature Toggle

2. Add invariant rule

3. Update fixes_log.md

4. Update AI_RULES.md if structural

Never rediscover the same architecture lesson twice.

---

This is no longer a website rebuild.

This is the HelixFlow Operating System.

---

## Slice Library Updates

- **SectionIntro** implemented (`src/slices/SectionIntro/index.tsx`) — replaces Slice Machine stub; full universal control block (`is_enabled`, `visual_mode`, `section_padding`, `container_width`, `align_mode`), `SafeRichText` + `normalizeRichText` for body, `asTextValue` for eyebrow/headline, lint verified (exit 0), two mocks added (gradient_orb/left and helix_3d/center), `slice_library_index.md` updated. *(2026-03-02)*

---

## Slice Library Milestone — 2026-03-02

The following slices were implemented, lint-verified (ESLint exit 0), and pushed to `main` in this session:

- **IconList** (`src/slices/IconList/index.tsx`) — vertically stacked icon rows; reads from `primary.items` Group; supports `item_icon` (Select → lucide map), `item_title`, `item_description` (Rich Text), `item_badge`, `item_is_highlighted`; full `density_mode` control.
- **StepsTimeline** (`src/slices/StepsTimeline/index.tsx`) — numbered or icon-driven step sequence; reads from `primary.steps` Group; supports `layout_mode` (vertical/horizontal), `connector_mode` (line/dots/none), `number_style` (numeric/icon), `animation_mode` (none/fade_in/slide_up/stagger with per-step inline delay).
- **TabsSection** (`src/slices/TabsSection/index.tsx`) — interactive tab switcher (`"use client"`); reads from `primary.tabs` Group; supports `tabs_style` (pills/underline/cards), `content_style` (panel/grid), `show_icons`, `allow_wrap`, `default_tab_index` (clamped); ARIA-compliant tab/tabpanel roles.

**Architectural note:** TabsSection uses Rich Text blocks rendered into a CSS `[&>*]` grid (`content_style: grid`) rather than nested Group fields. Slice Machine v2 does not support nested Groups. This is the canonical pattern for grid-like content within tab panels.

**Documentation updated this session:**
- `public/docs/slice_library_index.md` — fully rewritten as canonical table-format inventory (9 implemented, 8 planned)
- `docs/SLICE_IMPLEMENTATION_STANDARDS.md` — created; formalises required control block order, hard rules, defensive rendering standards
- `docs/SLICE_FACTORY_WORKFLOW.md` — created; defines 10-step build process, QA checklist, JSON validation steps, commit message conventions
- `docs/AI_rules.md` — updated with doc maintenance rule, cross-check rule, and no-nested-groups rule

