// src/slices/HeroSystem/index.tsx
import { PrismicNextLink } from "@prismicio/next";
import { asText, type Content, type RichTextField } from "@prismicio/client";

type Props = {
  slice: Content.HeroSystemSlice;
};

/**
 * Safe text extraction for:
 * - Key Text (string)
 * - Rich Text (array)
 * - Slice Machine wrappers: { __TYPE__, value, type }
 */
function asTextValue(field: unknown, fallback = ""): string {
  if (field == null) return fallback;

  if (typeof field === "string") return field;
  if (typeof field === "number") return String(field);

  if (Array.isArray(field)) {
    const text = asText(field as RichTextField);
    return text || fallback;
  }

  if (typeof field === "object") {
    const maybeValue = (field as { value?: unknown }).value;

    if (typeof maybeValue === "string") return maybeValue;
    if (typeof maybeValue === "number") return String(maybeValue);

    if (Array.isArray(maybeValue)) {
      const text = asText(maybeValue as RichTextField);
      return text || fallback;
    }
  }

  return fallback;
}

type AsEnumValueOptions = { normalize?: boolean };

function asEnumValue(
  field: unknown,
  fallback: string,
  options: AsEnumValueOptions = {}
): string {
  let value: unknown = field;

  if (value !== null && typeof value === "object" && "value" in value) {
    value = (value as { value?: unknown }).value;
  }

  if (typeof value === "number") value = String(value);

  if (typeof value !== "string" || value.length === 0) return fallback;

  const normalized = options.normalize
    ? value.trim().toLowerCase().replace(/\s+/g, "_")
    : value;

  return normalized || fallback;
}

export default function HeroSystem({ slice }: Props) {
  const primary = slice.primary;

  // Toggles / labels
  const showBadge = !!primary.badge_enabled;

  const badgeText = asTextValue(primary.badge_text, "Digital operations, built in");
  const primaryLabel = asTextValue(primary.primary_cta_label, "Start a Project");
  const secondaryLabel = asTextValue(primary.secondary_cta_label, "See the System");

  // Content (Key Text in your Prismic UI)
  const eyebrow = asTextValue(primary.eyebrow);
  const headline = asTextValue(primary.headline);
  const subheadline = asTextValue(primary.subheadline);

  const visualMode = asEnumValue(primary.visual_mode, "helix_3d", { normalize: true });

  return (
    <section className="relative min-h-[80vh] overflow-hidden bg-[#070B14] text-white">
      {/* Grid */}
      <div className="absolute inset-0 opacity-60 [mask-image:radial-gradient(circle_at_50%_35%,black_0%,black_55%,transparent_85%)]">
        <div className="h-full w-full bg-[linear-gradient(to_right,rgba(148,163,184,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.10)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* Visual mode */}
      {visualMode === "gradient_orb" && (
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute left-1/2 top-24 h-[520px] w-[520px] -translate-x-1/2 rounded-full blur-3xl opacity-30
            bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.55),rgba(56,189,248,0.22),rgba(99,102,241,0.12),transparent_70%)]"
          />
        </div>
      )}

      <div className="absolute inset-0 bg-[radial-gradient(60%_55%_at_50%_35%,rgba(255,255,255,0.06)_0%,rgba(0,0,0,0.55)_60%,rgba(0,0,0,0.85)_100%)]" />

      <div className="relative mx-auto max-w-6xl px-6 pt-24 pb-16">
        <div className="mx-auto max-w-3xl rounded-3xl p-10 glass-frost glass-rim transition-transform duration-500 hover:-translate-y-0.5">
          {/* Badge */}
          {showBadge && (
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs text-white/80">
              <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-white/70 shadow-[0_0_18px_rgba(255,255,255,0.25)]" />
              <span>{badgeText}</span>
            </div>
          )}

          {/* Eyebrow */}
          {eyebrow ? (
            <div className="text-xs tracking-[0.22em] text-white/60">{eyebrow}</div>
          ) : null}

          {/* Headline */}
          {headline ? (
            <h1 className="mt-4 text-5xl font-semibold tracking-tight leading-[1.02] md:text-6xl">
              {headline}
            </h1>
          ) : null}

          {/* Subheadline */}
          {subheadline ? (
            <p className="mt-5 max-w-2xl text-base text-white/70">{subheadline}</p>
          ) : null}

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <PrismicNextLink
              field={primary.primary_cta_link}
              className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-medium text-black shadow-[0_16px_50px_rgba(0,0,0,0.35)]"
            >
              {primaryLabel}
            </PrismicNextLink>

            <PrismicNextLink
              field={primary.secondary_cta_link}
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] px-5 py-3 text-sm font-medium text-white/90 backdrop-blur-xl"
            >
              {secondaryLabel}
            </PrismicNextLink>
          </div>

          {/* Optional debug */}
          <div className="mt-8 text-xs text-white/50">
            Visual mode: <span className="text-white/70">{visualMode}</span>
          </div>
        </div>
      </div>
    </section>
  );
}