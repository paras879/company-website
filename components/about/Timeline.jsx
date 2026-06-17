"use client";

import { motion } from "framer-motion";

const milestones = [
    { year: "2015", title: "The Inception", desc: "Started as a small team of engineers passionate about building web applications." },
    { year: "2018", title: "Enterprise Scaling", desc: "Partnered with Fortune 500 companies to architect cloud-native infrastructures." },
    { year: "2021", title: "Global Expansion", desc: "Opened offices in 3 new continents and expanded our capabilities to immersive 3D and Mobile." },
    { year: "2024", title: "AI Integration", desc: "Pioneering the integration of artificial intelligence into enterprise software suites." }
];

export default function Timeline() {
    return (
        <section className="py-14 md:py-20 lg:py-28 bg-slate-50 dark:bg-[#020617] relative transition-colors duration-300">
            <div className="container mx-auto px-5 sm:px-8 lg:px-12 max-w-6xl">
                <div className="text-center mb-8 md:mb-12">
                    <h2 className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-black text-slate-900 dark:text-white tracking-[-0.03em] leading-tight">Our Journey</h2>
                </div>

                <div className="space-y-8 md:space-y-12 lg:space-y-16 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-cyan-500/30 before:to-transparent">
                    {milestones.map((item, i) => (
                        <div key={item.year} className="relative flex items-start justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14  rounded-full border border-slate-300 dark:border-white/20 bg-slate-50 dark:bg-[#020617] text-cyan-500 dark:text-cyan-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(6,182,212,0.1)] dark:shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                                <div className="w-2 h-2 bg-cyan-500 dark:bg-cyan-400 rounded-full group-hover:shadow-[0_0_10px_#06b6d4]" />
                            </div>
                            <motion.div
                                whileHover={{
                                    y: -8,
                                    scale: 1.02
                                }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className="w-[calc(100%-4.5rem)] md:w-[calc(50%-3rem)] bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 p-5 md:p-7 lg:p-8 rounded-3xl backdrop-blur-xl hover:bg-slate-50 dark:hover:bg-white/[0.05] hover:border-cyan-500/30 hover:-translate-y-2 transition-all duration-300 shadow-sm dark:shadow-none"
                            >
                                <span className="text-cyan-600 dark:text-cyan-400 font-bold text-2xl md:text-3xl tracking-tight mb-2 block">{item.year}</span>
                                <h4 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2">{item.title}</h4>
                                <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-7 font-normal">{item.desc}</p>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
