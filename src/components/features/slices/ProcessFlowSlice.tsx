import { PrismicRichText } from "@prismicio/react";
import type { SliceComponentProps } from "@prismicio/react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ProcessFlowSlice({ slice }: SliceComponentProps<any>) {
    const { section_title, intro } = slice.primary;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const items: any[] = slice.items ?? [];

    return (
        <section className="py-20 px-6">
            <div className="max-w-5xl mx-auto">
                {section_title && (
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 text-center">
                        {section_title}
                    </h2>
                )}
                {intro && (
                    <div className="text-center text-[#a8b2c1] mb-12 max-w-2xl mx-auto [&_strong]:text-white">
                        <PrismicRichText field={intro} />
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items.map((item, i) => (
                        <div key={i} className="glass-panel rounded-2xl p-6 relative">
                            <span className="absolute -top-3 -left-3 w-7 h-7 rounded-full bg-[#3B82F6] flex items-center justify-center text-xs font-bold text-white shadow-md">
                                {i + 1}
                            </span>
                            {item.step_label && (
                                <p className="text-[10px] font-bold tracking-widest uppercase text-[#3B82F6] mb-1">
                                    {item.step_label}
                                </p>
                            )}
                            <p className="font-semibold text-white mb-2">{item.step_title}</p>
                            {item.step_body && (
                                <p className="text-sm text-[#a8b2c1] leading-relaxed">
                                    {item.step_body}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
