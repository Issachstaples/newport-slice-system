import React from "react";
import HeroBackground from "./HeroBackground";
import HeroCarousel, { HeroCard } from "./HeroCarousel";

export interface HeroShadowboxProps {
    backgroundSrc: string;
    headline: string;
    subheadline: string;
    cards: HeroCard[];
    ctaText?: string;
    ctaHref?: string;
    secondaryCtaText?: string;
    secondaryCtaHref?: string;
}

export default function HeroShadowbox({
    backgroundSrc,
    headline,
    subheadline,
    cards,
    ctaText,
    ctaHref,
    secondaryCtaText,
    secondaryCtaHref,
}: HeroShadowboxProps) {
    return (
        <section className="relative min-h-screen overflow-hidden bg-[#0a0d14]">
            {/* Layer 0: Background with image + overlays */}
            <HeroBackground src={backgroundSrc} alt="Hero background" />

            {/* Layer 10: Optics placeholder (reserved for future laser/particle effects) */}
            <div className="absolute inset-0 z-10 pointer-events-none" aria-hidden="true" />

            {/* Layer 20: UI content - Absolute positioned HUD cards */}
            <div className="relative z-20 min-h-screen">

                {/* TOP-LEFT: Headline Card (no CTAs) */}
                <div className="absolute left-6 lg:left-10 top-6 lg:top-10 w-full max-w-[calc(100%-3rem)] lg:max-w-[520px]">
                    <div className="relative glass-panel-strong rounded-3xl p-6 lg:p-8 shadow-[var(--shadow-glass-lg)]">
                        {/* Subtle top sheen overlay */}
                        <div
                            className="absolute inset-x-0 top-0 h-24 rounded-t-3xl pointer-events-none"
                            style={{
                                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.08), transparent)',
                            }}
                        />

                        <div className="relative">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-metallic leading-tight">
                                {headline}
                            </h1>
                            <p className="text-base sm:text-lg text-[#cbd5e0] leading-relaxed">
                                {subheadline}
                            </p>
                        </div>
                    </div>
                </div>

                {/* CENTER remains EMPTY by design */}

                {/* Carousel with absolute-positioned alpha (left) and beta (right) slots */}
                <HeroCarousel
                    cards={cards}
                    alphaClassName="absolute left-6 lg:left-10 top-[220px] sm:top-[240px] lg:top-[280px] z-20"
                    betaClassName="absolute right-6 lg:right-10 top-[420px] sm:top-[340px] lg:top-[180px] z-10"
                />
            </div>

            {/* Layer 30: BOTTOM-RIGHT CTA Card - Pinned, never moves */}
            <div className="absolute bottom-6 lg:bottom-10 right-6 lg:right-10 z-30 w-[calc(100%-3rem)] lg:w-96">
                <div className="relative glass-panel-strong rounded-2xl p-6 lg:p-8">
                    {/* Decorative accent line (neutral, no metrics) */}
                    <div className="absolute top-0 right-0 w-32 h-1 bg-gradient-to-l from-[#3B82F6]/30 to-transparent rounded-tr-2xl" />

                    <h2 className="text-2xl font-bold text-white mb-3">
                        Pay only for what you use.
                    </h2>
                    <p className="text-sm text-[#a8b2c1] mb-6 leading-relaxed">
                        Modular pricing designed for scale. Toggle features on or off to match your workflow—no waste, just value.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 mb-4">
                        {ctaText && ctaHref && (
                            <a
                                href={ctaHref}
                                className="inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-semibold text-white bg-[#3B82F6] hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                            >
                                {ctaText}
                            </a>
                        )}
                        {secondaryCtaText && secondaryCtaHref && (
                            <a
                                href={secondaryCtaHref}
                                className="inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-semibold text-[#cbd5e0] border border-[#cbd5e0]/30 hover:scale-105 hover:border-[#cbd5e0]/50 transition-all duration-300"
                                style={{
                                    background: 'rgba(255, 255, 255, 0.03)',
                                }}
                            >
                                {secondaryCtaText}
                            </a>
                        )}
                    </div>

                    {/* Microcopy */}
                    <p className="text-xs text-[#a8b2c1]/70 leading-relaxed">
                        Modular pricing. Scale up or down anytime.
                    </p>
                </div>
            </div>
        </section>
    );
}
