"use client";

import { useRef, useMemo, Suspense, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Stars } from "@react-three/drei";
import * as THREE from "three";

function AnimatedSphere({ color, emissive }) {
    const meshRef = useRef();

    useFrame((s) => {
        if (!meshRef.current) return;
        meshRef.current.rotation.y = s.clock.elapsedTime * 0.18;
        meshRef.current.rotation.z = s.clock.elapsedTime * 0.08;
    });
    return (
        <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
            <Sphere ref={meshRef} args={[1.5, 48, 48]}>
                <MeshDistortMaterial
                    color={color}
                    distort={0.45}
                    speed={2.5}
                    roughness={0}
                    metalness={0.1}
                    emissive={emissive}
                    emissiveIntensity={0.4}
                    transparent
                    opacity={0.82}
                />
            </Sphere>
            <Sphere args={[1.1, 24, 24]}>
                <meshStandardMaterial
                    color={color}
                    emissive={emissive}
                    emissiveIntensity={0.9}
                    transparent
                    opacity={0.18}
                    side={THREE.BackSide}
                />
            </Sphere>
        </Float>
    );
}

function AIProcessor({ color }) {
    const ref = useRef();
    useFrame((s) => {
        if (ref.current) {
            ref.current.rotation.x = s.clock.elapsedTime * 0.8;
            ref.current.rotation.y = s.clock.elapsedTime * 0.5;
        }
    });
    return (
        <group ref={ref} scale={0.9}>
            <mesh>
                <boxGeometry args={[0.3, 0.3, 0.08]} />
                <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} emissive={color} emissiveIntensity={0.5} />
            </mesh>
            <mesh position={[0, 0, 0.05]}>
                <boxGeometry args={[0.18, 0.18, 0.02]} />
                <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1.5} />
            </mesh>
            {[-0.15, 0, 0.15].map((x, i) => (
                <group key={i}>
                    <mesh position={[x, 0.18, 0]}>
                        <boxGeometry args={[0.02, 0.06, 0.02]} />
                        <meshBasicMaterial color={color} />
                    </mesh>
                    <mesh position={[x, -0.18, 0]}>
                        <boxGeometry args={[0.02, 0.06, 0.02]} />
                        <meshBasicMaterial color={color} />
                    </mesh>
                    <mesh position={[0.18, x, 0]}>
                        <boxGeometry args={[0.06, 0.02, 0.02]} />
                        <meshBasicMaterial color={color} />
                    </mesh>
                    <mesh position={[-0.18, x, 0]}>
                        <boxGeometry args={[0.06, 0.02, 0.02]} />
                        <meshBasicMaterial color={color} />
                    </mesh>
                </group>
            ))}
        </group>
    );
}

function CloudDatabase({ color }) {
    const ref = useRef();
    useFrame((s) => {
        if (ref.current) {
            ref.current.rotation.y = s.clock.elapsedTime * 0.6;
        }
    });
    return (
        <group ref={ref} scale={0.75}>
            {[-0.18, 0, 0.18].map((y, idx) => (
                <group key={idx} position={[0, y, 0]}>
                    <mesh>
                        <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
                        <meshStandardMaterial color="#1f2937" metalness={0.8} roughness={0.2} />
                    </mesh>
                    <mesh scale={[1.02, 0.2, 1.02]}>
                        <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
                        <meshBasicMaterial color={color} />
                    </mesh>
                </group>
            ))}
        </group>
    );
}

function NetworkGlobe({ color }) {
    const ref = useRef();
    useFrame((s) => {
        if (ref.current) {
            ref.current.rotation.y = s.clock.elapsedTime * 0.4;
            ref.current.rotation.x = s.clock.elapsedTime * 0.3;
        }
    });
    return (
        <mesh ref={ref}>
            <icosahedronGeometry args={[0.22, 1]} />
            <meshStandardMaterial color={color} wireframe emissive={color} emissiveIntensity={0.8} />
        </mesh>
    );
}

function OrbitRing({ radius, tilt, speed, color, children }) {
    const ref = useRef();
    useFrame((s) => { if (ref.current) ref.current.rotation.z = s.clock.elapsedTime * speed; });
    const points = useMemo(() => {
        const pts = [];
        for (let i = 0; i <= 128; i++) {
            const a = (i / 128) * Math.PI * 2;
            pts.push(new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * radius, 0));
        }
        return pts;
    }, [radius]);
    const geo = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);
    return (
        <group rotation={[tilt, 0, 0]}>
            <line geometry={geo}>
                <lineBasicMaterial color={color} transparent opacity={0.4} />
            </line>
            <group ref={ref}>
                <group position={[radius, 0, 0]}>
                    {children}
                </group>
            </group>
        </group>
    );
}

function FloatingParticles({ color }) {
    const count = 120;
    const ref = useRef();
    const [{ positions, colors }, setData] = useState({ positions: new Float32Array(0), colors: new Float32Array(0) });

    useEffect(() => {
        const pos = new Float32Array(count * 3);
        const col = new Float32Array(count * 3);
        const c = new THREE.Color(color);
        for (let i = 0; i < count; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = 2.8 + Math.random() * 2.8;
            pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            pos[i * 3 + 2] = r * Math.cos(phi);
            col[i * 3] = c.r;
            col[i * 3 + 1] = c.g;
            col[i * 3 + 2] = c.b;
        }
        setData({ positions: pos, colors: col });
    }, [color]);
    useFrame((s) => {
        if (ref.current) {
            ref.current.rotation.y = s.clock.elapsedTime * 0.04;
            ref.current.rotation.x = s.clock.elapsedTime * 0.02;
        }
    });
    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
                <bufferAttribute attach="attributes-color" args={[colors, 3]} />
            </bufferGeometry>
            <pointsMaterial size={0.045} vertexColors transparent opacity={0.85} sizeAttenuation />
        </points>
    );
}

function Scene3D({ accent, emissive }) {
    const lightRef = useRef();
    useFrame((s) => {
        if (lightRef.current) {
            lightRef.current.position.x = Math.sin(s.clock.elapsedTime * 0.5) * 4;
            lightRef.current.position.y = Math.cos(s.clock.elapsedTime * 0.4) * 3;
        }
    });
    return (
        <>
            <ambientLight intensity={0.8} />
            <pointLight ref={lightRef} color={accent} intensity={3} distance={12} />
            <pointLight position={[-4, -3, 2]} color={emissive} intensity={2} distance={10} />
            <directionalLight position={[5, 5, 5]} intensity={0.6} />
            <Stars radius={80} depth={50} count={500} factor={4} saturation={1} fade speed={0.6} />
            <FloatingParticles color={accent} />
            <OrbitRing radius={2.3} tilt={Math.PI / 4} speed={0.35} color={accent}>
                <AIProcessor color={accent} />
            </OrbitRing>
            <OrbitRing radius={2.8} tilt={-Math.PI / 6} speed={-0.25} color={emissive}>
                <CloudDatabase color={accent} />
            </OrbitRing>
            <OrbitRing radius={3.2} tilt={Math.PI / 2.5} speed={0.18} color={accent}>
                <NetworkGlobe color={accent} />
            </OrbitRing>
            <AnimatedSphere color={accent} emissive={emissive} />
        </>
    );
}

export default function HeroScene({ accent, emissive }) {
    return (
        <Canvas
            camera={{ position: [0, 0, 6], fov: 55 }}
            gl={{ antialias: true, alpha: true }}
            style={{ background: "transparent" }}
            dpr={[1, 2]}
        >
            <Suspense fallback={null}>
                <Scene3D accent={accent} emissive={emissive} />
            </Suspense>
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.4}
                maxPolarAngle={Math.PI / 1.6}
                minPolarAngle={Math.PI / 3}
            />
        </Canvas>
    );
}
