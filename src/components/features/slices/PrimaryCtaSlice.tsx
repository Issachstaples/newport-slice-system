import { PrismicRichText, PrismicLink } from "@prismicio/react";
import type { SliceComponentProps } from "@prismicio/react";
import { isFilled } from "@prismicio/client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PrimaryCtaSlice({ slice }: SliceComponentProps<any>) {
    const { cta_title, cta_body, button_label, button_link } = slice.primary;

    return (
        <section className="py-24 px-6">
            <div className="max-w-3xl mx-auto text-center">
                <div className="glass-panel-strong rounded-3xl p-10 sm:p-14 border border-[#3B82F6]/20">
                    {cta_title && (
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">
                            {cta_title}
                        </h2>
                    )}

                    {cta_body && (
                        <div className="text-[#a8b2c1] mb-8 text-lg leading-relaxed [&_strong]:text-white [&_a]:text-[#3B82F6] [&_a]:underline">
                            <PrismicRichText field={cta_body} />
                        </div>
                    )}

                    {button_label && isFilled.link(button_link) ? (
                        <PrismicLink
                            field={button_link}
                            className="inline-block px-8 py-3 rounded-full bg-[#3B82F6] text-white font-semibold text-sm tracking-wide hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20"
                        >
                            {button_label}
                        </PrismicLink>
                    ) : button_label ? (
                        <a
                            href="#"
                            className="inline-block px-8 py-3 rounded-full bg-[#3B82F6] text-white font-semibold text-sm tracking-wide hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20"
                        >
                            {button_label}
                        </a>
                    ) : null}
                </div>
            </div>
        </section>
    );
}
