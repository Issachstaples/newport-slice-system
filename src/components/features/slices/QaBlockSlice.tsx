"use client";

import { useState } from "react";
import { PrismicRichText } from "@prismicio/react";
import type { SliceComponentProps } from "@prismicio/react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function QaBlockSlice({ slice }: SliceComponentProps<any>) {
    const { section_title } = slice.primary;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const items: any[] = slice.items ?? [];

    // type="multiple": track a Set of open item keys.
    // First item is open by default.
    const [openItems, setOpenItems] = useState<Set<string>>(
        () => new Set(items.length > 0 ? ["q-0"] : []),
    );

    function toggle(key: string) {
        setOpenItems((prev) => {
            const next = new Set(prev);
            if (next.has(key)) {
                next.delete(key);
            } else {
                next.add(key);
            }
            return next;
        });
    }

    return (
        <section className="py-20 px-6">
            <div className="max-w-3xl mx-auto">
                {section_title && (
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10 text-center">
                        {section_title}
                    </h2>
                )}

                <div className="space-y-3">
                    {items.map((item, i) => {
                        const key = `q-${i}`;
                        const isOpen = openItems.has(key);

                        return (
                            <div key={key} className="glass-panel rounded-2xl overflow-hidden">
                                {/* Trigger */}
                                <button
                                    type="button"
                                    aria-expanded={isOpen}
                                    aria-controls={`qa-body-${i}`}
                                    id={`qa-trigger-${i}`}
                                    onClick={() => toggle(key)}
                                    className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left cursor-pointer group"
                                >
                                    <h3 className="font-semibold text-white text-sm sm:text-base leading-snug">
                                        {item.question}
                                    </h3>
                                    {/* Chevron */}
                                    <span
                                        aria-hidden="true"
                                        className={`mt-0.5 shrink-0 w-5 h-5 rounded-full border border-[#3B82F6]/40 flex items-center justify-center transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                                    >
                                        <svg
                                            width="10"
                                            height="6"
                                            viewBox="0 0 10 6"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="text-[#3B82F6]"
                                        >
                                            <path
                                                d="M1 1L5 5L9 1"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </span>
                                </button>

                                {/* Body — always in DOM for SEO / no lazy fetch */}
                                <div
                                    id={`qa-body-${i}`}
                                    role="region"
                                    aria-labelledby={`qa-trigger-${i}`}
                                    hidden={!isOpen}
                                    className="px-6 pb-6"
                                >
                                    {item.answer_lead && (
                                        <p className="text-[#3B82F6] text-sm font-medium mb-3">
                                            {item.answer_lead}
                                        </p>
                                    )}
                                    {item.bullets && (
                                        <div className="text-sm text-[#a8b2c1] leading-relaxed [&_ul]:space-y-1.5 [&_li]:pl-0 [&_strong]:text-[#e0e7ef]">
                                            <PrismicRichText field={item.bullets} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
