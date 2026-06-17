"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, RoundedBox } from "@react-three/drei";

function InnerScene() {
    const groupRef = useRef();
    const floatGroup = useRef();

    useFrame((state) => {
        if (!groupRef.current || !floatGroup.current) return;
        const t = state.clock.getElapsedTime();
        groupRef.current.rotation.y = t * 0.1;
        floatGroup.current.position.y = Math.sin(t * 1.5) * 0.1;
    });

    return (
        <group ref={groupRef} scale={1.2}>
            {/* Main Holographic Document */}
            <group ref={floatGroup}>
                <RoundedBox args={[1.4, 1.8, 0.05]} radius={0.02} position={[0, 0, 0]}>
                    <meshStandardMaterial color="#0f172a" transparent opacity={0.8} />
                </RoundedBox>
                <RoundedBox args={[1.42, 1.82, 0.06]} radius={0.02} position={[0, 0, 0]}>
                    <meshStandardMaterial color="#06b6d4" wireframe transparent opacity={0.5} />
                </RoundedBox>
                
                {/* Text lines on the document */}
                {[0.5, 0.3, 0.1, -0.1, -0.3, -0.5].map((y, i) => (
                    <mesh key={i} position={[-0.4, y, 0.03]} rotation={[0, 0, 0]}>
                        <planeGeometry args={[0.8 + (i % 2 === 0 ? 0 : 0.2), 0.05]} />
                        <meshBasicMaterial color={i === 0 ? "#06b6d4" : "#475569"} />
                    </mesh>
                ))}
            </group>

            {/* Floating geometric typographic elements */}
            <Text position={[-0.8, 0.5, 0.5]} rotation={[0, 0.5, 0]} fontSize={0.4} color="#3b82f6">
                A
            </Text>
            <Text position={[0.8, -0.5, 0.3]} rotation={[0, -0.2, 0.2]} fontSize={0.5} color="#a855f7">
                Z
            </Text>
        </group>
    );
}

export default function BlogScene() {
    return (
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }} style={{ background: "transparent" }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} color="#3b82f6" intensity={2} />
            <pointLight position={[-10, -10, -10]} color="#06b6d4" intensity={2} />
            <Suspense fallback={null}>
                <InnerScene />
            </Suspense>
        </Canvas>
    );
}
