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
