"use client";

import React, { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import HeroBackground from "./HeroBackground";
import HeroCarousel, { HeroCardData } from "./HeroCarousel";

// Dynamic imports for client-only 3D components
const Shadowbox3D = dynamic(() => import("./Shadowbox3D"), { ssr: false });
const HybridHero3D = dynamic(() => import("./HybridHero3D"), { ssr: false });

// Debug flag: set to true to disable old background
const DEBUG_SHADOWBOX_3D = true;

// A/B testing flag: set to true to use HybridHero3D instead of Shadowbox3D
const USE_HYBRID_HERO = true;

// DEBUG: set to true to strip all gradient/haze overlays so the backdrop renders unobstructed
const DEBUG_NO_OVERLAYS = true;

export interface HeroShadowboxProps {
    backgroundSrc: string;
    headline: string;
    subheadline: string;
    cards: HeroCardData[];
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
    const heroRef = useRef<HTMLElement>(null);
    const [eventSourceEl, setEventSourceEl] = useState<HTMLElement | null>(null);
    useEffect(() => { setEventSourceEl(heroRef.current); }, []);

    return (
        <section ref={heroRef} className="relative min-h-screen overflow-hidden bg-[#0a0d14]">
            {/* Layer 0: Background with image + overlays */}
            {!DEBUG_SHADOWBOX_3D && (
                <HeroBackground src={backgroundSrc} alt="Hero background" />
            )}

            {/* Layer 5: Localized cavity vignette behind HybridHero3D (centered on cradle opening) */}
            {!DEBUG_NO_OVERLAYS && (
                <div
                    className="absolute z-[5] pointer-events-none"
                    style={{
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 'clamp(500px, 60vw, 800px)',
                        height: 'clamp(400px, 50vh, 650px)',
                        background: 'radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 65%, rgba(0,0,0,0.18) 88%, rgba(0,0,0,0.28) 100%)',
                        opacity: 0.06,
                    }}
                    aria-hidden="true"
                />
            )}

            {/* Layer 8: Exposure-lift — soft centre brightening, below HUD, above backdrop */}
            {!DEBUG_NO_OVERLAYS && (
                <div
                    className="absolute inset-0 z-[8] pointer-events-none"
                    style={{
                        background: 'radial-gradient(ellipse 75% 60% at 50% 48%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 100%)',
                        opacity: 0.14,
                    }}
                    aria-hidden="true"
                />
            )}

            {/* Layer 10: 3D Shadowbox optics effect — full-bleed Canvas so cradle can extend to edges */}
            <div
                className="absolute inset-0 z-10"
                aria-hidden="true"
            >
                {USE_HYBRID_HERO ? <HybridHero3D eventSourceEl={eventSourceEl} /> : <Shadowbox3D />}
            </div>

            {/* Layer 20: UI content - Absolute positioned HUD cards */}
            <div className="relative z-20 min-h-screen">

                {/* TOP-LEFT: Headline Card (reduced dominance) */}
                <div className="absolute left-6 lg:left-10 top-6 lg:top-10 w-full max-w-[calc(100%-3rem)] lg:max-w-[480px]">
                    <div className="relative glass-panel rounded-3xl p-6 lg:p-7 shadow-[var(--shadow-glass)]">
                        {/* Subtle top sheen overlay */}
                        <div
                            className="absolute inset-x-0 top-0 h-20 rounded-t-3xl pointer-events-none"
                            style={{
                                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.06), transparent)',
                            }}
                        />

                        <div className="relative">
                            {/* Eyebrow HUD label */}
                            <div className="text-[10px] font-semibold text-[#a8b2c1]/60 uppercase tracking-[0.15em] mb-3">
                                SYSTEM
                            </div>

                            <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold mb-3 text-metallic leading-tight">
                                {headline}
                            </h1>
                            <p className="text-sm sm:text-base text-[#cbd5e0]/90 leading-relaxed">
                                {subheadline}
                            </p>
                        </div>
                    </div>
                </div>

                {/* CENTER remains EMPTY by design */}

                {/* Subtle horizontal divider between headline and alpha card */}
                <div
                    className="absolute left-6 lg:left-10 top-[280px] sm:top-[300px] lg:top-[360px] w-12 h-[1px]"
                    style={{
                        background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.15) 50%, transparent)',
                        filter: 'blur(0.5px)',
                    }}
                />

                {/* Carousel with absolute-positioned alpha (left) and beta (right) slots */}
                <HeroCarousel
                    cards={cards}
                    alphaClassName="absolute left-6 lg:left-10 top-[300px] sm:top-[320px] lg:top-[380px] z-20"
                    betaClassName="absolute right-6 lg:right-10 top-[420px] sm:top-[340px] lg:top-[180px] z-10"
                />
            </div>

            {/* Layer 30: BOTTOM-RIGHT CTA Card - Primary powered HUD module */}
            <div className="absolute bottom-6 lg:bottom-10 right-6 lg:right-10 z-30 w-[calc(100%-3rem)] lg:w-[420px]">
                <div className="relative glass-panel-strong rounded-2xl p-6 lg:p-8">
                    {/* Subtle top sheen overlay */}
                    <div
                        className="absolute inset-x-0 top-0 h-20 rounded-t-2xl pointer-events-none"
                        style={{
                            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.10), transparent)',
                        }}
                    />

                    {/* Thin cobalt gradient edge accent */}
                    <div
                        className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
                        style={{
                            background: 'linear-gradient(90deg, transparent, #3B82F6 50%, transparent)',
                        }}
                    />

                    <div className="relative">
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
                                    className="inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-semibold text-white bg-[#3B82F6] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                                    style={{
                                        boxShadow: '0 0 24px rgba(59, 130, 246, 0.6), 0 0 12px rgba(59, 130, 246, 0.4)',
                                    }}
                                >
                                    {ctaText}
                                </a>
                            )}
                            {secondaryCtaText && secondaryCtaHref && (
                                <a
                                    href={secondaryCtaHref}
                                    className="inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-semibold text-[#cbd5e0] border border-[#cbd5e0]/30 hover:scale-[1.02] hover:border-[#cbd5e0]/50 active:scale-[0.98] transition-all duration-200"
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
            </div>
        </section>
    );
}
