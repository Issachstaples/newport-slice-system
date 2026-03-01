// src/app/page.tsx
import { SliceZone } from "@prismicio/react";
import { notFound } from "next/navigation";

import { createClient } from "@/prismicio";
import { components } from "@/slices";


export default async function Page() {
  const client = createClient();

  // Fetch the published Page document by UID: "home"
  const page = await client
    .getByUID("page", "home")
    .catch(() => null);

  if (!page) notFound();

  if (process.env.NODE_ENV === "development") {
    console.log(
      "[page] slices:",
      page.data.slices.map((s) => ({
        slice_type: s.slice_type,
        variation: s.variation,
      }))
    );
  }

  return (
    <main className="relative min-h-dvh">
      {/* Premium liquid backdrop */}
      <div aria-hidden className="absolute inset-0 app-backdrop" />
      <div aria-hidden className="absolute inset-0 app-grid pointer-events-none" />

      {/* Soft vignette for contrast */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 520px at 50% 0%, rgba(255,255,255,0.06), transparent 60%), radial-gradient(1200px 900px at 50% 120%, rgba(0,0,0,0.55), transparent 55%)",
        }}
      />

      {/* Content */}
      <div className="relative">
        <SliceZone slices={page.data.slices} components={components} />
      </div>
    </main>
  );
}