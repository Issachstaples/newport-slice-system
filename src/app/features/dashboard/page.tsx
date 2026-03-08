import type { Metadata } from "next";
import FeaturePageTemplate from "@/components/features/FeaturePageTemplate";
import type { FeaturePageData } from "@/components/features/FeaturePageTemplate";

export const metadata: Metadata = {
    title: "Track Performance at a Glance. | Newport",
    description: "One dashboard turns activity into insight—so you can act faster.",
};

const data: FeaturePageData = {
    title: "Track Performance at a Glance.",
    subhead: "One dashboard turns activity into insight—so you can act faster.",
    problem:
        "If you can't see what's working, you can't improve it. Most teams bounce between analytics, inboxes, and spreadsheets with no single source of truth.",
    solution:
        "We consolidate your pipeline and performance into one clean dashboard—so you can spot bottlenecks, measure ROI, and make decisions without guessing.",
    qa: [
        {
            question: "How do I know what marketing is working?",
            answerLead: "Track real outcomes, not vanity metrics.",
            bullets: [
                "Leads by source/channel",
                "Conversion signals over time",
                "Revenue attribution where possible",
            ],
        },
        {
            question: "How do I see where leads are getting stuck?",
            answerLead: "Pipeline visibility makes bottlenecks obvious.",
            bullets: [
                "Stage-by-stage drop-off",
                "Aging deals / stalled follow-ups",
                "Team activity and response time",
            ],
        },
        {
            question: "How do I act faster?",
            answerLead: "When insights are clear, decisions get easier.",
            bullets: [
                "KPIs at a glance",
                "Alerts for issues and opportunities",
                "Simple reporting your team will use",
            ],
        },
    ],
    processFlow: {
        title: "From Raw Data to Clear Decisions",
        intro: "Five steps from scattered tools to one dashboard that tells you what to do next.",
        steps: [
            { label: "Step 1", title: "Collect", body: "Pull data from your CRM, forms, and ad channels." },
            { label: "Step 2", title: "Normalize", body: "Align metrics into consistent definitions." },
            { label: "Step 3", title: "Visualize", body: "Build views your team actually checks." },
            { label: "Step 4", title: "Alert", body: "Flag anomalies and opportunities automatically." },
            { label: "Step 5", title: "Improve", body: "Use insights to iterate on what matters most." },
        ],
    },
    beforeAfter: {
        title: "Before Newport vs. After Newport",
        beforeTitle: "Before",
        afterTitle: "After",
        beforeBullets: [
            "Data spread across five tools with no summary",
            "Hard to spot where leads drop off",
            "Guessing which marketing channel is working",
            "Slow decisions from manual reporting",
        ],
        afterBullets: [
            "One dashboard showing KPIs and pipeline health",
            "Bottlenecks visible at a glance",
            "Source tracking tied to real outcomes",
            "Faster weekly decisions with less manual work",
        ],
    },
    whatYouGet: [
        "Pipeline health + KPI snapshot",
        "Source/performance reporting",
        "Visual trends that reveal what to fix next",
    ],
    proofPoints: [
        "Built for clarity, not complexity",
        "Uses operational metrics teams understand",
        "Improves weekly decision-making speed",
    ],
    cta: {
        title: "Get clarity fast",
        body: "We'll set up dashboards that match how your business actually runs.",
        buttonLabel: "See dashboard example",
        href: "/contact",
    },
};

export default function DashboardPage() {
    return <FeaturePageTemplate {...data} />;
}
