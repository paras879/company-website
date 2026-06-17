"use client";

import { motion } from "framer-motion";
import { Manrope } from "next/font/google";

const manrope = Manrope({
    subsets: ["latin"],
    display: "swap",
    preload: false,
});


const PROCESS_STEPS = [
    { num: "01", title: "Discovery & Architecture", desc: "We analyze your business goals and architect a scalable cloud-native solution tailored to your enterprise." },
    { num: "02", title: "Agile Engineering", desc: "Our global teams build your product in iterative sprints, ensuring transparency and rapid delivery." },
    { num: "03", title: "Security & QA", desc: "Rigorous automated testing, penetration testing, and code reviews guarantee enterprise-grade security." },
    { num: "04", title: "Global Deployment", desc: "Seamless deployment to production environments with zero-downtime CI/CD pipelines." }
];

    export default function SolutionsProcess() {
        return (
            <section className={`${manrope.className} relative w-full py-[clamp(1.5rem,5vw,5rem)] bg-slate-50 dark:bg-[#020617] px-6 lg:px-12 border-t border-slate-200 dark:border-white/5 overflow-hidden transition-colors duration-300`}>
                <div className="max-w-[1400px] mx-auto flex flex-col gap-8 md:gap-12">

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="max-w-2xl">

                        <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-[600] tracking-[-0.03em] text-slate-900 dark:text-white mb-3 md:mb-4 leading-[1.05]">
                            How We <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500">Deliver</span>
                        </h2>
                        <p className="text-[0.95rem] md:text-[1.05rem] text-slate-600 dark:text-slate-400 font-[400] leading-7 max-w-xl">
                            A battle-tested engineering process designed for speed, security, and massive scale.
                        </p>
                    </div>
                </div>

                <div className="relative w-full">
                    {/* Background Connecting Line */}
                    <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-[1px] bg-slate-300 dark:bg-white/10 md:-translate-x-1/2 transition-colors duration-300" />

                    <div className="flex flex-col gap-6 md:gap-12 lg:gap-16">
                        {PROCESS_STEPS.map((step, idx) => {
                            const isEven = idx % 2 === 0;
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.7, delay: idx * 0.1 }}
                                    className={`relative flex flex-col md:flex-row items-start md:items-center w-full ${isEven ? 'md:flex-row-reverse' : ''}`}
                                >
                                    {/* Center Node */}
                                    <div className="absolute left-5 md:left-1/2 w-10 h-10 md:w-12 md:h-12 bg-white dark:bg-[#020617] rounded-xl border border-slate-300 dark:border-white/20 flex items-center justify-center transform -translate-x-1/2 shadow-[0_0_20px_rgba(34,211,238,0.2)] z-10 hover:border-cyan-400 transition-colors duration-300">
                                        <span className="text-cyan-500 dark:text-cyan-400 text-sm md:text-base font-[600] font-mono">{step.num}</span>
                                    </div>

                                    {/* Content Block */}
                                    <div className={`w-full md:w-[48%] lg:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pl-16' : 'md:pr-16 text-left md:text-right'}`}>
                                        <div className="bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 backdrop-blur-md hover:bg-slate-50 dark:hover:bg-white/[0.04] hover:border-slate-300 dark:hover:border-white/10 transition-all duration-300 shadow-sm dark:shadow-none">
                                            <h3 className="text-[1.1rem] md:text-[1.3rem] lg:text-[1.6rem] font-[600] text-slate-900 dark:text-white mb-2 tracking-[-0.02em]">{step.title}</h3>
                                            <p className="text-slate-600 dark:text-slate-400 leading-7 text-[0.9rem] md:text-[1rem] font-[400]">{step.desc}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </section>
    );
}
