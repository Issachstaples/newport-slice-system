import HeroShadowbox from "@/slices/HeroShadowbox";

export default function V2PreviewPage() {
    return (
        <HeroShadowbox
            headline="Build faster with Newport"
            subheadline="Modern component system with Prismic CMS integration and Tailwind styling"
            cards={[
                {
                    icon: "sparkles",
                    title: "Visual Mode System",
                    description:
                        "Gradient orbs and 3D helix effects built into every slice for stunning visual variety.",
                },
                {
                    icon: "zap",
                    title: "Universal Controls",
                    description:
                        "Consistent control block across all slices: enabled state, padding, container width.",
                },
                {
                    icon: "shield",
                    title: "Defensive Rendering",
                    description:
                        "Array guards, kill-switches, and wrapper awareness ensure zero runtime errors.",
                },
                {
                    icon: "star",
                    title: "Rich Text Safety",
                    description:
                        "SafeRichText component with normalizeRichText prevents null crashes from CMS data.",
                },
                {
                    icon: "rocket",
                    title: "Slice Machine v2",
                    description:
                        "Full TypeScript support with canonical model templates and mock discipline.",
                },
            ]}
        />
    );
}
