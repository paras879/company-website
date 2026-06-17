"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Suspense, useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Manrope } from "next/font/google";

const manrope = Manrope({
    subsets: ["latin"],
    display: "swap",
    weight: ["400", "500", "600", "700"],
    preload: false,
});

import SoftwareDevScene from "./3d/SoftwareDevScene";
import WebDevScene from "./3d/WebDevScene";
import MobileAppScene from "./3d/MobileAppScene";
import DigitalMarketingScene from "./3d/DigitalMarketingScene";

const services = [
    {
        category: "Enterprise Engineering",
        title: "Software Development",
        desc: "We engineer scalable, secure, and blazing fast enterprise software solutions that power billion-dollar workflows.",
        tags: ["Architecture", "Cloud Native", "APIs", "Microservices"],
        Scene: SoftwareDevScene,
        colSpan: "lg:col-span-7",
        color: "cyan",
        accent: "from-cyan-500/20 to-blue-500/20"
    },
    {
        category: "Digital Experience",
        title: "Web Platforms",
        desc: "Next-generation web applications built with modern frameworks. Responsive, accessible, and highly optimized.",
        tags: ["React", "Next.js", "Performance", "SSR"],
        Scene: WebDevScene,
        colSpan: "lg:col-span-5",
        color: "blue",
        accent: "from-blue-500/20 to-indigo-500/20"
    },
    {
        category: "Mobile Ecosystem",
        title: "Native & Cross-Platform",
        desc: "Mobile experiences that dominate app stores and drive engagement through flawless native and cross-platform architecture.",
        tags: ["iOS", "Android", "React Native", "Flutter"],
        Scene: MobileAppScene,
        colSpan: "lg:col-span-5",
        color: "purple",
        accent: "from-purple-500/20 to-fuchsia-500/20"
    },
    {
        category: "Growth Intelligence",
        title: "Digital Analytics",
        desc: "Data-driven marketing, analytics dashboards, and growth architecture to scale your enterprise globally.",
        tags: ["Analytics", "Growth", "SEO", "Conversion"],
        Scene: DigitalMarketingScene,
        colSpan: "lg:col-span-7",
        color: "teal",
        accent: "from-teal-500/20 to-emerald-500/20"
    }
];

function ServiceCard({ service, isMobile }) {
    const cardRef = useRef(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // 3D Tilt calculations
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const clientX = e.clientX - rect.left;
        const clientY = e.clientY - rect.top;

        // Spotlight calculation
        mouseX.set(clientX);
        mouseY.set(clientY);

        // Tilt calculation
        const width = rect.width;
        const height = rect.height;
        const mouseXRel = (e.clientX - rect.left) / width - 0.5;
        const mouseYRel = (e.clientY - rect.top) / height - 0.5;
        x.set(mouseXRel);
        y.set(mouseYRel);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const gradientColors = {
        cyan: "rgba(34, 211, 238, 0.2)",
        blue: "rgba(59, 130, 246, 0.2)",
        purple: "rgba(139, 92, 246, 0.2)",
        teal: "rgba(20, 184, 166, 0.2)"
    };

    const backgroundGlow = useMotionTemplate`
        radial-gradient(
            600px circle at ${mouseX}px ${mouseY}px,
            ${gradientColors[service.color]},
            transparent 60%
        )
    `;

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX: isMobile ? 0 : rotateX, rotateY: isMobile ? 0 : rotateY, transformStyle: "preserve-3d" }}
            className={`group relative flex flex-col lg:flex-row justify-between overflow-hidden rounded-[1.5rem] md:rounded-[2rem] bg-slate-50/50 dark:bg-white/[0.015] border border-slate-200 dark:border-white/5 backdrop-blur-2xl p-4 md:p-5 lg:p-8 ${service.colSpan} hover:bg-white dark:hover:bg-white/[0.03] transition-colors duration-500 shadow-premium dark:shadow-2xl`}
        >
            {/* Mouse Spotlight Glow */}
            {!isMobile && (
                <motion.div
                    className="pointer-events-none absolute -inset-px rounded-[1.5rem] md:rounded-[2rem] opacity-0 transition duration-500 group-hover:opacity-100"
                    style={{ background: backgroundGlow }}
                />
            )}

            {/* Moving Gradient Border on Hover */}
            <div className={`pointer-events-none absolute inset-0 rounded-[1.5rem] md:rounded-[2rem] border-[1.5px] border-transparent group-hover:border-slate-300 dark:group-hover:border-white/20 transition-all duration-700 bg-gradient-to-br ${service.accent} opacity-0 group-hover:opacity-20`} />

            {/* Content Left/Top */}
            <div
                className="relative z-10 flex flex-col gap-3 w-full lg:w-1/2 justify-center"
                style={{ transform: isMobile ? "none" : "translateZ(30px)" }}
            >

                <h3 className="text-[1.4rem] md:text-[1.8rem] lg:text-[2rem] font-[600] text-slate-900 dark:text-white tracking-[-0.03em] leading-[1.1]">{service.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-[0.95rem] md:text-base leading-7 font-[400] mt-2">{service.desc}</p>

                <div className="flex flex-wrap gap-2 mt-4">
                    {service.tags.map((tag, idx) => (
                        <span key={idx} className="px-3 py-1.5 rounded-lg bg-white/80 dark:bg-[#020617]/50 border border-slate-200 dark:border-white/10 text-[11px] md:text-xs text-slate-700 dark:text-slate-300 font-[500] tracking-wide">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* 3D Scene Right/Bottom */}
            <div
                className="relative z-0 h-[180px] md:h-[220px] lg:h-[350px] w-full lg:w-1/2 flex items-center justify-center pointer-events-none mt-6 md:mt-0"
                style={{ transform: isMobile ? "none" : "translateZ(50px)" }}
            >
                {/* Fallback glow behind the 3D model */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.accent} blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity duration-700`} />
                <service.Scene isMobile={isMobile} />
            </div>
        </motion.div>
    );
}

export default function EnterpriseServices() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <section className={`${manrope.className} relative w-full py-[clamp(1.5rem,4vw,4.5rem)] bg-background px-4 md:px-8 lg:px-12 border-t border-slate-200 dark:border-white/5 transition-colors duration-300`}>
            <div className="max-w-[1400px] mx-auto flex flex-col gap-[clamp(1.25rem,2.5vw,2rem)]">

                {/* Section Header */}
                <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-[2rem]
md:text-[3rem]
lg:text-[4.5rem]
font-[600]
text-foreground
mb-4
tracking-[-0.04em]
leading-[1.05]"
                    >
                        Enterprise <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500">Solutions</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-[0.95rem]
md:text-base
lg:text-lg
text-slate-600
dark:text-slate-400
font-[400]
leading-7
max-w-2xl"
                    >
                        Scalable architecture built for the modern web. We transform complex problems into elegant, high-performance digital products.
                    </motion.p>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-[clamp(1.25rem,2.5vw,2rem)] auto-rows-fr perspective-1000">
                    {services.map((service, idx) => (
                        <ServiceCard key={idx} service={service} isMobile={isMobile} />
                    ))}
                </div>
            </div>
        </section>
    );
}
