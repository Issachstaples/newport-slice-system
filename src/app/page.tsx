import HeroSystem from "@/slices/HeroSystem";
import heroMocks from "@/slices/HeroSystem/mocks.json";

import BentoGrid from "@/slices/BentoGrid";
import bentoMocks from "@/slices/BentoGrid/mocks.json";

import CtaSection from "@/slices/CtaSection";
import ctaMocks from "@/slices/CtaSection/mocks.json";

import FeatureGrid from "@/slices/FeatureGrid";
import featureGridMocks from "@/slices/FeatureGrid/mocks.json";

export default function Page() {
  const heroSlice = (heroMocks as any)[0];
  const bentoSlice = (bentoMocks as any)[0];
  const featureGridSlice = (featureGridMocks as any)[0];
  const ctaSlice = (ctaMocks as any)[0];

  const slices = [heroSlice, bentoSlice, featureGridSlice, ctaSlice];

  const context = {};
  const bentoIndex = 1;
  const featureGridIndex = 2;
  const ctaIndex = 3;

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
        <HeroSystem slice={heroSlice} />

        <BentoGrid
          slice={bentoSlice}
          index={bentoIndex}
          slices={slices}
          context={context}
        />

        <FeatureGrid
          slice={featureGridSlice}
          index={featureGridIndex}
          slices={slices}
          context={context}
        />

        <CtaSection
          slice={ctaSlice}
          index={ctaIndex}
          slices={slices}
          context={context}
        />
      </div>
    </main>
  );
}