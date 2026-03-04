"use client";

import { useState } from "react";
import { Sparkles, Zap, Shield, Star, Rocket, ChevronRight } from "lucide-react";

const iconMap = {
    sparkles: Sparkles,
    zap: Zap,
    shield: Shield,
    star: Star,
    rocket: Rocket,
};

export interface HeroCard {
    icon: keyof typeof iconMap;
    title: string;
    description: string;
}

export interface HeroCarouselProps {
    cards: HeroCard[];
    alphaClassName?: string;
    betaClassName?: string;
}

export default function HeroCarousel({ cards, alphaClassName = "", betaClassName = "" }: HeroCarouselProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % cards.length);
    };

    // Alpha card (active) and Beta card (on-deck)
    const alphaCard = cards[activeIndex];
    const betaIndex = (activeIndex + 1) % cards.length;
    const betaCard = cards[betaIndex];

    const AlphaIcon = iconMap[alphaCard.icon];
    const BetaIcon = iconMap[betaCard.icon];

    return (
        <>
            {/* ALPHA CARD (Active - Left) */}
            <div className={`transition-all duration-500 ease-out ${alphaClassName}`}>
                <div
                    className="relative glass-panel-strong rounded-2xl p-6 w-full max-w-md"
                    style={{
                        boxShadow: '0 0 0 1px #3B82F6, 0 20px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(59, 130, 246, 0.2)',
                    }}
                >
                    {/* Pulsing target dot indicator */}
                    <div className="absolute top-3 right-3">
                        <div className="relative w-2 h-2">
                            <div className="absolute inset-0 bg-[#3B82F6] rounded-full animate-ping opacity-75" />
                            <div className="relative bg-[#3B82F6] rounded-full w-2 h-2" />
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#3B82F6]/20 flex items-center justify-center">
                            <AlphaIcon className="w-6 h-6 text-[#3B82F6]" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-xl font-semibold text-white mb-3">
                                {alphaCard.title}
                            </h3>
                            {/* Text with dark backplate for readability */}
                            <div className="relative">
                                <div
                                    className="absolute inset-0 -m-2 rounded-lg"
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(10, 13, 20, 0.4) 0%, rgba(10, 13, 20, 0.6) 100%)',
                                        zIndex: -1,
                                    }}
                                />
                                <p className="text-sm leading-relaxed text-[#e0e7ef] relative z-10 p-2">
                                    {alphaCard.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* BETA CARD (On-Deck - Right) with Docking Frame */}
            <div
                className={`transition-all duration-500 ease-out ${betaClassName}`}
                style={{
                    transform: 'translateY(22px) scale(0.92)',
                    opacity: 0.72,
                    filter: 'brightness(0.92) saturate(0.95)',
                }}
            >
                <div className="relative w-full max-w-md">
                    {/* Docking frame behind beta card */}
                    <div
                        className="absolute inset-0 rounded-2xl pointer-events-none"
                        style={{
                            border: '1px solid rgba(59, 130, 246, 0.15)',
                            background: 'linear-gradient(to right, transparent 70%, rgba(59, 130, 246, 0.08) 100%)',
                            transform: 'scale(1.04)',
                            zIndex: -1,
                        }}
                    >
                        {/* Status dots in top-right of docking frame */}
                        <div className="absolute top-2 right-3 flex gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/40" />
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-400/30" />
                            <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]/40" />
                        </div>
                    </div>

                    <div
                        className="relative glass-panel-soft rounded-2xl p-6"
                        style={{
                            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.5)',
                        }}
                    >
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#3B82F6]/15 flex items-center justify-center">
                                <BetaIcon className="w-6 h-6 text-[#3B82F6]/70" />
                            </div>
                            <div className="flex-1 min-w-0">
                                {/* ON DECK label */}
                                <div className="text-[10px] font-semibold text-[#3B82F6]/50 uppercase tracking-wider mb-2">
                                    On Deck
                                </div>
                                <h3 className="text-lg font-semibold text-white/90 mb-3">
                                    {betaCard.title}
                                </h3>
                                <p className="text-sm leading-relaxed text-[#a8b2c1]">
                                    {betaCard.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Next button - positioned by parent */}
            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-40">
                <button
                    onClick={handleNext}
                    className="glass-panel-strong rounded-full p-4 hover:scale-110 transition-transform duration-300 group"
                    aria-label="Next card"
                >
                    <ChevronRight className="w-6 h-6 text-[#3B82F6] group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

            {/* Dot indicators - positioned by parent */}
            <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 flex gap-2">
                {cards.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setActiveIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === activeIndex
                            ? "bg-[#3B82F6] w-8"
                            : "bg-[#a8b2c1]/40 hover:bg-[#a8b2c1]/60"
                            }`}
                        aria-label={`Go to card ${idx + 1}`}
                    />
                ))}
            </div>
        </>
    );
}
