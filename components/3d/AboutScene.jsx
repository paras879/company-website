"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, TorusKnot } from "@react-three/drei";

function AbstractCore() {
    const meshRef = useRef();

    useFrame((state) => {
        if (!meshRef.current) return;
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.25;
        meshRef.current.rotation.x = state.clock.elapsedTime * 0.12;
    });

    return (
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
            <TorusKnot ref={meshRef} args={[1.2, 0.4, 150, 20, 2, 3]}>
                <meshStandardMaterial
                    color="#06b6d4"
                    emissive="#4f46e5"
                    emissiveIntensity={0.8}
                    wireframe
                    roughness={0.1}
                    metalness={0.9}
                />
            </TorusKnot>
        </Float>
    );
}

export default function AboutScene() {
    return (
        <Canvas camera={{ position: [0, 0, 5], fov: 55 }}>
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#00e5ff" />
            <pointLight position={[-10, -10, -10]} intensity={1.0} color="#6366f1" />
            <Suspense fallback={null}>
                <AbstractCore />
            </Suspense>
        </Canvas>
    );
}
