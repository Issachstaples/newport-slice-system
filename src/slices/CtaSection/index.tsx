import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import type { Content } from "@prismicio/client";

export type CtaSectionProps = SliceComponentProps<Content.CtaSectionSlice>;

function asTextValue(field: unknown, fallback = ""): string {
  if (field == null) return fallback;
  if (typeof field === "string") return field;
  if (typeof field === "number") return String(field);
  if (typeof field === "object") {
    const maybeValue = (field as any).value;
    if (typeof maybeValue === "string") return maybeValue;
    if (typeof maybeValue === "number") return String(maybeValue);
  }
  return fallback;
}

export default function CtaSection({ slice }: CtaSectionProps) {
  const eyebrow = asTextValue(slice.primary.eyebrow);
  const headline = asTextValue(slice.primary.headline);
  const visualMode = asTextValue(slice.primary.visual_mode, "glass");
  const emphasis = asTextValue(slice.primary.emphasis, "normal");

  const primaryLabel = asTextValue(slice.primary.primary_cta_label, "Start a Project");
  const secondaryLabel = asTextValue(slice.primary.secondary_cta_label, "See How It Works");

  const strong = emphasis === "strong";

  return (
    <section className="relative overflow-hidden bg-[#070B14] text-white">
      {/* Background: subtle grid */}
      <div className="absolute inset-0 opacity-50 [mask-image:radial-gradient(circle_at_50%_40%,black_0%,black_55%,transparent_85%)]">
        <div className="h-full w-full bg-[linear-gradient(to_right,rgba(148,163,184,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.10)_1px,transparent_1px)] bg-[size:44px_44px]" />
      </div>

      {/* Background: optional orb */}
      {visualMode === "gradient_orb" && (
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-10 h-[520px] w-[520px] -translate-x-1/2 rounded-full blur-3xl opacity-35
            bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.55),rgba(56,189,248,0.22),rgba(99,102,241,0.14),transparent_72%)]" />
        </div>
      )}

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(70%_55%_at_50%_35%,rgba(255,255,255,0.06)_0%,rgba(0,0,0,0.55)_60%,rgba(0,0,0,0.85)_100%)]" />

      <div className="relative mx-auto max-w-6xl px-6 py-16">
        <div
          className={[
            "rounded-3xl p-10 transition-transform duration-500",
            visualMode === "glass" ? "glass-frost glass-rim hover:-translate-y-0.5" : "",
          ].join(" ")}
        >
          <div className="max-w-3xl">
            <div className="text-xs tracking-[0.22em] text-white/60">{eyebrow}</div>

            <h2
              className={[
                "mt-4 font-semibold tracking-tight leading-[1.05]",
                strong ? "text-4xl md:text-5xl" : "text-3xl md:text-4xl",
              ].join(" ")}
            >
              {headline}
            </h2>

            <div className="mt-4 max-w-2xl text-base text-white/70">
              <PrismicRichText field={slice.primary.body} />
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <PrismicNextLink
                field={slice.primary.primary_cta_link}
                className={[
                  "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-medium",
                  strong
                    ? "bg-white text-black shadow-[0_18px_60px_rgba(0,0,0,0.45)]"
                    : "bg-white text-black shadow-[0_16px_50px_rgba(0,0,0,0.35)]",
                ].join(" ")}
              >
                {primaryLabel}
              </PrismicNextLink>

              <PrismicNextLink
                field={slice.primary.secondary_cta_link}
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] px-5 py-3 text-sm font-medium text-white/90 backdrop-blur-xl"
              >
                {secondaryLabel}
              </PrismicNextLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}