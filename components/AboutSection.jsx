"use client";

import { useState, useRef, Suspense, useMemo } from "react";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import dynamic from "next/dynamic";

const AboutScene = dynamic(() => import("./3d/AboutScene"), {
    ssr: false,
    loading: () => null
});



// ── 3D Mouse Tilting Card Component ───────────────────────────────
function TiltCard({ children, className }) {
    const cardRef = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth physics springs
    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

    // Map spring positions to rotate coordinates
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left - width / 2;
        const mouseY = e.clientY - rect.top - height / 2;

        x.set(mouseX / width);
        y.set(mouseY / height);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className={`transition-all duration-200 cursor-pointer ${className}`}
        >
            <div style={{ transform: "translateZ(30px)", position: "relative" }} className="h-full w-full relative">
                {children}
            </div>
        </motion.div>
    );
}

export default function AboutSection() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } }
    };

    return (
        <section id="aboutUs" className="relative py-[clamp(1.5rem,4vw,4.5rem)] bg-background transition-colors duration-300 overflow-hidden select-none">
            {/* Ambient background glows */}
            <div className="absolute top-1/4 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-cyan-500/5 blur-[100px] md:blur-[160px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-indigo-600/5 blur-[100px] md:blur-[160px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 relative z-10">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">

                    {/* Left Content Column */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                    >


                        {/* Title */}
                        <motion.h2
                            variants={itemVariants}
                            className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground tracking-tight"
                        >
                            Software Development
                            <span className="block bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                                & Digital Innovation
                            </span>
                            For Modern Businesses
                        </motion.h2>

                        {/* Description */}
                        <motion.p
                            variants={itemVariants}
                            className="mt-4 text-sm md:text-base lg:text-lg text-slate-600 dark:text-gray-400 leading-relaxed"
                        >
                            At RecentureSoft, we create powerful digital experiences through custom software development,
                            cloud solutions, AI integration, and scalable web applications that help businesses accelerate growth.
                        </motion.p>

                        {/* Features checklist */}
                        <motion.div variants={itemVariants} className="mt-6 space-y-3 md:space-y-4">
                            {[
                                "Enterprise Web Applications",
                                "Mobile App Development",
                                "Cloud & DevOps Solutions",
                                "AI & Automation Services",
                            ].map((item) => (
                                <div key={item} className="flex items-start md:items-center gap-3 group">
                                    <CheckCircle size={20} className="text-cyan-400 group-hover:scale-110 transition duration-300 mt-0.5 md:mt-0 flex-shrink-0" />
                                    <span className="text-slate-600 dark:text-gray-300 group-hover:text-slate-900 dark:group-hover:text-cyan-300 transition duration-300 text-sm md:text-base">
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </motion.div>

                        {/* Glassmorphic Stats Grid */}
                        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mt-8">
                            {[
                                { value: "100+", label: "Global Clients" },
                                { value: "50+", label: "Projects Delivered" },
                                { value: "5+", label: "Years Experience" },
                                { value: "98%", label: "Satisfaction Rate" },
                            ].map((s) => (
                                <div
                                    key={s.label}
                                    className="p-5 md:p-6 lg:p-8 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-md hover:border-cyan-400/40 hover:bg-slate-100 dark:hover:bg-cyan-500/5 transition-all duration-300"
                                >
                                    <h3 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                                        {s.value}
                                    </h3>
                                    <p className="text-slate-500 dark:text-gray-400 text-sm mt-1">{s.label}</p>
                                </div>
                            ))}
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div variants={itemVariants} className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-4">
                            <button className="w-full sm:w-auto px-6 md:px-8 py-3.5 md:py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg shadow-cyan-500/20 hover:scale-105 transition duration-300 text-center">
                                Get Started
                            </button>
                            <button className="w-full sm:w-auto px-6 md:px-8 py-3.5 md:py-4 rounded-full border border-slate-300 dark:border-white/10 text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-white/5 hover:border-cyan-400/40 transition duration-300 text-center">
                                Learn More
                            </button>
                        </motion.div>
                    </motion.div>

                    {/* Right Column (3D Interactive Tilt Cards + Three.js Background) */}
                    <div className="relative h-[650px] hidden lg:block perspective-[1500px]">
                        {/* Background 3D Canvas */}
                        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                            <AboutScene />
                        </div>

                        {/* Image Card 1 */}
                        <TiltCard className="absolute top-0 right-0 w-[380px] h-[250px] z-10 rounded-3xl overflow-hidden border border-slate-200 dark:border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                            <Image
                                src="/about/about1.jpg"
                                alt="Innovative digital workspace"
                                fill
                                sizes="(max-width: 768px) 100vw, 400px"
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        </TiltCard>

                        {/* Image Card 2 */}
                        <TiltCard className="absolute top-[180px] left-0 w-[340px] h-[250px] z-20 rounded-3xl overflow-hidden border border-slate-200 dark:border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                            <Image
                                src="/about/about2.jpg"
                                alt="Advanced Cloud infrastructure"
                                fill
                                sizes="(max-width: 768px) 100vw, 400px"
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        </TiltCard>

                        {/* Image Card 3 */}
                        <TiltCard className="absolute bottom-0 right-16 w-[360px] h-[250px] z-10 rounded-3xl overflow-hidden border border-slate-200 dark:border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                            <Image
                                src="/about/about3.jpg"
                                alt="AI and data integrations"
                                fill
                                sizes="(max-width: 768px) 100vw, 400px"
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        </TiltCard>

                        {/* Center Floating Glass Status Badge */}
                        <motion.div
                            animate={{ y: [0, -12, 0] }}
                            transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-xl shadow-2xl rounded-2xl px-6 py-5 z-30 flex flex-col items-center min-w-[150px]"
                        >
                            <span className="w-3.5 h-3.5 bg-green-400 rounded-full animate-ping absolute top-3 right-3" />
                            <span className="w-3.5 h-3.5 bg-green-500 rounded-full absolute top-3 right-3" />
                            <h4 className="text-3xl font-extrabold text-cyan-500 dark:text-cyan-400">
                                50+
                            </h4>
                            <p className="text-slate-500 dark:text-gray-300 text-xs mt-1 uppercase tracking-wider text-center">
                                Successful Projects
                            </p>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}