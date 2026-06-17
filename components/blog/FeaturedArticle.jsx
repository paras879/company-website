"use client";

import { motion } from "framer-motion";

export default function FeaturedArticle() {
    return (
        <section className="py-24 bg-slate-50 dark:bg-[#020617] transition-colors duration-300">
            <div className="container mx-auto px-4 max-w-[1200px]">
                <div className="flex justify-between items-end mb-12">
                    <h2 className="text-[clamp(2rem,3vw,3rem)] font-extrabold text-slate-900 dark:text-white">Featured Insight</h2>
                </div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative rounded-[2.5rem] overflow-hidden group cursor-pointer border border-white/10"
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/80 to-transparent z-10" />
                    <div className="h-[500px] lg:h-[600px] w-full bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center transform group-hover:scale-105 transition-transform duration-1000" />
                    
                    <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 lg:p-16">
                        <div className="max-w-3xl">
                            <div className="flex items-center gap-4 mb-6">
                                <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider rounded-full border border-cyan-500/30">
                                    Engineering
                                </span>
                                <span className="text-gray-400 text-sm">May 12, 2026</span>
                            </div>
                            <h3 className="text-[clamp(2rem,4vw,3.5rem)] font-bold text-white leading-tight mb-6 group-hover:text-cyan-300 transition-colors duration-300">
                                Architecting for the Future: How AI is Reshaping Enterprise Microservices.
                            </h3>
                            <p className="text-gray-300 text-lg lg:text-xl font-light mb-8 max-w-2xl line-clamp-2">
                                Discover how integrating machine learning into existing distributed systems can drastically reduce latency and automate complex orchestration tasks across your backend architecture.
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-white/20 overflow-hidden">
                                    <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Author" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <p className="text-white font-semibold">David Reynolds</p>
                                    <p className="text-gray-400 text-sm">Lead Solutions Architect</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
