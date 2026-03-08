import type { Metadata } from "next";
import FeaturePageTemplate from "@/components/features/FeaturePageTemplate";
import type { FeaturePageData } from "@/components/features/FeaturePageTemplate";

export const metadata: Metadata = {
    title: "From Lead to Close on Autopilot. | Newport",
    description: "Smart automations handle the busywork—so nothing slips through the cracks.",
};

const data: FeaturePageData = {
    title: "From Lead to Close on Autopilot.",
    subhead: "Smart automations handle the busywork—so nothing slips through the cracks.",
    problem:
        "Most businesses don't have a lead problem—they have a follow-up problem. Missed replies, inconsistent handoffs, forgotten tasks, and slow response times quietly kill revenue.",
    solution:
        "AI-powered workflows run your playbook. Leads get routed, follow-ups get triggered, reminders fire automatically, and deals keep moving.",
    qa: [
        {
            question: "How do I respond instantly without being online 24/7?",
            answerLead: "Automations acknowledge leads and trigger the next step immediately.",
            bullets: [
                "Instant confirmation + next action",
                "Routing to the right person/team",
                "Timing-based nudges and reminders",
            ],
        },
        {
            question: "How do I follow up consistently?",
            answerLead: "Your follow-up becomes a system, not a memory test.",
            bullets: [
                "Workflow sequences by lead type/stage",
                "Task generation for calls, quotes, check-ins",
                "Escalations when leads go cold",
            ],
        },
        {
            question: "How do I scale without breaking operations?",
            answerLead: "Automation keeps the process consistent as volume grows.",
            bullets: [
                "Less manual work per lead",
                "Fewer dropped balls",
                "More closed deals with the same team",
            ],
        },
    ],
    whatYouGet: [
        "Workflow templates for lead handling + follow-up",
        "Automated reminders and next-step triggers",
        "AI assist where it saves time (summary, drafting, triage)",
    ],
    proofPoints: [
        "Designed to eliminate \u201Cmissed follow-up\u201D failure modes",
        "Built around repeatable operating procedures",
        "Scales cleanly as lead volume increases",
    ],
    cta: {
        title: "Automate the next step",
        body: "Tell us your lead process and we'll show what to automate first.",
        buttonLabel: "Map my workflow",
        href: "/contact",
    },
};

export default function AutopilotPage() {
    return <FeaturePageTemplate {...data} />;
}
