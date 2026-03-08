import { PrismicRichText } from "@prismicio/react";
import type { SliceComponentProps } from "@prismicio/react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function BulletsSectionSlice({ slice }: SliceComponentProps<any>) {
    const { section_title, bullets } = slice.primary;

    return (
        <section className="py-20 px-6">
            <div className="max-w-3xl mx-auto">
                {section_title && (
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">
                        {section_title}
                    </h2>
                )}

                <div className="glass-panel rounded-2xl p-8">
                    <div className="text-[#a8b2c1] leading-relaxed [&_ul]:space-y-3 [&_ol]:space-y-3 [&_li]:flex [&_li]:items-start [&_li]:gap-3 [&_li]:before:content-['✓'] [&_li]:before:text-[#3B82F6] [&_li]:before:font-bold [&_li]:before:mt-0.5 [&_li]:before:shrink-0 [&_strong]:text-white [&_p]:mb-3">
                        <PrismicRichText field={bullets} />
                    </div>
                </div>
            </div>
        </section>
    );
}
