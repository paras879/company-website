"use client";

import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { motion, useMotionValue, useSpring, useTransform, useInView, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════════════
   COLOR TOKENS
   ═══════════════════════════════════════════════════════ */
const C = {
    primary: "#06E6FF",
    secondary: "#3B82F6",
    accent: "#8B5CF6",
    navy: "#050816",
    gradient: "linear-gradient(135deg, #06E6FF, #3B82F6, #8B5CF6)",
};

/* ═══════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════ */
const contactCards = [
    {
        id: "email",
        title: "Email Us",
        value: "info@recenturesoft.com",
        icon: (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
        ),
        color: C.primary,
        delay: 0,
    },
    {
        id: "whatsapp",
        title: "WhatsApp Only",
        value: "+91 777 000 3288",
        icon: (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
            </svg>
        ),
        color: C.secondary,
        delay: 0.2,
    },
    {
        id: "address",
        title: "Headquarters",
        value: "A-125, 1st Floor, Sector-63, Noida",
        icon: (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
        ),
        color: C.accent,
        delay: 0.4,
    },
    {
        id: "meeting",
        title: "Video Call",
        value: "Schedule a Meeting",
        icon: (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
            </svg>
        ),
        color: C.primary,
        delay: 0.6,
    },
];

/* ═══════════════════════════════════════════════════════
   PARALLAX BACKGROUND
   ═══════════════════════════════════════════════════════ */
function ContactBackground({ mouseX, mouseY }) {
    const [particles, setParticles] = useState([]);
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setParticles(
            Array.from({ length: 15 }, (_, i) => ({
                id: i,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: Math.random() * 3 + 1,
                height: Math.random() * 3 + 1,
                background: i % 2 === 0 ? C.primary : C.accent,
                boxShadow: `0 0 10px ${i % 2 === 0 ? C.primary : C.accent}`,
                duration: Math.random() * 10 + 10,
                delay: Math.random() * 5,
            }))
        );
    }, []);

    // Parallax transforms based on global mouse position
    const bgX1 = useTransform(mouseX, [-0.5, 0.5], ["-5%", "5%"]);
    const bgY1 = useTransform(mouseY, [-0.5, 0.5], ["-5%", "5%"]);
    const bgX2 = useTransform(mouseX, [-0.5, 0.5], ["5%", "-5%"]);
    const bgY2 = useTransform(mouseY, [-0.5, 0.5], ["5%", "-5%"]);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden bg-background">
            {/* Subtle Noise Texture overlay */}
            <div
                className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />

            {/* Aurora glows with Parallax */}
            <motion.div
                className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full opacity-[0.05]"
                style={{ background: `radial-gradient(circle, ${C.primary}, transparent 70%)`, filter: "blur(100px)", x: bgX1, y: bgY1 }}
            />
            <motion.div
                className="absolute bottom-[-10%] left-[-5%] w-[800px] h-[800px] rounded-full opacity-[0.04]"
                style={{ background: `radial-gradient(circle, ${C.accent}, transparent 70%)`, filter: "blur(100px)", x: bgX2, y: bgY2 }}
            />

            {/* Animated Grid */}
            <motion.div
                className="absolute inset-0 opacity-[0.03] mix-blend-screen"
                style={{
                    backgroundImage: `linear-gradient(${C.primary}10 1px, transparent 1px), linear-gradient(90deg, ${C.primary}10 1px, transparent 1px)`,
                    backgroundSize: "40px 40px",
                    transform: "perspective(1000px) rotateX(60deg) translateY(-100px) translateZ(-200px)",
                    x: useTransform(mouseX, [-0.5, 0.5], ["-20px", "20px"]),
                    y: useTransform(mouseY, [-0.5, 0.5], ["-20px", "20px"])
                }}
            />

            {/* Smooth Floating Particles */}
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full"
                    style={{
                        left: p.left,
                        top: p.top,
                        width: p.width,
                        height: p.height,
                        background: p.background,
                        boxShadow: p.boxShadow,
                    }}
                    animate={{ y: [0, -40, 0], opacity: [0.1, 0.6, 0.1] }}
                    transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
                />
            ))}

            {/* Animated Light Streaks */}
            <motion.div
                className="absolute top-1/4 left-0 w-full h-[1px] opacity-10"
                style={{ background: `linear-gradient(90deg, transparent, ${C.primary}, transparent)` }}
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
                className="absolute bottom-1/4 right-0 w-full h-[1px] opacity-10"
                style={{ background: `linear-gradient(270deg, transparent, ${C.accent}, transparent)` }}
                animate={{ x: ["100%", "-100%"] }}
                transition={{ duration: 11, repeat: Infinity, ease: "linear" }}
            />
        </div>
    );
}

/* ═══════════════════════════════════════════════════════
   PREMIUM CONTACT CARDS
   ═══════════════════════════════════════════════════════ */
function ContactCard({ card, index, globalMouseX, globalMouseY }) {
    const ref = useRef(null);
    const [hovered, setHovered] = useState(false);

    // Local mouse tracking for 3D tilt
    const localX = useMotionValue(0);
    const localY = useMotionValue(0);
    const sx = useSpring(localX, { stiffness: 150, damping: 30 });
    const sy = useSpring(localY, { stiffness: 150, damping: 30 });
    const rotateX = useTransform(sy, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(sx, [-0.5, 0.5], ["-7deg", "7deg"]);

    // Global parallax translation
    const px = useTransform(globalMouseX, [-0.5, 0.5], [index % 2 === 0 ? "-10px" : "10px", index % 2 === 0 ? "10px" : "-10px"]);
    const py = useTransform(globalMouseY, [-0.5, 0.5], ["-10px", "10px"]);

    const handleMouse = useCallback((e) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        localX.set((e.clientX - r.left - r.width / 2) / r.width);
        localY.set((e.clientY - r.top - r.height / 2) / r.height);
    }, [localX, localY]);

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => { localX.set(0); localY.set(0); setHovered(false); }}
            className="relative rounded-2xl cursor-pointer will-change-transform"
            style={{ rotateX, rotateY, x: px, y: py, transformStyle: "preserve-3d" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1, duration: 0.6, type: "spring", stiffness: 80 }}
            whileHover={{ scale: 1.03, z: 20 }}
            whileTap={{ scale: 0.98 }}
        >
            {/* Infinite float wrapper */}
            <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4 + index, repeat: Infinity, ease: "easeInOut", delay: card.delay }}
                className="relative p-5 rounded-2xl overflow-hidden h-full flex flex-col justify-center bg-slate-50/50 dark:bg-transparent backdrop-blur-md"
                style={{
                    background: `linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))`,
                    border: `1px solid ${hovered ? `${card.color}50` : "rgba(150,150,150,0.15)"}`,
                    boxShadow: hovered ? `0 20px 40px -10px rgba(0,0,0,0.15)` : `0 10px 30px -10px rgba(0,0,0,0.05)`,
                    transition: "border-color 0.4s ease, box-shadow 0.4s ease",
                }}
            >
                <div className="flex items-center gap-4 relative z-10">
                    <motion.div
                        className="w-11 h-11 rounded-full flex items-center justify-center transition-colors duration-400"
                        style={{
                            background: hovered ? `${card.color}25` : "rgba(255,255,255,0.05)",
                            color: hovered ? card.color : "#9ca3af",
                            boxShadow: hovered ? `0 0 20px ${card.color}40` : "none"
                        }}
                        animate={hovered ? { rotate: [0, -10, 10, 0] } : {}}
                        transition={{ duration: 0.5 }}
                    >
                        {card.icon}
                    </motion.div>
                    <div>
                        <p className="text-[11px] font-semibold text-slate-500 dark:text-gray-500 uppercase tracking-[0.1em] mb-0.5">{card.title}</p>
                        <p className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-[card.color] transition-colors">{card.value}</p>
                    </div>
                </div>

                {/* Ambient inner glow */}
                <motion.div
                    className="absolute inset-0 pointer-events-none rounded-2xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hovered ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                    style={{ background: `radial-gradient(circle at 50% 50%, ${card.color}15 0%, transparent 70%)` }}
                />
            </motion.div>
        </motion.div>
    );
}

/* ═══════════════════════════════════════════════════════
   PREMIUM FORM & MAGNETIC BUTTON
   ═══════════════════════════════════════════════════════ */
function MagneticButton({ children, onClick, disabled }) {
    const ref = useRef(null);
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const sx = useSpring(mx, { stiffness: 150, damping: 15 });
    const sy = useSpring(my, { stiffness: 150, damping: 15 });

    const handleMouse = (e) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        mx.set((e.clientX - r.left - r.width / 2) * 0.3);
        my.set((e.clientY - r.top - r.height / 2) * 0.3);
    };

    return (
        <motion.button
            ref={ref}
            type="submit"
            disabled={disabled}
            onClick={onClick}
            onMouseMove={handleMouse}
            onMouseLeave={() => { mx.set(0); my.set(0); }}
            style={{ x: sx, y: sy }}
            className="relative w-full overflow-hidden rounded-xl py-4 font-bold text-sm tracking-wide flex items-center justify-center gap-3 cursor-pointer group will-change-transform disabled:opacity-80"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
        >
            <div className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-90" style={{ background: C.gradient }} />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ boxShadow: `0 0 30px ${C.primary}60` }} />

            {/* Shine Sweep */}
            <motion.div
                className="absolute top-0 bottom-0 w-[50px] bg-white opacity-20 skew-x-12"
                initial={{ left: "-100%" }}
                animate={{ left: "200%" }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", repeatDelay: 3 }}
            />
            {children}
        </motion.button>
    );
}

function PremiumForm({ globalMouseX, globalMouseY }) {
    const formRef = useRef(null);
    const [hovered, setHovered] = useState(false);
    const [focusedInput, setFocusedInput] = useState(null);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const localX = useMotionValue(0);
    const localY = useMotionValue(0);
    const sx = useSpring(localX, { stiffness: 100, damping: 30 });
    const sy = useSpring(localY, { stiffness: 100, damping: 30 });
    const rotateX = useTransform(sy, [-0.5, 0.5], ["3deg", "-3deg"]);
    const rotateY = useTransform(sx, [-0.5, 0.5], ["-3deg", "3deg"]);

    // Form container global parallax
    const px = useTransform(globalMouseX, [-0.5, 0.5], ["-15px", "15px"]);
    const py = useTransform(globalMouseY, [-0.5, 0.5], ["-15px", "15px"]);

    const handleMouse = useCallback((e) => {
        if (!formRef.current) return;
        const r = formRef.current.getBoundingClientRect();
        localX.set((e.clientX - r.left - r.width / 2) / r.width);
        localY.set((e.clientY - r.top - r.height / 2) / r.height);
    }, [localX, localY]);

    const inputs = [
        { id: "name", label: "Full Name", type: "text", widthClass: "w-full" },
        { id: "email", label: "Email Address", type: "email", widthClass: "w-full sm:w-[calc(50%-10px)]" },
        { id: "company", label: "Company", type: "text", widthClass: "w-full sm:w-[calc(50%-10px)]" },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 3000);
        }, 1500);
    };

    return (
        <motion.div
            ref={formRef}
            onMouseMove={handleMouse}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => { localX.set(0); localY.set(0); setHovered(false); }}
            style={{ rotateX, rotateY, x: px, y: py, transformStyle: "preserve-3d" }}
            className="relative rounded-[28px] overflow-hidden will-change-transform"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
        >
            <div
                className="relative p-6 sm:p-10 rounded-[28px] overflow-hidden bg-slate-50/80 dark:bg-[#050816]/80 backdrop-blur-3xl border border-slate-200 dark:border-white/[0.08]"
                style={{
                    boxShadow: hovered ? `0 40px 80px -20px rgba(0,0,0,0.1), inset 0 0 0 1px ${C.primary}10` : `0 20px 50px -10px rgba(0,0,0,0.05)`,
                    transition: "all 0.5s ease",
                }}
            >
                {/* Spotlight glow behind form */}
                <motion.div
                    className="absolute inset-0 pointer-events-none rounded-[28px]"
                    style={{
                        background: useTransform(() => `radial-gradient(circle at ${(localX.get() + 0.5) * 100}% ${(localY.get() + 0.5) * 100}%, ${C.primary}15, transparent 60%)`),
                        opacity: hovered ? 1 : 0.4,
                        transition: "opacity 0.4s ease",
                    }}
                />

                <AnimatePresence mode="wait">
                    {submitted ? (
                        <motion.div
                            key="success"
                            className="relative z-10 flex flex-col items-center justify-center h-[400px] text-center"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                        >
                            <motion.div
                                className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                                style={{ background: `${C.primary}20`, border: `1px solid ${C.primary}40`, boxShadow: `0 0 30px ${C.primary}40` }}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            >
                                <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <motion.path
                                        d="M20 6L9 17l-5-5"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ duration: 0.6, delay: 0.2 }}
                                    />
                                </svg>
                            </motion.div>
                            <h3 className="text-2xl font-bold text-foreground mb-2">Request Received</h3>
                            <p className="text-slate-500 dark:text-gray-400 text-sm">Our elite team will contact you shortly.</p>
                        </motion.div>
                    ) : (
                        <form key="form" onSubmit={handleSubmit} className="relative z-10 flex flex-wrap gap-4 sm:gap-5">
                            {inputs.map((input, i) => (
                                <motion.div
                                    key={input.id}
                                    className={`flex flex-col relative ${input.widthClass}`}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 + i * 0.1, type: "spring", stiffness: 100 }}
                                >
                                    <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-[0.1em] mb-2 ml-1 transition-colors" style={{ color: focusedInput === input.id ? C.primary : "#9ca3af" }}>
                                        {input.label}
                                    </label>
                                    <div className="relative group/input">
                                        {/* Animated tracing border */}
                                        <div className="absolute -inset-[1px] rounded-xl opacity-0 transition-opacity duration-300" style={{ background: C.gradient, opacity: focusedInput === input.id ? 1 : 0, filter: "blur(4px)" }} />

                                        <input
                                            type={input.type}
                                            required
                                            onFocus={() => setFocusedInput(input.id)}
                                            onBlur={() => setFocusedInput(null)}
                                            className="w-full relative z-10 bg-white/80 dark:bg-[#0A1225]/80 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 sm:py-3.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-600 focus:outline-none focus:bg-white dark:focus:bg-[#0A1225]/95 transition-all duration-300"
                                            placeholder={`Enter ${input.label.toLowerCase()}`}
                                        />
                                    </div>
                                </motion.div>
                            ))}

                            <motion.div
                                className="w-full flex flex-col relative mt-2"
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
                            >
                                <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-[0.1em] mb-2 ml-1 transition-colors" style={{ color: focusedInput === "message" ? C.primary : "#9ca3af" }}>
                                    Project Scope
                                </label>
                                <div className="relative group/input">
                                    <div className="absolute -inset-[1px] rounded-xl opacity-0 transition-opacity duration-300" style={{ background: C.gradient, opacity: focusedInput === "message" ? 1 : 0, filter: "blur(4px)" }} />
                                    <textarea
                                        rows="4"
                                        required
                                        onFocus={() => setFocusedInput("message")}
                                        onBlur={() => setFocusedInput(null)}
                                        className="w-full relative z-10 bg-white/80 dark:bg-[#0A1225]/80 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-600 focus:outline-none focus:bg-white dark:focus:bg-[#0A1225]/95 transition-all duration-300 resize-none"
                                        placeholder="Tell us about your requirements and technical goals..."
                                    />
                                </div>
                            </motion.div>

                            <motion.div
                                className="w-full mt-4"
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.7 }}
                            >
                                <MagneticButton disabled={loading}>
                                    <span className="relative z-10 text-white font-semibold">
                                        {loading ? "Initializing Secure Link..." : "Start Your Project"}
                                    </span>
                                    {!loading && (
                                        <motion.svg
                                            className="relative z-10 w-4 h-4 text-white"
                                            viewBox="0 0 20 20" fill="currentColor"
                                            animate={{ x: [0, 5, 0] }}
                                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                                        >
                                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </motion.svg>
                                    )}
                                </MagneticButton>
                            </motion.div>
                        </form>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

/* ═══════════════════════════════════════════════════════
   ANIMATED FEATURE PILLS
   ═══════════════════════════════════════════════════════ */
function FeaturePill({ children, delay }) {
    return (
        <motion.div
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-50/50 dark:bg-white/[0.02] backdrop-blur-md border border-slate-200 dark:border-white/[0.08]"
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.05, background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.15)" }}
        >
            {children}
        </motion.div>
    );
}

function AnimatedCounter({ from, to, duration = 2 }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    const motionValue = useMotionValue(from);
    const springValue = useSpring(motionValue, { damping: 25, stiffness: 60 });
    const [display, setDisplay] = useState(from);

    useEffect(() => {
        if (inView) motionValue.set(to);
    }, [inView, to, motionValue]);

    useEffect(() => {
        return springValue.on("change", (v) => setDisplay(Math.floor(v)));
    }, [springValue]);

    return <span ref={ref} className="font-bold tabular-nums text-slate-900 dark:text-white">{display}</span>;
}

function ConversionElements() {
    return (
        <div className="flex flex-wrap gap-3 mt-8 md:mt-12">
            <FeaturePill delay={0.2}>
                <motion.div className="w-2 h-2 rounded-full relative">
                    <motion.div className="absolute inset-0 rounded-full bg-green-500" animate={{ scale: [1, 2, 1], opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 2 }} />
                    <div className="absolute inset-0 rounded-full bg-green-400 shadow-[0_0_8px_#4ade80]" />
                </motion.div>
                <span className="text-[12px] font-semibold text-slate-600 dark:text-gray-300 ml-1">Accepting New Projects</span>
            </FeaturePill>

            <FeaturePill delay={0.3}>
                <svg className="w-4 h-4 text-slate-500 dark:text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span className="text-[12px] font-semibold text-slate-600 dark:text-gray-300 ml-0.5">Under 24h Response</span>
            </FeaturePill>

            <FeaturePill delay={0.4}>
                <span className="text-[12px] font-semibold text-slate-600 dark:text-gray-300">
                    Trusted by <AnimatedCounter from={0} to={120} />+ Companies
                </span>
            </FeaturePill>

            <FeaturePill delay={0.5}>
                <svg className="w-4 h-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-[12px] font-semibold text-slate-600 dark:text-gray-300">
                    <AnimatedCounter from={0} to={98} />% Satisfaction
                </span>
            </FeaturePill>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT EXPORT
   ═══════════════════════════════════════════════════════ */
export default function ContactExperience() {
    const sectionRef = useRef(null);
    const globalMouseX = useMotionValue(0);
    const globalMouseY = useMotionValue(0);

    const handleGlobalMouse = (e) => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        // Calculate normalized values between -0.5 and 0.5
        globalMouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        globalMouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    return (
        <section
            ref={sectionRef}
            onMouseMove={handleGlobalMouse}
            className="relative bg-background overflow-hidden will-change-transform transition-colors duration-300"
        >
            <ContactBackground mouseX={globalMouseX} mouseY={globalMouseY} />

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-10 md:py-14 lg:py-20">
                <div className="flex flex-col lg:flex-row gap-8 md:gap-16 lg:gap-24">

                    {/* LEFT SIDE: Text & Info Cards */}
                    <div className="lg:w-5/12 flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
                        >
                            <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-bold text-foreground leading-[1.1] mb-6 tracking-tight flex flex-wrap items-center gap-2">
                                <span>Let's Build</span>
                                <span
                                    className="bg-clip-text text-transparent"
                                    style={{ backgroundImage: C.gradient }}
                                >
                                    The Future
                                </span>
                            </h2>
                            <p className="text-slate-600 dark:text-gray-400 text-base sm:text-lg leading-relaxed mb-6 md:mb-10 max-w-md">
                                Ready to transform your enterprise? Connect with our team of elite engineers and strategists to discuss your next breakthrough.
                            </p>
                        </motion.div>

                        {/* Grid of Floating Contact Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {contactCards.map((card, idx) => (
                                <ContactCard
                                    key={card.id}
                                    card={card}
                                    index={idx}
                                    globalMouseX={globalMouseX}
                                    globalMouseY={globalMouseY}
                                />
                            ))}
                        </div>

                        <ConversionElements />
                    </div>

                    {/* RIGHT SIDE: Premium Form */}
                    <div className="lg:w-7/12" style={{ perspective: "1200px" }}>
                        <PremiumForm globalMouseX={globalMouseX} globalMouseY={globalMouseY} />
                    </div>

                </div>
            </div>
        </section>
    );
}
