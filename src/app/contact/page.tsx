import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Contact Newport",
    description:
        "Tell us what you're building and we'll map the fastest path to results.",
};

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
                    {/* Panel 1 — Book a demo */}
                    <div
                        className="glass-panel-strong rounded-2xl p-7 text-center"
                        style={{
                            boxShadow:
                                "0 0 0 1px #3B82F6, 0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(59,130,246,0.2)",
                        }}
                    >
                        <h2 className="text-xl font-bold text-white mb-2">Book a Demo</h2>
                        <p className="text-sm text-[#a8b2c1] mb-6 leading-relaxed">
                            A 30-minute walkthrough of the full Newport system—no pitch, just the product.
                        </p>
                        <Link
                            href="#form"
                            className="inline-block px-7 py-2.5 rounded-full bg-[#3B82F6] text-white text-sm font-semibold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20"
                        >
                            Schedule a call
                        </Link>
                    </div>

                    {/* Panel 2 — Email + response time */}
                    <div className="glass-panel glass-rim rounded-2xl p-7">
                        <h2 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#3B82F6]/70 mb-4">
                            Email Us
                        </h2>
                        <p className="text-sm text-[#e0e7ef] mb-2 font-medium">
                            hello@newportdigital.co
                        </p>
                        <p className="text-xs text-[#4a5568]">
                            Response time: within 1 business day.
                        </p>
                    </div>

                    {/* Panel 3 — What happens next */}
                    <div className="glass-panel-soft glass-rim rounded-2xl p-7">
                        <h2 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#3B82F6]/70 mb-4">
                            What Happens Next
                        </h2>
                        <ol className="space-y-2.5">
                            {["Audit", "Plan", "Build", "Launch"].map((step, i) => (
                                <li key={step} className="flex items-center gap-3 text-sm text-[#cbd5e0]">
                                    <span className="shrink-0 w-5 h-5 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/30 flex items-center justify-center text-[10px] font-bold text-[#3B82F6]">
                                        {i + 1}
                                    </span>
                                    {step}
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
