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
    processFlow: {
        title: "How the Pipeline Works",
        intro: "Five stages, one system—every lead has a place and a next step.",
        steps: [
            { label: "Stage 1", title: "Capture", body: "All leads enter one record, regardless of channel." },
            { label: "Stage 2", title: "Qualify", body: "Assign intent, priority, and ownership immediately." },
            { label: "Stage 3", title: "Follow-up", body: "Reminders and sequences keep momentum going." },
            { label: "Stage 4", title: "Quote", body: "Estimates and proposals attached to the deal." },
            { label: "Stage 5", title: "Close", body: "Outcome logged, handoff clean, review triggered." },
        ],
    },
    beforeAfter: {
        title: "Before Newport vs. After Newport",
        beforeTitle: "Before",
        afterTitle: "After",
        beforeBullets: [
            "Leads scattered across texts, email, and DMs",
            "No defined stages or clear ownership",
            "Notes lost, context missing on every call",
            "Inconsistent follow-up kills warm leads",
        ],
        afterBullets: [
            "One record with full lead history",
            "Clear stages, next steps, and ownership",
            "Simple tasks so nothing gets forgotten",
            "Faster, more consistent follow-up",
        ],
    },
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
