"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useRef, useState, Suspense, useCallback } from "react";
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
const DEBUG_EYE_AXES = false;  // XYZ gizmo on the eye group
const DEBUG_GAZE_HUD = false;  // HTML overlay + NDC dot marker
const DEBUG_EMITTER = false;  // bright crosshair at EMIT_X/Y/Z for tuning
// ─────────────────────────────────────────────────────────────────────────────

// ── Diode emitter world-space position (tune these to align with beam origin) ─
const EMIT_X = 0.04;   // horizontal offset from scene centre
const EMIT_Y = 0.02;   // vertical position (positive = up)
const EMIT_Z = -0.50;   // depth (backdrop is at -0.53; keep slightly in front)
// ─────────────────────────────────────────────────────────────────────────────

interface GazeDebugValues {
    ptrX: number; ptrY: number;
    ndcX: number; ndcY: number;
    dx: number; dy: number;
    rotX: number; rotY: number;       // pre-damp targets
    appliedRotX: number; appliedRotY: number; // post-damp actual
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
    const auraRef = useRef<THREE.Mesh>(null);
    const glint1Ref = useRef<THREE.Mesh>(null);
    const glint2Ref = useRef<THREE.Mesh>(null);

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
        const V_GAIN = 0.16;
        const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
        const deadzone = (v: number, threshold: number) => Math.abs(v) < threshold ? 0 : v;

        const dx = deadzone(clamp(px - eyeNdc.x, -0.5, 0.5), 0.03);
        const dy = deadzone(clamp(py - eyeNdc.y, -0.5, 0.5), 0.03);

        // dy negative = cursor below eye → negative rotX = look down
        const targetRotationY = dx * H_GAIN;
        const targetRotationX = dy * V_GAIN;

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
                appliedRotX: groupRef.current.rotation.x,
                appliedRotY: groupRef.current.rotation.y,
            });
            // Position the NDC dot at the eye's projected screen location
            // NDC [-1,1] maps to world via unproject at z≈0 in front of camera
            if (ndcDotRef.current) {
                const dotWorld = new THREE.Vector3(eyeNdc.x, eyeNdc.y, 0).unproject(state.camera);
                ndcDotRef.current.position.set(dotWorld.x, dotWorld.y, 0.1);
            }
        }

        // Always-on aura: very slow independent pulse, decoupled from proximity
        if (auraRef.current?.material instanceof THREE.MeshBasicMaterial) {
            auraRef.current.material.opacity =
                Math.sin(state.clock.elapsedTime * 0.5) * 0.03 + 0.07;
        }

        // Iris emissive: base pulse + proximity boost (iris brightens as cursor nears)
        if (irisRef.current?.material instanceof THREE.MeshStandardMaterial) {
            const NEAR_DIST = 0.08;   // NDC units — "very close"
            const FAR_DIST = 0.60;   // NDC units — "far away"
            const BASE_EMISSIVE = 0.26;   // calm / resting brightness
            const BOOST_EMISSIVE = 0.50;  // max added brightness at full proximity

            // Raw dist uses pre-deadzone values so centre cursor still triggers
            const rawDx = px - eyeNdc.x;
            const rawDy = py - eyeNdc.y;
            const dist = Math.sqrt(rawDx * rawDx + rawDy * rawDy);

            // Proximity in [0..1]: 1 = very close, 0 = far (smoothstep easing)
            const t = Math.max(0, Math.min(1, (FAR_DIST - dist) / (FAR_DIST - NEAR_DIST)));
            const proximity = t * t * (3 - 2 * t); // smoothstep

            const targetEmissive = BASE_EMISSIVE + proximity * BOOST_EMISSIVE;

            // Slow breathing pulse rides on top of the proximity-boosted level
            const pulse = Math.sin(state.clock.elapsedTime * 0.8) * 0.04;
            irisRef.current.material.emissiveIntensity = targetEmissive + pulse;
        }

        // Pupil translation: tracks cursor in local eye space, clamped inside iris
        if (pupilRef.current) {
            // Iris r=0.76, pupil r=0.28 → max center travel = 0.48 local units
            const PUPIL_GAIN_X = 0.38;
            const PUPIL_GAIN_Y = 0.38;
            const PUPIL_MAX = 0.44; // slightly inside 0.48 edge so pupil never clips
            const pClamp = (v: number) => Math.max(-PUPIL_MAX, Math.min(PUPIL_MAX, v));

            const pupilTargetX = pClamp(dx * PUPIL_GAIN_X);
            const pupilTargetY = pClamp(dy * PUPIL_GAIN_Y);

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

        // Glint parallax: slide glints slightly opposite to gaze so lens reads as glass
        const GLINT_GAIN = 0.12; // local-space units per NDC unit
        if (glint1Ref.current) {
            glint1Ref.current.position.x = THREE.MathUtils.damp(
                glint1Ref.current.position.x, -0.22 + dx * -GLINT_GAIN, 4, delta
            );
            glint1Ref.current.position.y = THREE.MathUtils.damp(
                glint1Ref.current.position.y, 0.38 + dy * -GLINT_GAIN, 4, delta
            );
        }
        if (glint2Ref.current) {
            glint2Ref.current.position.x = THREE.MathUtils.damp(
                glint2Ref.current.position.x, 0.42 + dx * -GLINT_GAIN, 4, delta
            );
            glint2Ref.current.position.y = THREE.MathUtils.damp(
                glint2Ref.current.position.y, -0.28 + dy * -GLINT_GAIN, 4, delta
            );
        }
    });

    return (
        <>
            <group ref={groupRef} position={[0.03, 0.52, -0.3]} scale={[0.09, 0.09, 1]}>
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
                        color="#0a1628"
                        emissive="#1d6eff"
                        emissiveIntensity={0.28}
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
                <mesh ref={glint1Ref} position={[-0.22, 0.38, 0.07]} renderOrder={renderOrder + 5} scale={[0.22, 0.08, 1]} rotation={[0, 0, -0.4]}>
                    <planeGeometry args={[1, 1]} />
                    <meshBasicMaterial
                        color="#e8f4ff"
                        transparent
                        opacity={0.38}
                        depthWrite={false}
                    />
                </mesh>

                {/* Secondary glint: smaller, lower-right for asymmetry */}
                <mesh ref={glint2Ref} position={[0.42, -0.28, 0.07]} renderOrder={renderOrder + 5} scale={[0.08, 0.05, 1]} rotation={[0, 0, 0.6]}>
                    <planeGeometry args={[1, 1]} />
                    <meshBasicMaterial
                        color="#ddeeff"
                        transparent
                        opacity={0.22}
                        depthWrite={false}
                    />
                </mesh>
            </group>

            {/* Always-on energy aura: large soft disc at scene scale, behind the eye group */}
            <mesh ref={auraRef} position={[0.03, 0.52, -0.32]} renderOrder={renderOrder - 2}>
                <circleGeometry args={[0.22, 48]} />
                <meshBasicMaterial
                    color="#3a7fff"
                    transparent
                    opacity={0.07}
                    depthWrite={false}
                />
            </mesh>

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

// ── Shared proximity helper ───────────────────────────────────────────────────
// Returns [0..1]: 1 = cursor very close to eye, 0 = far away.
// Uses SPARK_CX/CY as the eye NDC approximation (same coords used by all VFX).
const PROX_NEAR = 0.08;
const PROX_FAR = 0.60;
function eyeProximity(px: number, py: number): number {
    const dx = px - SPARK_CX;
    const dy = py - SPARK_CY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const t = Math.max(0, Math.min(1, (PROX_FAR - dist) / (PROX_FAR - PROX_NEAR)));
    return t * t * (3 - 2 * t); // smoothstep
}
// ─────────────────────────────────────────────────────────────────────────────

// ── Orbital Sparks ────────────────────────────────────────────────────────────
// 12 tiny particles orbit the eye at scene scale; brightness ties to proximity.
const SPARK_COUNT = 12;
const SPARK_RADIUS = 0.044;   // world units — tight orbit around eye
const SPARK_SPEED = 0.28;    // radians/sec base orbital speed
// Eye mount coords (mirrors BASE_X / BASE_Y in EyeActor)
const SPARK_CX = 0.03;
const SPARK_CY = 0.52;
const SPARK_CZ = -0.29;       // just in front of the eye group

// Stable per-spark phase data generated once at module load (not during render)
const SPARK_PHASES = Array.from({ length: SPARK_COUNT }, (_, i) => ({
    phase: (i / SPARK_COUNT) * Math.PI * 2,
    speedMult: 0.7 + Math.random() * 0.6,
    yTilt: (Math.random() - 0.5) * 0.3, // slight vertical wobble amplitude
    yPhase: Math.random() * Math.PI * 2,
}));

function OrbitalSparks({ renderOrder }: { renderOrder: number }) {
    const meshRefs = useRef<(THREE.Mesh | null)[]>(
        Array.from({ length: SPARK_COUNT }, () => null)
    );

    // Stable per-spark random phase offsets [0..2π] and speed multipliers [0.7..1.3]
    const phases = useRef(SPARK_PHASES);

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        const px = state.pointer.x;
        const py = state.pointer.y;

        // Shared proximity [0..1] — closer = brighter + faster orbit
        const proximity = eyeProximity(px, py);
        const speedBoost = 1 + proximity * 0.5; // orbit up to 50% faster when close

        meshRefs.current.forEach((mesh, i) => {
            if (!mesh) return;
            const p = phases.current[i];
            const angle = p.phase + t * SPARK_SPEED * p.speedMult * speedBoost;
            mesh.position.x = SPARK_CX + Math.cos(angle) * SPARK_RADIUS;
            mesh.position.y = SPARK_CY + Math.sin(angle) * SPARK_RADIUS
                + Math.sin(t * 0.7 + p.yPhase) * p.yTilt * 0.012;
            mesh.position.z = SPARK_CZ;

            if (mesh.material instanceof THREE.MeshBasicMaterial) {
                // Far: 0.12–0.20  |  Near: 0.30–0.38  (±0.04 per-spark flicker)
                mesh.material.opacity = 0.12 + proximity * 0.22
                    + Math.sin(t * 2.1 + p.phase) * 0.04;
            }
        });
    });

    return (
        <>
            {Array.from({ length: SPARK_COUNT }, (_, i) => (
                <mesh
                    key={i}
                    ref={(el) => { meshRefs.current[i] = el; }}
                    renderOrder={renderOrder}
                >
                    <circleGeometry args={[0.004, 6]} />
                    <meshBasicMaterial
                        color="#a8d8ff"
                        transparent
                        opacity={0.18}
                        depthWrite={false}
                    />
                </mesh>
            ))}
        </>
    );
}
// ─────────────────────────────────────────────────────────────────────────────

// ── Ripple Pulse ──────────────────────────────────────────────────────────────
// 2 thin rings expand outward from the eye and fade — staggered 180° apart.
const RIPPLE_MAX_SCALE = 3.2;   // how far the ring expands (world units × base scale)
const RIPPLE_DURATION = 2.6;   // seconds for one full expand-fade cycle

function RipplePulse() {
    const ring1Ref = useRef<THREE.Mesh>(null);
    const ring2Ref = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        const proximity = eyeProximity(state.pointer.x, state.pointer.y);

        // Duration shrinks from 2.6s (far) to 1.8s (close) — faster scan when near
        const duration = RIPPLE_DURATION - proximity * 0.8;
        // Peak opacity lifts from 0.07 (far) to 0.14 (close)
        const peakOpacity = 0.07 + proximity * 0.07;

        [ring1Ref, ring2Ref].forEach((ref, i) => {
            const mesh = ref.current;
            if (!mesh) return;

            const phase = ((t / duration + i * 0.5) % 1);
            const s = 0.5 + phase * RIPPLE_MAX_SCALE;
            const opacity = (1 - phase) * peakOpacity;

            mesh.scale.setScalar(s);
            if (mesh.material instanceof THREE.MeshBasicMaterial) {
                mesh.material.opacity = opacity;
            }
        });
    });

    return (
        <>
            <mesh
                ref={ring1Ref}
                position={[SPARK_CX, SPARK_CY, SPARK_CZ + 0.01]}
                renderOrder={37}
            >
                <ringGeometry args={[0.038, 0.048, 48]} />
                <meshBasicMaterial
                    color="#88ccff"
                    transparent
                    opacity={0.09}
                    depthWrite={false}
                    side={THREE.DoubleSide}
                />
            </mesh>
            <mesh
                ref={ring2Ref}
                position={[SPARK_CX, SPARK_CY, SPARK_CZ + 0.01]}
                renderOrder={37}
            >
                <ringGeometry args={[0.038, 0.048, 48]} />
                <meshBasicMaterial
                    color="#88ccff"
                    transparent
                    opacity={0.09}
                    depthWrite={false}
                    side={THREE.DoubleSide}
                />
            </mesh>
        </>
    );
}
// ─────────────────────────────────────────────────────────────────────────────

// ── Diode Emitter ─────────────────────────────────────────────────────────────
// Invisible anchor at the top of the central glowing diode on the backdrop.
// TODO: laser beam + spark burst originates here
function DiodeEmitter() {
    const coreRef = useRef<THREE.Mesh>(null);
    const haloRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        // Gentle breathing pulse: intensity oscillates between 0.6 and 1.0
        const pulse = Math.sin(t * 1.4) * 0.2 + 0.8;

        if (coreRef.current?.material instanceof THREE.MeshBasicMaterial) {
            coreRef.current.material.opacity = pulse * 0.95;
        }
        if (haloRef.current?.material instanceof THREE.MeshBasicMaterial) {
            haloRef.current.material.opacity = pulse * 0.18;
        }
    });

    // Position: horizontally centered, vertically upper-centre of backdrop image,
    // just in front of backdrop (z=-0.50 vs backdrop z=-0.53).
    return (
        <group position={[EMIT_X, EMIT_Y, EMIT_Z]} renderOrder={20}>
            {/* Soft billboard halo — large transparent disc */}
            <mesh ref={haloRef} renderOrder={20}>
                <circleGeometry args={[0.12, 32]} />
                <meshBasicMaterial
                    color="#7ec8ff"
                    transparent
                    opacity={0.18}
                    depthWrite={false}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Tight emissive core — tiny bright point */}
            <mesh ref={coreRef} renderOrder={21}>
                <circleGeometry args={[0.018, 24]} />
                <meshBasicMaterial
                    color="#cce8ff"
                    transparent
                    opacity={0.95}
                    depthWrite={false}
                />
            </mesh>

            {/* DEBUG crosshair: bright magenta marker to confirm emitter position */}
            {DEBUG_EMITTER && (
                <primitive object={new THREE.AxesHelper(0.05)} renderOrder={99} />
            )}
        </group>
    );
}
// ─────────────────────────────────────────────────────────────────────────────

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
                opacity={1}
                tint="#ffffff"
                tiltX={-0.05}
            />

            {/* Eye actor */}
            <EyeActor renderOrder={40} onDebug={onDebug} />

            {/* Orbital micro-sparks around the eye */}
            <OrbitalSparks renderOrder={38} />

            {/* Energy ripple: expanding rings from the eye */}
            <RipplePulse />

            {/* AO shim behind cradle (subtle occlusion cue) */}
            <Plane
                texturePath="/images/hero/foreground_wrap_bottom_2048.png"
                zDepth={0.12}
                moveFactorX={0.15}
                moveFactorY={0.1}
                renderOrder={15}
                scale={5.6}
                scaleY={2.4}
                offsetY={-1.00}
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
                offsetY={-1.00}
            />

            {/* TODO: Add postprocessing (bloom, etc.) */}
            {/* TODO: Add sparks/laser overlay effects */}

            {/* Beam origin: central diode emitter glow */}
            <DiodeEmitter />
        </>
    );
}

export default function HybridHero3D({ eventSourceEl }: { eventSourceEl?: HTMLElement | null }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [gazeDbg, setGazeDbg] = useState<GazeDebugValues | null>(null);
    const handleDebug = useCallback((v: GazeDebugValues) => setGazeDbg(v), []);

    return (
        <div ref={containerRef} className="absolute inset-0">
            {eventSourceEl && (
                <Canvas
                    camera={{ position: [0, 0, 1.2], fov: 50 }}
                    gl={{ alpha: true, antialias: true }}
                    dpr={[1, 1.5]}
                    eventSource={eventSourceEl}
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
tgt  rotX=${gazeDbg.rotX.toFixed(3)}  rotY=${gazeDbg.rotY.toFixed(3)}
app  rotX=${gazeDbg.appliedRotX.toFixed(3)}  rotY=${gazeDbg.appliedRotY.toFixed(3)}`}
                </div>
            )}
        </div>
    );
}
