"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

function InnerScene() {
    return (
        <mesh rotation={[0.5, 0.5, 0]}>
            <icosahedronGeometry args={[1.5, 2]} />
            <meshStandardMaterial color="#020617" wireframe emissive="#06b6d4" emissiveIntensity={0.2} />
        </mesh>
    );
}

export default function SolutionsScene() {
    return (
        <Canvas camera={{ position: [0, 0, 4] }} style={{ background: "transparent" }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} color="#06b6d4" intensity={2} />
            <pointLight position={[-10, -10, -10]} color="#a855f7" intensity={2} />
            <Suspense fallback={null}>
                <InnerScene />
            </Suspense>
        </Canvas>
    );
}
