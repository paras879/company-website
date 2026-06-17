"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Cylinder, RoundedBox } from "@react-three/drei";

function InnerScene() {
    const groupRef = useRef();
    const stageRef = useRef();

    useFrame((state) => {
        if (!groupRef.current || !stageRef.current) return;
        const t = state.clock.getElapsedTime();
        groupRef.current.rotation.y = t * 0.1;
        stageRef.current.rotation.y = -t * 0.2;
    });

    return (
        <group ref={groupRef} scale={1.2}>
            {/* The Stage */}
            <Cylinder args={[1.5, 1.2, 0.2, 32]} position={[0, -0.6, 0]}>
                <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
            </Cylinder>
            
            {/* Holographic Calendar / Screen */}
            <group ref={stageRef} position={[0, 0.2, 0]}>
                <RoundedBox args={[1.2, 0.8, 0.05]} radius={0.02} position={[0, 0, 0]} rotation={[0, 0, 0]}>
                    <meshStandardMaterial color="#020617" transparent opacity={0.8} />
                </RoundedBox>
                <RoundedBox args={[1.22, 0.82, 0.06]} radius={0.02} position={[0, 0, 0]} rotation={[0, 0, 0]}>
                    <meshStandardMaterial color="#f59e0b" wireframe transparent opacity={0.5} />
                </RoundedBox>

                {/* Calendar Grid Lines */}
                {[[-0.3, 0], [0, 0], [0.3, 0]].map((pos, i) => (
                    <mesh key={i} position={[pos[0], pos[1], 0.03]}>
                        <planeGeometry args={[0.02, 0.6]} />
                        <meshBasicMaterial color="#f59e0b" transparent opacity={0.4} />
                    </mesh>
                ))}
                {[[-0.15, 0], [0.15, 0]].map((pos, i) => (
                    <mesh key={i} position={[0, pos[0], 0.03]} rotation={[0, 0, Math.PI / 2]}>
                        <planeGeometry args={[0.02, 1.0]} />
                        <meshBasicMaterial color="#f59e0b" transparent opacity={0.4} />
                    </mesh>
                ))}
            </group>
        </group>
    );
}

export default function EventsScene() {
    return (
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }} style={{ background: "transparent" }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} color="#f59e0b" intensity={2} />
            <pointLight position={[-10, -10, -10]} color="#3b82f6" intensity={2} />
            <Suspense fallback={null}>
                <InnerScene />
            </Suspense>
        </Canvas>
    );
}
