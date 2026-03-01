# PROJECT_IDENTITY.md

Project: Newport Slice System / HelixFlow
Authority Level: Architectural Root
Status: Frozen Intent Document

This document defines the immutable identity of the system.
If future decisions conflict with this file, this file wins.

---

# 1. What This Project Is

This is not a website.

This is:

* A modular, slice-driven marketing engine
* A multi-tenant vertical SaaS platform
* A reusable web system factory
* A config-driven UI architecture
* A scalable VPS-to-cluster deployment model

It powers:

* Newport Ecom (agency marketing site)
* HelixFlow (modular SaaS product)
* Future client deployments
* White-label implementations

---

# 2. What This Project Is NOT

* Not a WordPress replacement
* Not a static brochure builder
* Not a plugin stack
* Not a template marketplace
* Not a per-client custom-code snowflake

No one-off hacks.
No plugin dependency chains.
No architectural drift.

---

# 3. Frozen Technology Stack

## Frontend

* Next.js (App Router only)
* TypeScript (strict)
* Tailwind v4
* Prismic (Slice Machine v2)
* ShadCN (optional primitives)
* Framer Motion (animation layer)
* React Three Fiber (hero / visual accents only)

## Backend

* Supabase
* organization_id on ALL tenant tables
* Row-Level Security mandatory
* Edge Functions for automation triggers

## Infrastructure

* Docker
* Coolify
* Self-hosted VPS cluster
* Single codebase
* Subdomain/domain-based multi-tenancy

This stack does not change casually.

---

# 4. Core Architectural Principle

One Codebase.
Many Tenants.
Config-Driven Rendering.

The system must support:

* 100+ organizations
* 1 shared application
* org_id isolation
* feature toggling per tenant
* modular UI rendering per tenant

If a decision breaks this — reject it.

---

# 5. Slices-First Mandate

All UI is built as Slices.

Never:

* Build monolithic pages
* "Slice later"
* Hardcode marketing sections
* Create dashboard widgets outside slice system

Slices are:

* Marketing modules
* Dashboard modules
* Feature toggles
* Subscription gates
* Reusable UI primitives

If a section cannot scale into multi-tenant logic, reconsider its design.

---

# 6. The Modular Dashboard Doctrine

Prismic is not just CMS.

Prismic is:

* Feature toggle layer
* Module configuration layer
* Tenant customization interface

Dashboard logic must support:

```ts
if (organization_modules.includes("crm")) {
  render <CRMWidget />
}
```

UI visibility is config-driven, not hardcoded.

---

# 7. The Anti-Franchise Positioning

This system competes against:

* Toast
* HungerRush
* Jobber
* Thryv
* Generic "all-in-one" SaaS

Competitive edge:

* Commission-free models
* Data ownership
* Performance-first (Next.js)
* Config-driven modularity
* Vertical customization
* Hyper-specific industry flows
* White-label capable

We sell:
Outcome Systems.

Not features.

---

# 8. Multi-Tenant Law

Every data table must include:

* organization_id

Every query must respect:

* RLS policies

No exceptions.

No global data leakage.

Security is enforced at database level.

---

# 9. Scaling Intent

The system is architected to scale:

Level 1:
Single VPS (Coolify + Supabase self-hosted)

Level 2:
Database isolated

Level 3:
Coolify worker nodes

Level 4:
Swarm / Kubernetes orchestration

The architecture must never block horizontal scaling.

---

# 10. Identity of the Founder

This project transitions you from:

Freelance Developer
→ Systems Architect
→ Vertical SaaS Founder

All decisions must align with:

* Factory mindset
* Reusability
* Automation
* Multi-tenant scalability
* Enterprise intent

---

# 11. Non-Negotiables

* Defensive rendering
* No slice can crash the page
* No slice may assume data shape
* No inline hacks for speed
* No silent architecture rewrites
* No drift from multi-tenant foundation

---

# 12. How to Start Any Future Chat

When resuming work:

Paste in:

1. PROJECT_IDENTITY.md
2. context_anchor.md
3. AI_rules.md
4. NE_*error_*log.md

This instantly restores system memory.

---

# Final Statement

Newport Slice System is not a project.

It is a platform foundation.

HelixFlow is not a website.

It is a modular SaaS engine.

All decisions must reinforce this trajectory.

Everything will be documented at the end of each chat and inserted into either context*anchor.md or* NE_*error_*log.md

---

End of PROJECT_IDENTITY.md
