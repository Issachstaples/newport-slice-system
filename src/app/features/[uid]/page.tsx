import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";
import { createClient } from "@/prismicio";
import { components } from "@/components/features/slices";

interface PageParams {
    uid: string;
}

// The 5 feature_page UIDs expected to exist in Prismic once published.
const EXPECTED_UIDS = [
    "seo-conversion",
    "pipeline",
    "autopilot",
    "dashboard",
    "fusebox",
] as const;

// Cast to prismic.Client (untyped) so we can query the feature_page type
// which is not yet in the generated prismicio-types.d.ts overloads.
function baseClient(): prismic.Client {
    return createClient() as unknown as prismic.Client;
}

export async function generateMetadata({
    params,
}: {
    params: Promise<PageParams>;
}): Promise<Metadata> {
    const { uid } = await params;
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const doc = (await baseClient().getByUID("feature_page", uid)) as any;
        return {
            title: doc.data.meta_title || doc.data.title || uid,
            description: doc.data.meta_description || "",
        };
    } catch {
        return {};
    }
}

// ── Draft fallback ─────────────────────────────────────────────────────────
// Rendered when a UID is one of the known feature pages but the Prismic doc
// hasn't been published yet.  For unknown UIDs, notFound() is called instead.
//
// TO PUBLISH A FEATURE PAGE IN PRISMIC:
//  1. Go to https://newport-slice-system.prismic.io  (or your repo URL)
//  2. Create document → Custom Types → Feature Page
//  3. Set the UID field to one of the values in EXPECTED_UIDS above
//  4. Add at least one slice and click Save, then Publish
//  5. The route /features/<uid> will immediately render the SliceZone
// ───────────────────────────────────────────────────────────────────────────

function DraftFallback({ uid }: { uid: string }) {
    return (
        <div className="min-h-screen bg-[#0a0d14] text-white">
            <div className="fixed inset-0 app-grid pointer-events-none" aria-hidden="true" />
            <div
                className="fixed inset-0 pointer-events-none"
                aria-hidden="true"
                style={{
                    background:
                        "radial-gradient(900px 600px at 10% 0%, rgba(59,130,246,0.07), transparent 70%)",
                }}
            />
            <main className="relative z-10 max-w-2xl mx-auto px-6 pt-28 pb-32">
                <div className="glass-chip mb-6 w-fit">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" aria-hidden="true" />
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-amber-400/80">
                        Coming Soon
                    </span>
                </div>

                <h1 className="text-3xl font-bold text-white mb-4 leading-tight">
                    This page isn&apos;t published yet.
                </h1>
                <p className="text-[#a8b2c1] text-sm leading-relaxed mb-8">
                    The feature page{" "}
                    <code className="text-[#3B82F6] bg-[#3B82F6]/10 px-1.5 py-0.5 rounded text-xs font-mono">
                        /features/{uid}
                    </code>{" "}
                    is defined in Prismic but the document hasn&apos;t been published yet.
                    Once the document is saved and published in the CMS, this route will
                    automatically render its slices.
                </p>

                <div className="glass-panel glass-rim rounded-2xl p-6 mb-6">
                    <h2 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#3B82F6]/70 mb-4">
                        Expected Feature Page UIDs
                    </h2>
                    <ul className="space-y-2">
                        {EXPECTED_UIDS.map((id) => (
                            <li key={id} className="flex items-center gap-3 text-sm">
                                <span
                                    className={`shrink-0 w-1.5 h-1.5 rounded-full ${id === uid ? "bg-amber-400" : "bg-[#3B82F6]/40"
                                        }`}
                                    aria-hidden="true"
                                />
                                <code
                                    className={`font-mono text-xs px-1.5 py-0.5 rounded ${id === uid
                                            ? "text-amber-400 bg-amber-400/10"
                                            : "text-[#a8b2c1] bg-white/[0.04]"
                                        }`}
                                >
                                    /features/{id}
                                </code>
                                {id === uid && (
                                    <span className="text-xs text-amber-400/70">← this page</span>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="glass-panel-soft glass-rim rounded-2xl p-6 mb-8">
                    <h2 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#3B82F6]/70 mb-4">
                        How to Publish
                    </h2>
                    <ol className="space-y-3">
                        {[
                            "Open your Prismic dashboard → newport-slice-system",
                            'Create a new document using the "Feature Page" custom type',
                            `Set the UID field to: ${uid}`,
                            "Add at least one slice, then click Save",
                            "Click Publish — this route will render immediately",
                        ].map((step, i) => (
                            <li key={step} className="flex items-start gap-3 text-sm text-[#cbd5e0]">
                                <span className="shrink-0 w-5 h-5 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/30 flex items-center justify-center text-[10px] font-bold text-[#3B82F6] mt-0.5">
                                    {i + 1}
                                </span>
                                {step}
                            </li>
                        ))}
                    </ol>
                </div>

                <div className="flex items-center gap-6 text-sm text-[#4a5568]">
                    <Link href="/features" className="hover:text-[#3B82F6] transition-colors">
                        ← Back to Features
                    </Link>
                    <Link href="/" className="hover:text-[#3B82F6] transition-colors">
                        Home
                    </Link>
                </div>
            </main>
        </div>
    );
}

export default async function FeaturePageDynamic({
    params,
}: {
    params: Promise<PageParams>;
}) {
    const { uid } = await params;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let doc: any;
    try {
        doc = await baseClient().getByUID("feature_page", uid);
    } catch {
        // Known UID but doc not published yet → show friendly fallback
        if ((EXPECTED_UIDS as readonly string[]).includes(uid)) {
            return <DraftFallback uid={uid} />;
        }
        // Truly unknown UID → hard 404
        notFound();
    }

    return (
        <div className="min-h-screen bg-[#0a0d14] text-white">
            {/* Grid overlay */}
            <div className="fixed inset-0 app-grid pointer-events-none" />

            {/* Ambient glow */}
            <div
                className="fixed inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(900px 600px at 10% 0%, rgba(59, 130, 246, 0.07), transparent 70%)",
                }}
            />

            <main className="relative z-10 pb-32">
                <SliceZone slices={doc.data.body} components={components} />
            </main>
        </div>
    );
}
