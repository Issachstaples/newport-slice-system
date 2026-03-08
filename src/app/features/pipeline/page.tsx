import type { Metadata } from "next";
import FeaturePageTemplate from "@/components/features/FeaturePageTemplate";
import type { FeaturePageData } from "@/components/features/FeaturePageTemplate";

export const metadata: Metadata = {
    title: "One System. Zero Learning Curve. | Newport",
    description: "Capture every lead, track every touchpoint, and close faster than ever.",
};

const data: FeaturePageData = {
    title: "One System. Zero Learning Curve.",
    subhead: "Capture every lead, track every touchpoint, and close faster than ever.",
    problem:
        "Leads come in from everywhere—forms, calls, DMs, email—then get scattered. Teams avoid CRMs because they're too complex, too slow, and too hard to adopt.",
    solution:
        "We embed a simple pipeline that's easy on day one. Every lead enters one system, every touchpoint gets tracked, and every deal has a next step.",
    qa: [
        {
            question: "How do I stop losing leads across channels?",
            answerLead: "Everything routes into one place so you never \u201Chunt for the conversation.\u201D",
            bullets: [
                "Unified lead capture (forms, calls, messages)",
                "Central record per lead/customer",
                "Consistent handoffs without chaos",
            ],
        },
        {
            question: "How do I keep track of every interaction?",
            answerLead: "Touchpoints stay attached to the deal—automatically.",
            bullets: [
                "Timeline-style activity logging",
                "Notes + tasks that don't get lost",
                "Clear ownership and status",
            ],
        },
        {
            question: "How do I close faster?",
            answerLead: "When the pipeline is simple, people actually use it.",
            bullets: [
                "Fewer missed steps and delays",
                "Faster follow-up and cleaner handoffs",
                "More deals moving forward daily",
            ],
        },
    ],
    whatYouGet: [
        "A pipeline anyone can understand",
        "Lead records with history + next steps",
        "A simple workflow your team will actually adopt",
    ],
    proofPoints: [
        "Built for speed of adoption (not \u201CCRM training\u201D)",
        "Designed around real small-team operations",
        "Clear, repeatable process",
    ],
    cta: {
        title: "See the day-one pipeline",
        body: "We'll show you exactly how your lead flow maps into a simple system.",
        buttonLabel: "See pipeline demo",
        href: "/contact",
    },
};

export default function PipelinePage() {
    return <FeaturePageTemplate {...data} />;
}
