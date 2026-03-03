1️⃣ Core Layout Slices (Foundation Tier)

These are structural primitives — used on almost every site.

1. HeroSystem

Flagship above-the-fold system hero
Variants:

default

split

centered

dashboard

product

Controls:

visual_mode (none | gradient_orb | helix_3d)

badge_enabled

primary_cta

secondary_cta

Purpose:
High-conversion entry module.

2. SectionIntro ✅

Headline + Rich Text section framing with universal layout controls.
Used before major content blocks.

3. CtaSection

Conversion block
Variants:

centered

split

inline

minimal

Use cases:

Lead capture

Demo booking

Checkout upsell

4. Divider / SpacerSlice

Controlled whitespace slice
Important for layout composability.

2️⃣ Content Slices (Meat & Potatoes)

These are reusable mid-page modules.

5. FeatureGrid (Classic)

Icon + title + description grid
Variants:

2-column

3-column

dense SaaS

bordered

Use case:
Service explanation
Value props
Feature comparison

6. IconList

Vertical or horizontal list
Optional checkmarks or custom icons
Optional highlighted row

Use case:
Pricing breakdown
Process explanation
Deliverables list

7. BlurbGrid

Image + headline + short paragraph
Flexible column count.

Use case:
Team highlights
Mini case studies
Use-case breakdown

8. StepsTimeline

Numbered steps with optional connectors
Variants:

vertical

horizontal

minimal

timeline

Use case:
Onboarding flow
How it works
Assembly process

9. TabsSection

Dynamic tab switcher
Controlled via repeatable tab groups

Use case:
Service breakdown
Product specs
Industry-specific views

This becomes powerful for HelixFlow vertical templates.

3️⃣ Product-Focused Slices

For ecommerce or SaaS product pages.

10. ProductShowcase

Large image + feature bullets
CTA cluster
Optional price display

11. ProductCarousel

Scrollable product cards
Must be defensive & lazy-safe

Use case:
Shop pages
Related products
Case studies

12. PricingTable

Tier comparison grid
Highlight recommended plan
Toggle monthly/annual

High revenue impact slice.

13. ComparisonTable

Feature comparison matrix
Toggle between categories

Competitive positioning slice.

4️⃣ Trust & Authority Slices

These increase conversions.

14. TestimonialsCarousel

Quote + avatar + company
Optional rating stars
Auto-rotate optional

15. LogoCloud

Client logos grid
Variants:

grayscale

glass-card

marquee scroll

16. CaseStudyHighlight

Image + summary + results stats
CTA to full study

17. StatsStrip

Metric counters
Variants:

static

animated

5️⃣ Blog & Content Engine Slices

Important for marketing scaling.

18. BlogFeedGrid

Pulls posts (page-level fetch allowed, not inside slice)
Displays cards only.

19. BlogCarousel

Horizontal scroll version.

20. ArticleBody

Structured long-form slice
Used for blog page type.

21. AuthorBox

Avatar + bio + social links.

6️⃣ Dashboard / SaaS Slices (HelixFlow Future)

These blur marketing and app UI.

22. ModuleTogglePanel

Enable/disable feature modules
Future admin tool

23. CRMWidget

Compact lead list display

24. RevenueSnapshot

Stat overview card

25. ActivityFeed

Recent events list

🧠 Important Architectural Decision

You are NOT building pages.

You are building:

Modular UI packages that can assemble into infinite layouts.

Each slice must:

Accept only slice

Be layout-only

Have at least 1 Boolean control

Have at least 1 Select control

Be visually premium

Work in multiple industries

No niche design hacks.
No one-off branding baked in.

🎯 Slice Build Priority Recommendation (Smart Order)

Do not build randomly.

Build in this order:

SectionIntro

IconList

StepsTimeline

PricingTable

TestimonialsCarousel

TabsSection

ProductShowcase

StatsStrip

ComparisonTable

This gives you:

Service websites

SaaS websites

Ecommerce landing pages

Agency templates

Vertical SaaS layouts

From one library.