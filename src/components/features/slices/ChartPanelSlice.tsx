import { PrismicRichText, PrismicLink } from "@prismicio/react";
import type { SliceComponentProps } from "@prismicio/react";
import { isFilled } from "@prismicio/client";
import FeatureChartPanel from "@/components/features/FeatureChartPanel";
import type { FeatureChartPanel as ChartPanelData } from "@/components/features/FeaturePageTemplate";

function safeParse<T>(json: string | null | undefined, fallback: T): T {
    if (!json) return fallback;
    try {
        return JSON.parse(json) as T;
    } catch {
        return fallback;
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ChartPanelSlice({ slice }: SliceComponentProps<any>) {
    const {
        section_title,
        section_body,
        chart_type,
        chart_data_json,
        chart_config_json,
        insight_caption,
    } = slice.primary;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const items: any[] = slice.items ?? [];

    const chartType = isFilled.select(chart_type) ? chart_type : "bar";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = safeParse<any[]>(chart_data_json, []);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const config = safeParse<Record<string, any>>(chart_config_json, {});

    // Build the first insight string from the RichText field
    const insightText: string =
        Array.isArray(insight_caption) && insight_caption.length > 0
            ? insight_caption[0]?.text ?? ""
            : "";

    const sources: ChartPanelData["sources"] = items
        .filter((item) => item.source_label)
        .map((item) => ({
            label: item.source_label as string,
            href: isFilled.link(item.source_href) ? (item.source_href.url as string) : "#",
        }));

    const panel: ChartPanelData = {
        title: section_title ?? "",
        chartType: chartType as ChartPanelData["chartType"],
        data,
        config,
        insight: insightText,
        sources,
    };

    return (
        <section className="py-20 px-6">
            <div className="max-w-5xl mx-auto">
                {section_title && (
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 text-center">
                        {section_title}
                    </h2>
                )}
                {section_body && (
                    <div className="text-center text-[#a8b2c1] mb-10 max-w-2xl mx-auto [&_strong]:text-white [&_a]:text-[#3B82F6] [&_a]:underline">
                        <PrismicRichText field={section_body} />
                    </div>
                )}

                {data.length > 0 && <FeatureChartPanel panel={panel} />}

                {sources.length > 0 && (
                    <p className="text-xs text-[#4a5568] text-center mt-4 space-x-2">
                        {items.map((item, i) =>
                            item.source_label && isFilled.link(item.source_href) ? (
                                <span key={i}>
                                    <PrismicLink field={item.source_href} className="hover:text-[#3B82F6] transition-colors">
                                        {item.source_label}
                                    </PrismicLink>
                                    {i < items.length - 1 && " · "}
                                </span>
                            ) : null
                        )}
                    </p>
                )}
            </div>
        </section>
    );
}
