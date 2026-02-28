// src/slices/FeatureGrid/index.tsx
import * as React from "react";
import { PrismicRichText } from "@prismicio/react";
import type { SliceComponentProps } from "@prismicio/react";

import {
  Sparkles,
  LayoutGrid,
  ShoppingBag,
  Workflow,
  Bot,
  PhoneCall,
  Gauge,
  ShieldCheck,
  LineChart,
  Mail,
  Zap,
  Wand2,
} from "lucide-react";

type FeatureGridProps = SliceComponentProps<any>;

const ICONS = {
  Sparkles,
  LayoutGrid,
  ShoppingBag,
  Workflow,
  Bot,
  PhoneCall,
  Gauge,
  ShieldCheck,
  LineChart,
  Mail,
  Zap,
  Wand2,
} as const;

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Normalize Prismic Rich Text fields so they are ALWAYS arrays.
 * Supports:
 * - Slice Machine mocks ({ __TYPE__, value })
 * - Real Prismic API responses ([...])
 */
function normalizeRichText(field: any) {
  if (Array.isArray(field)) return field;
  if (field?.value && Array.isArray(field.value)) return field.value;
  return null;
}

export default function FeatureGrid({ slice }: FeatureGridProps) {
  const primary = slice?.primary ?? {};

  const eyebrowField = normalizeRichText(primary.eyebrow);
  const headlineField = normalizeRichText(primary.headline);
  const bodyField = normalizeRichText(primary.body);

  const columns = Number(primary.columns ?? "3");
  const iconStyle = primary.icon_style ?? "chip";
  const highlightEnabled = primary.highlight_enabled ?? true;
  const visualMode = String(primary.visual_mode ?? "none").replace(/-/g, "_");

  const isCentered = slice?.variation === "centered";
  const isCompact = slice?.variation === "compact";

  const gridCols =
    columns === 2
      ? "md:grid-cols-2"
      : columns === 4
      ? "md:grid-cols-2 lg:grid-cols-4"
      : "md:grid-cols-2 lg:grid-cols-3";

  const cards: any[] = Array.isArray(primary.feature_cards)
    ? primary.feature_cards
    : [];

  return (
    <section
      data-slice-type={slice?.slice_type}
      data-slice-variation={slice?.variation}
      className="relative"
    >
      {/* Visual mode layer */}
      {visualMode !== "none" && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          {visualMode === "gradient_orb" && (
            <div className="absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full opacity-60 blur-3xl glass-orb" />
          )}
          {visualMode === "helix_3d" && (
            <div className="absolute -top-40 right-[-140px] h-[620px] w-[620px] rounded-full opacity-50 blur-3xl glass-helix" />
          )}
        </div>
      )}

      <div
        className={cx(
          "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8",
          isCompact ? "py-10" : "py-14"
        )}
      >
        {/* Header */}
        <div className={cx("max-w-2xl", isCentered && "mx-auto text-center")}>
          {eyebrowField && (
            <PrismicRichText
              field={eyebrowField}
              components={{
                paragraph: ({ children }) => (
                  <span className="glass-chip text-xs tracking-wide">
                    {children}
                  </span>
                ),
              }}
            />
          )}

          {headlineField && (
            <PrismicRichText
              field={headlineField}
              components={{
                heading1: ({ children }) => (
                  <h2
                    className={cx(
                      "mt-4 text-balance font-semibold",
                      isCompact
                        ? "text-2xl md:text-3xl"
                        : "text-3xl md:text-4xl"
                    )}
                  >
                    {children}
                  </h2>
                ),
                heading2: ({ children }) => (
                  <h2
                    className={cx(
                      "mt-4 text-balance font-semibold",
                      isCompact
                        ? "text-2xl md:text-3xl"
                        : "text-3xl md:text-4xl"
                    )}
                  >
                    {children}
                  </h2>
                ),
              }}
            />
          )}

          {bodyField && (
            <div
              className={cx(
                "mt-4 text-pretty text-sm sm:text-base opacity-90",
                isCentered && "mx-auto"
              )}
            >
              <PrismicRichText field={bodyField} />
            </div>
          )}
        </div>

        {/* Grid */}
        <div
          className={cx(
            "mt-8 grid gap-3 sm:gap-4",
            gridCols,
            isCompact ? "lg:gap-4" : "lg:gap-5"
          )}
        >
          {cards.map((item, index) => {
            const iconKey =
              typeof item?.icons === "string" ? item.icons : "Sparkles";
            const Icon = (ICONS as any)[iconKey] ?? Sparkles;

            const isHighlighted = Boolean(
              highlightEnabled && item?.highlight
            );

            const titleField = normalizeRichText(item?.title);
            const descriptionField = normalizeRichText(item?.description);

            return (
              <div
                key={`feature-${index}`}
                className={cx(
                  "relative overflow-hidden rounded-2xl p-4 sm:p-5",
                  "glass-frost glass-rim",
                  isHighlighted && "ring-1 ring-white/25"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="shrink-0">
                    {iconStyle === "chip" ? (
                      <div className="glass-chip inline-flex items-center justify-center">
                        <Icon className="h-4 w-4" />
                      </div>
                    ) : (
                      <Icon className="h-5 w-5 opacity-90" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      {titleField ? (
                        <PrismicRichText
                          field={titleField}
                          components={{
                            paragraph: ({ children }) => (
                              <h3 className="text-sm font-semibold leading-snug">
                                {children}
                              </h3>
                            ),
                          }}
                        />
                      ) : (
                        <h3 className="text-sm font-semibold leading-snug">
                          Feature
                        </h3>
                      )}

                      {isHighlighted && (
                        <span className="pulse-dot" aria-hidden />
                      )}
                    </div>

                    {descriptionField && (
                      <PrismicRichText
                        field={descriptionField}
                        components={{
                          paragraph: ({ children }) => (
                            <p className="mt-1 text-sm leading-relaxed opacity-85">
                              {children}
                            </p>
                          ),
                        }}
                      />
                    )}
                  </div>
                </div>

                {/* Hover sheen */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 hover:opacity-100"
                >
                  <div className="absolute inset-0 glass-sheen" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}