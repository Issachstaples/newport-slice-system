export interface HeroCardData {
    title: string;
    blurb: string;
    body: string;
    href: string;
}

export const HERO_CARDS: HeroCardData[] = [
    {
        title: "Rank higher. Convert more. Grow faster.",
        blurb: "SEO-first websites built to turn traffic into revenue.",
        body: "Technical SEO, speed, and structure—built into every page so search engines index fast and customers take action.",
        href: "/features/seo-conversion",
    },
    {
        title: "One System. Zero Learning Curve.",
        blurb: "Capture every lead, track every touchpoint, and close faster than ever.",
        body: "A simple pipeline that captures every lead, logs every touchpoint, and keeps deals moving without CRM friction.",
        href: "/features/pipeline",
    },
    {
        title: "From Lead to Close on Autopilot.",
        blurb: "Smart automations handle the busywork—so nothing slips through the cracks.",
        body: "AI-powered workflows route leads, trigger follow-ups, and send reminders automatically—so you never miss a step.",
        href: "/features/autopilot",
    },
    {
        title: "Track Performance at a Glance.",
        blurb: "One dashboard turns activity into insight—so you can act faster.",
        body: "Real-time dashboards turn pipeline activity into clear KPIs, bottleneck alerts, and next-best actions.",
        href: "/features/dashboard",
    },
    {
        title: "Only Pay for What You Use.",
        blurb: "Fusebox turns features into toggles—add modules anytime as your business grows.",
        body: "Fusebox lets you toggle modules on or off as you grow—so you pay for outcomes, not bloated bundles.",
        href: "/features/fusebox",
    },
];
