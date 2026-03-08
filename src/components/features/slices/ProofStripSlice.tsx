import { PrismicRichText } from "@prismicio/react";
import type { SliceComponentProps } from "@prismicio/react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ProofStripSlice({ slice }: SliceComponentProps<any>) {
    const { section_title } = slice.primary;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const items: any[] = slice.items ?? [];

    return (
        <section className="py-20 px-6">
            <div className="max-w-5xl mx-auto">
                {section_title && (
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10 text-center">
                        {section_title}
                    </h2>
                )}

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items.map((item, i) => (
                        <div
                            key={i}
                            className="glass-panel-soft rounded-2xl p-6 border border-[#3B82F6]/10 text-sm text-[#a8b2c1] leading-relaxed [&_strong]:text-white"
                        >
                            <PrismicRichText field={item.proof_point} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
