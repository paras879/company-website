"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function SoftwareDevScene({ isMobile }) {
    return (
        <div className="w-full h-full min-h-[220px] md:min-h-[320px] flex items-center justify-center relative overflow-hidden p-2 group">
            {/* Soft background glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-indigo-500/5 to-purple-500/10 rounded-2xl opacity-75 blur-xl group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Futuristic Glassmorphic Frame containing the premium 3D render */}
            <motion.div
                initial={{ opacity: 0, scale: 0.92, rotateY: 0, rotateX: 0 }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    rotateY: [0, 8, -8, 0],
                    rotateX: [0, 4, -4, 0]
                }}
                transition={{
                    opacity: { duration: 0.6 },
                    scale: { duration: 0.6 },
                    rotateY: { duration: 10, repeat: Infinity, ease: "easeInOut" },
                    rotateX: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                }}
                whileHover={{ scale: 1.04, rotateY: 0, rotateX: 0 }}
                className="relative w-full h-[220px] md:h-[280px] rounded-2xl border border-white/20 dark:border-white/10 overflow-hidden bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl shadow-2xl flex items-center justify-center [perspective:1000px] [transform-style:preserve-3d]"
            >
                <Image
                    src="/software-dev.webp"
                    alt="Software Development Enterprise Illustration"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                    className="object-cover opacity-90 dark:opacity-85 mix-blend-normal group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Modern light leak gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10 pointer-events-none" />
            </motion.div>
        </div>
    );
}
