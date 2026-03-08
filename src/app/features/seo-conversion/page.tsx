import type { Metadata } from "next";
import FeaturePageTemplate from "@/components/features/FeaturePageTemplate";
import type { FeaturePageData } from "@/components/features/FeaturePageTemplate";

export const metadata: Metadata = {
    title: "Rank higher. Convert more. Grow faster. | Newport",
    description: "SEO-first websites engineered to rank fast and turn clicks into revenue.",
};

const data: FeaturePageData = {
    title: "Rank higher. Convert more. Grow faster.",
    subhead: "SEO-first websites engineered to rank fast and turn clicks into revenue.",
    problem:
        "Most websites look fine—but they don't perform. They load slow, bury the offer, and give Google nothing to trust. The result: low rankings, low conversions, and wasted traffic.",
    solution:
        "We build conversion-first sites on modern frameworks with a technical SEO foundation baked in—speed, structure, and intent-driven content blocks that search engines can index and customers can act on.",
    qa: [
        {
            question: "How do I rank on the first page of Google?",
            answerLead: "We build a crawlable, fast, and structured foundation that Google can trust.",
            bullets: [
                "Performance-first architecture (Core Web Vitals, clean rendering)",
                "Proper headings, internal linking, and index-ready page structure",
                "Schema + metadata patterns that support visibility",
            ],
        },
        {
            question: "How do I convert more traffic?",
            answerLead: "We design pages around decision-making—clear, guided, and frictionless.",
            bullets: [
                "Strong above-the-fold message + \u201Cnext step\u201D CTA",
                "Trust signals (proof, reviews, process, guarantees)",
                "Conversion paths for every intent (call, form, book, buy)",
            ],
        },
        {
            question: "How do I grow faster?",
            answerLead: "When ranking and conversion work together, every channel improves.",
            bullets: [
                "Higher ROI from ads (better landing performance)",
                "More qualified leads from organic search",
                "Cleaner funnel data for optimization",
            ],
        },
    ],
    whatYouGet: [
        "SEO-ready templates and structure across key pages",
        "Conversion-optimized layouts and CTAs",
        "Speed + technical performance best practices",
        "Clear messaging hierarchy and trust placement",
    ],
    proofPoints: [
        "Built for speed and indexability from day one",
        "Designed around intent and action, not \u201Cpretty pages\u201D",
        "Structured content that scales across services and locations",
    ],
    cta: {
        title: "Want a site that ranks and sells?",
        body: "Get a quick audit and a build plan tailored to your offer.",
        buttonLabel: "Get a quick audit",
        href: "/contact",
    },
};

export default function SeoConversionPage() {
    return <FeaturePageTemplate {...data} />;
}
