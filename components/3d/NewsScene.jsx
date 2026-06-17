"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Torus, Sphere } from "@react-three/drei";

function InnerScene() {
    const groupRef = useRef();

    useFrame((state) => {
        if (!groupRef.current) return;
        const t = state.clock.getElapsedTime();
        groupRef.current.rotation.y = t * 0.5;
        groupRef.current.rotation.x = t * 0.2;
    });

    return (
        <group ref={groupRef} scale={1.2}>
            {/* Core globe broadcasting */}
            <Sphere args={[0.5, 32, 32]}>
                <meshStandardMaterial color="#10b981" emissive="#059669" emissiveIntensity={0.5} wireframe />
            </Sphere>

            {/* Radar / Broadcast rings */}
            {[1.2, 1.8, 2.4].map((radius, i) => (
                <Torus key={i} args={[radius, 0.02, 16, 64]} rotation={[Math.PI / 2, 0, 0]}>
                    <meshStandardMaterial color="#34d399" transparent opacity={0.3 - (i * 0.1)} />
                </Torus>
            ))}
            
            <Torus args={[1.5, 0.04, 16, 64]} rotation={[0, Math.PI / 4, 0]}>
                <meshStandardMaterial color="#059669" transparent opacity={0.6} />
            </Torus>
        </group>
    );
}

export default function NewsScene() {
    return (
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }} style={{ background: "transparent" }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} color="#10b981" intensity={2} />
            <pointLight position={[-10, -10, -10]} color="#059669" intensity={2} />
            <Suspense fallback={null}>
                <InnerScene />
            </Suspense>
        </Canvas>
    );
}
