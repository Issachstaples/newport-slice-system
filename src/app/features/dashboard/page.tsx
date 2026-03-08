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
