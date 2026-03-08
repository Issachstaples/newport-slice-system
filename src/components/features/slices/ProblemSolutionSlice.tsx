import { PrismicRichText } from "@prismicio/react";
import type { SliceComponentProps } from "@prismicio/react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ProblemSolutionSlice({ slice }: SliceComponentProps<any>) {
    const { problem_title, problem_body, solution_title, solution_body } = slice.primary;

    return (
        <section className="py-20 px-6">
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
                {/* Problem */}
                <div className="glass-panel rounded-2xl p-8">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="w-2 h-2 rounded-full bg-red-400/70" />
                        <h2 className="text-xs font-bold tracking-widest uppercase text-red-400/80">
                            {problem_title || "The Problem"}
                        </h2>
                    </div>
                    <div className="text-[#a8b2c1] leading-relaxed [&_strong]:text-white [&_p]:mb-3">
                        <PrismicRichText field={problem_body} />
                    </div>
                </div>

                {/* Solution */}
                <div className="glass-panel-soft rounded-2xl p-8 border border-[#3B82F6]/20">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
                        <h2 className="text-xs font-bold tracking-widest uppercase text-[#3B82F6]">
                            {solution_title || "The Solution"}
                        </h2>
                    </div>
                    <div className="text-[#a8b2c1] leading-relaxed [&_strong]:text-white [&_p]:mb-3">
                        <PrismicRichText field={solution_body} />
                    </div>
                </div>
            </div>
        </section>
    );
}
