import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Pricing — Newport",
    description:
        "Pay only for what you use. Scale by adding modules when you're ready. No per-seat tax, no surprise bills.",
};

// ── Data ──────────────────────────────────────────────────────────────────────

const PLANS = [
    {
        name: "Business OS Starter",
        price: "$299",
        period: "/ month",
        tag: null,
        best: "Premium service businesses with lower lead volume (interior design, remodeling, boutique contractors).",
        includes: [
            "Premium Newport Slices website (hosted + maintained)",
            "HelixFlow installed + configured",
            "CRM + pipeline + customer dashboards",
            "Document signing workflows",
            "Review + referral automation",
            "AI chatbot (lead capture + intake)",
            "AI customer service agent (email/chat)",
            "SMS automation + email campaigns (AI-assisted copy)",
        ],
        capacity: {
            seats: "5",
            accounts: "1",
        },
        aiCredits: "500,000 credits / month",
        spendCap: "$100 / month",
        highlighted: false,
    },
    {
        name: "Business OS Growth",
        price: "$499",
        period: "/ month",
        tag: "Most Popular",
        best: "Steady lead flow businesses (roofing, HVAC, plumbing, home services).",
        includes: [
            "Everything in Starter",
            "Lead scoring + routing on every lead",
            "Higher automation throughput",
            "Expanded templates + reporting",
        ],
        capacity: {
            seats: "10",
            accounts: "1",
        },
        aiCredits: "1,000,000 credits / month",
        spendCap: "$250 / month",
        highlighted: true,
    },
    {
        name: "Business OS Scale",
        price: "$999",
        period: "/ month",
        tag: null,
        best: "High-volume inbound and teams who want maximum automation + priority.",
        includes: [
            "Everything in Growth",
            "Priority support",
            "Quarterly optimization / tuning",
            "Advanced workflows + multi-location readiness",
        ],
        capacity: {
            seats: "40",
            accounts: "1",
        },
        aiCredits: "2,500,000 credits / month",
        spendCap: "$500 / month",
        highlighted: false,
    },
] as const;

const CREDIT_PACKS = [
    { label: "+500k AI Credits", price: "$25" },
    { label: "+1M AI Credits", price: "$45" },
    { label: "+3M AI Credits", price: "$125" },
    { label: "+10M AI Credits", price: "$350" },
] as const;

const FAQS = [
    {
        q: "Are there any per-seat fees?",
        a: "No. Seats are included in every plan. You pay for capacity and usage, not headcount.",
    },
    {
        q: "What happens if I hit my AI credit limit?",
        a: "Overages are OFF by default. You'll receive alerts at 50%, 80%, and 100% of your included credits. You can raise the cap or buy à-la-carte credit packs at any time.",
    },
    {
        q: "Is there a setup fee?",
        a: "Yes — a one-time launch fee applies on month-to-month plans ($1,500 Starter / $2,500 Growth / $5,000+ Scale). The launch fee is waived when you prepay a 12-month term upfront.",
    },
] as const;

// ── Page ─────────────────────────────────────────────────────────────────────

export default function PricingPage() {
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

            <main className="relative z-10 max-w-5xl mx-auto px-6 pt-28 pb-32">

                {/* ── HERO ──────────────────────────────────────────────────── */}
                <div className="mb-14 max-w-2xl">
                    <div className="glass-chip mb-5 w-fit">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" aria-hidden="true" />
                        <span className="text-[10px] font-semibold uppercase tracking-widest text-[#3B82F6]/80">
                            Pricing
                        </span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-5 leading-[1.1]">
                        Pricing
                    </h1>
                    <p className="text-lg text-[#a8b2c1] leading-relaxed">
                        Pay only for what you use. Scale by adding modules when you&apos;re ready.
                    </p>
                    <p className="text-sm text-[#4a5568] mt-2">
                        No per-seat tax. Overages are off by default and protected by caps.
                        Prices exclude applicable taxes (RI customers: +7%).
                    </p>
                </div>

                {/* ── PLAN GRID ─────────────────────────────────────────────── */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
                    {PLANS.map((plan) => (
                        <div
                            key={plan.name}
                            className={`relative flex flex-col rounded-2xl p-7 ${plan.highlighted
                                    ? "glass-panel-strong"
                                    : "glass-panel glass-rim"
                                }`}
                            style={
                                plan.highlighted
                                    ? {
                                        boxShadow:
                                            "0 0 0 1px #3B82F6, 0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(59,130,246,0.2)",
                                    }
                                    : undefined
                            }
                        >
                            {/* Tag */}
                            {plan.tag && (
                                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase bg-[#3B82F6] text-white shadow-md shadow-blue-500/30">
                                    {plan.tag}
                                </span>
                            )}

                            {/* Price */}
                            <div className="mb-5">
                                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#3B82F6]/70 mb-1">
                                    {plan.name}
                                </p>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-extrabold text-white">{plan.price}</span>
                                    <span className="text-sm text-[#a8b2c1]">{plan.period}</span>
                                </div>
                                <p className="text-xs text-[#4a5568] mt-2 leading-relaxed">{plan.best}</p>
                            </div>

                            {/* Divider */}
                            <div
                                className="h-px w-full mb-5"
                                style={{
                                    background:
                                        "linear-gradient(90deg, transparent, rgba(59,130,246,0.18) 50%, transparent)",
                                }}
                                aria-hidden="true"
                            />

                            {/* Includes */}
                            <ul className="space-y-2 mb-5 flex-1">
                                {plan.includes.map((item) => (
                                    <li key={item} className="flex items-start gap-2.5 text-sm text-[#cbd5e0]">
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

                            {/* Capacity + credits */}
                            <div className="glass-panel-soft rounded-xl p-4 text-xs space-y-1.5 mb-6">
                                <div className="flex justify-between text-[#a8b2c1]">
                                    <span>Seats included</span>
                                    <span className="font-semibold text-white">{plan.capacity.seats}</span>
                                </div>
                                <div className="flex justify-between text-[#a8b2c1]">
                                    <span>AI Credits</span>
                                    <span className="font-semibold text-white">{plan.aiCredits}</span>
                                </div>
                                <div className="flex justify-between text-[#a8b2c1]">
                                    <span>AI spend cap (default)</span>
                                    <span className="font-semibold text-white">{plan.spendCap}</span>
                                </div>
                            </div>

                            <Link
                                href="/contact"
                                className={`block text-center rounded-full py-2.5 text-sm font-semibold transition-colors ${plan.highlighted
                                        ? "bg-[#3B82F6] text-white hover:bg-blue-500 shadow-lg shadow-blue-500/20"
                                        : "border border-[#3B82F6]/40 text-[#a8b2c1] hover:text-white hover:bg-[#3B82F6]/10"
                                    }`}
                            >
                                Get started
                            </Link>
                        </div>
                    ))}
                </div>

                {/* ── FUSEBOX MODULES ───────────────────────────────────────── */}
                <div className="mb-16">
                    <div
                        className="h-px w-full mb-10"
                        style={{
                            background:
                                "linear-gradient(90deg, transparent, rgba(59,130,246,0.18) 40%, rgba(59,130,246,0.18) 60%, transparent)",
                        }}
                        aria-hidden="true"
                    />
                    <div className="grid md:grid-cols-2 gap-5">
                        <div className="glass-panel glass-rim rounded-2xl p-7">
                            <h2 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#3B82F6]/70 mb-4">
                                Fusebox Modules
                            </h2>
                            <p className="text-sm text-[#a8b2c1] mb-5 leading-relaxed">
                                Voice agents, AI credit packs, and future modules are available as Fusebox add-ons. Toggle what you need, pay for outcomes.
                            </p>
                            <ul className="space-y-2.5">
                                {[
                                    "Toggle modules on or off at any time",
                                    "Usage-aligned spend — no locked bundles",
                                    "Add as you grow, remove when you don't need them",
                                    "Voice agents from $0.16/min ($19/mo per phone line)",
                                ].map((item) => (
                                    <li key={item} className="flex items-start gap-3 text-sm text-[#cbd5e0]">
                                        <span
                                            className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-[#3B82F6]/60"
                                            aria-hidden="true"
                                        />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="glass-panel-soft glass-rim rounded-2xl p-7">
                            <h2 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#3B82F6]/70 mb-4">
                                AI Credit Packs (À La Carte)
                            </h2>
                            <p className="text-sm text-[#a8b2c1] mb-5 leading-relaxed">
                                Buy prepaid credit packs anytime from your owner dashboard. Applied before any overage billing.
                            </p>
                            <ul className="space-y-2.5">
                                {CREDIT_PACKS.map(({ label, price }) => (
                                    <li key={label} className="flex items-center justify-between text-sm">
                                        <span className="text-[#cbd5e0]">{label}</span>
                                        <span className="font-semibold text-white">{price}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* ── LAUNCH FEE CALLOUT ────────────────────────────────────── */}
                <div className="glass-panel glass-rim rounded-2xl p-7 mb-16">
                    <h2 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#3B82F6]/70 mb-4">
                        One-Time Launch Fee
                    </h2>
                    <div className="grid sm:grid-cols-3 gap-4 mb-4">
                        {[
                            { plan: "Starter", fee: "$1,500" },
                            { plan: "Growth", fee: "$2,500" },
                            { plan: "Scale", fee: "$5,000+" },
                        ].map(({ plan, fee }) => (
                            <div key={plan} className="glass-panel-soft rounded-xl p-4 text-center">
                                <p className="text-xs text-[#4a5568] mb-1">{plan}</p>
                                <p className="font-bold text-white">{fee}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-[#4a5568] leading-relaxed">
                        ✅ Launch fee waived with 12-month prepay (non-refundable). Work begins after payment clears and onboarding assets are received.
                    </p>
                </div>

                {/* ── FAQ ───────────────────────────────────────────────────── */}
                <div className="mb-16">
                    <h2 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#3B82F6]/70 mb-6">
                        Common Questions
                    </h2>
                    <div className="space-y-4">
                        {FAQS.map(({ q, a }) => (
                            <div key={q} className="glass-panel-soft glass-rim rounded-2xl p-6">
                                <p className="font-semibold text-white mb-2 text-sm">{q}</p>
                                <p className="text-sm text-[#a8b2c1] leading-relaxed">{a}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── PRIMARY CTA ───────────────────────────────────────────── */}
                <div
                    className="glass-panel-strong rounded-2xl p-10 text-center"
                    style={{
                        boxShadow:
                            "0 0 0 1px #3B82F6, 0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(59,130,246,0.2)",
                    }}
                >
                    <h2 className="text-2xl font-bold text-white mb-3">Not sure which plan fits?</h2>
                    <p className="text-[#a8b2c1] mb-7 max-w-md mx-auto leading-relaxed text-sm">
                        Book a 30-minute demo and we&apos;ll map the right plan and modules for your business—no pitch, just clarity.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-block px-8 py-3 rounded-full bg-[#3B82F6] text-white font-semibold text-sm hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20"
                    >
                        Book a Demo
                    </Link>
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
