"use client";

import {
    BarChart,
    Bar,
    LineChart,
    Line,
    AreaChart,
    Area,
    PieChart,
    Pie,
    Cell,
    RadialBarChart,
    RadialBar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import type { FeatureChartPanel } from "@/components/features/FeaturePageTemplate";

// ── Shared chart token palette ─────────────────────────────────────────────────
// Stays minimal: single cobalt series + muted variants. No custom colour choices.
const COBALT = "#3B82F6";
const COBALT_DIM = "rgba(59,130,246,0.35)";
const AXIS_COLOR = "#4a5568";
const TICK_COLOR = "#a8b2c1";
const TOOLTIP_BG = "#0f1520";
const DONUT_COLORS = [COBALT_DIM, COBALT];

// ── Custom tooltip ─────────────────────────────────────────────────────────────
function ChartTooltip({
    active,
    payload,
    label,
}: {
    active?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload?: any[];
    label?: string;
}) {
    if (!active || !payload?.length) return null;
    return (
        <div
            className="rounded-xl px-3 py-2 text-xs text-[#e0e7ef] shadow-lg"
            style={{
                background: TOOLTIP_BG,
                border: `1px solid ${COBALT_DIM}`,
            }}
        >
            {label !== undefined && (
                <p className="font-semibold text-white mb-1">{label}</p>
            )}
            {payload.map((entry, i) => (
                <p key={i} style={{ color: entry.color ?? COBALT }}>
                    {entry.name ? `${entry.name}: ` : ""}
                    <span className="font-semibold">{entry.value}</span>
                </p>
            ))}
        </div>
    );
}

// ── Individual chart renderers ─────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function BarChartView({ data, config }: { data: any[]; config?: Record<string, any> }) {
    // Detect numeric keys (exclude the first key which is the category)
    const keys = data.length ? Object.keys(data[0]).filter((k) => k !== Object.keys(data[0])[0]) : [];
    const categoryKey = data.length ? Object.keys(data[0])[0] : "name";
    return (
        <ResponsiveContainer width="100%" height={220}>
            <BarChart data={data} margin={{ top: 8, right: 8, bottom: 8, left: 0 }}>
                <XAxis
                    dataKey={categoryKey}
                    tick={{ fill: TICK_COLOR, fontSize: 11 }}
                    axisLine={{ stroke: AXIS_COLOR }}
                    tickLine={false}
                />
                <YAxis
                    tick={{ fill: TICK_COLOR, fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    width={36}
                />
                <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(59,130,246,0.06)" }} />
                {keys.map((key, i) => (
                    <Bar
                        key={key}
                        dataKey={key}
                        name={config?.[key]?.label ?? key}
                        fill={i === 0 ? COBALT : COBALT_DIM}
                        radius={[4, 4, 0, 0]}
                        maxBarSize={56}
                    />
                ))}
            </BarChart>
        </ResponsiveContainer>
    );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function LineChartView({ data, config }: { data: any[]; config?: Record<string, any> }) {
    const keys = data.length ? Object.keys(data[0]).filter((k) => k !== Object.keys(data[0])[0]) : [];
    const categoryKey = data.length ? Object.keys(data[0])[0] : "name";
    return (
        <ResponsiveContainer width="100%" height={220}>
            <LineChart data={data} margin={{ top: 8, right: 8, bottom: 8, left: 0 }}>
                <XAxis
                    dataKey={categoryKey}
                    tick={{ fill: TICK_COLOR, fontSize: 11 }}
                    axisLine={{ stroke: AXIS_COLOR }}
                    tickLine={false}
                />
                <YAxis
                    tick={{ fill: TICK_COLOR, fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    width={36}
                />
                <Tooltip content={<ChartTooltip />} cursor={{ stroke: COBALT_DIM, strokeWidth: 1 }} />
                {keys.map((key, i) => (
                    <Line
                        key={key}
                        type="monotone"
                        dataKey={key}
                        name={config?.[key]?.label ?? key}
                        stroke={i === 0 ? COBALT : COBALT_DIM}
                        strokeWidth={2}
                        dot={{ r: 3, fill: i === 0 ? COBALT : COBALT_DIM, strokeWidth: 0 }}
                        activeDot={{ r: 5, fill: COBALT }}
                    />
                ))}
            </LineChart>
        </ResponsiveContainer>
    );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function AreaChartView({ data, config }: { data: any[]; config?: Record<string, any> }) {
    const keys = data.length ? Object.keys(data[0]).filter((k) => k !== Object.keys(data[0])[0]) : [];
    const categoryKey = data.length ? Object.keys(data[0])[0] : "name";
    const gradId = "area-cobalt";
    return (
        <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 8, left: 0 }}>
                <defs>
                    <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={COBALT} stopOpacity={0.25} />
                        <stop offset="95%" stopColor={COBALT} stopOpacity={0.02} />
                    </linearGradient>
                </defs>
                <XAxis
                    dataKey={categoryKey}
                    tick={{ fill: TICK_COLOR, fontSize: 11 }}
                    axisLine={{ stroke: AXIS_COLOR }}
                    tickLine={false}
                />
                <YAxis
                    tick={{ fill: TICK_COLOR, fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    width={36}
                />
                <Tooltip content={<ChartTooltip />} cursor={{ stroke: COBALT_DIM, strokeWidth: 1 }} />
                {keys.map((key, i) => (
                    <Area
                        key={key}
                        type="monotone"
                        dataKey={key}
                        name={config?.[key]?.label ?? key}
                        stroke={i === 0 ? COBALT : COBALT_DIM}
                        fill={`url(#${gradId})`}
                        strokeWidth={2}
                    />
                ))}
            </AreaChart>
        </ResponsiveContainer>
    );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function DonutChartView({ data, config }: { data: any[]; config?: Record<string, any> }) {
    return (
        <ResponsiveContainer width="100%" height={220}>
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="value"
                    nameKey="name"
                >
                    {data.map((entry, i) => (
                        <Cell
                            key={`cell-${i}`}
                            fill={DONUT_COLORS[i % DONUT_COLORS.length]}
                            stroke="transparent"
                        />
                    ))}
                </Pie>
                <Tooltip content={<ChartTooltip />} />
                <Legend
                    formatter={(value: string) => {
                        const cfgEntry = config?.[value];
                        return (
                            <span style={{ color: TICK_COLOR, fontSize: 11 }}>
                                {cfgEntry?.label ?? value}
                            </span>
                        );
                    }}
                />
            </PieChart>
        </ResponsiveContainer>
    );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function RadialChartView({ data, config }: { data: any[]; config?: Record<string, any> }) {
    // Radial bar expects a `value` key and optional `name`
    const augmented = data.map((d, i) => ({
        ...d,
        fill: i === 0 ? COBALT : COBALT_DIM,
    }));
    return (
        <ResponsiveContainer width="100%" height={220}>
            <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={90}
                data={augmented}
            >
                <RadialBar
                    dataKey="value"
                    label={{
                        position: "insideStart",
                        fill: TICK_COLOR,
                        fontSize: 10,
                    }}
                    background={{ fill: "rgba(255,255,255,0.04)" }}
                />
                <Tooltip content={<ChartTooltip />} />
                <Legend
                    formatter={(value: string) => {
                        const cfgEntry = config?.[value];
                        return (
                            <span style={{ color: TICK_COLOR, fontSize: 11 }}>
                                {cfgEntry?.label ?? value}
                            </span>
                        );
                    }}
                />
            </RadialBarChart>
        </ResponsiveContainer>
    );
}

// ── Main export ────────────────────────────────────────────────────────────────
export default function FeatureChartPanelBlock({ panel }: { panel: FeatureChartPanel }) {
    if (!panel.data?.length) return null;

    const renderChart = () => {
        switch (panel.chartType) {
            case "bar":
                return <BarChartView data={panel.data} config={panel.config} />;
            case "line":
                return <LineChartView data={panel.data} config={panel.config} />;
            case "area":
                return <AreaChartView data={panel.data} config={panel.config} />;
            case "donut":
                return <DonutChartView data={panel.data} config={panel.config} />;
            case "radial":
                return <RadialChartView data={panel.data} config={panel.config} />;
            default:
                return null;
        }
    };

    return (
        <div
            className="glass-panel-strong rounded-2xl p-6"
            style={{
                boxShadow:
                    "0 0 0 1px rgba(59, 130, 246, 0.15), 0 16px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(59, 130, 246, 0.08)",
            }}
        >
            {/* Header */}
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#3B82F6]/70 mb-1">
                Benchmark Data
            </p>
            <h2 className="text-lg font-bold text-white mb-2 leading-snug">{panel.title}</h2>
            {panel.description && (
                <p className="text-sm text-[#a8b2c1] mb-5 leading-relaxed max-w-xl">
                    {panel.description}
                </p>
            )}

            {/* Chart */}
            <div className="w-full">{renderChart()}</div>

            {/* Insight */}
            <p className="mt-4 text-xs text-[#a8b2c1] leading-relaxed border-t border-white/[0.06] pt-4">
                {panel.insight}
            </p>

            {/* Disclaimer */}
            <p className="mt-2 text-[10px] text-[#4a5568] leading-relaxed italic">
                Benchmarks vary by industry and offer; results aren&apos;t guaranteed.
            </p>

            {/* Sources */}
            {panel.sources?.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-[#4a5568]">
                        Sources:
                    </span>
                    {panel.sources.map((src, i) => (
                        <a
                            key={i}
                            href={src.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] text-[#3B82F6]/60 hover:text-[#3B82F6] underline underline-offset-2 transition-colors duration-150"
                        >
                            {src.label}
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
}
