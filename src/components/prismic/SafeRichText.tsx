// src/components/prismic/SafeRichText.tsx
import { PrismicRichText } from "@prismicio/react";

function normalizeRichText(field: any) {
  if (Array.isArray(field)) return field;
  if (field?.value && Array.isArray(field.value)) return field.value;
  return null;
}

export function SafeRichText({
  field,
  components,
}: {
  field: any;
  components?: any;
}) {
  const normalized = normalizeRichText(field);
  if (!normalized) return null;

  return <PrismicRichText field={normalized} components={components} />;
}