import { PrismicRichText } from "@prismicio/react";
import type { SliceComponentProps } from "@prismicio/react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function QaBlockSlice({ slice }: SliceComponentProps<any>) {
    const { section_title } = slice.primary;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const items: any[] = slice.items ?? [];

    return (
        <section className="py-20 px-6">
            <div className="max-w-3xl mx-auto">
                {section_title && (
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10 text-center">
                        {section_title}
                    </h2>
                )}

                <div className="space-y-4">
                    {items.map((item, i) => (
                        <div key={i} className="glass-panel rounded-2xl p-6">
                            <p className="font-semibold text-white mb-2">{item.question}</p>
                            {item.answer_lead && (
                                <p className="text-[#3B82F6] text-sm font-medium mb-3">
                                    {item.answer_lead}
                                </p>
                            )}
                            {item.bullets && (
                                <div className="text-sm text-[#a8b2c1] leading-relaxed [&_ul]:space-y-1 [&_li]:pl-0 [&_strong]:text-[#e0e7ef]">
                                    <PrismicRichText field={item.bullets} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
