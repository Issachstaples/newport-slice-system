// src/components/prismic/SafeRichText.tsx
import { PrismicRichText } from "@prismicio/react";
import type { RichTextField } from "@prismicio/client";
import type { ComponentProps } from "react";

type PrismicRichTextComponents = ComponentProps<
  typeof PrismicRichText
>["components"];

function normalizeRichText(field: unknown): RichTextField | null {
  if (Array.isArray(field)) return field as RichTextField;
  if (
    typeof field === "object" &&
    field !== null &&
    "value" in field &&
    Array.isArray((field as { value?: unknown }).value)
  ) {
    return (field as { value: RichTextField }).value;
  }
  return null;
}

export function SafeRichText({
  field,
  components,
}: {
  field: unknown;
  components?: PrismicRichTextComponents;
}) {
  const normalized = normalizeRichText(field);
  if (!normalized) return null;

  return <PrismicRichText field={normalized} components={components} />;
}