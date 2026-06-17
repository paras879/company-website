"use client";

import { useRef, Suspense, useState, useEffect, useMemo } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins safely on client side
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// ── Scalable Vector Graphics for Core Technology Branding ──
const TECH_ICONS = {
    react: (
        <svg className="w-full h-full" viewBox="-11.5 -10.23174 23 20.46348" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="0" cy="0" r="2.05" fill="#06b6d4" />
            <g stroke="#06b6d4" strokeWidth="1" fill="none">
                <ellipse rx="11" ry="4.2" />
                <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                <ellipse rx="11" ry="4.2" transform="rotate(120)" />
            </g>
        </svg>
    ),
    nextjs: (
        <svg className="w-full h-full" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="90" cy="90" r="90" fill="black" stroke="white" strokeWidth="4" />
            <path d="M149.508 154.914L77.0674 62.0003H62.0003V118.001H75.0003V78.0003L138.508 158.914C142.508 157.914 146.508 156.414 149.508 154.914Z" fill="white" />
            <rect x="115" y="62" width="13" height="56" fill="white" />
        </svg>
    ),
    nodejs: (
        <svg className="w-full h-full" viewBox="0 0 256 293" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M128 0L24.5 59.8v119.5L128 239l103.5-59.8V59.8L128 0zm79 164.5l-79 45.6-79-45.6V73.3l79-45.6 79 45.6v91.2z" fill="#22c55e" />
            <path d="M128 58.7l-52 30v60l52 30 52-30v-60l-52-30z" fill="#15803d" />
        </svg>
    ),
    java: (
        <svg className="w-full h-full" viewBox="0 0 256 352" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M96.7 301.8c23.5 12.3 54.3 12.3 77.8 0 8.3-4.4 17-6.2 26-6.2 3.6 0 7.2.4 10.8 1 20 4.1 36.4 19.3 43 38.6 1 3-3.6 5-5.1 2.2-6.5-12-19.3-19.4-33-19.4-4 0-8.1.7-12 2-23.5 8-51 9-75.3 2.5-27-7-51.7-25-63-51.2-1.3-3.1 2.8-5 4.8-1.5 6.2 12.2 14.5 24 26 32z" fill="#e28743" />
            <path d="M228.6 156c-13-14.8-31.5-25.5-52.6-28 6.4-11.2 13-23.8 17.6-37.4 6 5.8 12.5 10 19.5 11 12.7 1.8 24.3-5 30-15.6 2.3-4.3-.8-9-5.1-7.8-16.7 4.7-31.4-4.8-40.4-16.8 1-4.7 1.7-9.5 2.2-14.4.5-4.4-4.5-6.6-7.3-3.2-14.2 17.5-31 43.6-39.7 75.3-25.7-1.3-51.8.8-76 7.6-23 6.4-44.5 18.2-56 40-7.3 13.7-8 30.5-2 44.5 8.7 20 28 32 48.7 39.8 48 18 102 14.5 151.7.5 19.8-5.6 42.5-15 54.8-32.8 11.5-16.7 11.5-42-.8-56.3-.2-.1-.4-.3-.6-.5zm-66.2 34.3c-23.8 8.6-50.5 11-75.2 6.5-14.3-2.6-29-7.8-37.2-20-4.4-6.6-4.4-16.2.7-22 9.6-11 25.8-17.7 39-21.7 22.3-6.6 46.5-9.3 69.5-6.4 1 .1 1.7 1 1.5 2-.4 4.5-1 9-1.8 13.4-.2 1.3 1.2 2.3 2.2 1.5 8.4-6.8 17.4-13.8 27-19.4 6.7 5.6 12 12.8 15.6 20.8-11.3 11-26.6 22-41.3 25.3z" fill="#f89820" />
        </svg>
    ),
    laravel: (
        <svg className="w-full h-full" viewBox="0 0 256 270" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M128 32.7L42.5 82v98.6L128 230l85.5-49.3V82L128 32.7zm0-32.7l128 73.8v147.7L128 270 0 196.5V61.2L128 0z" fill="#ff2d20" />
            <path d="M128 82l53.5 31v61.6L128 205.7l-53.5-31.1V113L128 82z" fill="#b91c1c" />
        </svg>
    ),
    mongodb: (
        <svg className="w-full h-full" viewBox="0 0 128 256" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M64 0C54.4 34.6 32 64.6 32 99.2c0 38.4 22.4 67.2 32 105.6 9.6-38.4 32-67.2 32-105.6C96 64.6 73.6 34.6 64 0z" fill="#13aa52" />
            <path d="M64 32c-6.4 25.6-21.3 48-21.3 73.6 0 28.8 14.9 50.7 21.3 79.5 6.4-28.8 21.3-50.7 21.3-79.5 0-25.6-14.9-48-21.3-73.6z" fill="#118843" />
            <path d="M64 214.4c-6.4 12.8-12.8 25.6-12.8 41.6h25.6c0-16-6.4-28.8-12.8-41.6z" fill="#13aa52" />
        </svg>
    ),
    bootstrap: (
        <svg className="w-full h-full" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="256" height="256" rx="50" fill="#7952b3" />
            <path d="M75 60h55c25 0 38 10 38 28 0 13-9 22-22 25 16 3 26 13 26 29 0 21-16 32-42 32H75V60zm30 24v28h22c10 0 16-4 16-14 0-9-6-14-16-14h-22zm0 52v32h26c11 0 18-5 18-16s-7-16-18-16h-26z" fill="white" />
        </svg>
    ),
    angular: (
        <svg className="w-full h-full" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M128 15l112 40-17 140-95 50-95-50L16 55 128 15z" fill="#dd0031" />
            <path d="M128 15v215l78-41 14-119L128 15z" fill="#c3002f" />
            <path d="M128 52l53 117h-21l-11-28H99l-11 28H67l61-117zm0 29l-21 52h42l-21-52z" fill="white" />
        </svg>
    ),
    typescript: (
        <svg className="w-full h-full" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="256" height="256" fill="#3178c6" rx="40" />
            <path d="M125 180c0 9-4 15-13 18-9 2-21 2-30-2-9-4-13-11-13-22h14c0 6 3 9 7 11 4 1 11 1 15-1 4-1 6-4 6-9v-61h14v76zm52-47c0-6-4-10-12-12l-14-4c-12-3-18-9-18-19s8-16 22-16c13 0 20 5 22 15h-13c-1-5-4-8-9-8s-8 2-8 6 3 5 9 7l15 4c14 4 19 10 19 21s-7 19-23 19c-15 0-23-7-25-18h13c1 6 5 9 11 9s11-3 11-9z" fill="white" />
        </svg>
    ),
    tailwindcss: (
        <svg className="w-full h-full" viewBox="0 0 256 153" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M128 0C90 0 68 19 62 57c15-22 33-28 54-18 12 6 21 15 30 25 15 16 33 34 74 34 38 0 60-19 66-57-15 22-33 28-54 18-12-6-21-15-30-25C187 18 169 0 128 0zM62 57C24 57 2 76 0 114c15-22 33-28 54-18 12 6 21 15 30 25 15 16 33 34 74 34 38 0 60-19 66-57-15 22-33 28-54 18-12-6-21-15-30-25C121 75 103 57 62 57z" fill="#06b6d4" />
        </svg>
    ),
    mysql: (
        <svg className="w-full h-full" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M128 20c-59.6 0-108 30.4-108 68v9c11.5-12.8 29-23.7 49-30.8 17-6 37-9.2 59-9.2s42 3.2 59 9.2c20 7.1 37.5 18 49 30.8v-9c0-37.6-48.4-68-108-68z" fill="#00758f" />
            <path d="M20 97v28c0 37.6 48.4 68 108 68s108-30.4 108-68V97c-11.5 12.8-29 23.7-49 30.8-17 6-37 9.2-59 9.2s-42-3.2-59-9.2c-20-7.1-37.5-18-49-30.8z" fill="#f29111" />
            <path d="M20 153v28c0 37.6 48.4 68 108 68s108-30.4 108-68v-28c-11.5 12.8-29 23.7-49 30.8-17 6-37 9.2-59 9.2s-42-3.2-59-9.2c-20-7.1-37.5-18-49-30.8z" fill="#00758f" />
        </svg>
    ),
    postgresql: (
        <svg className="w-full h-full" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M168 20c-15-5-31-5-46 0-33 11-57 39-62 73-4 28 5 56 23 76l-13 41c-2 5 2 10 7 8l40-20c22 10 47 11 70 3 32-11 54-39 59-73 5-37-14-76-50-93c-9-4-19-6-28-5z" fill="#336791" />
            <path d="M125 78c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9z" fill="#ffffff" />
        </svg>
    ),
    aws: (
        <svg className="w-full h-full" viewBox="0 0 256 154" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M117 80c-4-4-10-6-17-6-13 0-22 9-22 22s9 22 22 22c7 0 13-2 17-6V80zm18 36c0 14-8 23-23 23-10 0-18-4-21-9l-1 8h-15V50h17v29c4-6 11-9 20-9 15 0 23 9 23 23v23zm103-61h18l-30 83h-17l-19-54-19 54h-17l-30-83h18l19 59 21-59h16l21 59 19-59zm-136 67c-1 4-5 7-10 7-7 0-11-5-11-13v-2c0-7 4-12 11-12 5 0 9 3 10 7v13zm42 5c-8 6-18 10-29 10-21 0-34-13-34-33s13-34 34-34c11 0 21 4 29 10v-3c0-14-9-21-25-21-12 0-24 4-33 12l-8-11c12-10 29-16 48-16 28 0 45 13 45 39v57h-16l-1-10z" fill="white" />
            <path d="M22 135c42 16 93 25 147 25 29 0 57-3 85-8 4-1 6-5 2-8l-8-7c-3-2-7-2-10 1-23 5-47 7-71 7-49 0-94-8-132-22-4-2-8 1-9 4l-6 8c-2 3 0 7 2 8zm224-21c-4-2-8 0-9 3-2 5-6 10-10 13-2 2-2 6 1 8l7 7c3 2 7 1 9-2 6-6 10-14 12-22 1-3-2-6-5-7z" fill="#ff9900" />
        </svg>
    ),
    docker: (
        <svg className="w-full h-full" viewBox="0 0 256 220" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M96 79h22v22H96V79zm28 0h22v22h-22V79zm28 0h22v22h-22V79zm28 0h22v22h-22V79zm-84-28h22v22H96V51zm28 0h22v22h-22V51zm28 0h22v22h-22V51zm-56-28h22v22H96V23zm28 0h22v22h-22V23z" fill="#0db7ed" />
            <path d="M251 108c-3-11-13-19-24-19-4 0-8 1-12 3-5-22-24-38-47-38-3 0-5 0-8 1-6-16-21-27-39-27v19c11 0 20 8 23 18l1 5h6c15 0 27 10 30 24l1 6h6c9 0 16 7 17 16l-37 1c-45 0-84 21-109 54-20-4-39-2-56 6v15c18-9 37-11 57-7 2 8 8 16 16 20 22 13 49 19 82 19 82 0 142-49 144-111h-1z" fill="#0db7ed" />
        </svg>
    ),
    git: (
        <svg className="w-full h-full" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M245 117L139 11c-6-6-16-6-22 0L11 117c-6 6-6 16 0 22l106 106c6 6 16 6 22 0l106-106c6-6 6-16 0-22z" fill="#f05032" />
            <path d="M164 126a26 26 0 00-20-25V84a26 26 0 10-16 0v18a26 26 0 107 43l17 17a26 26 0 1012-36z" fill="white" />
        </svg>
    ),
    firebase: (
        <svg className="w-full h-full" viewBox="0 0 256 351" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M43 277l85-161 31-59c2-5-2-10-7-8l-23 9L43 277z" fill="#ffca28" />
            <path d="M128 348l118-65L163 78c-3-5-10-4-11 2L128 348z" fill="#fca112" />
            <path d="M128 348L43 277l88-166 11 2c3 1 5 4 4 7L128 348z" fill="#ff7043" />
        </svg>
    )
};

// ── Clean & Structured 3D Tech Ecosystem Graph Data ──
const NODES_DATA = {
    react: { name: "React", pos: [0.5, 0.4, 0.15], color: "#06b6d4", connections: ["nextjs", "nodejs", "bootstrap", "angular"] },
    nextjs: { name: "Next.js", pos: [-0.4, 0.8, -0.1], color: "#ffffff", connections: ["react", "nodejs", "mongodb"] },
    nodejs: { name: "Node.js", pos: [-0.8, 0.2, 0.25], color: "#22c55e", connections: ["nextjs", "react", "mongodb", "laravel"] },
    mongodb: { name: "MongoDB", pos: [-0.6, -0.6, -0.1], color: "#13aa52", connections: ["nodejs", "nextjs", "laravel", "java"] },
    angular: { name: "Angular", pos: [0.8, 0.0, 0.2], color: "#dd0031", connections: ["react", "bootstrap"] },
    java: { name: "Java", pos: [0.5, -0.7, -0.2], color: "#f89820", connections: ["mongodb", "laravel"] },
    laravel: { name: "Laravel", pos: [-0.1, -0.8, 0.1], color: "#ff2d20", connections: ["mongodb", "nodejs", "java"] },
    bootstrap: { name: "Bootstrap", pos: [0.7, 0.75, -0.2], color: "#7952b3", connections: ["react", "angular"] }
};

// Compile unique lines once to optimize rendering
const UNIQUE_CONNECTIONS = (() => {
    const list = [];
    const keys = Object.keys(NODES_DATA);
    keys.forEach(fromKey => {
        NODES_DATA[fromKey].connections.forEach(toKey => {
            const key = [fromKey, toKey].sort().join("-");
            if (!list.find(c => c.key === key)) {
                list.push({
                    key,
                    from: fromKey,
                    to: toKey,
                    fromPos: NODES_DATA[fromKey].pos,
                    toPos: NODES_DATA[toKey].pos
                });
            }
        });
    });
    return list;
})();

// ── Traveling Data Packets on Active Connections ──
function TravelingParticle({ fromPos, toPos, speed = 1.6, color = "#06b6d4" }) {
    const ref = useRef();
    useFrame((state) => {
        if (!ref.current) return;
        const t = (state.clock.elapsedTime * speed) % 1.0;
        ref.current.position.lerpVectors(
            new THREE.Vector3(...fromPos),
            new THREE.Vector3(...toPos),
            t
        );
    });
    return (
        <mesh ref={ref}>
            <sphereGeometry args={[0.035, 8, 8]} />
            <meshBasicMaterial color={color} toneMapped={false} />
        </mesh>
    );
}

// ── Connection Line between Nodes ──
function ConnectionLine({ fromPos, toPos, isActive, isDimmed }) {
    const points = useMemo(() => [new THREE.Vector3(...fromPos), new THREE.Vector3(...toPos)], [fromPos, toPos]);
    const lineGeo = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);

    return (
        <line geometry={lineGeo}>
            <lineBasicMaterial
                color={isActive ? "#06b6d4" : "#312e81"}
                transparent
                opacity={isActive ? 0.85 : isDimmed ? 0.02 : 0.18}
            />
        </line>
    );
}

// ── Ecosystem WebGL Graphic Scene ──
function EcosystemScene({ activeTech, setActiveTech }) {
    const groupRef = useRef();

    useFrame((state) => {
        if (!groupRef.current) return;
        // Smooth mouse-based parallax panning
        const targetX = state.pointer.x * 0.35;
        const targetY = state.pointer.y * 0.35;

        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.08);
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY, 0.08);
    });

    return (
        <group ref={groupRef}>
            <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.2} floatingRange={[-0.1, 0.1]}>
                {/* Connections vector paths */}
                {UNIQUE_CONNECTIONS.map((line) => {
                    const isActive = activeTech && (line.from === activeTech || line.to === activeTech);
                    const isDimmed = activeTech && !isActive;
                    return (
                        <ConnectionLine
                            key={line.key}
                            fromPos={line.fromPos}
                            toPos={line.toPos}
                            isActive={isActive}
                            isDimmed={isDimmed}
                        />
                    );
                })}

                {/* Pulsing travel packets along active lines */}
                {activeTech && UNIQUE_CONNECTIONS.filter(line => line.from === activeTech || line.to === activeTech).map((line) => (
                    <TravelingParticle
                        key={`p-${line.key}`}
                        fromPos={NODES_DATA[activeTech].pos}
                        toPos={line.from === activeTech ? line.toPos : line.fromPos}
                        color={NODES_DATA[activeTech].color}
                    />
                ))}

                {/* Glassmorphic HTML billboards containing branding icons */}
                {Object.entries(NODES_DATA).map(([key, node]) => {
                    const isHighlighted = activeTech === key;
                    const isConnected = activeTech && (node.connections.includes(activeTech) || NODES_DATA[activeTech].connections.includes(key));
                    const isDimmed = activeTech && !isHighlighted && !isConnected;

                    return (
                        <Html
                            key={key}
                            position={node.pos}
                            center
                            distanceFactor={3.8}
                            className="pointer-events-none"
                        >
                            <div
                                onMouseEnter={() => setActiveTech(key)}
                                onMouseLeave={() => setActiveTech(null)}
                                className={`pointer-events-auto flex items-center gap-2.5 px-3.5 py-2 rounded-full border transition-all duration-500 cursor-pointer shadow-lg backdrop-blur-md select-none
                                    ${isHighlighted
                                        ? "bg-white dark:bg-slate-900/90 border-cyan-500 dark:border-cyan-400 scale-110 shadow-[0_0_25px_rgba(6,182,212,0.45)] z-20"
                                        : isConnected
                                            ? "bg-white/90 dark:bg-slate-900/70 border-indigo-500 dark:border-indigo-400 scale-100 shadow-[0_0_15px_rgba(99,102,241,0.25)] z-10"
                                            : isDimmed
                                                ? "bg-slate-100/50 dark:bg-slate-950/10 border-slate-200 dark:border-white/5 opacity-40 scale-90 z-0"
                                                : "bg-white/60 dark:bg-slate-950/50 border-slate-200 dark:border-white/10 scale-95 hover:border-cyan-500/50 hover:bg-slate-50 dark:hover:bg-slate-900/80 z-10"
                                    }`}
                            >
                                <div className={`w-5 h-5 flex items-center justify-center transition-transform duration-500 ${isHighlighted ? "rotate-12 scale-110" : ""}`}>
                                    {TECH_ICONS[key]}
                                </div>
                                <span className={`text-[10px] font-bold tracking-wide font-sans transition-colors duration-300
                                    ${isHighlighted ? "text-cyan-600 dark:text-cyan-400" : isConnected ? "text-indigo-600 dark:text-indigo-300" : "text-slate-600 dark:text-gray-300"}`}>
                                    {node.name}
                                </span>
                            </div>
                        </Html>
                    );
                })}
            </Float>
        </group>
    );
}

// ── Refined Interactive Tech Cards ──
function TechCard({ tech, activeTech, setActiveTech }) {
    const cardRef = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], ["4deg", "-4deg"]), { stiffness: 120, damping: 20 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], ["-4deg", "4deg"]), { stiffness: 120, damping: 20 });

    const glowX = useSpring(useTransform(x, [-0.5, 0.5], ["0%", "100%"]), { stiffness: 150, damping: 25 });
    const glowY = useSpring(useTransform(y, [-0.5, 0.5], ["0%", "100%"]), { stiffness: 150, damping: 25 });

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        x.set((e.clientX - rect.left - rect.width / 2) / rect.width);
        y.set((e.clientY - rect.top - rect.height / 2) / rect.height);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const isHighlighted = activeTech === tech.id;

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => {
                handleMouseLeave();
                setActiveTech(null);
            }}
            onMouseEnter={() => setActiveTech(tech.id)}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            whileHover={{ y: -6, scale: 1.03 }}
            className={`group relative bg-slate-50/50 dark:bg-white/[0.01] border rounded-2xl p-5 flex flex-col items-center text-center cursor-pointer transition-all duration-500 overflow-hidden
                ${isHighlighted ? "bg-slate-100 dark:bg-white/[0.035] border-cyan-500/40 dark:border-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.15)] dark:shadow-[0_0_20px_rgba(6,182,212,0.08)]" : "border-slate-200 dark:border-white/5"}`}
        >
            {/* Soft background glow */}
            <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"
                style={{
                    background: useTransform(
                        [glowX, glowY],
                        ([gx, gy]) => `radial-gradient(140px circle at ${gx} ${gy}, rgba(6, 182, 212, 0.05), transparent 60%)`
                    )
                }}
            />

            {/* Micro-border tracker */}
            <motion.div
                className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"
                style={{
                    border: "1px solid rgba(6, 182, 212, 0.12)",
                    background: useTransform(
                        [glowX, glowY],
                        ([gx, gy]) => `radial-gradient(85px circle at ${gx} ${gy}, rgba(6, 182, 212, 0.3), transparent 50%)`
                    ),
                    WebkitMaskImage: "linear-gradient(white, white)",
                    maskImage: "linear-gradient(white, white)"
                }}
            />

            {/* Sweep overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.01] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

            <div style={{ transform: "translateZ(20px)" }} className="relative z-10">
                <div className="mb-4 w-12 h-12 flex items-center justify-center text-cyan-500 dark:text-cyan-400 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                    {TECH_ICONS[tech.id]}
                </div>
                <h4 className="text-slate-800 dark:text-gray-200 text-sm font-bold tracking-wide group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors duration-300">
                    {tech.name}
                </h4>
                <p className="text-slate-500 dark:text-gray-500 text-[10px] uppercase tracking-wider mt-1">
                    {tech.cat}
                </p>
            </div>
        </motion.div>
    );
}

// ── Bento Cell Grid Wrapper ──
function BentoCell({ colSpan, rowSpan, className, children }) {
    return (
        <div className={`bento-cell relative ${colSpan} ${rowSpan} bg-slate-50/50 dark:bg-white/[0.01] border border-slate-200 dark:border-white/5 rounded-3xl p-5 md:p-6 lg:p-8 backdrop-blur-xl overflow-hidden flex flex-col justify-between shadow-premium dark:shadow-none transition-colors duration-300 ${className}`}>
            {children}
        </div>
    );
}

export default function TechStack() {
    const sectionRef = useRef(null);
    const [activeTech, setActiveTech] = useState(null);

    const techList = [
        { id: "react", name: "React", cat: "Frontend UI" },
        { id: "nextjs", name: "Next.js", cat: "Fullstack Web" },
        { id: "nodejs", name: "Node.js", cat: "Backend Server" },
        { id: "mongodb", name: "MongoDB", cat: "Database Storage" },
        { id: "angular", name: "Angular", cat: "Frontend UI" },
        { id: "laravel", name: "Laravel", cat: "Backend Server" },
        { id: "java", name: "Java", cat: "Enterprise Application" },
        { id: "bootstrap", name: "Bootstrap", cat: "CSS Grid UI" }
    ];

    const marqueeTechList = [
        { id: "react", name: "React" },
        { id: "nextjs", name: "Next.js" },
        { id: "nodejs", name: "Node.js" },
        { id: "mongodb", name: "MongoDB" },
        { id: "java", name: "Java" },
        { id: "laravel", name: "Laravel" },
        { id: "angular", name: "Angular" },
        { id: "bootstrap", name: "Bootstrap" },
        { id: "typescript", name: "TypeScript" },
        { id: "tailwindcss", name: "Tailwind CSS" },
        { id: "mysql", name: "MySQL" },
        { id: "postgresql", name: "PostgreSQL" },
        { id: "aws", name: "AWS" },
        { id: "docker", name: "Docker" },
        { id: "git", name: "Git" },
        { id: "firebase", name: "Firebase" }
    ];

    // GSAP ScrollTrigger Sequence Entrance
    useEffect(() => {
        if (!sectionRef.current) return;

        const cells = gsap.utils.toArray(".bento-cell");

        gsap.fromTo(cells,
            {
                opacity: 0,
                y: 50,
                scale: 0.97
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.9,
                stagger: 0.12,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    toggleActions: "play none none none"
                }
            }
        );
    }, []);

    return (
        <section ref={sectionRef} className="relative py-[clamp(1.5rem,4vw,4.5rem)] bg-background transition-colors duration-300 overflow-hidden select-none">
            {/* Soft Glowing Accent Spotlights */}
            <div className="absolute top-1/4 right-0 w-[300px] md:w-[450px] h-[300px] md:h-[450px] bg-cyan-400/10 dark:bg-cyan-950/10 blur-[100px] md:blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 left-0 w-[300px] md:w-[450px] h-[300px] md:h-[450px] bg-indigo-400/10 dark:bg-indigo-950/10 blur-[100px] md:blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10">

                {/* Header Section */}
                <div className="text-center mb-8 md:mb-12">
                    <span className="inline-block px-3 py-1 rounded-full bg-cyan-100/50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800/20 text-cyan-600 dark:text-cyan-400 font-semibold text-[10px] tracking-[0.25em] uppercase mb-2">
                        ⚡ Core Ecosystem
                    </span>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-foreground mt-2 tracking-tight leading-[1.15]">
                        What Does Recenturesoft Infotech
                        <span className="block bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 dark:from-cyan-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent mt-1.5">
                            Have To Offer?
                        </span>
                    </h2>
                    <p className="text-slate-600 dark:text-gray-400 mt-3 max-w-2xl mx-auto text-sm md:text-base lg:text-lg leading-relaxed font-light">
                        We leverage a state-of-the-art software stack to transform business visions into highly scalable, robust realities.
                    </p>
                </div>

                {/* Premium Technology Statistics Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-2 mb-8 md:mb-12 border-y border-white/5 py-6 md:py-8 bg-white/[0.005] backdrop-blur-sm px-2 md:px-4 rounded-2xl font-mono">
                    <div className="text-center">
                        <span className="block text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-mono">99.9%</span>
                        <span className="block text-[8px] sm:text-[10px] text-gray-400 uppercase tracking-widest font-semibold mt-1.5">Production Uptime</span>
                    </div>
                    <div className="text-center border-l border-white/5">
                        <span className="block text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 font-mono">&lt;100ms</span>
                        <span className="block text-[8px] sm:text-[10px] text-gray-400 uppercase tracking-widest font-semibold mt-1.5">API Latency</span>
                    </div>
                    <div className="text-center pt-6 md:pt-0 border-t md:border-t-0 md:border-l border-white/5 relative">
                        {/* Fix for mobile grid borders */}
                        <div className="absolute -top-px left-0 right-0 md:hidden h-px bg-white/5" />
                        <span className="block text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 font-mono">10x</span>
                        <span className="block text-[8px] sm:text-[10px] text-gray-400 uppercase tracking-widest font-semibold mt-1.5">Render Speed</span>
                    </div>
                    <div className="text-center pt-6 md:pt-0 border-t md:border-t-0 border-l border-white/5 relative">
                        <div className="absolute -top-px left-0 right-0 md:hidden h-px bg-white/5" />
                        <span className="block text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 font-mono">100%</span>
                        <span className="block text-[8px] sm:text-[10px] text-gray-400 uppercase tracking-widest font-semibold mt-1.5">Cloud Scalable</span>
                    </div>
                </div>

                {/* Cinematic Infinite Technology Marquee Ribbon */}
                <div className="relative w-full overflow-hidden py-6 mb-16 hover-pause mask-grad select-none">
                    {/* Inner blur gradient masks */}
                    <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-background via-background/70 to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-background via-background/70 to-transparent z-10 pointer-events-none" />

                    {/* Doubled listing for seamless looping */}
                    <div className="flex gap-6 w-max animate-infinite-marquee">
                        {[...marqueeTechList, ...marqueeTechList, ...marqueeTechList].map((tech, idx) => {
                            const opacityVal = idx % 2 === 0 ? "opacity-85 hover:opacity-100" : "opacity-100";
                            const scaleVal = idx % 3 === 0 ? 0.95 : 1;

                            return (
                                <motion.div
                                    key={`${tech.id}-${idx}`}
                                    whileHover={{
                                        y: -5,
                                        scale: 1.06,
                                        rotateX: -6,
                                        rotateY: 8,
                                        boxShadow: "0 0 20px rgba(6, 182, 212, 0.15)",
                                        borderColor: "rgba(6, 182, 212, 0.25)",
                                        backgroundColor: "rgba(255, 255, 255, 0.05)"
                                    }}
                                    transition={{ type: "spring", stiffness: 350, damping: 18 }}
                                    style={{
                                        transformStyle: "preserve-3d",
                                        scale: scaleVal
                                    }}
                                    className={`flex items-center gap-3 px-4.5 py-2.5 rounded-full border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/[0.012] backdrop-blur-md transition-all duration-300 shadow-sm dark:shadow-md cursor-pointer whitespace-nowrap ${opacityVal}`}
                                >
                                    <div className="w-5 h-5 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                                        {TECH_ICONS[tech.id]}
                                    </div>
                                    <span className="text-slate-700 dark:text-gray-300 text-xs font-semibold font-sans">
                                        {tech.name}
                                    </span>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-12 gap-6 auto-rows-[auto]">

                    {/* Bento Card 1: Core Value Vision Statement */}
                    <BentoCell colSpan="col-span-12 lg:col-span-7" rowSpan="row-span-1" className="flex flex-col justify-between">
                        <div>
                            <span className="text-cyan-600 dark:text-cyan-400 font-mono text-xs uppercase tracking-widest font-semibold">Vision & Strategy</span>
                            <h3 className="text-slate-900 dark:text-gray-100 text-2xl font-extrabold mt-3 mb-4 tracking-tight">
                                High-Performance Engineering
                            </h3>
                            <p className="text-slate-600 dark:text-gray-400 leading-relaxed text-sm font-light max-w-xl">
                                We employ modular, cross-compatible frameworks and reliable infrastructure strategies to build clean digital products. From highly interactive Single Page Apps to massive database scaling pipelines, our technology parameters align with next-gen speed.
                            </p>
                        </div>
                        <div className="flex gap-6 mt-8 border-t border-slate-200 dark:border-white/5 pt-6 flex-wrap">
                            <div>
                                <span className="text-cyan-400 text-xl font-bold font-mono">01/</span>
                                <span className="text-gray-300 text-xs font-semibold ml-2">Clean Codebase</span>
                            </div>
                            <div>
                                <span className="text-blue-400 text-xl font-bold font-mono">02/</span>
                                <span className="text-gray-300 text-xs font-semibold ml-2">Elastic Auto-scaling</span>
                            </div>
                            <div>
                                <span className="text-purple-400 text-xl font-bold font-mono">03/</span>
                                <span className="text-gray-300 text-xs font-semibold ml-2">Modular APIs</span>
                            </div>
                        </div>
                    </BentoCell>

                    {/* Bento Card 2: Interactive 3D Node Ecosystem (Floating & Mouse Parallax) */}
                    <BentoCell colSpan="col-span-12 lg:col-span-5" rowSpan="row-span-2" className="hidden lg:flex flex-col justify-between relative min-h-[380px] overflow-hidden">
                        <div className="absolute inset-0 z-0 pointer-events-none opacity-90 hidden lg:block">
                            <Canvas camera={{ position: [0, 0, 4.0], fov: 45 }} style={{ background: "transparent" }}>
                                <ambientLight intensity={0.4} />
                                <pointLight position={[5, 5, 5]} intensity={1.5} color="#06b6d4" />
                                <Suspense fallback={null}>
                                    <EcosystemScene activeTech={activeTech} setActiveTech={setActiveTech} />
                                </Suspense>
                            </Canvas>
                        </div>

                        <div className="relative z-10 pointer-events-none md:mb-0 mb-4">
                            <span className="text-blue-400 font-mono text-xs uppercase tracking-widest font-semibold font-bold">Integrated Map</span>
                            <h3 className="text-gray-100 text-xl font-bold mt-2 tracking-tight">
                                Ecosystem Architecture
                            </h3>
                        </div>

                        {/* Mobile Fallback Layout (Vertical Stack) */}
                        <div className="md:hidden flex flex-col gap-2 relative z-10 mb-4 h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                            {Object.entries(NODES_DATA).map(([key, node]) => (
                                <button
                                    key={key}
                                    onClick={() => setActiveTech(key)}
                                    className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${activeTech === key ? 'border-cyan-500/50 bg-cyan-100/50 dark:bg-cyan-900/20' : 'border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02]'}`}
                                >
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white dark:bg-[#020617] border border-slate-200 dark:border-white/10 shrink-0 shadow-sm">
                                        <span className="text-xs font-bold" style={{ color: node.color }}>{node.name.substring(0, 2)}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-slate-800 dark:text-gray-200">{node.name}</span>
                                        <span className="text-[10px] text-slate-500 dark:text-gray-500 truncate">{node.connections.map(c => NODES_DATA[c]?.name).join(", ")}</span>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Telemetry log replacing generic instructions text */}
                        <div className="hidden lg:block relative z-10 text-xs leading-relaxed max-w-xs md:max-w-xs w-full bg-slate-100/90 dark:bg-slate-950/85 p-4 rounded-2xl border border-slate-200 dark:border-white/5 shadow-premium dark:shadow-2xl font-mono mt-auto backdrop-blur-md">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-pulse" />
                                <span className="text-slate-700 dark:text-gray-300 font-bold uppercase tracking-wider text-[10px]">System Telemetry</span>
                            </div>
                            {activeTech ? (
                                <div className="flex flex-col gap-1.5 text-slate-600 dark:text-gray-400">
                                    <div><span className="text-cyan-600 dark:text-cyan-400 font-bold">NODE:</span> {NODES_DATA[activeTech].name}</div>
                                    <div><span className="text-indigo-600 dark:text-indigo-400 font-bold">TYPE:</span> {techList.find(t => t.id === activeTech)?.cat}</div>
                                    <div><span className="text-emerald-600 dark:text-emerald-400 font-bold">LINKS:</span> {NODES_DATA[activeTech].connections.map(c => NODES_DATA[c].name).join(", ")}</div>
                                    <div className="text-[10px] text-slate-500 dark:text-gray-600 mt-1">&gt; TRANSMISSION ACTIVE</div>
                                </div>
                            ) : (
                                <div className="text-slate-500 dark:text-gray-500 text-[10px] leading-relaxed">
                                    &gt; STANDBY: NETWORK ACTIVE<br />
                                    &gt; SELECT NODE TO INSPECT INTEGRATION HOPS
                                </div>
                            )}
                        </div>
                    </BentoCell>

                    {/* Bento Card 3: Interactive Technology Stack Grid */}
                    <BentoCell colSpan="col-span-12 lg:col-span-7" rowSpan="row-span-1" className="flex flex-col justify-between">
                        <div className="mb-6">
                            <span className="text-purple-600 dark:text-purple-400 font-mono text-xs uppercase tracking-widest font-bold">Interactive Deck</span>
                            <h3 className="text-slate-900 dark:text-gray-100 text-xl font-bold mt-2 tracking-tight">
                                Technologies Stack
                            </h3>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4 w-full">
                            {techList.map((tech) => (
                                <TechCard
                                    key={tech.id}
                                    tech={tech}
                                    activeTech={activeTech}
                                    setActiveTech={setActiveTech}
                                />
                            ))}
                        </div>
                    </BentoCell>

                    {/* Bento Card 4: Categorized Technology Stack Groups */}
                    <BentoCell colSpan="col-span-12" rowSpan="row-span-1" className="py-8 flex flex-col gap-6">
                        <div className="flex flex-col mb-2">
                            <span className="text-cyan-600 dark:text-cyan-400 font-mono text-xs uppercase tracking-widest font-semibold">System Segments</span>
                            <h3 className="text-slate-900 dark:text-gray-100 text-xl font-bold mt-1 tracking-tight">
                                Enterprise Stack Segmentation
                            </h3>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4 w-full">
                            <div className="bg-slate-50 dark:bg-white/[0.005] border border-slate-200 dark:border-white/5 rounded-2xl p-5 hover:bg-white dark:hover:bg-white/[0.015] hover:border-cyan-300 dark:hover:border-cyan-500/20 transition-all duration-300 shadow-sm dark:shadow-none">
                                <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-mono uppercase tracking-widest font-semibold">01 / User Interface</span>
                                <h4 className="text-slate-800 dark:text-gray-200 text-sm font-bold mt-1.5 mb-2">Frontend Core</h4>
                                <p className="text-slate-600 dark:text-gray-400 text-xs font-light leading-relaxed">
                                    React and Angular power our responsive web layouts, supported by Bootstrap for solid responsive grid layouts.
                                </p>
                            </div>
                            <div className="bg-slate-50 dark:bg-white/[0.005] border border-slate-200 dark:border-white/5 rounded-2xl p-5 hover:bg-white dark:hover:bg-white/[0.015] hover:border-blue-300 dark:hover:border-blue-500/20 transition-all duration-300 shadow-sm dark:shadow-none">
                                <span className="text-[10px] text-blue-600 dark:text-blue-400 font-mono uppercase tracking-widest font-semibold">02 / Execution Layer</span>
                                <h4 className="text-slate-800 dark:text-gray-200 text-sm font-bold mt-1.5 mb-2">Backend Engine</h4>
                                <p className="text-slate-600 dark:text-gray-400 text-xs font-light leading-relaxed">
                                    Next.js fullstack capabilities, Node.js microservices, Laravel logic, and robust Java business platforms form the runtime.
                                </p>
                            </div>
                            <div className="bg-slate-50 dark:bg-white/[0.005] border border-slate-200 dark:border-white/5 rounded-2xl p-5 hover:bg-white dark:hover:bg-white/[0.015] hover:border-purple-300 dark:hover:border-purple-500/20 transition-all duration-300 shadow-sm dark:shadow-none">
                                <span className="text-[10px] text-purple-600 dark:text-purple-400 font-mono uppercase tracking-widest font-semibold">03 / Persistence</span>
                                <h4 className="text-slate-800 dark:text-gray-200 text-sm font-bold mt-1.5 mb-2">Database Layer</h4>
                                <p className="text-slate-600 dark:text-gray-400 text-xs font-light leading-relaxed">
                                    MongoDB handles flexible JSON document storage, optimized query scaling, and multi-node redundancy.
                                </p>
                            </div>
                            <div className="bg-slate-50 dark:bg-white/[0.005] border border-slate-200 dark:border-white/5 rounded-2xl p-5 hover:bg-white dark:hover:bg-white/[0.015] hover:border-pink-300 dark:hover:border-pink-500/20 transition-all duration-300 shadow-sm dark:shadow-none">
                                <span className="text-[10px] text-pink-600 dark:text-pink-400 font-mono uppercase tracking-widest font-semibold">04 / Operations</span>
                                <h4 className="text-slate-800 dark:text-gray-200 text-sm font-bold mt-1.5 mb-2">Cloud Infrastructure</h4>
                                <p className="text-slate-600 dark:text-gray-400 text-xs font-light leading-relaxed">
                                    Automated CI/CD workflows, containerization, elastic clusters, and CDN edge distribution ensure global availability.
                                </p>
                            </div>
                        </div>
                    </BentoCell>

                </div>

            </div>

            {/* Embedded styles for GPU-accelerated seamless loops and side masks */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .mask-grad {
                    mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
                    -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
                }
                .hover-pause:hover .animate-infinite-marquee {
                    animation-play-state: paused;
                }
                @keyframes infinite-marquee {
                    0% { transform: translate3d(0, 0, 0); }
                    100% { transform: translate3d(-50%, 0, 0); }
                }
                .animate-infinite-marquee {
                    animation: infinite-marquee 35s linear infinite;
                    will-change: transform;
                }
            `}} />
        </section>
    );
}
