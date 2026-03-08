"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import type { HeroCardData } from "@/lib/heroCards";

export type { HeroCardData };

export interface HeroCarouselProps {
    cards: HeroCardData[];
    alphaClassName?: string;
    betaClassName?: string;
}

export default function HeroCarousel({ cards, alphaClassName = "", betaClassName = "" }: HeroCarouselProps) {
    // Single source of truth — shared by card clicks, dot nav, and Next button
    const [activeIndex, setActiveIndex] = useState(0);
    const router = useRouter();

    // Guard against empty or missing cards array (must come after hooks)
    if (!cards || cards.length === 0) return null;

    const handleNext = () => setActiveIndex((prev) => (prev + 1) % cards.length);

    const alphaIndex = activeIndex; // explicit alias — used in onClick for symmetry with betaIndex
    const alphaCard = cards[alphaIndex];
    const betaIndex = (activeIndex + 1) % cards.length;
    const betaCard = cards[betaIndex];

    return (
        <>
            {/* ALPHA CARD (Active - Left) */}
            <div className={`transition-all duration-500 ease-out ${alphaClassName}`}>
                {/*
                  Alpha card navigates to its feature page on click.
                  Outer wrapper is a <div role="link"> to avoid nesting buttons.
                */}
                <div
                    role="link"
                    tabIndex={0}
                    onClick={() => router.push(alphaCard.href)}
                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); router.push(alphaCard.href); } }}
                    aria-label={`Go to ${alphaCard.title}`}
                    className="relative glass-panel-strong rounded-2xl p-6 w-full max-w-md text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0d14]"
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

                    <div className="flex-1 min-w-0">
                        <h2 className="text-xl font-semibold text-white mb-3">
                            {alphaCard.title}
                        </h2>
                        <div className="relative">
                            <div
                                className="absolute inset-0 -m-3 rounded-xl"
                                style={{
                                    background: "linear-gradient(135deg, rgba(10, 13, 20, 0.5) 0%, rgba(10, 13, 20, 0.7) 100%)",
                                    zIndex: -1,
                                }}
                            />
                            <p className="text-sm leading-relaxed text-[#e0e7ef] relative z-10 p-3">
                                {alphaCard.blurb}
                            </p>
                        </div>
                        <p className="text-xs leading-relaxed text-[#a8b2c1] mt-3">
                            {alphaCard.body}
                        </p>
                        <div className="mt-4">
                            <Link
                                href={alphaCard.href}
                                onClick={(e) => e.stopPropagation()}
                                aria-label={`Explore Feature: ${alphaCard.title}`}
                                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold text-white bg-[#3B82F6] hover:bg-blue-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0d14]"
                            >
                                Explore Feature
                            </Link>
                        </div>
                    </div>
                </div>
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
                      Beta card advances the carousel when clicked — promotes this card to alpha.
                      Outer wrapper is a <div role="button"> to avoid nesting buttons.
                    */}
                    <div
                        role="button"
                        tabIndex={0}
                        onClick={() => setActiveIndex(betaIndex)}
                        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActiveIndex(betaIndex); } }}
                        aria-pressed={false}
                        aria-label={`Select card: ${betaCard.title}`}
                        className="relative glass-panel-soft rounded-2xl p-6 w-full text-left cursor-pointer hover:brightness-110 transition-[filter] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0d14]"
                        style={{
                            boxShadow: "0 12px 32px rgba(0, 0, 0, 0.5)",
                        }}
                    >
                        <div className="flex-1 min-w-0">
                            <div className="text-[10px] font-semibold text-[#3B82F6]/50 uppercase tracking-wider mb-2">
                                On Deck
                            </div>
                            <h2 className="text-lg font-semibold text-white mb-3">
                                {betaCard.title}
                            </h2>
                            <p className="text-sm leading-relaxed text-[#cbd5e0]">
                                {betaCard.blurb}
                            </p>
                            <p className="text-xs leading-relaxed text-[#a8b2c1] mt-3">
                                {betaCard.body}
                            </p>
                            <div className="mt-4">
                                <Link
                                    href={betaCard.href}
                                    onClick={(e) => e.stopPropagation()}
                                    aria-label={`Explore Feature: ${betaCard.title}`}
                                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold text-white/80 border border-[#3B82F6]/40 hover:bg-[#3B82F6]/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0d14]"
                                >
                                    Explore Feature
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Controls cluster */}
            <div className="fixed bottom-10 left-10 z-40 flex items-center gap-4">
                {/* Next button */}
                <button
                    type="button"
                    onClick={handleNext}
                    className="glass-panel-strong rounded-full p-3 hover:scale-110 active:scale-95 transition-all duration-200 group"
                    aria-label="Next card"
                >
                    <ChevronRight className="w-5 h-5 text-[#3B82F6] group-hover:translate-x-0.5 transition-transform" />
                </button>

                {/* Dot indicators */}
                <div className="flex gap-1.5 opacity-40 hover:opacity-100 transition-opacity duration-300">
                    {cards.map((card, idx) => (
                        <button
                            key={idx}
                            type="button"
                            onClick={() => setActiveIndex(idx)}
                            aria-label={`Go to card ${idx + 1}: ${card.title}`}
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