import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import type { Content } from "@prismicio/client";
import {
  Sparkles,
  Zap,
  ShieldCheck,
  LayoutGrid,
  MessageSquare,
  Wand2,
} from "lucide-react";

export type BentoGridProps = SliceComponentProps<Content.BentoGridSlice>;

const ICONS: Record<string, any> = {
  spark: Sparkles,
  bolt: Zap,
  shield: ShieldCheck,
  grid: LayoutGrid,
  chat: MessageSquare,
  wand: Wand2,
};

function asTextValue(field: unknown, fallback = ""): string {
  if (field == null) return fallback;
  if (typeof field === "string") return field;
  if (typeof field === "number") return String(field);
  if (typeof field === "object") {
    const v = (field as any).value;
    if (typeof v === "string") return v;
    if (typeof v === "number") return String(v);
  }
  return fallback;
}

function colClass(columns: string) {
  switch (columns) {
    case "2":
      return "md:grid-cols-2";
    case "4":
      return "md:grid-cols-4";
    case "3":
    default:
      return "md:grid-cols-3";
  }
}

function spanClass(size: string) {
  // Default uses row auto sizing; "xl" gets a taller card.
  switch (size) {
    case "lg":
      return "md:col-span-2";
    case "xl":
      return "md:col-span-2 md:row-span-2";
    case "sm":
    case "md":
    default:
      return "";
  }
}

export default function BentoGrid({ slice }: BentoGridProps) {
  const eyebrow = asTextValue(slice.primary.eyebrow);
  const headline = asTextValue(slice.primary.headline);
  const columns = asTextValue(slice.primary.columns, "3");
  const visualMode = asTextValue(slice.primary.visual_mode, "glass");

  return (
    <section className="relative overflow-hidden bg-[#070B14] text-white">
      {/* Optional background orb */}
      {visualMode === "gradient_orb" && (
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-10 h-[620px] w-[620px] -translate-x-1/2 rounded-full blur-3xl opacity-30
            bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.55),rgba(56,189,248,0.22),rgba(99,102,241,0.14),transparent_72%)]" />
        </div>
      )}

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-45 [mask-image:radial-gradient(circle_at_50%_20%,black_0%,black_50%,transparent_85%)]">
        <div className="h-full w-full bg-[linear-gradient(to_right,rgba(148,163,184,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.10)_1px,transparent_1px)] bg-[size:44px_44px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-12">
        <header className="max-w-3xl">
          <div className="text-xs tracking-[0.22em] text-white/60">{eyebrow}</div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
            {headline}
          </h2>
          <div className="mt-4 max-w-2xl text-base text-white/70">
            <PrismicRichText field={slice.primary.body} />
          </div>
        </header>

        <div className={`mt-8 grid grid-cols-1 gap-3 ${colClass(columns)}`}>
          {(Array.isArray(slice.items) ? slice.items : []).map((item: any, idx: number) => {
            const title = asTextValue(item.title);
            const body = asTextValue(item.body); // if you kept card_body, change to item.card_body here
            const icon = asTextValue(item.icon, "spark");
            const size = asTextValue(item.size, "md");
            const emphasis = asTextValue(item.emphasis, "normal");
            const linkLabel = asTextValue(item.link_label, "Learn more");

            const highlight = emphasis === "highlight";

            return (
              <div
                key={item?.key ?? idx}
                className={[
                  "group relative rounded-3xl p-5 transition-transform duration-500",
                  spanClass(size),
                  visualMode === "glass" ? "glass-frost glass-rim hover:-translate-y-0.5" : "border border-white/10 bg-white/[0.03]",
                  highlight ? "shadow-[0_30px_100px_rgba(0,0,0,0.55)]" : "",
                ].join(" ")}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="text-sm font-medium text-white/85">{title}</div>
                  {(() => {
                    const Icon = ICONS[icon] ?? Sparkles;
                    return (
                    <div className="relative rounded-xl border border-white/10 bg-white/[0.06] p-2 text-white/75 backdrop-blur-xl">
  <Icon size={18} />{highlight && (
  <span className="pulse-dot absolute -right-1 -top-1 h-2 w-2 rounded-full bg-white/90" />
)}
</div>
                 );
                })()}
                </div>

                <div className="mt-3 text-sm text-white/70">
                  {body ? body : <PrismicRichText field={item.body} />}
                </div>

                {item.link && (
                  <div className="mt-5">
                    <PrismicNextLink
                      field={item.link}
                      className="inline-flex items-center gap-2 text-sm font-medium text-white/85 hover:text-white"
                    >
                      {linkLabel}
                      <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                    </PrismicNextLink>
                  </div>
                )}

                {highlight && (
                  <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-60
                    [background:radial-gradient(60%_60%_at_30%_20%,rgba(56,189,248,0.20),transparent_60%)]" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}