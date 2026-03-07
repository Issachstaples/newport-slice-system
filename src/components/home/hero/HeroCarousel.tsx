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
    // Single source of truth — shared by card clicks, dot nav, and Next button
    const [activeIndex, setActiveIndex] = useState(0);

    // Guard against empty or missing cards array (must come after hooks)
    if (!cards || cards.length === 0) return null;

    const handleNext = () => setActiveIndex((prev) => (prev + 1) % cards.length);

    const alphaCard = cards[activeIndex];
    const alphaIndex = activeIndex; // explicit alias — used in onClick for symmetry with betaIndex
    const betaIndex = (activeIndex + 1) % cards.length;
    const betaCard = cards[betaIndex];

    const AlphaIcon = iconMap[alphaCard.icon];
    const BetaIcon = iconMap[betaCard.icon];

    return (
        <>
            {/* ALPHA CARD (Active - Left) */}
            <div className={`transition-all duration-500 ease-out ${alphaClassName}`}>
                {/*
                  Rendered as <button> so it is keyboard-focusable and screen-reader
                  discoverable. Clicking the active card re-selects it explicitly
                  via alphaIndex — symmetric with the beta card's betaIndex.
                */}
                <button
                    type="button"
                    onClick={() => setActiveIndex(alphaIndex)}
                    aria-pressed={true}
                    aria-label={`Active card: ${alphaCard.title}`}
                    className="relative glass-panel-strong rounded-2xl p-6 w-full max-w-md text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0d14]"
                    style={{
                        boxShadow: "0 0 0 1px #3B82F6, 0 20px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(59, 130, 246, 0.2)",
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
                            <div className="relative">
                                <div
                                    className="absolute inset-0 -m-3 rounded-xl"
                                    style={{
                                        background: "linear-gradient(135deg, rgba(10, 13, 20, 0.5) 0%, rgba(10, 13, 20, 0.7) 100%)",
                                        zIndex: -1,
                                    }}
                                />
                                <p className="text-sm leading-relaxed text-[#e0e7ef] relative z-10 p-3">
                                    {alphaCard.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </button>
            </div>

            {/* BETA CARD (On-Deck - Right) */}
            <div
                className={`transition-all duration-500 ease-out ${betaClassName}`}
                style={{
                    transform: "translateY(22px) scale(0.92)",
                    opacity: 0.72,
                    filter: "brightness(0.92) saturate(0.95)",
                }}
            >
                <div className="relative w-full max-w-md">
                    {/* Docking frame behind beta card */}
                    <div
                        className="absolute inset-0 rounded-2xl pointer-events-none"
                        style={{
                            border: "1px solid rgba(59, 130, 246, 0.15)",
                            background: "linear-gradient(to right, transparent 70%, rgba(59, 130, 246, 0.08) 100%)",
                            transform: "scale(1.04)",
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

                    {/*
                      Beta card is also a <button>: clicking it promotes this card
                      to alpha by calling setActiveIndex(betaIndex).
                    */}
                    <button
                        type="button"
                        onClick={() => setActiveIndex(betaIndex)}
                        aria-pressed={false}
                        aria-label={`Select card: ${betaCard.title}`}
                        className="relative glass-panel-soft rounded-2xl p-6 w-full text-left cursor-pointer hover:brightness-110 transition-[filter] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0d14]"
                        style={{
                            boxShadow: "0 12px 32px rgba(0, 0, 0, 0.5)",
                        }}
                    >
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#3B82F6]/15 flex items-center justify-center">
                                <BetaIcon className="w-6 h-6 text-[#3B82F6]/70" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-[10px] font-semibold text-[#3B82F6]/50 uppercase tracking-wider mb-2">
                                    On Deck
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-3">
                                    {betaCard.title}
                                </h3>
                                <p className="text-sm leading-relaxed text-[#cbd5e0]">
                                    {betaCard.description}
                                </p>
                            </div>
                        </div>
                    </button>
                </div>
            </div>

            {/* Controls cluster */}
            <div className="fixed bottom-10 left-10 z-40 flex items-center gap-4">
                {/* Next button */}
                <button
                    onClick={handleNext}
                    className="glass-panel-strong rounded-full p-3 hover:scale-110 active:scale-95 transition-all duration-200 group"
                    aria-label="Next card"
                >
                    <ChevronRight className="w-5 h-5 text-[#3B82F6] group-hover:translate-x-0.5 transition-transform" />
                </button>

                {/* Dot indicators */}
                <div className="flex gap-1.5 opacity-40 hover:opacity-100 transition-opacity duration-300">
                    {cards.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveIndex(idx)}
                            aria-label={`Go to card ${idx + 1}`}
                            aria-pressed={idx === activeIndex}
                            className={`rounded-full transition-all duration-300 ${idx === activeIndex
                                ? "bg-[#3B82F6] w-6 h-1.5"
                                : "bg-[#a8b2c1]/50 hover:bg-[#a8b2c1]/70 w-1.5 h-1.5"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
