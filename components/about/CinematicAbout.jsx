"use client";

import { useRef, useMemo, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import Image from "next/image";
import DigitalGlobeScene from "../3d/DigitalGlobeScene";
import { aboutImages } from "@/data/aboutImages";
import { Manrope } from "next/font/google";

const manrope = Manrope({
    subsets: ["latin"],
    display: "swap",
    weight: ["400", "500", "600", "700"],
    preload: false,
});

// ==========================================
// SECTION 1: HERO
// ==========================================
function AboutHero() {
    return (
        <section className="relative min-h-[auto] lg:min-h-[50vh] w-full flex items-center justify-center pt-[clamp(4rem,6vw,6rem)] pb-[clamp(2rem,4vw,4rem)] overflow-hidden bg-slate-50 dark:bg-[#020617] px-4 sm:px-6 lg:px-12 transition-colors duration-300">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px]" />
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683311-eac922347aa1?q=80&w=2000')] bg-cover bg-center opacity-5 mix-blend-screen" />
            </div>

            <div className="max-w-[1400px] w-full mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">

                {/* Left Content */}
                <div className="lg:col-span-7 flex flex-col items-start gap-6">


                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-[2rem] sm:text-[2.4rem] md:text-[2.8rem] lg:text-[4rem] font-[600] text-slate-900 dark:text-white tracking-[-0.04em] leading-[1.05] tracking-tight"
                    >
                        Engineering The Future Of <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 dark:from-cyan-400 dark:via-blue-500 dark:to-indigo-500 animate-gradient-x">
                            Digital Innovation
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-xl leading-8"
                    >
                        We help global businesses build scalable software, AI solutions, cloud platforms, and enterprise digital products.
                    </motion.p>
                </div>

                {/* Right 3D Globe */}
                <div className="lg:col-span-5 flex justify-center w-full md:mt-4 lg:mt-0">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="w-full flex justify-center"
                    >
                        <DigitalGlobeScene />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

// ==========================================
// SECTION 2: COMPANY STORY
// ==========================================
const STORY_TIMELINE = [
    { year: "2018", title: "Started", desc: "A small collective of engineers with a vision for enterprise scale." },
    { year: "2020", title: "Growth Phase", desc: "Expanding our technological stack and delivering our first Fortune 500 product." },
    { year: "2022", title: "Global Expansion", desc: "Opening global development hubs to support 24/7 enterprise delivery." },
    { year: "2024", title: "AI Solutions", desc: "Pioneering AI-first product development and machine learning integrations." },
    { year: "2026", title: "Enterprise Scale", desc: "Recognized as a leading global technology partner for digital transformation." }
];

function CompanyStory() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] });
    const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    return (
        <section className="relative w-full py-[clamp(1.5rem,4vw,4.5rem)] bg-slate-50 dark:bg-[#020617] px-5 sm:px-8 lg:px-12 xl:px-16 border-t border-slate-200 dark:border-white/5 transition-colors duration-300">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-16 items-start">

                {/* Left: Premium Image Card */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative w-full h-[220px] sm:h-[300px] md:h-[420px] lg:h-[700px] rounded-[2rem] overflow-hidden lg:sticky lg:top-32 border border-white/10"
                    style={{ position: "relative" }}
                >
                    <Image src={aboutImages.story} alt="Company Story" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-[#020617] via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-10 left-10">
                        <h3 className="text-3xl font-[500] text-slate-900 dark:text-white mb-2">Our Journey</h3>
                        <p className="text-cyan-700 dark:text-cyan-400 font-medium tracking-wide">From Startup to Enterprise Hub</p>
                    </div>
                </motion.div>

                {/* Right: Vertical Timeline */}
                <div ref={ref} className="relative py-6 md:py-10 pl-6 md:pl-12">
                    {/* Animated Track */}
                    <div className="absolute left-[3px] md:left-[27px] top-0 bottom-0 w-[2px] bg-white/5" />
                    <motion.div
                        className="absolute left-[3px] md:left-[27px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-500 to-purple-600 origin-top"
                        style={{ scaleY }}
                    />

                    <div className="flex flex-col gap-8 md:gap-12 lg:gap-16">
                        {STORY_TIMELINE.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: idx * 0.1 }}
                                className="relative pl-10 md:pl-16"
                            >
                                {/* Dot */}
                                <div className="absolute left-[-2px] md:left-[4px] w-3 h-3 bg-cyan-500 rounded-full border-[3px] border-slate-50 dark:border-[#020617] shadow-[0_0_10px_rgba(6,182,212,0.8)] mt-2" />

                                <h4 className="text-3xl md:text-4xl font-[700] tracking-[-0.03em] text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-slate-800 dark:from-slate-500 dark:to-slate-700 mb-2">{item.year}</h4>
                                <h5 className="text-2xl font-[500] text-slate-900 dark:text-white mb-3">{item.title}</h5>
                                <p className="text-slate-600 dark:text-slate-400 text-[13px] md:text-sm lg:text-base lg:text-lg leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

// ==========================================
// SECTION 3: WHY CHOOSE US
// ==========================================
const BENTO_FEATURES = [
    { title: "Ownership & Transparency", col: "md:col-span-2", row: "row-span-1", icon: "🤝", image: "/WhyChoose/Ownership.jpg" },
    { title: "Industry Expertise", col: "md:col-span-1", row: "row-span-1", icon: "🏛️", image: "/WhyChoose/Industry.jpg" },
    { title: "Dedicated Support", col: "md:col-span-1", row: "md:row-span-1", icon: "🛡️", image: "/WhyChoose/support.jpg" },
    { title: "Innovation Driven", col: "md:col-span-2", row: "row-span-1", icon: "💡", image: "/WhyChoose/Innavation.jpg" },
    { title: "Global Delivery", col: "md:col-span-1", row: "md:row-span-1", icon: "🌍", image: "/WhyChoose/global.jpg" },
    { title: "AI First Approach", col: "md:col-span-2", row: "row-span-1", icon: "🧠", image: "/WhyChoose/AI.jpg" }
];

function WhyChooseUs() {
    return (
        <section className="relative w-full py-[clamp(1.5rem,4vw,4.5rem)] bg-slate-50 dark:bg-[#020617] px-4 sm:px-6 lg:px-12 border-t border-slate-200 dark:border-white/5 transition-colors duration-300">
            <div className="max-w-[1400px] mx-auto flex flex-col gap-8 md:gap-12 lg:gap-16">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-[500] text-slate-900 dark:text-white mb-4 leading-tight">Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-500">Choose Us</span></h2>
                    <p className="text-[13px] md:text-sm lg:text-base lg:text-lg text-slate-600 dark:text-slate-400">We don't just write code. We build scalable digital businesses with a mindset engineered for success.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 auto-rows-[180px] md:auto-rows-[220px]">
                    {BENTO_FEATURES.map((feat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            whileHover={{ y: -5, scale: 1.02 }}
                            className={`relative p-5 md:p-6 lg:p-8 rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none backdrop-blur-md overflow-hidden group flex flex-col justify-end ${feat.col} ${feat.row}`}
                        >

                            {/* Full Background Image */}
                            <div className="absolute inset-0">
                                <Image
                                    src={feat.image}
                                    alt={feat.title}
                                    fill
                                    className="object-cover transition-all duration-700 group-hover:scale-105"
                                />
                            </div>
                            <div className="absolute inset-0 rounded-3xl border border-white/20" />

                            <div className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/10 transition-all duration-500" />

                            {/* Dark Overlay */}
                            <div className="absolute inset-0 bg-black/45" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/10 group-hover:to-purple-500/10 transition-colors duration-500" />
                            <div className="absolute inset-0 border-2 border-transparent group-hover:border-cyan-500/30 rounded-3xl transition-colors duration-500" />
                            <div className="relative z-10">
                                <h3 className="text-white text-2xl md:text-3xl font-bold drop-shadow-lg">
                                    {feat.title}
                                </h3>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ==========================================
// SECTION 4: COMPANY STATS
// ==========================================
function CompanyStats() {
    const stats = [
        { num: "500+", label: "Projects Delivered" },
        { num: "120+", label: "Global Clients" },
        { num: "15+", label: "Countries Served" },
        { num: "98%", label: "Client Satisfaction" },
        { num: "24/7", label: "Enterprise Support" }
    ];

    return (
        <section className="relative w-full py-[clamp(1.5rem,4vw,4.5rem)] bg-slate-50 dark:bg-[#020617] px-4 sm:px-6 lg:px-12 border-y border-slate-200 dark:border-white/5 overflow-hidden transition-colors duration-300">
            <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.1 }}
                        className={`flex flex-col items-center justify-center p-5 md:p-6 lg:p-8 rounded-3xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 backdrop-blur-xl shadow-sm dark:shadow-none hover:bg-slate-50 dark:hover:bg-white/[0.05] hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-2 ${i === 4 ? "col-span-2 md:col-span-1" : ""}`}
                    >
                        <span className="text-3xl md:text-4xl lg:text-5xl font-[600] text-slate-900 dark:text-white mb-2">{stat.num}</span>
                        <span className="text-sm text-slate-600 dark:text-slate-400 font-medium tracking-wide text-center uppercase">{stat.label}</span>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

// ==========================================
// SECTION 5: CULTURE GALLERY
// ==========================================
function CultureGallery() {
    return (
        <section className="relative w-full py-[clamp(1.5rem,4vw,4.5rem)] bg-slate-50 dark:bg-[#020617] px-4 sm:px-6 lg:px-12 transition-colors duration-300">
            <div className="max-w-[1400px] mx-auto flex flex-col gap-8 md:gap-12 lg:gap-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div>
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-[500] text-slate-900 dark:text-white mb-4 leading-tight">Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-600 dark:from-purple-400 dark:to-cyan-500">Culture</span></h2>
                        <p className="text-[13px] md:text-sm lg:text-base lg:text-lg text-slate-600 dark:text-slate-400 max-w-xl">A glimpse into our collaborative workspaces, team synergy, and global ecosystem.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:auto-rows-[300px]">
                    {/* Bento Images */}
                    <div className="md:col-span-2 md:row-span-2 relative h-[240px] md:h-auto rounded-3xl overflow-hidden group border border-white/10" style={{ position: "relative" }}>
                        <Image src={aboutImages.culture[0]} alt="Culture" fill sizes="(max-width: 768px) 100vw, 66vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/0 transition-colors duration-500" />
                    </div>
                    <div className="md:col-span-1 md:row-span-1 relative h-[180px] md:h-auto rounded-3xl overflow-hidden group border border-white/10" style={{ position: "relative" }}>
                        <Image src={aboutImages.culture[1]} alt="Culture" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/0 transition-colors duration-500" />
                    </div>
                    <div className="md:col-span-1 md:row-span-1 relative h-[180px] md:h-auto rounded-3xl overflow-hidden group border border-white/10" style={{ position: "relative" }}>
                        <Image src={aboutImages.culture[2]} alt="Culture" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/0 transition-colors duration-500" />
                    </div>
                </div>
            </div>
        </section>
    );
}

// ==========================================
// SECTION 6: OUR PROCESS
// ==========================================
const PROCESS_STEPS = ["Discover", "Plan", "Design", "Develop", "Deploy", "Scale"];

function OurProcess() {
    return (
        <section className="relative w-full py-[clamp(1.5rem,4vw,4.5rem)] bg-slate-50 dark:bg-[#020617] px-4 sm:px-6 lg:px-12 border-t border-slate-200 dark:border-white/5 overflow-hidden transition-colors duration-300">
            <div className="max-w-[1400px] mx-auto flex flex-col gap-10 md:gap-14 lg:gap-20">
                <div className="text-center">
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-[500] text-slate-900 dark:text-white mb-6 leading-tight">The Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-500">Process</span></h2>
                </div>

                <div className="relative w-full flex flex-col md:flex-row items-center justify-between gap-12 md:gap-4">


                    {/* Horizontal Line Desktop */}
                    <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-white/5 -translate-y-1/2" />
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-purple-600 origin-left -translate-y-1/2"
                    />

                    {/* Mobile Vertical Line */}
                    <div className="md:hidden absolute left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2" />

                    <motion.div
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="md:hidden absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-500 to-purple-600 origin-top -translate-x-1/2"
                    />

                    {PROCESS_STEPS.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.15 }}
                            className="relative z-10 flex flex-col items-center gap-4 group cursor-default w-full md:w-auto"
                        >
                            <div className=" relative z-10 w-12 h-12 md:w-16 md:h-16 rounded-full bg-slate-50 dark:bg-[#020617] border-2 border-slate-300 dark:border-white/20 flex items-center justify-center group-hover:border-cyan-500 dark:group-hover:border-cyan-400 transition-colors duration-300 shadow-sm dark:shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                                <span className="text-slate-900 dark:text-white font-[500] text-xl group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">{idx + 1}</span>
                            </div>
                            <span className="text-slate-600 dark:text-slate-300 font-[500] tracking-wide uppercase group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{step}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ==========================================
// SECTION 7: TECHNOLOGY ECOSYSTEM
// ==========================================
const TECHNOLOGIES = ["React", "Next.js", "Node.js", "Java", "Spring Boot", "MongoDB", "AWS", "Docker", "Kubernetes", "AI"];

function TechnologyEcosystem() {
    return (
        <section className="relative w-full py-[clamp(1.5rem,4vw,4.5rem)] bg-slate-50 dark:bg-[#020617] px-4 sm:px-6 lg:px-12 border-t border-slate-200 dark:border-white/5 transition-colors duration-300">
            <div className="max-w-[1400px] mx-auto flex flex-col gap-8 md:gap-12 lg:gap-16 items-center text-center">
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-[500] text-slate-900 dark:text-white leading-tight">Technology <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-500">Ecosystem</span></h2>

                <div className="flex flex-wrap justify-center gap-6 max-w-4xl">
                    {TECHNOLOGIES.map((tech, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: (idx % 5) * 0.1 }}
                            whileHover={{ scale: 1.1, rotate: idx % 2 === 0 ? 2 : -2 }}
                            className="px-4 py-2 sm:px-5 sm:py-3 text-[13px] md:text-sm lg:text-base rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white font-[500] cursor-default hover:bg-slate-50 dark:hover:bg-cyan-500/20 hover:border-cyan-500 dark:hover:border-cyan-400 hover:shadow-sm dark:hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300 backdrop-blur-md shadow-sm dark:shadow-none"
                        >
                            {tech}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ==========================================
// SECTION 8: LEADERSHIP MESSAGE
// ==========================================
function LeadershipMessage() {
    return (
        <section className="relative w-full py-[clamp(1.5rem,4vw,4.5rem)] bg-slate-50 dark:bg-[#020617] px-4 sm:px-6 lg:px-12 flex justify-center transition-colors duration-300">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-5xl rounded-[3rem] bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none backdrop-blur-2xl p-6 md:p-10 lg:p-16 flex flex-col md:flex-row items-center gap-6 md:gap-12"
            >
                <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 rounded-full overflow-hidden relative flex-shrink-0 border-4 border-white/10" style={{ position: "relative" }}>
                    <Image src={aboutImages.leadership} alt="Leadership" fill sizes="(max-width: 768px) 100vw, 200px" className="object-cover" />
                </div>
                <div className="flex flex-col gap-6  text-center md:text-left ">
                    <div className="text-cyan-600 dark:text-cyan-400 text-6xl leading-none">"</div>
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-[500] text-slate-900 dark:text-white leading-tight">
                        Our goal is simple: We engineer technology that gives our clients an unfair advantage in the global market.
                    </h3>
                    <div>
                        <h4 className="text-base md:text-xl font-[500] text-slate-900 dark:text-white">Alex Mercer</h4>
                        <p className="text-slate-600 dark:text-slate-400">Founder & CEO, RecentureSoft</p>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}

// ==========================================
// SECTION 9: CTA
// ==========================================
function AboutCTA() {
    return (
        <section className="relative w-full py-[clamp(1.5rem,4vw,4.5rem)] bg-slate-50 dark:bg-[#020617] px-4 sm:px-6 lg:px-12 overflow-hidden flex justify-center border-t border-slate-200 dark:border-white/5 transition-colors duration-300">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cyan-50 dark:to-cyan-950/20 pointer-events-none" />
            <motion.div
                className="relative z-10 max-w-4xl w-full text-center flex flex-col items-center gap-4 md:gap-8"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-[600] tracking-[-0.04em] text-slate-900 dark:text-white tracking-tight leading-tight">
                    Let's Build The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-500">Future</span> Together
                </h2>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full mt-4 md:mt-8">
                    <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-[500] rounded-xl shadow-md">
                        Start Your Project
                    </button>
                    <button className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-[500] rounded-xl shadow-sm dark:shadow-none hover:bg-slate-50 dark:hover:bg-white/10 transition-colors">
                        Schedule Consultation
                    </button>
                </div>
            </motion.div>
        </section>
    );
}

// ==========================================
// MAIN EXPORT ASSEMBLY
// ==========================================
export default function CinematicAbout() {
    return (
        <div className={`${manrope.className} w-full flex flex-col bg-slate-50 dark:bg-[#020617] transition-colors duration-300`}>
            <AboutHero />
            <CompanyStory />
            <WhyChooseUs />
            <CompanyStats />
            <CultureGallery />
            <OurProcess />
            <TechnologyEcosystem />
            <LeadershipMessage />
            <AboutCTA />
        </div>
    );
}
