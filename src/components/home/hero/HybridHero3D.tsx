"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useRef, useState, useEffect, Suspense, useCallback } from "react";
import * as THREE from "three";

interface PlaneProps {
    texturePath: string;
    zDepth: number;
    moveFactorX: number;
    moveFactorY: number;
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

function Plane({ texturePath, zDepth, moveFactorX, moveFactorY, renderOrder, scale, scaleY, offsetY = 0, opacity = 1.0, tint = "#ffffff", tiltX = 0, tiltY = 0, isAO = false }: PlaneProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const texture = useTexture(texturePath);

    useFrame((state, delta) => {
        if (!meshRef.current) return;

        // Read pointer directly from R3F state — always current, no prop staleness
        const px = state.pointer.x;
        const py = state.pointer.y;

        const targetX = px * moveFactorX;
        const targetY = offsetY + py * moveFactorY;

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

// ── DEBUG ─────────────────────────────────────────────────────────────────────
const DEBUG_EYE_AXES = true;   // XYZ gizmo on the eye group
const DEBUG_GAZE_HUD = true;   // HTML overlay + NDC dot marker
// ─────────────────────────────────────────────────────────────────────────────

interface GazeDebugValues {
    ptrX: number; ptrY: number;
    ndcX: number; ndcY: number;
    dx: number; dy: number;
    rotX: number; rotY: number;
}

interface EyeActorProps {
    renderOrder: number;
    onDebug?: (v: GazeDebugValues) => void;
}

function EyeActor({ renderOrder, onDebug }: EyeActorProps) {
    const groupRef = useRef<THREE.Group>(null);
    const irisRef = useRef<THREE.Mesh>(null);
    const pupilRef = useRef<THREE.Mesh>(null);
    const ndcDotRef = useRef<THREE.Mesh>(null);

    // Base mount position — change these to reposition the eye
    const BASE_X = 0.03;
    const BASE_Y = 0.52;

    useFrame((state, delta) => {
        if (!groupRef.current) return;

        // Read pointer directly from R3F state — always current, no prop staleness
        const px = state.pointer.x;
        const py = state.pointer.y;

        // Translation locked to base position (translationFactor = 0 → no drift)
        const targetX = BASE_X;
        const targetY = BASE_Y;

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

        // Gaze relative to the eye's own NDC position — eliminates dead zone
        // Project the eye's world position into NDC so dx/dy are centered on the eye
        const eyeWorld = new THREE.Vector3();
        groupRef.current.getWorldPosition(eyeWorld);
        const eyeNdc = eyeWorld.clone().project(state.camera);

        // pointerPos is already [-1,1] in container NDC space
        const H_GAIN = 0.18;
        const V_GAIN = 0.13;
        const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
        const deadzone = (v: number, threshold: number) => Math.abs(v) < threshold ? 0 : v;

        const dx = deadzone(clamp(px - eyeNdc.x, -0.5, 0.5), 0.03);
        const dy = deadzone(clamp(py - eyeNdc.y, -0.5, 0.5), 0.03);

        // targetRotationX sign: dy > 0 means cursor above eye → look up (negative X rotation)
        const targetRotationY = dx * H_GAIN;
        const targetRotationX = -dy * V_GAIN;

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

        // DEBUG: push live values to HUD + move NDC dot marker
        if (DEBUG_GAZE_HUD) {
            onDebug?.({
                ptrX: px, ptrY: py,
                ndcX: eyeNdc.x, ndcY: eyeNdc.y,
                dx, dy,
                rotX: targetRotationX, rotY: targetRotationY,
            });
            // Position the NDC dot at the eye's projected screen location
            // NDC [-1,1] maps to world via unproject at z≈0 in front of camera
            if (ndcDotRef.current) {
                const dotWorld = new THREE.Vector3(eyeNdc.x, eyeNdc.y, 0).unproject(state.camera);
                ndcDotRef.current.position.set(dotWorld.x, dotWorld.y, 0.1);
            }
        }

        // Iris emissive pulse
        if (irisRef.current?.material instanceof THREE.MeshStandardMaterial) {
            const pulse = Math.sin(state.clock.elapsedTime * 0.8) * 0.06 + 0.1;
            irisRef.current.material.emissiveIntensity = pulse;
        }

        // Pupil lag (follows fraction of gaze delta with extra damping for depth)
        if (pupilRef.current) {
            const pupilTargetX = dx * 0.06;
            const pupilTargetY = dy * 0.04;

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
        <>
            <group ref={groupRef} position={[0.03, 0.52, -0.3]} scale={[0.10, 0.10, 1]}>
                {/* DEBUG axes: red=X right, green=Y up, blue=Z forward — remove when done */}
                {DEBUG_EYE_AXES && <primitive object={new THREE.AxesHelper(8)} />}

                {/* Glow halo: soft emissive disc behind the housing */}
                <mesh position={[0, 0, -0.08]} renderOrder={renderOrder - 1}>
                    <circleGeometry args={[1.6, 48]} />
                    <meshBasicMaterial
                        color="#1e3a6e"
                        transparent
                        opacity={0.18}
                        depthWrite={false}
                    />
                </mesh>

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

            {/* DEBUG NDC dot: world-space marker placed at the eye's projected screen position.
            Visible as a bright cyan dot — should sit exactly on the eye center. */}
            {
                DEBUG_GAZE_HUD && (
                    <mesh ref={ndcDotRef} renderOrder={99}>
                        <circleGeometry args={[0.012, 16]} />
                        <meshBasicMaterial color="#00ffff" depthWrite={false} />
                    </mesh>
                )
            }
        </>
    );
}

function Scene({ onDebug }: {
    onDebug?: (v: GazeDebugValues) => void;
}) {
    return (
        <>
            {/* Lighting setup */}
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={0.8} />
            <directionalLight position={[-3, -2, -3]} intensity={0.2} />

            {/* Backdrop: large plane behind everything (slight tilt back, no parallax — stable environment) */}
            <Plane
                texturePath="/images/home/neon-eye-clean.png"
                zDepth={-0.53}
                moveFactorX={0}
                moveFactorY={0}
                renderOrder={10}
                scale={3.2}
                scaleY={1.9}
                offsetY={-0.09}
                opacity={0.82}
                tint="#c0ccd8"
                tiltX={-0.05}
            />

            {/* Eye actor */}
            <EyeActor renderOrder={40} onDebug={onDebug} />

            {/* AO shim behind cradle (subtle occlusion cue) */}
            <Plane
                texturePath="/images/hero/foreground_wrap_bottom_2048.png"
                zDepth={0.12}
                moveFactorX={0.15}
                moveFactorY={0.1}
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

export default function HybridHero3D({ eventSourceEl }: { eventSourceEl?: HTMLElement | null }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [gazeDbg, setGazeDbg] = useState<GazeDebugValues | null>(null);
    const handleDebug = useCallback((v: GazeDebugValues) => setGazeDbg(v), []);

    // Gate Canvas rendering until eventSourceEl is available (passed from parent after its mount)
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);

    return (
        <div ref={containerRef} className="absolute inset-0">
            {mounted && (
                <Canvas
                    camera={{ position: [0, 0, 1.2], fov: 50 }}
                    gl={{ alpha: true, antialias: true }}
                    dpr={[1, 1.5]}
                    eventSource={eventSourceEl ?? undefined}
                    eventPrefix="client"
                    style={{ pointerEvents: "none" }}
                >
                    <Suspense fallback={null}>
                        <Scene onDebug={DEBUG_GAZE_HUD ? handleDebug : undefined} />
                    </Suspense>
                </Canvas>
            )}

            {/* DEBUG HUD — remove before ship */}
            {DEBUG_GAZE_HUD && gazeDbg && (
                <div style={{
                    position: "absolute", top: 8, left: 8,
                    background: "rgba(0,0,0,0.75)", color: "#0ff",
                    fontFamily: "monospace", fontSize: 11, lineHeight: 1.6,
                    padding: "6px 10px", borderRadius: 4, pointerEvents: "none",
                    whiteSpace: "pre", zIndex: 9999,
                }}>
                    {`ptr  x=${gazeDbg.ptrX.toFixed(3)}  y=${gazeDbg.ptrY.toFixed(3)}
ndc  x=${gazeDbg.ndcX.toFixed(3)}  y=${gazeDbg.ndcY.toFixed(3)}
dx=${gazeDbg.dx.toFixed(3)}  dy=${gazeDbg.dy.toFixed(3)}
rotX=${gazeDbg.rotX.toFixed(3)}  rotY=${gazeDbg.rotY.toFixed(3)}`}
                </div>
            )}
        </div>
    );
}
