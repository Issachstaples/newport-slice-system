import HeroShadowbox from "@/components/home/hero/HeroShadowbox";
import { HERO_CARDS } from "@/lib/heroCards";

export default function V2PreviewPage() {
    return (
        <HeroShadowbox
            backgroundSrc="/images/home/neon-eye-clean.PNG"
            headline="Build faster with Newport"
            subheadline="Modern component system with Prismic CMS integration and Tailwind styling"
            cards={HERO_CARDS}
            ctaText="Book a Demo"
            ctaHref="#demo"
            secondaryCtaText="See Modules"
            secondaryCtaHref="#modules"
        />
    );
}