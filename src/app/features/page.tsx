import type { Metadata } from "next";
import Link from "next/link";
import { HERO_CARDS } from "@/lib/heroCards";

export const metadata: Metadata = {
    title: "Features | Newport",
    description:
        "Five outcomes. One operating system. Explore Newport\u2019s tools for SEO, pipeline, automations, dashboards, and modular growth.",
};

// ── Divider (matches FeaturePageTemplate aesthetic) ───────────────────────────
function Divider() {
    return (
        <div className="max-w-3xl mx-auto px-6 my-10" aria-hidden="true">
            <div
                className="h-px w-full"
                style={{
                    background:
                        "linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.18) 40%, rgba(59, 130, 246, 0.18) 60%, transparent)",
                }}
            />
        </div>
    );
}

// ── Arrow icon (internal link affordance) ─────────────────────────────────────
function ArrowRight() {
    return (
        <svg
            viewBox="0 0 16 16"
            className="w-3.5 h-3.5 flex-shrink-0 text-[#3B82F6]/50 group-hover:text-[#3B82F6] group-hover:translate-x-0.5 transition-all duration-150"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
        >
            <line x1="2" y1="8" x2="13" y2="8" />
            <polyline points="9,4 13,8 9,12" />
        </svg>
    );
}

export default function FeaturesHubPage() {
    return (
        <div className="min-h-screen bg-[#0a0d14] text-white">
            {/* Ambient grid */}
            <div className="fixed inset-0 app-grid pointer-events-none" aria-hidden="true" />

            {/* Cobalt ambient bleed */}
            <div
                className="fixed inset-0 pointer-events-none"
                aria-hidden="true"
                style={{
                    background:
                        "radial-gradient(900px 600px at 10% 0%, rgba(59, 130, 246, 0.07), transparent 70%)",
                }}
            />

            <main className="relative z-10 pb-32">

                {/* ── HERO ─────────────────────────────────────────────────── */}
                <div className="relative overflow-hidden pt-24 pb-16">
                    <div className="relative max-w-3xl mx-auto px-6">
                        {/* Eyebrow chip */}
                        <div className="glass-chip mb-6 w-fit">
                            <span
                                className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]"
                                aria-hidden="true"
                            />
                            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#3B82F6]/80">
                                Platform
                            </span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-metallic mb-5">
                            Features
                        </h1>
                        <p className="text-lg text-[#a8b2c1] leading-relaxed max-w-xl">
                            Five outcomes. One operating system.
                        </p>
                    </div>
                </div>

                <Divider />

                {/* ── FEATURE CARDS GRID ───────────────────────────────────── */}
                <section className="relative max-w-3xl mx-auto px-6 mb-10">
                    <h2 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#3B82F6]/70 mb-6">
                        Choose Your Outcome
                    </h2>

                    <ol className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {HERO_CARDS.map((card, i) => (
                            <li key={card.href}>
                                <Link
                                    href={card.href}
                                    className="group relative flex flex-col justify-between h-full glass-panel glass-rim rounded-2xl p-6 transition-all duration-200 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0d14]"
                                    style={{
                                        boxShadow:
                                            "0 0 0 0px transparent",
                                    }}
                                >
                                    {/* Index number */}
                                    <span
                                        className="text-[10px] font-bold tabular-nums text-[#3B82F6]/30 mb-3 select-none"
                                        aria-hidden="true"
                                    >
                                        0{i + 1}
                                    </span>

                                    {/* Card body */}
                                    <div className="flex-1">
                                        <p className="text-base font-semibold text-white leading-snug mb-2">
                                            {card.title}
                                        </p>
                                        <p className="text-sm text-[#a8b2c1] leading-relaxed">
                                            {card.blurb}
                                        </p>
                                    </div>

                                    {/* Footer row */}
                                    <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/[0.06]">
                                        <span className="text-[10px] font-semibold uppercase tracking-widest text-[#3B82F6]/40 group-hover:text-[#3B82F6]/70 transition-colors duration-150">
                                            Explore
                                        </span>
                                        <ArrowRight />
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ol>
                </section>

                <Divider />

                {/* ── HOW IT WORKS ─────────────────────────────────────────── */}
                <section className="relative max-w-3xl mx-auto px-6 mb-10">
                    <h2 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#3B82F6]/70 mb-6">
                        How It Works
                    </h2>

                    <div className="glass-panel rounded-2xl p-6 glass-rim">
                        <ol className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-0">
                            {[
                                {
                                    n: "01",
                                    title: "Choose outcome",
                                    body: "Pick the feature that matches the problem you\u2019re solving right now.",
                                },
                                {
                                    n: "02",
                                    title: "Deploy system",
                                    body: "We configure and activate the workflows, pages, or dashboards for your business.",
                                },
                                {
                                    n: "03",
                                    title: "Measure + optimize",
                                    body: "Track the numbers that matter and iterate as your operations grow.",
                                },
                            ].map((step, i, arr) => (
                                <li
                                    key={step.n}
                                    className="flex md:flex-col items-start md:items-center gap-3 md:gap-0 relative"
                                >
                                    {/* Desktop connector */}
                                    {i < arr.length - 1 && (
                                        <span
                                            className="hidden md:block absolute top-[18px] left-[calc(50%+18px)] w-[calc(100%-36px)] h-px"
                                            aria-hidden="true"
                                            style={{
                                                background:
                                                    "linear-gradient(90deg, rgba(59,130,246,0.35), rgba(59,130,246,0.10))",
                                            }}
                                        />
                                    )}
                                    {/* Mobile connector */}
                                    {i < arr.length - 1 && (
                                        <span
                                            className="md:hidden flex-shrink-0 text-[#3B82F6]/40 text-xs leading-none mt-0.5"
                                            aria-hidden="true"
                                        >
                                            ↓
                                        </span>
                                    )}

                                    {/* Bubble */}
                                    <span
                                        className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full border border-[#3B82F6]/30 bg-[#3B82F6]/10 text-[#3B82F6] text-xs font-bold md:mb-3 z-10"
                                        aria-hidden="true"
                                    >
                                        {step.n}
                                    </span>

                                    {/* Text */}
                                    <div className="md:text-center md:px-2">
                                        <p className="text-sm font-semibold text-white leading-snug">
                                            {step.title}
                                        </p>
                                        <p className="text-xs text-[#a8b2c1] mt-1 leading-relaxed">
                                            {step.body}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>

                <Divider />

                {/* ── CTA ──────────────────────────────────────────────────── */}
                <section className="relative max-w-3xl mx-auto px-6">
                    <h2 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#3B82F6]/70 mb-6">
                        Next Step
                    </h2>
                    <div
                        className="glass-panel-strong rounded-2xl p-8 text-center"
                        style={{
                            boxShadow:
                                "0 0 0 1px #3B82F6, 0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(59, 130, 246, 0.2)",
                        }}
                    >
                        <p className="text-2xl font-bold text-white mb-3">
                            Not sure where to start?
                        </p>
                        <p className="text-[#a8b2c1] mb-7 max-w-md mx-auto leading-relaxed">
                            Tell us your biggest bottleneck and we&apos;ll show you which module solves it first.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-sm text-white transition-all duration-200 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0d14]"
                            style={{
                                background: "#3B82F6",
                                boxShadow:
                                    "0 0 24px rgba(59, 130, 246, 0.5), 0 0 10px rgba(59, 130, 246, 0.3)",
                            }}
                        >
                            Talk to us
                        </Link>
                    </div>
                </section>

            </main>
        </div>
    );
}
