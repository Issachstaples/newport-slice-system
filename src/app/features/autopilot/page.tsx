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
    processFlow: {
        title: "How Autopilot Runs Your Playbook",
        intro: "Every lead enters a workflow that handles the next step—automatically.",
        steps: [
            { label: "Step 1", title: "Trigger", body: "A new lead, form, or event starts the workflow." },
            { label: "Step 2", title: "Route", body: "Lead assigned to the right person or queue." },
            { label: "Step 3", title: "Sequence", body: "Timed follow-ups fire across the right channels." },
            { label: "Step 4", title: "Remind", body: "Tasks and nudges keep your team on track." },
            { label: "Step 5", title: "Escalate", body: "Deals at risk get flagged before they go cold." },
        ],
    },
    beforeAfter: {
        title: "Before Newport vs. After Newport",
        beforeTitle: "Before",
        afterTitle: "After",
        beforeBullets: [
            "Manual follow-ups and forgotten callbacks",
            "Slow response times lose warm leads",
            "Inconsistent handoffs between team members",
            "Deals stall with no automatic nudge",
        ],
        afterBullets: [
            "Instant replies and smart routing on every lead",
            "Automated sequences run without your input",
            "Reminders fire so nothing falls through",
            "Escalations catch at-risk deals before they go cold",
        ],
    },
    chartPanel: {
        title: "Delay Creates Drop-Off",
        description: "Follow-up consistency protects your qualification odds.",
        chartType: "bar",
        data: [
            { response_time: "5 min", odds_index: 100 },
            { response_time: "10 min", odds_index: 25 },
            { response_time: "30 min", odds_index: 5 },
        ],
        config: {
            odds_index: { label: "Odds Index (normalized)" },
        },
        insight:
            "Automations protect speed-to-lead and consistency\u2014two major drivers of follow-up success. Index values are normalized for readability, not a promise of outcomes.",
        sources: [
            {
                label: "MIT \u2014 Lead Response Management Study (via HubSpot PDF)",
                href: "https://cdn2.hubspot.net/hub/25649/file-13535879-pdf/docs/mit_study.pdf",
            },
        ],
    },
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
