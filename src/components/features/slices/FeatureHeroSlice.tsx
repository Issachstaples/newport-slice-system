import { PrismicRichText } from "@prismicio/react";
import type { SliceComponentProps } from "@prismicio/react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function FeatureHeroSlice({ slice }: SliceComponentProps<any>) {
    const { eyebrow, headline, subhead } = slice.primary;

    return (
        <section className="relative pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto text-center">
                {eyebrow && (
                    <span className="inline-block mb-4 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase glass-chip text-[#3B82F6]">
                        {eyebrow}
                    </span>
                )}

                {headline && (
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
                        {headline}
                    </h1>
                )}

                {subhead && (
                    <div className="text-lg sm:text-xl text-[#a8b2c1] max-w-2xl mx-auto leading-relaxed [&_strong]:text-white [&_a]:text-[#3B82F6] [&_a]:underline">
                        <PrismicRichText field={subhead} />
                    </div>
                )}
            </div>
        </section>
    );
}
