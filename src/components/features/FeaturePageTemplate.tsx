import Link from "next/link";
import FeatureChartPanelBlock from "@/components/features/FeatureChartPanel";

export interface FeatureQA {
    question: string;
    answerLead: string;
    bullets: string[];
}

export interface FeatureCTA {
    title: string;
    body: string;
    buttonLabel: string;
    href: string;
}

export interface FeatureProcessStep {
    label?: string;
    title: string;
    body?: string;
}

export interface FeatureProcessFlow {
    title: string;
    intro?: string;
    steps: FeatureProcessStep[]; // 4–6 steps
}

export interface FeatureBeforeAfter {
    title: string;
    beforeTitle: string;
    afterTitle: string;
    beforeBullets: string[];
    afterBullets: string[];
}

export interface FeatureChartSource {
    label: string;
    href: string;
}

export interface FeatureChartPanel {
    title: string;
    description?: string;
    chartType: "bar" | "line" | "area" | "radial" | "donut";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    config?: Record<string, any>;
    insight: string;
    sources: FeatureChartSource[];
}

export interface FeaturePageData {
    title: string;
    subhead: string;
    problem: string;
    solution: string;
    qa: FeatureQA[];
    processFlow?: FeatureProcessFlow;
    beforeAfter?: FeatureBeforeAfter;
    chartPanel?: FeatureChartPanel;
    whatYouGet: string[];
    proofPoints: string[];
    cta: FeatureCTA;
}

// ── Section wrapper ────────────────────────────────────────────────────────────
function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <section className={`relative max-w-3xl mx-auto px-6 ${className}`}>
            {children}
        </section>
    );
}

// ── Section heading (H2) ───────────────────────────────────────────────────────
function SectionHeading({ children }: { children: React.ReactNode }) {
    return (
        <h2 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#3B82F6]/70 mb-4">
            {children}
        </h2>
    );
}

// ── Divider ────────────────────────────────────────────────────────────────────
function Divider() {
    return (
        <div
            className="max-w-3xl mx-auto px-6 my-10"
            aria-hidden="true"
        >
            <div
                className="h-px w-full"
                style={{
                    background: "linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.18) 40%, rgba(59, 130, 246, 0.18) 60%, transparent)",
                }}
            />
        </div>
    );
}

export default function FeaturePageTemplate({
    title,
    subhead,
    problem,
    solution,
    qa,
    processFlow,
    beforeAfter,
    chartPanel,
    whatYouGet,
    proofPoints,
    cta,
}: FeaturePageData) {
    return (
        <div className="min-h-screen bg-[#0a0d14] text-white">
            {/* Subtle ambient grid */}
            <div className="fixed inset-0 app-grid pointer-events-none" aria-hidden="true" />

            {/* Ambient radial bleed — top-left cobalt */}
            <div
                className="fixed inset-0 pointer-events-none"
                aria-hidden="true"
                style={{
                    background: "radial-gradient(900px 600px at 10% 0%, rgba(59, 130, 246, 0.07), transparent 70%)",
                }}
            />

            <main className="relative z-10 pb-32">

                {/* ── HERO ─────────────────────────────────────────────────────── */}
                <div className="relative overflow-hidden pt-24 pb-16">
                    <Section>
                        {/* Eyebrow chip */}
                        <div className="glass-chip mb-6 w-fit">
                            <span
                                className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]"
                                aria-hidden="true"
                            />
                            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#3B82F6]/80">
                                Feature
                            </span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-metallic mb-5">
                            {title}
                        </h1>
                        <p className="text-lg text-[#a8b2c1] leading-relaxed max-w-2xl">
                            {subhead}
                        </p>
                    </Section>
                </div>

                <Divider />

                {/* ── PROBLEM ──────────────────────────────────────────────────── */}
                <Section className="mb-10">
                    <SectionHeading>The Problem</SectionHeading>
                    <div className="glass-panel rounded-2xl p-6 glass-rim">
                        <p className="text-[#cbd5e0] leading-relaxed">{problem}</p>
                    </div>
                </Section>

                {/* ── SOLUTION ─────────────────────────────────────────────────── */}
                <Section className="mb-10">
                    <SectionHeading>The Solution</SectionHeading>
                    <div
                        className="glass-panel-strong rounded-2xl p-6"
                        style={{
                            boxShadow: "0 0 0 1px rgba(59, 130, 246, 0.2), 0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(59, 130, 246, 0.12)",
                        }}
                    >
                        <p className="text-[#e0e7ef] leading-relaxed">{solution}</p>
                    </div>
                </Section>

                <Divider />

                {/* ── Q&A ──────────────────────────────────────────────────────── */}
                <Section className="mb-10">
                    <SectionHeading>Common Questions</SectionHeading>
                    <div className="flex flex-col gap-6">
                        {qa.map((item, i) => (
                            <div key={i} className="glass-panel-soft rounded-2xl p-6 glass-rim">
                                <h3 className="text-base font-semibold text-white mb-2">
                                    {item.question}
                                </h3>
                                <p className="text-sm text-[#a8b2c1] mb-3 leading-relaxed">
                                    {item.answerLead}
                                </p>
                                <ul className="flex flex-col gap-1.5">
                                    {item.bullets.map((bullet, j) => (
                                        <li key={j} className="flex items-start gap-2.5 text-sm text-[#cbd5e0]">
                                            <span
                                                className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#3B82F6]/60"
                                                aria-hidden="true"
                                            />
                                            {bullet}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </Section>

                {/* ── PROCESS FLOW ─────────────────────────────────────────────── */}
                {processFlow && (
                    <>
                        <Divider />
                        <Section className="mb-10">
                            <SectionHeading>{processFlow.title}</SectionHeading>
                            {processFlow.intro && (
                                <p className="text-sm text-[#a8b2c1] mb-6 leading-relaxed">
                                    {processFlow.intro}
                                </p>
                            )}
                            {/* Steps: horizontal flow on md+, stacked on mobile */}
                            <div className="glass-panel rounded-2xl p-6 glass-rim overflow-hidden">
                                <ol className="grid grid-cols-1 gap-4 md:grid-cols-5 md:gap-0">
                                    {processFlow.steps.map((step, i) => (
                                        <li key={i} className="flex md:flex-col items-start md:items-center gap-3 md:gap-0 relative">
                                            {/* Connector line between steps on desktop */}
                                            {i < processFlow.steps.length - 1 && (
                                                <span
                                                    className="hidden md:block absolute top-[18px] left-[calc(50%+18px)] w-[calc(100%-36px)] h-px"
                                                    aria-hidden="true"
                                                    style={{
                                                        background: "linear-gradient(90deg, rgba(59,130,246,0.35), rgba(59,130,246,0.10))",
                                                    }}
                                                />
                                            )}
                                            {/* Mobile connector chevron */}
                                            {i < processFlow.steps.length - 1 && (
                                                <span
                                                    className="md:hidden flex-shrink-0 text-[#3B82F6]/40 text-xs leading-none mt-0.5"
                                                    aria-hidden="true"
                                                >
                                                    ↓
                                                </span>
                                            )}

                                            {/* Step number bubble */}
                                            <span
                                                className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full border border-[#3B82F6]/30 bg-[#3B82F6]/10 text-[#3B82F6] text-xs font-bold md:mb-3 z-10"
                                                aria-hidden="true"
                                            >
                                                {i + 1}
                                            </span>

                                            {/* Step text */}
                                            <div className="md:text-center md:px-1">
                                                {step.label && (
                                                    <p className="text-[10px] font-semibold uppercase tracking-widest text-[#3B82F6]/50 mb-0.5">
                                                        {step.label}
                                                    </p>
                                                )}
                                                <p className="text-sm font-semibold text-white leading-snug">
                                                    {step.title}
                                                </p>
                                                {step.body && (
                                                    <p className="text-xs text-[#a8b2c1] mt-1 leading-relaxed">
                                                        {step.body}
                                                    </p>
                                                )}
                                            </div>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </Section>
                    </>
                )}

                {/* ── BEFORE / AFTER ───────────────────────────────────────────── */}
                {beforeAfter && (
                    <>
                        <Divider />
                        <Section className="mb-10">
                            <SectionHeading>{beforeAfter.title}</SectionHeading>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Before column */}
                                <div className="glass-panel-soft rounded-2xl p-6 glass-rim">
                                    <p className="text-[10px] font-semibold uppercase tracking-widest text-[#a8b2c1]/60 mb-4">
                                        {beforeAfter.beforeTitle}
                                    </p>
                                    <ul className="flex flex-col gap-2.5">
                                        {beforeAfter.beforeBullets.map((item, i) => (
                                            <li key={i} className="flex items-start gap-2.5 text-sm text-[#a8b2c1]">
                                                {/* Muted × mark */}
                                                <span
                                                    className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-white/5 border border-white/10 flex items-center justify-center"
                                                    aria-hidden="true"
                                                >
                                                    <svg viewBox="0 0 10 10" className="w-2 h-2 text-[#a8b2c1]/60 fill-none stroke-current stroke-[1.8]">
                                                        <line x1="2" y1="2" x2="8" y2="8" />
                                                        <line x1="8" y1="2" x2="2" y2="8" />
                                                    </svg>
                                                </span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* After column */}
                                <div
                                    className="glass-panel-strong rounded-2xl p-6"
                                    style={{
                                        boxShadow: "0 0 0 1px rgba(59, 130, 246, 0.2), 0 16px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(59, 130, 246, 0.12)",
                                    }}
                                >
                                    <p className="text-[10px] font-semibold uppercase tracking-widest text-[#3B82F6]/70 mb-4">
                                        {beforeAfter.afterTitle}
                                    </p>
                                    <ul className="flex flex-col gap-2.5">
                                        {beforeAfter.afterBullets.map((item, i) => (
                                            <li key={i} className="flex items-start gap-2.5 text-sm text-[#e0e7ef]">
                                                {/* Cobalt check — same as What You Get */}
                                                <span
                                                    className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-[#3B82F6]/15 border border-[#3B82F6]/30 flex items-center justify-center"
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
                            </div>
                        </Section>
                    </>
                )}

                <Divider />

                {/* ── CHART PANEL ──────────────────────────────────────────────── */}
                {chartPanel && (
                    <>
                        <Section className="mb-10">
                            <FeatureChartPanelBlock panel={chartPanel} />
                        </Section>
                        <Divider />
                    </>
                )}

                {/* ── WHAT YOU GET ─────────────────────────────────────────────── */}
                <Section className="mb-10">
                    <SectionHeading>What You Get</SectionHeading>
                    <div className="glass-panel rounded-2xl p-6 glass-rim">
                        <ul className="flex flex-col gap-3">
                            {whatYouGet.map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    {/* Cobalt checkmark */}
                                    <span
                                        className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-[#3B82F6]/15 border border-[#3B82F6]/30 flex items-center justify-center"
                                        aria-hidden="true"
                                    >
                                        <svg viewBox="0 0 10 8" className="w-2.5 h-2 text-[#3B82F6] fill-none stroke-current stroke-[1.8]">
                                            <polyline points="1,4 4,7 9,1" />
                                        </svg>
                                    </span>
                                    <span className="text-sm text-[#e0e7ef] leading-relaxed">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Section>

                {/* ── PROOF ────────────────────────────────────────────────────── */}
                <Section className="mb-10">
                    <SectionHeading>Why It Works</SectionHeading>
                    <div className="flex flex-col gap-3">
                        {proofPoints.map((point, i) => (
                            <div
                                key={i}
                                className="glass-panel-soft rounded-xl px-5 py-3 flex items-start gap-3"
                            >
                                <span
                                    className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#3B82F6]"
                                    aria-hidden="true"
                                />
                                <span className="text-sm text-[#a8b2c1] leading-relaxed">{point}</span>
                            </div>
                        ))}
                    </div>
                </Section>

                <Divider />

                {/* ── CTA ──────────────────────────────────────────────────────── */}
                <Section>
                    <SectionHeading>Next Step</SectionHeading>
                    <div
                        className="glass-panel-strong rounded-2xl p-8 text-center"
                        style={{
                            boxShadow: "0 0 0 1px #3B82F6, 0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(59, 130, 246, 0.2)",
                        }}
                    >
                        <h2 className="text-2xl font-bold text-white mb-3">{cta.title}</h2>
                        <p className="text-[#a8b2c1] mb-7 max-w-md mx-auto leading-relaxed">
                            {cta.body}
                        </p>
                        <Link
                            href={cta.href}
                            className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-sm text-white transition-all duration-200 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0d14]"
                            style={{
                                background: "#3B82F6",
                                boxShadow: "0 0 24px rgba(59, 130, 246, 0.5), 0 0 10px rgba(59, 130, 246, 0.3)",
                            }}
                        >
                            {cta.buttonLabel}
                        </Link>
                    </div>
                </Section>

            </main>
        </div>
    );
}
