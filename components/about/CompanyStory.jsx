"use client";

import { motion } from "framer-motion";

export default function CompanyStory() {
    return (
        <section className="py-12 md:py-20 lg:py-28 bg-slate-50 dark:bg-[#020617] relative transition-colors duration-300">
            <div className="container mx-auto px-5 sm:px-8 lg:px-12 max-w-6xl">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 md:gap-14 lg:gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >

                        <h2 className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] font-black text-slate-900 dark:text-white tracking-[-0.03em] leading-[1.05] mb-5 md:mb-6">
                            Built on the belief that <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">technology</span> should empower humanity.
                        </h2>
                        <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg leading-8 max-w-xl">
                            Since our inception, RecentureSoft has been at the forefront of digital innovation. We started with a simple mission: to bridge the gap between complex engineering and elegant user experiences.
                        </p>
                        <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg leading-8 max-w-xl">
                            Today, we partner with industry leaders and disruptive startups alike, architecting scalable solutions that drive measurable growth and transform how businesses operate in the digital age.
                        </p>
                    </motion.div>

                    <motion.div
                        whileHover={{
                            scale: 1.02
                        }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative h-[260px] sm:h-[320px] md:h-[420px] lg:h-[500px] rounded-3xl overflow-hidden group"
                    >
                        {/* Placeholder for an actual team/office image, currently using a sleek gradient glassmorphism block */}
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 to-cyan-900/40 border border-slate-200 dark:border-white/10 backdrop-blur-xl shadow-md dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)]" />
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center mix-blend-overlay opacity-50 group-hover:opacity-70 transition-opacity duration-700" />

                        <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6 lg:p-8 bg-gradient-to-t from-slate-50 dark:from-[#020617] to-transparent">
                            <div className="flex justify-between sm:justify-start gap-6 sm:gap-10">
                                <div>
                                    <h4 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">10+</h4>
                                    <p className="text-cyan-600 dark:text-cyan-400 text-xs uppercase tracking-wider font-semibold">Years Exp</p>
                                </div>
                                <div>
                                    <h4 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">200+</h4>
                                    <p className="text-cyan-600 dark:text-cyan-400 text-xs uppercase tracking-wider font-semibold">Projects</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
