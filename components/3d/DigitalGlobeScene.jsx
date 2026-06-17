"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Pre-calculate positions on a sphere for abstract node networking
function getSpherePositions(count, radius) {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const phi = Math.acos(-1 + (2 * i) / count);
        const theta = Math.sqrt(count * Math.PI) * phi;
        positions[i * 3] = radius * Math.cos(theta) * Math.sin(phi);
        positions[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
        positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    return positions;
}

// Pre-calculate connections between close nodes
function getConnectionLines(positions, maxDistance) {
    const lines = [];
    const count = positions.length / 3;
    for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
            const dx = positions[i * 3] - positions[j * 3];
            const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
            const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
            const distSq = dx * dx + dy * dy + dz * dz;
            if (distSq < maxDistance * maxDistance) {
                lines.push(
                    positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
                    positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
                );
            }
        }
    }
    return new Float32Array(lines);
}

function AbstractNetwork() {
    const groupRef = useRef();

    // Abstract network configuration
    const count = 300;
    const radius = 2.5;
    const maxConnectionDistance = 0.6;

    // Generate static geometry once
    const { positions, linePositions } = useMemo(() => {
        const pos = getSpherePositions(count, radius);
        const lines = getConnectionLines(pos, maxConnectionDistance);
        return { positions: pos, linePositions: lines };
    }, []);

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.15;
            groupRef.current.rotation.x += delta * 0.05;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Glowing Nodes */}
            <points>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
                </bufferGeometry>
                <pointsMaterial size={0.05} color="#22d3ee" transparent opacity={0.8} blending={THREE.AdditiveBlending} depthWrite={false} />
            </points>

            {/* Network Connections */}
            <lineSegments>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" count={linePositions.length / 3} array={linePositions} itemSize={3} />
                </bufferGeometry>
                <lineBasicMaterial color="#3b82f6" transparent opacity={0.15} blending={THREE.AdditiveBlending} depthWrite={false} />
            </lineSegments>

            {/* Core Glow Sphere */}
            <mesh>
                <sphereGeometry args={[radius * 0.98, 32, 32]} />
                <meshBasicMaterial color="#020617" transparent opacity={0.9} depthWrite={false} />
            </mesh>
            <mesh>
                <sphereGeometry args={[radius * 0.95, 32, 32]} />
                <meshBasicMaterial color="#1e1b4b" transparent opacity={0.3} blending={THREE.AdditiveBlending} depthWrite={false} />
            </mesh>
        </group>
    );
}

function SceneContainer({ isMobile }) {
    const groupRef = useRef();

    useFrame((state) => {
        if (!isMobile && groupRef.current) {
            // Subtle mouse parallax
            const targetX = (state.pointer.x * Math.PI) / 10;
            const targetY = (state.pointer.y * Math.PI) / 10;
            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.05);
            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetY, 0.05);
        }
    });

    const scale = isMobile ? 0.6 : 0.95;

    return (
        <group ref={groupRef} scale={scale}>
            <AbstractNetwork />
        </group>
    );
}

export default function DigitalGlobeScene() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="w-full h-[250px] md:h-[350px] lg:h-[450px] max-w-[500px] relative pointer-events-auto overflow-hidden flex items-center justify-center">
            <Canvas
                camera={{ position: [0, 0, 7], fov: 45 }}
                style={{ background: "transparent", pointerEvents: "auto" }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
            >
                <ambientLight intensity={0.5} />
                <SceneContainer isMobile={isMobile} />
            </Canvas>
        </div>
    );
}
