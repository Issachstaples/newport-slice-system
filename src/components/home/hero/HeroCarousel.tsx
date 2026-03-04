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
}

export default function HeroCarousel({ cards }: HeroCarouselProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % cards.length);
    };

    return (
        <div className="relative z-20 w-full max-w-xl">
            {/* Card stack container */}
            <div className="relative h-[300px] sm:h-[280px]">
                {cards.map((card, idx) => {
                    const Icon = iconMap[card.icon];
                    const isActive = idx === activeIndex;

                    // Calculate position in queue (0 = active, 1-4 = stacked behind)
                    const position = (idx - activeIndex + cards.length) % cards.length;

                    // Active card: full size, centered, strong glass
                    // Queued cards: scaled down, offset right, slight rotate, soft glass
                    const scale = isActive ? 1 : 0.88;
                    const translateX = isActive ? 0 : 48 + (position - 1) * 12;
                    const rotate = isActive ? 0 : (position - 1) * 1.5;
                    const opacity = isActive ? 1 : Math.max(0.35, 0.65 - (position - 1) * 0.15);
                    const zIndex = isActive ? 20 : 20 - position;

                    return (
                        <div
                            key={idx}
                            className="absolute inset-0 transition-all duration-500 ease-out"
                            style={{
                                transform: `translateX(${translateX}px) scale(${scale}) rotate(${rotate}deg)`,
                                opacity,
                                zIndex,
                                transformOrigin: 'left center',
                            }}
                        >
                            <div className={`${isActive ? 'glass-panel-strong' : 'glass-panel-soft'} rounded-2xl p-6 h-full`}>
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#4a90e2]/20 flex items-center justify-center">
                                        <Icon className="w-6 h-6 text-[#4a90e2]" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-xl font-semibold text-white mb-3">
                                            {card.title}
                                        </h3>
                                        <p className="text-sm text-[#cbd5e0] leading-relaxed">
                                            {card.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Next button */}
            <div className="flex justify-center mt-8">
                <button
                    onClick={handleNext}
                    className="glass-panel-strong rounded-full p-4 hover:scale-110 transition-transform duration-300 group"
                    aria-label="Next card"
                >
                    <ChevronRight className="w-6 h-6 text-[#4a90e2] group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

            {/* Dot indicators */}
            <div className="flex justify-center gap-2 mt-6">
                {cards.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setActiveIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === activeIndex
                            ? "bg-[#4a90e2] w-8"
                            : "bg-[#a8b2c1]/40 hover:bg-[#a8b2c1]/60"
                            }`}
                        aria-label={`Go to card ${idx + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
