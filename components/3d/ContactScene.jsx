"use client";

import { useRef, useMemo, Suspense, useEffect, useState, memo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, QuadraticBezierLine, Torus } from "@react-three/drei";
import * as THREE from "three";

// --- Coordinates & Helper ---
const GLOBE_RADIUS = 1.4;

function latLongToVector3(lat, lon, radius) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);

    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = (radius * Math.sin(phi) * Math.sin(theta));
    const y = (radius * Math.cos(phi));

    return new THREE.Vector3(x, y, z);
}

const LOCATIONS = {
    usa: { lat: 37.0902, lon: -95.7129 },
    canada: { lat: 56.1304, lon: -106.3468 },
    uk: { lat: 51.5074, lon: -0.1278 },
    germany: { lat: 51.1657, lon: 10.4515 },
    france: { lat: 46.2276, lon: 2.2137 },
    uae: { lat: 25.2048, lon: 55.2708 },
    india: { lat: 20.5937, lon: 78.9629 },
    singapore: { lat: 1.3521, lon: 103.8198 },
    australia: { lat: -25.2744, lon: 133.7751 },
    japan: { lat: 36.2048, lon: 138.2529 },
    brazil: { lat: -14.2350, lon: -51.9253 },
    southafrica: { lat: -30.5595, lon: 22.9375 },
};

const ROUTES = [
    { start: 'usa', end: 'uk' },
    { start: 'canada', end: 'uk' },
    { start: 'uk', end: 'germany' },
    { start: 'germany', end: 'france' },
    { start: 'france', end: 'uae' },
    { start: 'uae', end: 'india' },
    { start: 'india', end: 'singapore' },
    { start: 'singapore', end: 'australia' },
    { start: 'singapore', end: 'japan' },
    { start: 'india', end: 'japan' },
    { start: 'usa', end: 'japan' },
    { start: 'usa', end: 'brazil' },
    { start: 'brazil', end: 'uk' },
    { start: 'uae', end: 'southafrica' },
    { start: 'southafrica', end: 'australia' },
];

// Premium enterprise palette requested by user
const ROUTE_COLORS = ["#00E5FF", "#3B82F6", "#8B5CF6", "#14B8A6", "#6366F1", "#A855F7"];

// --- Sub-components ---

// OPTIMIZATION: Memoize static sub-components to prevent unnecessary re-renders
const HubNode = memo(function HubNode({ position }) {
    const pulseRef = useRef();

    useFrame((state, delta) => {
        if (pulseRef.current) {
            pulseRef.current.scale.addScalar(delta * 1.5);
            pulseRef.current.material.opacity -= delta * 1.0;
            if (pulseRef.current.scale.x > 2.5) {
                pulseRef.current.scale.set(1, 1, 1);
                pulseRef.current.material.opacity = 0.6;
            }
        }
    });

    // OPTIMIZATION: Reduced sphere segments from 8x8 to 6x6 to save GPU geometry processing
    return (
        <group position={position}>
            <Sphere args={[0.015, 6, 6]}>
                <meshBasicMaterial color="#c084fc" /> {/* Premium purple core */}
            </Sphere>
            <Sphere ref={pulseRef} args={[0.015, 6, 6]}>
                <meshBasicMaterial color="#22d3ee" transparent opacity={0.6} blending={THREE.AdditiveBlending} depthWrite={false} />
            </Sphere>
        </group>
    );
});

// OPTIMIZATION: Memoized
const NetworkArc = memo(function NetworkArc({ startCoord, endCoord, isMobile, color, index }) {
    const lineRef = useRef();
    const packetRef1 = useRef();
    const packetRef2 = useRef();

    const speed = useMemo(() => 0.22 + ((index || 0) * 0.03) % 0.15, [index]);
    const timeOffset = useMemo(() => ((index || 0) * 1.7) % 10, [index]);

    const { start, end, mid, curve } = useMemo(() => {
        const vStart = latLongToVector3(startCoord.lat, startCoord.lon, GLOBE_RADIUS);
        const vEnd = latLongToVector3(endCoord.lat, endCoord.lon, GLOBE_RADIUS);

        const distance = vStart.distanceTo(vEnd);
        const midPoint = vStart.clone().lerp(vEnd, 0.5);
        midPoint.normalize().multiplyScalar(GLOBE_RADIUS + distance * 0.15);

        const bCurve = new THREE.QuadraticBezierCurve3(vStart, midPoint, vEnd);

        return { start: vStart, end: vEnd, mid: midPoint, curve: bCurve };
    }, [startCoord, endCoord]);

    useFrame((state, delta) => {
        if (lineRef.current) {
            lineRef.current.material.dashOffset -= delta * 0.5;
        }

        if (!isMobile) {
            const time = (state.clock.elapsedTime + timeOffset) * speed;
            if (packetRef1.current) {
                const t1 = time % 1;
                packetRef1.current.position.copy(curve.getPoint(t1));
                const pulse1 = Math.sin(t1 * Math.PI);
                packetRef1.current.scale.setScalar(0.5 + pulse1 * 1.5);
            }
            if (packetRef2.current) {
                const t2 = (time + 0.5) % 1;
                packetRef2.current.position.copy(curve.getPoint(t2));
                const pulse2 = Math.sin(t2 * Math.PI);
                packetRef2.current.scale.setScalar(0.5 + pulse2 * 1.5);
            }
        }
    });

    return (
        <group>
            <QuadraticBezierLine
                start={start}
                end={end}
                mid={mid}
                color={color}
                lineWidth={0.5}
                transparent
                opacity={0.3}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
            <QuadraticBezierLine
                ref={lineRef}
                start={start}
                end={end}
                mid={mid}
                color={color}
                lineWidth={0.8}
                transparent
                opacity={0.6}
                dashed
                dashScale={distance => distance * 2}
                dashSize={0.2}
                dashRatio={0.1}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
            {!isMobile && (
                <group>
                    <Sphere ref={packetRef1} args={[0.008, 6, 6]}>
                        <meshBasicMaterial color={color} blending={THREE.AdditiveBlending} depthWrite={false} />
                    </Sphere>
                    <Sphere ref={packetRef2} args={[0.008, 6, 6]}>
                        <meshBasicMaterial color={color} blending={THREE.AdditiveBlending} depthWrite={false} />
                    </Sphere>
                </group>
            )}
        </group>
    );
});

// OPTIMIZATION: Memoized
const Satellite = memo(function Satellite({ radius, speed, angleOffset, color, axis }) {
    const ref = useRef();

    useFrame((state) => {
        const t = state.clock.elapsedTime * speed + angleOffset;
        ref.current.position.x = Math.cos(t) * radius;
        if (axis === 'z') {
            ref.current.position.z = Math.sin(t) * radius;
            ref.current.position.y = Math.sin(t * 0.5) * 0.2;
        } else {
            ref.current.position.y = Math.sin(t) * radius;
            ref.current.position.z = Math.cos(t * 0.5) * 0.2;
        }
    });

    return (
        <group ref={ref}>
            <Sphere args={[0.015, 6, 6]}>
                <meshBasicMaterial color={color} />
            </Sphere>
        </group>
    );
});

// OPTIMIZATION: Memoized Earth Component
const Earth = memo(function Earth({ isMobile }) {
    const earthRef = useRef();
    const cloudsRef = useRef();

    // OPTIMIZATION (CRITICAL): Removed 5x external heavy textures (saving ~15MB payload).
    // The total network size of this component is now virtually 0 bytes as it relies purely on local shaders.
    // Replaced heavy textures with a sleek, premium futuristic procedural material.

    useFrame((state, delta) => {
        if (earthRef.current) earthRef.current.rotation.y += delta * 0.4;
        if (cloudsRef.current) cloudsRef.current.rotation.y += delta * 0.45;
    });

    // OPTIMIZATION: Reduced sphere segments for Earth from 64x64 (4096 polygons) 
    // to 32x32 (1024 polygons) on desktop and 24x24 on mobile. Huge GPU savings.
    const segments = isMobile ? 24 : 32;

    return (
        <group ref={earthRef}>
            {/* Base Procedural Globe */}
            <Sphere args={[GLOBE_RADIUS, segments, segments]}>
                <meshStandardMaterial
                    color="#030712"
                    roughness={0.7}
                    metalness={0.8}
                    emissive="#0ea5e9"
                    emissiveIntensity={0.05}
                />
            </Sphere>

            {/* Futuristic Tech Wireframe Grid Overlay */}
            <Sphere args={[GLOBE_RADIUS + 0.001, segments, segments]}>
                <meshBasicMaterial
                    color="#0ea5e9"
                    wireframe
                    transparent
                    opacity={0.1}
                    blending={THREE.AdditiveBlending}
                />
            </Sphere>

            {/* Outer Atmosphere Glow (Replaced heavy cloud textures) */}
            <Sphere ref={cloudsRef} args={[GLOBE_RADIUS + 0.005, segments, segments]}>
                <meshBasicMaterial
                    color="#38bdf8"
                    wireframe
                    transparent
                    opacity={0.05}
                    blending={THREE.AdditiveBlending}
                />
            </Sphere>

            {/* Deep Atmosphere Inner Glow */}
            <Sphere args={[GLOBE_RADIUS + 0.02, segments, segments]}>
                <meshBasicMaterial
                    color="#0ea5e9"
                    transparent
                    opacity={0.05}
                    blending={THREE.AdditiveBlending}
                    side={THREE.BackSide}
                    depthWrite={false}
                />
            </Sphere>

            {/* Orbital Rings - OPTIMIZATION: reduced segments from 100 to 48 */}
            <Torus args={[GLOBE_RADIUS + 0.3, 0.001, 8, 48]} rotation={[Math.PI / 2.5, 0.1, 0]}>
                <meshBasicMaterial color="#0ea5e9" transparent opacity={0.1} />
            </Torus>
            <Torus args={[GLOBE_RADIUS + 0.4, 0.001, 8, 48]} rotation={[-Math.PI / 4, -0.2, 0]}>
                <meshBasicMaterial color="#c084fc" transparent opacity={0.05} />
            </Torus>

            {/* Satellites */}
            <Satellite radius={GLOBE_RADIUS + 0.3} speed={0.5} angleOffset={0} color="#22d3ee" axis="z" />
            <Satellite radius={GLOBE_RADIUS + 0.4} speed={0.3} angleOffset={Math.PI} color="#c084fc" axis="y" />
            <Satellite radius={GLOBE_RADIUS + 0.3} speed={0.4} angleOffset={Math.PI / 2} color="#ffffff" axis="z" />

            {/* Render Nodes */}
            {Object.values(LOCATIONS).map((coord, idx) => (
                <HubNode key={`hub-${idx}`} position={latLongToVector3(coord.lat, coord.lon, GLOBE_RADIUS)} />
            ))}

            {/* Render Routes */}
            {ROUTES.map((route, idx) => (
                <NetworkArc
                    key={`route-${idx}`}
                    startCoord={LOCATIONS[route.start]}
                    endCoord={LOCATIONS[route.end]}
                    isMobile={isMobile}
                    color={ROUTE_COLORS[idx % ROUTE_COLORS.length]}
                    index={idx}
                />
            ))}
        </group>
    );
});

function FallbackGlobe() {
    const ref = useRef();
    useFrame((state, delta) => {
        if (ref.current) ref.current.rotation.y += delta * 0.1;
    });
    return (
        <Sphere ref={ref} args={[GLOBE_RADIUS, 24, 24]}>
            <meshBasicMaterial color="#06b6d4" wireframe transparent opacity={0.2} />
        </Sphere>
    );
}

// OPTIMIZATION: Memoized container
const SceneContainer = memo(function SceneContainer({ isMobile }) {
    const groupRef = useRef();

    useFrame((state) => {
        if (!groupRef.current) return;
        const targetX = (state.pointer.y * Math.PI) * 0.025;
        const targetY = (state.pointer.x * Math.PI) * 0.025;
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.05);
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.05);
    });

    const scale = isMobile ? 0.6 : 0.95; // 60% on mobile, 95% on desktop

    return (
        <group ref={groupRef} scale={scale} position={[0, 0, 0]}>
            <Suspense fallback={<FallbackGlobe />}>
                <Earth isMobile={isMobile} />
            </Suspense>
        </group>
    );
});

export default function ContactScene() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // OPTIMIZATION: Dynamic device pixel ratio to maintain high FPS on mobile
    const dpr = isMobile ? [1, 1.5] : [1, 2];

    return (
        <div className="w-full h-[400px] md:h-[550px] relative pointer-events-auto overflow-visible flex items-center justify-center">
            <Canvas
                camera={{ position: [0, 0, 6], fov: 45 }}
                style={{ background: "transparent", pointerEvents: "auto", overflow: "visible" }}
                dpr={dpr}
                gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }} // OPTIMIZATION: Request high performance GPU
            >
                <ambientLight intensity={0.4} color="#ffffff" />
                <directionalLight position={[5, 5, 5]} intensity={2} color="#ffffff" />
                <directionalLight position={[-5, 0, -5]} intensity={1} color="#0ea5e9" />

                <SceneContainer isMobile={isMobile} />
            </Canvas>
        </div>
    );
}
