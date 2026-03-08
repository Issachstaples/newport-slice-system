"use client";

import { useState } from "react";
import Link from "next/link";

const NAV_ITEMS = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
    { label: "Blog", href: "/blog" },
] as const;

export interface FloatingGlassNavProps {
    /** Extra classes applied to the outermost container (position, top, right, width, etc.) */
    className?: string;
}

export default function FloatingGlassNav({ className = "" }: FloatingGlassNavProps) {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <nav
            aria-label="Primary navigation"
            className={`${className}`}
        >
            {/* ── DESKTOP: single glass pill row ─────────────────────────────── */}
            <div
                className="hidden sm:flex items-center gap-1 glass-panel glass-rim rounded-2xl px-3 py-2.5 backdrop-blur-md"
                style={{
                    boxShadow:
                        "0 0 0 1px rgba(59,130,246,0.12), 0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
                }}
            >
                {NAV_ITEMS.map(({ label, href }) => (
                    <Link
                        key={href}
                        href={href}
                        className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#a8b2c1] transition-all duration-200 hover:text-white hover:bg-white/[0.07] hover:shadow-[0_0_12px_rgba(59,130,246,0.18)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0d14]"
                    >
                        {label}
                    </Link>
                ))}
            </div>

            {/* ── MOBILE: single "Menu" toggle + dropdown ────────────────────── */}
            <div className="sm:hidden">
                <button
                    type="button"
                    aria-expanded={mobileOpen}
                    aria-controls="glass-nav-mobile-menu"
                    onClick={() => setMobileOpen((v) => !v)}
                    className="glass-panel glass-rim rounded-2xl px-4 py-2.5 text-xs font-semibold text-[#a8b2c1] hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0d14] flex items-center gap-2"
                    style={{
                        boxShadow:
                            "0 0 0 1px rgba(59,130,246,0.12), 0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
                    }}
                >
                    <span>Menu</span>
                    <svg
                        width="12"
                        height="8"
                        viewBox="0 0 12 8"
                        fill="none"
                        className={`transition-transform duration-200 ${mobileOpen ? "rotate-180" : ""}`}
                        aria-hidden="true"
                    >
                        <path
                            d="M1 1L6 6L11 1"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>

                {/* Dropdown */}
                {mobileOpen && (
                    <div
                        id="glass-nav-mobile-menu"
                        className="absolute top-full right-0 mt-2 w-40 glass-panel-soft glass-rim rounded-2xl py-2 backdrop-blur-md"
                        style={{
                            boxShadow:
                                "0 0 0 1px rgba(59,130,246,0.12), 0 16px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
                        }}
                    >
                        {NAV_ITEMS.map(({ label, href }) => (
                            <Link
                                key={href}
                                href={href}
                                onClick={() => setMobileOpen(false)}
                                className="block px-4 py-2 text-xs font-semibold text-[#a8b2c1] hover:text-white hover:bg-white/[0.06] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
                            >
                                {label}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
}
