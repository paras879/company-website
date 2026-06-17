"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// OPTIMIZATION: Dynamically import the heavy 3D scene so Three.js & Fiber 
// aren't loaded in the main bundle, massively reducing initial load size!
const ContactScene = dynamic(() => import("../3d/ContactScene"), { 
    ssr: false, 
    loading: () => <div className="w-full h-full flex items-center justify-center text-slate-400">Loading Scene...</div> 
});

const STATS = [
    { value: "500+", label: "Projects Delivered" },
    { value: "120+", label: "Global Clients" },
    { value: "15+", label: "Countries Served" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "24/7", label: "Enterprise Support" },
];

const TRUST_INDICATORS = [
    "500+ Projects Delivered",
    "120+ Global Clients",
    "15+ Countries Served",
    "98% Client Satisfaction"
];

export default function ContactHero() {
    return (
        <section className="relative w-full pt-20 md:pt-24 lg:pt-28 pb-10 md:pb-14 lg:pb-20">
            {/* Ambient Bounded Background Glows */}
            <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-cyan-900/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-12 relative z-10 flex flex-col gap-[clamp(2rem,4vw,4rem)] lg:gap-[clamp(2rem,4vw,4rem)]">

                {/* --- STRICT 45/55 SPLIT LAYOUT --- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-8 lg:gap-8 items-center">

                    {/* LEFT CONTENT (45%) */}
                    <div className="lg:col-span-5 flex flex-col items-start gap-6 z-20 order-1 lg:order-2">
                        <motion.h1
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-[clamp(2rem,8vw,4rem)] lg:text-[3.25rem] font-bold text-slate-900 dark:text-white leading-[1.1] tracking-tight"
                        >
                            Delivering Enterprise Technology <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 dark:from-cyan-400 dark:to-blue-500">Worldwide</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-[clamp(1rem,1.5vw,1.25rem)] text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed"
                        >
                            RecentureSoft helps businesses build AI products, enterprise software, cloud infrastructure, and digital experiences across multiple countries and industries.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col sm:flex-row w-full gap-3 pt-2 w-full sm:w-auto"
                        >
                            <button className="px-7 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold rounded-lg transition-colors">
                                Start a Project
                            </button>
                            <button className="px-7 py-3.5 bg-slate-200/50 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-300 dark:border-white/10 text-slate-800 dark:text-white font-semibold rounded-lg transition-colors backdrop-blur-sm">
                                Schedule Consultation
                            </button>
                        </motion.div>

                        {/* Inline Trust Indicators (2x2 Grid) */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 pt-2 w-full max-w-lg border-t border-slate-200 dark:border-white/10 mt-2"
                        >
                            {TRUST_INDICATORS.map((indicator, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-2.5 h-2.5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-xs md:text-sm font-medium text-slate-600 dark:text-slate-300">{indicator}</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* RIGHT: BOUNDED 3D EARTH (55%) */}
                    <div className="lg:col-span-7 w-full flex items-center justify-center order-1 lg:order-2">
                        {/* We use a rigid container height to guarantee no clipping and no full-screen overlap */}
                        <div className="w-full max-w-[220px] sm:max-w-[350px] md:max-w-[500px] lg:max-w-[600px] mx-auto h-[250px] md:h-[400px] lg:h-[550px] flex items-center justify-center">
                            <ContactScene />
                        </div>
                    </div>
                </div>

                {/* --- ENTERPRISE STATS ROW --- */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-5 pt-2"
                >
                    {STATS.map((stat, i) => (
                        <div
                            key={i}
                            className={`flex flex-col items-start p-2.5 md:p-5 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 backdrop-blur-md hover:bg-slate-100 dark:hover:bg-white/[0.05] transition-colors ${i === 4 ? "col-span-2 md:col-span-1" : ""}`}
                        >
                            <span className="text-lg md:text-3xl font-bold text-slate-900 dark:text-white mb-1">{stat.value}</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium tracking-wide uppercase">{stat.label}</span>
                        </div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}
