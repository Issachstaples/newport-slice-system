import { FC } from "react";
import { Content, asText, type RichTextField } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Sparkles, Zap, ShieldCheck, Wand2 } from "lucide-react";

/**
 * Props for `FeatureGridV2`.
 */
export type FeatureGridV2Props =
  SliceComponentProps<Content.FeatureGridV2Slice>;

// Icon mapping
const ICONS: Record<string, typeof Sparkles> = {
  star: Sparkles,
  spark: Zap,
  shield: ShieldCheck,
  wand: Wand2,
};

// Safe text extraction
function asTextValue(field: unknown, fallback = ""): string {
  if (field == null) return fallback;
  if (typeof field === "string") return field;
  if (typeof field === "number") return String(field);
  if (Array.isArray(field)) return asText(field as RichTextField) || fallback;
  if (typeof field === "object" && "value" in field) {
    const v = (field as { value?: unknown }).value;
    if (typeof v === "string") return v;
    if (Array.isArray(v)) return asText(v as RichTextField) || fallback;
  }
  return fallback;
}

// Normalize Rich Text (handle Slice Machine wrappers)
function normalizeRichText(field: unknown): RichTextField | null {
  if (Array.isArray(field)) return field as RichTextField;
  if (typeof field === "object" && field !== null && "value" in field) {
    const v = (field as { value?: unknown }).value;
    if (Array.isArray(v)) return v as RichTextField;
  }
  return null;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Component for "FeatureGridV2" Slices.
 */
const FeatureGridV2: FC<FeatureGridV2Props> = ({ slice }) => {
  const primary = slice.primary as Record<string, unknown>;

  // Read cards from primary.cards (Group field)
  const cards = Array.isArray(primary?.cards) ? primary.cards : [];

  // Header fields
  const eyebrow = asTextValue(primary?.eyebrow);
  const headline = asTextValue(primary?.headline);
  const bodyField = normalizeRichText(primary?.body);

  // Config
  const columns = Number(asTextValue(primary?.columns, "3"));
  const iconStyle = asTextValue(primary?.icon_style, "chip");
  const highlightEnabled = primary?.highlight_enabled !== false;
  const visualMode = asTextValue(primary?.visual_mode, "glass").replace(/-/g, "_");

  const gridCols =
    columns === 1
      ? "grid-cols-1"
      : columns === 2
        ? "md:grid-cols-2"
        : columns === 4
          ? "md:grid-cols-2 lg:grid-cols-4"
          : "md:grid-cols-2 lg:grid-cols-3";

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative overflow-hidden bg-[#070B14] text-white"
    >
      {/* Visual mode: gradient orb */}
      {visualMode === "gradient_orb" && (
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-10 h-[520px] w-[520px] -translate-x-1/2 rounded-full blur-3xl opacity-30 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.55),rgba(56,189,248,0.22),rgba(99,102,241,0.14),transparent_72%)]" />
        </div>
      )}

      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-45 [mask-image:radial-gradient(circle_at_50%_20%,black_0%,black_50%,transparent_85%)]">
        <div className="h-full w-full bg-[linear-gradient(to_right,rgba(148,163,184,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.10)_1px,transparent_1px)] bg-[size:44px_44px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-14">
        {/* Header */}
        <header className="max-w-2xl">
          {eyebrow && (
            <div className="text-xs tracking-[0.22em] text-white/60 uppercase">{eyebrow}</div>
          )}
          {headline && (
            <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">{headline}</h2>
          )}
          {bodyField && (
            <div className="mt-4 max-w-2xl text-base text-white/70">
              <PrismicRichText field={bodyField} />
            </div>
          )}
        </header>

        {/* Cards Grid */}
        <div className={cx("mt-10 grid gap-4", gridCols)}>
          {cards.map((card: Record<string, unknown>, idx: number) => {
            const iconKey = asTextValue(card?.icons, "star");
            const Icon = ICONS[iconKey] ?? Sparkles;
            const title = asTextValue(card?.title);
            const descField = normalizeRichText(card?.description);
            const isHighlighted = highlightEnabled && card?.highlight === true;

            return (
              <div
                key={idx}
                className={cx(
                  "group relative rounded-2xl p-5 transition-transform duration-300",
                  visualMode === "glass"
                    ? "glass-frost glass-rim hover:-translate-y-0.5"
                    : "border border-white/10 bg-white/[0.03]",
                  isHighlighted && "ring-1 ring-white/20"
                )}
              >
                <div className="flex items-start gap-3">
                  {iconStyle === "chip" ? (
                    <div className="shrink-0 rounded-xl border border-white/10 bg-white/[0.06] p-2 text-white/75">
                      <Icon size={18} />
                    </div>
                  ) : iconStyle !== "none" ? (
                    <Icon size={20} className="shrink-0 text-white/75" />
                  ) : null}

                  <div className="min-w-0">
                    {title && (
                      <h3 className="text-sm font-semibold leading-snug text-white/90">{title}</h3>
                    )}
                    {descField && (
                      <div className="mt-1 text-sm text-white/70">
                        <PrismicRichText field={descField} />
                      </div>
                    )}
                  </div>
                </div>

                {isHighlighted && (
                  <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-white/70 shadow-[0_0_12px_rgba(255,255,255,0.3)]" />
                )}
              </div>
            );
          })}
        </div>

        {/* Dev-only empty state */}
        {cards.length === 0 && process.env.NODE_ENV === "development" && (
          <div className="mt-10 rounded-xl border border-dashed border-white/20 p-6 text-center text-sm text-white/50">
            No cards configured for this FeatureGridV2 slice.
          </div>
        )}
      </div>
    </section>
  );
};

export default FeatureGridV2;
