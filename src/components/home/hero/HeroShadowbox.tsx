import React from "react";
import HeroBackground from "./HeroBackground";
import HeroCarousel, { HeroCard } from "./HeroCarousel";
import { TrendingUp, Briefcase, DollarSign } from "lucide-react";

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

            {/* Layer 20: UI content */}
            <div className="relative z-20 container mx-auto px-6 py-16 lg:py-24 min-h-screen flex items-center">
                {/* 2-column desktop layout, stacked mobile */}
                <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

                    {/* Left column: Headline, subheadline, CTAs */}
                    <div className="lg:col-span-5 text-center lg:text-left">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 text-metallic leading-tight">
                            {headline}
                        </h1>
                        <p className="text-lg sm:text-xl lg:text-2xl text-[#cbd5e0] mb-8 max-w-2xl mx-auto lg:mx-0">
                            {subheadline}
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            {ctaText && ctaHref && (
                                <a
                                    href={ctaHref}
                                    className="inline-block glass-panel-strong rounded-full px-8 py-4 text-lg font-semibold text-white hover:scale-105 transition-transform duration-300"
                                >
                                    {ctaText}
                                </a>
                            )}
                            {secondaryCtaText && secondaryCtaHref && (
                                <a
                                    href={secondaryCtaHref}
                                    className="inline-block glass-panel rounded-full px-8 py-4 text-lg font-semibold text-[#cbd5e0] hover:scale-105 transition-transform duration-300"
                                >
                                    {secondaryCtaText}
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Center/Left column: Carousel */}
                    <div className="lg:col-span-4 flex justify-center lg:justify-start">
                        <HeroCarousel cards={cards} />
                    </div>

                    {/* Right column: Pinned metrics/results card */}
                    <div className="lg:col-span-3 hidden lg:block">
                        <div className="glass-panel-strong rounded-2xl p-6 space-y-6">
                            <h3 className="text-sm font-semibold text-[#a8b2c1] uppercase tracking-wide">
                                Results That Matter
                            </h3>

                            {/* Metric 1: New Leads */}
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-white mb-1">+247%</div>
                                    <div className="text-sm text-[#a8b2c1]">New Leads</div>
                                </div>
                            </div>

                            {/* Metric 2: Workflow Efficiency */}
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center">
                                    <Briefcase className="w-5 h-5 text-violet-400" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-white mb-1">3.2x</div>
                                    <div className="text-sm text-[#a8b2c1]">Workflow Efficiency</div>
                                </div>
                            </div>

                            {/* Metric 3: Monthly Revenue with sparkline */}
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                                    <DollarSign className="w-5 h-5 text-blue-400" />
                                </div>
                                <div className="flex-1">
                                    <div className="text-2xl font-bold text-white mb-1">$127K</div>
                                    <div className="text-sm text-[#a8b2c1] mb-2">Monthly Revenue</div>
                                    {/* Tiny sparkline */}
                                    <svg
                                        viewBox="0 0 60 20"
                                        className="w-full h-5 opacity-60"
                                        preserveAspectRatio="none"
                                    >
                                        <polyline
                                            points="0,15 10,12 20,14 30,10 40,8 50,5 60,3"
                                            fill="none"
                                            stroke="rgba(74, 144, 226, 0.8)"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <circle cx="60" cy="3" r="2" fill="#4a90e2" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
