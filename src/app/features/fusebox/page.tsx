import type { Metadata } from "next";
import FeaturePageTemplate from "@/components/features/FeaturePageTemplate";
import type { FeaturePageData } from "@/components/features/FeaturePageTemplate";

export const metadata: Metadata = {
    title: "Only Pay for What You Use. | Newport",
    description: "Fusebox turns features into toggles—add modules anytime as your business grows.",
};

const data: FeaturePageData = {
    title: "Only Pay for What You Use.",
    subhead: "Fusebox turns features into toggles—add modules anytime as your business grows.",
    problem:
        "Most CRMs charge you for bundled features you don't use, force you into tiers, and increase costs as you scale—even when your needs haven't changed.",
    solution:
        "Fusebox is the switchboard: activate modules when you need them, keep your stack lean, and scale capability-by-capability without replatforming.",
    qa: [
        {
            question: "How do I avoid feature bloat?",
            answerLead: "Start with what produces ROI—add the rest later.",
            bullets: [
                "Turn modules on/off anytime",
                "Keep the system lean and focused",
                "Stop paying for unused features",
            ],
        },
        {
            question: "How do I scale without migrating platforms?",
            answerLead: "Your system grows with you.",
            bullets: [
                "Add capabilities without rebuilding",
                "Expand workflows and reporting as needed",
                "Keep the same core process",
            ],
        },
        {
            question: "How do I keep costs aligned with growth?",
            answerLead: "Pay for outcomes, not \u201Csoftware clutter.\u201D",
            bullets: [
                "Usage-aligned spend",
                "Modular expansion",
                "Predictable scaling path",
            ],
        },
    ],
    processFlow: {
        title: "How Fusebox Grows With You",
        intro: "Start lean and add capability only when the ROI is clear.",
        steps: [
            { label: "Step 1", title: "Start Lean", body: "Activate only the modules that produce results now." },
            { label: "Step 2", title: "Toggle Modules", body: "Turn features on or off based on your current needs." },
            { label: "Step 3", title: "Measure", body: "Track which modules drive actual outcomes." },
            { label: "Step 4", title: "Expand", body: "Add the next capability when ROI justifies it." },
            { label: "Step 5", title: "Scale", body: "Grow the stack without platform churn." },
        ],
    },
    beforeAfter: {
        title: "Before Newport vs. After Newport",
        beforeTitle: "Before",
        afterTitle: "After",
        beforeBullets: [
            "Paying for bundled features you don\u2019t use",
            "Locked into tiers with bloat you can\u2019t remove",
            "Costs spike as you add one new thing",
            "Messy stack with overlapping tools",
        ],
        afterBullets: [
            "Activate only what you need today",
            "Add modules as ROI proves them out",
            "Predictable, usage-aligned scaling",
            "One lean system that grows with you",
        ],
    },
    chartPanel: {
        title: "Tool Bloat Is Real",
        description: "SaaS benchmarks often find a large share of licenses go unused or underused.",
        chartType: "donut",
        data: [
            { name: "Unused / underused", value: 53 },
            { name: "Actively used", value: 47 },
        ],
        insight:
            "Modularity reduces bloat: activate what you use, expand when it\u2019s worth it. Benchmarks vary by org size and governance maturity.",
        sources: [
            {
                label: "Productiv \u2014 2023 State of SaaS",
                href: "https://productiv.com/blog/2023-state-of-saas-series-while-companies-make-progress-cutting-costs-previous-investments-and-growth-of-shadow-apps-like-chatgpt-challenge-efforts-to-manage-saas-spend/",
            },
        ],
    },
    whatYouGet: [
        "Modular feature architecture",
        "A roadmap that scales by capability",
        "A system designed for growth stages",
    ],
    proofPoints: [
        "Designed to stay lean at every stage",
        "Built for modular operations (not locked tiers)",
        "Scales without platform churn",
    ],
    cta: {
        title: "Build your stack",
        body: "Explore Fusebox modules and choose what you need now.",
        buttonLabel: "Explore modules",
        href: "/contact",
    },
};

export default function FuseboxPage() {
    return <FeaturePageTemplate {...data} />;
}
