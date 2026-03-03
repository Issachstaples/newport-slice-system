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
 * Props for `IconList`.
 */
export type IconListProps = SliceComponentProps<Content.IconListSlice>;

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

// Padding scale
const PADDING: Record<string, string> = {
  none: "py-0",
  sm: "py-8",
  md: "py-16",
  lg: "py-24",
};

// Container width scale
const CONTAINER: Record<string, string> = {
  standard: "max-w-3xl",
  wide: "max-w-5xl",
  full: "max-w-full",
};

/**
 * Component for "IconList" Slices.
 */
const IconList: FC<IconListProps> = ({ slice }) => {
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

  // Content fields
  const eyebrow = asTextValue(primary?.eyebrow);
  const headline = asTextValue(primary?.headline);
  const bodyField = normalizeRichText(primary?.body);

  // Repeatable items from Group field inside primary
  const items = Array.isArray(primary?.items) ? primary.items : [];

  // Derived classes
  const paddingClass = PADDING[sectionPadding] ?? PADDING.md;
  const containerClass = CONTAINER[containerWidth] ?? CONTAINER.standard;
  const alignClass = alignMode === "center" ? "text-center items-center" : "text-left items-start";
  const rowGap = densityMode === "compact" ? "gap-3" : "gap-5";
  const iconSize = densityMode === "compact" ? "h-4 w-4" : "h-5 w-5";

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
        <div className={`flex flex-col gap-6 ${alignClass}`}>

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

          {/* Icon list rows */}
          {items.length > 0 ? (
            <ul className={`flex w-full flex-col ${rowGap}`}>
              {items.map((item: unknown, index: number) => {
                const row = (item ?? {}) as Record<string, unknown>;

                const iconKey = asEnumValue(row?.item_icon, "check", { normalize: true });
                const IconComponent = ICON_MAP[iconKey] ?? Check;
                const title = asTextValue(row?.item_title);
                const descField = normalizeRichText(row?.item_description);
                const isHighlighted = row?.item_is_highlighted === true;
                const badge = asTextValue(row?.item_badge);
                const itemKey = title ? `${title}-${index}` : `item-${index}`;

                return (
                  <li
                    key={itemKey}
                    className={`flex items-start gap-3 rounded-lg px-4 py-3 transition-colors ${isHighlighted
                        ? "bg-violet-500/10 ring-1 ring-violet-500/20"
                        : "bg-transparent"
                      }`}
                  >
                    {/* Icon */}
                    <span className="mt-0.5 flex-shrink-0 text-violet-400">
                      <IconComponent className={iconSize} aria-hidden="true" />
                    </span>

                    {/* Text content */}
                    <div className="flex min-w-0 flex-1 flex-col gap-1">
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

                      {descField ? (
                        <div className="prose prose-invert prose-sm max-w-none text-zinc-400">
                          <SafeRichText field={descField} />
                        </div>
                      ) : null}
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : null}

        </div>
      </div>
    </section>
  );
};

export default IconList;
