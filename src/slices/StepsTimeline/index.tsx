import { FC } from "react";
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
 * Props for `StepsTimeline`.
 */
export type StepsTimelineProps =
  SliceComponentProps<Content.StepsTimelineSlice>;

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

// Animation class map — Tailwind-only, no extra libs
const ANIMATION: Record<string, string> = {
  none: "",
  fade_in: "animate-[fadeIn_0.4s_ease-out_both]",
  slide_up: "animate-[slideUp_0.4s_ease-out_both]",
  stagger: "", // applied per-step via inline style delay
};

/**
 * Component for "StepsTimeline" Slices.
 */
const StepsTimeline: FC<StepsTimelineProps> = ({ slice }) => {
  const primary = slice.primary as Record<string, unknown>;

  // Required kill switch
  const isEnabled = primary?.is_enabled !== false;
  if (!isEnabled) return null;

  // Layout controls
  const visualMode = asEnumValue(primary?.visual_mode, "none", { normalize: true });
  const sectionPadding = asEnumValue(primary?.section_padding, "md");
  const containerWidth = asEnumValue(primary?.container_width, "standard", { normalize: true });
  const alignMode = asEnumValue(primary?.align_mode, "left");
  const densityMode = asEnumValue(primary?.density_mode, "relaxed");
  const animationMode = asEnumValue(primary?.animation_mode, "none", { normalize: true });
  const layoutMode = asEnumValue(primary?.layout_mode, "vertical");
  const connectorMode = asEnumValue(primary?.connector_mode, "line");
  const numberStyle = asEnumValue(primary?.number_style, "numeric");

  // Content fields
  const eyebrow = asTextValue(primary?.eyebrow);
  const headline = asTextValue(primary?.headline);
  const bodyField = normalizeRichText(primary?.body);

  // Steps from Group in primary
  const steps = Array.isArray(primary?.steps) ? primary.steps : [];

  // Derived layout classes
  const paddingClass = PADDING[sectionPadding] ?? PADDING.md;
  const containerClass = CONTAINER[containerWidth.trim()] ?? CONTAINER.standard;
  const alignClass = alignMode === "center" ? "text-center items-center" : "text-left items-start";
  const stepGap = densityMode === "compact" ? "gap-4" : "gap-8";
  const markerSize = densityMode === "compact" ? "h-7 w-7 text-xs" : "h-10 w-10 text-sm";
  const iconSize = densityMode === "compact" ? "h-3.5 w-3.5" : "h-5 w-5";
  const animClass = ANIMATION[animationMode] ?? "";
  const isStagger = animationMode === "stagger";

  const isHorizontal = layoutMode === "horizontal";

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

          {/* Steps */}
          {steps.length > 0 ? (
            <ol
              className={
                isHorizontal
                  ? `grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-${Math.min(steps.length, 4)} ${stepGap}`
                  : `flex w-full flex-col ${stepGap}`
              }
            >
              {steps.map((step: unknown, index: number) => {
                const s = (step ?? {}) as Record<string, unknown>;
                const title = asTextValue(s?.step_title);
                const stepBodyField = normalizeRichText(s?.step_body);
                const iconKey = asEnumValue(s?.step_icon, "check", { normalize: true });
                const IconComponent = ICON_MAP[iconKey.trim()] ?? Check;
                const isHighlighted = s?.step_is_highlighted === true;
                const badge = asTextValue(s?.step_badge);
                const stepKey = title ? `${title}-${index}` : `step-${index}`;
                const stepNum = index + 1;
                const isLast = index === steps.length - 1;

                const stepAnimClass = isStagger ? animClass : animClass;
                const stepAnimStyle =
                  isStagger ? { animationDelay: `${index * 120}ms` } : undefined;

                return (
                  <li
                    key={stepKey}
                    className={`relative flex ${isHorizontal ? "flex-col items-center" : "flex-row items-start"} gap-4 ${stepAnimClass}`}
                    style={stepAnimStyle}
                  >
                    {/* Connector track — vertical layout only */}
                    {!isHorizontal && !isLast && connectorMode !== "none" && (
                      <div
                        aria-hidden="true"
                        className={`absolute left-5 top-10 -bottom-8 w-px ${densityMode === "compact" ? "left-3.5 top-7" : ""} ${connectorMode === "dots"
                            ? "border-l-2 border-dotted border-zinc-600"
                            : "bg-zinc-700"
                          }`}
                      />
                    )}

                    {/* Marker */}
                    <div className="relative z-10 flex-shrink-0">
                      <div
                        className={`flex items-center justify-center rounded-full font-bold ring-2 ${markerSize} ${isHighlighted
                            ? "bg-violet-500 text-white ring-violet-400/40"
                            : "bg-zinc-800 text-zinc-300 ring-zinc-700"
                          }`}
                      >
                        {numberStyle === "icon" ? (
                          <IconComponent className={iconSize} aria-hidden="true" />
                        ) : (
                          <span>{stepNum}</span>
                        )}
                      </div>

                      {/* Horizontal connector — after marker, not on last */}
                      {isHorizontal && !isLast && connectorMode !== "none" && (
                        <div
                          aria-hidden="true"
                          className={`absolute top-1/2 left-full -translate-y-1/2 w-full h-px ${connectorMode === "dots"
                              ? "border-t-2 border-dotted border-zinc-600"
                              : "bg-zinc-700"
                            }`}
                        />
                      )}
                    </div>

                    {/* Step content */}
                    <div className={`flex min-w-0 flex-1 flex-col gap-1 ${isHorizontal ? "items-center text-center pt-2" : ""}`}>
                      {(title || badge) ? (
                        <div className="flex flex-wrap items-center gap-2">
                          {title ? (
                            <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                              {title}
                            </span>
                          ) : null}
                          {badge ? (
                            <span className="rounded-full bg-violet-500/15 px-2 py-0.5 text-xs font-medium text-violet-300 ring-1 ring-violet-500/25">
                              {badge}
                            </span>
                          ) : null}
                        </div>
                      ) : null}

                      {stepBodyField ? (
                        <div className="prose prose-invert prose-sm max-w-none text-zinc-400">
                          <SafeRichText field={stepBodyField} />
                        </div>
                      ) : null}
                    </div>
                  </li>
                );
              })}
            </ol>
          ) : null}

        </div>
      </div>
    </section>
  );
};

export default StepsTimeline;
