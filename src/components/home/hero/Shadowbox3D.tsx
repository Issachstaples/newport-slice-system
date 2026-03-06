"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useRef, useState, useEffect, Suspense } from "react";
import * as THREE from "three";

interface PlateProps {
    texturePath: string;
    zDepth: number;
    moveFactorX: number;
    moveFactorY: number;
    emissive?: boolean;
    isAO?: boolean;
    pointerPos: { x: number; y: number };
    renderOrder: number;
    baseScale: number;
    offsetX?: number;
    offsetY?: number;
}

function Plate({ texturePath, zDepth, moveFactorX, moveFactorY, emissive = false, isAO = false, pointerPos, renderOrder, baseScale, offsetX = 0, offsetY = 0 }: PlateProps) {
    const meshRef = useRef<THREE.Mesh>(null);

    // Load texture (must be inside Suspense)
    // Note: drei's useTexture automatically sets colorSpace to sRGB and handles anisotropy
    let texture;
    try {
        texture = useTexture(texturePath);

        // Debug warning for eye texture
        if (texturePath.includes('eye_back') && !texture) {
            console.warn('Eye texture failed to load:', texturePath);
        }
    } catch (error) {
        if (texturePath.includes('eye_back')) {
            console.warn('Eye texture load error:', texturePath, error);
        }
        throw error;
    }

    useFrame((state, delta) => {
        if (!meshRef.current) return;

        // Smooth parallax using THREE.MathUtils.damp (framerate independent)
        // Parallax adds on top of base offset
        const targetX = offsetX + pointerPos.x * moveFactorX;
        const targetY = offsetY + pointerPos.y * moveFactorY;

        meshRef.current.position.x = THREE.MathUtils.damp(
            meshRef.current.position.x,
            targetX,
            4,
            delta
        );
        meshRef.current.position.y = THREE.MathUtils.damp(
            meshRef.current.position.y,
            targetY,
            4,
            delta
        );

        // Emissive pulse on eye and core materials
        if (emissive && meshRef.current.material instanceof THREE.MeshStandardMaterial) {
            const pulse = Math.sin(state.clock.elapsedTime * 0.8) * 0.15 + 0.2;
            meshRef.current.material.emissiveIntensity = pulse;
        }
    });

    // Calculate final scale (AO gets 1.02x multiplier on top of baseScale)
    const finalScale = isAO ? baseScale * 1.02 : baseScale;

    return (
        <mesh ref={meshRef} position={[offsetX, offsetY, zDepth]} renderOrder={renderOrder} scale={[finalScale, finalScale, 1]}>
            <planeGeometry args={[1, 1]} />
            {isAO ? (
                <meshBasicMaterial
                    map={texture}
                    transparent
                    opacity={0.22}
                    color="#000000"
                    depthWrite={false}
                    alphaTest={0.02}
                />
            ) : (
                <meshStandardMaterial
                    map={texture}
                    transparent
                    alphaTest={0.02}
                    depthWrite={false}
                    emissive={emissive ? "#3B82F6" : "#000000"}
                    emissiveIntensity={emissive ? 0.2 : 0}
                />
            )}
        </mesh>
    );
}

function Scene({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
    // Shared pointer position state for all plates
    const [pointerPos, setPointerPos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handlePointerMove = (e: PointerEvent) => {
            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            // Guard against zero dimensions
            if (rect.width === 0 || rect.height === 0) return;

            // Normalize to [-1, 1] relative to container
            const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
            // Clamp to [-0.6, 0.6] to prevent layers drifting too far on large screens
            const clampedX = Math.max(-0.6, Math.min(0.6, x));
            const clampedY = Math.max(-0.6, Math.min(0.6, y));
            setPointerPos({ x: clampedX, y: clampedY });
        };

        window.addEventListener("pointermove", handlePointerMove);
        return () => window.removeEventListener("pointermove", handlePointerMove);
    }, [containerRef]); return (
        <>
            {/* Lighting setup */}
            <ambientLight intensity={0.45} />
            <directionalLight position={[5, 5, 5]} intensity={0.9} />
            <directionalLight position={[-3, -2, -3]} intensity={0.25} />

            {/* Back plate: Eye */}
            <Plate
                texturePath="/images/hero/shadowbox_eye_back_2048.png"
                zDepth={-0.24}
                moveFactorX={0.05}
                moveFactorY={0.03}
                emissive
                pointerPos={pointerPos}
                renderOrder={10}
                baseScale={0.62}
                offsetY={0.14}
            />

            {/* Middle plate: Core */}
            <Plate
                texturePath="/images/hero/shadowbox_core_mid_2048.png"
                zDepth={-0.12}
                moveFactorX={0.09}
                moveFactorY={0.06}
                emissive
                pointerPos={pointerPos}
                renderOrder={20}
                baseScale={1.00}
                offsetY={-0.10}
            />

            {/* AO shim behind wrap (optional depth cue) */}
            <Plate
                texturePath="/images/hero/shadowbox_wrap_front_2048.png"
                zDepth={-0.025}
                moveFactorX={0.12}
                moveFactorY={0.08}
                isAO
                pointerPos={pointerPos}
                renderOrder={30}
                baseScale={1.32}
                offsetY={-0.08}
            />

            {/* Front plate: Wrap */}
            <Plate
                texturePath="/images/hero/shadowbox_wrap_front_2048.png"
                zDepth={0.03}
                moveFactorX={0.12}
                moveFactorY={0.08}
                pointerPos={pointerPos}
                renderOrder={40}
                baseScale={1.28}
                offsetY={-0.08}
            />

            {/* TODO: canvas overlay sparks driven by normalized anchor points + heartbeat timer */}
        </>
    );
}

export default function Shadowbox3D() {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={containerRef} className="absolute inset-0 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 1.15], fov: 48 }}
                gl={{ alpha: true, antialias: true }}
                dpr={[1, 1.5]}
            >
                <Suspense fallback={null}>
                    <Scene containerRef={containerRef} />
                </Suspense>
            </Canvas>
        </div>
    );
}
