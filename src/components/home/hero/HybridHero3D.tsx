"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useRef, useState, useEffect, Suspense } from "react";
import * as THREE from "three";

interface PlaneProps {
    texturePath: string;
    zDepth: number;
    moveFactorX: number;
    moveFactorY: number;
    pointerPos: { x: number; y: number };
    renderOrder: number;
    scale: number;
    scaleY?: number;
    offsetY?: number;
    opacity?: number;
    tint?: string;
    tiltX?: number;
    tiltY?: number;
    isAO?: boolean;
}

function Plane({ texturePath, zDepth, moveFactorX, moveFactorY, pointerPos, renderOrder, scale, scaleY, offsetY = 0, opacity = 1.0, tint = "#ffffff", tiltX = 0, tiltY = 0, isAO = false }: PlaneProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const texture = useTexture(texturePath);

    useFrame((_, delta) => {
        if (!meshRef.current) return;

        // Smooth parallax using THREE.MathUtils.damp (framerate independent)
        const targetX = pointerPos.x * moveFactorX;
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
    });

    return (
        <mesh
            ref={meshRef}
            position={[0, offsetY, zDepth]}
            rotation={[tiltX, tiltY, 0]}
            renderOrder={renderOrder}
            scale={[scale, scaleY ?? scale, 1]}
        >
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
                    color={tint}
                    transparent
                    opacity={isAO ? 0.22 : opacity}
                    alphaTest={0.02}
                    depthWrite={false}
                />
            )}
        </mesh>
    );
}

interface EyeActorProps {
    pointerPos: { x: number; y: number };
    renderOrder: number;
}

function EyeActor({ pointerPos, renderOrder }: EyeActorProps) {
    const groupRef = useRef<THREE.Group>(null);
    const irisRef = useRef<THREE.Mesh>(null);
    const pupilRef = useRef<THREE.Mesh>(null);

    // Base mount position — change these to reposition the eye
    const BASE_X = 0;
    const BASE_Y = 0.90;

    useFrame((state, delta) => {
        if (!groupRef.current) return;

        // Translation locked to base position (translationFactor = 0 → no drift)
        const targetX = BASE_X + pointerPos.x * 0.0;
        const targetY = BASE_Y + pointerPos.y * 0.0;

        groupRef.current.position.x = THREE.MathUtils.damp(
            groupRef.current.position.x,
            targetX,
            6,
            delta
        );
        groupRef.current.position.y = THREE.MathUtils.damp(
            groupRef.current.position.y,
            targetY,
            6,
            delta
        );

        // Eye rotation toward pointer (yaw/pitch for gaze tracking)
        const targetRotationY = pointerPos.x * 0.2;  // Horizontal gaze
        const targetRotationX = -pointerPos.y * 0.15; // Vertical gaze

        groupRef.current.rotation.y = THREE.MathUtils.damp(
            groupRef.current.rotation.y,
            targetRotationY,
            5,
            delta
        );
        groupRef.current.rotation.x = THREE.MathUtils.damp(
            groupRef.current.rotation.x,
            targetRotationX,
            5,
            delta
        );

        // Iris emissive pulse
        if (irisRef.current?.material instanceof THREE.MeshStandardMaterial) {
            const pulse = Math.sin(state.clock.elapsedTime * 0.8) * 0.06 + 0.1;
            irisRef.current.material.emissiveIntensity = pulse;
        }

        // Pupil lag (follows fraction of pointer with extra damping for depth)
        if (pupilRef.current) {
            const pupilTargetX = pointerPos.x * 0.06;
            const pupilTargetY = pointerPos.y * 0.04;

            pupilRef.current.position.x = THREE.MathUtils.damp(
                pupilRef.current.position.x,
                pupilTargetX,
                7,
                delta
            );
            pupilRef.current.position.y = THREE.MathUtils.damp(
                pupilRef.current.position.y,
                pupilTargetY,
                7,
                delta
            );
        }
    });

    return (
        <group ref={groupRef} position={[0, 0.90, -0.3]} scale={[0.115, 0.115, 1]}>
            {/* Outer housing bevel: slightly larger torus, darker, thicker tube */}
            <mesh position={[0, 0, -0.04]} renderOrder={renderOrder}>
                <torusGeometry args={[0.90, 0.14, 20, 80]} />
                <meshStandardMaterial
                    color="#111318"
                    metalness={0.96}
                    roughness={0.12}
                    transparent
                    opacity={0.98}
                    depthWrite={false}
                />
            </mesh>

            {/* Inner housing lip: thinner torus slightly forward — gives two-step barrel depth */}
            <mesh position={[0, 0, 0.02]} renderOrder={renderOrder + 1}>
                <torusGeometry args={[0.82, 0.06, 12, 64]} />
                <meshStandardMaterial
                    color="#2a2e3a"
                    metalness={0.88}
                    roughness={0.25}
                    transparent
                    opacity={0.92}
                    depthWrite={false}
                />
            </mesh>

            {/* Iris: deep blue-black disc with subtle emissive */}
            <mesh ref={irisRef} position={[0, 0, 0.01]} renderOrder={renderOrder + 2}>
                <circleGeometry args={[0.76, 48]} />
                <meshStandardMaterial
                    color="#0d1a30"
                    emissive="#3B82F6"
                    emissiveIntensity={0.1}
                    transparent
                    opacity={0.85}
                    depthWrite={false}
                />
            </mesh>

            {/* Pupil: dark center with subtle parallax/lag */}
            <mesh ref={pupilRef} position={[0, 0, 0.02]} renderOrder={renderOrder + 3}>
                <circleGeometry args={[0.28, 32]} />
                <meshStandardMaterial
                    color="#060810"
                    transparent
                    opacity={0.97}
                    depthWrite={false}
                />
            </mesh>

            {/* Glass lens: slightly larger than iris, sits in front of housing lip */}
            <mesh position={[0, 0, 0.06]} renderOrder={renderOrder + 4}>
                <circleGeometry args={[0.84, 64]} />
                <meshPhysicalMaterial
                    color="#c0d8ff"
                    transmission={0.94}
                    thickness={0.08}
                    roughness={0.04}
                    clearcoat={0.8}
                    clearcoatRoughness={0.08}
                    metalness={0.0}
                    transparent
                    opacity={0.11}
                    depthWrite={false}
                />
            </mesh>

            {/* Primary glint: asymmetric ellipse, upper-left */}
            <mesh position={[-0.22, 0.38, 0.07]} renderOrder={renderOrder + 5} scale={[0.22, 0.08, 1]} rotation={[0, 0, -0.4]}>
                <planeGeometry args={[1, 1]} />
                <meshBasicMaterial
                    color="#e8f4ff"
                    transparent
                    opacity={0.38}
                    depthWrite={false}
                />
            </mesh>

            {/* Secondary glint: smaller, lower-right for asymmetry */}
            <mesh position={[0.42, -0.28, 0.07]} renderOrder={renderOrder + 5} scale={[0.08, 0.05, 1]} rotation={[0, 0, 0.6]}>
                <planeGeometry args={[1, 1]} />
                <meshBasicMaterial
                    color="#ddeeff"
                    transparent
                    opacity={0.22}
                    depthWrite={false}
                />
            </mesh>
        </group>
    );
}

function Scene({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
    // Shared pointer position state
    const [pointerPos, setPointerPos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handlePointerMove = (e: PointerEvent) => {
            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            // Guard against zero dimensions
            if (rect.width === 0 || rect.height === 0) return;

            // Normalize to [-1, 1] relative to container
            const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

            // Clamp to prevent excessive drift
            const clampedX = Math.max(-0.6, Math.min(0.6, x));
            const clampedY = Math.max(-0.6, Math.min(0.6, y));
            setPointerPos({ x: clampedX, y: clampedY });
        };

        window.addEventListener("pointermove", handlePointerMove);
        return () => window.removeEventListener("pointermove", handlePointerMove);
    }, [containerRef]);

    return (
        <>
            {/* Lighting setup */}
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={0.8} />
            <directionalLight position={[-3, -2, -3]} intensity={0.2} />

            {/* Backdrop: large plane behind everything (slight tilt back, no parallax — stable environment) */}
            <Plane
                texturePath="/images/home/neon-eye-clean.png"
                zDepth={-0.5}
                moveFactorX={0}
                moveFactorY={0}
                pointerPos={pointerPos}
                renderOrder={10}
                scale={3.2}
                scaleY={1.9}
                offsetY={-0.09}
                opacity={0.82}
                tint="#c0ccd8"
                tiltX={-0.05}
            />

            {/* Eye actor: simple emissive disc (TODO: replace with actual eye model/texture) */}
            <EyeActor pointerPos={pointerPos} renderOrder={20} />

            {/* AO shim behind cradle (subtle occlusion cue) */}
            <Plane
                texturePath="/images/hero/foreground_wrap_bottom_2048.png"
                zDepth={0.12}
                moveFactorX={0.15}
                moveFactorY={0.1}
                pointerPos={pointerPos}
                renderOrder={15}
                scale={5.6}
                scaleY={2.4}
                offsetY={-1.05}
                isAO
            />

            {/* Foreground cradle: basin rim — wide, pushed down so only top rim shows */}
            <Plane
                texturePath="/images/hero/foreground_wrap_bottom_2048.png"
                zDepth={0.18}
                moveFactorX={0.15}
                moveFactorY={0.1}
                pointerPos={pointerPos}
                renderOrder={30}
                scale={5.0}
                scaleY={2.2}
                offsetY={-1.05}
            />

            {/* TODO: Add postprocessing (bloom, etc.) */}
            {/* TODO: Add sparks/laser overlay effects */}
        </>
    );
}

export default function HybridHero3D() {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={containerRef} className="absolute inset-0 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 1.2], fov: 50 }}
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
