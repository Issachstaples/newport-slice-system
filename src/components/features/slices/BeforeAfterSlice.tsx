import { PrismicRichText } from "@prismicio/react";
import type { SliceComponentProps } from "@prismicio/react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function BeforeAfterSlice({ slice }: SliceComponentProps<any>) {
    const {
        section_title,
        before_title,
        after_title,
        before_bullets,
        after_bullets,
    } = slice.primary;

    return (
        <section className="py-20 px-6">
            <div className="max-w-5xl mx-auto">
                {section_title && (
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10 text-center">
                        {section_title}
                    </h2>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Before */}
                    <div className="glass-panel rounded-2xl p-8">
                        <div className="flex items-center gap-3 mb-5">
                            <span className="text-xl">😓</span>
                            <h3 className="font-bold text-white text-lg">
                                {before_title || "Before"}
                            </h3>
                        </div>
                        <div className="text-[#a8b2c1] space-y-2 text-sm leading-relaxed [&_li]:flex [&_li]:items-start [&_li]:gap-2 [&_li]:before:content-['✕'] [&_li]:before:text-red-400 [&_li]:before:font-bold [&_li]:before:shrink-0 [&_strong]:text-[#e0e7ef] [&_ul]:space-y-2 [&_ol]:space-y-2">
                            <PrismicRichText field={before_bullets} />
                        </div>
                    </div>

                    {/* After */}
                    <div className="glass-panel-soft rounded-2xl p-8 border border-[#3B82F6]/20">
                        <div className="flex items-center gap-3 mb-5">
                            <span className="text-xl">🚀</span>
                            <h3 className="font-bold text-white text-lg">
                                {after_title || "After"}
                            </h3>
                        </div>
                        <div className="text-[#a8b2c1] space-y-2 text-sm leading-relaxed [&_li]:flex [&_li]:items-start [&_li]:gap-2 [&_li]:before:content-['✓'] [&_li]:before:text-[#3B82F6] [&_li]:before:font-bold [&_li]:before:shrink-0 [&_strong]:text-[#e0e7ef] [&_ul]:space-y-2 [&_ol]:space-y-2">
                            <PrismicRichText field={after_bullets} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
