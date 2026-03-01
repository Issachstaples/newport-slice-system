// src/app/page.tsx
import { SliceZone } from "@prismicio/react";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

import { createClient } from "@/prismicio";
import { components } from "@/slices";


export default async function Page() {
  const client = createClient();
  const localComponents = {
    ...components,
    eyebrow: dynamic(() => import("@/slices/FeatureGrid")),
    feature_grid: dynamic(() => import("@/slices/FeatureGrid")),
  };

  // Fetch the published Page document by UID: "home"
  const page = await client
    .getByUID("page", "home")
    .catch(() => null);

  if (!page) notFound();


  return (
    <main className="relative min-h-dvh overflow-hidden">
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
        <SliceZone slices={page.data.slices} components={localComponents} />
      </div>
    </main>
  );
}