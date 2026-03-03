"use client";

import { FC, useState, useEffect } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import {
  Check,
  Sparkles,
  Zap,
  ShieldCheck,
  Star,
  Info,
  AlertTriangle,
} from "lucide-react";
import { SafeRichText } from "@/components/prismic/SafeRichText";
import { normalizeRichText } from "@/lib/prismic/normalizeRichText";
import { asEnumValue } from "../../../asEnumValue";

/**
 * Props for `TabsSection`.
 */
export type TabsSectionProps = SliceComponentProps<Content.TabsSectionSlice>;

// Safe Key Text extraction — handles Slice Machine wrapper objects
function asTextValue(field: unknown, fallback = ""): string {
  if (field == null) return fallback;
  if (typeof field === "string") return field;
  if (typeof field === "object" && "value" in field) {
    const v = (field as { value?: unknown }).value;
    if (typeof v === "string") return v;
  }
  return fallback;
}

// Safe number extraction
function asNumberValue(field: unknown, fallback = 0): number {
  if (typeof field === "number") return field;
  if (typeof field === "string") {
    const n = parseInt(field, 10);
    if (!isNaN(n)) return n;
  }
  if (typeof field === "object" && field !== null && "value" in field) {
    const v = (field as { value?: unknown }).value;
    if (typeof v === "number") return v;
    if (typeof v === "string") {
      const n = parseInt(v, 10);
      if (!isNaN(n)) return n;
    }
  }
  return fallback;
}

// Icon mapping
const ICON_MAP: Record<string, typeof Check> = {
  check: Check,
  sparkles: Sparkles,
  bolt: Zap,
  shield: ShieldCheck,
  star: Star,
  info: Info,
  warning: AlertTriangle,
};

// Scale maps
const PADDING: Record<string, string> = {
  none: "py-0",
  sm: "py-8",
  md: "py-16",
  lg: "py-24",
};

const CONTAINER: Record<string, string> = {
  standard: "max-w-3xl",
  wide: "max-w-5xl",
  full: "max-w-full",
};

/**
 * Component for "TabsSection" Slices.
 */
const TabsSection: FC<TabsSectionProps> = ({ slice }) => {
  const primary = slice.primary as Record<string, unknown>;

  // Required kill switch
  const isEnabled = primary?.is_enabled !== false;
  if (!isEnabled) return null;

  // Layout controls
  const visualMode = asEnumValue(primary?.visual_mode, "none", { normalize: true });
  const sectionPadding = asEnumValue(primary?.section_padding, "md");
  const containerWidth = asEnumValue(primary?.container_width, "standard");
  const alignMode = asEnumValue(primary?.align_mode, "left");
  const densityMode = asEnumValue(primary?.density_mode, "relaxed");
  const animationMode = asEnumValue(primary?.animation_mode, "none", { normalize: true });

  // Tabs-specific controls
  const tabsStyle = asEnumValue(primary?.tabs_style, "pills");
  const contentStyle = asEnumValue(primary?.content_style, "panel");
  const showIcons = primary?.show_icons !== false;
  const allowWrap = primary?.allow_wrap !== false;

  // Content fields
  const eyebrow = asTextValue(primary?.eyebrow);
  const headline = asTextValue(primary?.headline);
  const bodyField = normalizeRichText(primary?.body);

  // Tabs group
  const tabs = Array.isArray(primary?.tabs) ? primary.tabs : [];
  const rawDefaultIndex = asNumberValue(primary?.default_tab_index, 0);
  const clampedDefault = tabs.length > 0 ? Math.max(0, Math.min(rawDefaultIndex, tabs.length - 1)) : 0;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [activeIndex, setActiveIndex] = useState(clampedDefault);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setActiveIndex((prev) => Math.max(0, Math.min(prev, tabs.length - 1)));
  }, [tabs.length]);

  // Derived classes
  const paddingClass = PADDING[sectionPadding] ?? PADDING.md;
  const containerClass = CONTAINER[containerWidth] ?? CONTAINER.standard;
  const alignClass = alignMode === "center" ? "text-center items-center" : "text-left items-start";
  const tabGap = densityMode === "compact" ? "gap-1" : "gap-2";
  const panelPad = densityMode === "compact" ? "p-4" : "p-6";

  // Tab button style builders
  function getTabButtonClass(isActive: boolean): string {
    const base = "flex items-center gap-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500";
    if (tabsStyle === "underline") {
      return `${base} px-1 pb-2 border-b-2 ${isActive
          ? "border-violet-500 text-violet-400"
          : "border-transparent text-zinc-400 hover:text-zinc-200 hover:border-zinc-600"
        }`;
    }
    if (tabsStyle === "cards") {
      return `${base} px-3 py-2 rounded-lg ${isActive
          ? "bg-zinc-800 text-white ring-1 ring-zinc-600"
          : "bg-zinc-900/50 text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200"
        }`;
    }
    // pills (default)
    return `${base} px-4 py-1.5 rounded-full ${isActive
        ? "bg-violet-600 text-white shadow-sm shadow-violet-500/20"
        : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"
      }`;
  }

  // Animation helpers
  function getPanelAnimStyle(index: number): React.CSSProperties | undefined {
    if (animationMode === "stagger") {
      return { animationDelay: `${index * 80}ms` };
    }
    return undefined;
  }

  function getPanelAnimClass(): string {
    if (animationMode === "fade_in") return "animate-[fadeIn_0.3s_ease-out_both]";
    if (animationMode === "slide_up") return "animate-[slideUp_0.3s_ease-out_both]";
    if (animationMode === "stagger") return "animate-[fadeIn_0.3s_ease-out_both]";
    return "";
  }

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={`relative w-full ${paddingClass}`}
    >
      {/* Visual accent layer */}
      {visualMode === "gradient_orb" && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
        >
          <div className="h-[480px] w-[480px] rounded-full bg-gradient-to-br from-violet-500/20 to-cyan-400/10 blur-3xl" />
        </div>
      )}

      {visualMode === "helix_3d" && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-violet-500/30 via-cyan-400/10 to-transparent" />
        </div>
      )}

      {/* Content container */}
      <div className={`relative mx-auto w-full px-4 ${containerClass}`}>
        <div className={`flex flex-col gap-8 ${alignClass}`}>

          {/* Section header */}
          {eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-400">
              {eyebrow}
            </p>
          ) : null}

          {headline ? (
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl lg:text-5xl">
              {headline}
            </h2>
          ) : null}

          {bodyField ? (
            <div className="prose prose-invert max-w-none text-zinc-300">
              <SafeRichText field={bodyField} />
            </div>
          ) : null}

          {/* Tabs UI */}
          {tabs.length === 0 ? (
            <p className="text-sm text-zinc-500">No tabs configured.</p>
          ) : (
            <div className="w-full">

              {/* Tab header row */}
              <div
                className={`${tabsStyle === "underline" ? "border-b border-zinc-800" : ""}`}
              >
                <div
                  role="tablist"
                  aria-label="Tabs"
                  className={`flex ${tabGap} ${allowWrap ? "flex-wrap" : "flex-nowrap overflow-x-auto"} ${tabsStyle === "underline" ? "-mb-px" : ""}`}
                >
                  {tabs.map((tab: unknown, index: number) => {
                    const t = (tab ?? {}) as Record<string, unknown>;
                    const label = asTextValue(t?.tab_label) || `Tab ${index + 1}`;
                    const badge = asTextValue(t?.tab_badge);
                    const iconKey = asEnumValue(t?.tab_icon, "check", { normalize: true });
                    const IconComponent = ICON_MAP[iconKey] ?? Check;
                    const isActive = index === activeIndex;

                    return (
                      <button
                        key={`tab-btn-${index}`}
                        role="tab"
                        aria-selected={isActive}
                        aria-controls={`tabpanel-${index}`}
                        id={`tab-${index}`}
                        onClick={() => setActiveIndex(index)}
                        className={getTabButtonClass(isActive)}
                        type="button"
                      >
                        {showIcons && (
                          <IconComponent className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
                        )}
                        <span>{label}</span>
                        {badge ? (
                          <span className="ml-1 rounded-full bg-violet-500/15 px-1.5 py-0.5 text-xs font-medium text-violet-300 ring-1 ring-violet-500/25">
                            {badge}
                          </span>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tab content panels */}
              <div className="mt-4">
                {tabs.map((tab: unknown, index: number) => {
                  if (index !== activeIndex) return null;
                  const t = (tab ?? {}) as Record<string, unknown>;
                  const tabBodyField = normalizeRichText(t?.tab_body);

                  return (
                    <div
                      key={`tabpanel-${index}`}
                      role="tabpanel"
                      id={`tabpanel-${index}`}
                      aria-labelledby={`tab-${index}`}
                      className={`rounded-xl bg-zinc-900/50 ring-1 ring-zinc-800 ${panelPad} ${getPanelAnimClass()}`}
                      style={getPanelAnimStyle(index)}
                    >
                      {tabBodyField ? (
                        contentStyle === "grid" ? (
                          <div className="grid gap-4 sm:grid-cols-2 [&>*]:rounded-lg [&>*]:border [&>*]:border-zinc-700 [&>*]:bg-zinc-800/60 [&>*]:p-4 [&>*]:text-sm [&>*]:text-zinc-300">
                            <SafeRichText field={tabBodyField} />
                          </div>
                        ) : (
                          <div className="prose prose-invert max-w-none text-zinc-300">
                            <SafeRichText field={tabBodyField} />
                          </div>
                        )
                      ) : (
                        <p className="text-sm text-zinc-500">No content for this tab.</p>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default TabsSection;
