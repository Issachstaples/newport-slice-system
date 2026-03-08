import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "About Newport",
    description:
        "We build conversion-first websites and business operating systems designed to scale.",
};

const WHAT_WE_BUILD = [
    "SEO-first sites — fast, structured, built to rank",
    "Pipeline + CRM — HelixFlow installed and configured",
    "Automations — lead intake, follow-up, review + referral",
    "Dashboards — live reporting so you see what's working",
    "Modular pricing — add Fusebox modules as your needs grow",
] as const;

const HOW_WE_WORK = [
    {
        step: "1",
        label: "Audit",
        desc: "We review your current site, funnel, and lead flow to identify the highest-leverage gaps.",
    },
    {
        step: "2",
        label: "Build",
        desc: "We build the site, configure HelixFlow, and wire every automation before you go live.",
    },
    {
        step: "3",
        label: "Optimize",
        desc: "After launch we track performance, tune automations, and roll out new modules as you scale.",
    },
] as const;

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#0a0d14] text-white">
            {/* Ambient grid */}
            <div className="fixed inset-0 app-grid pointer-events-none" aria-hidden="true" />
            {/* Cobalt radial bleed */}
            <div
                className="fixed inset-0 pointer-events-none"
                aria-hidden="true"
                style={{
                    background:
                        "radial-gradient(900px 600px at 10% 0%, rgba(59,130,246,0.07), transparent 70%)",
                }}
            />

            <main className="relative z-10 max-w-3xl mx-auto px-6 pt-28 pb-32">
                {/* Hero */}
                <div className="mb-12">
                    <div className="glass-chip mb-5 w-fit">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" aria-hidden="true" />
                        <span className="text-[10px] font-semibold uppercase tracking-widest text-[#3B82F6]/80">
                            About
                        </span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-5 leading-[1.1]">
                        About Newport
                    </h1>
                    <p className="text-lg text-[#a8b2c1] leading-relaxed max-w-2xl">
                        We build conversion-first websites and business operating systems designed to scale.
                    </p>
                </div>

                {/* Panels */}
                <div className="space-y-5">
                    {/* Panel 1 — What we build */}
                    <div className="glass-panel glass-rim rounded-2xl p-7">
                        <h2 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#3B82F6]/70 mb-5">
                            What We Build
                        </h2>
                        <ul className="space-y-3">
                            {WHAT_WE_BUILD.map((item) => (
                                <li key={item} className="flex items-start gap-3 text-sm text-[#cbd5e0]">
                                    <span
                                        className="mt-1 shrink-0 w-4 h-4 rounded-full bg-[#3B82F6]/15 border border-[#3B82F6]/30 flex items-center justify-center"
                                        aria-hidden="true"
                                    >
                                        <svg viewBox="0 0 10 8" className="w-2.5 h-2 text-[#3B82F6] fill-none stroke-current stroke-[1.8]">
                                            <polyline points="1,4 4,7 9,1" />
                                        </svg>
                                    </span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Panel 2 — How we work */}
                    <div className="glass-panel-soft glass-rim rounded-2xl p-7">
                        <h2 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#3B82F6]/70 mb-6">
                            How We Work
                        </h2>
                        <ol className="space-y-5">
                            {HOW_WE_WORK.map(({ step, label, desc }) => (
                                <li key={label} className="flex items-start gap-4">
                                    <span className="shrink-0 w-7 h-7 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/30 flex items-center justify-center text-[11px] font-bold text-[#3B82F6]">
                                        {step}
                                    </span>
                                    <div>
                                        <p className="text-sm font-semibold text-white mb-0.5">{label}</p>
                                        <p className="text-sm text-[#a8b2c1] leading-relaxed">{desc}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>

                    {/* Panel 3 — CTA */}
                    <div
                        className="glass-panel-strong rounded-2xl p-8 text-center"
                        style={{
                            boxShadow:
                                "0 0 0 1px #3B82F6, 0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(59,130,246,0.2)",
                        }}
                    >
                        <h2 className="text-xl font-bold text-white mb-3">Want a walkthrough?</h2>
                        <p className="text-sm text-[#a8b2c1] mb-7 max-w-sm mx-auto leading-relaxed">
                            We&apos;ll map exactly which site + system modules make sense for your business—no pitch, just a plan.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-block px-8 py-3 rounded-full bg-[#3B82F6] text-white text-sm font-semibold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20"
                        >
                            Book a Demo
                        </Link>
                    </div>
                </div>

                {/* Footer nav */}
                <div className="mt-12 flex items-center gap-6 text-sm text-[#4a5568]">
                    <Link href="/" className="hover:text-[#3B82F6] transition-colors">
                        ← Back to Home
                    </Link>
                    <Link href="/features" className="hover:text-[#3B82F6] transition-colors">
                        View Features
                    </Link>
                </div>
            </main>
        </div>
    );
}
