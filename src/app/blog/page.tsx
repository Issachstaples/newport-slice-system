import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Blog — Newport",
    description:
        "Notes on SEO, conversion systems, automations, and building with Prismic slices.",
};

const PLACEHOLDER_POSTS = [
    {
        title: "How We Cut Page Load Times by 60% on Every Build",
        date: "Mar 2026",
        href: "#",
    },
    {
        title: "Building a Prismic Slice Library That Scales",
        date: "Feb 2026",
        href: "#",
    },
    {
        title: "Why Most CRMs Fail SMBs (And What We Do Instead)",
        date: "Feb 2026",
        href: "#",
    },
] as const;

const CATEGORIES = [
    "SEO & Performance",
    "Conversion Systems",
    "Automations",
    "Prismic & Slices",
    "Business OS",
] as const;

export default function BlogPage() {
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
                            Blog
                        </span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-5 leading-[1.1]">
                        Blog
                    </h1>
                    <p className="text-lg text-[#a8b2c1] leading-relaxed max-w-2xl">
                        Notes on SEO, conversion systems, automations, and building with Prismic slices.
                    </p>
                </div>

                {/* Panels */}
                <div className="space-y-5">
                    {/* Panel 1 — Latest posts */}
                    <div className="glass-panel glass-rim rounded-2xl p-7">
                        <h2 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#3B82F6]/70 mb-5">
                            Latest Posts
                        </h2>
                        <ul className="space-y-4">
                            {PLACEHOLDER_POSTS.map(({ title, date, href }) => (
                                <li key={title}>
                                    <Link
                                        href={href}
                                        className="group flex items-start justify-between gap-4 hover:text-white transition-colors"
                                    >
                                        <span className="text-sm text-[#e0e7ef] group-hover:text-white transition-colors leading-snug">
                                            {title}
                                        </span>
                                        <span className="shrink-0 text-xs text-[#4a5568] mt-0.5">{date}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Panel 2 — Categories */}
                    <div className="glass-panel-soft glass-rim rounded-2xl p-7">
                        <h2 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#3B82F6]/70 mb-4">
                            Categories
                        </h2>
                        <ul className="space-y-2.5">
                            {CATEGORIES.map((cat) => (
                                <li key={cat} className="flex items-start gap-3 text-sm text-[#cbd5e0]">
                                    <span
                                        className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-[#3B82F6]/60"
                                        aria-hidden="true"
                                    />
                                    {cat}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Panel 3 — CTA */}
                    <div
                        className="glass-panel-strong rounded-2xl p-7 text-center"
                        style={{
                            boxShadow:
                                "0 0 0 1px rgba(59,130,246,0.2), 0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(59,130,246,0.12)",
                        }}
                    >
                        <p className="text-white font-semibold mb-2">See the system in action</p>
                        <p className="text-sm text-[#a8b2c1] mb-5">
                            Explore the feature modules that power every Newport build.
                        </p>
                        <Link
                            href="/features"
                            className="inline-block px-7 py-2.5 rounded-full bg-[#3B82F6] text-white text-sm font-semibold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20"
                        >
                            Explore Features
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
