"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";

function InnerScene() {
    const groupRef = useRef();

    useFrame((state) => {
        if (!groupRef.current) return;
        const t = state.clock.getElapsedTime();
        groupRef.current.rotation.y = t * 0.15;
        groupRef.current.position.y = Math.sin(t * 0.8) * 0.12;
    });

    return (
        <group ref={groupRef} scale={1.5}>
            {/* Center Main Project Board */}
            <RoundedBox args={[1.5, 1, 0.1]} radius={0.05} position={[0, 0, 0]}>
                <meshStandardMaterial
                    color="#0f172a"
                    metalness={0.8}
                    roughness={0.05}
                />
            </RoundedBox>
            <RoundedBox args={[1.4, 0.9, 0.11]} radius={0.04} position={[0, 0, 0]}>
                <meshStandardMaterial color="#3b82f6" wireframe transparent opacity={0.6} />
            </RoundedBox>

            {/* Floating UI Elements / Image cards */}
            {[
                [-1.1, 0.5, 0.2],
                [1.0, 0.4, 0.3],
                [-0.9, -0.6, 0.1],
                [0.9, -0.5, -0.2],
                [0, 0.9, -0.3]
            ].map((pos, i) => (
                <RoundedBox key={i} args={[0.5, 0.4, 0.05]} radius={0.02} position={pos} rotation={[0, (i === 1 ? -0.2 : 0.2), 0]}>
                    <meshStandardMaterial color={i % 2 === 0 ? "#22d3ee" : "#3b82f6"} transparent opacity={0.8} />
                </RoundedBox>
            ))}
        </group>
    );
}

export default function PortfolioScene() {
    return (
        <Canvas camera={{ position: [0, 0, 5], fov: 35 }} style={{ background: "transparent" }}>
            <ambientLight intensity={0.8} />
            <pointLight position={[10, 10, 10]} color="#a855f7" intensity={3} />
            <pointLight position={[-10, -10, -10]} color="#3b82f6" intensity={3} />
            <spotLight
                position={[0, 5, 5]}
                angle={0.4}
                penumbra={1}
                intensity={3}
                color="#22d3ee"
            />
            <Suspense fallback={null}>
                <InnerScene />
            </Suspense>
        </Canvas>
    );
}
