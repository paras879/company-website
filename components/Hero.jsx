"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("./3d/HeroScene"), {
    ssr: false,
    loading: () => null
});

/* ═══════════════════════════════════════════
   SLIDE DATA  –  add your own images here
═══════════════════════════════════════════ */
const SLIDES = [
    {
        id: 0,
        bg: "/hero_bg_1.webp",
        accent: "#0ea5e9",
        accentGrad: "from-cyan-500 via-blue-500 to-indigo-500",
        glowColor: "bg-cyan-500/20",
        badge: "⭐ Trusted by 100+ Global Clients",
        badgeBorder: "border-cyan-400/30",
        badgeText: "text-cyan-600 dark:text-cyan-300",
        heading1: "Transforming",
        headingAccent: "Digital Experiences",
        heading2: "For Modern Enterprises",
        desc: "Empowering businesses through innovative web development, cloud solutions, AI integration, and digital transformation services that drive measurable growth.",
        cta: "Start Your Project",
        cta2: "Explore Services",
    },
    {
        id: 1,
        bg: "/hero_bg_2.webp",
        accent: "#a855f7",
        accentGrad: "from-purple-500 via-pink-500 to-indigo-500",
        glowColor: "bg-purple-500/20",
        badge: "🤖 Next-Gen AI Solutions",
        badgeBorder: "border-purple-400/30",
        badgeText: "text-purple-600 dark:text-purple-300",
        heading1: "Powering Business",
        headingAccent: "With Artificial",
        heading2: "Intelligence",
        desc: "Harness the full potential of AI — from intelligent automation and predictive analytics to generative models that reinvent how you serve customers.",
        cta: "Explore AI Services",
        cta2: "View Case Studies",
    },
    {
        id: 2,
        bg: "/hero_bg_3.webp",
        accent: "#10b981",
        accentGrad: "from-emerald-500 via-teal-500 to-cyan-500",
        glowColor: "bg-emerald-500/20",
        badge: "☁️ Cloud-First Architecture",
        badgeBorder: "border-emerald-400/30",
        badgeText: "text-emerald-600 dark:text-emerald-300",
        heading1: "Scale Infinitely",
        headingAccent: "With Cloud",
        heading2: "Infrastructure",
        desc: "Build resilient, scalable cloud architectures on AWS, Azure, and GCP. DevOps pipelines, Kubernetes orchestration, and 24/7 infrastructure monitoring.",
        cta: "Get Cloud Consultation",
        cta2: "Our Stack",
    },
];

const STATS = [
    { value: "100+", label: "Global Clients" },
    { value: "5+", label: "Years Experience" },
    { value: "98%", label: "Satisfaction Rate" },
];

const SERVICES = ["Web Development", "Mobile Apps", "Cloud Solutions", "AI Integration", "UI/UX Design"];

/* ═══════════════════════════════════════════
   3-D SCENE LOADED DYNAMICALLY
═══════════════════════════════════════════ */

/* ═══════════════════════════════════════════
   ANIMATION VARIANTS
═══════════════════════════════════════════ */
const slideIn = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom) => ({
        opacity: 1,
        y: 0,
        transition: { delay: custom * 0.1 + 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }),
    exit: { opacity: 0, y: -20, transition: { duration: 0.5 } }
};

const bgVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.5 } },
    exit: { opacity: 0, transition: { duration: 1 } }
};

/* ═══════════════════════════════════════════
   HERO COMPONENT
   ═══════════════════════════════════════════ */
export default function Hero() {
    const [current, setCurrent] = useState(0);
    const [progress, setProgress] = useState(0);
    const heroRef = useRef(null);
    const INTERVAL = 3000;

    // ── Scroll parallax ──────────────────────
    const { scrollY } = useScroll();
    const contentY = 0;
    const bgScale = useTransform(scrollY, [0, 600], [1, 1.12]);
    const bgOpacity = useTransform(scrollY, [0, 500], [1, 0.3]);
    const sphereY = useTransform(scrollY, [0, 600], [0, 80]);

    // ── Auto-slide timer ─────────────────────
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setProgress(0);
        const step = 50;
        const inc = (step / INTERVAL) * 100;
        const timer = setInterval(() => {
            setProgress((p) => {
                if (p + inc >= 100) {
                    setCurrent((c) => (c + 1) % SLIDES.length);
                    return 0;
                }
                return p + inc;
            });
        }, step);
        return () => clearInterval(timer);
    }, [current]);

    const slide = SLIDES[current];

    return (
        <section ref={heroRef} className="relative min-h-screen overflow-hidden bg-background transition-colors duration-300">

            {/* ── Background image slideshow ── */}
            <motion.div style={{ scale: bgScale, opacity: bgOpacity }} className="absolute inset-0 z-0 bg-black">
                {SLIDES.map((s, index) => (
                    <div
                        key={s.id + "-bg"}
                        className="absolute inset-0 transition-opacity duration-[1500ms] ease-in-out"
                        style={{ opacity: current === index ? 1 : 0, zIndex: current === index ? 10 : 0 }}
                    >
                        <Image
                            src={s.bg}
                            alt={`Hero ${index}`}
                            fill
                            priority={true}
                            sizes="100vw"
                            className="object-cover"
                        />
                        {/* Darken overlay */}
                        <div className="absolute inset-0 bg-white/70 dark:bg-[#030712]/75 md:dark:bg-[#030712]/65" />
                        {/* Gradient from left so text is legible */}
                        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 md:via-white/80 dark:from-[#030712] dark:via-[#030712]/90 md:dark:via-[#030712]/80 via-60% md:via-40% to-transparent" />
                        {/* Bottom fade */}
                        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-background to-transparent" />
                    </div>
                ))}
            </motion.div>

            {/* ── Ambient glow blob (accent coloured) ── */}
            <AnimatePresence mode="sync">
                <motion.div
                    key={slide.id + "-glow"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className={`absolute top-[-10%] right-[-10%] w-[250px] md:w-[600px] h-[250px] md:h-[600px] ${slide.glowColor} blur-[120px] md:blur-[160px] rounded-full pointer-events-none z-[-1] opacity-30 md:opacity-100`}
                />
            </AnimatePresence>
            <div className="absolute bottom-[-5%] left-[-5%] w-[180px] md:w-[400px] h-[180px] md:h-[400px] bg-blue-500/20 dark:bg-blue-900/20 blur-[120px] md:blur-[140px] rounded-full pointer-events-none z-[-1] opacity-20 md:opacity-100" />

            {/* ── 3-D Canvas ── */}
            <motion.div
                style={{ y: sphereY }}
                className="hidden md:block absolute inset-x-0 bottom-[-10%] top-auto h-[350px] sm:h-[400px] lg:bottom-auto lg:top-0 lg:inset-0 lg:left-[45%] lg:h-full z-[-1] pointer-events-none opacity-40 sm:opacity-50 lg:opacity-100"
            >
                <HeroScene accent={slide.accent} emissive="#3b82f6" />
            </motion.div>

            {/* ── Text content (scroll parallax) ── */}
            <motion.div
                style={{ y: contentY }}
                className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 flex flex-col min-h-[100svh] pt-32 pb-12 sm:pt-36 sm:pb-16 md:pt-40 md:pb-16 lg:pt-48 lg:pb-20"
            >
                <div className="w-full max-w-[92%] lg:w-[55%] flex flex-col flex-1 mt-0">
                    <AnimatePresence mode="wait">
                        <motion.div key={slide.id + "-content"}>

                            {/* Heading */}
                            <motion.h1
                                variants={slideIn} initial="hidden" animate="visible" exit="exit" custom={1}
                                className="text-[2.2rem] sm:text-[2.8rem] md:text-[4rem] lg:text-[5rem] font-[500] tracking-[-0.05em] leading-[0.9] text-foreground"
                            >
                                {slide.heading1}
                                <span className={`block bg-gradient-to-r ${slide.accentGrad} bg-clip-text text-transparent font-[500]`}>
                                    {slide.headingAccent}
                                </span>
                                {slide.heading2}
                            </motion.h1>

                            {/* Description */}
                            <motion.p
                                variants={slideIn} initial="hidden" animate="visible" exit="exit" custom={2}
                                className="mt-6 text-[15px] md:text-[18px] text-slate-600 dark:text-slate-400 max-w-xl leading-8 font-[400]"
                            >
                                {slide.desc}
                            </motion.p>

                            {/* CTA buttons */}
                            <motion.div
                                variants={slideIn} initial="hidden" animate="visible" exit="exit" custom={3}
                                className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto"
                            >
                                <button
                                    className="group relative px-6 md:px-8 py-3.5 md:py-4 rounded-full font-[600] text-white shadow-lg md:hover:scale-105 active:scale-[0.98] transition-all duration-300 overflow-hidden w-full sm:w-auto text-center"
                                    style={{
                                        background: `linear-gradient(135deg, ${slide.accent}, #6366f1)`,
                                        boxShadow: `0 8px 32px ${slide.accent}40`,
                                    }}
                                >
                                    <span className="relative z-10">{slide.cta}</span>
                                </button>
                                <button className="px-6 md:px-8 py-3.5 md:py-4 rounded-full border border-slate-300 dark:border-white/15 text-slate-800 dark:text-white font-[500] md:hover:bg-slate-100 dark:md:hover:bg-white/10 md:hover:border-slate-400 dark:md:hover:border-white/30 active:scale-[0.98] backdrop-blur-sm transition-all duration-300 w-full sm:w-auto text-center">
                                    {slide.cta2}
                                </button>
                            </motion.div>

                            {/* Service tags */}
                            <motion.div
                                variants={slideIn} initial="hidden" animate="visible" exit="exit" custom={4}
                                className="mt-6 flex flex-wrap gap-3 max-w-md md:gap-3"
                            >
                                {SERVICES.map((item, i) => (
                                    <motion.span
                                        key={item}
                                        initial={{ opacity: 0, scale: 0.85 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.7 + i * 0.08 }}
                                        whileHover={{ scale: 1.08 }}
                                        className="px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-gray-300 text-[12px] sm:text-[13px] md:text-sm font-[500] cursor-pointer backdrop-blur-sm transition-all duration-300"
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.borderColor = slide.accent + "90";
                                            e.currentTarget.style.color = slide.accent;
                                            e.currentTarget.style.background = slide.accent + "15";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.borderColor = "";
                                            e.currentTarget.style.color = "";
                                            e.currentTarget.style.background = "";
                                        }}
                                    >
                                        {item}
                                    </motion.span>
                                ))}
                            </motion.div>

                        </motion.div>
                    </AnimatePresence>

                    {/* Stats – always visible */}
                    <div className="mt-auto pt-16 pb-4 grid grid-cols-2 gap-y-6 gap-x-4 sm:flex sm:flex-wrap sm:gap-8 md:gap-10">
                        {STATS.map((s) => (
                            <div key={s.label} className="flex flex-col">
                                <span
                                    className="text-[2rem] md:text-4xl lg:text-5xl font-[600] tracking-[-0.03em]"
                                    style={{ color: slide.accent }}
                                >
                                    {s.value}
                                </span>
                                <span className="text-[11px] md:text-xs text-slate-500 mt-2 uppercase tracking-[0.15em] font-[400]">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>



            {/* ── Scroll indicator ── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="absolute bottom-10 right-10 z-20 hidden lg:flex flex-col items-center gap-2"
            >
                <span className="text-slate-500 dark:text-gray-500 text-xs tracking-[0.2em] uppercase -rotate-90 mb-4">Scroll</span>
                <div className="w-px h-12 bg-gradient-to-b from-slate-400 dark:from-white/30 to-transparent animate-pulse" />
            </motion.div>

        </section>
    );
}