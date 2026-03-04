import React from "react";
import { Sparkles, Zap, Shield, Star, Rocket } from "lucide-react";

const iconMap = {
    sparkles: Sparkles,
    zap: Zap,
    shield: Shield,
    star: Star,
    rocket: Rocket,
};

export interface HeroShadowboxCard {
    icon: keyof typeof iconMap;
    title: string;
    description: string;
}

export interface HeroShadowboxProps {
    headline: string;
    subheadline: string;
    cards: HeroShadowboxCard[];
}

export default function HeroShadowbox({
    headline,
    subheadline,
    cards,
}: HeroShadowboxProps) {
    return (
        <section className="relative min-h-screen bg-[#0a0d14] overflow-hidden">
            {/* Background gradient orb */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-30"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(74,144,226,0.4) 0%, transparent 70%)",
                        filter: "blur(80px)",
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-6 py-24 max-w-7xl">
                {/* Hero text */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 text-metallic">
                        {headline}
                    </h1>
                    <p className="text-xl sm:text-2xl text-[#a8b2c1] max-w-3xl mx-auto">
                        {subheadline}
                    </p>
                </div>

                {/* Cards grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {cards.map((card, idx) => {
                        const Icon = iconMap[card.icon];
                        return (
                            <div
                                key={idx}
                                className="glass-panel rounded-2xl p-6 hover:scale-105 transition-transform duration-300"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#4a90e2]/20 flex items-center justify-center">
                                        <Icon className="w-6 h-6 text-[#4a90e2]" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-white mb-2">
                                            {card.title}
                                        </h3>
                                        <p className="text-sm text-[#a8b2c1] leading-relaxed">
                                            {card.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
