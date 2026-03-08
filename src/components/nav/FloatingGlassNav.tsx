"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
    { label: "Blog", href: "/blog" },
] as const;

/** Returns true when the nav item should be considered active for the given pathname. */
function isActive(href: string, pathname: string): boolean {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
}

export interface FloatingGlassNavProps {
    /** Extra classes applied to the outermost container (position, top, right, width, etc.) */
    className?: string;
}

export default function FloatingGlassNav({ className = "" }: FloatingGlassNavProps) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const pathname = usePathname();

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
                {NAV_ITEMS.map(({ label, href }) => {
                    const active = isActive(href, pathname);
                    return (
                        <Link
                            key={href}
                            href={href}
                            aria-current={active ? "page" : undefined}
                            className={[
                                "px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0d14]",
                                active
                                    ? "text-white bg-white/[0.09] shadow-[0_0_0_1px_rgba(59,130,246,0.45),0_0_14px_rgba(59,130,246,0.22)]"
                                    : "text-[#a8b2c1] opacity-70 hover:opacity-100 hover:text-white hover:bg-white/[0.07] hover:shadow-[0_0_12px_rgba(59,130,246,0.18)] active:scale-95",
                            ].join(" ")}
                        >
                            {label}
                        </Link>
                    );
                })}
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
                        {NAV_ITEMS.map(({ label, href }) => {
                            const active = isActive(href, pathname);
                            return (
                                <Link
                                    key={href}
                                    href={href}
                                    aria-current={active ? "page" : undefined}
                                    onClick={() => setMobileOpen(false)}
                                    className={[
                                        "block px-4 py-2 text-xs font-semibold transition-colors duration-150",
                                        "focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-[#3B82F6]",
                                        active
                                            ? "text-white bg-[#3B82F6]/10 shadow-[inset_0_0_0_1px_rgba(59,130,246,0.3)]"
                                            : "text-[#a8b2c1] opacity-70 hover:opacity-100 hover:text-white hover:bg-white/[0.06]",
                                    ].join(" ")}
                                >
                                    {label}
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </nav>
    );
}
