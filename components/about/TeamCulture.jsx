"use client";

import { motion } from "framer-motion";

const values = [
    { title: "Innovation First", desc: "We constantly push boundaries, exploring new tech like WebGL and AI to solve old problems." },
    { title: "Radical Candor", desc: "Open, honest feedback is the cornerstone of our engineering culture." },
    { title: "Design Excellence", desc: "Code must not only function perfectly, it must feel premium to the end user." }
];

export default function TeamCulture() {
    return (
        <section className="py-14 md:py-20 lg:py-28 bg-slate-50 dark:bg-[#020617] relative overflow-hidden transition-colors duration-300">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(99,102,241,0.15),_transparent_50%)] pointer-events-none" />

            <div className="container mx-auto px-5 sm:px-8 lg:px-12 max-w-[1200px] relative z-10">
                <div className="mb-16 md:flex justify-between items-end">
                    <div className="max-w-2xl">
                        <h2 className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-black text-slate-900 dark:text-white tracking-[-0.03em] leading-tight mb-4">Our Culture</h2>
                        <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg leading-8 font-normal max-w-xl">We are a collective of engineers, designers, and strategists united by a passion for digital craftsmanship.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
                    {values.map((val, i) => (
                        <motion.div
                            whileHover={{
                                y: -8,
                                scale: 1.02
                            }}
                            key={val.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15 }}
                            className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 p-6 md:p-8 rounded-3xl backdrop-blur-xl hover:bg-slate-50 dark:hover:bg-white/[0.05] hover:border-cyan-500/30 hover:-translate-y-2 transition-all duration-300 shadow-sm dark:shadow-none"
                        >
                            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-blue-500/20 flex items-center justify-center mb-6">
                                <div className="w-3 h-3 bg-blue-400 rounded-full" />
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-3">{val.title}</h3>
                            <p className="text-slate-600 dark:text-slate-300 leading-7 font-normal text-sm md:text-base">{val.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
