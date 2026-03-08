import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";
import { createClient } from "@/prismicio";
import { components } from "@/components/features/slices";

interface PageParams {
    uid: string;
}

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
