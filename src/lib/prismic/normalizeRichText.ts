import type { RichTextField } from "@prismicio/client";

/**
 * Normalize Prismic Rich Text fields so they are ALWAYS arrays.
 * Supports:
 * - Slice Machine mocks ({ __TYPE__, value })
 * - Real Prismic API responses ([...])
 */
export function normalizeRichText(field: unknown): RichTextField | null {
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