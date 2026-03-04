import Image from "next/image";

export interface HeroBackgroundProps {
    src: string;
    alt: string;
}

export default function HeroBackground({ src, alt }: HeroBackgroundProps) {
    return (
        <div className="absolute inset-0 z-0">
            {/* Background image */}
            <Image
                src={src}
                alt={alt}
                fill
                priority
                className="object-cover"
                quality={90}
            />

            {/* Strong vignette overlay for readability */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "radial-gradient(circle at center, transparent 0%, rgba(10, 13, 20, 0.65) 50%, rgba(10, 13, 20, 0.92) 100%)",
                }}
            />

            {/* Type spotlight - radial darkening behind headline area */}
            <div
                className="absolute inset-x-0 top-0 h-2/3"
                style={{
                    background:
                        "radial-gradient(ellipse 900px 400px at 50% 25%, rgba(10, 13, 20, 0.4) 0%, transparent 70%)",
                }}
            />

            {/* Subtle top glow */}
            <div
                className="absolute inset-x-0 top-0 h-1/3"
                style={{
                    background:
                        "linear-gradient(to bottom, rgba(74, 144, 226, 0.15) 0%, transparent 100%)",
                }}
            />

            {/* Optional grain overlay to reduce banding */}
            <div
                className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none"
                style={{
                    backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
                }}
            />
        </div>
    );
}
