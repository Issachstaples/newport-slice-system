import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Contact — Newport",
    description:
        "Tell us what you're building and we'll map the fastest path to results.",
};

const WHAT_TO_INCLUDE = [
    "Your business type and main offer",
    "Ideal timeline to launch or go live",
    "Your current website (if you have one)",
    "Primary goal: more leads, better close rate, automation, or all three",
] as const;

const WHAT_HAPPENS_NEXT = [
    { step: "1", label: "Quick audit", desc: "We review what you've shared and your current online presence." },
    { step: "2", label: "Roadmap", desc: "We map the site + system build that gets you to your goal fastest." },
    { step: "3", label: "Build plan", desc: "You get a clear scope, timeline, and pricing before anything starts." },
    { step: "4", label: "Kickoff", desc: "Assets in, work begins. Most sites launch within 2–3 weeks." },
] as const;

export default function ContactPage() {
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
                            Contact
                        </span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-5 leading-[1.1]">
                        Contact
                    </h1>
                    <p className="text-lg text-[#a8b2c1] leading-relaxed max-w-2xl">
                        Tell us what you&apos;re building and we&apos;ll map the fastest path to results.
                    </p>
                </div>

                {/* Panels */}
                <div className="space-y-5">
                    {/* Panel 1 — Book a Demo */}
                    <div
                        className="glass-panel-strong rounded-2xl p-8 text-center"
                        style={{
                            boxShadow:
                                "0 0 0 1px #3B82F6, 0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(59,130,246,0.2)",
                        }}
                    >
                        <h2 className="text-xl font-bold text-white mb-3">Book a Demo</h2>
                        <p className="text-sm text-[#a8b2c1] mb-7 max-w-sm mx-auto leading-relaxed">
                            A 30-minute walkthrough of the full Newport system. No pitch—just the product and a plan for your business.
                        </p>
                        <a
                            href="mailto:hello@newportdigital.co?subject=Demo%20Request"
                            className="inline-block px-8 py-3 rounded-full bg-[#3B82F6] text-white text-sm font-semibold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20"
                        >
                            Email us to schedule
                        </a>
                        <p className="text-xs text-[#4a5568] mt-4">
                            hello@newportdigital.co — response within 1 business day.
                            <br />
                            <span className="text-[#3B82F6]/50">Booking form coming soon.</span>
                        </p>
                    </div>

                    {/* Panel 2 — What to include */}
                    <div className="glass-panel glass-rim rounded-2xl p-7">
                        <h2 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#3B82F6]/70 mb-5">
                            What to Include in Your Message
                        </h2>
                        <ul className="space-y-3">
                            {WHAT_TO_INCLUDE.map((item) => (
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

                    {/* Panel 3 — What happens next */}
                    <div className="glass-panel-soft glass-rim rounded-2xl p-7">
                        <h2 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#3B82F6]/70 mb-6">
                            What Happens Next
                        </h2>
                        <ol className="space-y-5">
                            {WHAT_HAPPENS_NEXT.map(({ step, label, desc }) => (
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
