// src/lib/prismic/asEnumValue.ts

/**
 * Safely normalize enum / select values coming from Prismic.
 *
 * Handles:
 * - Real API strings
 * - Slice Machine mock wrappers ({ __TYPE__, value })
 * - Fallback defaults
 * - Optional string normalization (dash → underscore)
 *
 * Intended for:
 * - visual_mode
 * - icon_style
 * - variant selectors
 * - any config-like select field
 */
export function asEnumValue(
  field: unknown,
  fallback: string,
  options?: {
    normalize?: boolean; // replace '-' with '_'
    lowercase?: boolean;
  }
): string {
  let value: unknown = field;

  // Unwrap Slice Machine mock shape
  if (typeof value === "object" && value !== null) {
    const maybeValue = (value as any).value;
    if (typeof maybeValue === "string") value = maybeValue;
  }

  if (typeof value !== "string" || value.length === 0) {
    return fallback;
  }

  let result = value;

  if (options?.normalize) {
    result = result.replace(/-/g, "_");
  }

  if (options?.lowercase) {
    result = result.toLowerCase();
  }

  return result;
}