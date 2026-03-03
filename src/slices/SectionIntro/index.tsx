import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { SafeRichText } from "@/components/prismic/SafeRichText";
import { normalizeRichText } from "@/lib/prismic/normalizeRichText";
import { asEnumValue } from "../../../asEnumValue";

/**
 * Props for `SectionIntro`.
 */
export type SectionIntroProps = SliceComponentProps<Content.SectionIntroSlice>;

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
 * Component for "SectionIntro" Slices.
 */
const SectionIntro: FC<SectionIntroProps> = ({ slice }) => {
  const primary = slice.primary as Record<string, unknown>;

  // Required kill switch
  const isEnabled = primary?.is_enabled !== false;
  if (!isEnabled) return null;

  // Layout controls
  const visualMode = asEnumValue(primary?.visual_mode, "none", { normalize: true });
  const sectionPadding = asEnumValue(primary?.section_padding, "md");
  const containerWidth = asEnumValue(primary?.container_width, "standard");
  const alignMode = asEnumValue(primary?.align_mode, "left");

  // Content fields
  const eyebrow = asTextValue(primary?.eyebrow);
  const headline = asTextValue(primary?.headline);
  const bodyField = normalizeRichText(primary?.body);

  // Derived classes
  const paddingClass = PADDING[sectionPadding] ?? PADDING.md;
  const containerClass = CONTAINER[containerWidth] ?? CONTAINER.standard;
  const alignClass = alignMode === "center" ? "text-center items-center" : "text-left items-start";

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
        <div className={`flex flex-col gap-4 ${alignClass}`}>
          {/* Eyebrow */}
          {eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-400">
              {eyebrow}
            </p>
          ) : null}

          {/* Headline */}
          {headline ? (
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {headline}
            </h2>
          ) : null}

          {/* Body */}
          {bodyField ? (
            <div className="prose prose-invert max-w-none text-zinc-300">
              <SafeRichText field={bodyField} />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default SectionIntro;
