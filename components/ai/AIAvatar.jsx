"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";

function Orb({ isThinking }) {
    const sphereRef = useRef();

    useFrame((state) => {
        if (!sphereRef.current) return;
        const t = state.clock.getElapsedTime();
        sphereRef.current.rotation.y = t * (isThinking ? 1 : 0.2);
        sphereRef.current.rotation.z = t * (isThinking ? 0.5 : 0.1);
        // Add subtle breathing effect
        const scale = 1 + Math.sin(t * 2) * 0.05;
        sphereRef.current.scale.set(scale, scale, scale);
    });

    return (
        <group>
            <Sphere ref={sphereRef} args={[1, 64, 64]} scale={1.2}>
                <MeshDistortMaterial 
                    color={isThinking ? "#a855f7" : "#06b6d4"} 
                    emissive={isThinking ? "#9333ea" : "#0891b2"} 
                    emissiveIntensity={isThinking ? 0.8 : 0.4} 
                    attach="material" 
                    distort={isThinking ? 0.6 : 0.3} 
                    speed={isThinking ? 4 : 2} 
                    roughness={0.2}
                    metalness={0.8}
                />
            </Sphere>
            <Sphere args={[1.3, 32, 32]}>
                <meshStandardMaterial color={isThinking ? "#c084fc" : "#22d3ee"} wireframe transparent opacity={0.2} />
            </Sphere>
        </group>
    );
}

export default function AIAvatar({ isThinking = false }) {
    return (
        <div className="w-16 h-16 shrink-0 relative">
            <Canvas camera={{ position: [0, 0, 4] }} style={{ background: "transparent" }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} color="#fff" intensity={2} />
                <Suspense fallback={null}>
                    <Orb isThinking={isThinking} />
                </Suspense>
            </Canvas>
        </div>
    );
}
